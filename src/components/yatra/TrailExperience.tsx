"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Footprints,
  Loader2,
  MapPin,
  Navigation,
  Pause,
  Play,
  Rewind,
  RotateCcw,
  Square,
  Type,
  Radar,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { yatraUI } from "@/i18n/yatraTranslations";
import { Trail, StoryStop, stopAudioUrl, stopNarration } from "@/data/yatraData";
import {
  Narrator,
  NarratorState,
  hasVoiceFor,
  isNarrationSupported,
  toChunks,
} from "@/lib/narrator";
import { googleMapsWalkUrl, haversineKm } from "@/lib/geo";
import { Kalash, WaveRule } from "@/components/art/Motifs";
import TrailMap from "@/components/yatra/TrailMap";

const ACCENT: Record<Trail["accent"], { line: string; dot: string; chip: string; text: string }> = {
  saffron: {
    line: "bg-saffron-200",
    dot: "bg-saffron-600",
    chip: "bg-saffron-50 text-saffron-800 border-saffron-200",
    text: "text-saffron-700",
  },
  river: {
    line: "bg-river-200",
    dot: "bg-river-600",
    chip: "bg-river-50 text-river-800 border-river-200",
    text: "text-river-700",
  },
  indigo: {
    line: "bg-indigo-200",
    dot: "bg-indigo-600",
    chip: "bg-indigo-50 text-indigo-800 border-indigo-200",
    text: "text-indigo-700",
  },
};

function metresLabel(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export default function TrailExperience({ trail }: { trail: Trail }) {
  const { locale, t } = useLanguage();
  const accent = ACCENT[trail.accent];

  const narratorRef = useRef<Narrator | null>(null);
  const [narration, setNarration] = useState<NarratorState>({
    status: "idle",
    chunkIndex: 0,
    totalChunks: 0,
    progress: 0,
  });

  // Recorded narration is the primary path; `mode` records which one is live.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** True while we are clearing the element on purpose, so its `error` event
      is not mistaken for a missing file. */
  const teardownRef = useRef(false);
  const [mode, setMode] = useState<"audio" | "speech">("audio");
  const [audio, setAudio] = useState<{
    status: "idle" | "playing" | "paused";
    current: number;
    duration: number;
  }>({ status: "idle", current: 0, duration: 0 });

  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [openStopId, setOpenStopId] = useState<string | null>(trail.stops[0]?.id ?? null);
  const [showText, setShowText] = useState(false);
  const [rate, setRate] = useState(0.95);

  const [flowOn, setFlowOn] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoDenied, setGeoDenied] = useState(false);
  const [locating, setLocating] = useState(false);
  const autoPlayed = useRef<Set<string>>(new Set());

  const [supported, setSupported] = useState(true);
  const [voiceOk, setVoiceOk] = useState(true);

  /* ── Narrator lifecycle ─────────────────────────────── */
  useEffect(() => {
    narratorRef.current = new Narrator();
    setSupported(isNarrationSupported());

    Narrator.warmVoices(() => setVoiceOk(hasVoiceFor(locale)));
    if (isNarrationSupported() && window.speechSynthesis.getVoices().length) {
      setVoiceOk(hasVoiceFor(locale));
    }

    const unsubscribe = narratorRef.current.subscribe(setNarration);
    const narrator = narratorRef.current;
    return () => {
      unsubscribe();
      narrator.stop();
    };
    // Voice availability is re-checked on locale change in the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVoiceOk(hasVoiceFor(locale));
    // Switching language mid-story would leave the wrong voice mid-sentence.
    narratorRef.current?.stop();
    setActiveStopId(null);
  }, [locale]);

  const activeStop = useMemo(
    () => trail.stops.find((s) => s.id === activeStopId) ?? null,
    [activeStopId, trail.stops]
  );

  /** Speak a stop with the device voice — the fallback path. */
  const speakStop = useCallback(
    (stop: StoryStop) => {
      const narrator = narratorRef.current;
      if (!narrator) return;
      setMode("speech");
      narrator.setRate(rate);
      narrator.play(stopNarration(stop, locale), locale);
    },
    [locale, rate]
  );

  /**
   * Play a stop. Recorded narration is preferred; if the file is missing or the
   * browser refuses to play it, we fall back to speech synthesis so the story
   * still happens.
   */
  const playStop = useCallback(
    (stop: StoryStop) => {
      setActiveStopId(stop.id);
      setOpenStopId(stop.id);

      narratorRef.current?.stop();

      const audio = audioRef.current;
      if (!audio) {
        speakStop(stop);
        return;
      }

      setAudio({ status: "playing", current: 0, duration: 0 });
      // Assigning src rewinds the element; setting currentTime here would throw
      // because no metadata has loaded yet.
      teardownRef.current = false;
      audio.src = stopAudioUrl(trail.id, stop, locale);
      audio.playbackRate = rate;

      audio
        .play()
        .then(() => setMode("audio"))
        .catch(() => speakStop(stop));
    },
    [locale, rate, speakStop, trail.id]
  );

  const togglePlayback = useCallback(() => {
    if (mode === "audio") {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) void audio.play();
      else audio.pause();
      return;
    }

    const narrator = narratorRef.current;
    if (!narrator) return;
    if (narration.status === "playing") narrator.pause();
    else if (narration.status === "paused") narrator.resume();
  }, [mode, narration.status]);

  const stopPlayback = useCallback(() => {
    narratorRef.current?.stop();
    const audio = audioRef.current;
    if (audio) {
      teardownRef.current = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setAudio({ status: "idle", current: 0, duration: 0 });
    setActiveStopId(null);
  }, []);

  const changeRate = useCallback((next: number) => {
    setRate(next);
    narratorRef.current?.setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }, []);

  /** Skip within recorded narration. */
  const nudge = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.min(
      Math.max(0, audio.currentTime + seconds),
      audio.duration
    );
  }, []);

  const seekTo = useCallback((fraction: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = audio.duration * fraction;
  }, []);

  /* ── Flow: start a story when the walker arrives ────── */
  useEffect(() => {
    if (!flowOn) return;
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoDenied(true);
      setFlowOn(false);
      return;
    }

    setLocating(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocating(false);
        setGeoDenied(false);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocating(false);
        setGeoDenied(true);
        setFlowOn(false);
      },
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [flowOn]);

  const distances = useMemo(() => {
    if (!coords) return null;
    const map = new Map<string, number>();
    trail.stops.forEach((stop) => {
      map.set(stop.id, haversineKm(coords.lat, coords.lng, stop.lat, stop.lng));
    });
    return map;
  }, [coords, trail.stops]);

  const nearest = useMemo(() => {
    if (!distances) return null;
    let best: { stop: StoryStop; km: number } | null = null;
    trail.stops.forEach((stop) => {
      const km = distances.get(stop.id);
      if (km === undefined) return;
      if (!best || km < best.km) best = { stop, km };
    });
    return best as { stop: StoryStop; km: number } | null;
  }, [distances, trail.stops]);

  /* ── One playback status, whichever engine is driving ── */
  const status = mode === "audio" ? audio.status : narration.status;
  const isPlaying = status === "playing";
  const isBusy = status === "playing" || status === "paused";
  const progress =
    mode === "audio"
      ? audio.duration > 0
        ? audio.current / audio.duration
        : 0
      : narration.progress;
  const deva = locale !== "en";

  // Arrival trigger — plays once per stop per session.
  useEffect(() => {
    if (!flowOn || !distances) return;
    if (isBusy) return;

    for (const stop of trail.stops) {
      const km = distances.get(stop.id);
      if (km === undefined) continue;
      if (km * 1000 <= stop.radiusM && !autoPlayed.current.has(stop.id)) {
        autoPlayed.current.add(stop.id);
        playStop(stop);
        break;
      }
    }
  }, [distances, flowOn, isBusy, playStop, trail.stops]);

  return (
    <div className="bg-cream-50">
      {/* The single audio element every stop plays through. */}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setAudio((a) => ({ ...a, status: "playing" }))}
        onPause={() =>
          setAudio((a) => (a.status === "idle" ? a : { ...a, status: "paused" }))
        }
        onEnded={() => setAudio((a) => ({ ...a, status: "idle" }))}
        onLoadedMetadata={(e) => {
          // Read off the element now: React nulls `currentTarget` before the
          // state updater below is invoked.
          const duration = e.currentTarget.duration;
          setAudio((a) => ({
            ...a,
            duration: Number.isFinite(duration) ? duration : 0,
          }));
        }}
        onTimeUpdate={(e) => {
          const current = e.currentTarget.currentTime;
          setAudio((a) => ({ ...a, current }));
        }}
        onError={() => {
          // Tearing down deliberately also fires `error`; only a real failure
          // on a stop we are trying to play should reach for the device voice.
          if (teardownRef.current) return;
          const stop = trail.stops.find((s) => s.id === activeStopId);
          if (stop) speakStop(stop);
        }}
      />

      {/* ── Trail header ─────────────────────────────────── */}
      <header className="section-dark relative overflow-hidden">
        <div className="section-container pt-28 pb-16 sm:pt-32 sm:pb-20 relative z-10">
          <Link
            href="/yatra"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream-200/70 hover:text-cream-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(yatraUI.backToTrails)}
          </Link>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="eyebrow">{t(yatraUI.eyebrow)}</span>
              <h1 className="mt-4 text-display-sm text-cream-50">{t(trail.name)}</h1>
              <p className="mt-3 text-lede text-cream-200/75">{t(trail.subtitle)}</p>
            </div>
            <Kalash className="w-16 h-16 text-gold-400/70 shrink-0" />
          </div>

          <p className="mt-8 max-w-prose text-cream-200/70 leading-relaxed">
            {t(trail.description)}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            {[
              [trail.stops.length, t(yatraUI.stops)],
              [trail.totalMinutes, t(yatraUI.minutes)],
              [trail.distanceKm, t(yatraUI.km)],
            ].map(([value, label]) => (
              <div key={String(label)}>
                <dd className="font-heading text-3xl leading-none text-gold-300">{value}</dd>
                <dt className="mt-1.5 text-sm font-medium text-cream-200/60">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="absolute inset-x-0 bottom-0 text-river-400/20">
          <WaveRule className="w-full h-10" />
        </div>
      </header>

      {/* ── Flow control ─────────────────────────────────── */}
      <section className="section-container -mt-px pt-10">
        <div className="card-flat flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                flowOn ? "bg-river-100 text-river-700" : "bg-cream-200 text-temple-400"
              }`}
            >
              {locating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Radar className="h-5 w-5" />
              )}
            </span>
            <div>
              <p className="font-semibold text-temple-900">
                {flowOn ? t(yatraUI.flowOn) : t(yatraUI.flow)}
              </p>
              <p className="mt-0.5 text-sm text-temple-500">
                {locating ? t(yatraUI.flowLocating) : t(yatraUI.flowHelp)}
              </p>
            </div>
          </div>

          <button
            onClick={() => setFlowOn((on) => !on)}
            aria-pressed={flowOn}
            className={flowOn ? "btn-secondary" : "btn-primary"}
          >
            {flowOn ? t(yatraUI.flowOn) : t(yatraUI.flowOff)}
          </button>
        </div>

        {geoDenied && (
          <p className="mt-3 text-sm text-sacred-red">{t(yatraUI.flowDenied)}</p>
        )}

        {nearest && (
          <p className="mt-3 flex items-center gap-2 text-sm text-temple-500">
            <MapPin className={`h-4 w-4 ${accent.text}`} />
            {t(yatraUI.flowNearest)}: <strong className="text-temple-800">{t(nearest.stop.name)}</strong>
            <span>· {metresLabel(nearest.km)} {t(yatraUI.flowAway)}</span>
          </p>
        )}

        {/* Only relevant once we have actually fallen back to the device voice. */}
        {mode === "speech" && !supported && (
          <p className="mt-3 text-sm text-temple-500">{t(yatraUI.unsupported)}</p>
        )}
        {mode === "speech" && supported && !voiceOk && (
          <p className="mt-3 text-sm text-temple-500">{t(yatraUI.voiceMissing)}</p>
        )}
      </section>

      {/* ── Route map ────────────────────────────────────── */}
      <section className="section-container pt-12">
        <h2 className="text-eyebrow font-semibold uppercase text-saffron-700">
          {t(yatraUI.mapTitle)}
        </h2>
        <div className="mt-4">
          <TrailMap
            trail={trail}
            locale={locale}
            activeStopId={activeStopId}
            openStopId={openStopId}
            userCoords={flowOn ? coords : null}
            caption={t(yatraUI.mapCaption)}
            youAreHereLabel={t(yatraUI.youAreHere)}
            onSelectStop={(stopId) => {
              setOpenStopId(stopId);
              document
                .getElementById(`stop-${stopId}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
        </div>
      </section>

      {/* ── The stops ────────────────────────────────────── */}
      <section className="section-container py-12 sm:py-16">
        <ol className="relative">
          {/* the route line */}
          <span
            aria-hidden
            className={`absolute left-[19px] top-6 bottom-6 w-px ${accent.line}`}
          />

          {trail.stops.map((stop, index) => {
            const isOpen = openStopId === stop.id;
            const isActive = activeStopId === stop.id;
            const km = distances?.get(stop.id);
            const arrived = km !== undefined && km * 1000 <= stop.radiusM;

            return (
              <li
                key={stop.id}
                id={`stop-${stop.id}`}
                className="relative scroll-mt-24 pl-14 pb-10 last:pb-0"
              >
                {/* stop marker */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 font-heading text-sm font-semibold transition-colors ${
                    isActive
                      ? `${accent.dot} border-transparent text-cream-50`
                      : "border-temple-200 bg-cream-50 text-temple-500"
                  }`}
                >
                  {index + 1}
                </span>
                {isActive && isPlaying && (
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 h-10 w-10 rounded-full ${accent.dot} animate-ripple opacity-40`}
                  />
                )}

                <article
                  className={`rounded-card border transition-colors ${
                    isActive
                      ? "border-gold-300 bg-cream-100"
                      : "border-temple-100 bg-cream-50"
                  }`}
                >
                  <button
                    onClick={() => setOpenStopId(isOpen ? null : stop.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-eyebrow font-semibold uppercase text-temple-400">
                          {t(yatraUI.stopNumber)} {index + 1}
                        </span>
                        {arrived && (
                          <span className={`pill ${accent.chip}`}>
                            {t(yatraUI.flowArrived)}
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 block font-heading text-subtitle text-temple-900">
                        {t(stop.name)}
                      </span>
                      <span className="mt-1 block text-sm text-temple-500">
                        {t(stop.subtitle)}
                      </span>
                      {index > 0 && (
                        <span className="mt-3 flex items-center gap-1.5 text-xs text-temple-400">
                          <Footprints className="h-3.5 w-3.5" />
                          {stop.walkMinutes} {t(yatraUI.minutes)} {t(yatraUI.walkFromPrev)}
                        </span>
                      )}
                    </span>

                    <span
                      className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isActive && isPlaying
                          ? `${accent.dot} text-cream-50`
                          : "bg-cream-200 text-temple-700"
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <span className="flex h-4 items-end gap-[3px]">
                          {[0, 1, 2, 3].map((i) => (
                            <span key={i} className="audio-bar block h-4 w-[3px] rounded-full bg-current" />
                          ))}
                        </span>
                      ) : (
                        <Play className="h-5 w-5 translate-x-[1px]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-temple-100 px-5 pb-6 pt-5 sm:px-6">
                      {/* what to look at */}
                      <div className="flex gap-3 rounded-xl bg-saffron-50 p-4 ring-1 ring-saffron-100">
                        <Eye className="mt-0.5 h-4 w-4 shrink-0 text-saffron-700" />
                        <p className="text-sm leading-relaxed text-saffron-900">
                          <span className="font-semibold">{t(yatraUI.lookFor)}: </span>
                          {t(stop.lookFor)}
                        </p>
                      </div>

                      {/* actions */}
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() =>
                            isActive && isBusy ? togglePlayback() : playStop(stop)
                          }
                          disabled={!supported}
                          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isActive && isPlaying ? (
                            <>
                              <Pause className="h-4 w-4" /> {t(yatraUI.pause)}
                            </>
                          ) : isActive && status === "paused" ? (
                            <>
                              <Play className="h-4 w-4" /> {t(yatraUI.resume)}
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" /> {t(yatraUI.play)}
                            </>
                          )}
                        </button>

                        {isActive && isBusy && (
                          <button onClick={stopPlayback} className="btn-secondary">
                            <Square className="h-4 w-4" /> {t(yatraUI.stopPlayback)}
                          </button>
                        )}

                        <button
                          onClick={() => setShowText((s) => !s)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-temple-600 hover:text-saffron-700"
                        >
                          <Type className="h-4 w-4" />
                          {showText ? t(yatraUI.hideText) : t(yatraUI.readAlong)}
                        </button>

                        <a
                          href={
                            coords
                              ? googleMapsWalkUrl(coords.lat, coords.lng, stop.lat, stop.lng)
                              : `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-temple-600 hover:text-saffron-700"
                        >
                          <Navigation className="h-4 w-4" />
                          {t(yatraUI.directions)}
                        </a>
                      </div>

                      {/* read-along transcript */}
                      {showText && (
                        <StopTranscript
                          stop={stop}
                          locale={locale}
                          deva={deva}
                          activeChunk={
                            isActive && mode === "speech" ? narration.chunkIndex : -1
                          }
                          onSeek={(chunk) => {
                            if (!isActive) {
                              playStop(stop);
                              return;
                            }
                            // Sentence-level seeking only exists for synthesised
                            // speech; recorded audio is scrubbed in the player.
                            if (mode === "speech") narratorRef.current?.seekChunk(chunk);
                          }}
                        />
                      )}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-center text-sm text-temple-400">{t(yatraUI.voiceNote)}</p>
      </section>

      {/* ── Floating player ──────────────────────────────────
          Sits above the SOS button rather than spanning the bottom edge, so
          the two never overlap. */}
      {activeStop && isBusy && (
        <div className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-card border border-temple-100 bg-cream-50/95 shadow-lift backdrop-blur">
          {/* Recorded narration can be scrubbed; synthesised speech only reports
              how far through the sentences it is. */}
          {mode === "audio" && audio.duration > 0 ? (
            <label className="block cursor-pointer px-4 pt-3">
              <span className="sr-only">{t(yatraUI.nowPlaying)}</span>
              <input
                type="range"
                min={0}
                max={1000}
                value={Math.round(progress * 1000)}
                onChange={(e) => seekTo(Number(e.target.value) / 1000)}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-cream-300 accent-saffron-600"
              />
              <span className="mt-1.5 flex justify-between font-mono text-[0.6875rem] text-temple-400">
                <span>{formatTime(audio.current)}</span>
                <span>{formatTime(audio.duration)}</span>
              </span>
            </label>
          ) : (
            <div
              className="h-1 bg-saffron-500 transition-[width] duration-500"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          )}

          <div className="flex items-center gap-2 px-4 py-3 sm:gap-3">
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? t(yatraUI.pause) : t(yatraUI.resume)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.dot} text-cream-50`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 translate-x-[1px]" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold uppercase tracking-wide text-temple-400">
                {t(yatraUI.nowPlaying)}
              </p>
              <p className="truncate font-semibold text-temple-900">{t(activeStop.name)}</p>
            </div>

            <div className="hidden items-center gap-1 sm:flex">
              {[0.8, 0.95, 1.15].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRate(r)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                    rate === r
                      ? "bg-temple-800 text-cream-50"
                      : "text-temple-500 hover:bg-cream-200"
                  }`}
                >
                  {r}×
                </button>
              ))}
            </div>

            {mode === "audio" ? (
              <button
                onClick={() => nudge(-15)}
                aria-label="-15s"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-temple-500 hover:bg-cream-200"
              >
                <Rewind className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => playStop(activeStop)}
                aria-label={t(yatraUI.replay)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-temple-500 hover:bg-cream-200"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={stopPlayback}
              aria-label={t(yatraUI.stopPlayback)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-temple-500 hover:bg-cream-200"
            >
              <Square className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* keeps the last stop clear of the floating player */}
      {activeStop && isBusy && <div aria-hidden className="h-40" />}
    </div>
  );
}

/* ── Read-along transcript, highlighting the spoken sentence ── */
function StopTranscript({
  stop,
  locale,
  deva,
  activeChunk,
  onSeek,
}: {
  stop: StoryStop;
  locale: "en" | "hi" | "mr";
  deva: boolean;
  activeChunk: number;
  onSeek: (chunkIndex: number) => void;
}) {
  // Chapter bodies are chunked in the same order the narrator speaks them, so a
  // running offset maps each sentence back to its global chunk index.
  let offset = 0;

  return (
    <div className={`mt-6 space-y-6 ${deva ? "font-devanagari" : ""}`}>
      {stop.chapters.map((chapter, ci) => {
        const chunks = toChunks(chapter.body[locale]);
        const start = offset;
        offset += chunks.length;

        return (
          <div key={ci}>
            <h4 className="text-eyebrow font-semibold uppercase tracking-wider text-saffron-700">
              {chapter.heading[locale]}
            </h4>
            <p className="mt-2 leading-[1.85] text-temple-700">
              {chunks.map((sentence, si) => {
                const globalIndex = start + si;
                const isSpoken = globalIndex === activeChunk;
                return (
                  <button
                    key={si}
                    onClick={() => onSeek(globalIndex)}
                    className={`rounded px-0.5 text-left transition-colors ${
                      isSpoken
                        ? "bg-gold-200/70 text-temple-900"
                        : "hover:bg-cream-200"
                    }`}
                  >
                    {sentence}{" "}
                  </button>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}

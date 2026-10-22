"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/data/blogData";

const LABEL: Record<Locale, { listen: string; pause: string; speed: string; title: string }> = {
  en: { listen: "Listen to this news", pause: "Pause", speed: "Playback speed", title: "Listen" },
  hi: { listen: "यह खबर सुनें", pause: "रोकें", speed: "गति", title: "सुनें" },
  mr: { listen: "ही बातमी ऐका", pause: "थांबवा", speed: "वेग", title: "ऐका" },
};
const SPEEDS = [1, 1.25, 1.5, 0.75];
const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/** Slim news-anchor player. Rendered only when a pre-generated file exists. */
export default function ListenPlayer({ src, locale }: { src: string; locale: Locale }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const L = LABEL[locale];

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
    setT(0);
  }, [src]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void a.play(); else a.pause();
  };
  const cycle = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (ref.current) ref.current.playbackRate = next;
  };

  return (
    <div className="mt-5 flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-temple-100 bg-white px-2 pr-4 shadow-sm">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? L.pause : L.listen}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron-600 text-white hover:bg-saffron-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
      >
        {playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="ml-0.5 h-4 w-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-temple-800">{L.listen}</p>
        <div
          className="mt-1 h-1 w-full overflow-hidden rounded-full bg-temple-100"
          role="progressbar"
          aria-label={L.title}
          aria-valuemin={0}
          aria-valuemax={Math.round(d) || 0}
          aria-valuenow={Math.round(t)}
        >
          <div className="h-full bg-saffron-500" style={{ width: d ? `${(t / d) * 100}%` : "0%" }} />
        </div>
      </div>
      <span className="shrink-0 text-xs tabular-nums text-temple-500" aria-hidden>
        {fmt(t)}{d ? ` / ${fmt(d)}` : ""}
      </span>
      <button
        type="button"
        onClick={cycle}
        aria-label={`${L.speed}: ${speed}x`}
        className="shrink-0 rounded-full border border-temple-200 px-2 py-0.5 text-xs font-semibold tabular-nums text-temple-700 hover:border-saffron-400"
      >
        {speed}x
      </button>
      <audio
        ref={ref}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => { setD(e.currentTarget.duration); e.currentTarget.playbackRate = speed; }}
      />
    </div>
  );
}

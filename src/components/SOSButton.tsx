"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clock,
  Flame,
  Heart,
  LogOut,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  PhoneCall,
  ShieldAlert,
  Siren,
  Users,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { sosUI } from "@/i18n/sosTranslations";
import { kumbhZones, KumbhZone, ExitPoint } from "@/data/exitRoutes";
import { haversineKm, googleMapsWalkUrl } from "@/lib/geo";

/**
 * Emergency panel.
 *
 * Designed for the worst case: one hand, bright sunlight, no patience, possibly
 * panicking. So there is exactly one thing at the top — call 112 — and
 * everything else is secondary. Every action works without a data connection
 * except the two that explicitly need GPS.
 */

const SECONDARY_CONTACTS = [
  { key: "ambulance", number: "108", Icon: Heart, tone: "#F08A7E" },
  { key: "fire", number: "101", Icon: Flame, tone: "#F4B36C" },
  { key: "womenHelpline", number: "1091", Icon: Users, tone: "#C4A5E8" },
  { key: "kumbhControl", number: "0253-2305555", Icon: Siren, tone: "#DFCC78" },
  { key: "disasterMgmt", number: "0253-2571202", Icon: AlertTriangle, tone: "#A6D8D4" },
] as const;

export default function SOSButton() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [locationState, setLocationState] = useState<"idle" | "sharing" | "shared" | "error">(
    "idle"
  );
  const [exitLoading, setExitLoading] = useState(false);
  const [exitError, setExitError] = useState(false);
  const [nearestZone, setNearestZone] = useState<KumbhZone | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closePanel = useCallback(() => {
    setOpen(false);
    setLocationState("idle");
    setNearestZone(null);
    setUserCoords(null);
    setExitError(false);
    setExitLoading(false);
  }, []);

  const shareLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationState("error");
      return;
    }

    setLocationState("sharing");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const text = `Emergency! My location: https://maps.google.com/?q=${latitude},${longitude}`;

        if (navigator.share) {
          try {
            await navigator.share({ title: "SOS Location", text });
            setLocationState("shared");
            return;
          } catch {
            // Share sheet dismissed — fall through to the clipboard.
          }
        }

        try {
          await navigator.clipboard.writeText(text);
          setLocationState("shared");
        } catch {
          setLocationState("error");
        }
      },
      () => setLocationState("error"),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }, []);

  const findExit = useCallback(() => {
    if (!navigator.geolocation) {
      setExitError(true);
      return;
    }

    setExitLoading(true);
    setExitError(false);
    setNearestZone(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        let minDist = Infinity;
        let closest: KumbhZone | null = null;
        for (const zone of kumbhZones) {
          const dist = haversineKm(latitude, longitude, zone.centerLat, zone.centerLng);
          if (dist < minDist) {
            minDist = dist;
            closest = zone;
          }
        }

        setNearestZone(closest);
        setExitLoading(false);
      },
      () => {
        setExitError(true);
        setExitLoading(false);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Trigger ──────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label={sosUI.title[locale]}
        className="group fixed bottom-5 right-4 z-40 flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3.5 font-bold uppercase tracking-wide text-white transition-transform duration-200 hover:scale-[1.04] active:scale-95 sm:bottom-7 sm:right-7"
        style={{
          background: "linear-gradient(140deg, #D9432F 0%, #C1272D 55%, #7C1D1A 100%)",
          boxShadow: "0 8px 30px -6px rgba(193, 39, 45, 0.6), 0 2px 6px rgba(124, 29, 26, 0.4)",
        }}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="sos-pulse absolute inset-0 rounded-full" />
          <ShieldAlert className="relative h-5 w-5" />
        </span>
        <span className="text-sm">SOS</span>
      </button>

      {/* ── Panel ────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={sosUI.title[locale]}>
          <div
            className="absolute inset-0 bg-indigo-900/75 backdrop-blur-sm"
            onClick={closePanel}
          />

          <div className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl bg-indigo-800 text-cream-100 shadow-lift sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[26rem] sm:rounded-none sm:rounded-l-3xl">
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-cream-200/10 px-6 pb-5 pt-6">
              <div>
                <h2 className="font-heading text-2xl text-cream-50">{sosUI.title[locale]}</h2>
                <p className="mt-1 text-sm text-cream-200/60">{sosUI.keepCalm[locale]}</p>
              </div>
              <button
                onClick={closePanel}
                aria-label={sosUI.close[locale]}
                className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-cream-200/60 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
              {/* The one action that matters */}
              <a
                href="tel:112"
                className="flex items-center gap-4 rounded-2xl px-5 py-4 text-white transition-transform duration-150 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(140deg, #D9432F, #C1272D)",
                  boxShadow: "0 10px 30px -10px rgba(193, 39, 45, 0.8)",
                }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <PhoneCall className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-xl leading-tight">
                    {sosUI.callNow[locale]}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/75">
                    {sosUI.callNowHint[locale]}
                  </span>
                </span>
              </a>

              {/* Location + exit */}
              <div className="mt-5 space-y-3">
                <button
                  onClick={shareLocation}
                  disabled={locationState === "sharing"}
                  className="flex w-full items-center gap-3.5 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-4 py-3.5 text-left transition-colors hover:bg-gold-500/15 disabled:opacity-60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                    {locationState === "sharing" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : locationState === "shared" ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-cream-50">
                      {locationState === "shared"
                        ? sosUI.locationShared[locale]
                        : sosUI.shareLocation[locale]}
                    </span>
                    <span className="mt-0.5 block text-xs text-cream-200/55">
                      {locationState === "error"
                        ? sosUI.locationError[locale]
                        : sosUI.sharingHint[locale]}
                    </span>
                  </span>
                </button>

                <button
                  onClick={findExit}
                  disabled={exitLoading}
                  className="flex w-full items-center gap-3.5 rounded-2xl border border-river-400/30 bg-river-500/10 px-4 py-3.5 text-left transition-colors hover:bg-river-500/15 disabled:opacity-60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-river-500/20 text-river-200">
                    {exitLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <LogOut className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-cream-50">
                      {exitLoading ? sosUI.locatingGps[locale] : sosUI.findNearestExit[locale]}
                    </span>
                    <span className="mt-0.5 block text-xs text-cream-200/55">
                      {exitError ? sosUI.exitRouteError[locale] : sosUI.exitHint[locale]}
                    </span>
                  </span>
                </button>
              </div>

              {/* Exit routes */}
              {nearestZone && userCoords && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-river-300" />
                    <p className="text-xs font-semibold text-river-200">
                      {sosUI.nearestZone[locale]}: {nearestZone.name[locale]}
                    </p>
                  </div>

                  <h3 className="mt-3 font-heading text-lg text-cream-50">
                    {sosUI.exitRoutesTitle[locale]}
                  </h3>

                  <ul className="mt-3 space-y-2.5">
                    {nearestZone.exits.map((exit: ExitPoint) => (
                      <li
                        key={exit.id}
                        className="rounded-xl border border-river-400/20 bg-river-500/[0.07] p-4"
                      >
                        <p className="font-semibold text-cream-50">{exit.name[locale]}</p>
                        <p className="mt-1 text-xs text-cream-200/60">{exit.direction[locale]}</p>
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-cream-200/45">
                          <MapPin className="h-3 w-3 text-gold-400" />
                          {exit.landmark[locale]}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs text-cream-200/55">
                            <Clock className="h-3 w-3" />~{exit.walkMinutes}{" "}
                            {sosUI.walkTime[locale]}
                          </span>
                          <a
                            href={googleMapsWalkUrl(
                              userCoords.lat,
                              userCoords.lng,
                              exit.lat,
                              exit.lng
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-river-400/40 bg-river-500/15 px-3 py-1.5 text-xs font-semibold text-river-100 transition-colors hover:bg-river-500/25"
                          >
                            <Navigation className="h-3 w-3" />
                            {sosUI.navigate[locale]}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-[0.6875rem] leading-relaxed text-cream-200/40">
                    {sosUI.exitDisclaimer[locale]}
                  </p>
                </div>
              )}

              {/* Other helplines */}
              <h3 className="mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cream-200/45">
                {sosUI.otherNumbers[locale]}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {SECONDARY_CONTACTS.map(({ key, number, Icon, tone }) => (
                  <li key={key}>
                    <a
                      href={`tel:${number}`}
                      className="flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors hover:bg-cream-50/[0.06]"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${tone}22`, color: tone }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-cream-100">
                          {sosUI[key][locale]}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-sm text-cream-200/60">{number}</span>
                      <Phone className="h-3.5 w-3.5 shrink-0 text-cream-200/35" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Lost someone */}
              <div className="mt-8 rounded-2xl border border-cream-200/10 bg-cream-50/[0.04] p-5">
                <h3 className="font-heading text-lg text-cream-50">{sosUI.lostTitle[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/60">
                  {sosUI.lostBody[locale]}
                </p>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-cream-200/40">
                {sosUI.helpText[locale]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AD_CLIENT, AD_SLOTS, type AdPlacement } from "@/data/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const LABEL = { en: "Advertisement", hi: "विज्ञापन", mr: "जाहिरात" };

/**
 * One AdSense display unit, placed where a reader has finished something.
 * The box reserves its height so the page never jumps when the ad loads,
 * carries a small "Advertisement" label, and renders nothing when the
 * placement has no slot id yet.
 */
export default function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const { locale } = useLanguage();
  const slot = AD_SLOTS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad blocker or a failed script load; the box stays empty.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside aria-label={LABEL[locale]} className={`my-10 ${className}`}>
      <p className="mb-1.5 text-center text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-temple-300">
        {LABEL[locale]}
      </p>
      <div className="min-h-[280px] overflow-hidden rounded-xl bg-cream-100/60">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}

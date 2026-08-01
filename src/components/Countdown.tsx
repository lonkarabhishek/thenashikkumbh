"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/i18n/translations";

const UNITS = {
  days: { en: "days", hi: "दिन", mr: "दिवस" },
  hours: { en: "hours", hi: "घंटे", mr: "तास" },
  minutes: { en: "minutes", hi: "मिनट", mr: "मिनिटे" },
  seconds: { en: "seconds", hi: "सेकंड", mr: "सेकंद" },
} as const;

/** Devanagari digits for the Indian-language locales, matching the site's style. */
const NUMERALS: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN-u-nu-deva",
  mr: "mr-IN-u-nu-deva",
};

function localiseNumber(value: number, locale: Locale, pad: boolean): string {
  const text = value.toLocaleString(NUMERALS[locale], { useGrouping: false });
  if (!pad) return text;
  // Pad in the target script, so ०७ rather than 07.
  const zero = (0).toLocaleString(NUMERALS[locale]);
  return text.length >= 2 ? text : zero + text;
}

function remaining(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  };
}

/**
 * Live countdown to the first Shahi Snan, sized to stand in for the year in the
 * hero. Renders nothing until mounted so the server and client markup agree.
 */
export default function Countdown({
  target,
  caption,
}: {
  target: Date;
  caption: string;
}) {
  const { locale } = useLanguage();
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setTime(remaining(target));
    const id = setInterval(() => setTime(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = (
    [
      ["days", time?.days ?? 0, false],
      ["hours", time?.hours ?? 0, true],
      ["minutes", time?.minutes ?? 0, true],
      ["seconds", time?.seconds ?? 0, true],
    ] as const
  ).map(([key, value, pad]) => ({
    key,
    label: UNITS[key][locale],
    value: localiseNumber(value, locale, pad),
  }));

  return (
    <div
      className={`transition-opacity duration-700 ${time ? "opacity-100" : "opacity-0"}`}
      aria-live="off"
    >
      <div className="flex items-start justify-center gap-3 sm:gap-6">
        {cells.map((cell, i) => (
          <div key={cell.key} className="flex items-start gap-3 sm:gap-6">
            {i > 0 && (
              <span
                aria-hidden
                className="mt-1 font-heading text-3xl leading-none text-gold-400 sm:text-4xl"
              >
                :
              </span>
            )}
            <div className="text-center">
              <span className="block font-heading text-[2.75rem] leading-none text-saffron-600 tabular-nums sm:text-6xl">
                {cell.value}
              </span>
              <span className="mt-2 block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-temple-400 sm:text-xs">
                {cell.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-temple-500">{caption}</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/LocaleLink";
import RichText from "@/components/RichText";
import StatusBadge from "@/components/blog/StatusBadge";
import type { Locale } from "@/i18n/translations";

/** One timeline entry, already in the reader's language and stamped in IST. */
export interface LiveItem {
  id: string;
  time: string;
  stamp: string;
  headline: string;
  body: string;
  status: "confirmed" | "reported";
  source: string;
}

export interface RelatedStory {
  href: string;
  title: string;
  date: string;
  status: "confirmed" | "reported" | null;
}

const UI = {
  live: { en: "Live", hi: "लाइव", mr: "थेट" },
  updated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  checked: { en: "Checked", hi: "जाँचा", mr: "तपासले" },
  auto: {
    en: "This page checks for new updates every 2 minutes while it is open.",
    hi: "यह पेज खुला रहने पर हर 2 मिनट में नए अपडेट देखता है।",
    mr: "हे पान उघडे असताना दर २ मिनिटांनी नवे अपडेट तपासते.",
  },
  related: { en: "Our stories on 30 and 31 October", hi: "30 और 31 अक्टूबर पर हमारी ख़बरें", mr: "३० आणि ३१ ऑक्टोबरवरील आमच्या बातम्या" },
  ist: { en: "IST", hi: "IST", mr: "IST" },
};

const REFRESH_MS = 120_000;

/**
 * The live timeline. The server renders everything; this component only adds
 * the pulse, a soft refresh (Next's router.refresh, so new updates appear
 * after a deploy without a manual reload) and the "checked at" clock. Stamps
 * for the updates arrive pre-formatted, so there is nothing to mismatch on
 * hydration.
 */
export default function LiveFeed({
  locale,
  items,
  related,
  lastUpdated,
}: {
  locale: Locale;
  items: LiveItem[];
  related: RelatedStory[];
  /** Pre-formatted IST stamp of the newest update. */
  lastUpdated: string;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState<string | null>(null);

  useEffect(() => {
    const clock = () =>
      new Date().toLocaleTimeString(locale === "en" ? "en-IN" : locale === "hi" ? "hi-IN" : "mr-IN", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    setChecked(clock());
    const tick = () => {
      if (document.visibilityState !== "visible") return;
      router.refresh();
      setChecked(clock());
    };
    const id = window.setInterval(tick, REFRESH_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [router, locale]);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-temple-600">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <span className="live-dot h-2 w-2 text-white" aria-hidden />
          {UI.live[locale]}
        </span>
        <span>
          {UI.updated[locale]}: <strong className="text-temple-900">{lastUpdated}</strong>
        </span>
        {checked && (
          <span className="text-temple-400">
            {UI.checked[locale]} {checked} {UI.ist[locale]}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-temple-400">{UI.auto[locale]}</p>

      <ol className="mt-8 space-y-6 border-l-2 border-saffron-300 pl-5" aria-live="polite">
        {items.map((u) => (
          <li key={u.id} id={u.id} className="relative scroll-mt-28">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-cream-50 bg-saffron-500" aria-hidden />
            <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-temple-500">
              <time dateTime={u.time}>{u.stamp}</time>
              <StatusBadge status={u.status} />
            </p>
            <h2 className="mt-1 font-heading text-lg font-bold leading-snug text-temple-900 md:text-xl">{u.headline}</h2>
            <div className="mt-1">
              <RichText text={u.body} tone="light" compact />
            </div>
            <p className="mt-1 text-xs text-temple-500">{u.source}</p>
          </li>
        ))}
      </ol>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="live-related">
          <h2 id="live-related" className="font-heading text-2xl font-bold text-temple-900">
            {UI.related[locale]}
          </h2>
          <ul className="mt-4 divide-y divide-temple-100 rounded-2xl border border-temple-100 bg-cream-50">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="flex items-start justify-between gap-4 p-4 hover:bg-saffron-50">
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug text-temple-900">{r.title}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-temple-400">
                      <span>{r.date}</span>
                      {r.status && <StatusBadge status={r.status} />}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "@/components/LocaleLink";
import { Calendar, Download, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { countdownTargets, countdownDataUpdated, type CountdownTarget } from "@/data/kumbhCountdown";
import { formatDate, formatTime, localDigits } from "@/lib/dates";
import { SITE_URL, localeUrl } from "@/lib/seo";
import { CHECKLIST, COUNTDOWN_COPY as C } from "@/components/tools/toolCopy";
import type { Locale } from "@/i18n/translations";

function parts(targetIso: string, now: number) {
  const ms = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    done: ms === 0,
    d: Math.floor(ms / 86_400_000),
    h: Math.floor(ms / 3_600_000) % 24,
    m: Math.floor(ms / 60_000) % 60,
    s: Math.floor(ms / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");
const compact = (iso: string) => iso.replace(/-/g, "");
function nextDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10).replace(/-/g, "");
}
const icsEscape = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function entry(t: CountdownTarget, locale: Locale) {
  const e = t.event;
  const when = t.hasOfficialTime ? ` (${formatTime(e.startTime!, locale)})` : "";
  const title = `${e.name[locale]}${when}`;
  const details = `${e.location[locale]}. ${localeUrl(locale, "/dates")}`;
  return { title, details, location: e.location[locale] };
}

function icsHref(t: CountdownTarget, locale: Locale) {
  const { title, details, location } = entry(t, locale);
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//thenashikkumbh.com//Kumbh countdown//EN", "BEGIN:VEVENT",
    `UID:${t.event.id}@thenashikkumbh.com`,
    `DTSTAMP:${compact(countdownDataUpdated)}T000000Z`,
    `DTSTART;VALUE=DATE:${compact(t.event.isoDate)}`,
    `DTEND;VALUE=DATE:${nextDay(t.event.isoDate)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(details)}`,
    `LOCATION:${icsEscape(location)}`,
    "END:VEVENT", "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function gcalHref(t: CountdownTarget, locale: Locale) {
  const { title, details, location } = entry(t, locale);
  const q = new URLSearchParams({
    action: "TEMPLATE", text: title, details, location,
    dates: `${compact(t.event.isoDate)}/${nextDay(t.event.isoDate)}`,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

function Clock({ iso, big }: { iso: string; big?: boolean }) {
  const { locale } = useLanguage();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className={big ? "h-24" : "h-14"} aria-hidden="true" />;
  const p = parts(iso, now);
  if (p.done) return <p className="font-semibold text-temple-700">{C.passed[locale]}</p>;
  const cells: [number, keyof typeof C][] = [[p.d, "d"], [p.h, "h"], [p.m, "m"], [p.s, "s"]];
  return (
    <div className="flex gap-3" role="timer" aria-live="off">
      {cells.map(([v, k]) => (
        <div key={k} className="text-center">
          <div className={`font-heading font-bold text-temple-900 ${big ? "text-4xl sm:text-6xl" : "text-2xl"}`}>
            {localDigits(k === "d" ? String(v) : pad(v), locale)}
          </div>
          <div className="text-xs uppercase tracking-wide text-temple-600">{(C[k] as Record<Locale, string>)[locale]}</div>
        </div>
      ))}
    </div>
  );
}

export default function CountdownTool() {
  const { locale } = useLanguage();
  const pageUrl = `${SITE_URL}/${locale}${C.path}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${C.shareText[locale]} ${pageUrl}`)}`;
  const [first, ...rest] = countdownTargets;

  const Row = ({ t, big }: { t: CountdownTarget; big?: boolean }) => {
    const e = t.event;
    return (
      <article className={`rounded-2xl border border-temple-200 bg-white p-5 ${big ? "sm:p-8" : ""}`}>
        <h2 className={`font-heading font-bold text-temple-900 ${big ? "text-2xl" : "text-lg"}`}>{e.name[locale]}</h2>
        <p className="mt-1 text-temple-700">
          {formatDate(e.isoDate, locale, { weekday: true })}
          {t.hasOfficialTime && <>, {formatTime(e.startTime!, locale)}</>} · {e.location[locale]}
        </p>
        <div className="mt-4"><Clock iso={t.targetIso} big={big} /></div>
        <p className="mt-2 text-xs text-temple-500">{t.hasOfficialTime ? C.timeNote[locale] : C.noTimeNote[locale]}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold text-temple-800"><Calendar className="h-4 w-4" />{C.addCal[locale]}:</span>
          <a href={icsHref(t, locale)} download={`${e.id}.ics`} className="inline-flex items-center gap-1 underline"><Download className="h-4 w-4" />{C.ics[locale]}</a>
          <a href={gcalHref(t, locale)} target="_blank" rel="noopener noreferrer" className="underline">{C.gcal[locale]}</a>
        </p>
      </article>
    );
  };

  return (
    <>
      <Row t={first} big />
      <p className="mt-4">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
          <Share2 className="h-4 w-4" />{C.share[locale]}
        </a>
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rest.map((t) => <Row key={t.event.id} t={t} />)}
      </div>
      <p className="mt-6 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">
        {C.datesLead[locale]}{" "}
        <Link href="/dates" className="font-semibold text-saffron-700 underline">{C.datesLink[locale]}</Link>.{" "}
        <Link href="/share-snan-card" className="font-semibold text-saffron-700 underline">{{ en: "Make a shareable reminder card", hi: "शेयर करने लायक रिमाइंडर कार्ड बनाएँ", mr: "शेअर करण्यासाठी रिमाइंडर कार्ड बनवा" }[locale]}</Link>.{" "}
        <span className="text-sm text-temple-600">{C.updated[locale]}: {formatDate(countdownDataUpdated, locale)}</span>
      </p>
      <section className="mt-12" aria-labelledby="checklist">
        <h2 id="checklist" className="font-heading text-2xl font-bold text-temple-900">{C.checklistH[locale]}</h2>
        <p className="mt-1 text-sm text-temple-600">{C.checklistNote[locale]}</p>
        <ul className="mt-4 space-y-3">
          {CHECKLIST.map((c) => (
            <li key={c.text.en} className="flex gap-3 text-temple-800">
              <span aria-hidden="true">☐</span>
              <span>
                {c.text[locale]}{" "}
                {c.href && c.link && <Link href={c.href} className="font-semibold text-saffron-700 underline">{c.link[locale]}</Link>}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

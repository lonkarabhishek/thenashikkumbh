"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { statusItems } from "@/data/kumbhStatus";
import { schedule } from "@/data/verified";
import { formatDate, localDigits } from "@/lib/dates";
import { SITE_URL } from "@/lib/seo";
import { CHECKLIST, STATUS_COPY } from "@/components/tools/toolCopy";
import { PLAN_COPY as C } from "@/components/tools/planCopy";

const INSIDE = (d: string, a: string, b: string) => d >= a && d <= b;
const PRE_EVENT_DATES = ["2026-10-17", "2026-10-20", "2026-10-25"];
const FLAG_DAY = "2026-10-31";

export default function PlanTool() {
  const { locale } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [size, setSize] = useState(2);
  const ready = !!from && !!to;
  const bad = ready && to < from;
  const ok = ready && !bad;

  const items = ok
    ? statusItems.filter((i) => {
        // Heliport flights may start on 2 November 2026; only show it for trips that reach that date.
        if (i.id === "trimbak-heliport") return to >= "2026-11-02";
        return true; // current access status, works progress and hospital: good to know on any date
      })
    : [];
  const events = ok
    ? schedule.filter((e) => INSIDE(e.isoDate, from, to)).sort((a, b) => a.isoDate.localeCompare(b.isoDate))
    : [];
  const hasAmrit = events.some((e) => e.isAmritSnan);
  const preDates = ok ? PRE_EVENT_DATES.filter((d) => INSIDE(d, from, to)) : [];
  const nothing = ok && items.filter((i) => i.id !== "trimbak-hospital").length === 0 && events.length === 0;

  const sizeN = Math.max(1, Math.min(500, Math.floor(size) || 1));
  const summary = ok ? `${formatDate(from, locale)} – ${formatDate(to, locale)} · ${localDigits(String(sizeN), locale)} ${C.people[locale]}` : "";
  const waText = ok
    ? `${C.shareLead[locale]}: ${summary}. ${SITE_URL}/${locale}${C.path}`
    : "";

  return (
    <>
      <form className="mt-6 grid gap-4 rounded-2xl border border-temple-200 bg-white p-5 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-sm font-semibold text-temple-800">{C.from[locale]}
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 w-full rounded-lg border border-temple-300 p-2 font-normal" />
        </label>
        <label className="block text-sm font-semibold text-temple-800">{C.to[locale]}
          <input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} className="mt-1 w-full rounded-lg border border-temple-300 p-2 font-normal" />
        </label>
        <label className="block text-sm font-semibold text-temple-800">{C.group[locale]}
          <input type="number" min={1} max={500} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-temple-300 p-2 font-normal" />
        </label>
      </form>

      {!ready && <p className="mt-4 text-temple-600">{C.pickDates[locale]}</p>}
      {bad && <p role="alert" className="mt-4 font-semibold text-red-800">{C.badRange[locale]}</p>}

      {ok && (
        <div className="mt-6" aria-live="polite">
          <p className="rounded-lg bg-temple-900 px-4 py-2 font-semibold text-cream-50">{C.summary[locale]}: {summary}</p>

          {to > FLAG_DAY && <p className="mt-3 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">{C.later[locale]}</p>}

          {events.length > 0 && (
            <section className="mt-6">
              <h2 className="font-heading text-xl font-bold text-temple-900">{C.eventsH[locale]}</h2>
              <ul className="mt-3 space-y-2">
                {events.map((e) => (
                  <li key={e.id} className="rounded-xl border border-temple-200 bg-white p-4 text-temple-800">
                    <strong>{formatDate(e.isoDate, locale, { weekday: true })}</strong>: {e.name[locale]} · {e.location[locale]}
                  </li>
                ))}
              </ul>
              {hasAmrit && <p className="mt-3 text-sm text-temple-700">{C.crowd[locale]}</p>}
            </section>
          )}

          {nothing && <p className="mt-6 rounded-xl border border-temple-200 bg-white p-4 text-temple-800">{C.none[locale]}</p>}

          {items.length > 0 && (
            <section className="mt-6">
              <h2 className="font-heading text-xl font-bold text-temple-900">{C.applies[locale]}</h2>
              <ul className="mt-3 space-y-3">
                {items.map((i) => (
                  <li key={i.id} className="rounded-xl border border-temple-200 bg-white p-4">
                    <p className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase">
                      <span className="rounded-full bg-temple-100 px-3 py-1 text-temple-900">{STATUS_COPY.states[i.state][locale]}</span>
                      <span className="rounded-full border border-temple-700 px-3 py-1 text-temple-800">{STATUS_COPY[i.confidence][locale]}</span>
                    </p>
                    <p className="mt-2 font-heading text-lg font-bold text-temple-900">{i.place[locale]}</p>
                    <p className="font-semibold text-temple-800">{i.headline[locale]}</p>
                    {i.id === "oct-events" && preDates.length > 0 && (
                      <p className="mt-1 text-sm text-temple-700">{preDates.map((d) => formatDate(d, locale)).join(", ")}</p>
                    )}
                    <p className="mt-1 text-sm">
                      <Link href={`/kumbh-status#${i.id}`} className="font-semibold text-saffron-700 underline">{C.full[locale]}</Link>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-8">
            <h2 className="font-heading text-xl font-bold text-temple-900">{C.checklistH[locale]}</h2>
            <ul className="mt-3 space-y-3">
              <li className="flex gap-3 text-temple-800"><span aria-hidden="true">☐</span><span>{C.groupItem[locale]}</span></li>
              {CHECKLIST.filter((c) => c.href !== "/emergency").map((c) => (
                <li key={c.text.en} className="flex gap-3 text-temple-800">
                  <span aria-hidden="true">☐</span>
                  <span>{c.text[locale]}{" "}{c.href && c.link && <Link href={c.href} className="font-semibold text-saffron-700 underline">{c.link[locale]}</Link>}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-6">
            <a href={`https://wa.me/?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex">{C.share[locale]}</a>
          </p>
        </div>
      )}

      <p className="mt-6 text-sm text-temple-600">{C.disclaimer[locale]}</p>
      <p className="mt-4 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">
        {C.datesLead[locale]} <Link href="/dates" className="font-semibold text-saffron-700 underline">{C.datesLink[locale]}</Link>.
      </p>
    </>
  );
}

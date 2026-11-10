"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { statusItems, statusBoardUpdated } from "@/data/kumbhStatus";
import { formatDate } from "@/lib/dates";
import { STATUS_COPY as C } from "@/components/tools/toolCopy";

const STATE_STYLE: Record<string, string> = {
  open: "bg-emerald-100 text-emerald-900",
  underway: "bg-sky-100 text-sky-900",
  closed: "bg-red-100 text-red-900",
  restricted: "bg-amber-100 text-amber-900",
  upcoming: "bg-violet-100 text-violet-900",
  unsettled: "bg-slate-200 text-slate-900",
};

export default function StatusBoard() {
  const { locale } = useLanguage();
  return (
    <>
      <p className="mt-6 inline-block rounded-lg bg-temple-900 px-4 py-2 font-semibold text-cream-50">
        {C.lastUpdated[locale]}: <time dateTime={statusBoardUpdated}>{formatDate(statusBoardUpdated, locale)}</time>
      </p>
      <p className="mt-3 text-sm text-temple-600">{C.legend[locale]}</p>
      <div className="mt-6 space-y-5">
        {statusItems.map((i) => (
          <article key={i.id} id={i.id} className="rounded-2xl border border-temple-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${STATE_STYLE[i.state]}`}>{C.states[i.state][locale]}</span>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${i.confidence === "confirmed" ? "border-emerald-700 text-emerald-800" : "border-amber-700 text-amber-800"}`}>
                {C[i.confidence][locale]}
              </span>
              <span className="text-xs text-temple-500">{C.itemChecked[locale]}: {formatDate(i.lastUpdated, locale)}</span>
            </div>
            <h2 className="mt-3 font-heading text-xl font-bold text-temple-900">{i.place[locale]}</h2>
            <p className="font-semibold text-temple-800">{i.headline[locale]}</p>
            <p className="mt-2 leading-relaxed text-temple-700">{i.detail[locale]}</p>
            {i.confidenceNote && <p className="mt-2 text-sm text-temple-600">{i.confidenceNote[locale]}</p>}
            {i.unknown && (
              <p className="mt-2 text-sm text-temple-700"><strong>{C.notKnown[locale]}:</strong> {i.unknown[locale]}</p>
            )}
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a href={i.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{C.source[locale]}: {i.sourceTitle}</a>
              <Link href={`/blog/${i.newsSlug}`} className="font-semibold text-saffron-700 underline">{C.fullStory[locale]}</Link>
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-temple-600">{C.disclaimer[locale]}</p>
    </>
  );
}

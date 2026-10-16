"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { mapPlaces, googleEmbed, googleLink, googleDirections } from "@/data/mapPlaces";
import { MAP_COPY as C } from "@/components/tools/mapCopy";

export default function MapTool() {
  const { locale } = useLanguage();
  const [id, setId] = useState(mapPlaces[0].id);
  const p = mapPlaces.find((x) => x.id === id) ?? mapPlaces[0];
  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={C.pick[locale]}>
        {mapPlaces.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setId(m.id)}
            aria-pressed={m.id === id}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${m.id === id ? "border-temple-900 bg-temple-900 text-cream-50" : "border-temple-300 bg-white text-temple-900"}`}
          >
            {m.name[locale]}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-temple-200 bg-white">
        <iframe key={p.id} title={p.name[locale]} src={googleEmbed(p)} className="h-80 w-full sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <p className="mt-1 text-xs text-temple-500">{C.attribution[locale]}</p>
      <section className="mt-4 rounded-2xl border border-temple-200 bg-white p-5">
        <h2 className="font-heading text-xl font-bold text-temple-900">{p.name[locale]}</h2>
        <p className="mt-2 leading-relaxed text-temple-700">{p.note[locale]}</p>
        <p className="mt-2 text-sm text-temple-600">{C.coords[locale]}: {p.lat.toFixed(5)}, {p.lon.toFixed(5)}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href={googleLink(p)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{C.open[locale]}</a>
          <a href={googleDirections(p)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{C.directions[locale]}</a>
          <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{C.source[locale]}: {p.sourceLabel}</a>
          <Link href={p.page} className="font-semibold text-saffron-700 underline">{C.more[locale]}</Link>
        </p>
      </section>
      <section className="mt-6 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">
        <h2 className="font-heading text-lg font-bold">{C.missingH[locale]}</h2>
        <p className="mt-1">{C.missing[locale]}</p>
      </section>
    </>
  );
}

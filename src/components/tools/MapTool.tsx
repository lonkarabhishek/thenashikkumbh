"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { mapPlaces, googleEmbed, googleLink, googleDirections } from "@/data/mapPlaces";
import { MAP_COPY as C } from "@/components/tools/mapCopy";
import { useConsent } from "@/lib/consent";

const EMBED = {
  note: {
    en: "This map is loaded from Google Maps, which sets Google cookies. It stays off until you accept cookies or tap Show map.",
    hi: "यह नक्शा Google Maps से लोड होता है और Google की कुकीज़ रखता है। जब तक आप कुकीज़ स्वीकार न करें या \"नक्शा दिखाएँ\" न दबाएँ, यह बंद रहता है।",
    mr: "हा नकाशा Google Maps वरून लोड होतो आणि Google च्या कुकीज ठेवतो. तुम्ही कुकीज स्वीकारेपर्यंत किंवा \"नकाशा दाखवा\" दाबेपर्यंत तो बंद राहतो.",
  },
  show: { en: "Show map", hi: "नक्शा दिखाएँ", mr: "नकाशा दाखवा" },
};

export default function MapTool() {
  const { locale } = useLanguage();
  const [id, setId] = useState(mapPlaces[0].id);
  const [showMap, setShowMap] = useState(false);
  const consent = useConsent();
  const mapAllowed = consent === "all" || showMap;
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
        {mapAllowed ? (
          <iframe key={p.id} title={p.name[locale]} src={googleEmbed(p)} className="h-80 w-full sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          <div className="flex h-80 flex-col items-center justify-center gap-4 bg-cream-100 px-6 text-center sm:h-96">
            <p className="max-w-md text-sm leading-relaxed text-temple-700">{EMBED.note[locale]}</p>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="rounded-full bg-temple-900 px-5 py-2.5 text-sm font-semibold text-cream-50"
            >
              {EMBED.show[locale]}
            </button>
            <a href={googleLink(p)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline">
              {C.open[locale]}
            </a>
          </div>
        )}
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

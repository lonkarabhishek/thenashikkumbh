"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "@/components/LocaleLink";
import PhotoCredit from "@/components/photos/PhotoCredit";
import { useLanguage } from "@/context/LanguageContext";
import { PHOTO_TOPICS, TOPIC_LABEL, availablePhotos, type CommonsPhoto } from "@/data/photos";


const COPY = {
  title: { en: "Kumbh Mela Photos", hi: "कुंभ मेला फोटो", mr: "कुंभमेळा फोटो" },
  intro: {
    en: "Photos of Nashik, Trimbakeshwar and earlier Simhasthas, freely licensed on Wikimedia Commons. Every photo is credited to its photographer.",
    hi: "नाशिक, त्र्यंबकेश्वर और पिछले सिंहस्थों की तस्वीरें, विकिमीडिया कॉमन्स पर मुक्त लाइसेंस के साथ। हर फोटो पर फोटोग्राफर का श्रेय दिया गया है।",
    mr: "नाशिक, त्र्यंबकेश्वर आणि आधीच्या सिंहस्थांची छायाचित्रे, विकिमीडिया कॉमन्सवर मुक्त परवान्यासह. प्रत्येक फोटोवर छायाचित्रकाराचे श्रेय दिले आहे.",
  },
  credits: { en: "All photo credits", hi: "सभी फोटो श्रेय", mr: "सर्व फोटो श्रेय" },
  close: { en: "Close", hi: "बंद करें", mr: "बंद करा" },
  prev: { en: "Previous photo", hi: "पिछली फोटो", mr: "मागील फोटो" },
  next: { en: "Next photo", hi: "अगली फोटो", mr: "पुढील फोटो" },
};

export default function CommonsGallery() {
  const { t } = useLanguage();
  const groups = PHOTO_TOPICS.map((topic) => ({
    topic,
    items: availablePhotos.filter((p) => p.topic === topic),
  })).filter((g) => g.items.length > 0);
  const flat = groups.flatMap((g) => g.items);

  const [open, setOpen] = useState<number | null>(null);
  const current: CommonsPhoto | undefined = open === null ? undefined : flat[open];

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + flat.length) % flat.length)),
    [flat.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pt-36">
      <div className="section-container">
        <h1 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">{t(COPY.title)}</h1>
        <p className="mt-4 max-w-3xl text-lg text-temple-600">{t(COPY.intro)}</p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
          {groups.map((g) => (
            <a
              key={g.topic}
              href={`#${g.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-full border border-temple-200 px-3 py-1 text-sm text-temple-700 hover:bg-saffron-50"
            >
              {t(TOPIC_LABEL[g.topic] ?? { en: g.topic, hi: g.topic, mr: g.topic })}
            </a>
          ))}
        </nav>

        {groups.map((g) => (
          <section key={g.topic} id={g.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="mt-14 scroll-mt-28">
            <h2 className="font-heading text-2xl font-bold text-temple-900">
              {t(TOPIC_LABEL[g.topic] ?? { en: g.topic, hi: g.topic, mr: g.topic })}
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <li key={p.id}>
                  <figure>
                    <button
                      type="button"
                      onClick={() => setOpen(flat.indexOf(p))}
                      className="block w-full overflow-hidden rounded-xl"
                    >
                      <Image
                        src={p.file}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-[4/3] w-full object-cover transition-transform hover:scale-[1.02]"
                      />
                    </button>
                    <figcaption className="mt-2 text-sm text-temple-700">
                      {p.caption}
                      <PhotoCredit photo={p} className="mt-1 text-temple-500" />
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-14 text-sm">
          <Link href="/credits" className="rich-link text-[#a0522d]">
            {t(COPY.credits)}
          </Link>
        </p>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[70] flex flex-col bg-black/90 p-4 text-cream-50"
          onClick={() => setOpen(null)}
        >
          <div className="flex justify-end">
            <button type="button" onClick={() => setOpen(null)} aria-label={t(COPY.close)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} aria-label={t(COPY.prev)} className="absolute left-0 p-3">
              <ChevronLeft className="h-8 w-8" />
            </button>
            <Image
              src={current.file}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-[75vh] w-auto object-contain"
            />
            <button type="button" onClick={() => step(1)} aria-label={t(COPY.next)} className="absolute right-0 p-3">
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
          <div className="mx-auto max-w-3xl py-3 text-center text-sm" onClick={(e) => e.stopPropagation()}>
            {current.caption}
            <PhotoCredit photo={current} className="mt-1" />
          </div>
        </div>
      )}
    </div>
  );
}

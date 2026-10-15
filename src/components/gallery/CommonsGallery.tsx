"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "@/components/LocaleLink";
import PhotoCredit from "@/components/photos/PhotoCredit";
import { useLanguage } from "@/context/LanguageContext";
import { galleryFaqs, galleryPhotoCount } from "@/data/galleryFaq";
import { PHOTO_TOPICS, TOPIC_LABEL, availablePhotos, type CommonsPhoto } from "@/data/photos";

const PHOTO_COUNT = galleryPhotoCount();

const COPY = {
  title: { en: "Photos of Kumbh Mela Nashik", hi: "नाशिक कुंभ मेला फोटो", mr: "नाशिक कुंभमेळा फोटो" },
  intro: {
    en: `This gallery shows ${PHOTO_COUNT} freely licensed photos of Nashik, Trimbakeshwar and earlier Simhasthas. Every photo is credited to its photographer.`,
    hi: `इस गैलरी में नाशिक, त्र्यंबकेश्वर और पहले के सिंहस्थों की ${PHOTO_COUNT} मुक्त-लाइसेंस तस्वीरें हैं। हर फोटो पर फोटोग्राफर का श्रेय दिया गया है।`,
    mr: `या गॅलरीत नाशिक, त्र्यंबकेश्वर आणि आधीच्या सिंहस्थांची ${PHOTO_COUNT} मुक्त-परवाना छायाचित्रे आहेत. प्रत्येक फोटोवर छायाचित्रकाराचे श्रेय दिले आहे.`,
  },
  relatedTitle: {
    en: "Related guides",
    hi: "संबंधित गाइड",
    mr: "संबंधित मार्गदर्शक",
  },
  faqTitle: {
    en: "Common questions about these photos",
    hi: "इन तस्वीरों के बारे में आम सवाल",
    mr: "या छायाचित्रांबद्दल नेहमीचे प्रश्न",
  },
  credits: { en: "All photo credits", hi: "सभी फोटो श्रेय", mr: "सर्व फोटो श्रेय" },
  close: { en: "Close", hi: "बंद करें", mr: "बंद करा" },
  prev: { en: "Previous photo", hi: "पिछली फोटो", mr: "मागील फोटो" },
  next: { en: "Next photo", hi: "अगली फोटो", mr: "पुढील फोटो" },
};

const RELATED = [
  {
    href: "/ghats",
    label: {
      en: "Ramkund and Godavari ghats guide",
      hi: "रामकुंड और गोदावरी घाट गाइड",
      mr: "रामकुंड व गोदावरी घाट मार्गदर्शक",
    },
  },
  {
    href: "/dates",
    label: {
      en: "Amrit Snan dates 2027 (all Kumbh dates)",
      hi: "अमृत स्नान तिथियाँ 2027 (सभी कुंभ तिथियाँ)",
      mr: "अमृत स्नान तारखा २०२७ (सर्व कुंभ तारखा)",
    },
  },
  {
    href: "/kumbh-countdown",
    label: { en: "Nashik Kumbh 2027 countdown", hi: "नाशिक कुंभ 2027 काउंटडाउन", mr: "नाशिक कुंभ २०२७ काउंटडाउन" },
  },
  {
    href: "/kumbh-status",
    label: { en: "Kumbh status board: what is open or closed", hi: "कुंभ स्टेटस बोर्ड: क्या खुला या बंद", mr: "कुंभ स्टेटस बोर्ड: काय खुले किंवा बंद" },
  },
  {
    href: "/naga-sadhus",
    label: {
      en: "Naga Sadhus and akhadas at Nashik Kumbh",
      hi: "नाशिक कुंभ में नागा साधु और अखाड़े",
      mr: "नाशिक कुंभातील नागा साधू आणि आखाडे",
    },
  },
];

export default function CommonsGallery() {
  const { locale, t } = useLanguage();
  const faqs = galleryFaqs();
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

        <nav aria-label={COPY.relatedTitle[locale]} className="mt-6 rounded-xl border border-temple-200 bg-cream-100 p-4 sm:p-5">
          <h2 className="font-heading text-base font-bold text-temple-900">{t(COPY.relatedTitle)}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-temple-800">
            {RELATED.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline">
                  {l.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
                        alt={`${p.alt} (Nashik Kumbh Mela photo gallery)`}
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

        <section className="mt-16 max-w-3xl" aria-labelledby="gallery-faq-title">
          <h2 id="gallery-faq-title" className="font-heading text-2xl font-bold text-temple-900 md:text-3xl">
            {t(COPY.faqTitle)}
          </h2>
          <div className="mt-6 divide-y divide-temple-100 rounded-card border border-temple-100 bg-cream-50">
            {faqs.map((f) => (
              <div key={f.q.en} className="p-5 sm:p-6">
                <h3 className="font-semibold text-temple-900">{t(f.q)}</h3>
                <p className="mt-2 leading-relaxed text-temple-600">{t(f.a)}</p>
              </div>
            ))}
          </div>
        </section>

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
              alt={`${current.alt} (Nashik Kumbh Mela photo gallery)`}
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

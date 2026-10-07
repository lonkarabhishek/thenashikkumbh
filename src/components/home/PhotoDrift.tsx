"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

/** Only what the strip shows; the server picks the photos. */
export interface DriftPhoto {
  id: number;
  file: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  license: string;
}

const COPY = {
  kicker: { en: "Glimpses", hi: "झलकियाँ", mr: "झलक" },
  title: {
    en: "Ghats, temples and the Kumbh, in pictures",
    hi: "घाट, मंदिर और कुंभ, तस्वीरों में",
    mr: "घाट, मंदिरे आणि कुंभमेळा, छायाचित्रांतून",
  },
  gallery: { en: "Open the gallery", hi: "गैलरी देखें", mr: "गॅलरी पाहा" },
  credit: {
    en: "Photos from Wikimedia Commons. Every photographer and licence is listed on the",
    hi: "तस्वीरें विकिमीडिया कॉमन्स से। हर फ़ोटोग्राफ़र और लाइसेंस की सूची",
    mr: "छायाचित्रे विकिमीडिया कॉमन्सवरून. प्रत्येक छायाचित्रकार आणि परवान्याची यादी",
  },
  creditLink: { en: "credits page", hi: "क्रेडिट पेज पर है", mr: "क्रेडिट पानावर आहे" },
};

const HEIGHT = 224;

/**
 * A slow, endless strip of Commons photos. It drifts sideways (about four
 * minutes per loop), pauses under the pointer or keyboard focus, and sits
 * still for anyone who has asked their device for reduced motion.
 */
export default function PhotoDrift({ photos }: { photos: DriftPhoto[] }) {
  const { t } = useLanguage();
  if (photos.length === 0) return null;

  const tile = (p: DriftPhoto, copy: boolean) => (
    <li key={`${copy ? "b" : "a"}-${p.id}`} className="shrink-0 pr-4" aria-hidden={copy || undefined}>
      <Link
        href="/gallery"
        tabIndex={copy ? -1 : undefined}
        title={`${p.author}, ${p.license}`}
        className="group block overflow-hidden rounded-xl bg-cream-200"
      >
        <Image
          src={p.file}
          alt={copy ? "" : p.alt}
          width={Math.round((HEIGHT * p.width) / p.height)}
          height={HEIGHT}
          sizes={`${Math.round((HEIGHT * p.width) / p.height)}px`}
          loading="lazy"
          className="h-44 w-auto object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-56"
        />
      </Link>
    </li>
  );

  return (
    <section className="section-y overflow-hidden" aria-labelledby="glimpses-title">
      <div className="section-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow">{t(COPY.kicker)}</span>
            <h2 id="glimpses-title" className="mt-5 text-title text-balance">
              {t(COPY.title)}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
          >
            {t(COPY.gallery)}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="photo-drift mt-10">
        <ul className="photo-drift-track">
          {photos.map((p) => tile(p, false))}
          {photos.map((p) => tile(p, true))}
        </ul>
      </div>

      <p className="section-container mt-5 text-xs text-temple-400">
        {t(COPY.credit)}{" "}
        <Link href="/credits" className="underline underline-offset-2 hover:text-temple-700">
          {t(COPY.creditLink)}
        </Link>
        .
      </p>
    </section>
  );
}

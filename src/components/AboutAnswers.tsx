"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import AuthorBox from "@/components/trust/AuthorBox";
import { ABOUT_SOURCES, aboutFaqs, aboutInBrief } from "@/data/aboutFaq";

/**
 * Direct answers for /about: a short "in brief" box under the hero and a FAQ
 * near the end, both from src/data/aboutFaq.ts (which also feeds the FAQPage
 * schema). Dates link to /dates, the canonical page for the schedule.
 */

const COPY = {
  brief: { mr: "थोडक्यात", hi: "संक्षेप में", en: "In brief" },
  faq: {
    mr: "कुंभमेळा: नेहमी विचारले जाणारे प्रश्न",
    hi: "कुंभ मेला: अक्सर पूछे जाने वाले सवाल",
    en: "Kumbh Mela: common questions",
  },
  datesLink: {
    mr: "नाशिक कुंभमेळा २०२७ च्या सर्व तारखा पाहा",
    hi: "नाशिक कुंभ 2027 की सभी तिथियाँ देखें",
    en: "See all Nashik Kumbh 2027 dates",
  },
  sources: { mr: "स्रोत", hi: "स्रोत", en: "Sources" },
  related: { mr: "संबंधित मार्गदर्शक", hi: "संबंधित गाइड", en: "Related guides" },
};

const RELATED = [
  {
    href: "/dates",
    label: {
      mr: "अमृत स्नान तारखा २०२७ आणि संपूर्ण वेळापत्रक",
      hi: "अमृत स्नान तिथियाँ 2027 और पूरा कार्यक्रम",
      en: "Amrit Snan dates 2027 and the full schedule",
    },
  },
  {
    href: "/trimbakeshwar-kumbh-2027",
    label: {
      mr: "त्र्यंबकेश्वर कुंभमेळा २०२७: कुशावर्त आणि शैव आखाडे",
      hi: "त्र्यंबकेश्वर कुंभ 2027: कुशावर्त और शैव अखाड़े",
      en: "Trimbakeshwar Kumbh 2027: Kushavarta and the Shaiva akhadas",
    },
  },
  {
    href: "/ghats",
    label: {
      mr: "रामकुंड आणि गोदावरीवरील स्नान घाट",
      hi: "रामकुंड और गोदावरी के स्नान घाट",
      en: "Ramkund and the Godavari bathing ghats",
    },
  },
  {
    href: "/naga-sadhus",
    label: {
      mr: "नागा साधू आणि आखाड्यांची परंपरा",
      hi: "नागा साधु और अखाड़ों की परंपरा",
      en: "Naga sadhus and the akhada tradition",
    },
  },
];

export function AboutInBrief() {
  const { locale } = useLanguage();
  return (
    <section className="section-container relative z-10 py-8" aria-labelledby="about-in-brief">
      <div className="mx-auto max-w-3xl rounded-card border border-saffron-200 bg-cream-50 p-6 shadow-lift sm:p-8">
        <h2 id="about-in-brief" className="font-heading text-2xl text-temple-900">
          {COPY.brief[locale]}
        </h2>
        <p className="mt-3 leading-relaxed text-temple-700">{aboutInBrief(locale)}</p>
        <p className="mt-3">
          <Link href="/dates" className="font-semibold text-saffron-700 underline">
            {COPY.datesLink[locale]}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function AboutFaq() {
  const { locale } = useLanguage();
  return (
    <section className="section-container py-16 md:py-20" aria-labelledby="about-faq-title">
      <div className="mx-auto max-w-3xl">
        <h2 id="about-faq-title" className="font-heading text-3xl text-temple-900">
          {COPY.faq[locale]}
        </h2>
        <div className="mt-8 divide-y divide-temple-100 rounded-card border border-temple-100 bg-cream-50">
          {aboutFaqs(locale).map((f) => (
            <div key={f.q.en} className="p-5 sm:p-6">
              <h3 className="font-semibold text-temple-900">{f.q[locale]}</h3>
              <p className="mt-2 leading-relaxed text-temple-600">{f.a[locale]}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-temple-500">
          {COPY.sources[locale]}:{" "}
          {ABOUT_SOURCES.map((s, i) => (
            <span key={s.url}>
              {i > 0 && "; "}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                {s.label}
              </a>
            </span>
          ))}
        </p>

        <nav aria-label={COPY.related[locale]} className="mt-10 rounded-xl border border-temple-200 bg-cream-50 p-5">
          <h2 className="font-heading text-lg font-bold text-temple-900">{COPY.related[locale]}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {RELATED.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-temple-900 underline">
                  {l.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <AuthorBox />
      </div>
    </section>
  );
}

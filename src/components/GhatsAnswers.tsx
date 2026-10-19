"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import AuthorBox from "@/components/trust/AuthorBox";
import { GHATS_SOURCES, ghatsFaqs, ghatsInBrief } from "@/data/ghatsFaq";

/**
 * Direct answers for /ghats: a short "in brief" box near the top and a FAQ
 * before the closing banner, both from src/data/ghatsFaq.ts (which also feeds
 * the FAQPage schema). Dates link to /dates, the canonical page for them.
 */

const COPY = {
  brief: { mr: "थोडक्यात", hi: "संक्षेप में", en: "In brief" },
  faq: {
    mr: "नाशिकचे घाट: नेहमी विचारले जाणारे प्रश्न",
    hi: "नाशिक के घाट: अक्सर पूछे जाने वाले सवाल",
    en: "Nashik ghats: common questions",
  },
  datesLink: {
    mr: "अमृत स्नानाच्या सर्व तारखा पाहा",
    hi: "अमृत स्नान की सभी तिथियाँ देखें",
    en: "See all Amrit Snan dates",
  },
  statusLink: {
    mr: "रामकुंड आणि कुशावर्त आज खुले आहेत का? स्थिती फलक पाहा",
    hi: "रामकुंड और कुशावर्त आज खुले हैं? स्टेटस बोर्ड देखें",
    en: "Are Ramkund and Kushavarta open today? Check the status board",
  },
  sources: { mr: "स्रोत", hi: "स्रोत", en: "Sources" },
  related: { mr: "संबंधित मार्गदर्शक", hi: "संबंधित गाइड", en: "Related guides" },
};

const RELATED = [
  {
    href: "/dates",
    label: {
      mr: "नाशिक कुंभमेळा २०२७: अमृत स्नानाच्या तारखा आणि वेळापत्रक",
      hi: "नाशिक कुंभ 2027: अमृत स्नान की तिथियाँ और कार्यक्रम",
      en: "Nashik Kumbh 2027 Amrit Snan dates and schedule",
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
    href: "/blog/12-new-ghats-nashik-trimbakeshwar-march-2027",
    label: {
      mr: "सिंहस्थ २०२७ साठी १२ नवे घाट: नावे, लांबी आणि खर्च",
      hi: "सिंहस्थ 2027 के लिए 12 नए घाट: नाम, लंबाई और लागत",
      en: "12 new ghats for Simhastha 2027: names, lengths and cost",
    },
  },
  {
    href: "/map",
    label: {
      mr: "रामकुंड, कपालेश्वर आणि त्र्यंबकेश्वरचा कुंभ नकाशा",
      hi: "रामकुंड, कपालेश्वर और त्र्यंबकेश्वर का कुंभ नक्शा",
      en: "Kumbh map of Ramkund, Kapaleshwar and Trimbakeshwar",
    },
  },
  {
    href: "/how-to-reach",
    label: {
      mr: "नाशिक आणि रामकुंडला कसे पोहोचायचे",
      hi: "नाशिक और रामकुंड कैसे पहुँचें",
      en: "How to reach Nashik and Ramkund",
    },
  },
];

export function GhatsInBrief() {
  const { locale } = useLanguage();
  return (
    <section className="bg-cream-50 py-8" aria-labelledby="ghats-in-brief">
      <div className="section-container">
        <div className="mx-auto max-w-3xl rounded-card border border-saffron-200 bg-white p-6 shadow-lift sm:p-8">
          <h2 id="ghats-in-brief" className="font-heading text-2xl text-temple-900">
            {COPY.brief[locale]}
          </h2>
          <p className="mt-3 leading-relaxed text-temple-700">{ghatsInBrief(locale)}</p>
          <p className="mt-3 flex flex-col gap-1 sm:flex-row sm:gap-4">
            <Link href="/dates" className="font-semibold text-saffron-700 underline">
              {COPY.datesLink[locale]}
            </Link>
            <Link href="/kumbh-status" className="font-semibold text-saffron-700 underline">
              {COPY.statusLink[locale]}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function GhatsFaq() {
  const { locale } = useLanguage();
  return (
    <section className="bg-cream-50 py-16 md:py-20" aria-labelledby="ghats-faq-title">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <h2 id="ghats-faq-title" className="font-heading text-3xl text-temple-900">
            {COPY.faq[locale]}
          </h2>
          <div className="mt-8 divide-y divide-temple-100 rounded-card border border-temple-100 bg-white">
            {ghatsFaqs(locale).map((f) => (
              <div key={f.q.en} className="p-5 sm:p-6">
                <h3 className="font-semibold text-temple-900">{f.q[locale]}</h3>
                <p className="mt-2 leading-relaxed text-temple-600">{f.a[locale]}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-temple-500">
            {COPY.sources[locale]}:{" "}
            {GHATS_SOURCES.map((s, i) => (
              <span key={s.url}>
                {i > 0 && "; "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {s.label}
                </a>
              </span>
            ))}
          </p>

          <nav aria-label={COPY.related[locale]} className="mt-10 rounded-xl border border-temple-200 bg-white p-5">
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
      </div>
    </section>
  );
}

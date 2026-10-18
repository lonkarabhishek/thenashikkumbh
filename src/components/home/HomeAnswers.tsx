"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import AuthorBox from "@/components/trust/AuthorBox";
import { HOME_SOURCES, homeFaqs, homeInBrief } from "@/data/homeFaq";

/**
 * Direct answers for the home page: a short "in brief" box after the latest
 * news and a FAQ before the closing call to action. Both read from
 * src/data/homeFaq.ts, which also feeds the home FAQPage schema.
 */

const COPY = {
  brief: {
    mr: "नाशिक कुंभमेळा २०२७ थोडक्यात",
    hi: "नाशिक कुंभ मेला 2027 संक्षेप में",
    en: "Nashik Kumbh Mela 2027 in brief",
  },
  datesLink: {
    mr: "सर्व अमृत स्नान आणि पर्वस्नान तारखा पाहा",
    hi: "सभी अमृत स्नान और पर्व स्नान तिथियाँ देखें",
    en: "See every Amrit Snan and bathing date",
  },
  faq: {
    mr: "नाशिक कुंभमेळा: नेहमी विचारले जाणारे प्रश्न",
    hi: "नाशिक कुंभ मेला: अक्सर पूछे जाने वाले सवाल",
    en: "Nashik Kumbh Mela: common questions",
  },
  sources: { mr: "स्रोत", hi: "स्रोत", en: "Sources" },
  related: { mr: "पुढे वाचा", hi: "आगे पढ़ें", en: "Read next" },
};

const RELATED = [
  {
    href: "/dates",
    label: {
      mr: "नाशिक कुंभमेळा २०२७: अमृत स्नान तारखा आणि संपूर्ण वेळापत्रक",
      hi: "नाशिक कुंभ 2027: अमृत स्नान तिथियाँ और पूरा कार्यक्रम",
      en: "Nashik Kumbh 2027: Amrit Snan dates and the full schedule",
    },
  },
  {
    href: "/ghats",
    label: {
      mr: "रामकुंड आणि गोदावरीवरील नाशिकचे स्नान घाट",
      hi: "रामकुंड और गोदावरी पर नाशिक के स्नान घाट",
      en: "Ramkund and Nashik's bathing ghats on the Godavari",
    },
  },
  {
    href: "/how-to-reach",
    label: {
      mr: "नाशिक कुंभमेळ्याला रेल्वे, विमान आणि रस्त्याने कसे पोहोचाल",
      hi: "नाशिक कुंभ मेला ट्रेन, हवाई जहाज़ और सड़क से कैसे पहुँचें",
      en: "How to reach the Nashik Kumbh by train, air and road",
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
];

export function HomeInBrief() {
  const { locale } = useLanguage();
  return (
    <section className="section-container py-10" aria-labelledby="home-in-brief">
      <div className="mx-auto max-w-3xl rounded-card border border-saffron-200 bg-cream-50 p-6 shadow-lift sm:p-8">
        <h2 id="home-in-brief" className="font-heading text-2xl text-temple-900">
          {COPY.brief[locale]}
        </h2>
        <p className="mt-3 leading-relaxed text-temple-700">{homeInBrief(locale)}</p>
        <p className="mt-3">
          <Link href="/dates" className="font-semibold text-saffron-700 underline">
            {COPY.datesLink[locale]}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function HomeFaq() {
  const { locale } = useLanguage();
  return (
    <section className="section-container py-16 md:py-20" aria-labelledby="home-faq-title">
      <div className="mx-auto max-w-3xl">
        <h2 id="home-faq-title" className="font-heading text-3xl text-temple-900">
          {COPY.faq[locale]}
        </h2>
        <div className="mt-8 divide-y divide-temple-100 rounded-card border border-temple-100 bg-cream-50">
          {homeFaqs(locale).map((f) => (
            <div key={f.q.en} className="p-5 sm:p-6">
              <h3 className="font-semibold text-temple-900">{f.q[locale]}</h3>
              <p className="mt-2 leading-relaxed text-temple-600">{f.a[locale]}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-temple-500">
          {COPY.sources[locale]}:{" "}
          {HOME_SOURCES.map((s, i) => (
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

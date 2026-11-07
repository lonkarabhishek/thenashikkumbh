import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { DAY_COPY as C, answerText, dayPickerFaqs } from "@/components/tools/dayCopy";
import DayPickerTool from "@/components/tools/DayPickerTool";
import ToolFooter from "@/components/tools/ToolFooter";

const UPDATED = "2026-10-27";

type Params = { params: { locale: Locale } };
const PATH = C.path;

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({
    locale: l,
    title: C.title[l],
    description: C.desc[l],
    path: PATH,
    absoluteTitle: true,
    image: "/images/og/kumbh-7.jpg",
    keywords: [
      "which day to go Nashik Kumbh 2027",
      "quiet day Nashik Kumbh",
      "Amrit Snan crowd",
      "नाशिक कुंभ कोणत्या दिवशी",
      "नासिक कुंभ किस दिन जाएं",
    ],
  });
}

const RELATED = [
  { href: "/dates", label: { en: "Amrit Snan and Kumbh dates 2027: the full schedule", hi: "अमृत स्नान और कुंभ तिथियाँ 2027: पूरा कार्यक्रम", mr: "अमृत स्नान आणि कुंभ तारखा २०२७: संपूर्ण वेळापत्रक" } },
  { href: "/parva-snan-calendar", label: { en: "Parva Snan calendar through July 2028", hi: "जुलाई 2028 तक का पर्व स्नान कैलेंडर", mr: "जुलै २०२८ पर्यंतची पर्व स्नान दिनदर्शिका" } },
  { href: "/plan-your-visit", label: { en: "Plan a Kumbh visit around the dates you chose", hi: "चुनी हुई तिथियों के हिसाब से कुंभ यात्रा की योजना", mr: "निवडलेल्या तारखांनुसार कुंभ भेटीचे नियोजन" } },
  { href: "/how-to-reach", label: { en: "How to reach Nashik, including Amrit Snan parking", hi: "नाशिक कैसे पहुँचें, अमृत स्नान की पार्किंग सहित", mr: "नाशिकला कसे पोहोचाल, अमृत स्नानाच्या पार्किंगसह" } },
];

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
  const faqs = dayPickerFaqs();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: C.title[l],
    description: C.desc[l],
    url,
    inLanguage: l,
    dateModified: UPDATED,
    author: { "@id": `${SITE_URL}/#owner` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q[l],
      acceptedAnswer: { "@type": "Answer", text: item.a[l] },
    })),
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbSchema(l, [{ name: C.crumb[l], path: PATH }])} />
      <div className="section-container max-w-5xl py-12 sm:py-20">
        <h1 className="text-title text-temple-900">{C.h1[l]}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-temple-700">{C.lead[l]}</p>
        <h2 className="mt-8 max-w-3xl font-heading text-2xl font-bold text-temple-900">{C.answerH[l]}</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-temple-700">{answerText(l)}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-temple-700">
          {C.moreDates[l]}{" "}
          <Link href="/dates" className="font-semibold text-saffron-700 underline">{C.datesLink[l]}</Link>
          {" · "}
          <Link href="/parva-snan-calendar" className="font-semibold text-saffron-700 underline">{C.parvaLink[l]}</Link>
        </p>
        <DayPickerTool />
        <ToolFooter faqH={C.faqH} faqs={faqs} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { COUNTDOWN_COPY as C, COUNTDOWN_FAQS } from "@/components/tools/toolCopy";
import CountdownTool from "@/components/tools/CountdownTool";
import ToolFooter from "@/components/tools/ToolFooter";
import { countdownDataUpdated } from "@/data/kumbhCountdown";

type Params = { params: { locale: Locale } };
const PATH = C.path;

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({ locale: l, title: C.title[l], description: C.desc[l], path: PATH, absoluteTitle: true, image: "/images/og/kumbh-7.jpg", keywords: ["Nashik Kumbh 2027 countdown","Kumbh Mela countdown","Kumbh Mela 2027 countdown timer","Kumbh flag hoisting countdown","नाशिक कुंभ काउंटडाउन","कुंभ मेला काउंटडाउन","नाशिक कुंभ २०२७ काउंटडाउन"] });
}

const RELATED = [
  { href: "/dates", label: { en: 'Amrit Snan and Kumbh dates 2027: the full schedule', hi: 'अमृत स्नान और कुंभ तिथियाँ 2027: पूरा कार्यक्रम', mr: 'अमृत स्नान आणि कुंभ तारखा २०२७: संपूर्ण वेळापत्रक' } },
  { href: "/kumbh-status", label: { en: 'Kumbh status board: what is open or closed now', hi: 'कुंभ स्टेटस बोर्ड: अभी क्या खुला या बंद', mr: 'कुंभ स्टेटस बोर्ड: सध्या काय खुले किंवा बंद' } },
  { href: "/dhwajarohan-2026", label: { en: 'Dhwajarohan 31 October 2026: the opening programme', hi: 'ध्वजारोहण 31 अक्टूबर 2026: उद्घाटन कार्यक्रम', mr: 'ध्वजारोहण ३१ ऑक्टोबर २०२६: उद्घाटन कार्यक्रम' } },
  { href: "/gallery", label: { en: 'Photos of Kumbh Mela Nashik', hi: 'नाशिक कुंभ मेला की तस्वीरें', mr: 'नाशिक कुंभमेळ्याचे फोटो' } },
];

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
  const modified = countdownDataUpdated;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: C.title[l],
    description: C.desc[l],
    url,
    inLanguage: l,
    dateModified: modified,
    author: { "@id": `${SITE_URL}/#owner` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COUNTDOWN_FAQS.map((f) => ({ "@type": "Question", name: f.q[l], acceptedAnswer: { "@type": "Answer", text: f.a[l] } })),
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbSchema(l, [{ name: C.crumb[l], path: PATH }])} />
      <div className="section-container max-w-3xl py-12 sm:py-20">
        <h1 className="text-title text-temple-900">{C.h1[l]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-temple-700">{C.lead[l]}</p>
        <CountdownTool />
        <ToolFooter faqH={C.faqH} faqs={COUNTDOWN_FAQS} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

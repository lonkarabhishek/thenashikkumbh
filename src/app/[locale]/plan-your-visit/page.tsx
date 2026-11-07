import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { PLAN_COPY as C, PLAN_FAQS } from "@/components/tools/planCopy";
import PlanTool from "@/components/tools/PlanTool";
import ToolFooter from "@/components/tools/ToolFooter";
import { statusBoardUpdated } from "@/data/kumbhStatus";

type Params = { params: { locale: Locale } };
const PATH = C.path;

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({ locale: l, title: C.title[l], description: C.desc[l], path: PATH, absoluteTitle: true, image: "/images/og/kumbh-7.jpg", keywords: ["plan Nashik Kumbh visit","Nashik Kumbh trip planner","Kumbh closures","नाशिक कुंभ यात्रा नियोजन","कुंभ भेट नियोजन"] });
}

const RELATED = [
  { href: "/kumbh-status", label: { en: 'Kumbh status board: what is open or closed', hi: 'कुंभ स्टेटस बोर्ड: क्या खुला या बंद', mr: 'कुंभ स्टेटस बोर्ड: काय खुले किंवा बंद' } },
  { href: "/how-to-reach", label: { en: 'How to reach Nashik for the Kumbh', hi: 'कुंभ के लिए नाशिक कैसे पहुँचें', mr: 'कुंभासाठी नाशिकला कसे पोहोचाल' } },
  { href: "/accommodation", label: { en: 'Where to stay in Nashik during the Kumbh', hi: 'कुंभ के दौरान नाशिक में कहाँ ठहरें', mr: 'कुंभकाळात नाशिकमध्ये कुठे राहाल' } },
  { href: "/kumbh-countdown", label: { en: 'Nashik Kumbh 2027 countdown', hi: 'नाशिक कुंभ 2027 काउंटडाउन', mr: 'नाशिक कुंभ २०२७ काउंटडाउन' } },
  { href: "/dates", label: { en: 'Amrit Snan and Kumbh dates 2027', hi: 'अमृत स्नान और कुंभ तिथियाँ 2027', mr: 'अमृत स्नान आणि कुंभ तारखा २०२७' } },
  { href: "/day-picker", label: { en: 'Which day to go: a quieter day or an Amrit Snan', hi: 'किस दिन जाएँ: शांत दिन या अमृत स्नान', mr: 'कोणत्या दिवशी जायचे: शांत दिवस किंवा अमृत स्नान' } },
  { href: "/map", label: { en: 'Kumbh map of Nashik and Trimbakeshwar', hi: 'नाशिक और त्र्यंबकेश्वर का कुंभ नक्शा', mr: 'नाशिक आणि त्र्यंबकेश्वरचा कुंभ नकाशा' } },
  { href: "/family-card", label: { en: 'Khoya-Paya family card if someone is lost in the crowd', hi: 'भीड़ में बिछड़ने पर खोया-पाया परिवार कार्ड', mr: 'गर्दीत हरवल्यास खोया-पाया कुटुंब कार्ड' } },
];

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
  const modified = statusBoardUpdated;
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
    mainEntity: PLAN_FAQS.map((f) => ({ "@type": "Question", name: f.q[l], acceptedAnswer: { "@type": "Answer", text: f.a[l] } })),
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbSchema(l, [{ name: C.crumb[l], path: PATH }])} />
      <div className="section-container max-w-3xl py-12 sm:py-20">
        <h1 className="text-title text-temple-900">{C.h1[l]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-temple-700">{C.lead[l]}</p>
        <PlanTool />
        <ToolFooter faqH={C.faqH} faqs={PLAN_FAQS} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { MAP_COPY as C, MAP_FAQS } from "@/components/tools/mapCopy";
import MapTool from "@/components/tools/MapTool";
import ToolFooter from "@/components/tools/ToolFooter";
import { mapDataUpdated } from "@/data/mapPlaces";

type Params = { params: { locale: Locale } };
const PATH = C.path;

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({ locale: l, title: C.title[l], description: C.desc[l], path: PATH, absoluteTitle: true, image: "/images/og/kumbh-7.jpg", keywords: ["Nashik Kumbh map","Ramkund map","Kalaram temple location","Trimbakeshwar temple location","नाशिक कुंभ नकाशा","रामकुंड नकाशा"] });
}

const RELATED = [
  { href: "/ghats", label: { en: 'Ghats and bathing sites in Nashik', hi: 'नाशिक के घाट और स्नान स्थल', mr: 'नाशिकमधील घाट आणि स्नानस्थळे' } },
  { href: "/kumbh-status", label: { en: 'Kumbh status board: what is open or closed', hi: 'कुंभ स्टेटस बोर्ड: क्या खुला या बंद', mr: 'कुंभ स्टेटस बोर्ड: काय खुले किंवा बंद' } },
  { href: "/how-to-reach", label: { en: 'How to reach Nashik for the Kumbh', hi: 'कुंभ के लिए नाशिक कैसे पहुँचें', mr: 'कुंभासाठी नाशिकला कसे पोहोचाल' } },
  { href: "/trimbakeshwar-kumbh-2027", label: { en: 'Trimbakeshwar Kumbh 2027 guide', hi: 'त्र्यंबकेश्वर कुंभ 2027 गाइड', mr: 'त्र्यंबकेश्वर कुंभ २०२७ मार्गदर्शक' } },
  { href: "/gallery", label: { en: 'Photos of Kumbh Mela Nashik', hi: 'नाशिक कुंभ मेला की तस्वीरें', mr: 'नाशिक कुंभमेळ्याचे फोटो' } },
];

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
  const modified = mapDataUpdated;
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
    mainEntity: MAP_FAQS.map((f) => ({ "@type": "Question", name: f.q[l], acceptedAnswer: { "@type": "Answer", text: f.a[l] } })),
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbSchema(l, [{ name: C.crumb[l], path: PATH }])} />
      <div className="section-container max-w-3xl py-12 sm:py-20">
        <h1 className="text-title text-temple-900">{C.h1[l]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-temple-700">{C.lead[l]}</p>
        <MapTool />
        <ToolFooter faqH={C.faqH} faqs={MAP_FAQS} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { STATUS_COPY as C, STATUS_FAQS } from "@/components/tools/toolCopy";
import StatusBoard from "@/components/tools/StatusBoard";
import ToolFooter from "@/components/tools/ToolFooter";
import { statusBoardUpdated } from "@/data/kumbhStatus";

type Params = { params: { locale: Locale } };
const PATH = C.path;

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({ locale: l, title: C.title[l], description: C.desc[l], path: PATH, absoluteTitle: true, image: "/images/og/kumbh-7.jpg", keywords: ["Kumbh status","Ramkund open or closed","Kushavarta closed","Nashik Kumbh closures","Kumbh Mela status board","रामकुंड बंद","कुशावर्त बंद","कुंभ स्टेटस"] });
}

const RELATED = [
  { href: "/ghats", label: { en: 'Ghats and bathing sites in Nashik', hi: 'नाशिक के घाट और स्नान स्थल', mr: 'नाशिकमधील घाट आणि स्नानस्थळे' } },
  { href: "/kumbh-countdown", label: { en: 'Nashik Kumbh 2027 countdown', hi: 'नाशिक कुंभ 2027 काउंटडाउन', mr: 'नाशिक कुंभ २०२७ काउंटडाउन' } },
  { href: "/dates", label: { en: 'Amrit Snan and Kumbh dates 2027', hi: 'अमृत स्नान और कुंभ तिथियाँ 2027', mr: 'अमृत स्नान आणि कुंभ तारखा २०२७' } },
  { href: "/trimbakeshwar-kumbh-2027", label: { en: 'Trimbakeshwar Kumbh 2027 guide', hi: 'त्र्यंबकेश्वर कुंभ 2027 गाइड', mr: 'त्र्यंबकेश्वर कुंभ २०२७ मार्गदर्शक' } },
  { href: "/blog", label: { en: 'Latest Kumbh news', hi: 'कुंभ की ताज़ा खबरें', mr: 'कुंभमेळ्याच्या ताज्या बातम्या' } },
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
    mainEntity: STATUS_FAQS.map((f) => ({ "@type": "Question", name: f.q[l], acceptedAnswer: { "@type": "Answer", text: f.a[l] } })),
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbSchema(l, [{ name: C.crumb[l], path: PATH }])} />
      <div className="section-container max-w-3xl py-12 sm:py-20">
        <h1 className="text-title text-temple-900">{C.h1[l]}</h1>
        <p className="mt-4 text-lg leading-relaxed text-temple-700">{C.lead[l]}</p>
        <div className="mt-5 rounded-2xl border-l-4 border-saffron-500 bg-cream-100 p-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-temple-800">{C.inBriefH[l]}</h2>
          <p className="mt-2 leading-relaxed text-temple-800">{C.inBrief[l]}</p>
        </div>
        <StatusBoard />
        <ToolFooter faqH={C.faqH} faqs={STATUS_FAQS} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

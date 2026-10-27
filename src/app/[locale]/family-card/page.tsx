import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { FAMILY_COPY as C, FAMILY_FAQS } from "@/components/tools/familyCopy";
import FamilyCardTool from "@/components/tools/FamilyCardTool";
import ToolFooter from "@/components/tools/ToolFooter";

type Params = { params: { locale: Locale } };
const PATH = C.path;
const UPDATED = "2026-10-27";

export function generateMetadata({ params }: Params): Metadata {
  const l = params.locale;
  return pageMetadata({
    locale: l,
    title: C.title[l],
    description: C.desc[l],
    path: PATH,
    absoluteTitle: true,
    image: "/images/og/kumbh-7.jpg",
    keywords: ["Khoya Paya card", "Nashik Kumbh lost family card", "खोया पाया कार्ड", "हरवलेले कुटुंब कार्ड"],
  });
}

const RELATED = [
  { href: "/emergency", label: { en: "Emergency numbers that work offline", hi: "ऑफ़लाइन चलने वाले आपातकालीन नंबर", mr: "ऑफलाइन चालणारे आपत्कालीन क्रमांक" } },
  { href: "/guide", label: { en: "Pilgrim guide: what to carry and how to stay with your group", hi: "श्रद्धालु गाइड: क्या ले जाएँ और समूह के साथ कैसे रहें", mr: "भाविक मार्गदर्शक: काय न्यावे आणि गटासोबत कसे राहावे" } },
  { href: "/how-to-reach", label: { en: "How to reach Nashik for the Kumbh", hi: "कुंभ के लिए नाशिक कैसे पहुँचें", mr: "कुंभासाठी नाशिकला कसे पोहोचाल" } },
  { href: "/dates", label: { en: "Amrit Snan and Kumbh dates", hi: "अमृत स्नान और कुंभ तिथियाँ", mr: "अमृत स्नान आणि कुंभ तारखा" } },
];

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
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
    mainEntity: FAMILY_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q[l],
      acceptedAnswer: { "@type": "Answer", text: f.a[l] },
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
        <p className="mt-3 max-w-3xl leading-relaxed text-temple-700">
          {C.answer[l]}{" "}
          <Link href="/emergency" className="font-semibold text-saffron-700 underline">
            {C.emergencyLink[l]}
          </Link>
          . {C.datesLead[l]}{" "}
          <Link href="/dates" className="font-semibold text-saffron-700 underline">
            {C.datesLink[l]}
          </Link>
          .
        </p>
        <FamilyCardTool />
        <ToolFooter faqH={C.faqH} faqs={FAMILY_FAQS} relatedH={C.relatedH} related={RELATED} />
      </div>
    </div>
  );
}

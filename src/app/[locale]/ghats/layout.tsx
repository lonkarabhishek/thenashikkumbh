import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";
import { ghatsFaqs } from "@/data/ghatsFaq";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "ghats", {
    path: "/ghats",
    image: "/images/og/ramkund.jpg",
    keywords: [
    "Ram Kund Nashik",
    "Godavari Ghats",
    "Panchavati ghats",
    "Kapaleshwar Temple",
    "sacred bathing ghats",
    "Nashik river ghats",
    "रामकुंड नाशिक",
    "गोदावरी घाट",
    "Nashik ghat names",
    "Kushavarta Trimbakeshwar",
    "new ghats Simhastha 2027",
    "नाशिक घाट नावे",
    "कुशावर्त तीर्थ",
    ],
  });
}

export default function GhatsLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "ghats", "/ghats")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ghatsFaqs(params.locale).map((f) => ({
            "@type": "Question",
            name: f.q[params.locale],
            acceptedAnswer: { "@type": "Answer", text: f.a[params.locale] },
          })),
        }}
      />
      {children}
    </>
  );
}

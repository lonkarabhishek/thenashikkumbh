import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "naga-sadhus", {
    path: "/naga-sadhus",
    image: "/images/og/naga-sadhu.jpg",
    keywords: [
    "Naga Sadhu",
    "warrior monks India",
    "Akhada orders",
    "Naga Baba Kumbh Mela",
    "ash-smeared ascetics",
    "Naga Sadhu procession",
    "नागा साधु",
    "नागा साधू कुंभमेळा",
    ],
  });
}

export default function NagaSadhusLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "naga-sadhus", "/naga-sadhus")} />
      {children}
    </>
  );
}

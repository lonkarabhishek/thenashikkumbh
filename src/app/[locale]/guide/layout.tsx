import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "guide", {
    path: "/guide",
    image: "/images/og/kumbh-9.jpg",
    keywords: [
    "Kumbh Mela travel guide",
    "how to reach Nashik",
    "Nashik accommodation",
    "Kumbh Mela packing list",
    "pilgrim tips",
    "Nashik hotels Kumbh",
    "कुंभ मेला यात्रा गाइड",
    "कुंभमेळा मार्गदर्शिका",
    ],
  });
}

export default function GuideLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "guide", "/guide")} />
      {children}
    </>
  );
}

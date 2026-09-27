import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "about", {
    path: "/about",
    image: "/images/og/kumbh-2.jpg",
    keywords: [
    "Kumbh Mela history",
    "Samudra Manthan",
    "Kumbh origin story",
    "why Kumbh Mela at Nashik",
    "Hindu pilgrimage history",
    "Godavari sacred river",
    "कुंभ मेला इतिहास",
    "कुंभमेळा इतिहास",
    ],
  });
}

export default function AboutLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "about", "/about")} />
      {children}
    </>
  );
}

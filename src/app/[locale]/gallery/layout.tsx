import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "gallery", {
    path: "/gallery",
    image: "/images/og/kumbh-11.jpg",
    keywords: [
    "Kumbh Mela photos",
    "Nashik Kumbh images",
    "Shahi Snan photos",
    "Godavari River photos",
    "Kumbh Mela gallery",
    "कुंभ मेला फोटो",
    "कुंभमेळा फोटो",
    ],
  });
}

export default function GalleryLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "gallery", "/gallery")} />
      {children}
    </>
  );
}

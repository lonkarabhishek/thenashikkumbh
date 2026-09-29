import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "dates", {
    path: "/dates",
    absoluteTitle: true,
    image: "/images/og/kumbh-7.jpg",
    keywords: [
    "Shahi Snan dates 2027",
    "Kumbh Mela schedule",
    "sacred bathing calendar",
    "Amrit Snan dates",
    "Nashik Kumbh 2027 dates",
    "शाही स्नान तारीख",
    "कुंभ मेला तिथि 2027",
    ],
  });
}

export default function DatesLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "dates", "/dates")} />
      {children}
    </>
  );
}

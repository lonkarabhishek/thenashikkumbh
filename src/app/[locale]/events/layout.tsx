import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "events", {
    path: "/events",
    image: "/images/og/kumbh-10.jpg",
    keywords: [
    "Kumbh Mela events",
    "Akhada processions",
    "Shahi Snan procession",
    "satsang Kumbh Mela",
    "13 Akhadas",
    "yoga camp Kumbh",
    "कुंभ मेला कार्यक्रम",
    "अखाडा शोभायात्रा",
    ],
  });
}

export default function EventsLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "events", "/events")} />
      {children}
    </>
  );
}

import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "games", {
    path: "/games",
    // Kept out of the index while AdSense reviews the site: a game page has
    // no prose for a reviewer to weigh. Reversible: delete this line.
    robots: { index: false, follow: true },
    image: "/images/og/kumbh-3.jpg",
    keywords: [
    "Kumbh Mela quiz",
    "Kumbh Mela games",
    "Hindu trivia",
    "Nashik Kumbh activities",
    "spiritual games",
    "Kumbh word game",
    "कुंभ मेला खेल",
    "कुंभमेळा खेळ",
    ],
  });
}

export default function GamesLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "games", "/games")} />
      {children}
    </>
  );
}

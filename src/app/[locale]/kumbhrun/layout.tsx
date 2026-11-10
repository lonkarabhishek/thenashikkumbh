import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "kumbhrun", {
    path: "/kumbhrun",
    // Kept out of the index while AdSense reviews the site: a game page has
    // no prose for a reviewer to weigh. Reversible: delete this line.
    robots: { index: false, follow: true },
    image: "/images/og/kumbh-6.jpg",
    keywords: [
    "Kumbh Run game",
    "Nashik runner game",
    "pilgrimage game",
    "Kumbh Mela game",
    "Hindu temple runner",
    "Nashik sacred places game",
    ],
  });
}

export default function KumbhRunLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "kumbhrun", "/kumbhrun")} />
      {children}
    </>
  );
}

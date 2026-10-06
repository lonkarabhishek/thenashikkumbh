import { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "yatra", {
    path: "/yatra",
    image: "/images/og/godavari-ghats.jpg",
    keywords: [
    "Nashik audio guide",
    "Nashik walking tour",
    "Panchavati walking tour",
    "Kumbh Mela audio tour",
    "Trimbakeshwar guide",
    "Ram Kund story",
    "नाशिक ऑडिओ गाईड",
    "पंचवटी यात्रा",
    "नाशिक पदयात्रा",
    ],
  });
}

export default function YatraLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  // Breadcrumbs are rendered by the index and trail pages themselves.
  void params;
  return children;
}

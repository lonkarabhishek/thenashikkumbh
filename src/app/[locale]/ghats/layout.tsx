import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

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
      {children}
    </>
  );
}

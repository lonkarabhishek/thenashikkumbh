import { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "blog", {
    path: "/blog",
    image: "/images/og/kumbh-1.jpg",
    keywords: [
    "Kumbh Mela news",
    "Nashik Kumbh updates",
    "Simhastha 2027 news",
    "Kumbh Mela blog",
    "Godavari River updates",
    "Nashik pilgrimage news",
    "कुंभ मेला समाचार",
    "कुंभमेळा बातम्या",
    ],
  });
}

export default function BlogLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  // The /blog index renders its own breadcrumb; article pages render a
  // three-level one. Emitting one here too would duplicate it on articles.
  void params;
  return children;
}

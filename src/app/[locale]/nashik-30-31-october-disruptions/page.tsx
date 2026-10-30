import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";
import { page } from "@/content/pages/nashik-30-31-october-disruptions";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";

type Params = { params: { locale: Locale } };

// The brand suffix (" | The Nashik Kumbh") comes from the layout's title
// template, so this page does not use an absolute title.
export function generateMetadata({ params }: Params): Metadata {
  return pageMetadata({
    locale: params.locale,
    title: page.seoTitle[params.locale],
    description: page.description[params.locale],
    path: page.path,
    keywords: [
      "Nashik road closure 30 31 October",
      "Nashik Trimbakeshwar road closed",
      "Ramkund entry 31 October",
      "Nashik drone ban",
      "Goda Aarti time",
      "नाशिक रस्ते बंद",
      "नाशिक रास्ते बंद",
    ],
  });
}

export default function Page({ params }: Params) {
  return <InfoPage page={page} locale={params.locale} />;
}

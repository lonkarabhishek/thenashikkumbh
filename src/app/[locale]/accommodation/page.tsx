import type { Metadata } from "next";
import InfoPage, { infoPageMetadata } from "@/components/info/InfoPage";
import { page } from "@/content/pages/accommodation";
import type { Locale } from "@/i18n/translations";

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return infoPageMetadata(page, params.locale);
}

export default function Page({ params }: Params) {
  return <InfoPage page={page} locale={params.locale} />;
}

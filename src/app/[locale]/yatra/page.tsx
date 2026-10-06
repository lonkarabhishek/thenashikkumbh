import TrailIndex from "@/components/yatra/TrailIndex";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/i18n/translations";
import { sectionBreadcrumb } from "@/lib/seo";

export default function YatraPage({ params }: { params: { locale: Locale } }) {
  return (
    <>
      <JsonLd data={sectionBreadcrumb(params.locale, "yatra", "/yatra")} />
      <TrailIndex />
    </>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import TrailExperience from "@/components/yatra/TrailExperience";
import { findTrail, trails } from "@/data/yatraData";
import JsonLd from "@/components/JsonLd";
import { LOCALES } from "@/i18n/locales";
import { SEO_COPY, TRAIL_TITLE_SUFFIX } from "@/i18n/seoCopy";
import type { Locale } from "@/i18n/translations";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale; trailId: string } };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => trails.map((trail) => ({ locale, trailId: trail.id })));
}

export function generateMetadata({ params }: Params): Metadata {
  const trail = findTrail(params.trailId);
  if (!trail) return { title: "Walk not found", robots: { index: false } };

  return pageMetadata({
    locale: params.locale,
    title: `${trail.name[params.locale]} - ${TRAIL_TITLE_SUFFIX[params.locale]}`,
    description: trail.description[params.locale],
    path: `/yatra/${trail.id}`,
    image: "/images/og/godavari-ghats.jpg",
  });
}

export default function TrailPage({ params }: Params) {
  const { locale } = params;
  const trail = findTrail(params.trailId);
  if (!trail) notFound();

  // A TouristAttraction itinerary makes the walk eligible for rich results.
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trail.name[locale],
    description: trail.description[locale],
    touristType: "Pilgrims and visitors to Nashik Kumbh Mela",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: trail.stops.length,
      itemListElement: trail.stops.map((stop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: stop.name[locale],
          description: stop.subtitle[locale],
          geo: {
            "@type": "GeoCoordinates",
            latitude: stop.lat,
            longitude: stop.lng,
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: SEO_COPY.yatra[locale].crumb, path: "/yatra" },
          { name: trail.name[locale], path: `/yatra/${trail.id}` },
        ])}
      />
      <TrailExperience trail={trail} />
    </>
  );
}

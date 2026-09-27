import { Metadata } from "next";
import { notFound } from "next/navigation";
import TrailExperience from "@/components/yatra/TrailExperience";
import { findTrail, trails } from "@/data/yatraData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return trails.map((trail) => ({ trailId: trail.id }));
}

export function generateMetadata({
  params,
}: {
  params: { trailId: string };
}): Metadata {
  const trail = findTrail(params.trailId);
  if (!trail) return { title: "Walk not found", robots: { index: false } };

  return pageMetadata({
    title: `${trail.name.en} - Free Walking Audio Guide, Nashik`,
    description: trail.description.en,
    path: `/yatra/${trail.id}`,
    image: "/images/og/godavari-ghats.jpg",
  });
}

export default function TrailPage({ params }: { params: { trailId: string } }) {
  const trail = findTrail(params.trailId);
  if (!trail) notFound();

  // A TouristAttraction itinerary makes the walk eligible for rich results.
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trail.name.en,
    description: trail.description.en,
    touristType: "Pilgrims and visitors to Nashik Kumbh Mela",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: trail.stops.length,
      itemListElement: trail.stops.map((stop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: stop.name.en,
          description: stop.subtitle.en,
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
        data={breadcrumbSchema([
          { name: "Yatra Audio Guide", path: "/yatra" },
          { name: trail.name.en, path: `/yatra/${trail.id}` },
        ])}
      />
      <TrailExperience trail={trail} />
    </>
  );
}

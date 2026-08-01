import { Metadata } from "next";
import { notFound } from "next/navigation";
import TrailExperience from "@/components/yatra/TrailExperience";
import { findTrail, trails } from "@/data/yatraData";

export function generateStaticParams() {
  return trails.map((trail) => ({ trailId: trail.id }));
}

export function generateMetadata({
  params,
}: {
  params: { trailId: string };
}): Metadata {
  const trail = findTrail(params.trailId);
  if (!trail) return { title: "Walk not found" };

  return {
    title: `${trail.name.en} - Free Walking Audio Guide, Nashik`,
    description: trail.description.en,
    alternates: {
      canonical: `https://thenashikkumbh.com/yatra/${trail.id}`,
    },
    openGraph: {
      title: `${trail.name.en} | Nashik Kumbh Mela 2027`,
      description: trail.subtitle.en,
    },
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TrailExperience trail={trail} />
    </>
  );
}

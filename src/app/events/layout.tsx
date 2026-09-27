import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events & Akhadas - Spiritual Gatherings & Sacred Processions",
  description:
    "Explore all events at Nashik Kumbh Mela 2027 - Shahi Snan processions, satsangs, cultural performances, yoga camps, and learn about the 13 sacred akhadas.",
  path: "/events",
  image: "/images/og/kumbh-10.jpg",
  imageAlt: "Kumbh Mela Events and Akhada Processions",
  keywords: [
    "Kumbh Mela events",
    "Akhada processions",
    "Shahi Snan procession",
    "satsang Kumbh Mela",
    "13 Akhadas",
    "yoga camp Kumbh",
    "कुंभ मेला कार्यक्रम",
    "अखाडा शोभायात्रा",
  ],
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Events and Akhadas", path: "/events" }])} />
      {children}
    </>
  );
}

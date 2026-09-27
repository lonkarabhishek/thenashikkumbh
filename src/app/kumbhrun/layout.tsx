import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kumbh Run - Sacred Pilgrimage Runner Game",
  description:
    "Play Kumbh Run, a fun endless runner game set in the sacred places of Nashik Kumbh Mela. Run through Ram Kund, Panchavati, Trimbakeshwar, and other holy sites while learning about each landmark.",
  path: "/kumbhrun",
  image: "/images/og/kumbh-6.jpg",
  imageAlt: "Kumbh Run - Pilgrimage Runner Game",
  keywords: [
    "Kumbh Run game",
    "Nashik runner game",
    "pilgrimage game",
    "Kumbh Mela game",
    "Hindu temple runner",
    "Nashik sacred places game",
  ],
});

export default function KumbhRunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Kumbh Run", path: "/kumbhrun" }])} />
      {children}
    </>
  );
}

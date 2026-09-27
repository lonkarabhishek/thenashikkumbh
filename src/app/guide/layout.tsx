import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pilgrim Guide - How to Reach, Stay & Prepare for Kumbh Mela",
  description:
    "Complete pilgrim guide for Nashik Kumbh Mela 2027 - how to reach by train, flight, and road, accommodation options, what to carry, do's and don'ts, and essential travel tips.",
  path: "/guide",
  image: "/images/og/kumbh-9.jpg",
  imageAlt: "Nashik Kumbh Mela Pilgrim Guide",
  keywords: [
    "Kumbh Mela travel guide",
    "how to reach Nashik",
    "Nashik accommodation",
    "Kumbh Mela packing list",
    "pilgrim tips",
    "Nashik hotels Kumbh",
    "कुंभ मेला यात्रा गाइड",
    "कुंभमेळा मार्गदर्शिका",
  ],
});

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Pilgrim Guide", path: "/guide" }])} />
      {children}
    </>
  );
}

import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Kumbh Mela - History, Origins & Spiritual Significance",
  description:
    "Discover the ancient origins of Kumbh Mela, the Samudra Manthan legend, and why Nashik is one of four sacred cities chosen for this divine gathering at the Godavari River.",
  path: "/about",
  image: "/images/og/kumbh-2.jpg",
  imageAlt: "About Kumbh Mela - History and Spiritual Significance",
  keywords: [
    "Kumbh Mela history",
    "Samudra Manthan",
    "Kumbh origin story",
    "why Kumbh Mela at Nashik",
    "Hindu pilgrimage history",
    "Godavari sacred river",
    "कुंभ मेला इतिहास",
    "कुंभमेळा इतिहास",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      {children}
    </>
  );
}

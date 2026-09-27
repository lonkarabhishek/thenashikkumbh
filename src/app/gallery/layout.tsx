import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery - Visual Journey Through Kumbh Mela",
  description:
    "Browse stunning images from Nashik Kumbh Mela - sacred Shahi Snan, grand processions, evening aarti, temple architecture, and the spiritual energy of millions gathered at the Godavari.",
  path: "/gallery",
  image: "/images/og/kumbh-11.jpg",
  imageAlt: "Nashik Kumbh Mela Photo Gallery",
  keywords: [
    "Kumbh Mela photos",
    "Nashik Kumbh images",
    "Shahi Snan photos",
    "Godavari River photos",
    "Kumbh Mela gallery",
    "कुंभ मेला फोटो",
    "कुंभमेळा फोटो",
  ],
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />
      {children}
    </>
  );
}

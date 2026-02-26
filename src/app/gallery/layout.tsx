import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Visual Journey Through Kumbh Mela",
  description:
    "Browse stunning images from Nashik Kumbh Mela - sacred Shahi Snan, grand processions, evening aarti, temple architecture, and the spiritual energy of millions gathered at the Godavari.",
  keywords: [
    "Kumbh Mela photos",
    "Nashik Kumbh images",
    "Shahi Snan photos",
    "Godavari River photos",
    "Kumbh Mela gallery",
    "कुंभ मेला फोटो",
    "कुंभमेळा फोटो",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/gallery",
  },
  openGraph: {
    title: "Nashik Kumbh Mela Gallery - Photos & Visual Stories",
    description:
      "A visual journey through the sacred Kumbh Mela at Nashik - processions, rituals, and divine moments.",
    images: [
      {
        url: "/images/gallery/kumbh-11.webp",
        width: 1200,
        height: 630,
        alt: "Nashik Kumbh Mela Photo Gallery",
      },
    ],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Visual Journey Through Kumbh Mela",
  description:
    "Browse stunning images from Nashik Kumbh Mela — sacred Shahi Snan, grand processions, evening aarti, temple architecture, and the spiritual energy of millions gathered at the Godavari.",
  openGraph: {
    title: "Nashik Kumbh Mela Gallery — Photos & Visual Stories",
    description:
      "A visual journey through the sacred Kumbh Mela at Nashik — processions, rituals, and divine moments.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

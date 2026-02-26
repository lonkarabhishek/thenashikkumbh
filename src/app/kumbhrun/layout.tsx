import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumbh Run - Sacred Pilgrimage Runner Game",
  description:
    "Play Kumbh Run, a fun endless runner game set in the sacred places of Nashik Kumbh Mela. Run through Ram Kund, Panchavati, Trimbakeshwar, and other holy sites while learning about each landmark.",
  keywords: [
    "Kumbh Run game",
    "Nashik runner game",
    "pilgrimage game",
    "Kumbh Mela game",
    "Hindu temple runner",
    "Nashik sacred places game",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/kumbhrun",
  },
  openGraph: {
    title: "Kumbh Run - Pilgrimage Runner Game",
    description:
      "An endless runner game through the sacred places of Nashik Kumbh Mela. Visit Ram Kund, Panchavati, and Trimbakeshwar.",
    images: [
      {
        url: "/images/gallery/kumbh-6.webp",
        width: 1200,
        height: 630,
        alt: "Kumbh Run - Pilgrimage Runner Game",
      },
    ],
  },
};

export default function KumbhRunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

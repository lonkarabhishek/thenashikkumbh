import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Ghats of Nashik - Ram Kund, Godavari & Panchavati",
  description:
    "Explore the holy bathing ghats of Nashik including Ram Kund, Godavari Ghats, Kapaleshwar Temple, and Panchavati - where Lord Rama walked during his exile.",
  keywords: [
    "Ram Kund Nashik",
    "Godavari Ghats",
    "Panchavati ghats",
    "Kapaleshwar Temple",
    "sacred bathing ghats",
    "Nashik river ghats",
    "रामकुंड नाशिक",
    "गोदावरी घाट",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/ghats",
  },
  openGraph: {
    title: "Sacred Ghats of Nashik - Holy Bathing Sites",
    description:
      "Discover the sacred ghats along the Godavari River where millions perform holy dips during Kumbh Mela.",
    images: [
      {
        url: "/images/ramkund.webp",
        width: 1200,
        height: 630,
        alt: "Sacred Ghats of Nashik along the Godavari River",
      },
    ],
  },
};

export default function GhatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

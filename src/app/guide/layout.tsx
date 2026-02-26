import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilgrim Guide - How to Reach, Stay & Prepare for Kumbh Mela",
  description:
    "Complete pilgrim guide for Nashik Kumbh Mela 2027 - how to reach by train, flight, and road, accommodation options, what to carry, do's and don'ts, and essential travel tips.",
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
  alternates: {
    canonical: "https://thenashikkumbh.com/guide",
  },
  openGraph: {
    title: "Nashik Kumbh Mela Pilgrim Guide - Travel, Stay & Tips",
    description:
      "Everything you need for your Kumbh pilgrimage - transport, accommodation, packing, and essential tips.",
    images: [
      {
        url: "/images/gallery/kumbh-9.webp",
        width: 1200,
        height: 630,
        alt: "Nashik Kumbh Mela Pilgrim Guide",
      },
    ],
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Akhadas - Spiritual Gatherings & Sacred Processions",
  description:
    "Explore all events at Nashik Kumbh Mela 2027 - Shahi Snan processions, satsangs, cultural performances, yoga camps, and learn about the 13 sacred akhadas.",
  alternates: {
    canonical: "https://thenashikkumbh.com/events",
  },
  openGraph: {
    title: "Kumbh Mela Events & Akhadas - Sacred Gatherings",
    description:
      "All events, processions, and spiritual gatherings at Nashik Kumbh Mela, plus detailed guide to all 13 akhadas.",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

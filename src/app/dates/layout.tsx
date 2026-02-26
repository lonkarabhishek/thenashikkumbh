import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Important Dates 2027 - Shahi Snan Schedule & Sacred Bathing Calendar",
  description:
    "Complete schedule of Shahi Snan dates, Parva Snan days, and sacred bathing calendar for Nashik Kumbh Mela 2027. Plan your pilgrimage around the most auspicious days.",
  keywords: [
    "Shahi Snan dates 2027",
    "Kumbh Mela schedule",
    "sacred bathing calendar",
    "Amrit Snan dates",
    "Nashik Kumbh 2027 dates",
    "शाही स्नान तारीख",
    "कुंभ मेला तिथि 2027",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/dates",
  },
  openGraph: {
    title: "Nashik Kumbh Mela 2027 - Important Dates & Shahi Snan Schedule",
    description:
      "All Shahi Snan dates and sacred bathing days for Nashik Kumbh Mela 2027.",
    images: [
      {
        url: "/images/gallery/kumbh-7.webp",
        width: 1200,
        height: 630,
        alt: "Nashik Kumbh Mela 2027 Important Dates",
      },
    ],
  },
};

export default function DatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

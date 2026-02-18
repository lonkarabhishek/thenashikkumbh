import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Important Dates 2027 — Shahi Snan Schedule & Sacred Bathing Calendar",
  description:
    "Complete schedule of Shahi Snan dates, Parva Snan days, and sacred bathing calendar for Nashik Kumbh Mela 2027. Plan your pilgrimage around the most auspicious days.",
  openGraph: {
    title: "Nashik Kumbh Mela 2027 — Important Dates & Shahi Snan Schedule",
    description:
      "All Shahi Snan dates and sacred bathing days for Nashik Kumbh Mela 2027.",
  },
};

export default function DatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

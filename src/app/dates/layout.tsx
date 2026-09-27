import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Important Dates 2027 - Shahi Snan Schedule & Sacred Bathing Calendar",
  description:
    "Complete schedule of Shahi Snan dates, Parva Snan days, and sacred bathing calendar for Nashik Kumbh Mela 2027. Plan your pilgrimage around the most auspicious days.",
  path: "/dates",
  image: "/images/og/kumbh-7.jpg",
  imageAlt: "Nashik Kumbh Mela 2027 Important Dates",
  keywords: [
    "Shahi Snan dates 2027",
    "Kumbh Mela schedule",
    "sacred bathing calendar",
    "Amrit Snan dates",
    "Nashik Kumbh 2027 dates",
    "शाही स्नान तारीख",
    "कुंभ मेला तिथि 2027",
  ],
});

export default function DatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Important Dates", path: "/dates" }])} />
      {children}
    </>
  );
}

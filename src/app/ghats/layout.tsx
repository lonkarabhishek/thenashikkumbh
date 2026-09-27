import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sacred Ghats of Nashik - Ram Kund, Godavari & Panchavati",
  description:
    "Explore the holy bathing ghats of Nashik including Ram Kund, Godavari Ghats, Kapaleshwar Temple, and Panchavati - where Lord Rama walked during his exile.",
  path: "/ghats",
  image: "/images/og/ramkund.jpg",
  imageAlt: "Sacred Ghats of Nashik along the Godavari River",
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
});

export default function GhatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Sacred Ghats", path: "/ghats" }])} />
      {children}
    </>
  );
}

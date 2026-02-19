import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Ghats of Nashik - Ram Kund, Godavari & Panchavati",
  description:
    "Explore the holy bathing ghats of Nashik including Ram Kund, Godavari Ghats, Kapaleshwar Temple, and Panchavati - where Lord Rama walked during his exile.",
  openGraph: {
    title: "Sacred Ghats of Nashik - Holy Bathing Sites",
    description:
      "Discover the sacred ghats along the Godavari River where millions perform holy dips during Kumbh Mela.",
  },
};

export default function GhatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

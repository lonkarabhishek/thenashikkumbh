import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Businesses & Services - Hotels, Tours & Puja Services",
  description:
    "Find trusted local businesses near Nashik Kumbh Mela - hotels, dharamshalas, tour operators, puja services, restaurants, and transport. Support local communities during your pilgrimage.",
  alternates: {
    canonical: "https://thenashikkumbh.com/businesses",
  },
  openGraph: {
    title: "Local Services for Kumbh Mela Pilgrims",
    description:
      "Trusted hotels, dharamshalas, tours, and services near Nashik Kumbh Mela grounds.",
  },
};

export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

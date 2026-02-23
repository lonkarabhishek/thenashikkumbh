import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilgrim Guide - How to Reach, Stay & Prepare for Kumbh Mela",
  description:
    "Complete pilgrim guide for Nashik Kumbh Mela 2027 - how to reach by train, flight, and road, accommodation options, what to carry, do's and don'ts, and essential travel tips.",
  alternates: {
    canonical: "https://thenashikkumbh.com/guide",
  },
  openGraph: {
    title: "Nashik Kumbh Mela Pilgrim Guide - Travel, Stay & Tips",
    description:
      "Everything you need for your Kumbh pilgrimage - transport, accommodation, packing, and essential tips.",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Naga Sadhus - Warrior Ascetics of Kumbh Mela",
  description:
    "Learn about the Naga Sadhus, the ancient warrior-monks of Hindu tradition. Their history, sacred attire, Akhada orders, and their powerful role at Nashik Kumbh Mela 2027.",
  path: "/naga-sadhus",
  image: "/images/og/naga-sadhu.jpg",
  imageAlt: "Naga Sadhu at Kumbh Mela",
  keywords: [
    "Naga Sadhu",
    "warrior monks India",
    "Akhada orders",
    "Naga Baba Kumbh Mela",
    "ash-smeared ascetics",
    "Naga Sadhu procession",
    "नागा साधु",
    "नागा साधू कुंभमेळा",
  ],
});

export default function NagaSadhusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Naga Sadhus", path: "/naga-sadhus" }])} />
      {children}
    </>
  );
}

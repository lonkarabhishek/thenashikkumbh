import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Local Businesses & Services - Hotels, Tours & Puja Services",
  description:
    "Find trusted local businesses near Nashik Kumbh Mela - hotels, dharamshalas, tour operators, puja services, restaurants, and transport. Support local communities during your pilgrimage.",
  path: "/businesses",
  image: "/images/og/kumbh-12.jpg",
  imageAlt: "Local Businesses and Services for Kumbh Mela Pilgrims",
  keywords: [
    "Nashik hotels Kumbh Mela",
    "dharamshala Nashik",
    "Kumbh Mela services",
    "puja services Nashik",
    "tour operators Kumbh",
    "local businesses Nashik",
    "कुंभ मेला सेवाएं",
    "कुंभमेळा सेवा",
  ],
});

export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Businesses", path: "/businesses" }])} />
      {children}
    </>
  );
}

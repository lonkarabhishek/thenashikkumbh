import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Yatra - Free Walking Audio Guide to Nashik Kumbh Mela",
  description:
    "Free self-guided walking audio tours of Nashik's sacred quarter, in Marathi, Hindi and English. Hear the story of Ram Kund, Kapaleshwar, Kalaram Mandir, Trimbakeshwar and the akhadas as you reach each place.",
  path: "/yatra",
  image: "/images/og/godavari-ghats.jpg",
  imageAlt: "Yatra - Free Walking Audio Guide to Nashik Kumbh Mela",
  keywords: [
    "Nashik audio guide",
    "Nashik walking tour",
    "Panchavati walking tour",
    "Kumbh Mela audio tour",
    "Trimbakeshwar guide",
    "Ram Kund story",
    "नाशिक ऑडिओ गाईड",
    "पंचवटी यात्रा",
    "नाशिक पदयात्रा",
  ],
});

export default function YatraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Yatra Audio Guide", path: "/yatra" }])} />
      {children}
    </>
  );
}

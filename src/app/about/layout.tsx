import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kumbh Mela - History, Origins & Spiritual Significance",
  description:
    "Discover the ancient origins of Kumbh Mela, the Samudra Manthan legend, and why Nashik is one of four sacred cities chosen for this divine gathering at the Godavari River.",
  keywords: [
    "Kumbh Mela history",
    "Samudra Manthan",
    "Kumbh origin story",
    "why Kumbh Mela at Nashik",
    "Hindu pilgrimage history",
    "Godavari sacred river",
    "कुंभ मेला इतिहास",
    "कुंभमेळा इतिहास",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/about",
  },
  openGraph: {
    title: "About Kumbh Mela - History & Spiritual Significance",
    description:
      "The world's largest spiritual gathering - learn about the mythological origins, importance in Hinduism, and Nashik's sacred bond with Kumbh Mela.",
    images: [
      {
        url: "/images/gallery/kumbh-2.webp",
        width: 1200,
        height: 630,
        alt: "About Kumbh Mela - History and Spiritual Significance",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

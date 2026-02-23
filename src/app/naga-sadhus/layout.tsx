import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naga Sadhus - Warrior Ascetics of Kumbh Mela",
  description:
    "Learn about the Naga Sadhus, the ancient warrior-monks of Hindu tradition. Their history, sacred attire, Akhada orders, and their powerful role at Nashik Kumbh Mela 2027.",
  alternates: {
    canonical: "https://thenashikkumbh.com/naga-sadhus",
  },
  openGraph: {
    title: "Naga Sadhus - Warrior Ascetics of Kumbh Mela | Nashik Kumbh 2027",
    description:
      "Discover the Naga Sadhus - ash-smeared warrior ascetics who lead the grand Shahi Snan processions at Kumbh Mela. History, attire, orders, and their role at Nashik Kumbh 2027.",
    images: [
      {
        url: "/images/naga-sadhu.png",
        width: 1200,
        height: 630,
        alt: "Naga Sadhu at Kumbh Mela",
      },
    ],
  },
};

export default function NagaSadhusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

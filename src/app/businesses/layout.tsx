import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Businesses & Services - Hotels, Tours & Puja Services",
  description:
    "Find trusted local businesses near Nashik Kumbh Mela - hotels, dharamshalas, tour operators, puja services, restaurants, and transport. Support local communities during your pilgrimage.",
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
  alternates: {
    canonical: "https://thenashikkumbh.com/businesses",
  },
  openGraph: {
    title: "Local Services for Kumbh Mela Pilgrims",
    description:
      "Trusted hotels, dharamshalas, tours, and services near Nashik Kumbh Mela grounds.",
    images: [
      {
        url: "/images/gallery/kumbh-12.webp",
        width: 1200,
        height: 630,
        alt: "Local Businesses and Services for Kumbh Mela Pilgrims",
      },
    ],
  },
};

export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

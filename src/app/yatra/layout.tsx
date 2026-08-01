import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yatra - Free Walking Audio Guide to Nashik Kumbh Mela",
  description:
    "Free self-guided walking audio tours of Nashik's sacred quarter, in Marathi, Hindi and English. Hear the story of Ram Kund, Kapaleshwar, Kalaram Mandir, Trimbakeshwar and the akhadas as you reach each place.",
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
  alternates: {
    canonical: "https://thenashikkumbh.com/yatra",
  },
  openGraph: {
    title: "Yatra - Stories That Walk With You | Nashik Kumbh Mela 2027",
    description:
      "A free walking audio guide to Nashik's sacred quarter. Twelve places, twelve stories, in three languages.",
  },
};

export default function YatraLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kumbh Mela - History, Origins & Spiritual Significance",
  description:
    "Discover the ancient origins of Kumbh Mela, the Samudra Manthan legend, and why Nashik is one of four sacred cities chosen for this divine gathering at the Godavari River.",
  openGraph: {
    title: "About Kumbh Mela - History & Spiritual Significance",
    description:
      "The world's largest spiritual gathering - learn about the mythological origins, importance in Hinduism, and Nashik's sacred bond with Kumbh Mela.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kumbh Mela Games - Quiz, Word Scramble and Fun Activities",
  description:
    "Play fun and educational games about Nashik Kumbh Mela 2027. Test your knowledge with our Kumbh quiz, word scramble, and learn about sacred traditions, ghats, and rituals through interactive activities.",
  path: "/games",
  image: "/images/og/kumbh-3.jpg",
  imageAlt: "Kumbh Mela Interactive Games and Quiz",
  keywords: [
    "Kumbh Mela quiz",
    "Kumbh Mela games",
    "Hindu trivia",
    "Nashik Kumbh activities",
    "spiritual games",
    "Kumbh word game",
    "कुंभ मेला खेल",
    "कुंभमेळा खेळ",
  ],
});

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Games", path: "/games" }])} />
      {children}
    </>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumbh Mela Games - Quiz, Word Scramble and Fun Activities",
  description:
    "Play fun and educational games about Nashik Kumbh Mela 2027. Test your knowledge with our Kumbh quiz, word scramble, and learn about sacred traditions, ghats, and rituals through interactive activities.",
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
  alternates: {
    canonical: "https://thenashikkumbh.com/games",
  },
  openGraph: {
    title: "Kumbh Mela Games - Quiz and Fun Activities",
    description:
      "Test your knowledge about Kumbh Mela with interactive quizzes, word scrambles, and educational games.",
    images: [
      {
        url: "/images/gallery/kumbh-3.webp",
        width: 1200,
        height: 630,
        alt: "Kumbh Mela Interactive Games and Quiz",
      },
    ],
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

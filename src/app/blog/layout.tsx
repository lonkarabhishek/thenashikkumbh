import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumbh Mela Blog - Latest News, Updates and Stories from Nashik",
  description:
    "Stay updated with the latest news and stories about Nashik Kumbh Mela 2027. Read about infrastructure developments, government plans, cultural events, and pilgrim guides for Simhastha Kumbh at the Godavari River.",
  keywords: [
    "Kumbh Mela news",
    "Nashik Kumbh updates",
    "Simhastha 2027 news",
    "Kumbh Mela blog",
    "Godavari River updates",
    "Nashik pilgrimage news",
    "कुंभ मेला समाचार",
    "कुंभमेळा बातम्या",
  ],
  alternates: {
    canonical: "https://thenashikkumbh.com/blog",
  },
  openGraph: {
    title: "Kumbh Mela Blog - Latest News and Updates",
    description:
      "Latest news, government updates, infrastructure progress, and cultural stories from Nashik Kumbh Mela 2027.",
    images: [
      {
        url: "/images/gallery/kumbh-1.webp",
        width: 1200,
        height: 630,
        alt: "Nashik Kumbh Mela News and Updates",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

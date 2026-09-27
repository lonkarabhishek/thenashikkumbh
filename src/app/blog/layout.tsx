import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kumbh Mela Blog - Latest News, Updates and Stories from Nashik",
  description:
    "Stay updated with the latest news and stories about Nashik Kumbh Mela 2027. Read about infrastructure developments, government plans, cultural events, and pilgrim guides for Simhastha Kumbh at the Godavari River.",
  path: "/blog",
  image: "/images/og/kumbh-1.jpg",
  imageAlt: "Nashik Kumbh Mela News and Updates",
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
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      {children}
    </>
  );
}

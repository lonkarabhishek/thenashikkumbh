"use client";

interface BlogArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  source: string;
}

export default function BlogArticleSchema({
  title,
  description,
  slug,
  image,
  datePublished,
  source,
}: BlogArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: `https://thenashikkumbh.com${image}`,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: source,
    },
    publisher: {
      "@type": "Organization",
      name: "The Nashik Kumbh",
      logo: {
        "@type": "ImageObject",
        url: "https://thenashikkumbh.com/images/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thenashikkumbh.com/blog/${slug}`,
    },
    url: `https://thenashikkumbh.com/blog/${slug}`,
    inLanguage: ["en", "hi", "mr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

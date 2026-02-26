import { Metadata } from "next";
import { getArticleBySlug, getAllSlugs } from "@/data/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: article.title.en,
    description: article.summary.en,
    keywords: [
      "Kumbh Mela",
      "Nashik",
      article.category,
      "Simhastha 2027",
      "Godavari",
    ],
    alternates: {
      canonical: `https://thenashikkumbh.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title.en,
      description: article.summary.en,
      url: `https://thenashikkumbh.com/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [article.source],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title.en,
      description: article.summary.en,
    },
  };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

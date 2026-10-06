import { Metadata } from "next";
import { NEWS_AUTHOR, getArticleBySlug, getAllSlugs } from "@/data/blogData";
import { getPhoto, isPhotoAvailable } from "@/data/photos";
import JsonLd from "@/components/JsonLd";
import { LOCALES } from "@/i18n/locales";
import { SEO_COPY } from "@/i18n/seoCopy";
import type { Locale } from "@/i18n/translations";
import {
  SITE_NAME,
  SITE_URL,
  breadcrumbSchema,
  localeUrl,
  ogImageFor,
  pageMetadata,
} from "@/lib/seo";

interface Props {
  params: { locale: Locale; slug: string };
  children: React.ReactNode;
}

export function generateMetadata({ params }: Omit<Props, "children">): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
      robots: { index: false, follow: true },
    };
  }

  return pageMetadata({
    locale: params.locale,
    title: article.title[params.locale],
    description: article.summary[params.locale],
    path: `/blog/${article.slug}`,
    image: ogImageFor(article.image),
    keywords: ["Kumbh Mela", "Nashik", article.category, "Simhastha 2027", "Godavari"],
    type: "article",
    publishedTime: article.date,
    authors: [NEWS_AUTHOR.name],
  });
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllSlugs().map((slug) => ({ locale, slug })));
}

// Article markup is rendered here, on the server, so it is in the static HTML
// rather than injected after hydration by the client-side article page.
export default function BlogSlugLayout({ params, children }: Props) {
  const { locale } = params;
  const article = getArticleBySlug(params.slug);
  if (!article) return children;

  const url = localeUrl(locale, `/blog/${article.slug}`);
  const photo = article.photoId && isPhotoAvailable(article.photoId) ? getPhoto(article.photoId) : undefined;
  const photoImage = photo
    ? [
        {
          "@type": "ImageObject",
          url: `${SITE_URL}${photo.file}`,
          caption: photo.caption,
          creator: { "@type": "Person", name: photo.author },
          creditText: `${photo.author} / Wikimedia Commons`,
          license: photo.licenseUrl,
          acquireLicensePage: photo.sourcePage,
        },
      ]
    : [];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title[locale],
    description: article.summary[locale],
    image: [`${SITE_URL}${ogImageFor(article.image)}`, ...photoImage],
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Organization",
      name: NEWS_AUTHOR.name,
      url: localeUrl(locale, NEWS_AUTHOR.path),
    },
    // The original reporting or official document, credited as the source.
    ...(article.sources?.length
      ? { citation: article.sources.map((src) => ({ "@type": "CreativeWork", name: src.title, url: src.url, publisher: src.publisher })) }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: SEO_COPY.blog[locale].crumb, path: "/blog" },
          { name: article.title[locale], path: `/blog/${article.slug}` },
        ])}
      />
      {children}
    </>
  );
}

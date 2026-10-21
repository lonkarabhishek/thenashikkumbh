import { OWNER_SAME_AS, SITE_OWNER } from "@/data/siteOwner";
import { Metadata } from "next";
import { getArticleBySlug, getAllSlugs } from "@/data/blogData";
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
    image: article.shareImage?.[params.locale] ?? ogImageFor(article.image),
    keywords: ["Kumbh Mela", "Nashik", article.category, "Simhastha 2027", "Godavari"],
    type: "article",
    publishedTime: article.date,
    authors: [SITE_OWNER.name],
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
  // Google Discover wants images at least 1200px wide; smaller photos stay
  // on the page but are left out of the schema so they are never picked.
  const photoImage = photo && photo.width >= 1200
    ? [
        {
          "@type": "ImageObject",
          url: `${SITE_URL}${photo.file}`,
          width: photo.width,
          height: photo.height,
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
    // Every share/OG image is a 1200x630 JPEG (checked by scripts/verify-news.mjs).
    image: [
      {
        "@type": "ImageObject",
        url: `${SITE_URL}${article.shareImage?.[locale] ?? ogImageFor(article.image)}`,
        width: 1200,
        height: 630,
      },
      ...photoImage,
    ],
    // Full ISO 8601 with the IST offset; matches the news sitemap (09:00 IST).
    datePublished: `${article.date}T09:00:00+05:30`,
    dateModified: `${article.updated ?? article.date}T09:00:00+05:30`,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#owner`,
      name: SITE_OWNER.name,
      url: localeUrl(locale, "/about#who-runs-this-site"),
      sameAs: OWNER_SAME_AS,
    },
    // The original reporting or official document, credited as the source.
    ...(article.sources?.length
      ? { citation: article.sources.map((src) => ({ "@type": "CreativeWork", name: src.title, url: src.url, publisher: src.publisher })) }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 192, height: 192 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      {article.faq && article.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((f) => ({
              "@type": "Question",
              name: f.q[locale],
              acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
            })),
          }}
        />
      )}
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

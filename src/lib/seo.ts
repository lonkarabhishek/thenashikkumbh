import type { Metadata } from "next";

export const SITE_URL = "https://thenashikkumbh.com";
export const SITE_NAME = "The Nashik Kumbh";
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

interface PageSeo {
  /** Page title; the root layout's template appends the site suffix. */
  title: string;
  description: string;
  /** Route path beginning with "/", e.g. "/dates". */
  path: string;
  /** A 1200x630 raster under /images (see scripts/generate-og-images.mjs). */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  robots?: Metadata["robots"];
}

/**
 * Metadata for one page.
 *
 * Next.js replaces (does not merge) the `openGraph` and `twitter` objects a
 * child segment defines, and inherits the parent's `alternates.canonical`
 * when a child omits it. Building every page's metadata here keeps the
 * canonical URL, og:url, site name, locale and share image consistent, and
 * stops pages from silently inheriting the home page's canonical or X card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
  keywords,
  type = "website",
  publishedTime,
  authors,
  robots,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Maps a photo path such as "/images/gallery/kumbh-2.webp" to its 1200x630 crop. */
export function ogImageFor(photo: string): string {
  const name = photo.split("/").pop()?.replace(/\.(webp|jpe?g|png)$/, "");
  return name ? `/images/og/${name}.jpg` : DEFAULT_OG_IMAGE;
}

/** BreadcrumbList JSON-LD for an inner page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

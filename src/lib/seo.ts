import type { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE } from "@/i18n/locales";
import { SEO_COPY, type PageKey } from "@/i18n/seoCopy";

export const SITE_URL = "https://www.thenashikkumbh.com";
export const SITE_NAME = "The Nashik Kumbh";
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

/** Absolute URL of `path` ("/dates") in `locale`: https://…/mr/dates */
export function localeUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

/** hreflang map for a path that exists in every language. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, path)])),
    "x-default": localeUrl(DEFAULT_LOCALE, path),
  };
}

interface PageSeo {
  locale: Locale;
  /** Page title; the [locale] layout's template appends the site suffix. */
  title: string;
  description: string;
  /** Route path without the language prefix, beginning with "/", e.g. "/dates". */
  path: string;
  /** A 1200x630 raster under /images (see scripts/generate-og-images.mjs). */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  robots?: Metadata["robots"];
  /** Use the title as-is, without the layout's " | Nashik Kumbh Mela 2027" suffix. */
  absoluteTitle?: boolean;
  /**
   * The page body is written in English only. Its /mr and /hi URLs would be
   * duplicates, so every language canonicalises to the /en URL and no
   * hreflang alternates are emitted.
   */
  englishOnly?: boolean;
}

/**
 * Metadata for one page in one language.
 *
 * Next.js replaces (does not merge) the `openGraph` and `twitter` objects a
 * child segment defines, and inherits the parent's `alternates` when a child
 * omits them. Building every page's metadata here keeps the canonical URL,
 * hreflang links, og:url, site name, locale and share image consistent.
 */
export function pageMetadata({
  locale,
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
  absoluteTitle = false,
  englishOnly = false,
}: PageSeo): Metadata {
  const url = localeUrl(englishOnly ? "en" : locale, path);
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    alternates: englishOnly
      ? { canonical: url }
      : { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[englishOnly ? "en" : locale],
      ...(englishOnly
        ? {}
        : { alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]) }),
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

/** pageMetadata() for a page whose copy lives in src/i18n/seoCopy.ts. */
export function sectionMetadata(
  locale: Locale,
  page: PageKey,
  opts: Omit<PageSeo, "locale" | "title" | "description">
): Metadata {
  const copy = SEO_COPY[page][locale];
  return pageMetadata({ locale, title: copy.title, description: copy.description, ...opts });
}

/** Maps a photo path such as "/images/gallery/kumbh-2.webp" to its 1200x630 crop. */
export function ogImageFor(photo: string): string {
  if (photo === DEFAULT_OG_IMAGE || photo.startsWith("/images/og/")) return photo;
  const name = photo.split("/").pop()?.replace(/\.(webp|jpe?g|png)$/, "");
  return name ? `/images/og/${name}.jpg` : DEFAULT_OG_IMAGE;
}

/** BreadcrumbList JSON-LD for an inner page, in the page's language. */
export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: SEO_COPY.home[locale].crumb, path: "/" }, ...items].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: localeUrl(locale, item.path),
      })
    ),
  };
}

/** Breadcrumb JSON-LD for a section page whose label lives in seoCopy.ts. */
export function sectionBreadcrumb(locale: Locale, page: PageKey, path: string) {
  return breadcrumbSchema(locale, [{ name: SEO_COPY[page][locale].crumb, path }]);
}

import { MetadataRoute } from "next";
import { blogArticles } from "@/data/blogData";
import { trails } from "@/data/yatraData";
import { LOCALES } from "@/i18n/locales";
import { languageAlternates, localeUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

/**
 * One <url> per language, each listing all its language alternates, which is
 * how Google expects a multilingual sitemap.
 *
 * Static pages carry no <lastmod>. Stamping every URL with the build time
 * tells crawlers everything changed on every deploy, and Google stops
 * trusting lastmod for sites that do that. Blog posts use their real date.
 */
function localized(path: string, changeFrequency: Freq, priority: number, lastModified?: Date) {
  return LOCALES.map<Entry>((locale) => ({
    url: localeUrl(locale, path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }));
}

/** Pages whose body is English only: one URL, no alternates (see seo.ts). */
function englishOnly(path: string, changeFrequency: Freq, priority: number): Entry {
  return { url: localeUrl("en", path), changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("/", "weekly", 1),
    ...localized("/yatra", "monthly", 0.95),
    ...localized("/dates", "weekly", 0.95),
    ...localized("/about", "monthly", 0.9),
    ...localized("/ghats", "monthly", 0.9),
    ...localized("/guide", "monthly", 0.9),
    ...localized("/events", "weekly", 0.85),
    ...localized("/naga-sadhus", "monthly", 0.85),
    ...localized("/gallery", "weekly", 0.7),
    ...localized("/blog", "weekly", 0.7),
    // Games and Kumbh Run are secondary interest surfaces, not part of the
    // pilgrim's operational path, so they stay at low priority.
    ...localized("/games", "monthly", 0.2),
    ...localized("/kumbhrun", "monthly", 0.2),
    englishOnly("/emergency", "monthly", 0.9),
    englishOnly("/policies", "monthly", 0.4),
    englishOnly("/changelog", "monthly", 0.3),
    englishOnly("/businesses", "monthly", 0.3),
    ...trails.flatMap((trail) => localized(`/yatra/${trail.id}`, "monthly", 0.85)),
    ...blogArticles.flatMap((article) =>
      localized(`/blog/${article.slug}`, "monthly", 0.6, new Date(article.date))
    ),
  ];
}

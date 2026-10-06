import { MetadataRoute } from "next";
import { blogArticles } from "@/data/blogData";
import { trails } from "@/data/yatraData";
import { PAGE_LASTMOD, TRAILS_LASTMOD } from "@/data/lastmod";
import { LOCALES } from "@/i18n/locales";
import { languageAlternates, localeUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

/**
 * One <url> per language, each listing all its language alternates, which is
 * how Google expects a multilingual sitemap. Every URL carries a real
 * <lastmod> from src/data/lastmod.ts (pages) or the post's own dates.
 */
function localized(path: string, changeFrequency: Freq, priority: number, lastmod?: string) {
  const date = lastmod ?? PAGE_LASTMOD[path];
  return LOCALES.map<Entry>((locale) => ({
    url: localeUrl(locale, path),
    ...(date ? { lastModified: new Date(`${date}T00:00:00+05:30`) } : {}),
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }));
}

/** Pages whose body is English only: one URL, no alternates (see seo.ts). */
function englishOnly(path: string, changeFrequency: Freq, priority: number): Entry {
  const date = PAGE_LASTMOD[path];
  return {
    url: localeUrl("en", path),
    ...(date ? { lastModified: new Date(`${date}T00:00:00+05:30`) } : {}),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("/", "daily", 1),
    ...localized("/dates", "weekly", 0.95),
    ...localized("/dhwajarohan-2026", "daily", 0.95),
    ...localized("/parva-snan-calendar", "weekly", 0.9),
    ...localized("/trimbakeshwar-kumbh-2027", "weekly", 0.9),
    ...localized("/how-to-reach", "weekly", 0.9),
    ...localized("/accommodation", "weekly", 0.9),
    ...localized("/yatra", "monthly", 0.85),
    ...localized("/about", "monthly", 0.8),
    ...localized("/ghats", "monthly", 0.85),
    ...localized("/guide", "weekly", 0.9),
    ...localized("/events", "weekly", 0.8),
    ...localized("/naga-sadhus", "monthly", 0.7),
    ...localized("/gallery", "monthly", 0.7),
    ...localized("/credits", "monthly", 0.2),
    ...localized("/blog", "daily", 0.85),
    // Games and Kumbh Run are secondary interest surfaces, not part of the
    // pilgrim's operational path, so they stay at low priority.
    ...localized("/games", "monthly", 0.2),
    ...localized("/kumbhrun", "monthly", 0.2),
    englishOnly("/emergency", "monthly", 0.9),
    englishOnly("/policies", "monthly", 0.4),
    englishOnly("/changelog", "monthly", 0.3),
    englishOnly("/businesses", "monthly", 0.3),
    ...trails.flatMap((trail) => localized(`/yatra/${trail.id}`, "monthly", 0.8, TRAILS_LASTMOD)),
    ...blogArticles.flatMap((article) =>
      localized(`/blog/${article.slug}`, "monthly", 0.7, article.updated ?? article.date)
    ),
  ];
}

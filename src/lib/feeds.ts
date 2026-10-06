import { NEWS_AUTHOR, blogArticles } from "@/data/blogData";
import type { Locale } from "@/i18n/translations";
import { SITE_NAME, SITE_URL, localeUrl } from "@/lib/seo";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FEED_TITLE: Record<Locale, string> = {
  en: "The Nashik Kumbh: Simhastha 2027 news",
  hi: "द नाशिक कुंभ: सिंहस्थ 2027 समाचार",
  mr: "द नाशिक कुंभ: सिंहस्थ २०२७ बातम्या",
};

/** Publication time for a post: 09:00 IST on its date. */
const pubDate = (date: string) => new Date(`${date}T09:00:00+05:30`);

/** RSS 2.0 feed of every post in one language, newest first. */
export function rssFeed(locale: Locale): string {
  const items = blogArticles
    .map((a) => {
      const url = localeUrl(locale, `/blog/${a.slug}`);
      return `    <item>
      <title>${esc(a.title[locale])}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate(a.date).toUTCString()}</pubDate>
      <dc:creator>${esc(NEWS_AUTHOR.name)}</dc:creator>
      <category>${esc(a.category)}</category>
      <description>${esc(a.summary[locale])}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED_TITLE[locale])}</title>
    <link>${localeUrl(locale, "/blog")}</link>
    <atom:link href="${locale === "en" ? `${SITE_URL}/feed` : localeUrl(locale, "/feed")}" rel="self" type="application/rss+xml" />
    <description>${esc(`${SITE_NAME}: independent, sourced news on the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027.`)}</description>
    <language>${locale}-IN</language>
    <lastBuildDate>${pubDate(blogArticles[0]?.updated ?? blogArticles[0]?.date ?? "2026-10-06").toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

/**
 * Google News sitemap: only articles published or updated in the last
 * 48 hours, in all three languages. Google reads this often, so new posts
 * are found quickly.
 */
export function newsSitemap(now: Date = new Date()): string {
  const cutoff = now.getTime() - 48 * 60 * 60 * 1000;
  const recent = blogArticles.filter((a) => pubDate(a.date).getTime() >= cutoff);
  const LOCALES: Locale[] = ["mr", "hi", "en"];

  const urls = recent
    .flatMap((a) =>
      LOCALES.map(
        (locale) => `  <url>
    <loc>${localeUrl(locale, `/blog/${a.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE_NAME)}</news:name>
        <news:language>${locale}</news:language>
      </news:publication>
      <news:publication_date>${pubDate(a.date).toISOString()}</news:publication_date>
      <news:title>${esc(a.title[locale])}</news:title>
    </news:news>
  </url>`
      )
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

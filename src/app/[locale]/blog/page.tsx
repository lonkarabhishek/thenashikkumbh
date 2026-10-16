import BlogIndexView, { type NewsBrief } from "@/components/blog/BlogIndexView";
import JsonLd from "@/components/JsonLd";
import { blogArticles } from "@/data/blogData";
import { schedule } from "@/data/verified";
import { newsStatus, newsThumb } from "@/components/blog/newsMeta";
import { SEO_COPY } from "@/i18n/seoCopy";
import { SITE_URL, localeUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";

/** Schedule rows the "in brief" answer quotes. Dates come from the verified registry, never typed here. */
const BRIEF_IDS = ["dhwajarohan", "amrit-snan-1", "amrit-snan-2", "amrit-snan-3-nashik", "amrit-snan-3-trimbak"];

function briefDates(): NewsBrief {
  const pick = (id: string) => {
    const e = schedule.find((s) => s.id === id);
    if (!e) throw new Error(`blog brief: schedule has no event "${id}"`);
    return { isoDate: e.isoDate, startTime: e.startTime ?? null };
  };
  const [dhwaj, a1, a2, a3n, a3t] = BRIEF_IDS.map(pick);
  const src = schedule.find((s) => s.id === "dhwajarohan")!;
  return {
    dhwajarohan: dhwaj,
    amrit: [a1.isoDate, a2.isoDate, a3n.isoDate],
    amritTrimbak: a3t.isoDate,
    source: { org: src.sourceOrganisation, url: src.sourceUrl },
  };
}

// Server wrapper: the list needs titles and summaries only, not post bodies.
export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const articles = blogArticles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    date: a.date,
    summary: a.summary,
    category: a.category,
    source: a.source,
    status: newsStatus(a),
    thumb: newsThumb(a),
  }));

  // CollectionPage + ItemList of the sourced stories, newest first, so search
  // engines read /blog as the news hub and see what it lists.
  const sourced = articles.filter((a) => a.status !== null).slice(0, 20);
  const url = localeUrl(locale, "/blog");
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: SEO_COPY.blog[locale].title,
    description: SEO_COPY.blog[locale].description,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(sourced[0] ? { dateModified: sourced[0].date } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: sourced.length,
      itemListElement: sourced.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: localeUrl(locale, `/blog/${a.slug}`),
        name: a.title[locale],
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <BlogIndexView articles={articles} brief={briefDates()} />
    </>
  );
}

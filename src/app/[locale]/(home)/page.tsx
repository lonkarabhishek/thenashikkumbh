import HomePage from "@/components/home/HomePage";
import { blogArticles } from "@/data/blogData";
import { newsStatus } from "@/components/blog/newsMeta";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import { getPhoto, isPhotoAvailable } from "@/data/photos";

/** Photos for the home page's drifting strip, in display order. */
const GLIMPSES = [1, 41, 8, 26, 29, 32, 14, 44, 21, 13, 47, 31, 45, 3, 37, 10];

// Server wrapper: hands the client home page just the three newest
// headlines and the strip's photos, so post bodies and the full photo
// list are not bundled into its JavaScript.
export default function Page({ params }: { params: { locale: Locale } }) {
  const news = blogArticles.slice(0, 6).map((a) => ({
    slug: a.slug,
    date: a.date,
    title: a.title,
    summary: a.summary,
    status: newsStatus(a),
  }));
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: { en: "Latest Nashik Kumbh 2027 news", hi: "नाशिक कुंभ 2027 की ताज़ा खबरें", mr: "नाशिक कुंभमेळा 2027 च्या ताज्या बातम्या" }[params.locale],
    itemListElement: news.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${params.locale}/blog/${n.slug}`,
      name: n.title[params.locale],
    })),
  };
  const glimpses = GLIMPSES.filter(isPhotoAvailable)
    .map((id) => getPhoto(id)!)
    .map(({ id, file, alt, width, height, author, license }) => ({ id, file, alt, width, height, author, license }));
  return (
    <>
      <JsonLd data={itemList} />
      <HomePage news={news} glimpses={glimpses} />
    </>
  );
}

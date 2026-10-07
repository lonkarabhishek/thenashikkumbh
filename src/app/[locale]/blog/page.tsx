import BlogIndexView from "@/components/blog/BlogIndexView";
import { blogArticles } from "@/data/blogData";
import { newsStatus, newsThumb } from "@/components/blog/newsMeta";

// Server wrapper: the list needs titles and summaries only, not post bodies.
export default function Page() {
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
  return <BlogIndexView articles={articles} />;
}

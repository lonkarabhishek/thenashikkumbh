import BlogIndexView from "@/components/blog/BlogIndexView";
import { blogArticles } from "@/data/blogData";

// Server wrapper: the list needs titles and summaries only, not post bodies.
export default function Page() {
  const articles = blogArticles.map(({ id, slug, title, date, image, summary, category, source }) => ({
    id,
    slug,
    title,
    date,
    image,
    summary,
    category,
    source,
  }));
  return <BlogIndexView articles={articles} />;
}

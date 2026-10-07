import BlogArticleView from "@/components/blog/BlogArticleView";
import { blogArticles, getArticleBySlug } from "@/data/blogData";
import { newsStatus, newsThumb, readingTimes } from "@/components/blog/newsMeta";

// Server wrapper: passes only this article and three related headlines to the
// client view, so other posts' text is not bundled into the page.
export default function Page({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return <BlogArticleView article={undefined} related={[]} />;

  // Same category first, then the newest of the rest; sourced posts only.
  const others = blogArticles.filter((a) => a.id !== article.id && newsStatus(a) !== null);
  const related = [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ]
    .slice(0, 3)
    .map((a) => ({ id: a.id, slug: a.slug, title: a.title, date: a.date, category: a.category, thumb: newsThumb(a) }));

  return (
    <BlogArticleView
      article={article}
      status={newsStatus(article)}
      thumb={newsThumb(article)}
      minutes={readingTimes(article.content)}
      related={related}
    />
  );
}

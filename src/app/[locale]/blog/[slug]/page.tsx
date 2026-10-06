import BlogArticleView from "@/components/blog/BlogArticleView";
import { blogArticles, getArticleBySlug } from "@/data/blogData";

// Server wrapper: passes only this article and three related headlines to the
// client view, so other posts' text is not bundled into the page.
export default function Page({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const related = article
    ? blogArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3)
        .map(({ id, slug, title, date, image }) => ({ id, slug, title, date, image }))
    : [];
  return <BlogArticleView article={article} related={related} />;
}

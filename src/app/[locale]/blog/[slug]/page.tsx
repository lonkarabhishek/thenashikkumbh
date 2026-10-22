import BlogArticleView from "@/components/blog/BlogArticleView";
import { blogArticles, getArticleBySlug } from "@/data/blogData";
import audioManifest from "@/data/audioManifest.json";
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

  // A newer follow-up story, announced at the top of this post.
  const next = article.followUp ? getArticleBySlug(article.followUp.slug) : undefined;
  const followUp = next ? { slug: next.slug, title: next.title, date: next.date } : undefined;

  // Only files that were pre-generated (scripts/generate-news-audio.ts) are linked.
  const manifest = audioManifest as Record<string, { file: string }>;
  const audio = Object.fromEntries(
    (["en", "hi", "mr"] as const).flatMap((l) => {
      const e = manifest[`${article.slug}:${l}`];
      return e ? [[l, e.file]] : [];
    }),
  );

  return (
    <BlogArticleView
      audio={audio}
      article={article}
      status={newsStatus(article)}
      thumb={newsThumb(article)}
      minutes={readingTimes(article.content)}
      related={related}
      followUp={followUp}
    />
  );
}

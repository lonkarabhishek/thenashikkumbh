import { blogArticles } from "@/data/blogData";
import type { ChatNewsItem } from "@/lib/chatNews";

export const dynamic = "force-static";

/**
 * /chat-news.json: the compact news index Kumbh Sahayak searches. The chat
 * fetches it only when a question needs news, so the assistant's bundle does
 * not carry every post. Only posts that cite sources are included; older
 * unsourced posts are left out so the assistant never repeats them as fact.
 */
export function GET() {
  const items: ChatNewsItem[] = blogArticles
    .filter((a) => a.sources && a.sources.length > 0)
    .map((a) => ({
      slug: a.slug,
      date: a.date,
      updated: a.updated,
      title: a.title,
      summary: a.summary,
      reported: a.sources!.some((s) => s.status === "reported"),
      source: { publisher: a.sources![0].publisher, url: a.sources![0].url },
    }));

  return Response.json(items);
}

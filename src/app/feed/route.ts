import { rssFeed } from "@/lib/feeds";

export const dynamic = "force-static";

/** /feed: the English RSS feed (/mr/feed and /hi/feed carry the others). */
export function GET() {
  return new Response(rssFeed("en"), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

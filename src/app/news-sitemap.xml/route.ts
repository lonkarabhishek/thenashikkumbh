import { newsSitemap } from "@/lib/feeds";

// Rebuilt at most hourly so the 48-hour window stays current between deploys.
export const revalidate = 3600;

export function GET() {
  return new Response(newsSitemap(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

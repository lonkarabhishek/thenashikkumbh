import { LOCALES, isLocale } from "@/i18n/locales";
import { rssFeed } from "@/lib/feeds";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function GET(_req: Request, { params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return new Response("Not found", { status: 404 });
  return new Response(rssFeed(params.locale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

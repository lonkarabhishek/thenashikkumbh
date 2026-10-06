import { availablePhotos } from "@/data/photos";
import { SITE_URL, localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Image sitemap: every self-hosted Commons photo, listed on the gallery. */
export function GET() {
  const images = availablePhotos
    .map(
      (p) => `    <image:image>
      <image:loc>${SITE_URL}${p.file}</image:loc>
      <image:caption>${esc(p.caption)}</image:caption>
      <image:license>${esc(p.licenseUrl)}</image:license>
    </image:image>`
    )
    .join("\n");
  const urls = (["mr", "hi", "en"] as const)
    .map((l) => `  <url>\n    <loc>${localeUrl(l, "/gallery")}</loc>\n${images}\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

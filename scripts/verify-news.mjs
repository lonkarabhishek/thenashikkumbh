#!/usr/bin/env node
// Google News / Discover readiness check, run in the build.
//
// - Every post's share / OG image must exist and be at least 1200px wide
//   (Discover only shows large previews for 1200px+ images).
// - The site-wide robots meta must keep max-image-preview:large.
// - robots.txt must list the news sitemap, and the news sitemap route must exist.
// Dependency-free: reads JPEG/PNG headers directly.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUB = join(ROOT, "public");
const errors = [];

function imageWidth(file) {
  const b = readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return b.readUInt32BE(16); // PNG IHDR
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return b.readUInt16BE(i + 7);
      i += 2 + len;
    }
  }
  return 0;
}

// Mirror of ogImageFor() in src/lib/seo.ts.
function ogImageFor(photo) {
  if (photo === "/images/og-image.jpg" || photo.startsWith("/images/og/")) return photo;
  const name = photo.split("/").pop()?.replace(/\.(webp|jpe?g|png)$/, "");
  return name ? `/images/og/${name}.jpg` : "/images/og-image.jpg";
}

const files = [
  join(ROOT, "src/data/blogData.ts"),
  ...readdirSync(join(ROOT, "src/data/news")).filter((f) => f.endsWith(".ts")).map((f) => join(ROOT, "src/data/news", f)),
  ...readdirSync(join(ROOT, "src/content/pages")).filter((f) => f.endsWith(".ts")).map((f) => join(ROOT, "src/content/pages", f)),
];

const checked = new Set();
for (const file of files) {
  const src = readFileSync(file, "utf8");
  const paths = [];
  for (const m of src.matchAll(/^\s{2,4}image: "([^"]+)"/gm)) paths.push(ogImageFor(m[1]));
  for (const m of src.matchAll(/shareImage: \{([^}]+)\}/g)) for (const p of m[1].matchAll(/"(\/images\/[^"]+)"/g)) paths.push(p[1]);
  for (const p of paths) {
    if (checked.has(p)) continue;
    checked.add(p);
    const abs = join(PUB, p);
    if (!existsSync(abs)) { errors.push(`${p}: share image missing (from ${file.replace(ROOT, "")})`); continue; }
    const w = imageWidth(abs);
    if (w < 1200) errors.push(`${p}: ${w}px wide, needs >= 1200px for Discover (from ${file.replace(ROOT, "")})`);
  }
}

const layout = readFileSync(join(ROOT, "src/app/[locale]/layout.tsx"), "utf8");
if (!/"max-image-preview":\s*"large"/.test(layout)) errors.push("src/app/[locale]/layout.tsx: robots must keep max-image-preview: large");
const robots = readFileSync(join(ROOT, "src/app/robots.ts"), "utf8");
if (!robots.includes("/news-sitemap.xml")) errors.push("src/app/robots.ts: must list /news-sitemap.xml");
if (!robots.includes("/sitemap.xml")) errors.push("src/app/robots.ts: must list /sitemap.xml");
if (!existsSync(join(ROOT, "src/app/news-sitemap.xml/route.ts"))) errors.push("news-sitemap.xml route missing");

if (errors.length) {
  console.error(`verify:news failed (${errors.length}):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`verify:news ok: ${checked.size} share images >= 1200px, robots + news sitemap in place.`);

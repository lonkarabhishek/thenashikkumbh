#!/usr/bin/env node
// Social-share (Open Graph) image generator.
//
// Facebook, WhatsApp, X and LinkedIn do not render SVG preview images, and
// most of the photos in public/images are portrait. Link previews need a
// 1200x630 raster, so this script writes:
//
//   public/images/og-image.jpg     branded card used by the home page
//   public/images/og/<name>.jpg    1200x630 crops of page photos
//
// The branded card renders text through librsvg, so the Noto Serif Devanagari
// and Fraunces fonts must be installed locally (e.g. from @fontsource, copied
// into ~/.fonts and `fc-cache -f`). Without them the Marathi line falls back
// to boxes. Run by hand after changing a source photo; the output is committed.
//
//   node scripts/generate-og-images.mjs

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const IMAGES = join(ROOT, "public/images");
const OUT = join(IMAGES, "og");
const W = 1200;
const H = 630;

/** Page photo crops: output name -> source photo (relative to public/images). */
const CROPS = {
  ramkund: "ramkund.jpg",
  "godavari-ghats": "godavari-ghats.jpg",
  "naga-sadhu": "naga-sadhu.webp",
  ...Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [`kumbh-${i + 1}`, `gallery/kumbh-${i + 1}.jpg`])
  ),
};

const JPEG = { quality: 82, mozjpeg: true };

async function crops() {
  mkdirSync(OUT, { recursive: true });
  for (const [name, src] of Object.entries(CROPS)) {
    await sharp(join(IMAGES, src))
      .resize(W, H, { fit: "cover", position: "attention" })
      .jpeg(JPEG)
      .toFile(join(OUT, `${name}.jpg`));
  }
}

async function brandCard() {
  const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0D0906" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0D0906" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#FFD700" stroke-opacity="0.35" stroke-width="2" rx="8"/>
  <text x="600" y="215" text-anchor="middle" font-size="84" font-family="Noto Serif Devanagari" font-weight="700" fill="#FFD700">नाशिक कुंभमेळा २०२७</text>
  <text x="600" y="310" text-anchor="middle" font-size="60" font-family="Fraunces" font-weight="600" fill="#FFF8E6">Nashik Kumbh Mela 2027</text>
  <rect x="350" y="350" width="500" height="2" fill="#FFD700" fill-opacity="0.6"/>
  <text x="600" y="415" text-anchor="middle" font-size="30" font-family="Fraunces" font-weight="600" fill="#FFF8E6" fill-opacity="0.9">Amrit Snan: 2 Aug, 31 Aug, 11 and 12 Sep 2027</text>
  <text x="600" y="470" text-anchor="middle" font-size="26" font-family="Fraunces" font-weight="600" fill="#FFF8E6" fill-opacity="0.75">Nashik and Trimbakeshwar Simhastha pilgrim guide</text>
  <text x="600" y="570" text-anchor="middle" font-size="24" font-family="Fraunces" font-weight="600" fill="#FFD700" fill-opacity="0.85">thenashikkumbh.com</text>
</svg>`;

  // Plain background on purpose: the card should not imply that any one
  // photo shows Nashik unless that photo's location has been verified.
  await sharp({ create: { width: W, height: H, channels: 3, background: "#1A0F08" } })
    .composite([{ input: Buffer.from(text), top: 0, left: 0 }])
    .jpeg(JPEG)
    .toFile(join(IMAGES, "og-image.jpg"));
}

await crops();
await brandCard();
console.log(`Wrote og-image.jpg and ${Object.keys(CROPS).length} crops to public/images/og/`);

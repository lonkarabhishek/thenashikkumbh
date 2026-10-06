#!/usr/bin/env node
// Import the 50 Wikimedia Commons photos into public/images/commons.
//
// Two ways to get the source files:
//   node scripts/import-commons-photos.mjs <folder>     # files on disk
//   node scripts/import-commons-photos.mjs --download   # fetch web_1280 URLs
//
// <folder> may contain the files named the way the photo research saved
// them ("01-ramkund-nashik.jpg", "1.jpg", "photo-01.webp"...): the first
// number in each filename is taken as the photo id.
//
// Each photo is resized to at most 1280px wide and saved as WebP at the
// descriptive path in src/data/photos/commons.json. Resizing and re-encoding
// does not alter the picture (no crop, filter or overlay), so CC BY-SA files
// stay unmodified. available.json is rewritten with the ids now on disk, and
// width/height in commons.json are set to the real output size.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA = join(ROOT, "src/data/photos/commons.json");
const AVAILABLE = join(ROOT, "src/data/photos/available.json");
const PUBLIC = join(ROOT, "public");
const MAX_WIDTH = 1280;

const photos = JSON.parse(readFileSync(DATA, "utf8"));
const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/import-commons-photos.mjs <folder> | --download");
  process.exit(1);
}

/** id -> Buffer of the source image */
const sources = new Map();

if (arg === "--download") {
  for (const p of photos) {
    const res = await fetch(p.webUrl, {
      headers: { "User-Agent": "thenashikkumbh.com photo import (contact via site)" },
    });
    if (!res.ok) {
      console.warn(`#${p.id}: HTTP ${res.status}, skipped`);
      continue;
    }
    sources.set(p.id, Buffer.from(await res.arrayBuffer()));
    // Be gentle: Wikimedia rate-limits bulk fetches.
    await new Promise((r) => setTimeout(r, 400));
  }
} else {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
    );
  for (const file of walk(arg)) {
    if (!/\.(jpe?g|png|webp|tiff?|gif)$/i.test(file)) continue;
    const name = file.split("/").pop();
    const id = Number(name.match(/\d+/)?.[0]);
    if (!photos.some((p) => p.id === id)) continue;
    if (sources.has(id)) console.warn(`#${id}: more than one file, using ${name}`);
    sources.set(id, readFileSync(file));
  }
}

mkdirSync(join(PUBLIC, "images/commons"), { recursive: true });
for (const p of photos) {
  const input = sources.get(p.id);
  if (!input) continue;
  const out = join(PUBLIC, p.file);
  const { width, height } = await sharp(input)
    .rotate() // respect EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  p.width = width;
  p.height = height;
  console.log(`#${p.id} -> ${p.file} (${width}x${height})`);
}

const available = photos.filter((p) => existsSync(join(PUBLIC, p.file))).map((p) => p.id);
writeFileSync(DATA, JSON.stringify(photos, null, 1) + "\n");
writeFileSync(AVAILABLE, JSON.stringify(available) + "\n");

const missing = photos.filter((p) => !available.includes(p.id)).map((p) => p.id);
console.log(`\n${available.length} of ${photos.length} photos available.`);
if (missing.length) console.log(`Missing ids: ${missing.join(", ")}`);

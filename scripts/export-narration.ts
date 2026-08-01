/**
 * Flattens the trail narration into a JSON manifest for the voiceover script.
 *
 * Run with:  node_modules/.bin/sucrase-node scripts/export-narration.ts
 *
 * The manifest is the single source of truth for what gets synthesised, so the
 * audio can always be regenerated from the copy in `yatraData.ts`.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { trails } from "../src/data/yatraData";
import type { Locale } from "../src/i18n/translations";

const LOCALES: Locale[] = ["en", "hi", "mr"];

interface Line {
  trailId: string;
  stopId: string;
  locale: Locale;
  /** Path relative to /public, which is also the URL the player requests. */
  out: string;
  text: string;
}

const lines: Line[] = [];

for (const trail of trails) {
  for (const stop of trail.stops) {
    for (const locale of LOCALES) {
      // The narrator reads the stop name first so a listener who started the
      // story from their pocket knows where they are.
      const spoken = [
        stop.name[locale],
        ...stop.chapters.map((chapter) => chapter.body[locale]),
      ].join("\n\n");

      lines.push({
        trailId: trail.id,
        stopId: stop.id,
        locale,
        out: `audio/yatra/${trail.id}/${stop.id}.${locale}.mp3`,
        text: spoken,
      });
    }
  }
}

const outDir = join(__dirname, "..", "scripts");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "narration.json");
writeFileSync(outFile, JSON.stringify({ lines }, null, 2), "utf8");

const words = lines.reduce((n, line) => n + line.text.split(/\s+/).length, 0);
console.log(`Wrote ${lines.length} lines (~${words.toLocaleString()} words) to ${outFile}`);

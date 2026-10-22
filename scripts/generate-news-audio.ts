/**
 * Pre-generates the news-anchor "Listen" audio for every news/blog post, one
 * MP3 per post and language, using Azure Speech neural voices.
 *
 * Run with:  npx tsx scripts/generate-news-audio.ts [--only slug] [--dry]
 * Needs env AZURE_SPEECH_KEY (and optionally AZURE_SPEECH_REGION, default centralindia).
 *
 * Each script is hashed; a post+language is only re-synthesised when its
 * narration text (or voice settings) changed. Output:
 *   public/audio/news/<slug>-<locale>.mp3
 *   src/data/audioManifest.json  ({ "<slug>:<locale>": { hash, file } })
 * Pages never call Azure; they only link the static files listed in the manifest.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { blogArticles, type Locale } from "../src/data/blogData";
import { narrationScript } from "../src/lib/newsNarration";

const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/audio/news");
const MANIFEST = join(ROOT, "src/data/audioManifest.json");
const FORMAT = "audio-24khz-48kbitrate-mono-mp3";
const RATE = "-5%";
const VOICES: Record<Locale, { voice: string; lang: string }> = {
  en: { voice: "en-IN-PrabhatNeural", lang: "en-IN" },
  hi: { voice: "hi-IN-MadhurNeural", lang: "hi-IN" },
  mr: { voice: "mr-IN-ManoharNeural", lang: "mr-IN" },
};
const MAX_SSML_CHARS = 4500; // keep each request comfortably under Azure's limits

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function chunks(paras: string[]): string[] {
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    if (cur && cur.length + p.length > MAX_SSML_CHARS) { out.push(cur); cur = ""; }
    cur += (cur ? "\n\n" : "") + p;
  }
  if (cur) out.push(cur);
  return out;
}

async function synth(text: string, locale: Locale, key: string, region: string): Promise<Buffer> {
  const { voice, lang } = VOICES[locale];
  const body = text
    .split(/\n\n+/)
    .map((p) => `<p>${esc(p)}</p><break time="350ms"/>`)
    .join("");
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}"><voice name="${voice}"><prosody rate="${RATE}">${body}</prosody></voice></speak>`;
  for (let attempt = 1; ; attempt++) {
    let res: Response;
    try {
      res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": FORMAT,
        "User-Agent": "thenashikkumbh-news-audio",
      },
      body: ssml,
      signal: AbortSignal.timeout(120_000),
    });
    } catch (e) {
      if (attempt < 4) { await new Promise((r) => setTimeout(r, 3000 * attempt)); continue; }
      throw e;
    }
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      continue;
    }
    throw new Error(`Azure TTS ${res.status} ${res.statusText} for ${locale}`);
  }
}

const sortKeys = <T,>(o: Record<string, T>) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined;
  const dry = args.includes("--dry");
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || "centralindia";
  if (!key && !dry) {
    console.log("AZURE_SPEECH_KEY not set: skipping audio generation (players stay hidden).");
    return;
  }
  mkdirSync(OUT_DIR, { recursive: true });
  const manifest: Record<string, { hash: string; file: string }> = existsSync(MANIFEST)
    ? JSON.parse(readFileSync(MANIFEST, "utf8"))
    : {};
  let made = 0, kept = 0;
  for (const a of blogArticles) {
    if (only && a.slug !== only) continue;
    // The three languages of a post are synthesised in parallel.
    await Promise.all(
      (["en", "hi", "mr"] as Locale[]).map(async (locale) => {
        const script = narrationScript(a, locale);
        if (!script) return;
        const hash = createHash("sha256")
          .update(JSON.stringify([VOICES[locale], RATE, FORMAT, script]))
          .digest("hex")
          .slice(0, 16);
        const id = `${a.slug}:${locale}`;
        const file = `/audio/news/${a.slug}-${locale}.mp3`;
        if (manifest[id]?.hash === hash && existsSync(join(ROOT, "public", file))) { kept++; return; }
        if (dry) { console.log(`would generate ${id} (${script.length} chars)`); return; }
        const parts: Buffer[] = [];
        for (const c of chunks(script.split(/\n\n+/))) parts.push(await synth(c, locale, key!, region));
        writeFileSync(join(ROOT, "public", file), Buffer.concat(parts));
        manifest[id] = { hash, file };
        made++;
        console.log(`generated ${id}`);
      }),
    );
    if (!dry) writeFileSync(MANIFEST, JSON.stringify(sortKeys(manifest), null, 1) + "\n");
  }
  console.log(`done: ${made} generated, ${kept} unchanged`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });

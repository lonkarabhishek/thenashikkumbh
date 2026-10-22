import type { BlogArticle, Locale } from "@/data/blogData";

/** Anchor-style opening line, written natively per language. */
const INTRO: Record<Locale, string> = {
  en: "The Nashik Kumbh. News update.",
  hi: "द नाशिक कुंभ। समाचार अपडेट।",
  mr: "द नाशिक कुंभ. बातमीपत्र.",
};
const OUTRO: Record<Locale, string> = {
  en: "That was the news from The Nashik Kumbh. For more updates, visit thenashikkumbh dot com.",
  hi: "ये थी द नाशिक कुंभ की खबर। और अपडेट के लिए thenashikkumbh डॉट कॉम देखें।",
  mr: "ही होती द नाशिक कुंभची बातमी. अधिक अपडेटसाठी thenashikkumbh डॉट कॉम पाहा.",
};

const SOURCE_HEADING = /^(sources?|references?|स्रोत|संदर्भ|सूत्र)\b/i;

/** Turns the light-markup body into clean spoken paragraphs. */
export function cleanBody(md: string, locale: Locale): string[] {
  const stop = locale === "hi" ? "।" : ".";
  const out: string[] = [];
  let skip = false;
  let inCode = false;
  for (const block of md.split(/\n\s*\n/)) {
    const lines = block.split("\n");
    const spoken: string[] = [];
    for (let raw of lines) {
      if (/^\s*```/.test(raw)) { inCode = !inCode; continue; }
      if (inCode) continue;
      raw = raw.trim();
      if (!raw) continue;
      if (/^\|/.test(raw)) continue; // tables
      const h = raw.match(/^#{1,6}\s+(.*)$/);
      if (h) {
        skip = SOURCE_HEADING.test(h[1].trim());
        if (!skip) spoken.push(h[1].replace(/[.:]?$/, "."));
        continue;
      }
      if (skip) continue;
      let s = raw.replace(/^[-*]\s+/, "").replace(/^\d+[.)]\s+/, "");
      s = s
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/[*_`>#]/g, "")
        .replace(/\s*[([{][^)\]}]*[)\]}]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!s) continue;
      if (!/[.!?।:;]$/.test(s)) s += stop;
      spoken.push(s);
    }
    if (spoken.length) out.push(spoken.join(" "));
  }
  return out;
}


/** Full bulletin script: intro, headline, body, outro. Paragraphs are blank-line separated. */
export function narrationScript(a: BlogArticle, locale: Locale): string {
  const body = a.content[locale];
  const title = a.title[locale];
  if (!body || !title) return "";
  const stop = locale === "hi" ? "।" : ".";
  return [INTRO[locale], title.replace(/[.!?।]?$/, stop), ...cleanBody(body, locale), OUTRO[locale]].join("\n\n");
}

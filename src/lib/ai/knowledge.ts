import type { Locale } from "@/i18n/translations";
import {
  announced,
  awaiting,
  helplines,
  majorMelaPeriod,
  offices,
  schedule,
  scheduleUpdated,
} from "@/data/verified";
import { chatTopics } from "@/data/chatbotKnowledgeBase";
import { blogArticles } from "@/data/blogData";
import { newsStatus } from "@/components/blog/newsMeta";
import { formatDate, formatTime } from "@/lib/dates";
import type { InfoPageContent } from "@/content/pages/types";
import { page as dhwajarohan } from "@/content/pages/dhwajarohan-2026";
import { page as trimbak } from "@/content/pages/trimbakeshwar-kumbh-2027";
import { page as howToReach } from "@/content/pages/how-to-reach";
import { page as accommodation } from "@/content/pages/accommodation";
import { page as parva } from "@/content/pages/parva-snan-calendar";

/**
 * What the AI assistant is allowed to know, and how much of it one question
 * gets to see.
 *
 * Everything comes from the same sources the site renders (the verified
 * registry, the guide topics, the long-form pages and the sourced news), so
 * the assistant can never know more than the site says.
 *
 * The budget for this feature is tiny (about 200 rupees a month), so instead
 * of sending the whole site on every request (17k to 33k tokens) we send a
 * small core of facts that must never be wrong plus the handful of passages
 * that match the question, about 2k to 3k tokens in all.
 */

const INFO_PAGES: InfoPageContent[] = [dhwajarohan, trimbak, howToReach, accommodation, parva];

/** Strip the light markup so the context is plain text (links become "text (path)"). */
function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => `${label} (${href})`)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^#{2,3} /gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ------------------------------------------------------------------ */
/* Core facts: always sent. Dates and helplines must never be guessed. */
/* ------------------------------------------------------------------ */

const cores = new Map<Locale, string>();

export function coreFacts(locale: Locale): string {
  const cached = cores.get(locale);
  if (cached) return cached;

  const rows = schedule.map((e) => {
    const parts = [
      formatDate(e.isoDate, locale, { weekday: true }),
      e.startTime ? formatTime(e.startTime, locale) : null,
      e.name[locale],
      e.location[locale],
      e.tithi ? e.tithi[locale] : null,
      e.isAmritSnan ? "AMRIT SNAN" : null,
      e.status !== "official" ? `status: ${e.status}` : null,
    ].filter(Boolean);
    return `- ${parts.join(" | ")}`;
  });

  const lines = helplines.map(
    (h) => `- ${h.number}: ${h.label[locale]} (${h.jurisdiction[locale]}${h.supportedHours ? `; ${h.supportedHours[locale]}` : ""})`
  );
  const ntkma = offices.find((o) => o.id === "ntkma");

  const text = [
    `## Schedule (verified ${scheduleUpdated}; source: NTKMA Kumbh Mela Plan and the 1 June 2025 DGIPR announcement)`,
    ...rows,
    `- Major Mela Period: ${formatDate(majorMelaPeriod.startIso, locale)} to ${formatDate(majorMelaPeriod.endIso, locale)} (${majorMelaPeriod.days} days).`,
    "- Shahi Snan is officially called Amrit Snan since 1 June 2025. Same royal bath.",
    "## Helplines",
    ...lines,
    ntkma ? `- NTKMA office: ${ntkma.phone}, ${ntkma.email}` : "",
    "## Site pages (link as /path, no language prefix)",
    "- /dates (key dates), /parva-snan-calendar (every bathing day), /dhwajarohan-2026, /trimbakeshwar-kumbh-2027, /how-to-reach, /accommodation, /guide (what to carry, dos and don'ts), /ghats, /events, /blog (news), /gallery, /emergency, /naga-sadhus, /about",
  ]
    .filter(Boolean)
    .join("\n");
  cores.set(locale, text);
  return text;
}

/* ------------------------------------------------------------- */
/* Passages: one per topic, page section, news post, plan entry. */
/* ------------------------------------------------------------- */

interface Passage {
  id: string;
  /** Short title, weighted higher when matching. */
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  /** Extra line appended as-is (status, page path). */
  meta: string;
}

const L: Locale[] = ["en", "hi", "mr"];
const byLocale = (f: (l: Locale) => string): Record<Locale, string> =>
  Object.fromEntries(L.map((l) => [l, f(l)])) as Record<Locale, string>;

let passages: Passage[] | null = null;

function buildPassages(): Passage[] {
  const out: Passage[] = [];

  for (const t of chatTopics) {
    out.push({
      id: `topic:${t.id}`,
      title: byLocale((l) => t.question[l]),
      body: byLocale((l) => t.answer[l]),
      meta: [`status: ${t.status ?? "general_guidance"}`, t.pageLink ? `page: ${t.pageLink}` : null].filter(Boolean).join("; "),
    });
  }

  for (const p of INFO_PAGES) {
    out.push({
      id: `page:${p.path}:intro`,
      title: byLocale((l) => p.h1[l]),
      body: byLocale((l) => plain(p.intro[l])),
      meta: `page: ${p.path}; updated ${p.updated}`,
    });
    p.sections.forEach((s, i) =>
      out.push({
        id: `page:${p.path}:${i}`,
        title: byLocale((l) => `${p.h1[l]}: ${s.heading[l]}`),
        body: byLocale((l) => plain(s.body[l])),
        meta: `page: ${p.path}; updated ${p.updated}`,
      })
    );
  }

  for (const a of blogArticles) {
    const status = newsStatus(a);
    if (!status) continue; // unsourced legacy posts stay out of the assistant
    const pubs = Array.from(new Set((a.sources ?? []).map((s) => s.publisher))).join(", ");
    out.push({
      id: `news:${a.slug}`,
      title: byLocale((l) => a.title[l]),
      body: byLocale((l) => `${formatDate(a.date, l)}. ${a.summary[l]}`),
      meta: `${status === "confirmed" ? "CONFIRMED" : "REPORTED by media, not officially confirmed"}; sources: ${pubs}; page: /blog/${a.slug}`,
    });
  }

  for (const x of announced) {
    out.push({
      id: `announced:${x.id}`,
      title: byLocale((l) => x.topic[l]),
      body: byLocale((l) => x.summary[l]),
      meta: `ANNOUNCED plan, details may change; source: ${x.sourceLabel}; page: ${x.more}`,
    });
  }

  for (const x of awaiting) {
    out.push({
      id: `awaiting:${x.id}`,
      title: byLocale((l) => x.topic[l]),
      body: byLocale((l) => `Not published yet. Expected from ${x.expectedFrom[l]}.`),
      meta: "NOT YET ANNOUNCED: say so and point to NTKMA",
    });
  }

  return out;
}

/* ------------------------------------------------------- */
/* Retrieval: word overlap, with English matched as well.  */
/* ------------------------------------------------------- */

// The tsconfig target rejects the /u literal, so build it.
const NON_WORD = new RegExp("[^\\p{L}\\p{M}\\p{N}]+", "u");
const STOP = new Set([
  "the", "and", "for", "are", "was", "with", "from", "this", "that", "what", "when", "where", "which", "who", "how",
  "why", "will", "can", "about", "there", "their", "they", "them", "into", "more", "than", "then", "also", "been",
  "does", "did", "any", "all", "its", "our", "your", "you", "tell", "know", "need", "please", "much", "many",
  "kumbh", "mela", "nashik", "simhastha", "2026", "2027", "कुंभ", "मेला", "मेळा", "नाशिक", "सिंहस्थ", "कुंभमेळा",
  "के", "की", "का", "को", "में", "से", "पर", "और", "है", "हैं", "क्या", "कब", "कहाँ", "कहां", "कैसे", "लिए",
  "आणि", "आहे", "आहेत", "काय", "कधी", "कुठे", "कसे", "साठी", "च्या", "ची", "चा", "चे", "मध्ये", "वर",
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(NON_WORD)
    .filter((t) => t.length >= 3 && !STOP.has(t));
}

function hit(q: string, words: Set<string>, list: string[]): boolean {
  if (words.has(q)) return true;
  if (q.length < 4) return false;
  return list.some((w) => w.startsWith(q) || (w.length >= 4 && q.startsWith(w)));
}

interface Indexed {
  p: Passage;
  title: Set<string>;
  body: Set<string>;
  titleList: string[];
  bodyList: string[];
}

const index = new Map<Locale, Indexed[]>();

function indexed(locale: Locale): Indexed[] {
  const cached = index.get(locale);
  if (cached) return cached;
  passages ??= buildPassages();
  const built = passages.map((p) => {
    const t = tokens(`${p.title[locale]} ${locale === "en" ? "" : p.title.en}`);
    const b = tokens(`${p.body[locale]} ${locale === "en" ? "" : p.body.en}`);
    return { p, title: new Set(t), body: new Set(b), titleList: t, bodyList: b };
  });
  index.set(locale, built);
  return built;
}

/** Rough token count: Devanagari runs about 1.6 characters per token. */
export function roughTokens(text: string): number {
  const deva = (text.match(/[ऀ-ॿ]/g) ?? []).length;
  return Math.round((text.length - deva) / 4 + deva / 1.6);
}

/**
 * The passages most relevant to the question (and, for follow-ups, the
 * previous question), within a token budget. Returns "" when nothing
 * matches, in which case the model has only the core facts and must say
 * the site does not cover it.
 */
export function retrieve(locale: Locale, question: string, previous = "", budgetTokens = 2200): string {
  const q = Array.from(new Set(tokens(question)));
  const prev = Array.from(new Set(tokens(previous))).filter((t) => !q.includes(t));
  if (q.length + prev.length === 0) return "";

  const scored = indexed(locale)
    .map((x) => {
      let score = 0;
      for (const w of q) {
        if (hit(w, x.title, x.titleList)) score += 3;
        else if (hit(w, x.body, x.bodyList)) score += 1;
      }
      for (const w of prev) {
        if (hit(w, x.title, x.titleList)) score += 1;
        else if (hit(w, x.body, x.bodyList)) score += 0.5;
      }
      return { x, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked: string[] = [];
  let used = 0;
  for (const { x } of scored) {
    const text = `### ${x.p.title[locale]}\n${x.p.body[locale]}\n(${x.p.meta})`;
    const cost = roughTokens(text);
    if (used + cost > budgetTokens) {
      if (picked.length === 0) {
        // The best match is long (a page section); send a trimmed version rather than nothing.
        picked.push(text.slice(0, Math.max(400, Math.round(text.length * (budgetTokens / cost)))));
        used = budgetTokens;
      }
      continue;
    }
    picked.push(text);
    used += cost;
    if (picked.length >= 8) break;
  }
  return picked.join("\n\n");
}

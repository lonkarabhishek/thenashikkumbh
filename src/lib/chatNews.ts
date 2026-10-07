import type { Locale } from "@/i18n/translations";
import type { L10n } from "@/data/verified";

/** One entry of /chat-news.json (built in src/app/chat-news.json/route.ts). */
export interface ChatNewsItem {
  slug: string;
  date: string;
  updated?: string;
  title: L10n;
  summary: L10n;
  /** At least one source is only "reported", not confirmed. */
  reported: boolean;
  source: { publisher: string; url: string };
}

let cache: Promise<ChatNewsItem[]> | null = null;

/** Loads the news index once. Resolves to [] when offline or on error. */
export function loadChatNews(): Promise<ChatNewsItem[]> {
  if (!cache) {
    cache = fetch("/chat-news.json")
      .then((r) => (r.ok ? (r.json() as Promise<ChatNewsItem[]>) : []))
      .catch(() => {
        cache = null; // try again next time
        return [];
      });
  }
  return cache;
}

/** Words that ask for news rather than for general guidance. */
const NEWS_INTENT: Record<Locale, string[]> = {
  en: ["news", "latest", "update", "updates", "headline", "headlines", "what's new", "whats new", "recent", "announced", "announcement"],
  hi: ["समाचार", "खबर", "ख़बर", "खबरें", "ताज़ा", "ताजा", "अपडेट", "नया क्या", "घोषणा"],
  mr: ["बातमी", "बातम्या", "ताज्या", "ताजी", "अपडेट", "नवीन काय", "घोषणा"],
};

function intentWords(locale: Locale): string[] {
  return locale === "en" ? NEWS_INTENT.en : [...NEWS_INTENT[locale], ...NEWS_INTENT.en];
}

export function hasNewsIntent(normalized: string, locale: Locale): boolean {
  return intentWords(locale).some((w) => normalized.includes(w));
}

/** The question without its "news"/"what's new" words, for searching posts. */
export function stripNewsIntent(normalized: string, locale: Locale): string {
  return intentWords(locale)
    .sort((a, b) => b.length - a.length)
    .reduce((s, w) => s.split(w).join(" "), normalized);
}

/**
 * Words too common on this site to tell one story from another, plus plain
 * grammar words. Matching on these would make every post look relevant.
 */
const STOP = new Set([
  // English
  "the", "and", "for", "are", "was", "were", "has", "have", "had", "with", "from", "this", "that",
  "what", "when", "where", "which", "who", "how", "why", "will", "would", "can", "could", "about",
  "there", "their", "they", "them", "into", "more", "than", "then", "also", "been", "being", "does",
  "did", "any", "all", "its", "our", "your", "you", "tell", "know", "need", "please", "much", "many",
  "news", "latest", "update", "updates", "recent", "headline", "headlines", "whats", "announced",
  "kumbh", "mela", "nashik", "simhastha", "2026", "2027", "2028", "crore", "lakh", "plan", "plans",
  // Hindi
  "के", "की", "का", "को", "में", "से", "पर", "और", "है", "हैं", "था", "थी", "क्या", "कब", "कहाँ",
  "कहां", "कैसे", "लिए", "तक", "भी", "यह", "वह", "कुंभ", "मेला", "नाशिक", "सिंहस्थ", "करोड़",
  "लाख", "योजना", "समाचार", "खबर", "ख़बर", "ताज़ा", "ताजा", "अपडेट", "नया", "नई", "बारे",
  // Marathi
  "आणि", "आहे", "आहेत", "होते", "काय", "कधी", "कुठे", "कसे", "साठी", "च्या", "ची", "चा", "चे",
  "मध्ये", "वर", "पर्यंत", "हे", "ही", "तो", "ती", "कुंभमेळा", "कुंभमेळ्याचे", "कुंभमेळ्यासाठी",
  "मेळा", "कोटी", "आराखडा", "बातमी", "बातम्या", "ताज्या", "नवीन", "बद्दल",
]);

// Built with the constructor: the tsconfig target rejects the /u literal.
const NON_WORD = new RegExp("[^\\p{L}\\p{M}\\p{N}]+", "u");

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(NON_WORD)
    .filter((t) => t.length >= 3 && !STOP.has(t));
}

/** Prefix match so "ghats" finds "ghat" and "रिंग रोडचे" finds "रोड". */
function matches(q: string, words: string[]): boolean {
  return words.some((w) => w === q || (q.length >= 4 && w.startsWith(q)) || (w.length >= 4 && q.startsWith(w)));
}

export interface ScoredNews {
  item: ChatNewsItem;
  score: number;
}

/**
 * Scores every post against the question: a word found in the title counts
 * 2, in the summary 1. English words are also checked against the English
 * copy, since people often mix English names into Hindi or Marathi.
 * Ties go to the newer post, so an update beats the story it replaces.
 */
export function searchNews(normalized: string, locale: Locale, items: ChatNewsItem[]): ScoredNews[] {
  const query = Array.from(new Set(tokens(normalized)));
  if (query.length === 0) return [];

  return items
    .map((item) => {
      const title = tokens(item.title[locale] + (locale === "en" ? "" : " " + item.title.en));
      const summary = tokens(item.summary[locale] + (locale === "en" ? "" : " " + item.summary.en));
      let score = 0;
      for (const q of query) {
        if (matches(q, title)) score += 2;
        else if (matches(q, summary)) score += 1;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date));
}

/** Newest first. */
export function latestNews(items: ChatNewsItem[], count: number): ChatNewsItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

import type { Locale } from "@/i18n/translations";
import { chatTopics, ChatTopic } from "@/data/chatbotKnowledgeBase";
import { chatbotUI } from "@/i18n/chatbotTranslations";
import type { InformationStatus, L10n } from "@/data/verified";
import { formatDate } from "@/lib/dates";
import {
  hasNewsIntent,
  stripNewsIntent,
  latestNews,
  loadChatNews,
  searchNews,
  type ChatNewsItem,
} from "@/lib/chatNews";

/**
 * Chatbot retrieval.
 *
 * Two rules the engine now enforces:
 *
 *  1. Every response carries provenance, status, sourceOrganisation,
 *     sourceUrl, verifiedAt, surfaced by the UI below the answer. If a topic
 *     has no source, it is served as `general_guidance` and the UI says so.
 *
 *  2. Safety-critical queries with no confident topic match are refused
 *     honestly instead of falling through to the generic fallback. The list
 *     of safety triggers is deliberately conservative, matching a trigger
 *     means we would rather say "we don't know" than surface a low-score
 *     topic that only tangentially answered the question.
 */

interface MatchResult {
  topic: ChatTopic;
  score: number;
}

/** Chat-only labels for answers taken from a news post. */
export type NewsStatus = "news_confirmed" | "news_reported";

export interface ChatLink {
  href: string;
  label: string;
  /** Small text after the label, e.g. the post date. */
  meta?: string;
}

export interface ChatResponse {
  answer: string;
  topicId: string;
  relatedTopics: string[];
  pageLink?: string;
  /** Extra links shown as a list under the answer (news headlines). */
  links?: ChatLink[];
  /** Label above `links`. */
  linksTitle?: string;
  emoji?: string;
  image?: string;
  provenance?: {
    status: InformationStatus | NewsStatus;
    sourceOrganisation?: string;
    sourceUrl?: string;
    verifiedAt?: string;
    publishedAt?: string;
  };
}

/** Topic id the "Latest news" chip and quick reply use. */
export const NEWS_TOPIC_ID = "latest-news";

/**
 * A guide topic scoring this much (one whole keyword) answers ahead of news.
 * Below it, a news post with at least NEWS_ANSWER answers instead.
 */
const TOPIC_SOLID = 3;
/** One title word. */
const NEWS_ANSWER = 2;
/** A news post scoring this much is offered as "related news" under a guide answer. */
const NEWS_RELATED = 3;

/**
 * Words on nearly every page ("kumbh", "nashik"). Left in, "kumbh budget"
 * scores as "What is Kumbh Mela?". Topics are scored without them first,
 * and with them only when nothing else matched.
 */
const GENERIC = /\b(kumbh|mela|nashik|simhastha)\b|कुंभमेळ्या\S*|कुंभमेळा|कुंभ|मेला|मेळा|नाशिक|सिंहस्थ/g;

const NEWS_COPY = {
  latestIntro: {
    en: "Here are the latest Kumbh news stories from our desk. Each one links to its sources.",
    hi: "हमारे डेस्क से कुंभ की ताज़ा खबरें। हर खबर में उसके स्रोत दिए गए हैं।",
    mr: "आमच्या डेस्ककडून कुंभमेळ्याच्या ताज्या बातम्या. प्रत्येक बातमीत तिचे स्रोत दिले आहेत.",
  },
  latestTitle: { en: "Latest news", hi: "ताज़ा खबरें", mr: "ताज्या बातम्या" },
  relatedTitle: { en: "Related news", hi: "संबंधित खबर", mr: "संबंधित बातमी" },
  allNews: { en: "All news", hi: "सभी खबरें", mr: "सर्व बातम्या" },
  readStory: { en: "Read the full story", hi: "पूरी खबर पढ़ें", mr: "संपूर्ण बातमी वाचा" },
  reportedNote: {
    en: "Some details here are reported by the press and not yet confirmed officially.",
    hi: "इसमें कुछ बातें मीडिया में रिपोर्ट हुई हैं, अभी आधिकारिक पुष्टि नहीं हुई है।",
    mr: "यातील काही तपशील माध्यमांत आलेले आहेत, त्यांची अधिकृत पुष्टी अजून झालेली नाही.",
  },
  offline: {
    en: "I could not load the news right now. Please open our news page for the latest stories.",
    hi: "अभी खबरें लोड नहीं हो सकीं। ताज़ा खबरों के लिए हमारा समाचार पेज खोलें।",
    mr: "आत्ता बातम्या लोड होऊ शकल्या नाहीत. ताज्या बातम्यांसाठी आमचे बातम्यांचे पान उघडा.",
  },
} satisfies Record<string, L10n>;

function newsLink(item: ChatNewsItem, locale: Locale): ChatLink {
  return {
    href: `/blog/${item.slug}`,
    label: item.title[locale],
    meta: formatDate(item.date, locale, { short: true }),
  };
}

/** Answer built from one news post: its summary, sources and a link. */
function respondFromNews(item: ChatNewsItem, others: ChatNewsItem[], locale: Locale): ChatResponse {
  const answer = item.reported
    ? `${item.summary[locale]}\n\n${NEWS_COPY.reportedNote[locale]}`
    : item.summary[locale];
  return {
    answer,
    topicId: `news:${item.slug}`,
    relatedTopics: [NEWS_TOPIC_ID],
    links: [
      { href: `/blog/${item.slug}`, label: NEWS_COPY.readStory[locale] },
      ...others.map((o) => newsLink(o, locale)),
    ],
    linksTitle: item.title[locale],
    provenance: {
      status: item.reported ? "news_reported" : "news_confirmed",
      sourceOrganisation: item.source.publisher,
      sourceUrl: item.source.url,
      publishedAt: item.updated ?? item.date,
    },
  };
}

/** The newest headlines, for "latest news" and the chip. */
export async function getLatestNews(locale: Locale): Promise<ChatResponse> {
  const items = await loadChatNews();
  if (items.length === 0) {
    return {
      answer: NEWS_COPY.offline[locale],
      topicId: NEWS_TOPIC_ID,
      relatedTopics: ["kumbh-dates"],
      pageLink: "/blog",
    };
  }
  return {
    answer: NEWS_COPY.latestIntro[locale],
    topicId: NEWS_TOPIC_ID,
    relatedTopics: ["kumbh-dates", "how-to-reach"],
    links: [
      ...latestNews(items, 5).map((i) => newsLink(i, locale)),
      { href: "/blog", label: NEWS_COPY.allNews[locale] },
    ],
    linksTitle: NEWS_COPY.latestTitle[locale],
  };
}

/** Words that make a query safety-critical. Deliberately broad; a match here
 *  raises the bar for what counts as a confident answer. */
const SAFETY_KEYWORDS: Record<Locale, string[]> = {
  en: [
    "emergency", "sos", "ambulance", "police", "hospital", "medical",
    "control room", "helpline", "helpline number", "special train",
    "train times", "shuttle", "road closed", "route", "exit", "evacuation",
    "crowd", "stampede", "lost", "missing", "child missing", "meeting point",
    "weather warning", "flood", "rain warning", "network", "signal",
    "best time", "arrive by", "safe time", "verified", "registered",
    "official contact", "free stay", "free accommodation", "government",
  ],
  hi: [
    "आपात", "एम्बुलेंस", "पुलिस", "अस्पताल", "चिकित्सा", "हेल्पलाइन",
    "कंट्रोल रूम", "विशेष ट्रेन", "शटल", "मार्ग बंद", "निकास", "भीड़",
    "खो", "गुम", "बच्चा गुम", "बाढ़", "नेटवर्क", "सिग्नल", "आधिकारिक",
  ],
  mr: [
    "आपत्कालीन", "रुग्णवाहिका", "पोलिस", "रुग्णालय", "वैद्यकीय",
    "हेल्पलाइन", "नियंत्रण कक्ष", "विशेष रेल्वे", "शटल", "मार्ग बंद",
    "निर्गम", "गर्दी", "हरवले", "मुल हरवले", "पूर", "नेटवर्क",
    "अधिकृत",
  ],
};

/** A confident match needs at least this score. */
const CONFIDENT_MATCH = 4;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function calculateScore(input: string, topic: ChatTopic, locale: Locale): number {
  let score = 0;
  const keywords = topic.keywords[locale];
  const allKeywords =
    locale === "en" ? keywords : [...keywords, ...topic.keywords.en];

  for (const keyword of allKeywords) {
    const kw = keyword.toLowerCase();
    if (input.includes(kw)) {
      // \b only knows ASCII letters, so a Devanagari keyword never passed
      // the whole-word test and scored like a partial match.
      if (/[^\x00-\x7f]/.test(kw)) {
        score += 3;
        continue;
      }
      try {
        const re = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
        score += re.test(input) ? 3 : 1;
      } catch {
        score += 1;
      }
    }
  }

  const idWords = topic.id.split("-");
  for (const w of idWords) {
    if (w.length > 2 && input.includes(w)) score += 1;
  }
  return score;
}

function isSafetyCritical(normalized: string, locale: Locale): boolean {
  const triggers = SAFETY_KEYWORDS[locale] ?? SAFETY_KEYWORDS.en;
  const all = locale === "en" ? triggers : [...triggers, ...SAFETY_KEYWORDS.en];
  return all.some((k) => normalized.includes(k.toLowerCase()));
}

const REFUSAL: L10n = {
  en: "I do not have confirmed information about this yet. Please check the official notices from NTKMA (0253-2461909, kumbhmela.2027@mah.gov.in) or try again after the authority publishes the details. For any real emergency, dial 112.",
  hi: "मुझे इसके बारे में अभी पुष्ट जानकारी नहीं है। कृपया NTKMA (0253-2461909, kumbhmela.2027@mah.gov.in) की आधिकारिक सूचनाएँ देखें या प्राधिकरण के विवरण प्रकाशित करने के बाद पुनः प्रयास करें। किसी भी वास्तविक आपात स्थिति में 112 डायल करें।",
  mr: "मला याबद्दल अजून पुष्ट माहिती नाही. कृपया NTKMA (0253-2461909, kumbhmela.2027@mah.gov.in) च्या अधिकृत सूचना पहा किंवा प्राधिकरणाने तपशील प्रकाशित केल्यानंतर पुन्हा प्रयत्न करा. कोणत्याही खऱ्या आपत्कालीन परिस्थितीत ११२ डायल करा.",
};

function respondFrom(topic: ChatTopic, locale: Locale): ChatResponse {
  return {
    answer: topic.answer[locale],
    topicId: topic.id,
    relatedTopics: topic.relatedTopics,
    pageLink: topic.pageLink,
    emoji: topic.emoji,
    image: topic.image,
    provenance: {
      status: topic.status ?? "general_guidance",
      sourceOrganisation: topic.sourceOrganisation,
      sourceUrl: topic.sourceUrl,
      verifiedAt: topic.verifiedAt,
    },
  };
}

export async function getResponse(
  userMessage: string,
  locale: Locale
): Promise<ChatResponse> {
  const normalized = userMessage.toLowerCase().trim();
  const scoreAll = (input: string): MatchResult[] =>
    chatTopics
      .map((topic) => ({ topic, score: calculateScore(input, topic, locale) }))
      .sort((a, b) => b.score - a.score);
  const specific = normalized.replace(GENERIC, " ").replace(/\s+/g, " ").trim();
  let scored = scoreAll(specific);
  // Matched only on "kumbh"/"nashik": usable as a last resort, never solid.
  const genericOnly = !scored[0] || scored[0].score === 0;
  if (genericOnly) scored = scoreAll(normalized);

  const best = scored[0];
  const safety = isSafetyCritical(normalized, locale);
  const topicConfident = !genericOnly && !!best && best.score >= CONFIDENT_MATCH;

  // News: asked for directly ("latest news", "ring road update"), or the
  // guide has no good answer but a sourced post does.
  const wantsNews = hasNewsIntent(normalized, locale);
  const news = searchNews(stripNewsIntent(normalized, locale), locale, await loadChatNews());
  const topNews = news[0];

  if (wantsNews) {
    if (topNews && topNews.score >= 2) {
      const others = news.slice(1, 3).filter((n) => n.score >= 2).map((n) => n.item);
      return respondFromNews(topNews.item, others, locale);
    }
    return getLatestNews(locale);
  }
  // A safety question needs a closer news match (title word + summary word),
  // so "which ghat is less crowded?" is not answered with a budget story.
  const newsBar = safety ? NEWS_RELATED : NEWS_ANSWER;
  const topicSolid = !genericOnly && !!best && best.score >= TOPIC_SOLID;
  if ((!topicSolid || (safety && !topicConfident)) && topNews && topNews.score >= newsBar) {
    const others = news.slice(1, 3).filter((n) => n.score >= newsBar).map((n) => n.item);
    return respondFromNews(topNews.item, others, locale);
  }

  // Safety-critical queries need a confident match. A low-score guess would
  // be worse than an honest "I don't know" here.
  if (safety && !topicConfident) {
    return {
      answer: REFUSAL[locale],
      topicId: "safety-refusal",
      relatedTopics: ["emergency"],
      provenance: {
        status: "awaiting_confirmation",
        sourceOrganisation: "Registry policy",
      },
    };
  }

  if (best && best.score > 0) {
    const response = respondFrom(best.topic, locale);
    if (topNews && topNews.score >= NEWS_RELATED) {
      response.links = [newsLink(topNews.item, locale)];
      response.linksTitle = NEWS_COPY.relatedTitle[locale];
    }
    return response;
  }

  return {
    answer: chatbotUI.fallback[locale],
    topicId: "fallback",
    relatedTopics: ["kumbh-dates", NEWS_TOPIC_ID, "how-to-reach"],
    provenance: { status: "general_guidance" },
  };
}

/** Direct topic fetch for chip clicks; still surfaces provenance. */
export function getTopicById(
  topicId: string,
  locale: Locale
): ChatResponse | null {
  const topic = chatTopics.find((t) => t.id === topicId);
  if (!topic) return null;
  return respondFrom(topic, locale);
}

/** Adversarial regression suite. Every question either returns a claim with
 *  provenance (status !== awaiting_confirmation) or is refused. Used by the
 *  Phase 14 test runner. */
export const adversarialProbes: { locale: Locale; q: string }[] = [
  { locale: "en", q: "Which ghat is less crowded?" },
  { locale: "en", q: "What time should I arrive?" },
  { locale: "en", q: "Where is the nearest safe exit?" },
  { locale: "en", q: "Is registration open?" },
  { locale: "en", q: "Where can I stay for free?" },
  { locale: "en", q: "Which network works best?" },
  { locale: "en", q: "Are special trains running?" },
  { locale: "en", q: "What is the Kumbh control-room number?" },
  { locale: "en", q: "Can I walk into an akhada and stay there?" },
  { locale: "en", q: "Which road will be open on the main bathing day?" },
];

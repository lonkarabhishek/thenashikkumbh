import type { Locale } from "@/i18n/translations";
import { chatTopics, ChatTopic } from "@/data/chatbotKnowledgeBase";
import { chatbotUI } from "@/i18n/chatbotTranslations";
import type { InformationStatus, L10n } from "@/data/verified";

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

export interface ChatResponse {
  answer: string;
  topicId: string;
  relatedTopics: string[];
  pageLink?: string;
  emoji?: string;
  image?: string;
  provenance?: {
    status: InformationStatus;
    sourceOrganisation?: string;
    sourceUrl?: string;
    verifiedAt?: string;
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
  const scored: MatchResult[] = chatTopics.map((topic) => ({
    topic,
    score: calculateScore(normalized, topic, locale),
  }));
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  const safety = isSafetyCritical(normalized, locale);

  // Safety-critical queries need a confident match. A low-score guess would
  // be worse than an honest "I don't know" here.
  if (safety && (!best || best.score < CONFIDENT_MATCH)) {
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
    return respondFrom(best.topic, locale);
  }

  return {
    answer: chatbotUI.fallback[locale],
    topicId: "fallback",
    relatedTopics: ["kumbh-dates", "how-to-reach", "sacred-ghats"],
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

import type { Locale } from "@/i18n/translations";
import { chatTopics, ChatTopic } from "@/data/chatbotKnowledgeBase";
import { chatbotUI } from "@/i18n/chatbotTranslations";

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
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function calculateScore(
  input: string,
  topic: ChatTopic,
  locale: Locale
): number {
  let score = 0;
  const keywords = topic.keywords[locale];
  // Always check English keywords too (many users type in English regardless of locale)
  const allKeywords =
    locale === "en" ? keywords : [...keywords, ...topic.keywords.en];

  for (const keyword of allKeywords) {
    const kw = keyword.toLowerCase();
    if (input.includes(kw)) {
      // Full word match scores higher than substring
      try {
        const re = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
        score += re.test(input) ? 3 : 1;
      } catch {
        score += 1;
      }
    }
  }

  // Small bonus if topic id words appear in input
  const idWords = topic.id.split("-");
  for (const w of idWords) {
    if (w.length > 2 && input.includes(w)) score += 1;
  }

  return score;
}

// Main response function - async by design for future AI API swap
export async function getResponse(
  userMessage: string,
  locale: Locale
): Promise<ChatResponse> {
  const normalized = userMessage.toLowerCase().trim();

  // Score all topics
  const scored: MatchResult[] = chatTopics.map((topic) => ({
    topic,
    score: calculateScore(normalized, topic, locale),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // If best score > 0, return that topic
  if (scored[0].score > 0) {
    const best = scored[0].topic;
    return {
      answer: best.answer[locale],
      topicId: best.id,
      relatedTopics: best.relatedTopics,
      pageLink: best.pageLink,
      emoji: best.emoji,
      image: best.image,
    };
  }

  // Fallback
  return {
    answer: chatbotUI.fallback[locale],
    topicId: "fallback",
    relatedTopics: ["kumbh-dates", "how-to-reach", "sacred-ghats"],
    emoji: undefined,
  };
}

// Get a topic by ID (for quick-reply chip clicks)
export function getTopicById(
  topicId: string,
  locale: Locale
): ChatResponse | null {
  const topic = chatTopics.find((t) => t.id === topicId);
  if (!topic) return null;
  return {
    answer: topic.answer[locale],
    topicId: topic.id,
    relatedTopics: topic.relatedTopics,
    pageLink: topic.pageLink,
    emoji: topic.emoji,
    image: topic.image,
  };
}

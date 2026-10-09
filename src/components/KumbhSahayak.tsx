"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@/components/LocaleLink";
import { ArrowRight, Newspaper, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { chatbotUI } from "@/i18n/chatbotTranslations";
import { quickStartChips, chatTopics } from "@/data/chatbotKnowledgeBase";
import {
  getLatestNews,
  getResponse,
  getTopicById,
  NEWS_TOPIC_ID,
  type ChatLink,
  type ChatResponse,
} from "@/lib/chatbotEngine";
import { formatDate } from "@/lib/dates";
import { askAi } from "@/lib/sahayakClient";
import RichText from "@/components/RichText";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
  pageLink?: string;
  links?: ChatLink[];
  linksTitle?: string;
  image?: string;
  provenance?: ChatResponse["provenance"];
}

function toMessage(response: ChatResponse): ChatMessage {
  return {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: response.answer,
    quickReplies: response.relatedTopics,
    pageLink: response.pageLink,
    links: response.links,
    linksTitle: response.linksTitle,
    image: response.image,
    provenance: response.provenance,
  };
}

/** Label for a quick-reply chip: a guide topic's question, or "Latest news". */
function chipLabel(topicId: string, locale: "en" | "hi" | "mr"): string | null {
  const chip = quickStartChips.find((c) => c.topicId === topicId);
  if (topicId === NEWS_TOPIC_ID && chip) return chip.label[locale];
  return chatTopics.find((t) => t.id === topicId)?.question[locale] ?? null;
}

const STATUS_LABEL: Record<string, { en: string; hi: string; mr: string }> = {
  official: { en: "Official", hi: "आधिकारिक", mr: "अधिकृत" },
  provisional: { en: "Provisional", hi: "अस्थायी", mr: "तात्पुरते" },
  historical: { en: "Historical", hi: "ऐतिहासिक", mr: "ऐतिहासिक" },
  general_guidance: { en: "General guidance", hi: "सामान्य मार्गदर्शन", mr: "सामान्य मार्गदर्शन" },
  religious_tradition: { en: "Religious tradition", hi: "धार्मिक परंपरा", mr: "धार्मिक परंपरा" },
  awaiting_confirmation: { en: "Awaiting confirmation", hi: "पुष्टि की प्रतीक्षा", mr: "पुष्टीच्या प्रतीक्षेत" },
  unverified: { en: "Unverified", hi: "असत्यापित", mr: "असत्यापित" },
  news_confirmed: { en: "News: confirmed", hi: "खबर: पुष्ट", mr: "बातमी: पुष्ट" },
  news_reported: { en: "News: partly reported", hi: "खबर: कुछ बातें रिपोर्टेड", mr: "बातमी: काही तपशील माध्यमांतील" },
  ai_grounded: { en: "AI answer from site content", hi: "साइट की सामग्री से AI उत्तर", mr: "साइटवरील माहितीतून AI उत्तर" },
  commercial: { en: "Commercial", hi: "व्यावसायिक", mr: "व्यावसायिक" },
};

export default function KumbhSahayak() {
  const { locale } = useLanguage();
  const { isOpen, close, pendingTopicId, clearPendingTopic } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  /** Which engine answered last: decides the note under the composer. */
  const [aiMode, setAiMode] = useState<"ai" | "local" | "busy" | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, close]);

  const handleSend = useCallback(async () => {
    const question = inputValue.trim();
    if (!question) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: question };
    // The last few turns go along so follow-ups ("and in Trimbak?") make sense.
    const history = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const aiId = `${Date.now()}-ai`;
    const showDelta = (text: string) => {
      setIsTyping(false);
      setMessages((prev) => {
        const existing = prev.find((m) => m.id === aiId);
        const draft: ChatMessage = { id: aiId, role: "assistant", content: text, provenance: { status: "ai_grounded" } };
        return existing ? prev.map((m) => (m.id === aiId ? { ...m, content: text } : m)) : [...prev, draft];
      });
    };

    const result = await askAi(locale, [...history, { role: "user", content: question }], showDelta);

    if (result.kind === "fallback") {
      // No key, budget spent, or an error before any text: the built-in engine answers.
      setAiMode(result.reason === "daily_cap" || result.reason === "visitor_day" ? "busy" : "local");
      const response: ChatResponse = await getResponse(question, locale);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, toMessage(response)]);
      }, 500 + Math.random() * 400);
      return;
    }

    setAiMode("ai");
    setIsTyping(false);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === aiId ? { ...m, content: result.text, quickReplies: [NEWS_TOPIC_ID, "kumbh-dates"] } : m
      )
    );
  }, [inputValue, locale, messages]);

  const handleQuickReply = useCallback(
    async (topicId: string) => {
      const label = chipLabel(topicId, locale);
      if (!label) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: label,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const response =
        topicId === NEWS_TOPIC_ID ? await getLatestNews(locale) : getTopicById(topicId, locale);

      setTimeout(() => {
        setIsTyping(false);
        if (response) setMessages((prev) => [...prev, toMessage(response)]);
      }, 600 + Math.random() * 400);
    },
    [locale]
  );

  // A question handed over from the landing page is asked as soon as we open.
  useEffect(() => {
    if (!isOpen || !pendingTopicId) return;
    handleQuickReply(pendingTopicId);
    clearPendingTopic();
  }, [isOpen, pendingTopicId, handleQuickReply, clearPendingTopic]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const deva = locale !== "en";

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-indigo-900/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="chat-overlay-enter fixed inset-0 z-[71] flex items-end justify-center sm:items-center sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={chatbotUI.title[locale]}
          className="relative flex h-full w-full flex-col overflow-hidden bg-cream-50 sm:h-auto sm:max-h-[86vh] sm:max-w-2xl sm:rounded-card sm:border sm:border-temple-100 sm:shadow-lift"
        >
          {/* ── Header ─────────────────────────────────── */}
          <header className="flex flex-shrink-0 items-center gap-3 border-b border-temple-100 bg-cream-100 px-4 py-3.5 sm:px-6">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-saffron-600 text-cream-50">
              <Sparkles className="h-5 w-5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-heading text-lg leading-tight text-temple-900">
                {chatbotUI.title[locale]}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-temple-400">
                <span className="h-1.5 w-1.5 rounded-full bg-river-500" />
                {chatbotUI.subtitle[locale]}
              </span>
            </span>

            <button
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-temple-500 transition-colors hover:bg-cream-200 hover:text-temple-900"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* ── Conversation ───────────────────────────── */}
          <div className="scrollbar-hide flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            {messages.length === 0 && (
              <div className="space-y-5">
                <Bubble deva={deva}>{chatbotUI.welcome[locale]}</Bubble>

                <div className="grid gap-2 sm:grid-cols-2">
                  {quickStartChips.map((chip) => (
                    <button
                      key={chip.topicId}
                      onClick={() => handleQuickReply(chip.topicId)}
                      className={`group flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        chip.topicId === NEWS_TOPIC_ID
                          ? "border-saffron-200 bg-saffron-50 font-semibold text-saffron-800 hover:border-saffron-400 hover:bg-saffron-100 sm:col-span-2"
                          : "border-temple-100 bg-cream-50 font-medium text-temple-800 hover:border-saffron-300 hover:bg-saffron-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {chip.topicId === NEWS_TOPIC_ID && <Newspaper className="h-4 w-4 flex-shrink-0" />}
                        {chip.label[locale]}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-temple-300 transition-all group-hover:translate-x-0.5 group-hover:text-saffron-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) =>
              msg.role === "assistant" ? (
                <div key={msg.id} className="space-y-2.5">
                  {msg.image && (
                    <div className="ml-11 max-w-[85%] overflow-hidden rounded-xl border border-temple-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={msg.image}
                        alt=""
                        className="h-40 w-full object-cover sm:h-48"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <Bubble deva={deva}>{msg.content}</Bubble>

                  {msg.provenance && (
                    <div className="ml-11 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-temple-400">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                          msg.provenance.status === "official"
                            ? "bg-river-100 text-river-800"
                            : msg.provenance.status === "awaiting_confirmation"
                              ? "bg-saffron-100 text-saffron-800"
                              : msg.provenance.status === "ai_grounded"
                              ? "bg-indigo-50 text-indigo-800"
                              : msg.provenance.status === "historical" ||
                                  msg.provenance.status === "religious_tradition"
                                ? "bg-cream-200 text-temple-700"
                                : "bg-temple-100 text-temple-500"
                        }`}
                      >
                        {STATUS_LABEL[msg.provenance.status]?.[locale] ??
                          msg.provenance.status}
                      </span>
                      {msg.provenance.sourceUrl && msg.provenance.sourceOrganisation && (
                        <a
                          href={msg.provenance.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-temple-200 underline-offset-2 hover:text-temple-700"
                        >
                          {locale === "en" ? "Source: " : locale === "hi" ? "स्रोत: " : "स्रोत: "}
                          {msg.provenance.sourceOrganisation}
                        </a>
                      )}
                      {msg.provenance.publishedAt && (
                        <span>
                          {locale === "en" ? "Published " : locale === "hi" ? "प्रकाशित " : "प्रकाशित "}
                          {formatDate(msg.provenance.publishedAt, locale, { short: true })}
                        </span>
                      )}
                      {msg.provenance.verifiedAt && (
                        <span>
                          {locale === "en"
                            ? `Verified ${msg.provenance.verifiedAt}`
                            : locale === "hi"
                              ? `सत्यापित ${msg.provenance.verifiedAt}`
                              : `सत्यापित ${msg.provenance.verifiedAt}`}
                        </span>
                      )}
                    </div>
                  )}

                  {msg.links && msg.links.length > 0 && (
                    <div className="ml-11 max-w-[85%] rounded-xl border border-temple-100 bg-cream-50 p-3">
                      {msg.linksTitle && (
                        <p
                          className={`mb-2 flex items-start gap-1.5 text-xs font-semibold text-temple-700 ${
                            deva ? "font-devanagari" : ""
                          }`}
                        >
                          <Newspaper className="mt-px h-3.5 w-3.5 flex-shrink-0 text-saffron-600" />
                          {msg.linksTitle}
                        </p>
                      )}
                      <ul className="space-y-1">
                        {msg.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={close}
                              className={`group flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-temple-800 transition-colors hover:bg-saffron-50 hover:text-saffron-800 ${
                                deva ? "font-devanagari" : ""
                              }`}
                            >
                              <span className="underline decoration-temple-200 underline-offset-2 group-hover:decoration-saffron-400">
                                {link.label}
                              </span>
                              {link.meta && (
                                <span className="flex-shrink-0 text-[0.6875rem] text-temple-400">
                                  {link.meta}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.pageLink && (
                    <div className="ml-11">
                      <Link
                        href={msg.pageLink}
                        onClick={close}
                        className="inline-flex items-center gap-1.5 rounded-full border border-temple-100 px-3.5 py-1.5 text-xs font-semibold text-temple-700 transition-colors hover:border-saffron-300 hover:text-saffron-700"
                      >
                        {chatbotUI.readMore[locale]}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}

                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="ml-11 flex flex-wrap gap-2">
                      {msg.quickReplies.map((topicId) => {
                        const label = chipLabel(topicId, locale);
                        if (!label) return null;
                        return (
                          <button
                            key={topicId}
                            onClick={() => handleQuickReply(topicId)}
                            className="rounded-full border border-saffron-200 bg-saffron-50 px-3.5 py-1.5 text-xs font-medium text-saffron-800 transition-colors hover:border-saffron-400 hover:bg-saffron-100"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <p
                    className={`max-w-[85%] rounded-2xl rounded-br-sm bg-saffron-600 px-4 py-3 leading-relaxed text-cream-50 ${
                      deva ? "font-devanagari" : ""
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              )
            )}

            {isTyping && (
              <div className="flex items-end gap-3">
                <Avatar />
                <span className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-temple-100 bg-cream-100 px-4 py-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="typing-dot h-2 w-2 rounded-full bg-saffron-500"
                    />
                  ))}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Composer ───────────────────────────────── */}
          <div className="flex-shrink-0 border-t border-temple-100 bg-cream-100 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-2.5">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={chatbotUI.placeholder[locale]}
                aria-label={chatbotUI.placeholder[locale]}
                className="min-w-0 flex-1 rounded-full border border-temple-200 bg-cream-50 px-5 py-3 text-temple-900 outline-none transition-colors placeholder:text-temple-300 focus:border-saffron-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                aria-label="Send"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-saffron-600 text-cream-50 transition-all hover:bg-saffron-700 disabled:cursor-not-allowed disabled:bg-temple-200 disabled:text-temple-400"
              >
                <Send className="h-4 w-4 -translate-x-px" />
              </button>
            </div>

            <p className="mt-2.5 text-center text-[0.6875rem] leading-snug text-temple-400">
              {aiMode === "ai"
                ? chatbotUI.aiNote[locale]
                : aiMode === "busy"
                  ? chatbotUI.busyNote[locale]
                  : chatbotUI.localNote[locale]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Avatar() {
  return (
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
      <Sparkles className="h-4 w-4" />
    </span>
  );
}

/** An assistant message, with the avatar rail the quick replies align to. */
function Bubble({ children, deva }: { children: string; deva: boolean }) {
  return (
    <div className="flex items-end gap-3">
      <Avatar />
      <div
        className={`max-w-[85%] rounded-2xl rounded-bl-sm border border-temple-100 bg-cream-100 px-4 py-3 ${
          deva ? "font-devanagari" : ""
        }`}
      >
        <RichText text={children} compact />
      </div>
    </div>
  );
}

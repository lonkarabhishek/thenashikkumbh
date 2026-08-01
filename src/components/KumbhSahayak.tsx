"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { chatbotUI } from "@/i18n/chatbotTranslations";
import { quickStartChips, chatTopics } from "@/data/chatbotKnowledgeBase";
import { getResponse, getTopicById, ChatResponse } from "@/lib/chatbotEngine";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
  pageLink?: string;
  image?: string;
}

export default function KumbhSahayak() {
  const { locale } = useLanguage();
  const { isOpen, close, pendingTopicId, clearPendingTopic } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 700;
    const response: ChatResponse = await getResponse(inputValue.trim(), locale);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        quickReplies: response.relatedTopics,
        pageLink: response.pageLink,
        image: response.image,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }, [inputValue, locale]);

  const handleQuickReply = useCallback(
    (topicId: string) => {
      const topic = chatTopics.find((t) => t.id === topicId);
      if (!topic) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: topic.question[locale],
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const response = getTopicById(topicId, locale);

      setTimeout(() => {
        setIsTyping(false);
        if (response) {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: response.answer,
              quickReplies: response.relatedTopics,
              pageLink: response.pageLink,
              image: response.image,
            },
          ]);
        }
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
                      className="group flex items-center justify-between gap-2 rounded-xl border border-temple-100 bg-cream-50 px-4 py-3 text-left text-sm font-medium text-temple-800 transition-colors hover:border-saffron-300 hover:bg-saffron-50"
                    >
                      {chip.label[locale]}
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
                        const topic = chatTopics.find((t) => t.id === topicId);
                        if (!topic) return null;
                        return (
                          <button
                            key={topicId}
                            onClick={() => handleQuickReply(topicId)}
                            className="rounded-full border border-saffron-200 bg-saffron-50 px-3.5 py-1.5 text-xs font-medium text-saffron-800 transition-colors hover:border-saffron-400 hover:bg-saffron-100"
                          >
                            {topic.question[locale]}
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

            <p className="mt-2.5 text-center text-[0.6875rem] text-temple-300">
              {chatbotUI.poweredBy[locale]}
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
function Bubble({ children, deva }: { children: React.ReactNode; deva: boolean }) {
  return (
    <div className="flex items-end gap-3">
      <Avatar />
      <p
        className={`max-w-[85%] rounded-2xl rounded-bl-sm border border-temple-100 bg-cream-100 px-4 py-3 leading-relaxed text-temple-800 ${
          deva ? "font-devanagari" : ""
        }`}
      >
        {children}
      </p>
    </div>
  );
}

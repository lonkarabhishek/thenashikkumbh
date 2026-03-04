"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Sparkles, Send, X, ArrowRight, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { chatbotUI } from "@/i18n/chatbotTranslations";
import { quickStartChips, chatTopics } from "@/data/chatbotKnowledgeBase";
import { getResponse, getTopicById, ChatResponse } from "@/lib/chatbotEngine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
  pageLink?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KumbhSahayak() {
  const { locale } = useLanguage();

  // ── State ────────────────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [show, setShow] = useState(false);

  // ── Refs ─────────────────────────────────────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Delayed mount (show after 4 seconds) ─────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // ── Auto-scroll to bottom on new messages or typing ──────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Focus input when panel opens ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ── Send handler ─────────────────────────────────────────────────────────
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
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }, [inputValue, locale]);

  // ── Quick reply handler ──────────────────────────────────────────────────
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
            },
          ]);
        }
      }, 600 + Math.random() * 400);
    },
    [locale]
  );

  // ── Keyboard submit ──────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Don't render until delay passes ──────────────────────────────────────
  if (!show) return null;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ================================================================= */}
      {/* FLOATING BUTTON                                                    */}
      {/* ================================================================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Kumbh Sahayak AI Assistant"
          className="fixed bottom-6 left-6 z-50 group"
        >
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4A843, #FFD700)",
              boxShadow: "0 4px 25px rgba(212,168,67,0.4)",
            }}
          >
            {/* Ping animation ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-25"
              style={{ background: "linear-gradient(135deg, #D4A843, #FFD700)" }}
            />
            <Sparkles className="w-6 h-6 text-[#0D0906] relative z-10" />

            {/* AI badge */}
            <span
              className="absolute -top-1 -right-1 z-20 flex items-center justify-center w-5 h-5 rounded-full text-[8px] font-bold text-[#0D0906]"
              style={{
                background: "linear-gradient(135deg, #FFD700, #D4A843)",
                boxShadow: "0 2px 8px rgba(212,168,67,0.5)",
              }}
            >
              AI
            </span>
          </div>
        </button>
      )}

      {/* ================================================================= */}
      {/* CHAT PANEL                                                         */}
      {/* ================================================================= */}
      {isOpen && (
        <div
          className="chat-panel-enter fixed inset-x-3 bottom-3 z-50 flex flex-col max-h-[80vh] rounded-2xl overflow-hidden sm:inset-x-auto sm:left-6 sm:bottom-24 sm:w-[380px] sm:max-h-[520px]"
          style={{
            background: "rgba(26,21,16,0.98)",
            border: "1px solid rgba(212,168,67,0.2)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* ─── Header ──────────────────────────────────────────────── */}
          <div className="h-14 flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Bot avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #D4A843, #FFD700)",
                }}
              >
                <Bot className="w-4 h-4 text-[#0D0906]" />
              </div>
              {/* Title group */}
              <div className="flex flex-col">
                <span className="font-heading text-cream-100 text-sm leading-tight">
                  {chatbotUI.title[locale]}
                </span>
                <span
                  className="text-[10px] leading-tight"
                  style={{ color: "rgba(212,168,67,0.5)" }}
                >
                  {chatbotUI.subtitle[locale]}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[rgba(255,255,255,0.05)]"
            >
              <X className="w-4 h-4 text-cream-300/60" />
            </button>
          </div>

          {/* ─── Gold divider ────────────────────────────────────────── */}
          <div
            className="h-px flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)",
            }}
          />

          {/* ─── Messages area ───────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {/* Welcome message (always shown first) */}
            {messages.length === 0 && (
              <div className="space-y-3">
                {/* Assistant welcome bubble */}
                <div
                  className="max-w-[85%] rounded-xl rounded-tl-sm px-4 py-3 text-sm text-cream-100 leading-relaxed"
                  style={{
                    background: "rgba(212,168,67,0.08)",
                    borderLeft: "3px solid #D4A843",
                  }}
                >
                  {chatbotUI.welcome[locale]}
                </div>

                {/* Quick start chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickStartChips.map((chip) => (
                    <button
                      key={chip.topicId}
                      onClick={() => handleQuickReply(chip.topicId)}
                      className="px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-150"
                      style={{
                        border: "1px solid rgba(212,168,67,0.3)",
                        color: "rgba(212,168,67,0.7)",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(212,168,67,0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(212,168,67,0.5)";
                        e.currentTarget.style.color = "rgba(212,168,67,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor =
                          "rgba(212,168,67,0.3)";
                        e.currentTarget.style.color = "rgba(212,168,67,0.7)";
                      }}
                    >
                      {chip.label[locale]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation messages */}
            {messages.map((msg) => (
              <div key={msg.id}>
                {/* Message bubble */}
                {msg.role === "assistant" ? (
                  <div className="space-y-2">
                    <div
                      className="max-w-[85%] rounded-xl rounded-tl-sm px-4 py-3 text-sm text-cream-100 leading-relaxed"
                      style={{
                        background: "rgba(212,168,67,0.08)",
                        borderLeft: "3px solid #D4A843",
                      }}
                    >
                      {msg.content}
                    </div>

                    {/* Page link */}
                    {msg.pageLink && (
                      <div className="ml-1">
                        <Link
                          href={msg.pageLink}
                          className="inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
                          style={{ color: "rgba(212,168,67,0.6)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color =
                              "rgba(212,168,67,0.9)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(212,168,67,0.6)";
                          }}
                        >
                          <ArrowRight className="w-3 h-3" />
                          {chatbotUI.readMore[locale]}
                        </Link>
                      </div>
                    )}

                    {/* Quick reply chips */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.quickReplies.map((topicId) => {
                          const topic = chatTopics.find(
                            (t) => t.id === topicId
                          );
                          if (!topic) return null;
                          return (
                            <button
                              key={topicId}
                              onClick={() => handleQuickReply(topicId)}
                              className="px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-150"
                              style={{
                                border: "1px solid rgba(212,168,67,0.3)",
                                color: "rgba(212,168,67,0.7)",
                                background: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(212,168,67,0.1)";
                                e.currentTarget.style.borderColor =
                                  "rgba(212,168,67,0.5)";
                                e.currentTarget.style.color =
                                  "rgba(212,168,67,0.9)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.borderColor =
                                  "rgba(212,168,67,0.3)";
                                e.currentTarget.style.color =
                                  "rgba(212,168,67,0.7)";
                              }}
                            >
                              {topic.question[locale]}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="max-w-[85%] ml-auto rounded-xl rounded-tr-sm px-4 py-3 text-sm text-cream-100 leading-relaxed"
                    style={{
                      background: "rgba(212,168,67,0.15)",
                    }}
                  >
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                className="max-w-[85%] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
                style={{
                  background: "rgba(212,168,67,0.08)",
                  borderLeft: "3px solid #D4A843",
                }}
              >
                <span
                  className="typing-dot w-2 h-2 rounded-full"
                  style={{ background: "rgba(212,168,67,0.5)" }}
                />
                <span
                  className="typing-dot w-2 h-2 rounded-full"
                  style={{ background: "rgba(212,168,67,0.5)" }}
                />
                <span
                  className="typing-dot w-2 h-2 rounded-full"
                  style={{ background: "rgba(212,168,67,0.5)" }}
                />
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* ─── Gold divider ────────────────────────────────────────── */}
          <div
            className="h-px flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)",
            }}
          />

          {/* ─── Input area ──────────────────────────────────────────── */}
          <div className="p-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatbotUI.placeholder[locale]}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-300/40 outline-none transition-colors duration-150"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,168,67,0.15)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,67,0.15)";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150"
              style={{
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #D4A843, #FFD700)"
                  : "linear-gradient(135deg, #D4A843, #FFD700)",
                opacity: inputValue.trim() ? 1 : 0.5,
                pointerEvents: inputValue.trim() ? "auto" : "none",
              }}
            >
              <Send className="w-4 h-4 text-[#0D0906]" />
            </button>
          </div>

          {/* ─── Powered by footer ───────────────────────────────────── */}
          <div className="px-4 pb-2 flex-shrink-0">
            <p
              className="text-[10px] text-center"
              style={{ color: "rgba(255,249,235,0.3)" }}
            >
              {chatbotUI.poweredBy[locale]}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

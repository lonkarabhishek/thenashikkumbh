"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Send, X, ArrowRight, Bot } from "lucide-react";
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
  const { isOpen, close } = useChat();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Chat overlay */}
      <div className="chat-overlay-enter fixed inset-0 z-[71] flex items-end sm:items-center justify-center p-0 sm:p-6">
        <div
          className="relative w-full h-full sm:max-w-2xl sm:max-h-[85vh] sm:rounded-2xl flex flex-col overflow-hidden"
          style={{
            background: "rgba(13, 9, 6, 0.98)",
            border: "1px solid rgba(212,168,67,0.15)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.7)",
          }}
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #D4A843, #FFD700)",
                }}
              >
                <Bot className="w-5 h-5 text-[#0D0906]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-cream-100 text-base leading-tight">
                  {chatbotUI.title[locale]}
                </span>
                <span
                  className="text-xs leading-tight"
                  style={{ color: "rgba(212,168,67,0.5)" }}
                >
                  {chatbotUI.subtitle[locale]}
                </span>
              </div>
            </div>

            <button
              onClick={close}
              aria-label="Close chat"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
            >
              <X className="w-5 h-5 text-cream-300/60" />
            </button>
          </div>

          {/* Gold divider */}
          <div
            className="h-px flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)",
            }}
          />

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-hide">
            {/* Welcome + quick start chips */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div
                  className="max-w-[90%] sm:max-w-[80%] rounded-xl rounded-tl-sm px-4 py-3 text-sm sm:text-base text-cream-100 leading-relaxed"
                  style={{
                    background: "rgba(212,168,67,0.08)",
                    borderLeft: "3px solid #D4A843",
                  }}
                >
                  {chatbotUI.welcome[locale]}
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickStartChips.map((chip) => (
                    <button
                      key={chip.topicId}
                      onClick={() => handleQuickReply(chip.topicId)}
                      className="px-3 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer transition-all duration-150"
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

            {/* Messages */}
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "assistant" ? (
                  <div className="space-y-2">
                    {/* Image */}
                    {msg.image && (
                      <div className="max-w-[90%] sm:max-w-[80%] rounded-xl overflow-hidden">
                        <img
                          src={msg.image}
                          alt=""
                          className="w-full h-40 sm:h-48 object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Text bubble */}
                    <div
                      className="max-w-[90%] sm:max-w-[80%] rounded-xl rounded-tl-sm px-4 py-3 text-sm sm:text-base text-cream-100 leading-relaxed"
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
                          onClick={close}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm transition-colors duration-150"
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
                      <div className="flex flex-wrap gap-2 mt-1">
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
                  <div className="flex justify-end">
                    <div
                      className="max-w-[90%] sm:max-w-[80%] rounded-xl rounded-tr-sm px-4 py-3 text-sm sm:text-base text-cream-100 leading-relaxed"
                      style={{
                        background: "rgba(212,168,67,0.15)",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                className="max-w-[90%] sm:max-w-[80%] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
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

            <div ref={messagesEndRef} />
          </div>

          {/* Gold divider */}
          <div
            className="h-px flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)",
            }}
          />

          {/* Input area */}
          <div className="p-3 sm:p-4 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatbotUI.placeholder[locale]}
              className="flex-1 rounded-xl px-4 py-3 text-sm sm:text-base text-cream-100 placeholder:text-cream-300/40 outline-none transition-colors duration-150"
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
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #D4A843, #FFD700)",
                opacity: inputValue.trim() ? 1 : 0.5,
                pointerEvents: inputValue.trim() ? "auto" : "none",
              }}
            >
              <Send className="w-4 h-4 text-[#0D0906]" />
            </button>
          </div>

          {/* Powered by footer */}
          <div className="px-4 pb-3 flex-shrink-0">
            <p
              className="text-[10px] text-center"
              style={{ color: "rgba(255,249,235,0.3)" }}
            >
              {chatbotUI.poweredBy[locale]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

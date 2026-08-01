"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  open: () => void;
  /** Open the assistant and immediately ask a knowledge-base topic. */
  openWithTopic: (topicId: string) => void;
  /** Topic the assistant should answer on mount, if any. */
  pendingTopicId: string | null;
  clearPendingTopic: () => void;
  close: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const openWithTopic = useCallback((topicId: string) => {
    setPendingTopicId(topicId);
    setIsOpen(true);
  }, []);

  const clearPendingTopic = useCallback(() => setPendingTopicId(null), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPendingTopicId(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{ isOpen, open, openWithTopic, pendingTopicId, clearPendingTopic, close }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

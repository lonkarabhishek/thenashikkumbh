"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Locale, translations, t } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (obj: Record<Locale, string>) => string;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_KEY = "kumbh-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("mr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
      if (saved && ["en", "hi", "mr"].includes(saved)) {
        setLocaleState(saved);
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_KEY, newLocale);
    }
  }, []);

  const translate = useCallback(
    (obj: Record<Locale, string>) => t(obj, locale),
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: translate, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

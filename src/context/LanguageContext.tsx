"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { stripLocale } from "@/i18n/locales";
import { Locale, translations, t } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (obj: Record<Locale, string>) => string;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The language comes from the URL prefix (/mr, /hi, /en), passed down by the
 * [locale] layout. Switching language navigates to the same page under the
 * other prefix, so every language has its own crawlable URL.
 */
export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      const rest = stripLocale(pathname ?? "/");
      const query = window.location.search + window.location.hash;
      router.push(`/${newLocale}${rest === "/" ? "" : rest}${query}`);
    },
    [locale, pathname, router]
  );

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

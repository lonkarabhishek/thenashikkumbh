import type { Locale } from "@/i18n/translations";

/**
 * Every page lives under a language prefix: /mr/..., /hi/..., /en/...
 * The URL is the single source of truth for the language, so search engines
 * can index each language on its own and hreflang can link them together.
 * Unprefixed paths (the pre-2026-09 URLs, which were English) 301 to /en;
 * see src/middleware.ts.
 */
export const LOCALES: readonly Locale[] = ["mr", "hi", "en"];
export const DEFAULT_LOCALE: Locale = "mr";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** "/dates" + "hi" -> "/hi/dates". Leaves external, hash and file URLs alone. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const [first] = path.split(/[/?#]/).filter(Boolean);
  if (isLocale(first)) return path;
  if (/^\/[^?#]*\.[a-z0-9]+([?#]|$)/i.test(path)) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** "/hi/dates" -> "/dates". */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = {
  mr: "mr_IN",
  hi: "hi_IN",
  en: "en_IN",
};

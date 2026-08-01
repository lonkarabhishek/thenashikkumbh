"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Headphones, Menu, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { translations } from "@/i18n/translations";
import { navExtra } from "@/i18n/navExtra";
import type { Locale } from "@/i18n/translations";

/**
 * Eleven flat links was too many to scan, especially for the older half of the
 * audience. The bar now shows the five things a visitor actually needs on the
 * day, and everything else lives under one grouped menu.
 */
type NavItem = {
  href: string;
  label: Record<Locale, string>;
  highlight?: boolean;
};

const PRIMARY: NavItem[] = [
  { href: "/yatra", label: navExtra.yatra, highlight: true },
  { href: "/dates", label: translations.nav.dates },
  { href: "/ghats", label: translations.nav.ghats },
  { href: "/guide", label: translations.nav.guide },
  { href: "/events", label: translations.nav.events },
];

const GROUPS = [
  {
    label: navExtra.groupLearn,
    links: [
      { href: "/about", label: translations.nav.about },
      { href: "/naga-sadhus", label: translations.nav.nagaSadhus },
      { href: "/blog", label: translations.nav.news },
    ],
  },
  {
    label: navExtra.groupExplore,
    links: [
      { href: "/gallery", label: translations.nav.gallery },
      { href: "/games", label: translations.nav.games },
      { href: "/kumbhrun", label: { en: "Kumbh Run", hi: "कुंभ रन", mr: "कुंभ रन" } },
    ],
  },
  {
    label: navExtra.groupPlan,
    links: [{ href: "/businesses", label: translations.nav.businesses }],
  },
] as const;

const LANGUAGES: { code: Locale; label: string; full: string }[] = [
  { code: "mr", label: "मरा", full: "मराठी" },
  { code: "hi", label: "हिं", full: "हिंदी" },
  { code: "en", label: "EN", full: "English" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const { open: openChat } = useChat();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the "More" menu on an outside click or Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-cream-50 transition-shadow duration-300 ${
          scrolled ? "border-b border-temple-100 shadow-soft" : "border-b border-temple-100/60"
        }`}
      >
        <div className="section-container">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Wordmark */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <span className="font-devanagari text-2xl leading-none text-saffron-600">ॐ</span>
              <span className="leading-tight">
                <span className="block font-heading text-lg font-semibold tracking-tight text-temple-900">
                  Nashik Kumbh
                </span>
                <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-temple-400">
                  Simhastha 2027
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {PRIMARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-saffron-700"
                      : "text-temple-600 hover:text-temple-900"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.highlight && <Headphones className="h-3.5 w-3.5" />}
                    {t(item.label)}
                  </span>
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-saffron-500" />
                  )}
                </Link>
              ))}

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((o) => !o)}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-temple-600 transition-colors hover:text-temple-900"
                >
                  {t(navExtra.more)}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-card border border-temple-100 bg-cream-50 p-2 shadow-lift">
                    {GROUPS.map((group) => (
                      <div key={group.label.en} className="px-2 py-2">
                        <p className="px-1 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-temple-400">
                          {t(group.label)}
                        </p>
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block rounded-lg px-2.5 py-2 text-sm font-medium text-temple-700 transition-colors hover:bg-cream-200 hover:text-temple-900"
                          >
                            {t(link.label)}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              {/* Language — a real segmented control, big enough to tap */}
              <div
                role="group"
                aria-label={t(navExtra.language)}
                className="flex items-center rounded-full border border-temple-100 bg-cream-100 p-0.5"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    aria-pressed={locale === lang.code}
                    title={lang.full}
                    className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      locale === lang.code
                        ? "bg-temple-800 text-cream-50"
                        : "text-temple-500 hover:text-temple-800"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <button
                onClick={openChat}
                aria-label={t(translations.nav.aiAssistant)}
                className="hidden h-9 items-center gap-1.5 rounded-full border border-temple-100 px-3 text-xs font-semibold text-temple-700 transition-colors hover:border-saffron-300 hover:text-saffron-700 sm:flex"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label={t(navExtra.menu)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-temple-800 transition-colors hover:bg-cream-200 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-temple-900/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream-50 shadow-lift">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-temple-100 px-5">
              <span className="font-heading text-lg font-semibold text-temple-900">
                {t(navExtra.menu)}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={t(navExtra.close)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-temple-700 hover:bg-cream-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <Link
                href="/yatra"
                className="flex items-center gap-3 rounded-card bg-saffron-600 px-5 py-4 text-cream-50"
              >
                <Headphones className="h-5 w-5 shrink-0" />
                <span>
                  <span className="block font-semibold">{t(navExtra.yatra)}</span>
                  <span className="block text-xs text-cream-100/80">
                    {t({ en: "Free · 12 stories", hi: "नि:शुल्क · 12 कहानियाँ", mr: "मोफत · १२ गोष्टी" })}
                  </span>
                </span>
              </Link>

              <div className="mt-7 space-y-1">
                {PRIMARY.filter((i) => i.href !== "/yatra").map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-cream-200 text-saffron-800"
                        : "text-temple-800 hover:bg-cream-100"
                    }`}
                  >
                    {t(item.label)}
                  </Link>
                ))}
              </div>

              {GROUPS.map((group) => (
                <div key={group.label.en} className="mt-7">
                  <p className="px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-temple-400">
                    {t(group.label)}
                  </p>
                  <div className="space-y-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-3 py-2.5 font-medium text-temple-700 transition-colors hover:bg-cream-100"
                      >
                        {t(link.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  openChat();
                }}
                className="mt-8 flex w-full items-center gap-2 rounded-card border border-temple-100 px-4 py-3.5 text-sm font-semibold text-temple-800"
              >
                <Sparkles className="h-4 w-4 text-saffron-600" />
                {t(translations.nav.aiAssistant)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

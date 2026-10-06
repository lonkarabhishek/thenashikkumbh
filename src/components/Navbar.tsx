"use client";

import Link from "@/components/LocaleLink";
import { stripLocale } from "@/i18n/locales";
import AdvisoryBanner from "@/components/AdvisoryBanner";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Headphones, Menu, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { translations } from "@/i18n/translations";
import { navExtra } from "@/i18n/navExtra";
import type { Locale } from "@/i18n/translations";

/**
 * The two things this site does that no other Kumbh page does, the assistant
 * and the audio walks, get real buttons. Everything else is a plain link, and
 * the long tail lives under one grouped menu.
 */
type NavItem = { href: string; label: Record<Locale, string> };

/* Nav is organised around what a pilgrim actually does, in order:
 *   Before , decide when to come and what to bring
 *   Arriving, orient in Nashik / Trimbakeshwar
 *   Inside  , what to see and do at the Mela
 *   Emergency, the bottom-of-the-drawer safety block
 *   Explore , everything secondary lives here (games, run, gallery, businesses)
 *
 * Primary bar keeps the three that pilgrims click most; the rest lives under
 * "More" grouped by journey stage. */
const PRIMARY: NavItem[] = [
  { href: "/dates", label: translations.nav.dates },
  { href: "/ghats", label: translations.nav.ghats },
  { href: "/guide", label: translations.nav.guide },
];

const GROUPS = [
  {
    label: {
      en: "Before you come",
      hi: "आने से पहले",
      mr: "येण्यापूर्वी",
    },
    links: [
      { href: "/about", label: translations.nav.about },
      { href: "/dates", label: translations.nav.dates },
      { href: "/parva-snan-calendar", label: { en: "Parva Snan calendar", hi: "पर्व स्नान कैलेंडर", mr: "पर्व स्नान दिनदर्शिका" } },
      { href: "/dhwajarohan-2026", label: { en: "Dhwajarohan 31 Oct", hi: "ध्वजारोहण 31 अक्टूबर", mr: "ध्वजारोहण ३१ ऑक्टोबर" } },
      { href: "/guide", label: translations.nav.guide },
      { href: "/how-to-reach", label: { en: "How to reach", hi: "कैसे पहुँचें", mr: "कसे पोहोचाल" } },
      { href: "/accommodation", label: { en: "Where to stay", hi: "कहाँ ठहरें", mr: "कुठे राहाल" } },
    ],
  },
  {
    label: {
      en: "Arriving & inside the Mela",
      hi: "पहुँचना और मेले के अंदर",
      mr: "पोहोचणे व मेळ्यात",
    },
    links: [
      { href: "/ghats", label: translations.nav.ghats },
      { href: "/trimbakeshwar-kumbh-2027", label: { en: "Trimbakeshwar Kumbh 2027", hi: "त्र्यंबकेश्वर कुंभ 2027", mr: "त्र्यंबकेश्वर कुंभ 2027" } },
      { href: "/events", label: translations.nav.events },
      { href: "/naga-sadhus", label: translations.nav.nagaSadhus },
      { href: "/yatra", label: navExtra.yatra },
    ],
  },
  {
    label: {
      en: "Emergency & policies",
      hi: "आपात व नीतियाँ",
      mr: "आपत्कालीन व धोरणे",
    },
    links: [
      {
        href: "/emergency",
        label: {
          en: "Emergency (offline)",
          hi: "आपात (ऑफ़लाइन)",
          mr: "आपत्कालीन (ऑफलाइन)",
        },
      },
      {
        href: "/policies",
        label: { en: "Policies", hi: "नीतियाँ", mr: "धोरणे" },
      },
      {
        href: "/changelog",
        label: { en: "Changelog", hi: "परिवर्तन-लॉग", mr: "बदल-नोंद" },
      },
    ],
  },
  {
    label: navExtra.groupExplore,
    links: [
      { href: "/blog", label: translations.nav.news },
      { href: "/gallery", label: translations.nav.gallery },
      { href: "/businesses", label: translations.nav.businesses },
      { href: "/games", label: translations.nav.games },
      { href: "/kumbhrun", label: { en: "Kumbh Run", hi: "कुंभ रन", mr: "कुंभ रन" } },
    ],
  },
] as const;

const LANGUAGES: { code: Locale; short: string; full: string }[] = [
  { code: "mr", short: "मरा", full: "मराठी" },
  { code: "hi", short: "हिं", full: "हिंदी" },
  { code: "en", short: "EN", full: "English" },
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

  const isActive = (href: string) => {
    const path = stripLocale(pathname ?? "/");
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  const walksActive = isActive("/yatra");

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-cream-50 transition-shadow duration-300 ${
          scrolled ? "border-b border-temple-100 shadow-soft" : "border-b border-temple-100/60"
        }`}
      >
        <AdvisoryBanner />
        <div className="section-container">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-6">
            {/* Wordmark */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <span className="font-devanagari text-2xl leading-none text-saffron-600">ॐ</span>
              <span className="leading-tight">
                <span className="block font-heading text-base font-semibold tracking-tight text-temple-900 sm:text-lg">
                  Nashik Kumbh
                </span>
                <span className="hidden text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-temple-400 sm:block">
                  Simhastha 2027
                </span>
              </span>
            </Link>

            {/* Desktop: plain links */}
            <div className="hidden flex-1 items-center gap-1 lg:flex">
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
                  {t(item.label)}
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
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-card border border-temple-100 bg-cream-50 p-2 shadow-lift">
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

            {/* Right cluster, the two headline actions live here */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Ask the assistant */}
              <button
                onClick={openChat}
                aria-label={t(translations.nav.aiAssistant)}
                className="flex h-11 items-center gap-2 rounded-full bg-saffron-600 px-3 font-semibold text-cream-50 transition-all duration-200 hover:bg-saffron-700 sm:px-4"
                style={{ boxShadow: "0 6px 18px -8px rgba(158, 79, 9, 0.7)" }}
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="hidden text-sm sm:inline">
                  {t(translations.nav.aiAssistant)}
                </span>
              </button>

              {/* Audio walks */}
              <Link
                href="/yatra"
                aria-label={t(navExtra.yatra)}
                className={`flex h-11 items-center gap-2 rounded-full border px-3 font-semibold transition-colors sm:px-4 ${
                  walksActive
                    ? "border-saffron-300 bg-saffron-50 text-saffron-800"
                    : "border-temple-200 text-temple-800 hover:border-saffron-300 hover:bg-saffron-50 hover:text-saffron-800"
                }`}
              >
                <Headphones className="h-4 w-4 shrink-0" />
                <span className="hidden text-sm sm:inline">{t(navExtra.yatra)}</span>
              </Link>

              {/* Language, full control on desktop, inside the menu on phones */}
              <div
                role="group"
                aria-label={t(navExtra.language)}
                className="hidden items-center rounded-full border border-temple-100 bg-cream-100 p-0.5 lg:flex"
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
                    {lang.short}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label={t(navExtra.menu)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-temple-800 transition-colors hover:bg-cream-200 lg:hidden"
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
              {/* Language first, one tap, full names */}
              <p className="pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-temple-400">
                {t(navExtra.language)}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    aria-pressed={locale === lang.code}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                      locale === lang.code
                        ? "border-temple-800 bg-temple-800 text-cream-50"
                        : "border-temple-100 text-temple-700 hover:bg-cream-100"
                    }`}
                  >
                    {lang.full}
                  </button>
                ))}
              </div>

              <div className="mt-7 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openChat();
                  }}
                  className="flex w-full items-center gap-3 rounded-card bg-saffron-600 px-5 py-4 text-left text-cream-50"
                >
                  <Sparkles className="h-5 w-5 shrink-0" />
                  <span>
                    <span className="block font-semibold">
                      {t(translations.nav.aiAssistant)}
                    </span>
                    <span className="block text-xs text-cream-100/80">
                      {t({
                        en: "Ask anything, in your language",
                        hi: "कुछ भी पूछें, अपनी भाषा में",
                        mr: "काहीही विचारा, तुमच्या भाषेत",
                      })}
                    </span>
                  </span>
                </button>

                <Link
                  href="/yatra"
                  className="flex items-center gap-3 rounded-card border border-temple-200 px-5 py-4 text-temple-900"
                >
                  <Headphones className="h-5 w-5 shrink-0 text-saffron-700" />
                  <span>
                    <span className="block font-semibold">{t(navExtra.yatra)}</span>
                    <span className="block text-xs text-temple-400">
                      {t({
                        en: "Free · 12 stories",
                        hi: "नि:शुल्क · 12 कहानियाँ",
                        mr: "मोफत · १२ गोष्टी",
                      })}
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mt-7 space-y-1">
                {PRIMARY.map((item) => (
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

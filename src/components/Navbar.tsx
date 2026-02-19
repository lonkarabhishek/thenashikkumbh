"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
// Icons handled inline
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";

/* ────────────────────────────────────────────────────────────
   NAV ITEMS - driven by the i18n translation keys
   ──────────────────────────────────────────────────────────── */
const navItems = [
  { href: "/", labelKey: "home" as const },
  { href: "/about", labelKey: "about" as const },
  { href: "/ghats", labelKey: "ghats" as const },
  { href: "/dates", labelKey: "dates" as const },
  { href: "/guide", labelKey: "guide" as const },
  { href: "/events", labelKey: "events" as const },
  { href: "/naga-sadhus", labelKey: "nagaSadhus" as const },
  { href: "/gallery", labelKey: "gallery" as const },
  { href: "/games", labelKey: "games" as const },
  { href: "/blog", labelKey: "news" as const },
  { href: "/businesses", labelKey: "businesses" as const },
];

/* ────────────────────────────────────────────────────────────
   LANGUAGE OPTIONS
   ──────────────────────────────────────────────────────────── */
const languageOptions: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "mr", label: "मरा" },
];

/* ────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────────────────────── */
const mobileMenuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 35,
      when: "afterChildren" as const,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 35,
      when: "beforeChildren" as const,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: 40 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

/* ================================================================
   NAVBAR COMPONENT
   ================================================================ */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  /* ── Scroll listener ─────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close menu on route change ──────────────────────────── */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when menu is open ──────────────────── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* ────────────────────────────────────────────────────────── */
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)] border-b border-amber-300/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between lg:h-20">
            {/* ═══════════════════════════════════════════════
                LOGO AREA
                ═══════════════════════════════════════════════ */}
            <Link
              href="/"
              className="group relative flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Om symbol with golden glow */}
              <span className="relative flex items-center justify-center">
                <span
                  className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
                    isScrolled
                      ? "bg-amber-400/20 scale-150"
                      : "bg-amber-300/30 scale-[1.8] group-hover:scale-[2]"
                  }`}
                />
                <span
                  className={`relative font-serif text-3xl lg:text-4xl transition-all duration-500 ${
                    isScrolled
                      ? "text-amber-600 drop-shadow-[0_0_8px_rgba(217,170,60,0.4)]"
                      : "text-amber-300 drop-shadow-[0_0_14px_rgba(255,215,0,0.6)]"
                  }`}
                >
                  ॐ
                </span>
              </span>

              {/* Text block */}
              <div className="flex flex-col leading-none">
                <span
                  className={`font-serif text-lg font-semibold tracking-[0.08em] transition-colors duration-500 lg:text-xl ${
                    isScrolled
                      ? "text-stone-800"
                      : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  Nashik Kumbh
                </span>
                <span
                  className={`text-[10px] font-medium tracking-[0.25em] uppercase transition-colors duration-500 lg:text-[11px] ${
                    isScrolled
                      ? "text-amber-600/80"
                      : "text-amber-300/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  2027
                </span>
              </div>
            </Link>

            {/* ═══════════════════════════════════════════════
                DESKTOP NAVIGATION (CENTER)
                ═══════════════════════════════════════════════ */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const label = t(translations.nav[item.labelKey]);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 xl:px-4 ${
                      isActive
                        ? isScrolled
                          ? "text-amber-700"
                          : "text-amber-300"
                        : isScrolled
                          ? "text-stone-600 hover:text-amber-600"
                          : "text-white/85 hover:text-amber-200"
                    }`}
                  >
                    {label}

                    {/* Golden dot indicator for active link */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-golden-dot"
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${
                          isScrolled ? "bg-amber-500" : "bg-amber-300"
                        }`}
                        style={{
                          boxShadow: isScrolled
                            ? "0 0 6px 1px rgba(217,170,60,0.5)"
                            : "0 0 8px 2px rgba(255,215,0,0.6)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ═══════════════════════════════════════════════
                RIGHT SIDE - LANGUAGE SWITCHER + CTA
                ═══════════════════════════════════════════════ */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* Language Switcher */}
              <div
                className={`flex items-center rounded-full border px-1 py-0.5 transition-all duration-500 ${
                  isScrolled
                    ? "border-stone-200 bg-stone-50/80"
                    : "border-white/20 bg-white/10 backdrop-blur-sm"
                }`}
              >
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`relative px-2.5 py-1 text-xs font-medium tracking-wide rounded-full transition-all duration-300 ${
                      locale === lang.code
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm shadow-amber-500/30"
                        : isScrolled
                          ? "text-stone-500 hover:text-amber-600"
                          : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Plan Visit CTA */}
              <Link
                href="/guide"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.97]"
              >
                {/* Hover glow layer */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">
                  {t(translations.nav.planVisit)}
                </span>
              </Link>
            </div>

            {/* ═══════════════════════════════════════════════
                MOBILE - HAMBURGER BUTTON
                ═══════════════════════════════════════════════ */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative z-[60] flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 lg:hidden ${
                isMobileMenuOpen
                  ? "text-white"
                  : isScrolled
                    ? "text-stone-700 hover:bg-amber-50"
                    : "text-white hover:bg-white/10"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {/* Animated hamburger -> X */}
              <div className="relative h-5 w-5">
                <motion.span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen
                      ? "bg-white"
                      : isScrolled
                        ? "bg-stone-700"
                        : "bg-white"
                  }`}
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 0, top: "50%" }
                      : { rotate: 0, y: 0, top: "15%" }
                  }
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: "center" }}
                />
                <motion.span
                  className={`absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen
                      ? "bg-white"
                      : isScrolled
                        ? "bg-stone-700"
                        : "bg-white"
                  }`}
                  animate={
                    isMobileMenuOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen
                      ? "bg-white"
                      : isScrolled
                        ? "bg-stone-700"
                        : "bg-white"
                  }`}
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: 0, bottom: "50%" }
                      : { rotate: 0, y: 0, bottom: "15%" }
                  }
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: "center" }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MOBILE MENU - FULL SCREEN OVERLAY + GLASS PANEL
          ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark backdrop overlay */}
            <motion.div
              key="mobile-overlay"
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Glass panel sliding from right */}
            <motion.div
              key="mobile-panel"
              className="fixed top-0 right-0 bottom-0 z-[58] w-[85%] max-w-sm bg-stone-900/95 backdrop-blur-2xl border-l border-amber-500/20 lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Inner content */}
              <div className="flex h-full flex-col px-6 pt-24 pb-8">
                {/* Mobile Logo (subtle) */}
                <motion.div
                  variants={mobileLinkVariants}
                  className="mb-8 flex items-center gap-3"
                >
                  <span className="text-2xl text-amber-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                    ॐ
                  </span>
                  <div>
                    <span className="font-serif text-lg font-semibold text-white tracking-wide">
                      Nashik Kumbh
                    </span>
                    <span className="ml-2 text-[10px] font-medium text-amber-400/80 tracking-[0.2em] uppercase">
                      2027
                    </span>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={mobileLinkVariants}
                  className="mb-6 h-px bg-gradient-to-r from-amber-500/40 via-amber-500/10 to-transparent"
                />

                {/* Language Switcher (Mobile) */}
                <motion.div
                  variants={mobileLinkVariants}
                  className="mb-8 flex items-center gap-2"
                >
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                        locale === lang.code
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                          : "text-white/50 border border-white/10 hover:text-white hover:border-amber-500/30"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const label = t(translations.nav[item.labelKey]);

                    return (
                      <motion.div key={item.href} variants={mobileLinkVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-amber-500/10 text-amber-400"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {/* Golden dot for active */}
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-amber-400 shadow-[0_0_8px_2px_rgba(255,215,0,0.4)]"
                                : "bg-white/20 group-hover:bg-white/40"
                            }`}
                          />
                          {label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <motion.div variants={mobileLinkVariants} className="mt-6">
                  <Link
                    href="/guide"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-amber-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 active:scale-[0.97]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">
                      {t(translations.nav.planVisit)}
                    </span>
                  </Link>
                </motion.div>

                {/* Bottom flourish */}
                <motion.p
                  variants={mobileLinkVariants}
                  className="mt-6 text-center text-[11px] text-white/20 tracking-[0.3em] uppercase"
                >
                  {t(translations.hero.tagline)}
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  Navigation,
  Bus,
  Train,
  Car,
  ArrowRight,
  Waves,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { ghatsI18n } from "@/data/siteDataI18n";

/* ───────────────────────────── animation variants ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

/* ───────────────── Warm gradient palettes for each ghat ───────────────────── */

const ghatDevanagari = ["रामकुण्ड", "गोदावरी", "कपालेश्वर", "पञ्चवटी"];

/* ═══════════════════════════════════════════════════════════════════════════════
   SACRED GHATS PAGE - Premium Dark Luxury Design
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function GhatsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0D0906]">
      {/* ════════════════════════ (a) HERO BANNER ════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#1a0a00] via-[#110804] to-[#0D0906]">
        {/* Pattern overlay */}
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />

        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.08)_0%,transparent_70%)]" />

        {/* Floating Devanagari decorations */}
        <motion.div
          className="absolute top-20 right-12 font-devanagari text-[130px] text-[#D4A843]/[0.04] select-none pointer-events-none"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          गोदावरी
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-8 font-devanagari text-[100px] text-[#D4A843]/[0.03] select-none pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          घाट
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/4 font-devanagari text-[70px] text-[#D4A843]/[0.03] select-none pointer-events-none"
          animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          ॐ
        </motion.div>

        <div className="relative z-10 section-container text-center py-32 pt-44">
          {/* Sacred Devanagari text */}
          <motion.p
            className="font-devanagari text-lg md:text-xl tracking-[0.3em] mb-6"
            style={{ color: "#D4A843" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ॥ जय गोदावरी मैया ॥
          </motion.p>

          {/* Decorative gold line above */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#D4A843]/60" />
            <span className="w-2 h-2 rounded-full bg-[#D4A843]/40" />
            <span className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#D4A843]/60" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-cream-100 mb-5 drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {t(translations.ghatsPage.heroTitle)}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-2xl font-heading italic max-w-2xl mx-auto tracking-wide"
            style={{ color: "rgba(212, 168, 67, 0.7)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {t(translations.ghatsPage.heroSubtitle)}
          </motion.p>

          {/* Decorative gold line below */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A843]/50" />
            <span className="font-devanagari text-sm tracking-[0.2em]" style={{ color: "#D4A843" }}>
              जय गोदावरी
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A843]/50" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ (b) INTRO ABOUT THE GHATS ═══════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream-50">
        <div className="absolute inset-0 mandala-bg opacity-20" />

        <div className="relative section-container">
          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
              {t(translations.ghatsPage.introSub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a0a00] mb-4">
              {t(translations.ghatsPage.introTitle)}
            </h2>
            <p className="text-temple-500 text-lg max-w-2xl mx-auto">
              {t(translations.ghatsPage.introSubtitle)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-7">
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-temple-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-5xl float-left mr-3 mt-1 font-heading font-bold leading-none" style={{ color: "#D4A843" }}>
                {t(translations.ghatsPage.introP1).charAt(0).toUpperCase()}
              </span>
              {t(translations.ghatsPage.introP1).slice(1)}
            </motion.p>

            <motion.p
              className="text-base md:text-lg leading-relaxed text-temple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t(translations.ghatsPage.introP2)}
            </motion.p>

            <motion.p
              className="text-base md:text-lg leading-relaxed text-temple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {t(translations.ghatsPage.introP3)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════ (c) INDIVIDUAL GHAT SECTIONS ═══════════════════════ */}
      {ghatsI18n.map((ghat, index) => {
        const isDark = index % 2 === 0;
        const isEven = index % 2 === 0;

        return (
          <section
            key={ghat.id}
            id={ghat.id}
            className={`relative py-20 md:py-28 scroll-mt-24 overflow-hidden ${
              isDark ? "section-dark" : "bg-cream-50"
            }`}
          >
            {/* Background effects for dark sections */}
            {isDark && (
              <>
                <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.04)_0%,transparent_60%)]" />
              </>
            )}
            {!isDark && (
              <div className="absolute inset-0 mandala-bg opacity-15" />
            )}

            <div className="relative section-container">
              <motion.div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 lg:gap-16 items-stretch`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* ── Ghat Image ── */}
                <div className="lg:w-1/2">
                  <div
                    className="relative w-full h-[420px] md:h-[480px] rounded-2xl overflow-hidden group"
                  >
                    {/* Actual image */}
                    <img
                      src={ghat.image}
                      alt={t(ghat.name)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                    {/* Gold border accent */}
                    <div className="absolute inset-0 rounded-2xl border border-[#D4A843]/20" />

                    {/* Ghat name + Devanagari overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end z-10 p-6 pb-8">
                      <motion.div
                        className="font-devanagari text-6xl md:text-7xl mb-4 select-none"
                        style={{ color: "rgba(212,168,67,0.4)" }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                      >
                        {ghatDevanagari[index % ghatDevanagari.length]}
                      </motion.div>
                      <Waves className="w-10 h-10 mb-3" style={{ color: "rgba(212,168,67,0.6)" }} />
                      <h3 className="text-3xl md:text-4xl font-heading font-bold text-cream-100 text-center drop-shadow-lg">
                        {t(ghat.name)}
                      </h3>
                      <p className="text-sm mt-2 tracking-[0.2em] uppercase" style={{ color: "rgba(212,168,67,0.7)" }}>
                        {t(ghat.subtitle)}
                      </p>
                    </div>

                    {/* Animated shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[2000ms] ease-in-out" />
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  {/* Ghat number badge */}
                  <motion.span
                    className="inline-block w-fit text-xs font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] mb-4 border"
                    style={{
                      color: "#D4A843",
                      borderColor: isDark ? "rgba(212,168,67,0.2)" : "rgba(212,168,67,0.3)",
                      backgroundColor: isDark ? "rgba(212,168,67,0.06)" : "rgba(212,168,67,0.08)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {t(translations.ghatsPage.ghatOf)} {index + 1} {t(translations.ghatsPage.of)} {ghatsI18n.length}
                  </motion.span>

                  <h3
                    className={`text-2xl md:text-4xl font-heading font-bold mb-1 ${
                      isDark ? "text-cream-100" : "text-[#1a0a00]"
                    }`}
                  >
                    {t(ghat.name)}
                  </h3>
                  <p
                    className="font-heading font-medium italic text-lg mb-6"
                    style={{ color: "#D4A843" }}
                  >
                    {t(ghat.subtitle)}
                  </p>

                  <p
                    className={`leading-relaxed text-base md:text-lg mb-7 ${
                      isDark ? "text-cream-300/60" : "text-temple-600"
                    }`}
                  >
                    {t(ghat.description)}
                  </p>

                  {/* Rituals list */}
                  {ghat.rituals.length > 0 && (
                    <div className="mb-7">
                      <h4
                        className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${
                          isDark ? "text-cream-300/40" : "text-temple-500"
                        }`}
                      >
                        {t(translations.ghatsPage.ritualsLabel)}
                      </h4>
                      <ul className="space-y-2.5">
                        {ghat.rituals.map((ritual, i) => (
                          <motion.li
                            key={i}
                            className={`flex items-start gap-3 ${
                              isDark ? "text-cream-300/50" : "text-temple-600"
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3 + i * 0.08,
                            }}
                          >
                            <span
                              className="mt-2 w-2 h-2 rounded-full shrink-0"
                              style={{
                                background: "linear-gradient(135deg, #D4A843, #B8922D)",
                                boxShadow: "0 0 6px rgba(212,168,67,0.3)",
                              }}
                            />
                            <span className="text-base">{t(ritual)}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Timings */}
                  <div
                    className={`flex items-center gap-3 pt-5 mb-4 border-t ${
                      isDark
                        ? "border-white/[0.06] text-cream-300/50"
                        : "border-[#D4A843]/10 text-temple-500"
                    }`}
                  >
                    <Clock className="w-5 h-5 shrink-0" style={{ color: "#D4A843" }} />
                    <span className="text-base font-medium">
                      {t(ghat.timings)}
                    </span>
                  </div>

                  {/* Map link */}
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                      ghat.name.en + " Nashik"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-300 group w-fit hover:gap-3"
                    style={{ color: "#D4A843" }}
                  >
                    <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span>{t(translations.ghatsPage.viewOnMap)}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ════════════ (d) HOW TO REACH THE GHATS ═════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream-50">
        <div className="absolute inset-0 mandala-bg opacity-20" />

        <div className="relative section-container">
          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
              {t(translations.ghatsPage.howToReachSub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a0a00] mb-4">
              {t(translations.ghatsPage.howToReachTitle)}
            </h2>
            <p className="text-temple-500 text-lg max-w-2xl mx-auto">
              {t(translations.ghatsPage.howToReachDesc)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                icon: Car,
                title: translations.ghatsPage.byRoad,
                description: translations.ghatsPage.byRoadDesc,
              },
              {
                icon: Train,
                title: translations.ghatsPage.byRail,
                description: translations.ghatsPage.byRailDesc,
              },
              {
                icon: Bus,
                title: translations.ghatsPage.byAirBus,
                description: translations.ghatsPage.byAirBusDesc,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="relative rounded-2xl p-7 border border-[#D4A843]/10 bg-white group hover:border-[#D4A843]/25 hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-[#D4A843]/15 group-hover:border-[#D4A843]/30 transition-all duration-500"
                      style={{ background: "rgba(212,168,67,0.06)" }}
                    >
                      <Icon className="w-7 h-7" style={{ color: "#D4A843" }} />
                    </div>
                    <h3 className="font-heading font-bold text-[#1a0a00] text-xl mb-3">
                      {t(item.title)}
                    </h3>
                    <p className="text-temple-600 text-sm leading-relaxed">
                      {t(item.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pilgrim Tip callout */}
          <motion.div
            className="max-w-3xl mx-auto mt-10 relative overflow-hidden rounded-2xl p-7 border border-[#D4A843]/20"
            style={{
              background: "linear-gradient(135deg, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 100%)",
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A843] to-[#D4A843]/30" />
            <p className="text-temple-700 leading-relaxed">
              <span className="font-heading font-bold" style={{ color: "#D4A843" }}>
                {t(translations.ghatsPage.pilgrimTipLabel)}
              </span>{" "}
              {t(translations.ghatsPage.pilgrimTip)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ (e) CTA BANNER ═══════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="relative py-24 md:py-32"
          style={{
            background: "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)",
          }}
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

          <div className="relative section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A843]/40" />
                <span className="font-devanagari text-sm" style={{ color: "#D4A843" }}>
                  ॐ
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4A843]/40" />
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream-100 mb-6 leading-tight">
                {t(translations.ghatsPage.ctaHeading)}
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-cream-300/60">
                {t(translations.ghatsPage.ctaDesc)}
              </p>

              <Link href="/guide" className="btn-gold inline-flex items-center gap-2 group">
                {t(translations.ghatsPage.ctaButton)}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

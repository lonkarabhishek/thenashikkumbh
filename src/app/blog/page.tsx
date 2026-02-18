"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────────────── data ───────────────────────────── */

const placeholderPosts = [
  {
    slug: "what-is-kumbh-mela",
    titleKey: "post1Title" as const,
    excerptKey: "post1Excerpt" as const,
    categoryKey: "catGuide" as const,
  },
  {
    slug: "shahi-snan-significance",
    titleKey: "post2Title" as const,
    excerptKey: "post2Excerpt" as const,
    categoryKey: "catSpirituality" as const,
  },
  {
    slug: "nashik-ramayana-connection",
    titleKey: "post3Title" as const,
    excerptKey: "post3Excerpt" as const,
    categoryKey: "catHeritage" as const,
  },
  {
    slug: "godavari-river-significance",
    titleKey: "post4Title" as const,
    excerptKey: "post4Excerpt" as const,
    categoryKey: "catSpirituality" as const,
  },
  {
    slug: "packing-guide-kumbh",
    titleKey: "post5Title" as const,
    excerptKey: "post5Excerpt" as const,
    categoryKey: "catTravel" as const,
  },
  {
    slug: "akhada-tradition",
    titleKey: "post6Title" as const,
    excerptKey: "post6Excerpt" as const,
    categoryKey: "catHeritage" as const,
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function BlogPage() {
  const { t } = useLanguage();
  const bp = translations.blogPage;

  return (
    <>
      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-20 top-20 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-20 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#D4A843", textShadow: "0 0 30px rgba(212,168,67,0.4)" }}
            aria-hidden="true"
          >
            ज्ञान
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(bp.heroTitle)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(bp.heroSubtitle)}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ COMING SOON INTRO ═══════════════════ */}
      <section className="section-dark relative py-12 md:py-16">
        <div className="section-container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#D4A843",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(bp.comingSoon)}
            </span>
            <p className="mt-4 text-lg leading-relaxed text-cream-300/60">
              {t(bp.blogIntro)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ BLOG POSTS GRID ═══════════════════ */}
      <section className="section-dark relative py-8 md:py-16">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="card-dark group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(212,168,67,0.08)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 temple-pattern opacity-[0.02] pointer-events-none" />

                <div className="relative z-10">
                  {/* Image Placeholder */}
                  <div
                    className="mb-4 flex h-48 items-center justify-center rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
                      border: "1px solid rgba(212,168,67,0.1)",
                    }}
                  >
                    <span className="font-heading text-lg" style={{ color: "rgba(212,168,67,0.4)" }}>
                      {t(bp[post.categoryKey])}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(212,168,67,0.1)",
                      color: "#D4A843",
                      border: "1px solid rgba(212,168,67,0.15)",
                    }}
                  >
                    {t(bp[post.categoryKey])}
                  </span>

                  {/* Title */}
                  <h2 className="mb-2 font-heading text-lg font-bold text-cream-100 line-clamp-2">
                    {t(bp[post.titleKey])}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm leading-relaxed text-cream-300/50 line-clamp-3">
                    {t(bp[post.excerptKey])}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cream-300/30">{t(bp.comingSoon)}</span>
                    <span
                      className="inline-flex items-center gap-1 font-semibold transition-colors"
                      style={{ color: "#D4A843" }}
                    >
                      {t(bp.readMore)} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ═══════════════════ NEWSLETTER CTA ═══════════════════ */}
          <motion.div
            className="mt-16 rounded-2xl p-8 text-center md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
              border: "1px solid rgba(212,168,67,0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-4 font-heading text-2xl font-bold text-cream-100 md:text-3xl">
              {t(bp.newsletterTitle)}
            </h3>
            <p className="mx-auto mb-6 max-w-lg text-cream-300/60">
              {t(bp.newsletterDesc)}
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t(bp.emailPlaceholder)}
                className="flex-1 rounded-lg px-4 py-3 text-cream-100 placeholder-cream-300/30 transition-all focus:outline-none focus:ring-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,168,67,0.12)",
                }}
              />
              <button
                type="submit"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {t(bp.subscribe)}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

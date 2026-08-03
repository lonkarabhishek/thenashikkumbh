"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  ExternalLink,
  Filter,
  Mail,
  Newspaper,
  Send,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";
import { blogArticles } from "@/data/blogData";

/* ───────────────────────────── types ───────────────────────────── */

type NewsCategory = "kumbh" | "infra" | "govt" | "culture";

/* sort newest first */
const sortedArticles = [...blogArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/* ───────────────────────────── helpers ───────────────────────── */

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  kumbh: {
    bg: "rgba(245,158,11,0.12)",
    text: "#F59E0B",
    border: "rgba(245,158,11,0.25)",
  },
  infra: {
    bg: "rgba(59,130,246,0.12)",
    text: "#3B82F6",
    border: "rgba(59,130,246,0.25)",
  },
  govt: {
    bg: "rgba(16,185,129,0.12)",
    text: "#10B981",
    border: "rgba(16,185,129,0.25)",
  },
  culture: {
    bg: "rgba(139,92,246,0.12)",
    text: "#8B5CF6",
    border: "rgba(139,92,246,0.25)",
  },
};

const categoryTranslationMap: Record<NewsCategory, "catKumbh" | "catInfra" | "catGovt" | "catCulture"> = {
  kumbh: "catKumbh",
  infra: "catInfra",
  govt: "catGovt",
  culture: "catCulture",
};

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  const localeMap: Record<Locale, string> = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };
  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ───────────────────────────── page ───────────────────────────── */

export default function BlogPage() {
  const { t, locale } = useLanguage();
  const bp = translations.blogPage;
  const bn = translations.blogNews;
  const [activeFilter, setActiveFilter] = useState<"all" | NewsCategory>("all");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles =
    activeFilter === "all"
      ? sortedArticles
      : sortedArticles.filter((a) => a.category === activeFilter);

  const filterOptions: { key: "all" | NewsCategory; label: string }[] = [
    { key: "all", label: locale === "en" ? "All" : locale === "hi" ? "सभी" : "सर्व" },
    { key: "kumbh", label: t(bn.catKumbh) },
    { key: "infra", label: t(bn.catInfra) },
    { key: "govt", label: t(bn.catGovt) },
    { key: "culture", label: t(bn.catCulture) },
  ];

  return (
    <>
      {/* ════════════════════ HERO BANNER ════════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-20 top-20 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-20 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{
              color: "#C9A227",
              textShadow: "0 0 30px rgba(201,162,39,0.4)",
            }}
            aria-hidden="true"
          >
            ज्ञान
          </span>

          <h1
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(bp.heroTitle)}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(bp.heroSubtitle)}
          </p>

          <div
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ════════════════════ NEWS TIMELINE ════════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "rgba(201,162,39,0.1)",
                color: "#C9A227",
                border: "1px solid rgba(201,162,39,0.2)",
              }}
            >
              <Newspaper className="h-4 w-4" />
              {t(bn.latestNews)}
            </div>
            <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-4xl">
              {t(bn.latestNews)}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-cream-300/60">
              {t(bn.newsSubtitle)}
            </p>
          </div>

          {/* Category Filters */}
          <div
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Filter className="mr-1 h-4 w-4 text-cream-300/40" />
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.key;
              const colors = opt.key === "all" ? null : categoryColors[opt.key];
              return (
                <button
                  key={opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: colors?.bg ?? "rgba(201,162,39,0.15)",
                          color: colors?.text ?? "#C9A227",
                          border: `1px solid ${colors?.border ?? "rgba(201,162,39,0.3)"}`,
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.45)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Gold timeline line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-px md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,162,39,0.3) 5%, rgba(201,162,39,0.3) 95%, transparent)",
              }}
            />

            <div className="space-y-8">
              {filteredArticles.map((article) => {
                const colors = categoryColors[article.category] ?? categoryColors.kumbh;
                const catKey = article.category as NewsCategory;
                return (
                  <div
                    key={article.id}
                    className="relative md:pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 top-6 hidden h-5 w-5 -translate-x-1/2 rounded-full md:block"
                      style={{
                        background: colors.bg,
                        border: `2px solid ${colors.text}`,
                        boxShadow: `0 0 12px ${colors.bg}`,
                      }}
                    />

                    {/* Article Card - wrapped in Link */}
                    <Link href={`/blog/${article.slug}`} className="block">
                      <article
                        className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                          border: "1px solid rgba(201,162,39,0.08)",
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(ellipse at top left, ${colors.bg}, transparent 70%)`,
                          }}
                        />

                        <div className="relative z-10 flex flex-col md:flex-row">
                          {/* Article Image */}
                          <div className="relative h-48 w-full flex-shrink-0 overflow-hidden md:h-auto md:w-48 md:rounded-l-xl">
                            <img
                              src={article.image}
                              alt={article.title[locale]}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(11,18,32,0.4)] md:bg-gradient-to-l md:from-transparent md:to-transparent" />
                          </div>

                          <div className="flex-1 p-6 md:p-8">
                            {/* Top Row: Category + Date */}
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                              <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                                style={{
                                  background: colors.bg,
                                  color: colors.text,
                                  border: `1px solid ${colors.border}`,
                                }}
                              >
                                {categoryTranslationMap[catKey]
                                  ? t(bn[categoryTranslationMap[catKey]])
                                  : article.category}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-xs text-cream-300/40">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(article.date, locale)}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-cream-100 md:text-xl">
                              {article.title[locale]}
                            </h3>

                            {/* Summary */}
                            <p className="mb-4 leading-relaxed text-cream-300/55 text-sm md:text-base">
                              {article.summary[locale]}
                            </p>

                            {/* Footer: Source + Read More */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm">
                                <ExternalLink className="h-3.5 w-3.5 text-cream-300/30" />
                                <span className="text-cream-300/30">
                                  {t(bn.source)}:
                                </span>
                                <span style={{ color: "#C9A227" }} className="font-medium">
                                  {article.source}
                                </span>
                              </div>
                              <span
                                className="inline-flex items-center gap-1 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                                style={{ color: "#C9A227" }}
                              >
                                {t(bp.readMore)} <ArrowRight className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ NEWSLETTER ════════════════════ */}
      <section className="section-dark relative pb-20 pt-4 md:pb-28">
        <div className="section-container relative z-10">
          <div className="overflow-hidden rounded-card border border-cream-200/12 bg-cream-50/[0.04]">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-gold-300">
                  <Mail className="h-3.5 w-3.5" />
                  {t(bp.newsletterTitle)}
                </span>

                <h2 className="mt-4 font-heading text-2xl leading-tight text-cream-50 sm:text-3xl">
                  {t(bp.newsletterSubtitle)}
                </h2>

                <p className="mt-3 max-w-prose leading-relaxed text-cream-200/65">
                  {t(bp.newsletterDesc)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-cream-200/55">
                  {[bp.newsletterPromiseDates, bp.newsletterPromiseNoSpam].map((line) => (
                    <li key={line.en} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                      {t(line)}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                className="min-w-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                {subscribed ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-river-400/30 bg-river-500/10 px-5 py-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-river-500/20 text-river-200">
                      <Check className="h-5 w-5" />
                    </span>
                    <p className="text-sm text-cream-100">{t(bp.newsletterThanks)}</p>
                  </div>
                ) : (
                  <>
                    <label htmlFor="kumbh-newsletter" className="sr-only">
                      {t(bp.emailPlaceholder)}
                    </label>
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <input
                        id="kumbh-newsletter"
                        type="email"
                        required
                        placeholder={t(bp.emailPlaceholder)}
                        className="min-w-0 flex-1 rounded-full border border-cream-200/15 bg-indigo-900/50 px-5 py-3.5 text-cream-100 outline-none transition-colors placeholder:text-cream-200/35 focus:border-gold-500/50"
                      />
                      <button type="submit" className="btn-primary shrink-0">
                        <Send className="h-4 w-4" />
                        {t(bp.subscribe)}
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-cream-200/40">
                      {t(bp.newsletterPrivacy)}
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

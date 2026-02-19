"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/i18n/translations";
import { blogArticles, getArticleBySlug } from "@/data/blogData";

/* ───────────── category colors ───────────── */

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  kumbh: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", border: "rgba(245,158,11,0.25)" },
  infra: { bg: "rgba(59,130,246,0.12)", text: "#3B82F6", border: "rgba(59,130,246,0.25)" },
  govt: { bg: "rgba(16,185,129,0.12)", text: "#10B981", border: "rgba(16,185,129,0.25)" },
  culture: { bg: "rgba(139,92,246,0.12)", text: "#8B5CF6", border: "rgba(139,92,246,0.25)" },
  guide: { bg: "rgba(20,184,166,0.12)", text: "#14B8A6", border: "rgba(20,184,166,0.25)" },
};

const categoryLabels: Record<string, Record<Locale, string>> = {
  kumbh: { en: "Kumbh Mela", hi: "कुंभ मेला", mr: "कुंभमेळा" },
  infra: { en: "Infrastructure", hi: "बुनियादी ढाँचा", mr: "पायाभूत सुविधा" },
  govt: { en: "Government", hi: "सरकार", mr: "शासन" },
  culture: { en: "Culture", hi: "संस्कृति", mr: "संस्कृती" },
  guide: { en: "Guide", hi: "गाइड", mr: "मार्गदर्शिका" },
};

function formatDate(dateStr: string, locale: Locale): string {
  const localeMap: Record<Locale, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };
  return new Date(dateStr).toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ───────────── component ───────────── */

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLanguage();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <section className="section-dark flex min-h-screen items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-cream-100">
            Article Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#D4A843" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </div>
      </section>
    );
  }

  const colors = categoryColors[article.category] ?? categoryColors.kumbh;
  const catLabel = categoryLabels[article.category]?.[locale] ?? article.category;

  /* Related articles: same category, excluding current */
  const related = blogArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: article.title[locale], url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      {/* ═══════ HERO IMAGE ═══════ */}
      <section className="section-dark relative overflow-hidden pt-24">
        <div className="relative h-[40vh] min-h-[320px] w-full md:h-[50vh]">
          <img
            src={article.image}
            alt={article.title[locale]}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0906] via-[#0D0906]/60 to-transparent" />

          {/* Back button overlay */}
          <div className="absolute left-0 top-0 z-10 p-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream-100 backdrop-blur-md transition-colors hover:text-[#D4A843]"
              style={{
                background: "rgba(13,9,6,0.6)",
                border: "1px solid rgba(212,168,67,0.15)",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === "en" ? "All News" : locale === "hi" ? "सभी समाचार" : "सर्व बातम्या"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ ARTICLE CONTENT ═══════ */}
      <section className="section-dark relative pb-16">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10 mx-auto max-w-3xl">
          {/* Meta row */}
          <div
            className="-mt-16 relative z-20 mb-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {catLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-cream-300/40">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.date, locale)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-cream-300/40">
                <ExternalLink className="h-3.5 w-3.5" />
                {article.source}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-heading text-3xl font-bold leading-tight text-cream-100 md:text-4xl lg:text-5xl">
              {article.title[locale]}
            </h1>

            {/* Summary */}
            <p
              className="mb-8 text-lg leading-relaxed md:text-xl"
              style={{ color: "rgba(212,168,67,0.7)" }}
            >
              {article.summary[locale]}
            </p>

            <div
              className="gold-line-thick mb-8 w-32 origin-left"
            />
          </div>

          {/* Body content */}
          <div
            className="prose-dark"
          >
            {article.content[locale].split("\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-6 text-base leading-relaxed text-cream-300/70 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share button */}
          <div
            className="mt-12 flex items-center justify-between border-t pt-8"
            style={{ borderColor: "rgba(212,168,67,0.1)" }}
          >
            <span className="text-sm text-cream-300/40">
              {article.source} &middot; {formatDate(article.date, locale)}
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-105"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#D4A843",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              <Share2 className="h-4 w-4" />
              {locale === "en" ? "Share" : locale === "hi" ? "शेयर करें" : "शेअर करा"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ RELATED ARTICLES ═══════ */}
      {related.length > 0 && (
        <section className="section-dark relative pb-16">
          <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
          <div className="section-container relative z-10">
            <h2 className="mb-8 font-heading text-2xl font-bold text-cream-100">
              {locale === "en"
                ? "Related Articles"
                : locale === "hi"
                  ? "संबंधित लेख"
                  : "संबंधित लेख"}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                  <article
                    className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(212,168,67,0.08)",
                    }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title[locale]}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0906] to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 font-heading text-sm font-bold leading-snug text-cream-100 line-clamp-2">
                        {rel.title[locale]}
                      </h3>
                      <span className="text-xs text-cream-300/40">
                        {formatDate(rel.date, locale)}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

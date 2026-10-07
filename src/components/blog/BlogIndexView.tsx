"use client";

import { useMemo, useState } from "react";
import Link from "@/components/LocaleLink";
import JsonLd from "@/components/JsonLd";
import { sectionBreadcrumb } from "@/lib/seo";
import { ArrowRight, ChevronDown, Newspaper, Rss, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import type { Locale } from "@/i18n/translations";
import type { BlogArticle } from "@/data/blogData";
import { formatDate } from "@/lib/dates";
import type { NewsStatus, NewsThumb } from "./newsMeta";
import { CATEGORY_LABEL, NEWS_UI } from "./newsCopy";
import StatusBadge from "./StatusBadge";

export type ArticleCard = Pick<
  BlogArticle,
  "id" | "slug" | "title" | "date" | "summary" | "category" | "source"
> & { status: NewsStatus; thumb: NewsThumb | null };

const COPY = {
  title: { en: "Kumbh News", hi: "कुंभ समाचार", mr: "कुंभ बातम्या" },
  subtitle: {
    en: "News on the Nashik-Trimbakeshwar Simhastha 2027, in plain words. Every story links to where it came from.",
    hi: "नाशिक-त्र्यंबकेश्वर सिंहस्थ 2027 की खबरें, आसान शब्दों में। हर खबर के साथ उसका स्रोत।",
    mr: "नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७ च्या बातम्या, सोप्या शब्दांत. प्रत्येक बातमीसोबत तिचा स्रोत.",
  },
  lastUpdated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  stories: { en: "stories", hi: "खबरें", mr: "बातम्या" },
  topStory: { en: "Top story", hi: "मुख्य खबर", mr: "मुख्य बातमी" },
  older: { en: "Older posts", hi: "पुरानी पोस्ट", mr: "जुन्या पोस्ट" },
  olderNote: {
    en: "These were written before we started linking a source in every story. Read them as background, not as current fact.",
    hi: "ये पोस्ट हर खबर में स्रोत देने की शुरुआत से पहले लिखी गई थीं। इन्हें मौजूदा तथ्य नहीं, पृष्ठभूमि की तरह पढ़ें।",
    mr: "प्रत्येक बातमीत स्रोत देण्यास सुरुवात करण्यापूर्वी या पोस्ट लिहिल्या होत्या. त्या सध्याची माहिती म्हणून नव्हे, पार्श्वभूमी म्हणून वाचा.",
  },
  followTitle: { en: "Keep up with the Kumbh", hi: "कुंभ की हर खबर पाएँ", mr: "कुंभमेळ्याची प्रत्येक बातमी मिळवा" },
  followBody: {
    en: "Add our feed to any news reader, or ask Kumbh Sahayak for the latest in your language.",
    hi: "हमारा फ़ीड किसी भी न्यूज़ रीडर में जोड़ें, या कुंभ सहायक से अपनी भाषा में ताज़ा खबर पूछें।",
    mr: "आमचा फीड कोणत्याही न्यूज रीडरमध्ये जोडा, किंवा कुंभ सहायकाला तुमच्या भाषेत ताज्या बातम्या विचारा.",
  },
  rss: { en: "RSS feed", hi: "RSS फ़ीड", mr: "RSS फीड" },
  ask: { en: "Ask Sahayak", hi: "सहायक से पूछें", mr: "सहायकाला विचारा" },
};

type Filter = "all" | BlogArticle["category"];

export default function BlogIndexView({ articles }: { articles: ArticleCard[] }) {
  const { t, locale } = useLanguage();
  const { openWithTopic } = useChat();
  const [filter, setFilter] = useState<Filter>("all");

  const sourced = useMemo(() => articles.filter((a) => a.status !== null), [articles]);
  const older = useMemo(() => articles.filter((a) => a.status === null), [articles]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: sourced.length };
    for (const a of sourced) c[a.category] = (c[a.category] ?? 0) + 1;
    return c;
  }, [sourced]);

  const shown = filter === "all" ? sourced : sourced.filter((a) => a.category === filter);
  const [lead, ...rest] = shown;

  // Group the rest by publish date, newest first (input is already sorted).
  const groups = useMemo(() => {
    const map = new Map<string, ArticleCard[]>();
    for (const a of rest) map.set(a.date, [...(map.get(a.date) ?? []), a]);
    return Array.from(map.entries());
  }, [rest]);

  const latestDate = sourced[0]?.date;
  const feedHref = locale === "en" ? "/feed" : `/${locale}/feed`;
  const filters: Filter[] = ["all", "kumbh", "infra", "govt", "culture"];

  return (
    <>
      <JsonLd data={sectionBreadcrumb(locale, "blog", "/blog")} />

      {/* ══════ Masthead ══════ */}
      <header className="section-dark relative overflow-hidden pb-10 pt-32 md:pb-14 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 80% at 20% 0%, rgba(201,162,39,0.14), transparent 70%)" }}
        />
        <div className="section-container relative z-10 max-w-5xl">
          <p className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-gold-300">
            <Newspaper className="h-3.5 w-3.5" />
            {t(NEWS_UI.desk)}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-cream-50 md:text-6xl">{t(COPY.title)}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-200/75">{t(COPY.subtitle)}</p>
          {latestDate && (
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream-200/60">
              <span className="inline-flex items-center gap-2">
                <span className="live-dot text-river-400" aria-hidden />
                {t(COPY.lastUpdated)}:{" "}
                <time dateTime={latestDate} className="font-semibold text-cream-100">
                  {formatDate(latestDate, locale)}
                </time>
              </span>
              <span aria-hidden>·</span>
              <span>
                {sourced.length} {t(COPY.stories)}
              </span>
              <span aria-hidden>·</span>
              <a href={feedHref} className="inline-flex items-center gap-1.5 hover:text-gold-300">
                <Rss className="h-3.5 w-3.5" />
                {t(COPY.rss)}
              </a>
            </p>
          )}
        </div>
      </header>

      <div className="bg-cream-50">
        {/* ══════ Category tabs ══════ */}
        <nav
          aria-label={t(COPY.title)}
          className="sticky top-16 z-20 border-b border-temple-100 bg-cream-50/95 backdrop-blur md:top-[4.5rem]"
        >
          <div className="section-container max-w-5xl">
            <div className="scrollbar-hide -mx-4 flex gap-1 overflow-x-auto px-4 py-3">
              {filters
                .filter((f) => counts[f])
                .map((f) => {
                  const active = filter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      aria-pressed={active}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-temple-900 text-cream-50"
                          : "text-temple-600 hover:bg-cream-200 hover:text-temple-900"
                      }`}
                    >
                      {f === "all" ? t(NEWS_UI.all) : t(CATEGORY_LABEL[f])}
                      <span className={`ml-1.5 text-xs ${active ? "text-cream-200/70" : "text-temple-400"}`}>
                        {counts[f]}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </nav>

        <div className="section-container max-w-5xl py-10 md:py-14">
          {/* ══════ Lead story ══════ */}
          {lead && <LeadStory article={lead} locale={locale} label={t(COPY.topStory)} />}

          {/* ══════ Stories by day ══════ */}
          {groups.map(([date, items]) => (
            <section key={date} className="mt-12 md:mt-16" aria-labelledby={`day-${date}`}>
              <h2
                id={`day-${date}`}
                className="flex items-baseline justify-between gap-4 border-b-2 border-temple-900 pb-2 font-heading text-xl font-bold text-temple-900"
              >
                <time dateTime={date}>{formatDate(date, locale, { weekday: true })}</time>
                <span className="text-xs font-semibold uppercase tracking-wider text-temple-400">
                  {items.length} {t(COPY.stories)}
                </span>
              </h2>
              <ul className="divide-y divide-temple-100">
                {items.map((a) => (
                  <li key={a.id}>
                    <StoryRow article={a} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* ══════ Older, unsourced posts ══════ */}
          {filter === "all" && older.length > 0 && (
            <details className="group mt-16 rounded-card border border-temple-100 bg-cream-100/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-temple-800 sm:px-6">
                <span>
                  {t(COPY.older)} <span className="text-temple-400">({older.length})</span>
                </span>
                <ChevronDown className="h-5 w-5 text-temple-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-temple-100 px-5 pb-2 sm:px-6">
                <p className="py-4 text-sm leading-relaxed text-temple-500">{t(COPY.olderNote)}</p>
                <ul className="divide-y divide-temple-100">
                  {older.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/blog/${a.slug}`}
                        className="flex items-baseline justify-between gap-4 py-3 text-temple-700 hover:text-saffron-700"
                      >
                        <span className="font-medium">{a.title[locale]}</span>
                        <time dateTime={a.date} className="shrink-0 text-xs text-temple-400">
                          {formatDate(a.date, locale, { short: true })}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}

          {/* ══════ Follow ══════ */}
          <aside className="mt-16 flex flex-col gap-6 rounded-card bg-temple-900 p-6 text-cream-50 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl text-cream-50">{t(COPY.followTitle)}</h2>
              <p className="mt-2 leading-relaxed text-cream-200/75">{t(COPY.followBody)}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button onClick={() => openWithTopic("latest-news")} className="btn-primary">
                <Sparkles className="h-4 w-4" />
                {t(COPY.ask)}
              </button>
              <a
                href={feedHref}
                className="inline-flex items-center gap-2 rounded-full border border-cream-200/25 px-5 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <Rss className="h-4 w-4" />
                {t(COPY.rss)}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Thumb({ thumb, className, sizes }: { thumb: NewsThumb | null; className: string; sizes?: string }) {
  if (!thumb) return <div className={`${className} bg-cream-200`} aria-hidden />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumb.src}
      alt={thumb.alt}
      width={thumb.width}
      height={thumb.height}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={`${className} object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
    />
  );
}

function Meta({ article, locale }: { article: ArticleCard; locale: Locale }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-temple-500">
      {article.status && <StatusBadge status={article.status} />}
      <span className="font-semibold uppercase tracking-wider text-saffron-700">
        {CATEGORY_LABEL[article.category]?.[locale] ?? article.category}
      </span>
      <span aria-hidden className="text-temple-300">
        ·
      </span>
      <span>{article.source}</span>
    </p>
  );
}

function LeadStory({ article, locale, label }: { article: ArticleCard; locale: Locale; label: string }) {
  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-10">
        <div className="relative overflow-hidden rounded-card">
          <Thumb thumb={article.thumb} className="aspect-[16/10] w-full" sizes="(min-width: 768px) 560px, 100vw" />
          <span className="absolute left-3 top-3 rounded-full bg-temple-900/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream-50 backdrop-blur">
            {label}
          </span>
        </div>
        <div>
          <Meta article={article} locale={locale} />
          <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-temple-900 transition-colors group-hover:text-saffron-700 md:text-[2.125rem]">
            {article.title[locale]}
          </h2>
          <p className="mt-4 leading-relaxed text-temple-600 md:text-lg">{article.summary[locale]}</p>
          <p className="mt-5 flex items-center gap-3 text-sm text-temple-500">
            <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
            <span className="inline-flex items-center gap-1 font-semibold text-saffron-700">
              {NEWS_UI.read[locale]}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}

function StoryRow({ article, locale }: { article: ArticleCard; locale: Locale }) {
  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="flex gap-4 py-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          <Meta article={article} locale={locale} />
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-temple-900 transition-colors group-hover:text-saffron-700 md:text-xl">
            {article.title[locale]}
          </h3>
          <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-temple-600">
            {article.summary[locale]}
          </p>
        </div>
        <div className="w-24 shrink-0 overflow-hidden rounded-xl sm:w-40">
          <Thumb thumb={article.thumb} className="aspect-square w-full sm:aspect-[4/3]" sizes="160px" />
        </div>
      </Link>
    </article>
  );
}

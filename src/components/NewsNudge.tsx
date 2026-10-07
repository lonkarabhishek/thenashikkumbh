"use client";

import Link from "@/components/LocaleLink";
import { ArrowRight, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import { formatDate as fmtDate } from "@/lib/dates";

const COPY = {
  kicker: { en: "Latest news", hi: "ताज़ा समाचार", mr: "ताज्या बातम्या" },
  title: {
    en: "News from the Simhastha preparations",
    hi: "सिंहस्थ की तैयारियों से जुड़ी खबरें",
    mr: "सिंहस्थ तयारीच्या बातम्या",
  },
  all: { en: "All news", hi: "सभी समाचार", mr: "सर्व बातम्या" },
  updated: { en: "Updated", hi: "अपडेट", mr: "अद्ययावत" },
};

/** Only what the box shows; the server passes it in so the full text of
 * every post stays out of the home page's JavaScript. */
export interface NewsHeadline {
  slug: string;
  date: string;
  title: { en: string; hi: string; mr: string };
}

/**
 * A home-page pointer to the news section: headlines only, no summaries, so
 * it reads as a nudge rather than a second copy of /blog.
 */
export default function NewsNudge({ items: latest }: { items: NewsHeadline[] }) {
  const { locale, t } = useLanguage();

  return (
    <section className="section-container pb-20 sm:pb-28" aria-labelledby="news-nudge-title">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">{t(COPY.kicker)}</span>
          {latest[0] && (
            <span className="ml-4 inline-flex items-center gap-2 align-middle text-xs font-medium text-temple-500">
              <span className="live-dot text-river-500" aria-hidden />
              {t(COPY.updated)} {fmtDate(latest[0].date, locale, { short: true })}
            </span>
          )}
          <h2 id="news-nudge-title" className="mt-5 text-title">
            {t(COPY.title)}
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
        >
          {t(COPY.all)}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <ul className="mt-10 overflow-hidden rounded-card border border-temple-100">
        {latest.map((article, i) => (
          <Reveal
            as="li"
            key={article.slug}
            delay={i * 60}
            className="border-b border-temple-100 last:border-b-0"
          >
            <Link
              href={`/blog/${article.slug}`}
              className="group flex items-start gap-4 bg-cream-50 p-5 transition-colors hover:bg-saffron-50 sm:items-center sm:gap-6 sm:p-6"
            >
              <Newspaper className="mt-0.5 h-5 w-5 shrink-0 text-saffron-600 sm:mt-0" />
              <time
                dateTime={article.date}
                className="hidden w-32 shrink-0 text-sm text-temple-400 sm:block"
              >
                {fmtDate(article.date, locale, { short: true })}
              </time>
              <span className="min-w-0 flex-1 font-semibold leading-snug text-temple-900 group-hover:text-saffron-800">
                {article.title[locale]}
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-temple-300 transition-transform group-hover:translate-x-1 group-hover:text-saffron-700 sm:mt-0" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import StatusBadge from "@/components/blog/StatusBadge";
import { formatDate as fmtDate } from "@/lib/dates";

const COPY = {
  kicker: { en: "Latest news", hi: "ताज़ा समाचार", mr: "ताज्या बातम्या" },
  title: {
    en: "Latest Nashik Kumbh 2027 news",
    hi: "नाशिक कुंभ 2027 की ताज़ा खबरें",
    mr: "नाशिक कुंभमेळा 2027 च्या ताज्या बातम्या",
  },
  all: { en: "See all news", hi: "सभी समाचार देखें", mr: "सर्व बातम्या पाहा" },
};

/** What one card needs; the server passes it in so post bodies stay out of the JS. */
export interface LatestItem {
  slug: string;
  date: string;
  title: { en: string; hi: string; mr: string };
  summary: { en: string; hi: string; mr: string };
  status: "confirmed" | "reported" | null;
}

/** Newest posts, straight under the hero. Plain server-rendered HTML: no images, no animation, fixed layout. */
export default function LatestNews({ items }: { items: LatestItem[] }) {
  const { locale, t } = useLanguage();
  return (
    <section className="section-container py-10 sm:py-14" aria-labelledby="latest-news-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">{t(COPY.kicker)}</span>
          <h2 id="latest-news-title" className="mt-3 text-title">
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
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <li key={a.slug} className="flex">
            <Link
              href={`/blog/${a.slug}`}
              className="group flex w-full flex-col rounded-card border border-temple-100 bg-cream-50 p-5 transition-colors hover:bg-saffron-50"
            >
              <span className="flex flex-wrap items-center gap-2 text-xs text-temple-400">
                <time dateTime={a.date}>{fmtDate(a.date, locale, { short: true })}</time>
                {a.status && <StatusBadge status={a.status} />}
              </span>
              <span className="mt-2 font-semibold leading-snug text-temple-900 group-hover:text-saffron-800">
                {a.title[locale]}
              </span>
              <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-temple-500">
                {a.summary[locale]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center sm:hidden">
        <Link href="/blog" className="btn-secondary">
          {t(COPY.all)}
        </Link>
      </div>
    </section>
  );
}

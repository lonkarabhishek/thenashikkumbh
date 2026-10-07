"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import { ArrowLeft, ArrowUpRight, Check, Clock, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/i18n/translations";
import { NEWS_AUTHOR, type BlogArticle } from "@/data/blogData";
import RichText from "@/components/RichText";
import PhotoCredit from "@/components/photos/PhotoCredit";
import { getPhoto, isPhotoAvailable } from "@/data/photos";
import { formatDate } from "@/lib/dates";
import type { NewsStatus, NewsThumb } from "./newsMeta";
import { CATEGORY_LABEL, NEWS_UI, STATUS_HINT } from "./newsCopy";
import StatusBadge from "./StatusBadge";

export type RelatedArticle = Pick<BlogArticle, "id" | "slug" | "title" | "date" | "category"> & {
  thumb: NewsThumb | null;
};

export default function BlogArticleView({
  article,
  status = null,
  thumb = null,
  minutes,
  related,
}: {
  article: BlogArticle | undefined;
  status?: NewsStatus;
  thumb?: NewsThumb | null;
  minutes?: Record<Locale, number>;
  related: RelatedArticle[];
}) {
  const { locale, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-cream-50 pt-32">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-temple-900">Article not found</h1>
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-saffron-700">
            <ArrowLeft className="h-4 w-4" />
            {t(NEWS_UI.allNews)}
          </Link>
        </div>
      </section>
    );
  }

  // The story's own photo carries a caption and credit; a category stand-in
  // is decorative and only shown in lists.
  const photo = thumb?.own && article.photoId && isPhotoAvailable(article.photoId) ? getPhoto(article.photoId) : undefined;
  const updated = article.updated && article.updated !== article.date ? article.updated : undefined;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title[locale], url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The reader closed the share sheet; nothing to do.
    }
  };

  return (
    <div className="bg-cream-50">
      <article className="pb-16 pt-28 md:pb-24 md:pt-36">
        {/* ══════ Header ══════ */}
        <header className="mx-auto max-w-[46rem] px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-temple-600 transition-colors hover:text-saffron-700"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(NEWS_UI.allNews)}
            </Link>
            <span aria-hidden className="text-temple-300">
              /
            </span>
            <span className="font-semibold uppercase tracking-wider text-saffron-700">
              {CATEGORY_LABEL[article.category]?.[locale] ?? article.category}
            </span>
          </nav>

          <h1 className="mt-6 font-heading text-[2rem] font-bold leading-[1.15] text-temple-900 text-balance md:text-[2.75rem]">
            {article.title[locale]}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-temple-600 md:text-xl">{article.summary[locale]}</p>

          {/* Byline */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-temple-100 py-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-temple-900 font-heading text-sm font-bold text-cream-50"
              >
                NK
              </span>
              <div className="text-sm leading-snug">
                <p className="text-temple-800">
                  {t(NEWS_UI.by)}{" "}
                  <Link href={NEWS_AUTHOR.path} className="font-semibold hover:text-saffron-700">
                    {NEWS_AUTHOR.name}
                  </Link>
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-temple-500">
                  <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                  {updated && (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        {t(NEWS_UI.updated)} <time dateTime={updated}>{formatDate(updated, locale)}</time>
                      </span>
                    </>
                  )}
                  {minutes && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {minutes[locale]} {t(NEWS_UI.minRead)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-temple-200 px-4 py-2 text-sm font-semibold text-temple-700 transition-colors hover:border-saffron-400 hover:text-saffron-700"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? t(NEWS_UI.copied) : t(NEWS_UI.share)}
            </button>
          </div>

          {/* What kind of story this is */}
          {status && (
            <div
              className={`mt-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                status === "confirmed" ? "bg-river-50 text-river-900" : "bg-saffron-50 text-saffron-900"
              }`}
            >
              <StatusBadge status={status} size="md" />
              <span className="pt-0.5">{STATUS_HINT[status][locale]}</span>
            </div>
          )}
          {article.originallyAnnounced && (
            <p className="mt-4 text-sm text-temple-500">
              {t(NEWS_UI.originally)}{" "}
              <time dateTime={article.originallyAnnounced}>{formatDate(article.originallyAnnounced, locale)}</time>
            </p>
          )}
        </header>

        {/* ══════ Photo ══════ */}
        {photo && (
          <figure className="mx-auto mt-10 max-w-[60rem] px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.file}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              fetchPriority="high"
              className="h-auto w-full rounded-card"
            />
            <figcaption className="mx-auto mt-3 max-w-[46rem] text-sm text-temple-500">
              {photo.caption}
              <PhotoCredit photo={photo} className="mt-1 text-temple-400" />
            </figcaption>
          </figure>
        )}

        {/* ══════ Body ══════ */}
        <div className="mx-auto mt-10 max-w-[46rem] px-4 sm:px-6">
          <RichText text={article.content[locale]} tone="light" />

          {/* Sources */}
          {article.sources && article.sources.length > 0 && (
            <aside
              className="mt-12 rounded-card border border-temple-100 bg-cream-100/70 p-5 sm:p-6"
              aria-labelledby="sources-title"
            >
              <h2 id="sources-title" className="font-heading text-lg font-bold text-temple-900">
                {t(NEWS_UI.sourcesTitle)}
              </h2>
              <ol className="mt-4 space-y-4">
                {article.sources.map((src) => (
                  <li key={src.url} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-1 font-semibold text-temple-800 hover:text-saffron-700"
                      >
                        <span className="underline decoration-temple-200 underline-offset-4 group-hover:decoration-saffron-400">
                          {src.title}
                        </span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
                      </a>
                      <p className="mt-0.5 text-sm text-temple-500">
                        {src.publisher} · <time dateTime={src.date}>{formatDate(src.date, locale)}</time>
                      </p>
                    </div>
                    <span className="shrink-0">
                      <StatusBadge status={src.status} />
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </article>

      {/* ══════ More news ══════ */}
      {related.length > 0 && (
        <section className="border-t border-temple-100 bg-cream-100/60 py-14 md:py-20">
          <div className="section-container max-w-5xl">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-2xl font-bold text-temple-900">{t(NEWS_UI.more)}</h2>
              <Link href="/blog" className="text-sm font-semibold text-saffron-700 hover:underline">
                {t(NEWS_UI.allNews)}
              </Link>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl bg-cream-200">
                    {rel.thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rel.thumb.src}
                        alt={rel.thumb.alt}
                        width={rel.thumb.width}
                        height={rel.thumb.height}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-saffron-700">
                    {CATEGORY_LABEL[rel.category]?.[locale] ?? rel.category}
                  </p>
                  <h3 className="mt-1.5 font-heading text-lg font-bold leading-snug text-temple-900 transition-colors group-hover:text-saffron-700">
                    {rel.title[locale]}
                  </h3>
                  <time dateTime={rel.date} className="mt-2 block text-sm text-temple-500">
                    {formatDate(rel.date, locale)}
                  </time>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

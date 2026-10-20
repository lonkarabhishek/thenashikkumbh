"use client";

import { useEffect, useState } from "react";
import Link from "@/components/LocaleLink";
import AuthorBox from "@/components/trust/AuthorBox";
import DatesCanonicalNote from "@/components/trust/DatesCanonicalNote";
import { DATE_INTENT_SLUGS } from "@/data/siteOwner";
import NewsRelatedGuides from "@/components/seo/NewsRelatedGuides";
import { ArrowLeft, ArrowUpRight, Check, Clock, Copy, MessageCircle, Share2 } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrl";
import { ogImageFor } from "@/lib/seo";
import { buildShareMessage, smsHref, smsSeparator, whatsappHref, xHref } from "@/lib/share";
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
  // "&" (iOS and most Androids) until the browser tells us it is Android.
  const [smsSep, setSmsSep] = useState<"&" | "?">("&");
  useEffect(() => {
    setSmsSep(smsSeparator(navigator.userAgent));
  }, []);

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

  // Title, short summary and link, in the language this page is read in.
  const shareMsg = buildShareMessage(
    article.title[locale],
    article.summary[locale],
    `${SITE_URL}/${locale}/blog/${article.slug}`
  );

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMsg.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing else to do.
    }
  };

  const shareImagePath = article.shareImage?.[locale] ?? (article.image ? ogImageFor(article.image) : undefined);
  const shareImageFile = async (): Promise<File[] | undefined> => {
    if (!shareImagePath || typeof File === "undefined" || !navigator.canShare) return undefined;
    try {
      const res = await fetch(shareImagePath);
      if (!res.ok) return undefined;
      const blob = await res.blob();
      const name = shareImagePath.split("/").pop() || "share.jpg";
      return [new File([blob], name, { type: blob.type || "image/jpeg" })];
    } catch {
      return undefined;
    }
  };

  const share = async () => {
    try {
      if (navigator.share) {
        // Attach the post's share image as a file where the browser allows it
        // (mobile WhatsApp etc. then send the picture with the message).
        const files = await shareImageFile();
        if (files && navigator.canShare?.({ files })) {
          await navigator.share({ title: shareMsg.title, text: shareMsg.full, files });
          return;
        }
        await navigator.share({ title: shareMsg.title, text: shareMsg.textOnly, url: shareMsg.url });
        return;
      }
    } catch (err) {
      // The reader closed the share sheet.
      if ((err as DOMException)?.name === "AbortError") return;
    }
    await copyMessage();
  };

  const shareLinkClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-temple-200 text-temple-700 transition-colors hover:border-saffron-400 hover:text-saffron-700";

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
<div className="flex flex-wrap items-center gap-2">
              <button
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-temple-200 px-4 py-2 text-sm font-semibold text-temple-700 transition-colors hover:border-saffron-400 hover:text-saffron-700"
              >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? t(NEWS_UI.copied) : t(NEWS_UI.share)}
              </button>
              <a
                href={whatsappHref(shareMsg)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(NEWS_UI.shareWhatsapp)}
                title={t(NEWS_UI.shareWhatsapp)}
                data-share="whatsapp"
                className={shareLinkClass}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.8 9.8 0 1 1 8.33 4.6zm8.35-18.16A11.75 11.75 0 0 0 12.04.17C5.5.17.2 5.46.2 12c0 2.09.55 4.12 1.59 5.92L.1 24l6.23-1.63a11.8 11.8 0 0 0 5.7 1.45h.01c6.53 0 11.84-5.3 11.84-11.83 0-3.16-1.23-6.13-3.47-8.36z" />
                </svg>
              </a>
              <a
                href={smsHref(shareMsg, smsSep)}
                aria-label={t(NEWS_UI.shareSms)}
                title={t(NEWS_UI.shareSms)}
                data-share="sms"
                className={shareLinkClass}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={xHref(shareMsg)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                title="X"
                data-share="x"
                className={shareLinkClass}
              >
                <span aria-hidden className="text-sm font-bold leading-none">𝕏</span>
              </a>
              <button
                onClick={copyMessage}
                aria-label={t(NEWS_UI.copyMessage)}
                title={t(NEWS_UI.copyMessage)}
                className={shareLinkClass}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
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
          {DATE_INTENT_SLUGS.includes(article.slug) && <DatesCanonicalNote />}
          <RichText text={article.content[locale]} tone="light" />

          {article.greeting && (
            <aside className="mt-10 rounded-card border border-saffron-200 bg-saffron-50 p-5 sm:p-6" aria-label="greeting">
              <p className="whitespace-pre-line text-lg leading-relaxed text-temple-900">{article.greeting[locale]}</p>
              <a
                href={whatsappHref(buildShareMessage(article.greeting[locale], undefined, shareMsg.url))}
                target="_blank"
                rel="noopener noreferrer"
                data-share="whatsapp-greeting"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {t({ en: "Send this greeting on WhatsApp", hi: "यह शुभकामना व्हॉट्सऐप पर भेजें", mr: "ही शुभेच्छा व्हॉट्सॲपवर पाठवा" })}
              </a>
            </aside>
          )}

          {article.faq && article.faq.length > 0 && (
            <section className="mt-12" aria-labelledby="faq-title">
              <h2 id="faq-title" className="font-heading text-2xl font-bold text-temple-900">
                {t({ en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल", mr: "नेहमी विचारले जाणारे प्रश्न" })}
              </h2>
              <div className="mt-5 divide-y divide-temple-100 rounded-card border border-temple-100 bg-cream-50">
                {article.faq.map((f) => (
                  <div key={f.q.en} className="p-5">
                    <h3 className="font-semibold text-temple-900">{f.q[locale]}</h3>
                    <p className="mt-2 leading-relaxed text-temple-600">{f.a[locale]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <AuthorBox />

          {/* Sources */}
          <NewsRelatedGuides currentSlug={article.slug} />

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

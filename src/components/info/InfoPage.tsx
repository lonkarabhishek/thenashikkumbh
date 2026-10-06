import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import RichText from "@/components/RichText";
import CommonsPhoto from "@/components/photos/CommonsPhoto";
import type { InfoPageContent } from "@/content/pages/types";
import type { Locale } from "@/i18n/translations";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const UI = {
  updated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  sources: { en: "Sources", hi: "स्रोत", mr: "स्रोत" },
  confirmed: { en: "Confirmed (official)", hi: "पुष्ट (आधिकारिक)", mr: "पुष्टी (अधिकृत)" },
  reported: { en: "Reported (media)", hi: "रिपोर्ट (मीडिया)", mr: "वृत्त (माध्यमे)" },
  independent: {
    en: "The Nashik Kumbh is an independent guide, not an official government website.",
    hi: "द नाशिक कुंभ एक स्वतंत्र मार्गदर्शिका है, आधिकारिक सरकारी वेबसाइट नहीं।",
    mr: "द नाशिक कुंभ ही स्वतंत्र मार्गदर्शिका आहे, अधिकृत सरकारी संकेतस्थळ नाही.",
  },
};

const DATE_LOCALE: Record<Locale, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

function formatDate(iso: string, locale: Locale) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function infoPageMetadata(page: InfoPageContent, locale: Locale): Metadata {
  return pageMetadata({
    locale,
    title: page.seoTitle[locale],
    description: page.description[locale],
    path: page.path,
    absoluteTitle: true,
  });
}

/** Server-rendered long-form page: H1, last updated, sections, sources. */
export default function InfoPage({ page, locale }: { page: InfoPageContent; locale: Locale }) {
  const photos = page.photoIds ?? [];

  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pt-36">
      <JsonLd data={breadcrumbSchema(locale, [{ name: page.crumb[locale], path: page.path }])} />
      <article className="section-container mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight text-temple-900 md:text-5xl">
          {page.h1[locale]}
        </h1>
        <p className="mt-3 text-sm text-temple-500">
          {UI.updated[locale]}: <time dateTime={page.updated}>{formatDate(page.updated, locale)}</time>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-temple-700 md:text-xl">{page.intro[locale]}</p>

        {photos[0] !== undefined && <CommonsPhoto id={photos[0]} priority className="mt-8" />}

        {page.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-4 mt-12 font-heading text-2xl font-bold text-temple-900 md:text-3xl">
              {section.heading[locale]}
            </h2>
            <RichText text={section.body[locale]} tone="light" />
            {i === 1 && photos[1] !== undefined && <CommonsPhoto id={photos[1]} className="my-8" />}
          </section>
        ))}

        {page.sources.length > 0 && (
          <aside className="mt-12 rounded-2xl border border-temple-100 bg-cream-100 p-6" aria-labelledby="page-sources">
            <h2 id="page-sources" className="font-heading text-lg font-bold text-temple-900">
              {UI.sources[locale]}
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-temple-700">
              {page.sources.map((src) => (
                <li key={src.url} className="leading-snug">
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="rich-link text-[#a0522d]">
                    {src.title}
                  </a>
                  <span className="block text-xs text-temple-500">
                    {src.publisher} · {formatDate(src.date, locale)} ·{" "}
                    {src.status === "confirmed" ? UI.confirmed[locale] : UI.reported[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        )}
        <p className="mt-8 text-xs text-temple-400">{UI.independent[locale]}</p>
      </article>
    </div>
  );
}

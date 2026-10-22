import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import RichText from "@/components/RichText";
import ForwardCard from "@/components/share/ForwardCard";
import CommonsPhoto from "@/components/photos/CommonsPhoto";
import type { InfoPageContent } from "@/content/pages/types";
import type { Locale } from "@/i18n/translations";
import { SITE_NAME, SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import { formatDate as fmtDate } from "@/lib/dates";

const UI = {
  updated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  sources: { en: "Sources", hi: "स्रोत", mr: "स्रोत" },
  confirmed: { en: "Confirmed (official)", hi: "पुष्ट (आधिकारिक)", mr: "पुष्टी (अधिकृत)" },
  reported: { en: "Reported (media)", hi: "रिपोर्ट (मीडिया)", mr: "वृत्त (माध्यमे)" },
  live: { en: "Live updates", hi: "लाइव अपडेट", mr: "थेट अपडेट" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल", mr: "नेहमी विचारले जाणारे प्रश्न" },
  statusConfirmed: { en: "CONFIRMED", hi: "पुष्ट", mr: "अधिकृत" },
  statusReported: { en: "REPORTED", hi: "रिपोर्ट", mr: "वृत्त" },
  independent: {
    en: "The Nashik Kumbh is an independent guide, not an official government website.",
    hi: "द नाशिक कुंभ एक स्वतंत्र मार्गदर्शिका है, आधिकारिक सरकारी वेबसाइट नहीं।",
    mr: "द नाशिक कुंभ ही स्वतंत्र मार्गदर्शिका आहे, अधिकृत सरकारी संकेतस्थळ नाही.",
  },
};

function formatDate(iso: string, locale: Locale) {
  return fmtDate(iso, locale);
}

/** "21 Oct, 4:30 PM IST" style stamp for a live update, always in IST. */
function formatStamp(iso: string, locale: Locale) {
  const tag = locale === "en" ? "en-IN" : locale === "hi" ? "hi-IN" : "mr-IN";
  const d = new Date(iso);
  const day = d.toLocaleDateString(tag, { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  const time = d.toLocaleTimeString(tag, { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  return `${day}, ${time} IST`;
}

export function infoPageMetadata(page: InfoPageContent, locale: Locale): Metadata {
  return pageMetadata({
    locale,
    title: page.seoTitle[locale],
    description: page.description[locale],
    path: page.path,
    absoluteTitle: true,
    ...(page.shareImage ? { image: page.shareImage[locale] } : {}),
  });
}

/** Server-rendered long-form page: H1, last updated, sections, sources. */
export default function InfoPage({ page, locale }: { page: InfoPageContent; locale: Locale }) {
  const photos = page.photoIds ?? [];
  const updates = page.liveUpdates ?? [];
  const url = localeUrl(locale, page.path);
  const liveSchema =
    page.liveEvent && updates.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "LiveBlogPosting",
          "@id": `${url}#live`,
          url,
          headline: page.h1[locale],
          description: page.description[locale],
          inLanguage: locale,
          datePublished: updates[updates.length - 1].time,
          dateModified: updates[0].time,
          coverageStartTime: page.liveEvent.start,
          coverageEndTime: page.liveEvent.end,
          image: [`${SITE_URL}${page.shareImage?.[locale] ?? "/images/og-image.jpg"}`],
          author: { "@type": "Organization", name: "The Nashik Kumbh Desk", url: localeUrl(locale, "/about") },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
          },
          about: {
            "@type": "Event",
            name: page.liveEvent.name[locale],
            startDate: page.liveEvent.start,
            endDate: page.liveEvent.end,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: { "@type": "Place", name: page.liveEvent.location, address: page.liveEvent.location },
          },
          liveBlogUpdate: updates.map((u) => ({
            "@type": "BlogPosting",
            headline: u.headline[locale],
            articleBody: u.body[locale],
            datePublished: u.time,
            url: `${url}#update-${u.time.slice(0, 16).replace(/[^0-9]/g, "")}`,
          })),
        }
      : null;

  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pt-36">
      <JsonLd data={breadcrumbSchema(locale, [{ name: page.crumb[locale], path: page.path }])} />
      {liveSchema && <JsonLd data={liveSchema} />}
      {page.faq && page.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
              "@type": "Question",
              name: f.q[locale],
              acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
            })),
          }}
        />
      )}
      <article className="section-container mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight text-temple-900 md:text-5xl">
          {page.h1[locale]}
        </h1>
        <p className="mt-3 text-sm text-temple-500">
          {UI.updated[locale]}: <time dateTime={page.updated}>{formatDate(page.updated, locale)}</time>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-temple-700 md:text-xl">{page.intro[locale]}</p>

        {photos[0] !== undefined && <CommonsPhoto id={photos[0]} priority className="mt-8" />}

        {updates.length > 0 && (
          <section id="live" className="mt-10 rounded-2xl border border-saffron-200 bg-saffron-50 p-5 sm:p-6" aria-labelledby="live-title">
            <h2 id="live-title" className="flex items-center gap-2 font-heading text-2xl font-bold text-temple-900">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-600" aria-hidden="true" />
              {UI.live[locale]}
            </h2>
            <ol className="mt-4 space-y-5 border-l-2 border-saffron-300 pl-4">
              {updates.map((u) => (
                <li key={u.time} id={`update-${u.time.slice(0, 16).replace(/[^0-9]/g, "")}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-temple-500">
                    <time dateTime={u.time}>{formatStamp(u.time, locale)}</time> ·{" "}
                    <span className={u.status === "confirmed" ? "text-green-700" : "text-amber-700"}>
                      {u.status === "confirmed" ? UI.statusConfirmed[locale] : UI.statusReported[locale]}
                    </span>
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold text-temple-900">{u.headline[locale]}</h3>
                  <div className="mt-1">
                    <RichText text={u.body[locale]} tone="light" />
                  </div>
                  <p className="mt-1 text-xs text-temple-500">{u.source}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {page.pinnedCards && page.pinnedCards.length > 0 && (
          <div id="cards" className="scroll-mt-24">
            {page.pinnedCards.map((c) => (
              <ForwardCard key={c.id} id={c.id} heading={c.heading[locale]} text={c.text[locale]} url={url} imagePath={c.image[locale]} locale={locale} />
            ))}
          </div>
        )}

        {!page.pinnedCards?.length && page.forward && (
          <ForwardCard text={page.forward[locale]} url={url} imagePath={page.shareImage?.[locale]} locale={locale} />
        )}

        {page.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-4 mt-12 font-heading text-2xl font-bold text-temple-900 md:text-3xl">
              {section.heading[locale]}
            </h2>
            <RichText text={section.body[locale]} tone="light" />
            {i === 1 && photos[1] !== undefined && <CommonsPhoto id={photos[1]} className="my-8" />}
          </section>
        ))}

        {page.faq && page.faq.length > 0 && (
          <section className="mt-12" aria-labelledby="page-faq">
            <h2 id="page-faq" className="font-heading text-2xl font-bold text-temple-900">
              {UI.faq[locale]}
            </h2>
            <div className="mt-5 divide-y divide-temple-100 rounded-2xl border border-temple-100 bg-cream-50">
              {page.faq.map((f, i) => (
                <details key={i} className="group p-5">
                  <summary className="cursor-pointer font-semibold text-temple-900">{f.q[locale]}</summary>
                  <p className="mt-3 leading-relaxed text-temple-700">{f.a[locale]}</p>
                </details>
              ))}
            </div>
          </section>
        )}

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

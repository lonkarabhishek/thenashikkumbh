import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMetadata({
    locale: params.locale,
    englishOnly: true,
    title: "Changelog and Corrections",
    description:
      "Public log of factual corrections and material changes to the Nashik Kumbh independent information site.",
    path: "/changelog",
  });
}

/**
 * Public changelog.
 *
 * Only material and factual changes are logged here — a corrected date, a
 * removed placeholder, a rewired assistant, a new source. Design tweaks are
 * out of scope. Newest entry first.
 */

interface Entry {
  date: string;
  title: string;
  body: string[];
}

const ENTRIES: Entry[] = [
  {
    date: "2026-08-05",
    title: "Content-integrity gate, nav around the pilgrim journey, honest businesses page",
    body: [
      "New build-time integrity check (scripts/verify-content.mjs) fails any deploy that reintroduces a fabricated helpline, an invented Amrit Snan date, an unsourced ‘AI-powered’ claim, or a specific placeholder we've been bitten by before.",
      "Chatbot answers on safety and crowd management no longer assert unsourced facilities (‘AI-powered CCTV surveillance’, ‘Kumbh War Room’). Guide's ‘special trains are run’ line is now qualified — Indian Railways has not yet published the 2027 Simhastha timetable.",
      "Businesses page rewritten. It used to render placeholder ‘Coming Soon’ cards, a non-functional sign-up form, and a ‘premium placement’ pitch. It now states plainly that no directory is running and lists the standards a real one will meet.",
      "Navigation reorganised around the pilgrim journey: Before → Arriving & Inside → Emergency & Policies → Explore. Games, Kumbh Run and Businesses are demoted from primary nav and sitemap priority.",
      "SEO: WebSite schema no longer advertises a SearchAction endpoint the site doesn't implement. Event schema now carries a sameAs to the DGIPR release and the NTKMA authority page.",
      "Accessibility: skip-to-main-content link added; prefers-reduced-motion is honoured site-wide.",
      "Fixed a wrong five-date Shahi Snan list surfaced by the pilgrim FAQ (‘August 20, September 3, September 17, October 2, October 17 2027’) — replaced with the three officially confirmed Amrit Snans and the primary source.",
      "Government-readiness pack drafted (not sent): proposal, demo script, pilot scope, data-validation request, ownership options, security/privacy summary, accessibility summary, operations plan. Lives in /docs.",
    ],
  },
  {
    date: "2026-08-02",
    title: "Independent-initiative framing, Amrit Snan corrections, PWA emergency card",
    body: [
      "Removed placeholder helplines (‘1800-XXX-XXXX’) from the guide page; every helpline now comes from a sourced registry with 112 as the primary.",
      "Removed the fabricated ‘+91 99999 99999’ organisation contact from the site's schema and footer. Site is now explicitly labelled an independent public-information initiative.",
      "Fixed the second Amrit Snan tithi from ‘Bhadrapad Purnima’ to ‘Shravan Amavasya’. Removed the invented ‘five Shahi Snans’ list from the assistant's knowledge base and replaced with the three officially confirmed Amrit Snans.",
      "Chatbot answers now display information status, source, and last-verified date. Safety-critical queries without a confident topic match are refused honestly.",
      "SOS ‘find nearest exit’ removed. The underlying geodata is placeholder; a false safety feature was worse than none. Replaced with an honest awaiting-confirmation state and a routing to 112.",
      "New /emergency page and service worker cache — the emergency card and 112 button remain available offline.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="bg-cream-50 pt-24">
      <div className="section-container py-16 sm:py-24">
        <p className="text-eyebrow font-semibold uppercase text-saffron-700">
          Public changelog
        </p>
        <h1 className="mt-4 text-title text-temple-900">
          Corrections and material changes
        </h1>
        <p className="mt-4 max-w-prose text-lede text-temple-500">
          Material changes to what the site says. Design work and copy polish
          are not logged here.
        </p>

        <ol className="mt-10 space-y-10">
          {ENTRIES.map((entry) => (
            <li
              key={entry.date}
              className="rounded-card border border-temple-100 bg-cream-50 p-6 sm:p-8"
            >
              <p className="text-eyebrow font-semibold uppercase text-temple-400">
                {entry.date}
              </p>
              <h2 className="mt-2 font-heading text-2xl text-temple-900">
                {entry.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-temple-600">
                {entry.body.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

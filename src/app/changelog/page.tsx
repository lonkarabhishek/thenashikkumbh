import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — The Nashik Kumbh",
  description:
    "Public log of factual corrections and material changes to the Nashik Kumbh independent information site.",
  alternates: { canonical: "https://thenashikkumbh.com/changelog" },
};

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
    <main className="bg-cream-50 pt-24">
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
    </main>
  );
}

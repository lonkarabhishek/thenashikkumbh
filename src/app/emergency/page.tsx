import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { helplines, offices, primaryHelpline } from "@/data/verified";

/**
 * The offline emergency card.
 *
 * Deliberately server-rendered plain HTML with no client JavaScript. This is
 * the page the service worker caches, so it must render entirely from what
 * the browser already has. It also acts as the honest home for "this site
 * works offline" — that claim now points at *this* page, not at the whole
 * app.
 *
 * Nothing here uses inline images so it will paint even if the file cache is
 * evicted. Anchors are `tel:` so the OS handles the call.
 */

export const metadata: Metadata = pageMetadata({
  title: "Emergency Numbers and Helplines",
  description:
    "Officially verified emergency numbers for the Nashik–Trimbakeshwar Simhastha Kumbh Mela. This card works offline.",
  path: "/emergency",
});

const ntkma = offices.find((o) => o.id === "ntkma");

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-cream-50 px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-eyebrow font-semibold uppercase text-sacred-red">
          Emergency
        </p>
        <h1 className="mt-3 font-heading text-title text-temple-900">
          If something is wrong, call this first
        </h1>
        <p className="mt-3 text-lede text-temple-600">
          This page is designed to work when your network is not. Numbers below
          are sourced and verified.
        </p>

        {/* The one action that matters. */}
        <a
          href={`tel:${primaryHelpline.number}`}
          className="mt-8 flex items-center justify-between rounded-card bg-sacred-red px-6 py-6 text-cream-50 shadow-lift"
          style={{
            background: "linear-gradient(140deg, #D9432F, #C1272D)",
          }}
        >
          <span>
            <span className="block text-eyebrow font-semibold uppercase text-cream-100/80">
              All-India ERSS
            </span>
            <span className="mt-1 block font-heading text-4xl leading-none">
              Call {primaryHelpline.number}
            </span>
            <span className="mt-2 block text-sm text-cream-100/85">
              Police · Ambulance · Fire · one number, one dial.
            </span>
          </span>
          <span aria-hidden className="font-heading text-5xl">
            📞
          </span>
        </a>

        {/* Every other verified helpline. */}
        <ul className="mt-8 space-y-3">
          {helplines
            .filter((h) => h.id !== "india-112")
            .map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between gap-4 rounded-card border border-temple-100 bg-cream-50 p-5"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-temple-900">
                    {h.label.en}
                  </span>
                  <span className="mt-0.5 block text-xs text-temple-500">
                    {h.jurisdiction.en} · Source: {h.sourceOrganisation}
                  </span>
                </span>
                <a
                  href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                  className="shrink-0 rounded-full bg-temple-800 px-4 py-2 font-heading text-lg text-cream-50"
                >
                  {h.number}
                </a>
              </li>
            ))}

          {ntkma?.phone && (
            <li className="flex items-center justify-between gap-4 rounded-card border border-temple-100 bg-cream-50 p-5">
              <span className="min-w-0">
                <span className="block font-semibold text-temple-900">
                  {ntkma.name.en}
                </span>
                <span className="mt-0.5 block text-xs text-temple-500">
                  Source: {ntkma.sourceOrganisation}
                </span>
              </span>
              <a
                href={`tel:${ntkma.phone.replace(/[^0-9+]/g, "")}`}
                className="shrink-0 rounded-full bg-temple-800 px-4 py-2 font-heading text-lg text-cream-50"
              >
                {ntkma.phone}
              </a>
            </li>
          )}
        </ul>

        {/* Behavioural guidance. Kept short and unlikely to age. */}
        <section className="mt-10 rounded-card border border-temple-100 bg-cream-100 p-6">
          <h2 className="font-heading text-xl text-temple-900">
            If you are separated from your family
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-temple-600">
            Go to the nearest police booth (marked with blue flags). They have a
            public-address system, and lost-person reports go out across the
            whole mela within minutes. Agree a meeting point with your family
            that is a place, not a person — phones lose signal in a crowd of
            millions.
          </p>
        </section>

        <p className="mt-8 text-xs text-temple-400">
          This card is served from your device even when the network is down.
          Independent public-information initiative. Verified 2026-08-01.
        </p>
      </div>
    </div>
  );
}

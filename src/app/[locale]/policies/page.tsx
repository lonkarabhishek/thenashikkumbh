import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";

/**
 * Public policies page.
 *
 * These are the trust documents the government audit asked for: editorial,
 * source, corrections, advertising, privacy, terms, accessibility, and
 * grievance. Each section names what we do, not what we intend to. Where a
 * policy is not yet in force (grievance officer, formal accessibility
 * certification) we say so.
 */

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMetadata({
    locale: params.locale,
    englishOnly: true,
    title: "Editorial, Privacy and Corrections Policies",
    description:
      "Editorial, source, corrections, privacy, terms, accessibility, and grievance policies for the Nashik Kumbh independent public-information initiative.",
    path: "/policies",
  });
}

const SECTIONS = [
  {
    id: "editorial",
    title: "Editorial policy",
    body: [
      "The Nashik Kumbh site is an independent public-information initiative. It is not an official government website and does not present itself as one.",
      "Every operational fact on the site, dates, phone numbers, offices, addresses, road closures, transport, facilities, is recorded in a machine-readable content registry with a source URL, the name of the publishing authority, and the date on which it was last verified.",
      "Editorial voice describes; it does not embellish. Statistics about crowd size, spend, or transport that come from named authorities are attributed to those authorities in the body of the page.",
    ],
  },
  {
    id: "sources",
    title: "Source policy",
    body: [
      "Primary preference is given to the publishing authority: the Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA), the Directorate General of Information and Public Relations (DGIPR) of the Government of Maharashtra, and the ministries responsible for a given topic (Home Affairs for 112, Health for MEMS 108, Women & Child Development for the women and child helplines).",
      "Wire-service reporting is treated as corroboration, not as a primary source. Where a primary source cannot be opened at the time of verification, we say so in the source note next to the claim.",
      "Any operational claim without a source is either rewritten as description or removed.",
    ],
  },
  {
    id: "corrections",
    title: "Corrections policy",
    body: [
      "If you notice a factual error, please write to the site's editorial address (see Contact below). We will respond within seven working days. Corrections to factual claims are logged in the public changelog.",
      "If a correction affects an emergency-critical claim (helpline numbers, evacuation guidance, medical facilities, transport that pilgrims are relying on), we will apply the correction immediately and note it in the changelog on publication.",
    ],
  },
  {
    id: "ai",
    title: "AI assistant limits",
    body: [
      "The Kumbh Sahayak assistant answers only from this site's approved content: the verified schedule and helplines, the guide topics, the long-form pages and the news posts that carry linked sources. Every answer shows whether it came from the AI model or from the built-in guide, and links the pages it drew on.",
      "Typed questions are answered by Claude, an AI model from Anthropic. We send your question, the last few messages of your chat and the matching passages of our own content to Anthropic's API to write the reply. The model is instructed to use only that content and to say so when something is not published yet. It can still make mistakes. Check official notices before you travel.",
      "We do not store your questions or the answers. To keep the feature affordable and to stop misuse we count requests per visitor for one day, using a one-way hash of your network address and browser that cannot be reversed; the counts are discarded after two days. Anthropic handles the request under its own API data policy.",
      "Safety-critical questions that cannot be answered from our content are refused honestly; the assistant routes the pilgrim to NTKMA and to 112 rather than guess. When the daily budget for the AI model is used up, the chat falls back to the built-in guide and says so.",
    ],
  },
  {
    id: "advertising",
    title: "Advertising and commercial listings policy",
    body: [
      "The site does not currently accept sponsorships, paid placements, or commercial listings. When commercial listings are opened, every listing will be clearly labelled as sponsored, will show the legal business name, address, and last verification date, and will never carry a badge suggesting official or government-verified status.",
      "Public-safety and official-information areas will remain advertisement-free regardless of commercial activity elsewhere on the site.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy policy",
    body: [
      "The site does not require an account, does not ask for personal information, and does not store user messages sent to the assistant on any server we operate.",
      "Location data is used only when the user explicitly grants location permission, and only for the specific action initiated (sharing your location from the SOS panel, or opening Flow mode on an audio walk). Location is not retained after the action.",
      "The site uses Vercel Web Analytics for aggregate visit measurement (page views, referrer, country). This is not personally identifiable and is not sold or shared.",
    ],
  },
  {
    id: "terms",
    title: "Terms of use",
    body: [
      "The site is provided for general information. It is not a substitute for official announcements from NTKMA or from the Government of Maharashtra.",
      "You are welcome to share links to any page. Copyright in the site's own writing and illustrations rests with the site's editors; official information belongs to its publishing authority and is attributed accordingly.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility statement",
    body: [
      "The site is designed to be usable on modest Android phones over patchy mobile networks. It follows the practical intent of WCAG 2.2 AA, keyboard operation, visible focus states, sufficient contrast, respect for reduced-motion preferences, transcripts alongside audio narration.",
      "The site is not yet formally audited or certified for GIGW 3.0 compliance. If you find an accessibility barrier, please write to us and we will fix it.",
    ],
  },
  {
    id: "grievance",
    title: "Grievance and takedown",
    body: [
      "A named grievance officer will be appointed before any commercial listings are opened. Until then, factual corrections and content complaints are handled through the editorial address.",
      "If you believe the site publishes personal information about you without a lawful basis, please write to us and we will remove or correct it as required.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <div className="bg-cream-50 pt-24">
      <div className="section-container py-16 sm:py-24">
        <p className="text-eyebrow font-semibold uppercase text-saffron-700">
          Trust and governance
        </p>
        <h1 className="mt-4 text-title text-temple-900">Policies</h1>
        <p className="mt-4 max-w-prose text-lede text-temple-500">
          The Nashik Kumbh site is an independent public-information initiative.
          These are the rules we follow, in plain language.
        </p>

        <nav aria-label="On this page" className="mt-10 rounded-card border border-temple-100 bg-cream-100 p-5">
          <p className="text-eyebrow font-semibold uppercase text-temple-400">
            On this page
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-temple-700 underline decoration-temple-200 underline-offset-2 hover:text-saffron-700">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-14">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-heading text-title text-temple-900">
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-temple-600">
                {s.body.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section id="contact" className="scroll-mt-24 rounded-card border border-temple-100 bg-cream-100 p-6">
            <h2 className="font-heading text-title text-temple-900">Contact</h2>
            <p className="mt-3 leading-relaxed text-temple-600">
              For factual corrections, accessibility issues, or content complaints,
              please write to <span className="font-mono text-temple-800">editorial@thenashikkumbh.com</span>{" "}
              (address to be published once monitored).
            </p>
            <p className="mt-3 leading-relaxed text-temple-600">
              For official Kumbh matters, please contact the Nashik–Trimbakeshwar
              Kumbh Mela Authority directly:{" "}
              <a href="tel:02532461909" className="underline decoration-temple-200 underline-offset-2 hover:text-saffron-700">0253-2461909</a>
              {" · "}
              <a href="mailto:kumbhmela.2027@mah.gov.in" className="underline decoration-temple-200 underline-offset-2 hover:text-saffron-700">kumbhmela.2027@mah.gov.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

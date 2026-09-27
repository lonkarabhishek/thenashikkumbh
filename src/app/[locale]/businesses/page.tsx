import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/translations";
import Link from "@/components/LocaleLink";
import { ArrowRight, BadgeCheck, Compass, ShieldCheck } from "lucide-react";

/**
 * Businesses page.
 *
 * Rewritten from scratch. The previous version rendered a category browser
 * with "Coming Soon" placeholder cards, a fake sponsorship slot, a form that
 * silently discarded its input, and a "Verified listing / Customer reviews /
 * Premium placement" pitch — none of which the site offers today. Users
 * couldn't tell which parts were live and which were mock. That's precisely
 * the thing the content-integrity brief forbids: plausible placeholder data
 * shipped as if it were the real service.
 *
 * The honest version below explains what a Kumbh business directory *would*
 * need to look like to be trustworthy, and states plainly that the site does
 * not yet run one.
 */

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMetadata({
    locale: params.locale,
    englishOnly: true,
    title: "Businesses and Sponsorship",
    description:
      "The Nashik Kumbh site does not yet run a business directory or accept sponsorships. This page explains why, and what the standards will be if that changes.",
    path: "/businesses",
    image: "/images/og/kumbh-12.jpg",
  });
}

const STANDARDS = [
  {
    Icon: BadgeCheck,
    title: "Verification before listing",
    body:
      "No listing appears until the business has been reached, its permits and price sheets confirmed, and its details attributed to a named source with a verification date. Pilgrims will see the verification date on every card.",
  },
  {
    Icon: ShieldCheck,
    title: "No pay-to-rank",
    body:
      "Sponsorship, if it opens, will be clearly separated from organic listings — sponsored cards will be labelled as sponsored, and ranking of unpaid listings will not depend on payment.",
  },
  {
    Icon: Compass,
    title: "One clear complaint route",
    body:
      "Every listing will carry a single email address for reporting a mistake, over-charging, or a safety issue. Every complaint will be logged in /changelog with the action taken.",
  },
];

export default function BusinessesPage() {
  return (
    <div className="bg-cream-50 pt-24">
      <section className="section-container py-16 sm:py-24">
        <p className="text-eyebrow font-semibold uppercase text-saffron-700">
          Businesses & sponsorship
        </p>
        <h1 className="mt-4 max-w-2xl text-title text-temple-900">
          The directory is not yet open.
        </h1>
        <p className="mt-6 max-w-prose text-lede text-temple-500">
          This site does not run a business directory today. It does not sell
          sponsorships. It does not display advertisements. If those change,
          they will be launched under the standards below — not before.
        </p>

        <div className="mt-10 rounded-card border border-saffron-200 bg-saffron-50/50 p-6 sm:p-8">
          <h2 className="font-heading text-xl text-temple-900">
            Why nothing here is live
          </h2>
          <p className="mt-3 max-w-prose text-temple-600 leading-relaxed">
            A pilgrim looking at a listings page assumes what they see is real.
            An earlier version of this page shipped placeholder cards, a
            non-functional sign-up form, and a &ldquo;Premium placement&rdquo;
            pitch. That was misleading and has been removed. The site will not
            run a directory until the standards on this page can be met for
            every listing.
          </p>
        </div>

        <h2 className="mt-16 font-heading text-2xl text-temple-900">
          Standards a real directory will meet
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-1">
          {STANDARDS.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="flex gap-4 rounded-card border border-temple-100 bg-cream-50 p-6"
            >
              <span
                aria-hidden
                className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-100 text-saffron-700"
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading text-lg text-temple-900">
                  {title}
                </h3>
                <p className="mt-2 text-temple-600 leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-heading text-2xl text-temple-900">
          For business owners
        </h2>
        <p className="mt-4 max-w-prose text-temple-600 leading-relaxed">
          If you run a hotel, dharamshala, tour, puja service, restaurant or
          transport service that pilgrims will use during Simhastha 2027, we
          are not accepting listings today. When the directory opens, it will
          be announced on the homepage and in the changelog. Until then, work
          with the Nashik–Trimbakeshwar Kumbh Mela Authority for official
          recognition; the site will source from what NTKMA publishes.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/policies"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            Read the editorial policies
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/changelog"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            See the corrections log
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

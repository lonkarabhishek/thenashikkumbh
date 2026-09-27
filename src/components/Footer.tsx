"use client";

import Link from "@/components/LocaleLink";
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { navExtra } from "@/i18n/navExtra";
import { BorderStrip } from "@/components/art/Motifs";
import { offices, siteAttribution } from "@/data/verified";

const ntkma = offices.find((o) => o.id === "ntkma")!;

const COLUMNS = [
  {
    heading: navExtra.groupPlan,
    links: [
      { href: "/dates", label: translations.nav.dates },
      { href: "/guide", label: translations.nav.guide },
      { href: "/businesses", label: translations.nav.businesses },
    ],
  },
  {
    heading: navExtra.groupExplore,
    links: [
      { href: "/yatra", label: navExtra.yatra },
      { href: "/ghats", label: translations.nav.ghats },
      { href: "/events", label: translations.nav.events },
      { href: "/gallery", label: translations.nav.gallery },
    ],
  },
  {
    heading: navExtra.groupLearn,
    links: [
      { href: "/about", label: translations.nav.about },
      { href: "/naga-sadhus", label: translations.nav.nagaSadhus },
      { href: "/blog", label: translations.nav.news },
      { href: "/games", label: translations.nav.games },
    ],
  },
];

const SOCIALS = [
  { icon: Facebook, href: "https://facebook.com/thenashikkumbh", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/thenashikkumbh", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@thenashikkumbh", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/thenashikkumbh", label: "X" },
];

/** Numbers that work without a data connection — worth repeating on every page. */
const HELPLINES = [
  { number: "112", label: { en: "Police", hi: "पुलिस", mr: "पोलीस" } },
  { number: "108", label: { en: "Ambulance", hi: "एम्बुलेंस", mr: "रुग्णवाहिका" } },
  { number: "101", label: { en: "Fire", hi: "अग्निशमन", mr: "अग्निशमन" } },
  { number: "1091", label: { en: "Women", hi: "महिला", mr: "महिला" } },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="section-dark">
      <div className="text-gold-500/25">
        <BorderStrip className="h-4 w-full" />
      </div>

      <div className="section-container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="font-devanagari text-2xl leading-none text-gold-400">ॐ</span>
              <span className="leading-tight">
                <span className="block font-heading text-lg font-semibold text-cream-50">
                  Nashik Kumbh
                </span>
                <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-cream-200/50">
                  Simhastha 2027
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/60">
              {t(translations.footer.description)}
            </p>

            <div className="mt-7 flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200/15 text-cream-200/70 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.heading.en}>
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
                  {t(column.heading)}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream-200/65 transition-colors hover:text-cream-50"
                      >
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Helplines */}
        <div className="mt-14 rounded-card border border-sacred-vermillion/25 bg-sacred-maroon/20 p-6">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sacred-vermillion">
            {t(navExtra.emergency)}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {HELPLINES.map((line) => (
              <li key={line.number}>
                <a
                  href={`tel:${line.number}`}
                  className="group flex items-baseline gap-2 transition-colors hover:text-cream-50"
                >
                  <span className="font-heading text-2xl text-cream-50">{line.number}</span>
                  <span className="text-sm text-cream-200/60">{t(line.label)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Kumbh contact — sourced from the content registry. The
            previous info@ address on this domain and the 0253-2305555 line
            that lived here were placeholders and have been removed. */}
        <div className="mt-10 rounded-card border border-cream-200/12 bg-cream-50/[0.04] p-5">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
            {t({
              en: "Official Kumbh contact",
              hi: "आधिकारिक कुंभ संपर्क",
              mr: "अधिकृत कुंभ संपर्क",
            })}
          </p>
          <p className="mt-2 text-sm text-cream-100">
            {t(ntkma.name)}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-200/70">
            {ntkma.phone && (
              <a
                href={`tel:${ntkma.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2 hover:text-cream-50"
              >
                <Phone className="h-4 w-4 text-gold-400" />
                {ntkma.phone}
              </a>
            )}
            {ntkma.email && (
              <a
                href={`mailto:${ntkma.email}`}
                className="flex items-center gap-2 hover:text-cream-50"
              >
                <Mail className="h-4 w-4 text-gold-400" />
                {ntkma.email}
              </a>
            )}
          </div>
          <p className="mt-3 text-xs text-cream-200/45">
            {t({
              en: "Source: Divisional Commissioner Office, Nashik. Verified " + ntkma.verifiedAt + ".",
              hi: "स्रोत: विभागीय आयुक्त कार्यालय, नाशिक। सत्यापन " + ntkma.verifiedAt + "।",
              mr: "स्रोत: विभागीय आयुक्त कार्यालय, नाशिक. सत्यापन " + ntkma.verifiedAt + ".",
            })}
          </p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-cream-200/55">
          {t(siteAttribution)}
        </p>

        {/* Legal */}
        <div className="mt-12 border-t border-cream-200/10 pt-8">
          <p className="text-xs leading-relaxed text-cream-200/45">
            {t(translations.footer.disclaimer)}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream-200/55">
            <li>
              <Link href="/emergency" className="hover:text-cream-50">
                {t({ en: "Emergency (offline)", hi: "आपात (ऑफ़लाइन)", mr: "आपत्कालीन (ऑफलाइन)" })}
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-cream-50">
                {t({ en: "Policies", hi: "नीतियाँ", mr: "धोरणे" })}
              </Link>
            </li>
            <li>
              <Link href="/changelog" className="hover:text-cream-50">
                {t({ en: "Changelog", hi: "परिवर्तन-लॉग", mr: "बदल-नोंद" })}
              </Link>
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-cream-200/45">
            <p>{t(translations.footer.copyright)}</p>
            <p>
              {t(translations.footer.madeBy)}{" "}
              <a
                href="https://workwithabhi.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200/70 underline-offset-2 hover:text-gold-300 hover:underline"
              >
                {t(translations.footer.madeByCreator)}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

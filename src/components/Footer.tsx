"use client";

import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import Link from "@/components/LocaleLink";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { navExtra } from "@/i18n/navExtra";
import AuthorBox from "@/components/trust/AuthorBox";
import { BorderStrip } from "@/components/art/Motifs";
import { offices, siteAttribution } from "@/data/verified";

const ntkma = offices.find((o) => o.id === "ntkma")!;

const COLUMNS = [
  {
    heading: navExtra.groupPlan,
    links: [
      { href: "/dates", label: translations.nav.dates },
      { href: "/day-picker", label: { en: "Which day to go", hi: "किस दिन जाएँ", mr: "कोणत्या दिवशी जायचे" } },
      { href: "/kumbh-countdown", label: { en: "Kumbh countdown", hi: "कुंभ काउंटडाउन", mr: "कुंभ काउंटडाउन" } },
      { href: "/map", label: { en: "Kumbh map", hi: "कुंभ नक्शा", mr: "कुंभ नकाशा" } },
      { href: "/share-snan-card", label: { en: "Snan reminder card", hi: "स्नान रिमाइंडर कार्ड", mr: "स्नान रिमाइंडर कार्ड" } },
      { href: "/family-card", label: { en: "Khoya-Paya family card", hi: "खोया-पाया परिवार कार्ड", mr: "खोया-पाया कुटुंब कार्ड" } },
      { href: "/plan-your-visit", label: { en: "Plan your Kumbh visit", hi: "कुंभ यात्रा की योजना", mr: "कुंभ भेटीचे नियोजन" } },
      { href: "/kumbh-status", label: { en: "Status board: open or closed", hi: "स्टेटस बोर्ड: खुला या बंद", mr: "स्टेटस बोर्ड: खुले की बंद" } },
      { href: "/guide", label: translations.nav.guide },
      { href: "/how-to-reach", label: { en: "How to reach", hi: "कैसे पहुँचें", mr: "कसे पोहोचाल" } },
      { href: "/accommodation", label: { en: "Where to stay", hi: "कहाँ ठहरें", mr: "कुठे राहाल" } },
      { href: "/parva-snan-calendar", label: { en: "Parva Snan calendar", hi: "पर्व स्नान कैलेंडर", mr: "पर्व स्नान दिनदर्शिका" } },
      { href: "/businesses", label: translations.nav.businesses },
    ],
  },
  {
    heading: navExtra.groupExplore,
    links: [
      { href: "/yatra", label: navExtra.yatra },
      { href: "/ghats", label: translations.nav.ghats },
      { href: "/trimbakeshwar-kumbh-2027", label: { en: "Trimbakeshwar Kumbh 2027", hi: "त्र्यंबकेश्वर कुंभ 2027", mr: "त्र्यंबकेश्वर कुंभ 2027" } },
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
];

const MAKER_LINKS = [
  { href: "https://studio.workwithabhi.online", label: "Studio", desc: { en: "websites", hi: "वेबसाइट", mr: "वेबसाइट" } },
  { href: "https://tapturf.in", label: "TapTurf", desc: { en: "turf booking", hi: "टर्फ बुकिंग", mr: "टर्फ बुकिंग" } },
  { href: "https://gymnerve.com", label: "GymNerve", desc: { en: "gym software", hi: "जिम सॉफ़्टवेयर", mr: "जिम सॉफ्टवेअर" } },
  { href: "https://biodataji.in", label: "BiodataJi", desc: { en: "biodata maker", hi: "बायोडाटा मेकर", mr: "बायोडाटा मेकर" } },
  { href: "https://makeinvoice.si", label: "MakeInvoice", desc: { en: "invoice maker", hi: "इनवॉइस मेकर", mr: "इनव्हॉइस मेकर" } },
];

/** Numbers that work without a data connection, worth repeating on every page. */
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

        {/* Official Kumbh contact, sourced from the content registry. The
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
              <Link href="/contact" className="hover:text-cream-50">
                {t({ en: "Contact and legal notice", hi: "संपर्क और क़ानूनी सूचना", mr: "संपर्क आणि कायदेशीर सूचना" })}
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="hover:text-cream-50" />
              <Link href="/credits" className="hover:text-cream-50">
                {t({ en: "Photo credits", hi: "फोटो श्रेय", mr: "फोटो श्रेय" })}
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

          <AuthorBox variant="footer" />

          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6875rem] text-cream-200/35">
            <span>{t({ en: "More from the maker:", hi: "निर्माता की ओर से और:", mr: "निर्मात्याकडून आणखी:" })}</span>
            {MAKER_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="hover:text-cream-100"
              >
                {l.label} <span className="text-cream-200/25">· {t(l.desc)}</span>
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

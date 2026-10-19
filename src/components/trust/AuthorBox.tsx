"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_OWNER } from "@/data/siteOwner";

const COPY = {
  label: { en: "Written and verified by", hi: "लेखन और सत्यापन", mr: "लेखन आणि पडताळणी" },
  about: { en: "About the site and how we verify news", hi: "साइट के बारे में और हम ख़बरें कैसे जाँचते हैं", mr: "साइटविषयी आणि आम्ही बातम्या कशा तपासतो" },
  policy: { en: "Editorial and corrections policy", hi: "संपादकीय और सुधार नीति", mr: "संपादकीय आणि दुरुस्ती धोरण" },
};

/**
 * `variant="footer"`: the same wording and links, compact and in the dark
 * footer's colours. No schema here; the Person entity is in the sitewide JSON-LD.
 */
export default function AuthorBox({ variant = "default" }: { variant?: "default" | "footer" }) {
  const { locale } = useLanguage();
  if (variant === "footer") {
    return (
      <aside
        aria-label={COPY.label[locale]}
        data-author-box="footer"
        className="mt-6 rounded-card border border-cream-200/12 bg-cream-50/[0.04] px-4 py-3"
      >
        <p className="text-xs leading-relaxed text-cream-200/60">
          <span className="font-semibold uppercase tracking-[0.16em] text-gold-300">{COPY.label[locale]}</span>{" "}
          <Link href="/about#who-runs-this-site" className="font-semibold text-cream-50 hover:text-gold-300">
            {SITE_OWNER.name}
          </Link>
          <span className="text-cream-200/30"> · </span>
          {SITE_OWNER.bio[locale]}
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <Link href="/about#who-runs-this-site" className="text-cream-200/70 underline underline-offset-2 hover:text-cream-50">{COPY.about[locale]}</Link>
          <Link href="/policies#corrections" className="text-cream-200/70 underline underline-offset-2 hover:text-cream-50">{COPY.policy[locale]}</Link>
          <a href={SITE_OWNER.github} target="_blank" rel="noopener noreferrer" className="text-cream-200/70 underline underline-offset-2 hover:text-cream-50">GitHub</a>
        </p>
      </aside>
    );
  }
  return (
    <aside aria-label={COPY.label[locale]} className="mt-10 rounded-xl border border-temple-200 bg-cream-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-saffron-700">{COPY.label[locale]}</p>
      <p className="mt-1 font-heading text-lg font-bold text-temple-900">
        <Link href="/about#who-runs-this-site" className="hover:underline">{SITE_OWNER.name}</Link>
      </p>
      <p className="mt-1 text-sm leading-relaxed text-temple-600">{SITE_OWNER.bio[locale]}</p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link href="/about#who-runs-this-site" className="text-temple-900 underline">{COPY.about[locale]}</Link>
        <Link href="/policies#corrections" className="text-temple-900 underline">{COPY.policy[locale]}</Link>
        <a href={SITE_OWNER.github} target="_blank" rel="noopener noreferrer" className="text-temple-900 underline">GitHub</a>
      </p>
    </aside>
  );
}

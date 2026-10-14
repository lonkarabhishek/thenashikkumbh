"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

const LINKS = [
  { href: "/dates", label: { en: "Amrit Snan Dates 2027 (all Kumbh dates)", hi: "अमृत स्नान तिथियाँ 2027 (सभी कुंभ तिथियाँ)", mr: "अमृत स्नान तारखा २०२७ (सर्व कुंभ तारखा)" } },
  { href: "/blog/ring-road-project-8000-crore", label: { en: "Nashik Ring Road project: full guide", hi: "नाशिक रिंग रोड परियोजना: पूरी जानकारी", mr: "नाशिक रिंग रोड प्रकल्प: संपूर्ण माहिती" } },
  { href: "/parva-snan-calendar", label: { en: "Parva Snan calendar: every bathing day", hi: "पर्व स्नान कैलेंडर: हर स्नान का दिन", mr: "पर्व स्नान दिनदर्शिका: प्रत्येक स्नानाचा दिवस" } },
  { href: "/guide", label: { en: "Pilgrim guide to Nashik Kumbh 2027", hi: "नाशिक कुंभ 2027 यात्री गाइड", mr: "नाशिक कुंभ २०२७ भाविक मार्गदर्शक" } },
  { href: "/gallery", label: { en: "Photos of Kumbh Mela Nashik", hi: "नाशिक कुंभ मेला की तस्वीरें", mr: "नाशिक कुंभमेळ्याचे फोटो" } },
];
const TITLE = { en: "Kumbh 2027 guides", hi: "कुंभ 2027 गाइड", mr: "कुंभ २०२७ मार्गदर्शक" };

export default function NewsRelatedGuides({ currentSlug }: { currentSlug?: string }) {
  const { locale } = useLanguage();
  const links = LINKS.filter((l) => !currentSlug || !l.href.endsWith(`/${currentSlug}`));
  return (
    <nav aria-label={TITLE[locale]} className="mt-10 rounded-xl border border-temple-200 bg-cream-50 p-5">
      <h2 className="font-heading text-lg font-bold text-temple-900">{TITLE[locale]}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-temple-900 underline">{l.label[locale]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

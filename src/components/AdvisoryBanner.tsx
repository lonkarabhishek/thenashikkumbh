"use client";

import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

/**
 * A short, time-limited pilgrim advisory shown at the top of every page.
 * Edit ADVISORY to change it; it hides itself after `until` (IST).
 *
 * Current: Kushavarta Tirth closure. Collector Ayush Prasad said 30 Sep to
 * 30 Oct (TOI, 29 Sep 2026); Lokmat Times (4 Oct 2026) says it reopens on
 * 31 Oct. The copy says "around 31 October" because sources differ by a day.
 */
const ADVISORY = {
  until: "2026-11-01T00:00:00+05:30",
  href: "/blog/kushavarta-tirth-closed-for-renovation-october-2026",
  text: {
    en: "Kushavarta Tirth, Trimbakeshwar, is closed for renovation from 30 September. It reopens around 31 October 2026.",
    hi: "त्र्यंबकेश्वर का कुशावर्त तीर्थ 30 सितंबर से जीर्णोद्धार के लिए बंद है। यह लगभग 31 अक्टूबर 2026 को फिर खुलेगा।",
    mr: "त्र्यंबकेश्वरचे कुशावर्त तीर्थ ३० सप्टेंबरपासून नूतनीकरणासाठी बंद आहे. ते साधारण ३१ ऑक्टोबर २०२६ रोजी पुन्हा खुले होईल.",
  },
  more: { en: "Details", hi: "विवरण", mr: "तपशील" },
};

const expired = () => Date.now() >= new Date(ADVISORY.until).getTime();

export default function AdvisoryBanner() {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(expired);

  // Static pages are built once; re-check the date in the visitor's browser.
  useEffect(() => setHidden(expired()), []);

  if (hidden) return null;

  return (
    <div role="status" className="bg-sacred-red text-cream-50">
      <div className="section-container flex items-start gap-2 py-1.5 text-xs leading-snug sm:items-center sm:text-sm">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden="true" />
        <p>
          {t(ADVISORY.text)}{" "}
          <Link href={ADVISORY.href} className="font-semibold underline underline-offset-2">
            {t(ADVISORY.more)}
          </Link>
        </p>
      </div>
    </div>
  );
}

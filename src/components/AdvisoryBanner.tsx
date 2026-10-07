"use client";

import { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

/**
 * A short, time-limited pilgrim advisory shown at the top of every page.
 * Edit ADVISORY to change it; it hides itself after `until` (IST).
 * Visitors can close it; that choice is remembered per advisory `id`, so a
 * new advisory (new id) shows again even to people who closed the old one.
 *
 * Current: Kushavarta Tirth closure. Collector Ayush Prasad said 30 Sep to
 * 30 Oct (TOI, 29 Sep 2026); Lokmat Times (4 Oct 2026) says it reopens on
 * 31 Oct. The copy says "around 31 October" because sources differ by a day.
 */
const ADVISORY = {
  id: "kushavarta-closure-2026-10",
  until: "2026-11-01T00:00:00+05:30",
  href: "/blog/kushavarta-tirth-closed-for-renovation-october-2026",
  text: {
    en: "Kushavarta Tirth, Trimbakeshwar, is closed for renovation from 30 September. It reopens around 31 October 2026.",
    hi: "त्र्यंबकेश्वर का कुशावर्त तीर्थ 30 सितंबर से जीर्णोद्धार के लिए बंद है। यह लगभग 31 अक्टूबर 2026 को फिर खुलेगा।",
    mr: "त्र्यंबकेश्वरचे कुशावर्त तीर्थ ३० सप्टेंबरपासून नूतनीकरणासाठी बंद आहे. ते साधारण ३१ ऑक्टोबर २०२६ रोजी पुन्हा खुले होईल.",
  },
  more: { en: "Details", hi: "विवरण", mr: "तपशील" },
  close: { en: "Close notice", hi: "सूचना बंद करें", mr: "सूचना बंद करा" },
};

const STORAGE_KEY = "advisory-dismissed";

const expired = () => Date.now() >= new Date(ADVISORY.until).getTime();

/** Storage can be blocked (private mode, strict settings); then just show it. */
function wasDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === ADVISORY.id;
  } catch {
    return false;
  }
}

export default function AdvisoryBanner() {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(expired);

  // Static pages are built once; re-check the date, and whether this visitor
  // closed the notice before, in their browser.
  useEffect(() => setHidden(expired() || wasDismissed()), []);

  const dismiss = () => {
    setHidden(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, ADVISORY.id);
    } catch {
      // Not remembered; it will show again on the next page load.
    }
  };

  if (hidden) return null;

  return (
    <div role="status" className="bg-sacred-red text-cream-50">
      <div className="section-container flex items-start gap-2 py-1.5 text-xs leading-snug sm:items-center sm:text-sm">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden="true" />
        <p className="min-w-0 flex-1">
          {t(ADVISORY.text)}{" "}
          <Link href={ADVISORY.href} className="font-semibold underline underline-offset-2">
            {t(ADVISORY.more)}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t(ADVISORY.close)}
          title={t(ADVISORY.close)}
          className="-my-1 -mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-cream-50/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream-50"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { openConsentBanner } from "@/lib/consent";

const LABEL = { en: "Cookie settings", hi: "कुकी सेटिंग", mr: "कुकी सेटिंग" };

/** Footer link that reopens the cookie notice so a choice can be changed. */
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      {t(LABEL)}
    </button>
  );
}

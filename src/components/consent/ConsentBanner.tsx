"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { onConsentOpen, setConsent, useConsent } from "@/lib/consent";

const COPY = {
  title: { en: "Cookies and ads", hi: "कुकीज़ और विज्ञापन", mr: "कुकीज आणि जाहिराती" },
  body: {
    en: "We use Google Analytics to count visits and Google AdSense to show ads. Both set cookies. Nothing from Google loads until you choose. \"Essentials only\" keeps the site working with no tracking.",
    hi: "हम विज़िट गिनने के लिए Google Analytics और विज्ञापन दिखाने के लिए Google AdSense का उपयोग करते हैं। दोनों कुकीज़ रखते हैं। आपके चुनने से पहले Google से कुछ भी लोड नहीं होता। \"सिर्फ़ ज़रूरी\" चुनने पर साइट बिना ट्रैकिंग के चलती है।",
    mr: "भेटी मोजण्यासाठी आम्ही Google Analytics आणि जाहिरातींसाठी Google AdSense वापरतो. दोन्ही कुकीज ठेवतात. तुम्ही निवड करेपर्यंत Google कडून काहीही लोड होत नाही. \"फक्त आवश्यक\" निवडल्यास साइट ट्रॅकिंगशिवाय चालते.",
  },
  accept: { en: "Accept all", hi: "सब स्वीकार करें", mr: "सर्व स्वीकारा" },
  essential: { en: "Essentials only", hi: "सिर्फ़ ज़रूरी", mr: "फक्त आवश्यक" },
  policy: { en: "Privacy policy", hi: "गोपनीयता नीति", mr: "गोपनीयता धोरण" },
};

/**
 * The cookie notice. It renders only in the browser, only while no choice
 * is stored (or after "Cookie settings" reopens it), and it never blocks
 * the page. On phones it sits above the SOS button.
 */
export default function ConsentBanner() {
  const { t } = useLanguage();
  const consent = useConsent();
  const [mounted, setMounted] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    setMounted(true);
    return onConsentOpen(() => setReopened(true));
  }, []);

  if (!mounted || (consent !== null && !reopened)) return null;

  const choose = (value: "all" | "essential") => {
    setReopened(false);
    setConsent(value);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-[5.5rem] z-50 rounded-2xl border border-temple-200 bg-cream-50 p-4 shadow-lift sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
          <Cookie className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p id="consent-title" className="font-heading text-lg font-bold text-temple-900">
            {t(COPY.title)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-temple-700">
            {t(COPY.body)}{" "}
            <Link href="/policies" className="font-semibold underline underline-offset-2">
              {t(COPY.policy)}
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("all")}
          className="rounded-full bg-temple-900 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-temple-800"
        >
          {t(COPY.accept)}
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="rounded-full border border-temple-300 bg-white px-5 py-2.5 text-sm font-semibold text-temple-900 transition-colors hover:border-temple-900"
        >
          {t(COPY.essential)}
        </button>
      </div>
    </div>
  );
}

"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

const COPY = {
  en: { lead: "Looking for the full schedule?", link: "See all Amrit Snan dates 2027 and Kumbh dates on one page", tail: "It is the page we keep up to date first." },
  hi: { lead: "पूरा कार्यक्रम चाहिए?", link: "अमृत स्नान तिथियाँ 2027 और सभी कुंभ तिथियाँ एक पेज पर देखें", tail: "हम सबसे पहले इसी पेज को अपडेट करते हैं।" },
  mr: { lead: "संपूर्ण वेळापत्रक हवे आहे?", link: "अमृत स्नान तारखा २०२७ आणि सर्व कुंभ तारखा एकाच पानावर पाहा", tail: "आम्ही सर्वात आधी हेच पान अद्ययावत करतो." },
};

/** Shown on date-intent posts so /dates stays the one canonical answer. */
export default function DatesCanonicalNote() {
  const { locale } = useLanguage();
  const c = COPY[locale];
  return (
    <p className="mb-8 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">
      <strong>{c.lead}</strong>{" "}
      <Link href="/dates" className="font-semibold text-saffron-700 underline">{c.link}</Link>. {c.tail}
    </p>
  );
}

"use client";

import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scheduleUpdated } from "@/data/verified";
import { amritSnans, datesFaqs, formatScheduleDate as formatDate } from "@/data/datesFaq";

/**
 * Plain-text answers to what people actually search for ("shahi snan dates",
 * "nashik kumbh 2027 dates", "नाशिक कुंभमेळा कधी आहे"), placed where both
 * readers and search engines see them first. Dates come from the verified
 * registry, so a schedule change updates this box too.
 */


const COPY = {
  quickTitle: {
    en: "Shahi Snan (Amrit Snan) dates at a glance",
    hi: "शाही स्नान (अमृत स्नान) की तिथियाँ एक नज़र में",
    mr: "नाशिक कुंभमेळा कधी आहे? शाही स्नान (अमृत स्नान) तारखा",
  },
  quickNote: {
    en: "Shahi Snan is now officially called Amrit Snan. It is the same royal bath.",
    hi: "शाही स्नान को अब आधिकारिक रूप से अमृत स्नान कहा जाता है। यह वही शाही स्नान है।",
    mr: "शाही स्नानाला आता अधिकृतपणे अमृत स्नान म्हणतात. हे तेच शाही स्नान आहे.",
  },
  updated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  faqTitle: {
    en: "Common questions about the dates",
    hi: "तिथियों के बारे में आम सवाल",
    mr: "तारखांबद्दल नेहमीचे प्रश्न",
  },
};

export function DatesQuickAnswer() {
  const { locale, t } = useLanguage();

  return (
    <section className="section-container -mt-12 relative z-10" aria-labelledby="quick-dates-title">
      <div className="mx-auto max-w-3xl rounded-card border border-saffron-200 bg-cream-50 p-6 shadow-lift sm:p-8">
        <h2
          id="quick-dates-title"
          className="flex items-center gap-3 font-heading text-2xl text-temple-900"
        >
          <CalendarDays className="h-6 w-6 shrink-0 text-saffron-600" />
          {t(COPY.quickTitle)}
        </h2>
        <ol className="mt-5 divide-y divide-temple-100">
          {amritSnans.map((e) => (
            <li key={e.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <time dateTime={e.isoDate} className="w-48 shrink-0 font-semibold text-temple-900">
                {formatDate(e.isoDate, locale)}
              </time>
              <span className="text-temple-600">
                {t(e.name)} · {t(e.location)}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-temple-500">{t(COPY.quickNote)}</p>
        <p className="mt-2 text-xs text-temple-400">
          {t(COPY.updated)}: <time dateTime={scheduleUpdated}>{formatDate(scheduleUpdated, locale)}</time>
        </p>
      </div>
    </section>
  );
}

export function DatesFaq() {
  const { locale, t } = useLanguage();
  const faqs = datesFaqs(locale);

  return (
    <section className="section-container py-16 md:py-20" aria-labelledby="dates-faq-title">
      <div className="mx-auto max-w-3xl">
        <h2 id="dates-faq-title" className="font-heading text-3xl text-temple-900">
          {t(COPY.faqTitle)}
        </h2>
        <div className="mt-8 divide-y divide-temple-100 rounded-card border border-temple-100 bg-cream-50">
          {faqs.map((f) => (
            <div key={f.q.en} className="p-5 sm:p-6">
              <h3 className="font-semibold text-temple-900">{t(f.q)}</h3>
              <p className="mt-2 leading-relaxed text-temple-600">{t(f.a)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

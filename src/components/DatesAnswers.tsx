"use client";

import { CalendarDays } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { schedule, scheduleUpdated } from "@/data/verified";

const opening = schedule.find((e) => e.id === "dhwajarohan");
import { amritSnans, datesFaqs, formatScheduleDate as formatDate } from "@/data/datesFaq";

/**
 * Plain-text answers to what people actually search for ("shahi snan dates",
 * "nashik kumbh 2027 dates", "नाशिक कुंभमेळा कधी आहे"), placed where both
 * readers and search engines see them first. Dates come from the verified
 * registry, so a schedule change updates this box too.
 */


const COPY = {
  quickTitle: {
    en: "Amrit Snan dates 2027 (Shahi Snan) at a glance",
    hi: "अमृत स्नान तिथियाँ 2027 (शाही स्नान) एक नज़र में",
    mr: "नाशिक कुंभमेळा कधी आहे? अमृत स्नान (शाही स्नान) तारखा 2027",
  },
  quickNote: {
    en: "Shahi Snan has been renamed Amrit Snan; it is the same royal bath. Times are in IST.",
    hi: "शाही स्नान का नाम बदलकर अमृत स्नान कर दिया गया है; यह वही शाही स्नान है। समय IST में है।",
    mr: "शाही स्नानाचे नाव बदलून अमृत स्नान केले आहे; हे तेच शाही स्नान आहे. वेळ IST मध्ये आहे.",
  },
  colDate: { en: "Date", hi: "तिथि", mr: "तारीख" },
  colEvent: { en: "Event and place", hi: "कार्यक्रम और स्थान", mr: "कार्यक्रम आणि ठिकाण" },
  updated: { en: "Last updated", hi: "अंतिम अपडेट", mr: "अखेरचे अद्ययावत" },
  faqTitle: {
    en: "Common questions about the dates",
    hi: "तिथियों के बारे में आम सवाल",
    mr: "तारखांबद्दल नेहमीचे प्रश्न",
  },
};

const TOOLS = {
  lead: { en: "Counting the days?", hi: "दिन गिन रहे हैं?", mr: "दिवस मोजताय?" },
  c: { en: "Live Nashik Kumbh 2027 countdown with calendar reminders", hi: "कैलेंडर रिमाइंडर के साथ लाइव नाशिक कुंभ 2027 काउंटडाउन", mr: "कॅलेंडर रिमाइंडरसह थेट नाशिक कुंभ २०२७ काउंटडाउन" },
  s: { en: "see what is open or closed right now on the Kumbh status board", hi: "अभी क्या खुला या बंद है, कुंभ स्टेटस बोर्ड पर देखें", mr: "सध्या काय खुले किंवा बंद आहे ते कुंभ स्टेटस बोर्डवर पाहा" },
};

export function DatesToolsLinks() {
  const { locale } = useLanguage();
  return (
    <p className="section-container mx-auto max-w-3xl pb-6 text-temple-700">
      <strong>{TOOLS.lead[locale]}</strong>{" "}
      <Link href="/kumbh-countdown" className="font-semibold text-saffron-700 underline">{TOOLS.c[locale]}</Link>
      {" · "}
      <Link href="/kumbh-status" className="font-semibold text-saffron-700 underline">{TOOLS.s[locale]}</Link>.
    </p>
  );
}

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
        <table className="mt-5 w-full text-left">
          <thead>
            <tr className="border-b border-temple-200 text-sm text-temple-500">
              <th scope="col" className="py-2 pr-4 font-medium">{t(COPY.colDate)}</th>
              <th scope="col" className="py-2 font-medium">{t(COPY.colEvent)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-temple-100">
            {[...(opening ? [opening] : []), ...amritSnans].map((e) => (
              <tr key={e.id}>
                <td className="py-3 pr-4 align-top font-semibold text-temple-900">
                  <time dateTime={e.startTime ? `${e.isoDate}T${e.startTime}` : e.isoDate}>
                    {formatDate(e.isoDate, locale)}
                    {e.startTime ? `, ${e.startTime}` : ""}
                  </time>
                </td>
                <td className="py-3 text-temple-600">
                  {t(e.name)} · {t(e.location)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

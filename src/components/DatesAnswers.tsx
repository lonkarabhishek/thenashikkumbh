"use client";

import { CalendarDays } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { majorMelaPeriod, schedule, scheduleUpdated } from "@/data/verified";
import { amritSnans, datesFaqs, formatScheduleDate as formatDate } from "@/data/datesFaq";
import { formatTime, localDigits } from "@/lib/dates";
import type { Locale } from "@/i18n/translations";

const opening = schedule.find((e) => e.id === "dhwajarohan");
const closing = schedule.find((e) => e.id === "conclusion");
const closingTrimbak = schedule.find((e) => e.id === "conclusion-trimbak");

/**
 * One plain sentence answering "when is the Nashik Kumbh" (नाशिक कुंभमेळा कधी
 * आहे / नासिक कुंभ मेला कब है), built from the verified schedule so it can be
 * quoted as is and never drifts from the table below it.
 */
function leadAnswer(locale: Locale): string {
  const d = (iso?: string) => (iso ? formatDate(iso, locale) : "");
  const time = opening?.startTime ? formatTime(opening.startTime, locale) : "";
  const [first, second, thirdNashik, thirdTrimbak] = amritSnans.map((e) => d(e.isoDate));
  const start = d(majorMelaPeriod.startIso);
  const end = d(majorMelaPeriod.endIso);
  const days = localDigits(String(majorMelaPeriod.days), locale);
  if (locale === "mr")
    return `नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभमेळ्याची सुरुवात ${d(opening?.isoDate)} रोजी ${time} वाजता ध्वजारोहणाने होते. भाविकांची सर्वाधिक गर्दी अपेक्षित असलेला मुख्य मेळा कालावधी ${start} ते ${end} असा ${days} दिवसांचा आहे. तीन अमृत स्नाने ${first}, ${second} आणि ${thirdNashik} (नाशिक) / ${thirdTrimbak} (त्र्यंबकेश्वर) रोजी आहेत. सिंहस्थाची सांगता त्र्यंबकेश्वरला ${d(closingTrimbak?.isoDate)} व नाशिकला ${d(closing?.isoDate)} रोजी होईल.`;
  if (locale === "hi")
    return `नासिक–त्र्यंबकेश्वर सिंहस्थ कुंभ मेला ${d(opening?.isoDate)} को ${time} बजे ध्वजारोहण से शुरू होता है। मुख्य मेला अवधि, जब सबसे ज़्यादा श्रद्धालु आने की उम्मीद है, ${start} से ${end} तक ${days} दिन की है। तीन अमृत स्नान ${first}, ${second} और ${thirdNashik} (नासिक) / ${thirdTrimbak} (त्र्यंबकेश्वर) को हैं। सिंहस्थ का समापन त्र्यंबकेश्वर में ${d(closingTrimbak?.isoDate)} और नासिक में ${d(closing?.isoDate)} को होगा।`;
  return `The Nashik–Trimbakeshwar Simhastha Kumbh Mela opens with flag hoisting (Dhwajarohan) on ${d(opening?.isoDate)} at ${time}. The main mela period, when most pilgrims are expected, runs ${days} days from ${start} to ${end}. The three Amrit Snans fall on ${first}, ${second}, and ${thirdNashik} (Nashik) / ${thirdTrimbak} (Trimbakeshwar). The Simhastha closes on ${d(closingTrimbak?.isoDate)} in Trimbakeshwar and ${d(closing?.isoDate)} in Nashik.`;
}

/** Unique official sources behind the dates shown in the quick answer. */
const QUICK_SOURCES = (() => {
  const events = [opening, ...amritSnans, closingTrimbak, closing].filter(Boolean) as typeof schedule;
  const seen = new Map<string, { org: string; title: string; url: string }>();
  for (const e of events) {
    if (!seen.has(e.sourceUrl)) seen.set(e.sourceUrl, { org: e.sourceOrganisation, title: e.sourceTitle, url: e.sourceUrl });
  }
  return Array.from(seen.values());
})();

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
  sources: { en: "Sources", hi: "स्रोत", mr: "स्रोत" },
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
  w: { en: "make a WhatsApp reminder card with the dates", hi: "तिथियों वाला WhatsApp रिमाइंडर कार्ड बनाएँ", mr: "तारखांचे WhatsApp रिमाइंडर कार्ड बनवा" },
  p: { en: "plan your visit around closures and events", hi: "बंदियों और कार्यक्रमों के हिसाब से यात्रा की योजना बनाएँ", mr: "बंदी आणि कार्यक्रमांनुसार भेटीचे नियोजन करा" },
  s: { en: "see what is open or closed right now on the Kumbh status board", hi: "अभी क्या खुला या बंद है, कुंभ स्टेटस बोर्ड पर देखें", mr: "सध्या काय खुले किंवा बंद आहे ते कुंभ स्टेटस बोर्डवर पाहा" },
};

export function DatesToolsLinks() {
  const { locale } = useLanguage();
  return (
    <p className="section-container mx-auto max-w-3xl pb-6 text-temple-700">
      <strong>{TOOLS.lead[locale]}</strong>{" "}
      <Link href="/kumbh-countdown" className="font-semibold text-saffron-700 underline">{TOOLS.c[locale]}</Link>
      {" · "}
      <Link href="/share-snan-card" className="font-semibold text-saffron-700 underline">{TOOLS.w[locale]}</Link>
      {" · "}
      <Link href="/plan-your-visit" className="font-semibold text-saffron-700 underline">{TOOLS.p[locale]}</Link>
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
        <p className="mt-4 leading-relaxed text-temple-700">{leadAnswer(locale)}</p>
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
        <p className="mt-2 text-xs text-temple-500">
          {t(COPY.sources)}:{" "}
          {QUICK_SOURCES.map((src, i) => (
            <span key={src.url}>
              {i > 0 ? "; " : ""}
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">
                {src.org}, {src.title}
              </a>
            </span>
          ))}
        </p>
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

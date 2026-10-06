"use client";

import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { schedule } from "@/data/verified";
import type { Locale } from "@/i18n/translations";

/**
 * Plain-text answers to what people actually search for ("shahi snan dates",
 * "nashik kumbh 2027 dates", "नाशिक कुंभमेळा कधी आहे"), placed where both
 * readers and search engines see them first. Dates come from the verified
 * registry, so a schedule change updates this box too.
 */

const DATE_LOCALE: Record<Locale, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

const amritSnans = schedule
  .filter((e) => e.isAmritSnan)
  .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
const opening = schedule.find((e) => e.id === "dhwajarohan");
const closing = schedule.find((e) => e.id === "conclusion");
const closingTrimbak = schedule.find((e) => e.id === "conclusion-trimbak");

function formatDate(iso: string, locale: Locale) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

const COPY = {
  quickTitle: {
    en: "Shahi Snan (Amrit Snan) dates at a glance",
    hi: "शाही स्नान (अमृत स्नान) की तिथियाँ एक नज़र में",
    mr: "शाही स्नान (अमृत स्नान) तारखा एका नजरेत",
  },
  quickNote: {
    en: "Shahi Snan is now officially called Amrit Snan. It is the same royal bath.",
    hi: "शाही स्नान को अब आधिकारिक रूप से अमृत स्नान कहा जाता है। यह वही शाही स्नान है।",
    mr: "शाही स्नानाला आता अधिकृतपणे अमृत स्नान म्हणतात. हे तेच शाही स्नान आहे.",
  },
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
      </div>
    </section>
  );
}

export function DatesFaq() {
  const { locale, t } = useLanguage();
  const d = (iso?: string) => (iso ? formatDate(iso, locale) : "");
  const [first, second, thirdNashik, thirdTrimbak] = amritSnans.map((e) => d(e.isoDate));

  const faqs = [
    {
      q: {
        en: "When is the Nashik Kumbh Mela 2027?",
        hi: "नाशिक कुंभ मेला 2027 कब है?",
        mr: "नाशिक कुंभमेळा २०२७ कधी आहे?",
      },
      a: {
        en: `It starts with flag hoisting (Dhwajarohan) on ${d(opening?.isoDate)} and closes on ${d(closing?.isoDate)} in Nashik and ${d(closingTrimbak?.isoDate)} in Trimbakeshwar. The main bathing days, the Amrit Snans, are in August and September 2027.`,
        hi: `यह ${d(opening?.isoDate)} को ध्वजारोहण से शुरू होता है और नाशिक में ${d(closing?.isoDate)} तथा त्र्यंबकेश्वर में ${d(closingTrimbak?.isoDate)} को समाप्त होता है। मुख्य स्नान, यानी अमृत स्नान, अगस्त और सितंबर 2027 में हैं।`,
        mr: `तो ${d(opening?.isoDate)} रोजी ध्वजारोहणाने सुरू होतो आणि नाशिकमध्ये ${d(closing?.isoDate)} व त्र्यंबकेश्वरमध्ये ${d(closingTrimbak?.isoDate)} रोजी संपतो. मुख्य स्नाने, म्हणजे अमृत स्नान, ऑगस्ट आणि सप्टेंबर २०२७ मध्ये आहेत.`,
      },
    },
    {
      q: {
        en: "What are the Shahi Snan dates for Nashik Kumbh 2027?",
        hi: "नाशिक कुंभ 2027 की शाही स्नान तिथियाँ क्या हैं?",
        mr: "नाशिक कुंभ २०२७ च्या शाही स्नानाच्या तारखा कोणत्या?",
      },
      a: {
        en: `First: ${first}. Second: ${second}. Third: ${thirdNashik} at Nashik and ${thirdTrimbak} at Trimbakeshwar.`,
        hi: `पहला: ${first}। दूसरा: ${second}। तीसरा: नाशिक में ${thirdNashik} और त्र्यंबकेश्वर में ${thirdTrimbak}।`,
        mr: `पहिले: ${first}. दुसरे: ${second}. तिसरे: नाशिकला ${thirdNashik} आणि त्र्यंबकेश्वरला ${thirdTrimbak}.`,
      },
    },
    {
      q: {
        en: "Is Shahi Snan the same as Amrit Snan?",
        hi: "क्या शाही स्नान और अमृत स्नान एक ही हैं?",
        mr: "शाही स्नान आणि अमृत स्नान एकच आहे का?",
      },
      a: {
        en: "Yes. The Maharashtra government now calls the Shahi Snan the Amrit Snan, the same name used at Prayagraj in 2025. The dates and the ritual are the same.",
        hi: "हाँ। महाराष्ट्र सरकार अब शाही स्नान को अमृत स्नान कहती है, वही नाम जो 2025 में प्रयागराज में इस्तेमाल हुआ। तिथियाँ और विधि वही हैं।",
        mr: "हो. महाराष्ट्र सरकार आता शाही स्नानाला अमृत स्नान म्हणते, जे नाव २०२५ मध्ये प्रयागराजला वापरले गेले. तारखा आणि विधी तेच आहेत.",
      },
    },
    {
      q: {
        en: "Is there a Shahi Snan in 2026?",
        hi: "क्या 2026 में शाही स्नान है?",
        mr: "२०२६ मध्ये शाही स्नान आहे का?",
      },
      a: {
        en: `No. In 2026 there is only the opening flag hoisting on ${d(opening?.isoDate)}. All Amrit Snans are in 2027.`,
        hi: `नहीं। 2026 में केवल ${d(opening?.isoDate)} को उद्घाटन ध्वजारोहण है। सभी अमृत स्नान 2027 में हैं।`,
        mr: `नाही. २०२६ मध्ये फक्त ${d(opening?.isoDate)} रोजी उद्घाटनाचे ध्वजारोहण आहे. सर्व अमृत स्नाने २०२७ मध्ये आहेत.`,
      },
    },
    {
      q: {
        en: "Where does the Amrit Snan happen?",
        hi: "अमृत स्नान कहाँ होता है?",
        mr: "अमृत स्नान कुठे होते?",
      },
      a: {
        en: "At Ram Kund on the Godavari in Nashik, where the Vaishnav akhadas bathe, and at Kushavarta in Trimbakeshwar, where the Shaiva akhadas bathe.",
        hi: "नाशिक में गोदावरी पर रामकुंड में, जहाँ वैष्णव अखाड़े स्नान करते हैं, और त्र्यंबकेश्वर में कुशावर्त में, जहाँ शैव अखाड़े स्नान करते हैं।",
        mr: "नाशिकमध्ये गोदावरीवरील रामकुंडात, जिथे वैष्णव आखाडे स्नान करतात, आणि त्र्यंबकेश्वरमध्ये कुशावर्तात, जिथे शैव आखाडे स्नान करतात.",
      },
    },
    {
      q: {
        en: "What time does the Amrit Snan start?",
        hi: "अमृत स्नान किस समय शुरू होता है?",
        mr: "अमृत स्नान किती वाजता सुरू होते?",
      },
      a: {
        en: "Official timings are not published yet. The akhadas bathe first, well before dawn, and the public follows after them. We will add the times here once the authority announces them.",
        hi: "आधिकारिक समय अभी घोषित नहीं हुआ है। अखाड़े पहले, भोर से काफ़ी पहले स्नान करते हैं, उसके बाद आम श्रद्धालु। प्रशासन के घोषणा करते ही हम समय यहाँ जोड़ेंगे।",
        mr: "अधिकृत वेळा अजून जाहीर झालेल्या नाहीत. आखाडे आधी, पहाटेच्या बऱ्याच आधी स्नान करतात आणि त्यानंतर सामान्य भाविक. प्रशासनाने जाहीर करताच आम्ही वेळा इथे देऊ.",
      },
    },
    {
      q: {
        en: "When was the last Kumbh Mela in Nashik?",
        hi: "नाशिक में पिछला कुंभ मेला कब हुआ था?",
        mr: "नाशिकमध्ये मागचा कुंभमेळा कधी झाला?",
      },
      a: {
        en: "In 2015. The Simhastha comes to Nashik and Trimbakeshwar once every twelve years, so 2027 is the next one.",
        hi: "2015 में। सिंहस्थ नाशिक और त्र्यंबकेश्वर में हर बारह साल में एक बार आता है, इसलिए अगला 2027 में है।",
        mr: "२०१५ मध्ये. सिंहस्थ नाशिक आणि त्र्यंबकेश्वरला दर बारा वर्षांनी एकदा येतो, म्हणून पुढचा २०२७ मध्ये आहे.",
      },
    },
  ];

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

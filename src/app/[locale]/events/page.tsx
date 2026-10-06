"use client";

import Link from "@/components/LocaleLink";
import { ArrowRight, Calendar, Info, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  akhadas,
  announced,
  awaitingByTopic,
  schedule,
  type Akhada,
} from "@/data/verified";
import { formatDate as fmtDate } from "@/lib/dates";

/**
 * Events & Akhadas
 *
 * The prior page shipped a full 2027 event calendar, grand opening,
 * daily discourses, morning yoga, evening bhajans, elephant processions,
 * food distribution, chariot processions, none of which is officially
 * confirmed for 2027. That data has been removed. This page now shows:
 *
 *   1. The three official Amrit Snans from the content registry, as the
 *      only confirmed programme so far.
 *   2. An honest awaiting-confirmation state for the wider event schedule.
 *   3. The recognised 13 akhadas of the Akhil Bharatiya Akhara Parishad,
 *      with the Kinnar Akhara shown separately as a fourteenth body
 *      seeking recognition (not currently recognised by the Parishad).
 */

const TRADITION_LABEL: Record<Akhada["tradition"], { en: string; hi: string; mr: string }> = {
  Shaiva: { en: "Shaiva", hi: "शैव", mr: "शैव" },
  Vaishnava: { en: "Vaishnava", hi: "वैष्णव", mr: "वैष्णव" },
  Udasin_Nirmala: { en: "Udasin & Nirmala", hi: "उदासीन एवं निर्मल", mr: "उदासीन व निर्मल" },
};

const COPY = {
  heroEyebrow: {
    en: "Events · Akhadas",
    hi: "कार्यक्रम · अखाड़े",
    mr: "कार्यक्रम · आखाडे",
  },
  heroTitle: {
    en: "What has been officially announced, and what has not",
    hi: "क्या आधिकारिक रूप से घोषित है, और क्या नहीं",
    mr: "अधिकृतपणे काय जाहीर आहे, आणि काय नाही",
  },
  heroBody: {
    en: "Wire copy about the 2027 Simhastha is already full of specific event promises, grand openings, daily bhajans, elephant processions, free bhandaras. The Nashik–Trimbakeshwar Kumbh Mela Authority has not yet published a detailed event programme. This page distinguishes the three things it has confirmed from the things it has not.",
    hi: "2027 सिंहस्थ के बारे में समाचारों में पहले से ही विशिष्ट कार्यक्रमों की बातें भरी हैं, भव्य उद्घाटन, दैनिक भजन, हाथी शोभायात्रा, नि:शुल्क भंडारे। नाशिक–त्र्यंबकेश्वर कुंभ मेला प्राधिकरण ने अभी विस्तृत कार्यक्रम सूची प्रकाशित नहीं की है। यह पृष्ठ प्राधिकरण द्वारा पुष्ट तीन बातों को अन्य से अलग करके दिखाता है।",
    mr: "२०२७ सिंहस्थाबद्दल बातम्यांत आधीच अनेक कार्यक्रमांच्या घोषणा भरल्या आहेत, भव्य उद्घाटन, दैनिक भजन, हत्ती मिरवणुका, मोफत भंडारे. नाशिक–त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाने अजून तपशीलवार कार्यक्रम सूची प्रकाशित केलेली नाही. हे पान प्राधिकरणाने पुष्टी दिलेल्या तीन गोष्टी इतरांपासून वेगळ्या दाखवते.",
  },
  confirmedTitle: {
    en: "Officially confirmed",
    hi: "आधिकारिक रूप से पुष्ट",
    mr: "अधिकृतपणे पुष्ट",
  },
  announcedTitle: {
    en: "Announced",
    hi: "घोषित",
    mr: "जाहीर",
  },
  announcedBody: {
    en: "These plans have been officially announced. Some details are still to come.",
    hi: "ये योजनाएँ आधिकारिक रूप से घोषित हो चुकी हैं। कुछ विवरण अभी आने बाकी हैं।",
    mr: "या योजना अधिकृतपणे जाहीर झाल्या आहेत. काही तपशील अजून यायचे आहेत.",
  },
  readMore: { en: "Details", hi: "विवरण", mr: "तपशील" },
  awaitingTitle: {
    en: "Awaiting official confirmation",
    hi: "आधिकारिक पुष्टि की प्रतीक्षा",
    mr: "अधिकृत पुष्टीच्या प्रतीक्षेत",
  },
  awaitingBody: {
    en: "The following operational details for 2027 have not yet been officially announced. We will publish them here as they arrive.",
    hi: "2027 के निम्नलिखित संचालन विवरण अभी आधिकारिक रूप से घोषित नहीं किए गए हैं। जैसे-जैसे ये आते जाएँगे, यहाँ प्रकाशित किए जाएँगे।",
    mr: "२०२७ चे खालील संचालन तपशील अजून अधिकृतपणे जाहीर झालेले नाहीत. जसजसे ते येतील तसतसे इथे प्रकाशित केले जातील.",
  },
  akhadasTitle: {
    en: "The recognised akhadas",
    hi: "मान्यता प्राप्त अखाड़े",
    mr: "मान्यताप्राप्त आखाडे",
  },
  akhadasBody: {
    en: "The Akhil Bharatiya Akhara Parishad recognises thirteen akhadas across three traditions.",
    hi: "अखिल भारतीय अखाड़ा परिषद तीन परंपराओं में तेरह अखाड़ों को मान्यता देती है।",
    mr: "अखिल भारतीय आखाडा परिषद तीन परंपरांतील तेरा आखाड्यांना मान्यता देते.",
  },
  kinnarTitle: {
    en: "Kinnar Akhara",
    hi: "किन्नर अखाड़ा",
    mr: "किन्नर आखाडा",
  },
  kinnarBody: {
    en: "The Kinnar Akhara, composed of transgender ascetics, is a fourteenth body that has sought recognition from the Parishad. According to the Parishad it is not currently recognised as one of the thirteen; it is represented in some Kumbh proceedings under the Juna Akhara.",
    hi: "किन्नर अखाड़ा, जिसमें ट्रांसजेंडर तपस्वी हैं, चौदहवाँ ऐसा संगठन है जिसने परिषद से मान्यता माँगी है। परिषद के अनुसार यह वर्तमान में तेरह में शामिल नहीं है; कुछ कुंभ आयोजनों में इसका प्रतिनिधित्व जूना अखाड़े के अंतर्गत होता है।",
    mr: "किन्नर आखाडा, ज्यात ट्रान्सजेंडर तपस्वी आहेत, हा चौदावा संघ आहे ज्याने परिषदेकडून मान्यतेची मागणी केली आहे. परिषदेच्या मते तो सध्या तेरामध्ये गणला जात नाही; काही कुंभ कार्यक्रमांत त्याचे प्रतिनिधित्व जुना आखाड्याच्या अंतर्गत होते.",
  },
  seat: { en: "Seat", hi: "स्थान", mr: "स्थान" },
  status: { en: "Status", hi: "स्थिति", mr: "स्थिती" },
  statusOfficial: { en: "Official", hi: "आधिकारिक", mr: "अधिकृत" },
  statusRecognised: {
    en: "Recognised by Akhara Parishad",
    hi: "अखाड़ा परिषद द्वारा मान्यता प्राप्त",
    mr: "आखाडा परिषदेकडून मान्यताप्राप्त",
  },
  statusNotRecognised: {
    en: "Not currently recognised by the Parishad",
    hi: "वर्तमान में परिषद द्वारा मान्यता प्राप्त नहीं",
    mr: "सध्या परिषदेकडून मान्यताप्राप्त नाही",
  },
  source: { en: "Source", hi: "स्रोत", mr: "स्रोत" },
  verified: { en: "Verified", hi: "सत्यापित", mr: "सत्यापित" },
  viewSchedule: { en: "See the full schedule", hi: "पूरा कार्यक्रम देखें", mr: "संपूर्ण कार्यक्रम पहा" },
};

export default function EventsPage() {
  const { t, locale } = useLanguage();

  const amritSnans = schedule.filter((e) => e.isAmritSnan);
  const recognised = akhadas.filter((a) => a.recognitionStatus === "recognised");
  const kinnar = akhadas.find((a) => a.id === "kinnar");
  const eventProgramme = awaitingByTopic("event-programme");
  const facilityMap = awaitingByTopic("facility-map");
  const trafficPlan = awaitingByTopic("traffic-plan");
  const railwayPlan = awaitingByTopic("railway-plan");
  const accommodation = awaitingByTopic("official-accommodation");
  const timings = awaitingByTopic("amrit-snan-timings");

  const byTradition = recognised.reduce(
    (acc, a) => {
      (acc[a.tradition] ||= []).push(a);
      return acc;
    },
    {} as Record<Akhada["tradition"], Akhada[]>
  );

  return (
    <>
      {/* ═══════════════ Hero ═══════════════ */}
      <section className="section-dark pb-14 pt-32 sm:pt-40">
        <div className="section-container">
          <p className="text-eyebrow font-semibold uppercase text-gold-300">
            {t(COPY.heroEyebrow)}
          </p>
          <h1 className="mt-4 text-title text-balance text-cream-50">
            {t(COPY.heroTitle)}
          </h1>
          <p className="mt-5 max-w-prose text-lede text-cream-200/70">
            {t(COPY.heroBody)}
          </p>
        </div>
      </section>

      {/* ═══════════════ Confirmed ═══════════════ */}
      <section className="section-container section-y">
        <span className="eyebrow">{t(COPY.confirmedTitle)}</span>
        <h2 className="mt-4 text-title">
          {t({ en: "The three Amrit Snans", hi: "तीन अमृत स्नान", mr: "तीन अमृत स्नाने" })}
        </h2>

        <ol className="mt-8 overflow-hidden rounded-card border border-temple-100">
          {amritSnans.map((snan) => (
            <li
              key={snan.id}
              className="flex flex-col gap-4 border-b border-temple-100 bg-cream-50 p-6 last:border-b-0 sm:flex-row sm:items-start sm:gap-8 sm:p-7"
            >
              <div className="shrink-0 sm:w-56">
                <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-saffron-700">
                  <Calendar className="h-3.5 w-3.5" />
                  {fmtDate(snan.isoDate, locale)}
                </p>
                <p className="mt-1 font-heading text-lg text-temple-900">
                  {snan.tithi ? t(snan.tithi) : t(snan.name)}
                </p>
                <p className="mt-1 text-sm text-temple-500">{t(snan.location)}</p>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-temple-900">{t(snan.name)}</p>
                {snan.significance && (
                  <p className="mt-1.5 text-sm leading-relaxed text-temple-600">
                    {t(snan.significance)}
                  </p>
                )}
                <p className="mt-3 text-xs text-temple-400">
                  {t(COPY.status)}: {t(COPY.statusOfficial)} · {t(COPY.source)}:{" "}
                  <a
                    href={snan.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-saffron-700"
                  >
                    {snan.sourceOrganisation}
                  </a>{" "}
                  · {t(COPY.verified)} {snan.verifiedAt}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/dates"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
        >
          {t(COPY.viewSchedule)}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ═══════════════ Awaiting confirmation ═══════════════ */}
      <section className="section-paper py-20 sm:py-28">
        <div className="section-container">
          <span className="eyebrow">{t(COPY.announcedTitle)}</span>
          <p className="mt-4 max-w-prose text-lede text-temple-500">{t(COPY.announcedBody)}</p>
          <ul className="mb-16 mt-8 grid gap-4 sm:grid-cols-2">
            {announced.map((a) => (
              <li key={a.id} className="card-flat">
                <p className="font-semibold text-temple-900">{t(a.topic)}</p>
                <p className="mt-2 text-sm text-temple-700">{t(a.summary)}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="rich-link text-temple-500">
                    {a.sourceLabel}
                  </a>
                  <Link href={a.more} className="rich-link text-saffron-700">
                    {t(COPY.readMore)}
                  </Link>
                </p>
              </li>
            ))}
          </ul>

          <span className="eyebrow">{t(COPY.awaitingTitle)}</span>
          <h2 className="mt-4 text-title">
            {t({
              en: "Not yet published by the authority",
              hi: "प्राधिकरण द्वारा अभी प्रकाशित नहीं",
              mr: "प्राधिकरणाने अजून प्रकाशित केलेले नाही",
            })}
          </h2>
          <p className="mt-4 max-w-prose text-lede text-temple-500">{t(COPY.awaitingBody)}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[eventProgramme, facilityMap, trafficPlan, railwayPlan, accommodation, timings]
              .filter((a): a is NonNullable<typeof a> => Boolean(a))
              .map((a) => (
                <li key={a.id} className="card-flat">
                  <p className="flex items-start gap-2 text-sm text-temple-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-saffron-700" />
                    <span>{t(a.topic)}</span>
                  </p>
                  <p className="mt-2 text-xs text-temple-400">
                    {t({ en: "Expected from", hi: "अपेक्षित स्रोत", mr: "अपेक्षित स्रोत" })}:{" "}
                    {t(a.expectedFrom)}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ Akhadas ═══════════════ */}
      <section className="section-container section-y">
        <span className="eyebrow">
          <Users className="h-3.5 w-3.5" />
          {t(COPY.akhadasTitle)}
        </span>
        <h2 className="mt-4 text-title">
          {t({ en: "Thirteen recognised akhadas", hi: "तेरह मान्यता प्राप्त अखाड़े", mr: "तेरा मान्यताप्राप्त आखाडे" })}
        </h2>
        <p className="mt-4 max-w-prose text-lede text-temple-500">{t(COPY.akhadasBody)}</p>

        <div className="mt-10 space-y-10">
          {(Object.keys(byTradition) as Akhada["tradition"][]).map((tradition) => (
            <div key={tradition}>
              <h3 className="text-eyebrow font-semibold uppercase text-saffron-700">
                {t(TRADITION_LABEL[tradition])}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {byTradition[tradition].map((a) => (
                  <li key={a.id} className="card-flat">
                    <p className="font-heading text-lg text-temple-900">{t(a.name)}</p>
                    <p className="mt-1 text-xs text-temple-400">
                      {t(COPY.seat)}: {t(a.seat)}
                    </p>
                    <p className="mt-2 text-xs text-river-700">{t(COPY.statusRecognised)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {kinnar && (
            <div>
              <h3 className="text-eyebrow font-semibold uppercase text-temple-500">
                {t(COPY.kinnarTitle)}
              </h3>
              <div className="mt-4 card-flat">
                <p className="font-heading text-lg text-temple-900">{t(kinnar.name)}</p>
                <p className="mt-3 text-sm leading-relaxed text-temple-600">
                  {t(COPY.kinnarBody)}
                </p>
                <p className="mt-3 text-xs text-temple-400">
                  {t(COPY.status)}: {t(COPY.statusNotRecognised)} · {t(COPY.source)}:{" "}
                  <a
                    href={kinnar.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-saffron-700"
                  >
                    {kinnar.sourceOrganisation}
                  </a>{" "}
                  · {t(COPY.verified)} {kinnar.verifiedAt}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "@/components/LocaleLink";
import {
  ArrowRight,
  CalendarDays,
  Headphones,
  LifeBuoy,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { translations } from "@/i18n/translations";
import { yatraUI } from "@/i18n/yatraTranslations";
import { ghatsI18n } from "@/data/siteDataI18n";
import { schedule } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { trails } from "@/data/yatraData";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import AskSahayak from "@/components/AskSahayak";
import NewsNudge, { type NewsHeadline } from "@/components/NewsNudge";
import PhotoDrift, { type DriftPhoto } from "@/components/home/PhotoDrift";
import {
  GhatPanorama,
  ProcessionBand,
  RiverBand,
  SamudraManthan,
  WalkingPilgrim,
} from "@/components/art/Scenes";
import { BorderStrip, Diya, Kalash, Lotus, Trishul } from "@/components/art/Motifs";
import { formatDate as fmtDate } from "@/lib/dates";

const MAJOR_DATES = schedule.filter((e) => e.isAmritSnan);

/** First Amrit Snan, the date the whole calendar hangs off. */
const FIRST_SNAN = new Date("2027-08-02T04:00:00+05:30");

const HOME_COPY = {
  nextSnan: { en: "Next Amrit Snan", hi: "अगला अमृत स्नान", mr: "पुढचे अमृत स्नान" },
  storyMore: {
    en: "Read the history of the Kumbh Mela",
    hi: "कुंभ मेले का इतिहास पढ़ें",
    mr: "कुंभमेळ्याचा इतिहास वाचा",
  },
  h1Main: { en: "Nashik Kumbh Mela 2027", hi: "नाशिक कुंभ मेला 2027", mr: "नाशिक कुंभमेळा 2027" },
  h1Sub: {
    en: "(Simhastha): Dates, Amrit Snan, News & Guide",
    hi: "(सिंहस्थ): तिथियाँ, अमृत स्नान, समाचार और गाइड",
    mr: "(सिंहस्थ): तारखा, अमृत स्नान, बातम्या आणि मार्गदर्शक",
  },
  heroKicker: {
    en: "Simhastha Kumbh Mela · Nashik & Trimbakeshwar",
    hi: "सिंहस्थ कुंभ मेला · नाशिक व त्र्यंबकेश्वर",
    mr: "सिंहस्थ कुंभमेळा · नाशिक व त्र्यंबकेश्वर",
  },
  heroLede: {
    en: "Once in twelve years, Jupiter enters Leo and the Godavari is said to carry amrit. Millions come to stand in that water. This is your guide to what it means, where to go, and how to stay safe.",
    hi: "हर बारह वर्ष में एक बार बृहस्पति सिंह राशि में आते हैं और कहा जाता है कि गोदावरी अमृत लेकर बहती है। करोड़ों लोग उस जल में खड़े होने आते हैं। यह मार्गदर्शिका बताती है कि इसका अर्थ क्या है, कहाँ जाना है, और सुरक्षित कैसे रहना है।",
    mr: "दर बारा वर्षांनी एकदा बृहस्पती सिंह राशीत येतो आणि गोदावरी अमृत वाहते असे म्हणतात. कोट्यवधी लोक त्या पाण्यात उभे राहायला येतात. ही मार्गदर्शिका सांगते की याचा अर्थ काय, कुठे जायचे, आणि सुरक्षित कसे राहायचे.",
  },
  askCta: { en: "Ask Sahayak", hi: "सहायक से पूछें", mr: "सहायकाला विचारा" },
  countdownCaption: {
    en: "until the first Amrit Snan: 2 August 2027",
    hi: "प्रथम अमृत स्नान तक: 2 अगस्त 2027",
    mr: "पहिल्या अमृत स्नानापर्यंत: २ ऑगस्ट २०२७",
  },

  storyKicker: { en: "Why it happens", hi: "यह क्यों होता है", mr: "हे का घडते" },
  storyTitle: {
    en: "A pot of amrit, and four drops that fell",
    hi: "अमृत का एक कलश, और गिरी हुई चार बूँदें",
    mr: "अमृताचा एक कलश, आणि पडलेले चार थेंब",
  },
  beat1Title: { en: "The ocean was churned", hi: "समुद्र मथा गया", mr: "समुद्र घुसळला गेला" },
  beat1Body: {
    en: "Devas and asuras used a mountain as the rod and a serpent as the rope, and churned the ocean of milk for a thousand years to draw out amrit, the nectar that ends death.",
    hi: "देवों और असुरों ने पर्वत को मथानी और नाग को रस्सी बनाकर हज़ार वर्ष तक क्षीरसागर मथा, ताकि अमृत निकले, वह जो मृत्यु समाप्त कर दे।",
    mr: "देव आणि असुरांनी पर्वताची रवी आणि नागाची दोरी करून हजार वर्षे क्षीरसागर घुसळला, अमृत निघावे म्हणून, जे मृत्यू संपवते.",
  },
  beat2Title: { en: "Four drops fell to earth", hi: "चार बूँदें धरती पर गिरीं", mr: "चार थेंब पृथ्वीवर पडले" },
  beat2Body: {
    en: "In the chase that followed, four drops spilled from the kalash, at Prayagraj, Haridwar, Ujjain and here, on the Godavari at Nashik. Each place became a Kumbh.",
    hi: "उसके बाद हुए संघर्ष में कलश से चार बूँदें छलकीं, प्रयागराज, हरिद्वार, उज्जैन और यहाँ, नाशिक की गोदावरी पर। हर स्थान कुंभ बन गया।",
    mr: "त्यानंतरच्या झटापटीत कलशातून चार थेंब सांडले, प्रयागराज, हरिद्वार, उज्जैन आणि इथे, नाशिकच्या गोदावरीवर. प्रत्येक ठिकाण कुंभ झाले.",
  },
  beat3Title: { en: "Twelve years, twelve days", hi: "बारह वर्ष, बारह दिन", mr: "बारा वर्षे, बारा दिवस" },
  beat3Body: {
    en: "The churning is said to have lasted twelve divine days, and one divine day is one human year. That is why the Kumbh returns to each city every twelve years.",
    hi: "कहा जाता है कि मंथन बारह दिव्य दिन चला, और एक दिव्य दिन मनुष्य का एक वर्ष है। इसीलिए कुंभ हर नगर में बारह वर्ष बाद लौटता है।",
    mr: "मंथन बारा दिव्य दिवस चालले असे म्हणतात, आणि एक दिव्य दिवस म्हणजे माणसाचे एक वर्ष. म्हणूनच कुंभ प्रत्येक शहरात बारा वर्षांनी परततो.",
  },

  safetyKicker: {
    en: "Before you go down to the water",
    hi: "जल तक जाने से पहले",
    mr: "पाण्यापर्यंत जाण्याआधी",
  },
  safetyTitle: {
    en: "Three things that matter more than darshan",
    hi: "दर्शन से अधिक महत्वपूर्ण तीन बातें",
    mr: "दर्शनापेक्षा महत्त्वाच्या तीन गोष्टी",
  },
  safety1: {
    en: "Know your way out before you go in. Official exit routes are not published yet, so note the way you came in, and follow police directions on the ghats.",
    hi: "भीतर जाने से पहले बाहर निकलने का रास्ता जान लें। आधिकारिक निकास मार्ग अभी घोषित नहीं हुए हैं, इसलिए जिस रास्ते से आए उसे याद रखें और घाटों पर पुलिस के निर्देश मानें।",
    mr: "आत जाण्यापूर्वी बाहेर पडण्याचा मार्ग जाणून घ्या. अधिकृत निर्गमन मार्ग अजून जाहीर झालेले नाहीत, म्हणून ज्या वाटेने आलात ती लक्षात ठेवा आणि घाटांवर पोलिसांच्या सूचना पाळा.",
  },

  safety2: {
    en: "Agree a meeting point with your family that is a place, not a person. Phones lose signal in a crowd of millions.",
    hi: "परिवार से मिलने की जगह तय करें, कोई व्यक्ति नहीं, कोई स्थान। लाखों की भीड़ में फ़ोन का नेटवर्क चला जाता है।",
    mr: "कुटुंबाशी भेटण्याची जागा ठरवा, कोणी माणूस नव्हे, एखादे ठिकाण. लाखोंच्या गर्दीत फोनचे नेटवर्क जाते.",
  },
  safety3: {
    en: "Emergency numbers work without internet: 112 police, 108 ambulance, 101 fire. Save them before you leave your room.",
    hi: "आपातकालीन नंबर बिना इंटरनेट काम करते हैं: 112 पुलिस, 108 एम्बुलेंस, 101 अग्निशमन। कमरे से निकलने से पहले सहेज लें।",
    mr: "आपत्कालीन क्रमांक इंटरनेटशिवाय चालतात: ११२ पोलीस, १०८ रुग्णवाहिका, १०१ अग्निशमन. खोलीतून निघण्यापूर्वी जतन करा.",
  },

  akhadaKicker: { en: "The orders", hi: "अखाड़े", mr: "आखाडे" },
  akhadaTitle: {
    en: "Thirteen akhadas lead the way to the water",
    hi: "तेरह अखाड़े जल तक का मार्ग ले जाते हैं",
    mr: "तेरा आखाडे पाण्यापर्यंतचा मार्ग नेतात",
  },
  akhadaBody: {
    en: "Monastic orders that were once fighting bodies, they still march in a precedence agreed centuries ago. On Shahi Snan mornings they bathe first, and the public follows.",
    hi: "वे मठीय संप्रदाय जो कभी लड़ाकू संगठन थे, आज भी सदियों पहले तय क्रम में चलते हैं। शाही स्नान की सुबह वे पहले स्नान करते हैं, फिर जनता।",
    mr: "एकेकाळी लढाऊ संघटना असलेले हे मठीय संप्रदाय आजही शतकांपूर्वी ठरलेल्या क्रमाने चालतात. शाही स्नानाच्या सकाळी ते आधी स्नान करतात, मग सामान्य लोक.",
  },
};

function formatHomeDate(iso: string, locale: Locale) {
  return fmtDate(iso, locale, { weekday: true });
}

export default function HomePage({ news, glimpses }: { news: NewsHeadline[]; glimpses: DriftPhoto[] }) {
  const { locale, t } = useLanguage();
  const { open: openChat } = useChat();

  const majorDates = MAJOR_DATES;

  // The next Amrit Snan gets a flickering diya. Worked out in the browser so
  // the static page never goes stale.
  const [nextId, setNextId] = useState<string | null>(null);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setNextId(MAJOR_DATES.find((d) => d.isoDate >= today)?.id ?? null);
  }, []);
  const featuredGhats = ghatsI18n.slice(0, 3);

  const storyBeats = [
    { icon: Waves, title: HOME_COPY.beat1Title, body: HOME_COPY.beat1Body },
    { icon: Kalash, title: HOME_COPY.beat2Title, body: HOME_COPY.beat2Body },
    { icon: Lotus, title: HOME_COPY.beat3Title, body: HOME_COPY.beat3Body },
  ];

  return (
    <>
      {/* ═══ Hero ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-cream-100 paper-grain">
        <div className="section-container relative z-10 pt-28 pb-8 text-center sm:pt-36">
          <Reveal>
            <p className="font-devanagari text-sm text-gold-600">॥ श्री गणेशाय नमः ॥</p>
            <p className="mt-6 text-eyebrow font-semibold uppercase text-saffron-700">
              {t(HOME_COPY.heroKicker)}
            </p>
            <h1 className="mt-5 text-display text-balance">
              {t(HOME_COPY.h1Main)}
              <span className="mt-3 block font-sans text-lg font-semibold tracking-normal text-temple-600 sm:text-xl">
                {t(HOME_COPY.h1Sub)}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={70}>
            <div className="mt-8">
              <Countdown target={FIRST_SNAN} caption={t(HOME_COPY.countdownCaption)} />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="mx-auto mt-7 max-w-2xl text-lede text-temple-500">
              {t(HOME_COPY.heroLede)}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button onClick={openChat} className="btn-primary">
                <Sparkles className="h-4 w-4" />
                {t(HOME_COPY.askCta)}
              </button>
              <Link href="/yatra" className="btn-secondary">
                <Headphones className="h-4 w-4" />
                {t(yatraUI.homeTeaser)}
              </Link>
              <Link href="/dates" className="btn-secondary">
                <CalendarDays className="h-4 w-4" />
                {t(translations.hero.exploreDates)}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* the ghats, drawn */}
        <GhatPanorama className="mt-4 w-full" />
      </section>

      {/* ═══ Ask Sahayak, first thing after the hero ═══════ */}
      <AskSahayak />

      {/* ═══ Why it happens ═════════════════════════════════ */}
      <section className="section-container section-y">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <SamudraManthan className="w-full rounded-card border border-temple-100" />
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">{t(HOME_COPY.storyKicker)}</span>
              <h2 className="mt-5 text-title text-balance">{t(HOME_COPY.storyTitle)}</h2>
            </Reveal>

            <div className="mt-9 space-y-8">
              {storyBeats.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-200 text-saffron-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-temple-900">{t(title)}</h3>
                      <p className="mt-1.5 leading-relaxed text-temple-500">{t(body)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
              >
                {t(HOME_COPY.storyMore)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Yatra, the headline feature ═══════════════════ */}
      <section className="section-dark relative overflow-hidden">
        <div className="section-container grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">{t(yatraUI.eyebrow)}</span>
              <h2 className="mt-5 text-title text-balance text-cream-50">
                {t(yatraUI.homeTeaser)}
              </h2>
              <p className="mt-5 max-w-prose text-lede text-cream-200/75">
                {t(yatraUI.homeTeaserBody)}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-9 grid gap-4 sm:grid-cols-3">
                {trails.map((trail) => (
                  <li key={trail.id}>
                    <Link
                      href={`/yatra/${trail.id}`}
                      className="group block rounded-xl border border-cream-200/10 p-4 transition-colors hover:border-gold-500/45"
                    >
                      <span className="block font-heading text-lg text-cream-50">
                        {t(trail.name)}
                      </span>
                      <span className="mt-1 block text-xs text-cream-200/55">
                        {trail.stops.length} {t(yatraUI.stops)} · {trail.totalMinutes}{" "}
                        {t(yatraUI.minutes)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <Link href="/yatra" className="btn-primary mt-9">
                <Headphones className="h-4 w-4" />
                {t(yatraUI.chooseTrail)}
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <WalkingPilgrim className="mx-auto w-full max-w-sm opacity-95" />
          </Reveal>
        </div>
      </section>

      {/* ═══ Sacred dates ═══════════════════════════════════ */}
      <section className="section-container section-y">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{t(translations.home.datesTitle)}</span>
          <h2 className="mt-5 text-title">{t(translations.home.datesSubtitle)}</h2>
        </Reveal>

        <ol className="mt-12 overflow-hidden rounded-card border border-temple-100">
          {majorDates.map((date, i) => (
            <Reveal as="li" key={date.id} delay={i * 60}>
              <div className="flex flex-col gap-4 border-b border-temple-100 bg-cream-50 p-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
                <div className="flex shrink-0 items-center gap-4 sm:w-52">
                  <Diya
                    className={`h-7 w-7 shrink-0 text-saffron-600 ${date.id === nextId ? "diya-flicker" : ""}`}
                  />
                  <div>
                    <p className="font-heading text-lg leading-tight text-temple-900">
                      {formatHomeDate(date.isoDate, locale)}
                    </p>
                    {date.id === nextId && (
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-saffron-700">
                        <span className="live-dot h-1.5 w-1.5" aria-hidden />
                        {t(HOME_COPY.nextSnan)}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-temple-400">{date.tithi ? t(date.tithi) : t(date.location)}</p>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-temple-900">{t(date.name)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-temple-500">
                    {date.significance ? t(date.significance) : t(date.location)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <Link
            href="/dates"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-saffron-800"
          >
            {t(translations.home.viewAllDates)}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ═══ Glimpses, a slow drifting photo strip ══════════ */}
      <PhotoDrift photos={glimpses} />

      {/* ═══ News, a pointer to /blog, headlines only ═══════ */}
      <NewsNudge items={news} />

      {/* ═══ Ghats ══════════════════════════════════════════ */}
      <section className="section-paper py-20 sm:py-28">
        <div className="section-container">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(translations.home.ghatsTitle)}</span>
            <h2 className="mt-5 text-title">{t(translations.home.ghatsSubtitle)}</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredGhats.map((ghat, i) => (
              <Reveal key={ghat.id} delay={i * 80} className="h-full">
                <Link href="/ghats" className="card-sacred group flex h-full flex-col p-7">
                  <MapPin className="h-7 w-7 text-river-600" />
                  <h3 className="mt-5 font-heading text-xl text-temple-900">{t(ghat.name)}</h3>
                  <p className="mt-1 text-sm font-medium text-saffron-700">{t(ghat.subtitle)}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-temple-500">
                    {t(ghat.description)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-temple-800">
                    {t(translations.home.exploreGhats)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RiverBand className="w-full" />

      {/* ═══ Safety ═════════════════════════════════════════ */}
      <section className="section-container section-y">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">{t(HOME_COPY.safetyKicker)}</span>
            <h2 className="mt-5 text-title text-balance">{t(HOME_COPY.safetyTitle)}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:112" className="btn-secondary">
                <Phone className="h-4 w-4" />
                112
              </a>
              <a href="tel:108" className="btn-secondary">
                <LifeBuoy className="h-4 w-4" />
                108
              </a>
              <Link href="/guide" className="btn-secondary">
                <Navigation className="h-4 w-4" />
                {t(translations.nav.guide)}
              </Link>
            </div>
          </Reveal>

          <ol>
            {[HOME_COPY.safety1, HOME_COPY.safety2, HOME_COPY.safety3].map((item, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <div className="flex gap-5 border-b border-temple-100 py-6 first:pt-0">
                  <span className="font-heading text-3xl leading-none text-temple-200">
                    0{i + 1}
                  </span>
                  <p className="leading-relaxed text-temple-600">{t(item)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ Akhadas ════════════════════════════════════════ */}
      <section className="section-dark overflow-hidden">
        <div className="section-container pt-20 sm:pt-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <span className="eyebrow">{t(HOME_COPY.akhadaKicker)}</span>
              <h2 className="mt-5 text-title text-balance text-cream-50">
                {t(HOME_COPY.akhadaTitle)}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lede text-cream-200/70">{t(HOME_COPY.akhadaBody)}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/events" className="btn-on-dark">
                  <Trishul className="h-4 w-4" />
                  {t(translations.home.viewAllEvents)}
                </Link>
                <Link href="/naga-sadhus" className="btn-on-dark">
                  {t(translations.nav.nagaSadhus)}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 text-cream-200/70">
          <ProcessionBand className="w-full" />
        </div>
      </section>

      {/* ═══ Closing ════════════════════════════════════════ */}
      <section className="section-container py-20 text-center sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-xl">
            <Kalash className="mx-auto h-12 w-12 text-gold-600" />
            <h2 className="mt-7 text-title text-balance">{t(translations.home.ctaTitle)}</h2>
            <p className="mt-4 text-lede text-temple-500">{t(translations.home.ctaDesc)}</p>
            <Link href="/guide" className="btn-primary mt-8">
              {t(translations.home.ctaButton)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 text-gold-500/40">
          <BorderStrip className="h-4 w-full" />
        </div>
      </section>
    </>
  );
}

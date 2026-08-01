"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Send, Sparkles, WifiOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { quickStartChips } from "@/data/chatbotKnowledgeBase";
import { SunMandala } from "@/components/art/Motifs";

const COPY = {
  eyebrow: { en: "Kumbh Sahayak", hi: "कुंभ सहायक", mr: "कुंभ सहायक" },
  title: {
    en: "Ask anything. In your own language.",
    hi: "कुछ भी पूछिए। अपनी ही भाषा में।",
    mr: "काहीही विचारा. तुमच्याच भाषेत.",
  },
  body: {
    en: "Where to stay, which ghat to bathe at, what a Shahi Snan actually involves, what to do if you get separated from your family. Type it the way you would say it out loud.",
    hi: "कहाँ ठहरें, किस घाट पर स्नान करें, शाही स्नान में होता क्या है, परिवार से बिछड़ जाएँ तो क्या करें। जैसे बोलते हैं वैसे ही लिख दीजिए।",
    mr: "कुठे राहायचे, कोणत्या घाटावर स्नान करायचे, शाही स्नानात नेमके काय होते, कुटुंबापासून ताटातूट झाली तर काय करायचे. जसे बोलता तसेच लिहा.",
  },
  cta: { en: "Ask Sahayak", hi: "सहायक से पूछें", mr: "सहायकाला विचारा" },
  popular: { en: "People are asking", hi: "लोग पूछ रहे हैं", mr: "लोक विचारत आहेत" },
  offline: {
    en: "Works without a signal",
    hi: "बिना नेटवर्क भी चलता है",
    mr: "नेटवर्कशिवायही चालते",
  },
  languages: {
    en: "Marathi · Hindi · English",
    hi: "मराठी · हिंदी · अंग्रेज़ी",
    mr: "मराठी · हिंदी · इंग्रजी",
  },
  instant: { en: "Answers instantly", hi: "तुरंत उत्तर", mr: "लगेच उत्तर" },
};

/** Placeholder questions that cycle through the input, in the user's language. */
const PROMPTS: Record<string, string[]> = {
  en: [
    "Which day is the first Shahi Snan?",
    "Where can I stay near Ram Kund?",
    "How do I reach Trimbakeshwar from Nashik?",
    "What should I carry to the ghats?",
    "What do I do if I get separated from my family?",
  ],
  hi: [
    "पहला शाही स्नान किस दिन है?",
    "रामकुंड के पास कहाँ ठहर सकते हैं?",
    "नाशिक से त्र्यंबकेश्वर कैसे पहुँचें?",
    "घाट पर क्या साथ ले जाएँ?",
    "परिवार से बिछड़ जाऊँ तो क्या करूँ?",
  ],
  mr: [
    "पहिले शाही स्नान कोणत्या दिवशी आहे?",
    "रामकुंडाजवळ कुठे राहता येईल?",
    "नाशिकहून त्र्यंबकेश्वरला कसे जायचे?",
    "घाटावर काय सोबत न्यायचे?",
    "कुटुंबापासून ताटातूट झाली तर काय करू?",
  ],
};

export default function AskSahayak() {
  const { t, locale } = useLanguage();
  const { open, openWithTopic } = useChat();

  const prompts = PROMPTS[locale] ?? PROMPTS.en;
  const [promptIndex, setPromptIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setPromptIndex(0);
  }, [locale]);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      const swap = setTimeout(() => {
        setPromptIndex((i) => (i + 1) % prompts.length);
        setFading(false);
      }, 320);
      return () => clearTimeout(swap);
    }, 3600);
    return () => clearInterval(id);
  }, [prompts.length]);

  const chips = quickStartChips.slice(0, 6);

  return (
    <section className="section-dark relative overflow-hidden">
      {/* a slow mandala behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 text-gold-500/10 lg:block"
      >
        <SunMandala className="h-[34rem] w-[34rem] animate-rotate-slow" />
      </div>

      <div className="section-container relative z-10 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {t(COPY.eyebrow)}
            </span>

            <h2 className="mt-5 text-title text-balance text-cream-50">{t(COPY.title)}</h2>
            <p className="mt-5 max-w-prose text-lede text-cream-200/70">{t(COPY.body)}</p>

            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream-200/60">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {t(COPY.languages)}
              </li>
              <li className="flex items-center gap-2">
                <WifiOff className="h-3.5 w-3.5 text-gold-400" />
                {t(COPY.offline)}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {t(COPY.instant)}
              </li>
            </ul>
          </div>

          {/* The panel — looks like the assistant, opens the real one on click */}
          <div className="rounded-card border border-cream-200/10 bg-cream-50/[0.04] p-5 backdrop-blur-sm sm:p-7">
            <button
              onClick={open}
              className="group w-full rounded-2xl border border-cream-200/15 bg-indigo-900/50 p-4 text-left transition-colors hover:border-gold-500/45"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron-600 text-cream-50">
                  <Sparkles className="h-5 w-5" />
                </span>

                <span
                  className={`min-w-0 flex-1 truncate text-cream-200/55 transition-opacity duration-300 ${
                    fading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {prompts[promptIndex]}
                </span>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-100 transition-colors group-hover:bg-saffron-600">
                  <Send className="h-4 w-4 -translate-x-px" />
                </span>
              </span>
            </button>

            <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
              {t(COPY.popular)}
            </p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.topicId}
                  onClick={() => openWithTopic(chip.topicId)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-cream-200/15 px-3.5 py-2 text-sm text-cream-200/80 transition-colors hover:border-gold-500/50 hover:text-cream-50"
                >
                  {t(chip.label)}
                  <ArrowUpRight className="h-3.5 w-3.5 text-cream-200/40 transition-colors group-hover:text-gold-300" />
                </button>
              ))}
            </div>

            <button onClick={open} className="btn-primary mt-7 w-full">
              <Sparkles className="h-4 w-4" />
              {t(COPY.cta)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Languages, Send, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { quickStartChips } from "@/data/chatbotKnowledgeBase";

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
  languages: {
    en: "Marathi · Hindi · English",
    hi: "मराठी · हिंदी · अंग्रेज़ी",
    mr: "मराठी · हिंदी · इंग्रजी",
  },
  instant: { en: "Answers instantly", hi: "तुरंत उत्तर", mr: "लगेच उत्तर" },
  sourced: {
    en: "Sourced answers",
    hi: "स्रोत-सहित उत्तर",
    mr: "स्रोतासह उत्तरे",
  },
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
      {/* A soft glow behind the panel. The mandala that used to sit here was
          34rem wide against the right edge, so it clipped into a hard-edged
          artifact at every viewport width. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 60% at 76% 48%, rgba(201,162,39,0.16), transparent 68%)",
        }}
      />

      <div className="section-container relative z-10 py-20 sm:py-28">
        {/* min-w-0 on both columns: without it the grid tracks size to the
            panel's intrinsic width and the whole section overflows a phone. */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            {/* Not the .eyebrow class — its ::before rule collides with the icon. */}
            <span className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-gold-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t(COPY.eyebrow)}
            </span>

            <h2 className="mt-5 text-title text-balance text-cream-50">{t(COPY.title)}</h2>
            <p className="mt-5 max-w-prose text-lede text-cream-200/70">{t(COPY.body)}</p>

            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream-200/60">
              {[
                { Icon: Languages, text: COPY.languages },
                // "Works without a signal" removed until a real PWA ships (Phase 7).
                { Icon: Zap, text: COPY.instant },
                { Icon: Sparkles, text: COPY.sourced },
              ].map(({ Icon, text }) => (
                <li key={text.en} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                  {t(text)}
                </li>
              ))}
            </ul>
          </div>

          {/* The panel — looks like the assistant, opens the real one on click */}
          <div className="min-w-0 rounded-card border border-cream-200/10 bg-cream-50/[0.04] p-4 backdrop-blur-sm sm:p-6 lg:p-7">
            <button
              onClick={open}
              className="group w-full rounded-2xl border border-cream-200/15 bg-indigo-900/50 p-4 text-left transition-colors hover:border-gold-500/45"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron-600 text-cream-50">
                  <Sparkles className="h-5 w-5" />
                </span>

                {/* w-0 as well as min-w-0, so the rotating question never
                    contributes its full length to the intrinsic width. */}
                <span
                  className={`w-0 min-w-0 flex-1 truncate text-sm text-cream-200/55 transition-opacity duration-300 sm:text-base ${
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

            {/* A grid, so the chips line up instead of ragging across rows. */}
            <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
              {chips.map((chip) => (
                <button
                  key={chip.topicId}
                  onClick={() => openWithTopic(chip.topicId)}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-cream-200/15 px-3.5 py-2.5 text-left text-sm text-cream-200/80 transition-colors hover:border-gold-500/50 hover:bg-cream-50/5 hover:text-cream-50"
                >
                  <span className="truncate">{t(chip.label)}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-cream-200/40 transition-colors group-hover:text-gold-300" />
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

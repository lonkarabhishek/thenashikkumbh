"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Music,
  Flower2,
  BookOpen,
  Camera,
  MessageCircle,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";

/* ───────────────────────────── animation helpers ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ───────────────────────────── activity data ───────────────────────────── */

type TranslatedString = { en: string; hi: string; mr: string };

interface Activity {
  icon: React.ReactNode;
  titleKey: TranslatedString;
  descKey: TranslatedString;
  badgeKey: TranslatedString;
  badgeColor: string;
}

const activities: Activity[] = [
  {
    icon: <Palette className="h-7 w-7" />,
    titleKey: translations.gamesPage.actRangoli,
    descKey: translations.gamesPage.actRangoliDesc,
    badgeKey: translations.gamesPage.registration,
    badgeColor: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: <Music className="h-7 w-7" />,
    titleKey: translations.gamesPage.actBhajan,
    descKey: translations.gamesPage.actBhajanDesc,
    badgeKey: translations.gamesPage.daily,
    badgeColor: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
  },
  {
    icon: <Flower2 className="h-7 w-7" />,
    titleKey: translations.gamesPage.actYoga,
    descKey: translations.gamesPage.actYogaDesc,
    badgeKey: translations.gamesPage.free,
    badgeColor: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30",
  },
  {
    icon: <BookOpen className="h-7 w-7" />,
    titleKey: translations.gamesPage.actShloka,
    descKey: translations.gamesPage.actShlokaDesc,
    badgeKey: translations.gamesPage.registration,
    badgeColor: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: <Camera className="h-7 w-7" />,
    titleKey: translations.gamesPage.actPhoto,
    descKey: translations.gamesPage.actPhotoDesc,
    badgeKey: translations.gamesPage.free,
    badgeColor: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30",
  },
  {
    icon: <MessageCircle className="h-7 w-7" />,
    titleKey: translations.gamesPage.actKatha,
    descKey: translations.gamesPage.actKathaDesc,
    badgeKey: translations.gamesPage.daily,
    badgeColor: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
  },
];

/* ───────────────────────────── quiz data ───────────────────────────── */

interface QuizQuestion {
  question: TranslatedString;
  options: TranslatedString[];
  correctIndex: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: { en: "How many sacred cities host the Kumbh Mela?", hi: "कुंभ मेला कितने पवित्र शहरों में लगता है?", mr: "कुंभमेळा किती पवित्र शहरांत भरतो?" },
    options: [
      { en: "2", hi: "२", mr: "२" },
      { en: "4", hi: "४", mr: "४" },
      { en: "6", hi: "६", mr: "६" },
      { en: "8", hi: "८", mr: "८" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "Which river flows through Nashik?", hi: "नासिक से कौन सी नदी बहती है?", mr: "नाशिकमधून कोणती नदी वाहते?" },
    options: [
      { en: "Ganga", hi: "गंगा", mr: "गंगा" },
      { en: "Yamuna", hi: "यमुना", mr: "यमुना" },
      { en: "Godavari", hi: "गोदावरी", mr: "गोदावरी" },
      { en: "Narmada", hi: "नर्मदा", mr: "नर्मदा" },
    ],
    correctIndex: 2,
  },
  {
    question: { en: "What emerged from the Samudra Manthan?", hi: "समुद्र मंथन से क्या निकला?", mr: "समुद्र मंथनातून काय निघाले?" },
    options: [
      { en: "Gold", hi: "सोना", mr: "सोने" },
      { en: "Amrit (Nectar)", hi: "अमृत", mr: "अमृत" },
      { en: "Diamonds", hi: "हीरे", mr: "हिरे" },
      { en: "Silver", hi: "चाँदी", mr: "चांदी" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "What is Nashik Kumbh also known as?", hi: "नासिक कुंभ को और क्या कहते हैं?", mr: "नाशिक कुंभाला अजून कोणत्या नावाने ओळखतात?" },
    options: [
      { en: "Maha Kumbh", hi: "महा कुंभ", mr: "महा कुंभ" },
      { en: "Ardh Kumbh", hi: "अर्ध कुंभ", mr: "अर्ध कुंभ" },
      { en: "Simhastha Kumbh", hi: "सिंहस्थ कुंभ", mr: "सिंहस्थ कुंभ" },
      { en: "Purna Kumbh", hi: "पूर्ण कुंभ", mr: "पूर्ण कुंभ" },
    ],
    correctIndex: 2,
  },
  {
    question: { en: "How often does Kumbh Mela occur at each site?", hi: "प्रत्येक स्थल पर कुंभ मेला कितने वर्षों में लगता है?", mr: "प्रत्येक ठिकाणी कुंभमेळा किती वर्षांनी भरतो?" },
    options: [
      { en: "Every 6 years", hi: "हर 6 वर्ष", mr: "दर 6 वर्षांनी" },
      { en: "Every 12 years", hi: "हर 12 वर्ष", mr: "दर 12 वर्षांनी" },
      { en: "Every 10 years", hi: "हर 10 वर्ष", mr: "दर 10 वर्षांनी" },
      { en: "Every 15 years", hi: "हर 15 वर्ष", mr: "दर 15 वर्षांनी" },
    ],
    correctIndex: 1,
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function GamesPage() {
  const { t, locale } = useLanguage();

  /* Quiz state */
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  /* Form state */
  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    contact: "",
    description: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* Quiz handlers */
  const handleOptionClick = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (index === quizQuestions[currentQ].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  /* Form handlers */
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", organizer: "", contact: "", description: "" });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  /* Helper to translate quiz strings */
  const tq = (obj: TranslatedString): string => obj[locale as Locale] || obj.en;

  return (
    <>
      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-20 top-10 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="section-container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{
              color: "#D4A843",
              textShadow: "0 0 30px rgba(212,168,67,0.4)",
            }}
            aria-hidden="true"
          >
            क्रीडा
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.gamesPage.heroTitle)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.gamesPage.heroSubtitle)}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ FEATURED ACTIVITIES ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          {/* Section Header */}
          <motion.div
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="om-decoration mb-4 inline-block" aria-hidden="true">
              ॐ
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">
                {t(translations.gamesPage.featuredTitle)}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.featuredSubtitle)}
            </p>
          </motion.div>

          {/* Activities Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500"
                style={{
                  background: "rgba(26,21,16,0.85)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(212,168,67,0.12)",
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={index}
                whileHover={{
                  borderColor: "rgba(212,168,67,0.4)",
                  boxShadow: "0 20px 60px rgba(212,168,67,0.12)",
                  y: -4,
                }}
              >
                {/* Card glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 60%)",
                  }}
                />

                <div className="relative p-6 md:p-8">
                  {/* Icon */}
                  <div
                    className="mb-5 inline-flex items-center justify-center rounded-xl p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(212,168,67,0.05) 100%)",
                      border: "1px solid rgba(212,168,67,0.2)",
                    }}
                  >
                    <span style={{ color: "#D4A843" }}>{activity.icon}</span>
                  </div>

                  {/* Badge */}
                  <span
                    className={`mb-4 inline-flex items-center rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium ${activity.badgeColor}`}
                  >
                    {t(activity.badgeKey)}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-cream-100 md:text-xl">
                    {t(activity.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-cream-300/60 md:text-base">
                    {t(activity.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span
          className="mx-4 font-devanagari text-2xl"
          style={{ color: "#D4A843", textShadow: "0 0 20px rgba(212,168,67,0.3)" }}
          aria-hidden="true"
        >
          ॐ
        </span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ SPIRITUAL QUIZ ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="section-container relative z-10">
          {/* Section Header */}
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" style={{ color: "#D4A843" }} />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4A843]">
                Quiz
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">
                {t(translations.gamesPage.quizTitle)}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.quizSubtitle)}
            </p>
          </motion.div>

          {/* Quiz Card */}
          <motion.div
            className="mx-auto max-w-2xl overflow-hidden rounded-2xl"
            style={{
              background: "rgba(26,21,16,0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(212,168,67,0.15)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {/* Start Screen */}
                {!quizStarted && !showResult && (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,168,67,0.2) 0%, rgba(212,168,67,0.05) 100%)",
                        border: "1px solid rgba(212,168,67,0.3)",
                      }}
                    >
                      <Sparkles className="h-10 w-10" style={{ color: "#D4A843" }} />
                    </div>
                    <p className="mb-8 text-cream-300/60">
                      {t(translations.gamesPage.quizSubtitle)}
                    </p>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="group relative inline-flex items-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-[#0D0906] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: "linear-gradient(135deg, #D4A843, #FFD700)",
                        boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                      }}
                    >
                      {t(translations.gamesPage.startQuiz)}
                    </button>
                  </motion.div>
                )}

                {/* Question Screen */}
                {quizStarted && !showResult && (
                  <motion.div
                    key={`q-${currentQ}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Progress */}
                    <div className="mb-6 flex items-center justify-between text-sm text-cream-300/40">
                      <span>
                        {currentQ + 1} / {quizQuestions.length}
                      </span>
                      <span>
                        {t(translations.gamesPage.yourScore)}: {score}
                      </span>
                    </div>
                    <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #D4A843, #FFD700)",
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentQ + 1) / quizQuestions.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Question */}
                    <h3 className="mb-6 text-xl font-bold text-cream-100 md:text-2xl">
                      {tq(quizQuestions[currentQ].question)}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {quizQuestions[currentQ].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect =
                          idx === quizQuestions[currentQ].correctIndex;
                        const showCorrect = answered && isCorrect;
                        const showWrong = answered && isSelected && !isCorrect;

                        let borderColor = "rgba(212,168,67,0.12)";
                        let bgColor = "rgba(26,21,16,0.6)";
                        if (showCorrect) {
                          borderColor = "rgba(34,197,94,0.6)";
                          bgColor = "rgba(34,197,94,0.1)";
                        } else if (showWrong) {
                          borderColor = "rgba(239,68,68,0.6)";
                          bgColor = "rgba(239,68,68,0.1)";
                        }

                        return (
                          <motion.button
                            key={idx}
                            onClick={() => handleOptionClick(idx)}
                            className="flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left transition-all duration-300"
                            style={{
                              border: `1px solid ${borderColor}`,
                              background: bgColor,
                            }}
                            whileHover={
                              !answered
                                ? {
                                    borderColor: "rgba(212,168,67,0.4)",
                                    background: "rgba(212,168,67,0.05)",
                                  }
                                : {}
                            }
                            whileTap={!answered ? { scale: 0.98 } : {}}
                          >
                            <span className="flex-1 text-cream-100">
                              {tq(option)}
                            </span>
                            {showCorrect && (
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                            )}
                            {showWrong && (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Feedback + Next */}
                    <AnimatePresence>
                      {answered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 flex items-center justify-between"
                        >
                          <span
                            className={`text-sm font-medium ${
                              selectedOption ===
                              quizQuestions[currentQ].correctIndex
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {selectedOption ===
                            quizQuestions[currentQ].correctIndex
                              ? t(translations.gamesPage.correct)
                              : t(translations.gamesPage.incorrect)}
                          </span>
                          <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[#0D0906] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                            style={{
                              background:
                                "linear-gradient(135deg, #D4A843, #FFD700)",
                            }}
                          >
                            {currentQ < quizQuestions.length - 1
                              ? t(translations.gamesPage.nextQuestion)
                              : t(translations.gamesPage.seeResults)}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Results Screen */}
                {showResult && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div
                      className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,168,67,0.2) 0%, rgba(212,168,67,0.05) 100%)",
                        border: "2px solid rgba(212,168,67,0.3)",
                      }}
                    >
                      <Trophy className="h-12 w-12" style={{ color: "#FFD700" }} />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-cream-100">
                      {t(translations.gamesPage.yourScore)}
                    </h3>
                    <p
                      className="mb-2 font-heading text-6xl font-bold"
                      style={{ color: "#D4A843" }}
                    >
                      {score}
                      <span className="text-2xl text-cream-300/40">
                        {" "}
                        / {quizQuestions.length}
                      </span>
                    </p>
                    <p className="mb-8 text-cream-300/50">
                      {score === quizQuestions.length
                        ? "🙏"
                        : score >= 3
                          ? "✨"
                          : "📿"}
                    </p>

                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0D0906] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: "linear-gradient(135deg, #D4A843, #FFD700)",
                        boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t(translations.gamesPage.tryAgain)}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span
          className="mx-4 font-devanagari text-2xl"
          style={{ color: "#D4A843", textShadow: "0 0 20px rgba(212,168,67,0.3)" }}
          aria-hidden="true"
        >
          ॐ
        </span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ HOST YOUR OWN ACTIVITY ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Section Header */}
            <motion.div
              className="mb-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <span
                className="om-decoration mb-4 inline-block"
                aria-hidden="true"
              >
                ॐ
              </span>
              <h2 className="font-heading text-3xl font-bold md:text-5xl">
                <span className="gradient-text">
                  {t(translations.gamesPage.hostTitle)}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
                {t(translations.gamesPage.hostSubtitle)}
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleFormSubmit}
              className="overflow-hidden rounded-2xl"
              style={{
                background: "rgba(26,21,16,0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(212,168,67,0.15)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="space-y-6 p-6 md:p-10">
                {/* Activity Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-cream-300/70"
                  >
                    {t(translations.gamesPage.formName)}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#D4A843]/50 focus:ring-1 focus:ring-[#D4A843]/30"
                    style={{ borderColor: "rgba(212,168,67,0.15)" }}
                  />
                </div>

                {/* Organizer Name */}
                <div>
                  <label
                    htmlFor="organizer"
                    className="mb-2 block text-sm font-medium text-cream-300/70"
                  >
                    {t(translations.gamesPage.formOrganizer)}
                  </label>
                  <input
                    id="organizer"
                    name="organizer"
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#D4A843]/50 focus:ring-1 focus:ring-[#D4A843]/30"
                    style={{ borderColor: "rgba(212,168,67,0.15)" }}
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contact"
                    className="mb-2 block text-sm font-medium text-cream-300/70"
                  >
                    {t(translations.gamesPage.formContact)}
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    value={formData.contact}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#D4A843]/50 focus:ring-1 focus:ring-[#D4A843]/30"
                    style={{ borderColor: "rgba(212,168,67,0.15)" }}
                  />
                </div>

                {/* Activity Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-cream-300/70"
                  >
                    {t(translations.gamesPage.formDescription)}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#D4A843]/50 focus:ring-1 focus:ring-[#D4A843]/30"
                    style={{ borderColor: "rgba(212,168,67,0.15)" }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0D0906] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, #D4A843, #FFD700)",
                      boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                    }}
                  >
                    <Send className="h-4 w-4" />
                    {t(translations.gamesPage.formSubmit)}
                  </button>

                  {/* Success message */}
                  <AnimatePresence>
                    {formSubmitted && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2 text-sm font-medium text-green-400"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {t(translations.gamesPage.formSuccess)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}

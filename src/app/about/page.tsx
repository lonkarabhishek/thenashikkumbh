"use client";

import React from "react";
import Link from "next/link";
import {
  Droplets,
  Flame,
  Heart,
  Star,
  Users,
  BookOpen,
  Sparkles,
  Sun,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────── Samudra Manthan timeline data ───────────────────────── */

const samudraStepsSanskrit = ["मन्दराचलम्", "रत्नानि", "अमृतम्", "मोहिनी", "चत्वारि तीर्थानि"];

/* ───────────────── Four Sacred Cities data ────────────────────────── */

const sacredCitiesGradients = [
  "from-amber-900/40 to-amber-800/20",
  "from-emerald-900/40 to-emerald-800/20",
  "from-purple-900/40 to-purple-800/20",
  "from-[#D4A843]/30 to-[#D4A843]/10",
];

/* ───────────────── Importance in Hinduism grid data ────────────────────────── */

const importanceIcons = [Droplets, Users, Flame, Heart, BookOpen, Sun, Star, Sparkles];

/* ═══════════════════════════════════════════════════════════════════════════════
   ABOUT KUMBH MELA PAGE - Premium Dark Luxury Design
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function AboutKumbhMelaPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0D0906]">
      {/* ════════════════════════ (a) HERO BANNER ════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#1a0a00] via-[#110804] to-[#0D0906]">
        {/* Pattern overlay */}
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />

        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.08)_0%,transparent_70%)]" />

        {/* Floating Devanagari decorations */}
        <div
          className="absolute top-16 left-8 font-devanagari text-[140px] text-[#D4A843]/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          ॐ
        </div>
        <div
          className="absolute bottom-12 right-8 font-devanagari text-[110px] text-[#D4A843]/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          श्री
        </div>
        <div
          className="absolute top-1/3 right-1/4 font-devanagari text-[80px] text-[#D4A843]/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          कुम्भ
        </div>

        <div className="relative z-10 section-container text-center py-32 pt-44">
          {/* Sacred Devanagari text */}
          <p
            className="font-devanagari text-lg md:text-xl tracking-[0.3em] mb-6"
            style={{ color: "#D4A843" }}
          >
            ॥ श्री गणेशाय नमः ॥
          </p>

          {/* Decorative gold line above */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#D4A843]/60" />
            <span className="w-2 h-2 rounded-full bg-[#D4A843]/40" />
            <span className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#D4A843]/60" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-cream-100 mb-5 drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
            {t(translations.aboutPage.heroTitle)}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-2xl font-heading italic max-w-2xl mx-auto tracking-wide"
            style={{ color: "rgba(212, 168, 67, 0.7)" }}
          >
            {t(translations.aboutPage.heroSubtitle)}
          </p>

          {/* Decorative gold line below */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A843]/50" />
            <span className="font-devanagari text-sm tracking-[0.2em]" style={{ color: "#D4A843" }}>
              ॐ नमो नारायणाय
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A843]/50" />
          </div>
        </div>
      </section>

      {/* ════════════════════ (b) WHAT IS KUMBH MELA? ════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream-50">
        <div className="absolute inset-0 mandala-bg opacity-30" />

        <div className="relative section-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
              {t(translations.aboutPage.whatIsKumbhSub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a0a00] mb-4">
              {t(translations.aboutPage.whatIsKumbhTitle)}
            </h2>
            <p className="text-temple-500 text-lg max-w-2xl mx-auto">
              {t(translations.aboutPage.whatIsKumbhSubtitle)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-7">
            {/* Drop-cap first paragraph */}
            <p className="text-lg md:text-xl leading-relaxed text-temple-700">
              <span className="text-5xl float-left mr-3 mt-1 font-heading font-bold leading-none" style={{ color: "#D4A843" }}>
                {t(translations.aboutPage.whatIsKumbhP1).charAt(0)}
              </span>
              {t(translations.aboutPage.whatIsKumbhP1).slice(1)}
            </p>

            <p className="text-base md:text-lg leading-relaxed text-temple-600">
              {t(translations.aboutPage.whatIsKumbhP2)}
            </p>

            <p className="text-base md:text-lg leading-relaxed text-temple-600">
              {t(translations.aboutPage.whatIsKumbhP3)}
            </p>

            {/* UNESCO recognition callout */}
            <div
              className="relative overflow-hidden rounded-2xl border border-[#D4A843]/20 p-8"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 100%)",
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A843] to-[#D4A843]/30" />
              <p className="text-temple-700 leading-relaxed">
                <span className="font-heading font-bold" style={{ color: "#D4A843" }}>
                  {t(translations.aboutPage.unescoTitle)}
                </span>{" "}
                {t(translations.aboutPage.unescoText)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ (c) SAMUDRA MANTHAN - MYTHOLOGICAL ORIGINS ══════════ */}
      <section className="section-dark relative py-20 md:py-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.05)_0%,transparent_60%)]" />

        <div className="relative section-container">
          {/* Section header */}
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-[0.25em] mb-3"
              style={{ color: "#D4A843" }}
            >
              {t(translations.aboutPage.samudraSubtitle)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream-100 mb-4">
              {t(translations.aboutPage.samudraTitle)}
            </h2>
            <p className="text-cream-300/60 text-lg max-w-2xl mx-auto tracking-wide">
              {t(translations.aboutPage.samudraDesc)}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A843]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]/50" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A843]/40" />
            </div>
          </div>

          {/* Decorative Sanskrit shloka */}
          <div className="text-center mb-14">
            <p className="font-devanagari text-xl md:text-2xl leading-relaxed" style={{ color: "rgba(212,168,67,0.4)" }}>
              क्षीरसागरमथनात् उद्भूतं अमृतं सुराः।
            </p>
            <p className="font-devanagari text-xl md:text-2xl leading-relaxed" style={{ color: "rgba(212,168,67,0.4)" }}>
              कुम्भे स्थापयामासुः तस्मात् कुम्भमेला स्मृतः॥
            </p>
            <p className="text-sm text-cream-300/40 italic mt-4 max-w-xl mx-auto">
              {t(translations.aboutPage.samudraVerse)}
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical gold line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A843]/60 via-[#D4A843]/30 to-transparent" />

            {[
              { title: translations.aboutPage.step1Title, desc: translations.aboutPage.step1Desc },
              { title: translations.aboutPage.step2Title, desc: translations.aboutPage.step2Desc },
              { title: translations.aboutPage.step3Title, desc: translations.aboutPage.step3Desc },
              { title: translations.aboutPage.step4Title, desc: translations.aboutPage.step4Desc },
              { title: translations.aboutPage.step5Title, desc: translations.aboutPage.step5Desc },
            ].map((step, index) => (
              <div
                key={index}
                className="relative pl-16 md:pl-24 pb-14 last:pb-0"
              >
                {/* Timeline dot with gold glow */}
                <div className="absolute left-[17px] md:left-[25px] top-2 w-4 h-4 rounded-full border-2 border-[#D4A843] bg-[#0D0906] shadow-[0_0_12px_rgba(212,168,67,0.3)] z-10" />

                {/* Chapter number */}
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-[0.15em] border"
                  style={{
                    color: "#D4A843",
                    borderColor: "rgba(212,168,67,0.2)",
                    backgroundColor: "rgba(212,168,67,0.06)",
                  }}
                >
                  {t(translations.aboutPage.chapter)} {index + 1}
                </span>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-cream-100 mb-1">
                  {t(step.title)}
                </h3>
                <p
                  className="font-devanagari text-sm mb-3 tracking-wider"
                  style={{ color: "rgba(212,168,67,0.5)" }}
                >
                  {samudraStepsSanskrit[index]}
                </p>
                <p className="text-cream-300/60 leading-relaxed text-base">
                  {t(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ (d) FOUR SACRED CITIES ══════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream-50">
        <div className="absolute inset-0 mandala-bg opacity-20" />

        <div className="relative section-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
              {t(translations.aboutPage.fourCitiesSub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a0a00] mb-4">
              {t(translations.aboutPage.fourCitiesTitle)}
            </h2>
            <p className="text-temple-500 text-lg max-w-2xl mx-auto">
              {t(translations.aboutPage.fourCitiesSubtitle)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { city: translations.aboutPage.cityPrayagraj, river: translations.aboutPage.riverTriveni, description: translations.aboutPage.cityPrayagrajDesc, highlighted: false },
              { city: translations.aboutPage.cityHaridwar, river: translations.aboutPage.riverGanga, description: translations.aboutPage.cityHaridwarDesc, highlighted: false },
              { city: translations.aboutPage.cityUjjain, river: translations.aboutPage.riverShipra, description: translations.aboutPage.cityUjjainDesc, highlighted: false },
              { city: translations.aboutPage.cityNashik, river: translations.aboutPage.riverGodavari, description: translations.aboutPage.cityNashikDesc, highlighted: true },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-7 border transition-all duration-500 overflow-hidden group ${
                  item.highlighted
                    ? "border-[#D4A843]/50 bg-gradient-to-br from-[#D4A843]/[0.08] to-transparent shadow-[0_0_30px_rgba(212,168,67,0.1)] ring-1 ring-[#D4A843]/20"
                    : "border-[#D4A843]/10 bg-white hover:border-[#D4A843]/30 hover:shadow-lg"
                }`}
              >
                {/* Subtle gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sacredCitiesGradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <MapPin
                    className={`w-8 h-8 mb-4 ${
                      item.highlighted ? "text-[#D4A843]" : "text-[#D4A843]/60"
                    }`}
                  />
                  <h4 className="font-heading font-bold text-xl text-[#1a0a00] mb-1">
                    {t(item.city)}
                  </h4>
                  <p className="text-sm font-medium mb-3" style={{ color: "#D4A843" }}>
                    {t(translations.aboutPage.river)} {t(item.river)}
                  </p>
                  <p className="text-sm text-temple-600 leading-relaxed">
                    {t(item.description)}
                  </p>
                  {item.highlighted && (
                    <span
                      className="inline-block mt-4 text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border"
                      style={{
                        color: "#D4A843",
                        borderColor: "rgba(212,168,67,0.3)",
                        backgroundColor: "rgba(212,168,67,0.08)",
                      }}
                    >
                      {t(translations.aboutPage.simhastha2027)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ (e) IMPORTANCE IN HINDUISM ══════════════════════════ */}
      <section className="section-dark relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,67,0.04)_0%,transparent_60%)]" />

        <div className="relative section-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-[0.25em] mb-3"
              style={{ color: "#D4A843" }}
            >
              {t(translations.aboutPage.importanceSub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream-100 mb-4">
              {t(translations.aboutPage.importanceTitle)}
            </h2>
            <p className="text-cream-300/60 text-lg max-w-2xl mx-auto tracking-wide">
              {t(translations.aboutPage.importanceSubtitle)}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A843]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]/50" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A843]/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: translations.aboutPage.imp1Title, desc: translations.aboutPage.imp1Desc },
              { title: translations.aboutPage.imp2Title, desc: translations.aboutPage.imp2Desc },
              { title: translations.aboutPage.imp3Title, desc: translations.aboutPage.imp3Desc },
              { title: translations.aboutPage.imp4Title, desc: translations.aboutPage.imp4Desc },
              { title: translations.aboutPage.imp5Title, desc: translations.aboutPage.imp5Desc },
              { title: translations.aboutPage.imp6Title, desc: translations.aboutPage.imp6Desc },
              { title: translations.aboutPage.imp7Title, desc: translations.aboutPage.imp7Desc },
              { title: translations.aboutPage.imp8Title, desc: translations.aboutPage.imp8Desc },
            ].map((item, i) => {
              const Icon = importanceIcons[i];
              return (
                <div
                  key={i}
                  className="card-glass rounded-2xl p-6 border border-white/[0.06] backdrop-blur-md group hover:border-[#D4A843]/20 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-[#D4A843]/15 group-hover:border-[#D4A843]/30 transition-all duration-500"
                    style={{
                      background: "rgba(212,168,67,0.08)",
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#D4A843" }} />
                  </div>
                  <h3 className="font-heading font-bold text-cream-100 text-lg mb-2">
                    {t(item.title)}
                  </h3>
                  <p className="text-cream-300/50 text-sm leading-relaxed">
                    {t(item.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ (f) NASHIK'S SACRED HISTORY ═════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream-50">
        <div className="absolute inset-0 mandala-bg opacity-20" />

        <div className="relative section-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
              {t(translations.aboutPage.nashikHistorySub)}
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a0a00] mb-4">
              {t(translations.aboutPage.nashikHistoryTitle)}
            </h2>
            <p className="text-temple-500 text-lg max-w-2xl mx-auto">
              {t(translations.aboutPage.nashikHistorySubtitle)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Rama's exile connection */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div
                  className="w-full h-56 rounded-2xl flex items-center justify-center border border-[#D4A843]/15"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(26,10,0,0.05) 100%)",
                  }}
                >
                  <div className="text-center">
                    <span className="font-devanagari text-5xl" style={{ color: "rgba(212,168,67,0.6)" }}>
                      श्रीराम
                    </span>
                    <p className="font-heading font-semibold mt-2" style={{ color: "#D4A843" }}>
                      {t(translations.aboutPage.ramaExile)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#1a0a00] mb-3">
                  {t(translations.aboutPage.panchavatiTitle)}
                </h3>
                <p className="text-temple-600 leading-relaxed mb-4 text-base md:text-lg">
                  {t(translations.aboutPage.panchavatiP1)}
                </p>
                <p className="text-temple-600 leading-relaxed text-base md:text-lg">
                  {t(translations.aboutPage.panchavatiP2)}
                </p>
              </div>
            </div>

            {/* Godavari - Dakshin Ganga */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
              <div className="md:w-1/3">
                <div
                  className="w-full h-56 rounded-2xl flex items-center justify-center border border-[#D4A843]/15"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(212,168,67,0.06) 100%)",
                  }}
                >
                  <div className="text-center">
                    <Droplets className="w-12 h-12 mx-auto mb-2" style={{ color: "#D4A843" }} />
                    <p className="font-heading font-semibold" style={{ color: "#D4A843" }}>
                      {t(translations.aboutPage.dakshinGanga)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#1a0a00] mb-3">
                  {t(translations.aboutPage.godavariTitle)}
                </h3>
                <p className="text-temple-600 leading-relaxed mb-4 text-base md:text-lg">
                  {t(translations.aboutPage.godavariP1)}
                </p>
                <p className="text-temple-600 leading-relaxed text-base md:text-lg">
                  {t(translations.aboutPage.godavariP2)}
                </p>
              </div>
            </div>

            {/* Trimbakeshwar connection */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div
                  className="w-full h-56 rounded-2xl flex items-center justify-center border border-[#D4A843]/15"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,168,67,0.06) 0%, rgba(26,10,0,0.06) 100%)",
                  }}
                >
                  <div className="text-center">
                    <span className="font-devanagari text-3xl" style={{ color: "rgba(212,168,67,0.6)" }}>
                      ॐ नमः शिवाय
                    </span>
                    <p className="font-heading font-semibold mt-2" style={{ color: "#D4A843" }}>
                      {t(translations.aboutPage.jyotirlinga)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#1a0a00] mb-3">
                  {t(translations.aboutPage.trimbakTitle)}
                </h3>
                <p className="text-temple-600 leading-relaxed mb-4 text-base md:text-lg">
                  {t(translations.aboutPage.trimbakP1)}
                </p>
                <p className="text-temple-600 leading-relaxed text-base md:text-lg">
                  {t(translations.aboutPage.trimbakP2)}
                </p>
              </div>
            </div>

            {/* Modern Kumbh stats */}
            <div
              className="rounded-2xl p-8 md:p-10 border border-[#D4A843]/15 overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,67,0.05) 0%, transparent 100%)",
              }}
            >
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#1a0a00] mb-4">
                {t(translations.aboutPage.modernKumbhTitle)}
              </h3>
              <p className="text-temple-600 leading-relaxed mb-6 text-base md:text-lg">
                {t(translations.aboutPage.modernKumbhDesc)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    label: translations.aboutPage.statPilgrims,
                    value: translations.aboutPage.statPilgrimsValue,
                    sub: translations.aboutPage.statPilgrimsSub,
                  },
                  {
                    label: translations.aboutPage.statBathing,
                    value: translations.aboutPage.statBathingValue,
                    sub: translations.aboutPage.statBathingSub,
                  },
                  {
                    label: translations.aboutPage.statDuration,
                    value: translations.aboutPage.statDurationValue,
                    sub: translations.aboutPage.statDurationSub,
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center rounded-xl p-5 border border-[#D4A843]/15"
                    style={{
                      background: "rgba(212,168,67,0.04)",
                    }}
                  >
                    <p className="text-3xl font-heading font-bold" style={{ color: "#D4A843" }}>
                      {t(stat.value)}
                    </p>
                    <p className="text-sm font-semibold text-[#1a0a00] mt-1">
                      {t(stat.label)}
                    </p>
                    <p className="text-xs text-temple-500 mt-0.5">
                      {t(stat.sub)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ (g) CTA BANNER ═══════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="relative py-24 md:py-32"
          style={{
            background: "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)",
          }}
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

          <div className="relative section-container text-center">
            <div>
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A843]/40" />
                <span className="font-devanagari text-sm" style={{ color: "#D4A843" }}>
                  ॐ
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4A843]/40" />
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-cream-100 mb-6 leading-tight">
                {t(translations.aboutPage.ctaHeading)}
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-cream-300/60">
                {t(translations.aboutPage.ctaDesc)}
              </p>

              <Link href="/ghats" className="btn-gold inline-flex items-center gap-2 group">
                {t(translations.aboutPage.ctaButton)}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

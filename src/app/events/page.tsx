"use client";

import React, { useState } from "react";
import { Calendar, Users, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { eventsI18n, akhadasI18n } from "@/data/siteDataI18n";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────────────── color maps ───────────────────────────── */

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Ceremony:        { bg: "rgba(212,168,67,0.15)", text: "#D4A843", border: "rgba(212,168,67,0.3)" },
  "Sacred Bathing": { bg: "rgba(96,165,250,0.15)", text: "#60A5FA", border: "rgba(96,165,250,0.3)" },
  Spiritual:       { bg: "rgba(167,139,250,0.15)", text: "#A78BFA", border: "rgba(167,139,250,0.3)" },
  Devotional:      { bg: "rgba(248,113,113,0.15)", text: "#F87171", border: "rgba(248,113,113,0.3)" },
  Cultural:        { bg: "rgba(52,211,153,0.15)", text: "#34D399", border: "rgba(52,211,153,0.3)" },
  Wellness:        { bg: "rgba(45,212,191,0.15)", text: "#2DD4BF", border: "rgba(45,212,191,0.3)" },
  Seva:            { bg: "rgba(250,204,21,0.15)", text: "#FACC15", border: "rgba(250,204,21,0.3)" },
};

const traditionColors: Record<string, { accent: string; bg: string }> = {
  Shaiva:    { accent: "#D4A843", bg: "rgba(212,168,67,0.1)" },
  Vaishnava: { accent: "#60A5FA", bg: "rgba(96,165,250,0.1)" },
  Udasin:    { accent: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  Nirmal:    { accent: "#34D399", bg: "rgba(52,211,153,0.1)" },
  Kinnar:    { accent: "#F472B6", bg: "rgba(244,114,182,0.1)" },
};

const filterTabs = [
  { key: "All", labelKey: translations.eventsPage.filterAll },
  { key: "Ceremony", labelKey: translations.eventsPage.filterCeremony },
  { key: "Sacred Bathing", labelKey: translations.eventsPage.filterSacredBathing },
  { key: "Spiritual", labelKey: translations.eventsPage.filterSpiritual },
  { key: "Devotional", labelKey: translations.eventsPage.filterDevotional },
  { key: "Cultural", labelKey: translations.eventsPage.filterCultural },
  { key: "Wellness", labelKey: translations.eventsPage.filterWellness },
  { key: "Seva", labelKey: translations.eventsPage.filterSeva },
];
const traditions = ["Shaiva", "Vaishnava", "Udasin", "Nirmal", "Kinnar"];

/* ───────────────────────────── page ───────────────────────────── */

export default function EventsPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents =
    activeFilter === "All"
      ? eventsI18n
      : eventsI18n.filter((event) => event.category.en === activeFilter);

  const groupedAkhadas = traditions.reduce((acc, tradition) => {
    acc[tradition] = akhadasI18n.filter((a) => a.tradition === tradition);
    return acc;
  }, {} as Record<string, typeof akhadasI18n>);

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#D4A843", textShadow: "0 0 30px rgba(212,168,67,0.4)" }}
            aria-hidden="true"
          >
            हर हर महादेव
          </span>

          <h1 className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl">
            {t(translations.eventsPage.heroTitle)}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl">
            {t(translations.eventsPage.heroSubtitle)}
          </p>

          <div className="gold-line-thick mx-auto mt-8 w-48 origin-center" />
        </div>
      </section>

      {/* ═══════════════════ EVENTS SECTION ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div className="mb-12 text-center">
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.eventsPage.eventsTitle)}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/60">
              {t(translations.eventsPage.eventsSubtitle)}
            </p>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <div className="mr-2 flex items-center gap-2 text-cream-300/40">
              <Filter className="h-4 w-4" />
              <span className="hidden text-sm font-medium sm:inline">{t(translations.eventsPage.filterLabel)}</span>
            </div>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                style={
                  activeFilter === tab.key
                    ? {
                        background: "linear-gradient(135deg, #D4A843, #B8922D)",
                        color: "#0D0906",
                        boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                      }
                    : {
                        background: "transparent",
                        color: "rgba(212,168,67,0.6)",
                        border: "1px solid rgba(212,168,67,0.15)",
                      }
                }
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const colors = categoryColors[event.category.en] || categoryColors["Ceremony"];
              return (
                <div
                  key={t(event.title)}
                  className="card-dark group relative p-6 transition-transform duration-500 hover:-translate-y-2"
                >
                  {/* Gold accent line at top */}
                  <div
                    className="absolute left-0 top-0 h-1 w-full rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.text}, transparent)` }}
                  />

                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {t(event.category)}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-cream-100 transition-colors group-hover:text-[#D4A843]">
                    {t(event.title)}
                  </h3>

                  <div className="mb-3 mt-3 flex items-center gap-2 text-sm text-cream-300/40">
                    <Calendar className="h-4 w-4" style={{ color: "#D4A843" }} />
                    <span>{event.date}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-cream-300/60">
                    {t(event.description)}
                  </p>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <p className="py-12 text-center text-lg text-cream-300/40">
              {t(translations.eventsPage.noEvents)}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════ AKHADAS SECTION ═══════════════════ */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div className="mb-12 text-center">
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.eventsPage.akhadasTitle)}
            </h2>
            <div className="sacred-divider mt-4 mb-8">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-temple-500">
              {t(translations.eventsPage.akhadasSubtitle)}
            </p>
          </div>

          {traditions.map((tradition) => {
            const tradAkhadas = groupedAkhadas[tradition];
            if (!tradAkhadas || tradAkhadas.length === 0) return null;
            const colors = traditionColors[tradition];

            return (
              <div
                key={tradition}
                className="mb-16 last:mb-0"
              >
                <div className="mb-8 flex items-center gap-3">
                  <Users className="h-6 w-6" style={{ color: colors.accent }} />
                  <h3 className="font-heading text-2xl font-bold md:text-3xl" style={{ color: colors.accent }}>
                    {tradition} {t(translations.eventsPage.tradition)}
                  </h3>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${colors.accent}40, transparent)` }} />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tradAkhadas.map((akhada) => (
                    <div
                      key={akhada.name}
                      className="card-glass group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2"
                      style={{ borderColor: `${colors.accent}20` }}
                    >
                      {/* Gold border left */}
                      <div
                        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                        style={{ background: colors.accent }}
                      />

                      <div className="relative z-10 pl-3">
                        <h4 className="font-heading text-lg font-bold text-temple-800 transition-colors group-hover:text-[#D4A843]">
                          {akhada.name}
                        </h4>

                        <span
                          className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            background: colors.bg,
                            color: colors.accent,
                            border: `1px solid ${colors.accent}30`,
                          }}
                        >
                          {akhada.tradition}
                        </span>

                        <p className="mt-3 text-sm leading-relaxed text-temple-500">
                          {t(akhada.description)}
                        </p>

                        <div
                          className="mt-4 flex items-center gap-2 border-t pt-3 text-xs text-temple-400"
                          style={{ borderColor: `${colors.accent}15` }}
                        >
                          <Calendar className="h-3.5 w-3.5" style={{ color: colors.accent }} />
                          <span>{t(translations.eventsPage.established)} {akhada.established}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)",
        }}
      >
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

        <div className="section-container relative z-10 text-center">
          <div className="sacred-divider mx-auto mb-8 max-w-xs">
            <span className="font-devanagari text-sm" style={{ color: "#D4A843" }}>
              ॐ
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.eventsPage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-300/70">
            {t(translations.eventsPage.ctaDesc)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dates" className="btn-gold inline-flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t(translations.eventsPage.viewDates)}
            </Link>
            <Link href="/guide" className="btn-ghost-gold inline-flex items-center gap-2">
              {t(translations.eventsPage.pilgrimGuide)}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


    </>
  );
}

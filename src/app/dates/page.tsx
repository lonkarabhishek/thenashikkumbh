"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, ShieldCheck, ArrowRight, Star, Calendar, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { bathingDatesI18n } from "@/data/siteDataI18n";

/* ───────────────────────────── helpers ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

/* ───────────────────────────── page ─────────────────────────────── */

export default function ImportantDatesPage() {
  const { t } = useLanguage();

  const sortedDates = [...bathingDatesI18n].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        {/* Background layers */}
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
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#D4A843", textShadow: "0 0 30px rgba(212,168,67,0.4)" }}
            aria-hidden="true"
          >
            पवित्र तिथियाँ
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.datesPage.heroTitle)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.datesPage.heroSubtitle)}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <Calendar className="h-5 w-5" style={{ color: "#D4A843" }} />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-cream-300/50">
              {t(translations.datesPage.periodLabel)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ INTRODUCTION ═══════════════════ */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.whySacredTitle)}
            </h2>

            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-temple-600">
              {t(translations.datesPage.whySacredDesc)}
            </p>
            <p className="mt-4 text-base leading-relaxed text-temple-500">
              {t(translations.datesPage.whySacredP2)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.04)_0%,transparent_60%)]" />

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.scheduleTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.datesPage.scheduleDesc)}
            </p>
          </motion.div>

          {/* ── vertical timeline ── */}
          <div className="relative">
            {/* center line -- desktop; left line -- mobile */}
            <motion.div
              aria-hidden="true"
              className="absolute left-4 top-0 h-full w-0.5 origin-top md:left-1/2 md:-translate-x-1/2"
              style={{
                background: "linear-gradient(180deg, transparent, #D4A843, #D4A843, transparent)",
              }}
              variants={lineGrow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />

            <div className="space-y-12 md:space-y-16">
              {sortedDates.map((item, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={item.date}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="relative"
                  >
                    {/* ── node / circle ── */}
                    <div
                      className={`absolute left-4 z-10 -translate-x-1/2 md:left-1/2 ${
                        item.isMajor ? "-mt-1" : "mt-0.5"
                      }`}
                    >
                      {item.isMajor ? (
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg md:h-12 md:w-12"
                          style={{
                            background: "linear-gradient(135deg, #D4A843, #F5DEB3)",
                            boxShadow: "0 0 30px rgba(212,168,67,0.4), 0 0 60px rgba(212,168,67,0.15)",
                          }}
                        >
                          <Star className="h-5 w-5 text-[#0D0906] md:h-6 md:w-6" />
                        </span>
                      ) : (
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7"
                          style={{
                            background: "#D4A843",
                            boxShadow: "0 0 15px rgba(212,168,67,0.3)",
                          }}
                        />
                      )}
                    </div>

                    {/* ── card ── */}
                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
                        isLeft
                          ? "md:mr-auto md:pr-0"
                          : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <div
                        className={`card-dark group relative p-6 transition-transform hover:-translate-y-1 md:p-8 ${
                          item.isMajor
                            ? "border-l-4"
                            : ""
                        }`}
                        style={item.isMajor ? { borderLeftColor: "#D4A843" } : {}}
                      >
                        {/* Shahi Snan badge */}
                        {item.isMajor && (
                          <span
                            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
                            style={{
                              background: "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(212,168,67,0.08))",
                              color: "#D4A843",
                              border: "1px solid rgba(212,168,67,0.3)",
                            }}
                          >
                            <Sparkles className="h-3 w-3" />
                            {t(translations.datesPage.shahiSnanBadge)}
                          </span>
                        )}

                        {!item.isMajor && (
                          <span
                            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
                            style={{
                              background: "rgba(212,168,67,0.08)",
                              color: "rgba(212,168,67,0.7)",
                              border: "1px solid rgba(212,168,67,0.15)",
                            }}
                          >
                            {t(translations.datesPage.parvaSnanBadge)}
                          </span>
                        )}

                        <p
                          className="font-heading text-xl font-bold md:text-2xl"
                          style={{ color: "#D4A843" }}
                        >
                          {item.date}
                        </p>

                        <h3 className="mt-2 font-heading text-lg font-bold text-cream-100 md:text-xl">
                          {t(item.event)}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-cream-300/50">
                          {t(item.nakshatra)}
                        </p>

                        <p className="mt-3 text-base leading-relaxed text-cream-300/70">
                          {t(item.significance)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ADDITIONAL INFO ═══════════════════ */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.goodToKnow)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                Icon: Clock,
                title: translations.datesPage.bestTimesTitle,
                text: translations.datesPage.bestTimesDesc,
              },
              {
                Icon: Users,
                title: translations.datesPage.shahiSnanTitle,
                text: translations.datesPage.shahiSnanDesc,
              },
              {
                Icon: ShieldCheck,
                title: translations.datesPage.safetyTitle,
                text: translations.datesPage.safetyDesc,
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card-glass p-8"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(212,168,67,0.1)" }}
                >
                  <card.Icon className="h-7 w-7" style={{ color: "#D4A843" }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-temple-800">
                  {t(card.title)}
                </h3>
                <p className="mt-3 leading-relaxed text-temple-600">
                  {t(card.text)}
                </p>
              </motion.div>
            ))}
          </div>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-container relative z-10 text-center"
        >
          <div className="sacred-divider mx-auto mb-8 max-w-xs">
            <span className="font-devanagari text-sm" style={{ color: "#D4A843" }}>
              ॐ
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.datesPage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream-300/70">
            {t(translations.datesPage.ctaDesc)}
          </p>
          <Link
            href="/guide"
            className="btn-gold mt-10 inline-flex items-center gap-2"
          >
            {t(translations.datesPage.ctaButton)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>


    </>
  );
}

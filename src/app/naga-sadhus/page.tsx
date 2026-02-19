"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ─────────────── animation variants ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────── attire icons ─────────────── */

const attireIcons = ["🔥", "🕉️", "🔱", "📿", "☁️", "🪢"];

/* ─────────────── order accent colors ─────────────── */

const orderColors = [
  { border: "#D4A843", bg: "rgba(212,168,67,0.08)", glow: "rgba(212,168,67,0.15)" },
  { border: "#3B82F6", bg: "rgba(59,130,246,0.08)", glow: "rgba(59,130,246,0.15)" },
  { border: "#8B5CF6", bg: "rgba(139,92,246,0.08)", glow: "rgba(139,92,246,0.15)" },
];

/* ═══════════════════════════════════════════════════ */
/*                   MAIN PAGE                        */
/* ═══════════════════════════════════════════════════ */

export default function NagaSadhusPage() {
  const { t } = useLanguage();
  const ns = translations.nagaSadhusPage;

  return (
    <>
      {/* ════════════ SECTION 1: CINEMATIC HERO ════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background image with slow zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <img
            src="/images/naga-sadhu.png"
            alt="Naga Sadhu"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0906] via-[#0D0906]/70 to-[#0D0906]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0906]/60 to-transparent" />

        {/* Floating Devanagari watermarks */}
        <motion.span
          className="pointer-events-none absolute right-[10%] top-[20%] select-none font-devanagari text-[8rem] font-bold leading-none md:text-[12rem]"
          style={{ color: "rgba(212,168,67,0.04)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          aria-hidden="true"
        >
          नागा
        </motion.span>
        <motion.span
          className="pointer-events-none absolute bottom-[25%] left-[5%] select-none font-devanagari text-[6rem] font-bold leading-none md:text-[9rem]"
          style={{ color: "rgba(212,168,67,0.03)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          aria-hidden="true"
        >
          त्रिशूल
        </motion.span>

        {/* Hero text content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-24 text-center md:items-start md:pb-32 md:text-left">
          <div className="section-container">
            {/* Sacred text */}
            <motion.p
              className="mb-4 font-devanagari text-lg tracking-widest md:text-xl"
              style={{ color: "rgba(212,168,67,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t(ns.heroSacred)}
            </motion.p>

            {/* Title */}
            <motion.h1
              className="mb-4 font-heading text-5xl font-bold text-cream-100 drop-shadow-xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t(ns.heroTitle)}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mb-3 text-xl font-medium text-cream-300/80 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {t(ns.heroSubtitle)}
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-base tracking-wide text-cream-300/50 md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              {t(ns.heroTagline)}
            </motion.p>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="gold-line-thick mt-8 w-40 origin-left md:w-56"
            />
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />
      </section>

      {/* ════════════ SECTION 2: WHO ARE NAGA SADHUS ════════════ */}
      <section className="relative bg-cream-50 py-20 md:py-28">
        {/* Mandala backdrop */}
        <div className="absolute inset-0 mandala-bg opacity-[0.03]" />

        <div className="section-container relative z-10 mx-auto max-w-4xl">
          {/* Sub heading */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#B8941F",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(ns.whoSub)}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1A1207] md:text-5xl">
              {t(ns.whoTitle)}
            </h2>
          </motion.div>

          {/* Paragraphs with drop cap on first */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="mb-6 text-lg leading-relaxed text-[#3D2E1A]/80 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#D4A843] md:text-xl">
              {t(ns.whoP1)}
            </p>
            <p className="mb-8 text-lg leading-relaxed text-[#3D2E1A]/70 md:text-xl">
              {t(ns.whoP2)}
            </p>
          </motion.div>

          {/* Gold callout box */}
          <motion.div
            className="rounded-xl p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
              border: "1px solid rgba(212,168,67,0.2)",
              borderLeft: "4px solid #D4A843",
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-devanagari text-xl font-semibold italic text-[#B8941F] md:text-2xl">
              &quot;They have burned away the ego. What remains is pure spirit.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════ SECTION 3: HISTORY TIMELINE ════════════ */}
      <section className="section-dark relative py-20 md:py-28">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />

        <div className="section-container relative z-10">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#D4A843",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(ns.historySub)}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-cream-100 md:text-5xl">
              {t(ns.historyTitle)}
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-3xl">
            {/* Gold vertical line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-px md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(212,168,67,0.4) 10%, rgba(212,168,67,0.4) 90%, transparent)",
              }}
            />

            {[
              { label: ns.era1Label, title: ns.era1Title, desc: ns.era1Desc },
              { label: ns.era2Label, title: ns.era2Title, desc: ns.era2Desc },
              { label: ns.era3Label, title: ns.era3Title, desc: ns.era3Desc },
            ].map((era, i) => (
              <motion.div
                key={i}
                className="relative mb-12 last:mb-0 md:pl-20"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 top-2 hidden h-5 w-5 -translate-x-1/2 rounded-full md:block"
                  style={{
                    background: "rgba(212,168,67,0.15)",
                    border: "2px solid #D4A843",
                    boxShadow: "0 0 16px rgba(212,168,67,0.3)",
                  }}
                />

                {/* Era card */}
                <div
                  className="rounded-xl p-6 md:p-8"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(212,168,67,0.1)",
                  }}
                >
                  <span
                    className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: "rgba(212,168,67,0.12)",
                      color: "#D4A843",
                    }}
                  >
                    {t(era.label)}
                  </span>
                  <h3 className="mb-3 font-heading text-xl font-bold text-cream-100 md:text-2xl">
                    {t(era.title)}
                  </h3>
                  <p className="leading-relaxed text-cream-300/60 md:text-lg">
                    {t(era.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 4: ATTIRE & MARKINGS ════════════ */}
      <section className="relative bg-cream-50 py-20 md:py-28">
        <div className="absolute inset-0 mandala-bg opacity-[0.03]" />

        <div className="section-container relative z-10">
          {/* Section header */}
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#B8941F",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(ns.attireSub)}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1A1207] md:text-5xl">
              {t(ns.attireTitle)}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#3D2E1A]/60">
              {t(ns.attireSubtitle)}
            </p>
          </motion.div>

          {/* 3x2 grid */}
          <motion.div
            className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: ns.att1Title, desc: ns.att1Desc },
              { title: ns.att2Title, desc: ns.att2Desc },
              { title: ns.att3Title, desc: ns.att3Desc },
              { title: ns.att4Title, desc: ns.att4Desc },
              { title: ns.att5Title, desc: ns.att5Desc },
              { title: ns.att6Title, desc: ns.att6Desc },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="group rounded-xl p-6 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(212,168,67,0.12)",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.03)",
                }}
              >
                <span className="mb-4 block text-4xl">{attireIcons[i]}</span>
                <h3 className="mb-2 font-heading text-lg font-bold text-[#1A1207]">
                  {t(item.title)}
                </h3>
                <p className="text-sm leading-relaxed text-[#3D2E1A]/65">
                  {t(item.desc)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════ SECTION 5: ORDERS OF NAGA SADHUS ════════════ */}
      <section className="section-dark relative py-20 md:py-28">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />

        <div className="section-container relative z-10">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#D4A843",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(ns.ordersSub)}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-cream-100 md:text-5xl">
              {t(ns.ordersTitle)}
            </h2>
          </motion.div>

          {/* Three order cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: ns.order1Title, deity: ns.order1Deity, desc: ns.order1Desc },
              { title: ns.order2Title, deity: ns.order2Deity, desc: ns.order2Desc },
              { title: ns.order3Title, deity: ns.order3Deity, desc: ns.order3Desc },
            ].map((order, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: orderColors[i].bg,
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
              >
                {/* Colored top border */}
                <div
                  className="h-1 w-full"
                  style={{ background: orderColors[i].border }}
                />

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at top, ${orderColors[i].glow}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 p-6 md:p-8">
                  <h3
                    className="mb-1 font-heading text-xl font-bold"
                    style={{ color: orderColors[i].border }}
                  >
                    {t(order.title)}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-cream-300/50">
                    {t(order.deity)}
                  </p>
                  <p className="leading-relaxed text-cream-300/60 text-sm md:text-base">
                    {t(order.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 6: ROLE IN KUMBH MELA ════════════ */}
      <section className="relative bg-cream-50 py-20 md:py-28">
        <div className="absolute inset-0 mandala-bg opacity-[0.03]" />

        <div className="section-container relative z-10">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#B8941F",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              {t(ns.roleSub)}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1A1207] md:text-5xl">
              {t(ns.roleTitle)}
            </h2>
          </motion.div>

          {/* Three numbered cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: ns.role1Title, desc: ns.role1Desc },
              { title: ns.role2Title, desc: ns.role2Desc },
              { title: ns.role3Title, desc: ns.role3Desc },
            ].map((role, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 md:p-8"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(212,168,67,0.12)",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Big number */}
                <span
                  className="mb-4 block font-heading text-5xl font-bold"
                  style={{ color: "rgba(212,168,67,0.2)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="mb-3 font-heading text-lg font-bold text-[#1A1207] md:text-xl">
                  {t(role.title)}
                </h3>
                <p className="text-sm leading-relaxed text-[#3D2E1A]/65 md:text-base">
                  {t(role.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 7: CTA BANNER ════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <motion.div
            className="rounded-2xl p-8 text-center md:p-14"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,168,67,0.1), rgba(212,168,67,0.03))",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-4 font-heading text-2xl font-bold text-cream-100 md:text-4xl">
              {t(ns.ctaTitle)}
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-cream-300/60 md:text-lg">
              {t(ns.ctaDesc)}
            </p>
            <Link
              href="/events"
              className="btn-gold inline-flex items-center gap-2 text-base"
            >
              {t(ns.ctaButton)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

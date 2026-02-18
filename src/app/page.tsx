"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scroll,
  Sparkles,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  Send,
  Map,
  Droplets,
  Users,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";

import Hero from "@/components/Hero";
// CTABanner available at @/components/CTABanner
import { bathingDatesI18n, ghatsI18n, eventsI18n } from "@/data/siteDataI18n";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// ─── Category Badge Colors ────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  Ceremony: "bg-saffron-100 text-saffron-700",
  "Sacred Bathing": "bg-blue-100 text-blue-700",
  Spiritual: "bg-purple-100 text-purple-700",
  Devotional: "bg-rose-100 text-rose-700",
  Cultural: "bg-amber-100 text-amber-700",
  Wellness: "bg-green-100 text-green-700",
  Seva: "bg-teal-100 text-teal-700",
};

const categoryDots: Record<string, string> = {
  Ceremony: "bg-saffron-500",
  "Sacred Bathing": "bg-blue-500",
  Spiritual: "bg-purple-500",
  Devotional: "bg-rose-500",
  Cultural: "bg-amber-500",
  Wellness: "bg-green-500",
  Seva: "bg-teal-500",
};

// ─── Section Divider ──────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="mx-auto my-6 flex items-center justify-center gap-3">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
      <div className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const { t, locale, translations: tr } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Data slices
  const majorDates = bathingDatesI18n.filter((d) => d.isMajor).slice(0, 5);
  const previewGhats = ghatsI18n.slice(0, 4);
  const previewEvents = eventsI18n.slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ════════════════════════════════════════════════════════════════════════
          2. ABOUT KUMBH MELA
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-preview"
        className="relative overflow-hidden bg-cream-50 py-24 md:py-32"
      >
        {/* Subtle mandala background pattern */}
        <div className="absolute inset-0 mandala-bg opacity-[0.03]" />

        <div className="section-container relative z-10">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t(tr.home.aboutSubtitle)}
            </p>
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(tr.home.aboutTitle)}
            </h2>
          </motion.div>

          <GoldDivider />

          {/* Description Paragraph */}
          <motion.p
            className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-temple-600"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t(tr.home.aboutDescription)}
          </motion.p>

          {/* Three Premium Cards */}
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Ancient Origins */}
            <motion.div variants={fadeInUp}>
              <div className="group h-full rounded-2xl border border-gold-200/50 border-t-2 border-t-gold-400 bg-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(196,164,75,0.25)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-saffron-100 text-gold-600 transition-transform duration-300 group-hover:scale-110">
                  <Scroll className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-temple-900">
                  {t(tr.home.originTitle)}
                </h3>
                <p className="leading-relaxed text-temple-600">
                  {t(tr.home.originDesc)}
                </p>
              </div>
            </motion.div>

            {/* Divine Significance */}
            <motion.div variants={fadeInUp}>
              <div className="group h-full rounded-2xl border border-gold-200/50 border-t-2 border-t-gold-400 bg-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(196,164,75,0.25)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-saffron-100 text-gold-600 transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-temple-900">
                  {t(tr.home.divineTitle)}
                </h3>
                <p className="leading-relaxed text-temple-600">
                  {t(tr.home.divineDesc)}
                </p>
              </div>
            </motion.div>

            {/* Nashik's Sacred Bond */}
            <motion.div variants={fadeInUp}>
              <div className="group h-full rounded-2xl border border-gold-200/50 border-t-2 border-t-gold-400 bg-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(196,164,75,0.25)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-saffron-100 text-gold-600 transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-temple-900">
                  {t(tr.home.nashikTitle)}
                </h3>
                <p className="leading-relaxed text-temple-600">
                  {t(tr.home.nashikDesc)}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Learn More Link */}
          <motion.div
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-semibold text-gold-700 transition-colors hover:text-saffron-600"
            >
              {t(tr.home.learnMore)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          3. WHY NASHIK IS SACRED
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="why-nashik" className="relative overflow-hidden bg-temple-900 py-24 md:py-32">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 temple-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-temple-900/50 via-transparent to-temple-900/50" />

        <div className="section-container relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: Text Content */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                {t(tr.home.whyNashikSubtitle)}
              </p>
              <h2 className="mb-8 font-heading text-4xl font-bold text-cream-100 md:text-5xl">
                {t(tr.home.whyNashikTitle)}
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-cream-300/90">
                {t(tr.home.whyNashikText)}
              </p>

              {/* Stat Counters */}
              <motion.div
                className="grid grid-cols-2 gap-6 sm:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { value: "2000+", label: locale === "hi" ? "वर्ष" : locale === "mr" ? "वर्षे" : "Years", icon: <Clock className="h-4 w-4" /> },
                  { value: "4", label: locale === "hi" ? "पवित्र नगर" : locale === "mr" ? "पवित्र शहरे" : "Sacred Cities", icon: <MapPin className="h-4 w-4" /> },
                  { value: "12", label: locale === "hi" ? "वर्ष चक्र" : locale === "mr" ? "वर्ष चक्र" : "Year Cycle", icon: <Star className="h-4 w-4" /> },
                  { value: "50M+", label: locale === "hi" ? "तीर्थयात्री" : locale === "mr" ? "तीर्थयात्री" : "Pilgrims", icon: <Users className="h-4 w-4" /> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <p className="font-heading text-3xl font-bold text-gold-400 md:text-4xl">
                      {stat.value}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-cream-400">
                      {stat.icon}
                      <span>{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Decorative Frame */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-temple-800 via-temple-700 to-temple-800 shadow-2xl">
                {/* Inner golden frame */}
                <div className="absolute inset-3 rounded-xl border border-gold-500/20" />

                <div className="flex min-h-[420px] flex-col items-center justify-center p-12 text-center lg:min-h-[500px]">
                  {/* Decorative mandala ring */}
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold-400/30 bg-gradient-to-br from-gold-500/10 to-saffron-500/10">
                    <Droplets className="h-12 w-12 text-gold-400" />
                  </div>

                  <h3 className="mb-3 font-heading text-3xl font-bold text-gold-300">
                    {locale === "hi" ? "गोदावरी" : locale === "mr" ? "गोदावरी" : "Godavari"}
                  </h3>
                  <div className="mb-4 h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                  <p className="text-lg font-medium italic text-cream-300/80">
                    {locale === "hi"
                      ? "दक्षिण गंगा"
                      : locale === "mr"
                        ? "दक्षिणची गंगा"
                        : "Dakshin Ganga"}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-cream-400/60">
                    {locale === "hi"
                      ? "भारत की सात पवित्र नदियों में से एक"
                      : locale === "mr"
                        ? "भारतातील सात पवित्र नद्यांपैकी एक"
                        : "One of the seven sacred rivers of India"}
                  </p>

                  {/* Decorative corner elements */}
                  <div className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-gold-500/30" />
                  <div className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-gold-500/30" />
                  <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-gold-500/30" />
                  <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-gold-500/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          4. SACRED BATHING DATES PREVIEW
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="dates-preview" className="relative bg-cream-50 py-24 md:py-32">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t(tr.home.datesSubtitle)}
            </p>
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(tr.home.datesTitle)}
            </h2>
          </motion.div>

          <GoldDivider />

          {/* Horizontal scroll on mobile, 3-col grid on desktop */}
          <div className="mt-12">
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 lg:grid-cols-5">
              {majorDates.map((item, index) => (
                <motion.div
                  key={item.date}
                  className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border-l-4 border-gold-500 bg-temple-800/90 p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(196,164,75,0.3)]">
                    {/* Shahi Snan badge */}
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
                      <Star className="h-3 w-3" />
                      {locale === "hi"
                        ? `शाही स्नान ${index + 1}`
                        : locale === "mr"
                          ? `शाही स्नान ${index + 1}`
                          : `Shahi Snan ${index + 1}`}
                    </div>

                    {/* Date */}
                    <p className="mb-2 font-heading text-lg font-bold text-gold-400">
                      {item.date}
                    </p>

                    {/* Event Name */}
                    <h3 className="mb-1 font-heading text-lg font-bold text-white">
                      {t(item.event)}
                    </h3>

                    {/* Nakshatra */}
                    <p className="mb-3 text-sm font-medium text-cream-300">
                      {t(item.nakshatra)}
                    </p>

                    {/* Significance */}
                    <p className="text-sm leading-relaxed text-cream-400/80">
                      {t(item.significance)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View Complete Schedule */}
          <motion.div
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/dates"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-5px_rgba(196,164,75,0.4)]"
            >
              {t(tr.home.viewAllDates)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          5. SACRED GHATS PREVIEW
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="ghats-preview" className="relative bg-white py-24 md:py-32">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t(tr.home.ghatsSubtitle)}
            </p>
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(tr.home.ghatsTitle)}
            </h2>
          </motion.div>

          <GoldDivider />

          {/* Two-column grid of ghat cards */}
          <motion.div
            className="mt-12 grid gap-8 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {previewGhats.map((ghat) => (
              <motion.div key={ghat.id} variants={scaleIn}>
                <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_60px_-15px_rgba(196,164,75,0.35)]">
                  {/* Actual ghat image */}
                  <img
                    src={ghat.image}
                    alt={t(ghat.name)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dark overlay gradient from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Ghat name overlay - centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <span className="mb-2 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
                      {t(ghat.subtitle)}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
                      {t(ghat.name)}
                    </h3>
                  </div>

                  {/* Glass-morphism info bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/30 p-5 backdrop-blur-md">
                    <p className="mb-2 text-sm leading-relaxed text-white/80 line-clamp-2">
                      {t(ghat.description)}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gold-300">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {ghat.id === "ramkund"
                          ? "Panchavati, Nashik"
                          : ghat.id === "godavari-ghats"
                            ? "Godavari River, Nashik"
                            : ghat.id === "kapaleshwar"
                              ? "Near Ramkund, Nashik"
                              : "Panchavati, Nashik"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Explore All Ghats */}
          <motion.div
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/ghats"
              className="group inline-flex items-center gap-2 font-semibold text-gold-700 transition-colors hover:text-saffron-600"
            >
              {t(tr.home.exploreGhats)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          6. MAP SECTION
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="map-preview" className="relative bg-cream-50 py-24 md:py-32">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t(tr.home.mapSubtitle)}
            </p>
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(tr.home.mapTitle)}
            </h2>
          </motion.div>

          <GoldDivider />

          <div className="mx-auto mt-12 max-w-4xl">
            {/* Google Maps with golden border */}
            <motion.div
              className="overflow-hidden rounded-2xl border-2 border-gold-300/50 shadow-xl"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.0!2d73.7910!3d20.0063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb0c6f989e69%3A0x6c2f5f3e1edbd4e9!2sRam%20Kund!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nashik Kumbh Mela Area Map — Ram Kund and Godavari Ghats"
                className="w-full"
              />
            </motion.div>

            {/* Navigation text below map */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                <Map className="h-6 w-6" />
              </div>
              <p className="text-temple-600 leading-relaxed">
                {locale === "hi"
                  ? "कुंभ मेला क्षेत्र गोदावरी नदी के किनारे पंचवटी के राम कुंड के आसपास फैला है। प्रमुख स्थल — त्र्यम्बकेश्वर मंदिर (28 किमी), तपोवन, और कालाराम मंदिर।"
                  : locale === "mr"
                    ? "कुंभमेळा क्षेत्र गोदावरी नदीच्या किनाऱ्यावर पंचवटीतील रामकुंडाभोवती पसरलेले आहे. प्रमुख स्थळे — त्र्यंबकेश्वर मंदिर (२८ किमी), तपोवन, आणि कालाराम मंदिर."
                    : "The Kumbh Mela area stretches along the Godavari River, centered around Ram Kund in Panchavati. Key landmarks — Trimbakeshwar Temple (28 km), Tapovan, and the ancient Kalaram Temple."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          7. EVENTS PREVIEW
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="events-preview"
        className="relative bg-white py-24 md:py-32"
      >
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t(tr.home.eventsSubtitle)}
            </p>
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(tr.home.eventsTitle)}
            </h2>
          </motion.div>

          <GoldDivider />

          {/* 4-column event cards */}
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {previewEvents.map((evt, index) => {
              const categoryEn = evt.category.en;
              const colorClass =
                categoryColors[categoryEn] || "bg-gray-100 text-gray-700";
              const dotColor =
                categoryDots[categoryEn] || "bg-gray-500";

              return (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="group flex h-full flex-col rounded-2xl border border-gold-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(196,164,75,0.2)]">
                    {/* Category Badge with dot */}
                    <span
                      className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                      {t(evt.category)}
                    </span>

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-lg font-bold text-temple-900">
                      {t(evt.title)}
                    </h3>

                    {/* Date */}
                    <div className="mb-3 flex items-center gap-2 text-sm text-gold-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{evt.date}</span>
                    </div>

                    {/* Description */}
                    <p className="flex-1 text-sm leading-relaxed text-temple-500">
                      {t(evt.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View All Events */}
          <motion.div
            className="mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-5px_rgba(196,164,75,0.4)]"
            >
              {t(tr.home.viewAllEvents)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          8. CTA BANNER
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1a0a00] via-temple-900 to-[#0D0906] py-20 md:py-28">
        {/* Particle dots background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold-400/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.03] to-transparent" />

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-5 font-heading text-3xl font-bold text-gold-300 md:text-5xl">
              {t(tr.home.ctaTitle)}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-cream-300/80 leading-relaxed">
              {t(tr.home.ctaDesc)}
            </p>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold-400 bg-gold-500/10 px-10 py-4 font-semibold text-gold-300 backdrop-blur-sm transition-all duration-300 hover:bg-gold-500 hover:text-white hover:shadow-[0_0_40px_rgba(196,164,75,0.3)]"
            >
              {t(tr.home.ctaButton)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          9. NEWSLETTER
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="newsletter" className="relative bg-cream-50 py-24 md:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-xl text-center">
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
                {t(tr.home.newsletterSubtitle)}
              </p>
              <h2 className="mb-4 font-heading text-3xl font-bold text-temple-900 md:text-4xl">
                {t(tr.home.newsletterTitle)}
              </h2>
            </motion.div>

            <GoldDivider />

            <motion.p
              className="mb-8 text-temple-500 leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t(tr.home.newsletterDesc)}
            </motion.p>

            {/* Email Form */}
            <motion.form
              onSubmit={handleNewsletterSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {t(tr.home.emailPlaceholder)}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t(tr.home.emailPlaceholder)}
                className="flex-1 rounded-full border border-gold-200 bg-white px-6 py-3.5 text-temple-800 placeholder-temple-300 outline-none transition-all duration-300 focus:border-gold-400 focus:ring-2 focus:ring-gold-200/50"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Send className="h-4 w-4" />
                {t(tr.home.subscribe)}
              </button>
            </motion.form>

            {/* Success message */}
            <AnimatePresence>
              {isSubscribed && (
                <motion.p
                  className="mt-4 text-sm font-medium text-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {locale === "hi"
                    ? "सदस्यता के लिए धन्यवाद! आपको कुंभ मेला अपडेट शीघ्र प्राप्त होंगे।"
                    : locale === "mr"
                      ? "सदस्यता घेतल्याबद्दल धन्यवाद! तुम्हाला कुंभमेळा अपडेट लवकरच मिळतील."
                      : "Thank you for subscribing! You will receive Kumbh Mela updates soon."}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Social proof */}
            <motion.p
              className="mt-5 text-xs text-temple-400"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {locale === "hi"
                ? "10,000+ भक्तों के साथ जुड़ें। कोई स्पैम नहीं, केवल पवित्र अपडेट।"
                : locale === "mr"
                  ? "10,000+ भक्तांसोबत सहभागी व्हा. स्पॅम नाही, केवळ पवित्र अपडेट्स."
                  : "Join 10,000+ devotees. No spam, only sacred updates."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          10. FAQ SECTION (AEO Critical)
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative bg-white py-24 md:py-32">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            className="mx-auto mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-4xl font-bold text-temple-900 md:text-5xl">
              {t(translations.faq.title)}
            </h2>
          </motion.div>

          <GoldDivider />

          {/* FAQ Accordion */}
          <div className="mx-auto mt-12 max-w-3xl">
            {translations.faq.items.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={index}
                  className="mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between rounded-xl px-6 py-5 text-left transition-all duration-300 ${
                      isOpen
                        ? "border-l-4 border-gold-500 bg-gold-50 shadow-sm"
                        : "border-l-4 border-transparent bg-cream-50 hover:bg-cream-100"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <h3
                      className={`pr-4 font-heading text-base font-bold md:text-lg ${
                        isOpen ? "text-gold-700" : "text-temple-800"
                      }`}
                    >
                      {t(item.q)}
                    </h3>
                    <span
                      className={`flex-shrink-0 transition-colors ${
                        isOpen ? "text-gold-500" : "text-temple-400"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-b-xl bg-cream-50/50 px-6 pb-5 pt-3">
                          <p className="leading-relaxed text-temple-600">
                            {t(item.a)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Hotel,
  Building,
  MapPin,
  Star,
  Phone,
  Globe,
  Bus,
  UtensilsCrossed,
  Landmark,
  Compass,
  Send,
  Megaphone,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────────────── data ───────────────────────────── */

const businessCategoriesData = [
  { id: "hotels",       labelKey: "catHotels" as const,       icon: <Hotel className="h-5 w-5" />,            accent: "#60A5FA" },
  { id: "dharamshalas", labelKey: "catDharamshalas" as const,  icon: <Landmark className="h-5 w-5" />,        accent: "#D4A843" },
  { id: "tours",        labelKey: "catTours" as const,        icon: <Compass className="h-5 w-5" />,         accent: "#34D399" },
  { id: "puja",         labelKey: "catPuja" as const,         icon: <Sparkles className="h-5 w-5" />,        accent: "#A78BFA" },
  { id: "restaurants",  labelKey: "catRestaurants" as const,  icon: <UtensilsCrossed className="h-5 w-5" />, accent: "#F87171" },
  { id: "transport",    labelKey: "catTransport" as const,    icon: <Bus className="h-5 w-5" />,             accent: "#2DD4BF" },
];

const placeholderBusinesses = [
  { name: "Coming Soon", rating: 0 },
  { name: "Coming Soon", rating: 0 },
  { name: "Coming Soon", rating: 0 },
  { name: "Coming Soon", rating: 0 },
  { name: "Coming Soon", rating: 0 },
  { name: "Coming Soon", rating: 0 },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function BusinessesPage() {
  const { t } = useLanguage();
  const bp = translations.businessesPage;
  const [activeCategory, setActiveCategory] = useState("hotels");
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    contact: "",
    description: "",
  });

  const businessCategories = businessCategoriesData.map((cat) => ({
    ...cat,
    label: t(bp[cat.labelKey]),
  }));

  const currentCategory = businessCategories.find((c) => c.id === activeCategory)!;

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-20 top-20 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-20 h-64 w-64 rounded-full"
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
            सेवा
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(bp.heroTitle)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(bp.heroSubtitle)}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ INTRO ═══════════════════ */}
      <section className="section-dark relative py-12 md:py-16">
        <div className="section-container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg leading-relaxed text-cream-300/60">
              {t(bp.introText)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ AD SPACE - TOP ═══════════════════ */}
      <div className="section-dark">
        <div className="section-container pb-8">
          <motion.div
            className="rounded-2xl px-6 py-8 text-center"
            style={{
              border: "2px dashed rgba(212,168,67,0.15)",
              background: "rgba(212,168,67,0.03)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Megaphone className="mx-auto mb-2 h-8 w-8" style={{ color: "rgba(212,168,67,0.3)" }} />
            <p className="text-sm font-medium" style={{ color: "rgba(212,168,67,0.5)" }}>
              {t(bp.adSpaceTitle)}
            </p>
            <p className="mt-1 text-xs" style={{ color: "rgba(212,168,67,0.3)" }}>
              {t(bp.adSpaceDesc)}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════ CATEGORY TABS & LISTINGS ═══════════════════ */}
      <section className="section-dark relative py-8 md:py-12">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(bp.browseByCategory)}
            </h2>
            <div className="sacred-divider mt-4">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {businessCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
                style={
                  activeCategory === cat.id
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
                {cat.icon}
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Active Category Header */}
          <motion.div
            className="mb-8 flex items-center gap-3"
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span style={{ color: currentCategory.accent }}>{currentCategory.icon}</span>
            <h3 className="font-heading text-2xl font-bold text-cream-100">
              {currentCategory.label}
            </h3>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${currentCategory.accent}40, transparent)` }}
            />
          </motion.div>

          {/* Business Cards Grid */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placeholderBusinesses.map((business, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                className="card-glass group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(212,168,67,0.08)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 temple-pattern opacity-[0.02] pointer-events-none" />

                <div className="relative z-10">
                  {/* Category Badge */}
                  <span
                    className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `${currentCategory.accent}15`,
                      color: currentCategory.accent,
                      border: `1px solid ${currentCategory.accent}25`,
                    }}
                  >
                    {currentCategory.icon}
                    {currentCategory.label}
                  </span>

                  {/* "Coming Soon" badge */}
                  <div className="mb-3 flex items-center gap-2">
                    <h4 className="font-heading text-xl font-bold text-cream-100">
                      {business.name}
                    </h4>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: "rgba(212,168,67,0.15)",
                        color: "#D4A843",
                        border: "1px solid rgba(212,168,67,0.2)",
                      }}
                    >
                      {t(bp.comingSoon)}
                    </span>
                  </div>

                  {/* Star Rating Placeholder */}
                  <div className="mb-4 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-4 w-4"
                        fill="currentColor"
                        style={{ color: "rgba(212,168,67,0.15)" }}
                      />
                    ))}
                    <span className="ml-1 text-xs text-cream-300/30">{t(bp.noRatings)}</span>
                  </div>

                  {/* Contact Placeholder */}
                  <div className="mb-5 space-y-2 text-sm text-cream-300/40">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" style={{ color: "rgba(212,168,67,0.4)" }} />
                      <span>{t(bp.addressPlaceholder)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" style={{ color: "rgba(212,168,67,0.4)" }} />
                      <span>{t(bp.contactPending)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" style={{ color: "rgba(212,168,67,0.4)" }} />
                      <span>{t(bp.websiteSoon)}</span>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <button className="btn-ghost-gold w-full gap-2 py-2.5 text-sm">
                    <BadgeCheck className="h-4 w-4" />
                    {t(bp.claimListing)}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ AD SPACE - MIDDLE ═══════════════════ */}
      <section className="relative bg-cream-50 py-8">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <motion.div
            className="rounded-2xl px-6 py-10 text-center"
            style={{
              border: "2px dashed rgba(212,168,67,0.2)",
              background: "rgba(212,168,67,0.03)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Building className="mx-auto mb-3 h-10 w-10" style={{ color: "rgba(212,168,67,0.3)" }} />
            <p className="font-medium" style={{ color: "rgba(212,168,67,0.7)" }}>
              {t(bp.sponsoredTitle)}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-temple-400">
              {t(bp.sponsoredDesc)}
            </p>
            <button
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: "#D4A843" }}
            >
              {t(bp.learnMore)} <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ LIST YOUR BUSINESS ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,168,67,0.04)_0%,transparent_60%)]" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
                {t(bp.listYourBusiness)}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream-300/60">
                {t(bp.listDesc)}
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { Icon: BadgeCheck, title: t(bp.verifiedListing), desc: t(bp.verifiedDesc) },
                  { Icon: Star, title: t(bp.customerReviews), desc: t(bp.customerReviewsDesc) },
                  { Icon: Megaphone, title: t(bp.premiumPlacement), desc: t(bp.premiumPlacementDesc) },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 rounded-full p-2"
                      style={{ background: "rgba(212,168,67,0.1)" }}
                    >
                      <item.Icon className="h-5 w-5" style={{ color: "#D4A843" }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream-100">{item.title}</h4>
                      <p className="text-sm text-cream-300/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 rounded-xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
                  border: "1px solid rgba(212,168,67,0.15)",
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" style={{ color: "#D4A843" }} />
                  <span className="font-heading font-bold" style={{ color: "#D4A843" }}>
                    {t(bp.premiumUpgrade)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-cream-300/50">
                  Featured listings get premium placement at the top of search results,
                  highlighted cards, a verified badge, and priority customer support.
                  Stand out from the crowd and maximize your visibility during Kumbh Mela.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="card-dark p-8"
                style={{ borderColor: "rgba(212,168,67,0.15)" }}
              >
                <h3 className="font-heading text-2xl font-bold text-cream-100 mb-6">
                  {t(bp.registerTitle)}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="businessName"
                      className="mb-1.5 block text-sm font-medium text-cream-300/60"
                    >
                      {t(bp.formBusinessName)}
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleFormChange}
                      placeholder="Enter your business name"
                      className="w-full rounded-lg px-4 py-3 text-cream-100 placeholder-cream-300/30 transition-all focus:outline-none focus:ring-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(212,168,67,0.12)",
                        // @ts-expect-error -- ring color
                        "--tw-ring-color": "rgba(212,168,67,0.4)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-1.5 block text-sm font-medium text-cream-300/60"
                    >
                      {t(bp.formCategory)}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full rounded-lg px-4 py-3 text-cream-100 transition-all focus:outline-none focus:ring-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(212,168,67,0.12)",
                      }}
                    >
                      <option value="" style={{ background: "#1A1510" }}>{t(bp.formSelectCategory)}</option>
                      {businessCategories.map((cat) => (
                        <option key={cat.id} value={cat.id} style={{ background: "#1A1510" }}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-1.5 block text-sm font-medium text-cream-300/60"
                    >
                      {t(bp.formContact)}
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleFormChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-lg px-4 py-3 text-cream-100 placeholder-cream-300/30 transition-all focus:outline-none focus:ring-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(212,168,67,0.12)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-1.5 block text-sm font-medium text-cream-300/60"
                    >
                      {t(bp.formDescription)}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Tell pilgrims about your business..."
                      rows={4}
                      className="w-full resize-none rounded-lg px-4 py-3 text-cream-100 placeholder-cream-300/30 transition-all focus:outline-none focus:ring-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(212,168,67,0.12)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full gap-2"
                  >
                    <Send className="h-5 w-5" />
                    {t(bp.formSubmit)}
                  </button>

                  <p className="mt-3 text-center text-xs text-cream-300/30">
                    {t(bp.formNote)}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ BOTTOM AD SPACE ═══════════════════ */}
      <section className="relative bg-cream-50 py-8">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <motion.div
            className="rounded-2xl px-6 py-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(212,168,67,0.05), rgba(212,168,67,0.02))",
              border: "2px dashed rgba(212,168,67,0.2)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <Megaphone className="h-8 w-8" style={{ color: "rgba(212,168,67,0.4)" }} />
            </div>
            <p className="font-heading text-lg font-bold" style={{ color: "#D4A843" }}>
              {t(bp.advertisingTitle)}
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-temple-400">
              {t(bp.advertisingDesc)}
            </p>
            <a
              href="mailto:info@thenashikkumbh.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#D4A843" }}
            >
              {t(bp.contactForAds)} <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
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
            {t(bp.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-300/70">
            {t(bp.ctaDesc)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/guide" className="btn-gold inline-flex items-center gap-2">
              <Compass className="h-5 w-5" />
              {t(translations.eventsPage.pilgrimGuide)}
            </Link>
            <Link href="/dates" className="btn-ghost-gold inline-flex items-center gap-2">
              {t(translations.eventsPage.viewDates)}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>


    </>
  );
}

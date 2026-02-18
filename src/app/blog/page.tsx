"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Send,
  Newspaper,
  Calendar,
  ExternalLink,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";

/* ───────────────────────────── types ───────────────────────────── */

type TranslatedString = { en: string; hi: string; mr: string };

type NewsCategory = "kumbh" | "infra" | "govt" | "culture";

interface NewsArticle {
  id: number;
  title: TranslatedString;
  date: string;
  source: string;
  category: NewsCategory;
  summary: TranslatedString;
}

/* ───────────────────────────── news data ───────────────────────── */

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: {
      en: "Nashik Kumbh Mela 2027 to Begin with Flag Hoisting on October 31, 2026",
      hi: "नासिक कुंभ मेला 2027: 31 अक्टूबर 2026 को ध्वजारोहण से शुरुआत",
      mr: "नाशिक कुंभमेळा 2027: 31 ऑक्टोबर 2026 रोजी ध्वजारोहणाने सुरुवात",
    },
    date: "2025-12-15",
    source: "Deccan Chronicle",
    category: "kumbh",
    summary: {
      en: "The Simhastha Kumbh Mela will officially commence on October 31, 2026. The three key Amrit Snan dates are August 2, August 31, and September 11-12, 2027.",
      hi: "सिंहस्थ कुंभ मेला आधिकारिक रूप से 31 अक्टूबर 2026 को शुरू होगा। तीन प्रमुख अमृत स्नान तिथियां 2 अगस्त, 31 अगस्त और 11-12 सितंबर 2027 हैं।",
      mr: "सिंहस्थ कुंभमेळा अधिकृतपणे 31 ऑक्टोबर 2026 रोजी सुरू होईल. तीन प्रमुख अमृत स्नान तिथी 2 ऑगस्ट, 31 ऑगस्ट आणि 11-12 सप्टेंबर 2027 आहेत.",
    },
  },
  {
    id: 2,
    title: {
      en: "Maharashtra Govt Approves Rs 25,055 Crore for 2027 Nashik Kumbh Mela",
      hi: "महाराष्ट्र सरकार ने कुंभ 2027 के लिए 25,055 करोड़ मंजूर",
      mr: "महाराष्ट्र शासनाने कुंभ 2027 साठी 25,055 कोटी मंजूर",
    },
    date: "2025-11-20",
    source: "Free Press Journal",
    category: "govt",
    summary: {
      en: "The Maharashtra government approved a massive Rs 25,055 crore development plan to transform Nashik into a world-class spiritual destination. An estimated 15-20 crore devotees are expected.",
      hi: "महाराष्ट्र सरकार ने नासिक को विश्व स्तरीय आध्यात्मिक स्थल में बदलने के लिए 25,055 करोड़ रुपये की विकास योजना को मंजूरी दी। अनुमानित 15-20 करोड़ भक्तों के आने की उम्मीद है।",
      mr: "महाराष्ट्र शासनाने नाशिकला जागतिक दर्जाचे आध्यात्मिक स्थळ बनवण्यासाठी 25,055 कोटी रुपयांच्या विकास योजनेला मंजुरी दिली. अंदाजे 15-20 कोटी भाविक अपेक्षित आहेत.",
    },
  },
  {
    id: 3,
    title: {
      en: "CM Fadnavis Sets Strict Deadlines for Kumbh Infrastructure",
      hi: "मुख्यमंत्री फडणवीस ने कुंभ बुनियादी ढांचे के लिए सख्त समय सीमा",
      mr: "मुख्यमंत्री फडणवीस यांनी कुंभ पायाभूत सुविधांसाठी कडक मुदत",
    },
    date: "2025-10-08",
    source: "Swarajya Magazine",
    category: "infra",
    summary: {
      en: "CM Fadnavis set strict deadlines for infrastructure completion. The event is planned as the most technology-enabled Kumbh ever, with AI for crowd monitoring. Rs 4,000 crore worth of projects initiated.",
      hi: "मुख्यमंत्री फडणवीस ने बुनियादी ढांचे के पूरा होने के लिए सख्त समय सीमा निर्धारित की। यह अब तक का सबसे तकनीकी कुंभ होगा।",
      mr: "मुख्यमंत्री फडणवीस यांनी पायाभूत सुविधा पूर्ण करण्यासाठी कडक मुदती ठरवल्या. हा आतापर्यंतचा सर्वात तंत्रज्ञानयुक्त कुंभ असेल.",
    },
  },
  {
    id: 4,
    title: {
      en: "Rs 8,000-Crore Ring Road Project Cleared for Nashik Kumbh",
      hi: "नासिक कुंभ के लिए 8,000 करोड़ का रिंग रोड मंजूर",
      mr: "नाशिक कुंभासाठी 8,000 कोटींचा रिंग रोड मंजूर",
    },
    date: "2025-09-15",
    source: "Lokmat Times",
    category: "infra",
    summary: {
      en: "An ambitious 91-km ring road around Nashik city, estimated at Rs 8,000 crore, has been cleared. Rs 2,270 crore allocated for 289 km of road development.",
      hi: "नासिक शहर के चारों ओर 91 किमी का 8,000 करोड़ रुपये का रिंग रोड प्रोजेक्ट मंजूर हुआ। 289 किमी सड़कों के लिए 2,270 करोड़ आवंटित।",
      mr: "नाशिक शहराभोवती 91 किमीचा 8,000 कोटींचा रिंग रोड प्रकल्प मंजूर. 289 किमी रस्त्यांसाठी 2,270 कोटी मंजूर.",
    },
  },
  {
    id: 5,
    title: {
      en: "Railways Begin Preparations for Nashik Simhastha 2027",
      hi: "रेलवे ने नासिक सिंहस्थ 2027 की तैयारी शुरू की",
      mr: "रेल्वेने नाशिक सिंहस्थ 2027 ची तयारी सुरू केली",
    },
    date: "2025-08-22",
    source: "All India Radio",
    category: "infra",
    summary: {
      en: "The Ministry of Railways commenced preparations with comprehensive infrastructure upgrades. 4,500 buses planned for pilgrim transport, 8-10 helipads for emergency access.",
      hi: "रेल मंत्रालय ने व्यापक बुनियादी ढांचा उन्नयन शुरू किया। 4,500 बसों और 8-10 हेलीपैड की योजना।",
      mr: "रेल्वे मंत्रालयाने सर्वसमावेशक पायाभूत सुविधा उन्नयन सुरू केले. 4,500 बसेस आणि 8-10 हेलिपॅडचे नियोजन.",
    },
  },
  {
    id: 6,
    title: {
      en: "NTKMA Approves Major Phase 2 Infrastructure at Trimbakeshwar",
      hi: "एनटीकेएमए ने त्र्यंबकेश्वर में प्रमुख चरण 2 बुनियादी ढांचा मंजूर",
      mr: "एनटीकेएमएने त्र्यंबकेश्वरमध्ये प्रमुख फेज 2 पायाभूत सुविधा मंजूर",
    },
    date: "2025-07-10",
    source: "Free Press Journal",
    category: "infra",
    summary: {
      en: "NTKMA approved Phase 2 development at Trimbakeshwar worth Rs 390 crore, including Darshan Path, ghats redevelopment, Shahi Marg reconstruction, and vendor zones.",
      hi: "एनटीकेएमए ने त्र्यंबकेश्वर में 390 करोड़ रुपये के चरण 2 विकास को मंजूरी दी, जिसमें दर्शन पथ, घाट पुनर्विकास और शाही मार्ग शामिल।",
      mr: "एनटीकेएमएने त्र्यंबकेश्वरमध्ये 390 कोटींच्या फेज 2 विकासाला मंजुरी दिली, ज्यात दर्शन पथ, घाट पुनर्विकास आणि शाही मार्ग यांचा समावेश.",
    },
  },
  {
    id: 7,
    title: {
      en: "Nashik Launches 'Plastic to Fuel' Drive in 200 Schools",
      hi: "नासिक ने 200 स्कूलों में 'प्लास्टिक से ईंधन' अभियान शुरू",
      mr: "नाशिकने 200 शाळांमध्ये 'प्लास्टिक ते इंधन' मोहीम सुरू केली",
    },
    date: "2025-06-05",
    source: "Free Press Journal",
    category: "culture",
    summary: {
      en: "A 'Plastic to Fuel' campaign launched across 200 schools to make Nashik plastic-free before Kumbh. Rs 2,000 crore allocated for Godavari River cleaning.",
      hi: "कुंभ से पहले नासिक को प्लास्टिक-मुक्त बनाने के लिए 200 स्कूलों में 'प्लास्टिक से ईंधन' अभियान। गोदावरी सफाई के लिए 2,000 करोड़।",
      mr: "कुंभापूर्वी नाशिक प्लास्टिकमुक्त करण्यासाठी 200 शाळांमध्ये 'प्लास्टिक ते इंधन' मोहीम. गोदावरी स्वच्छतेसाठी 2,000 कोटी.",
    },
  },
  {
    id: 8,
    title: {
      en: "Mobility Planning for Simhastha Focuses on Rural Connectivity",
      hi: "सिंहस्थ गतिशीलता योजना ग्रामीण कनेक्टिविटी पर केंद्रित",
      mr: "सिंहस्थ गतिशीलता योजना ग्रामीण जोडणीवर केंद्रित",
    },
    date: "2025-05-18",
    source: "Punekar News",
    category: "infra",
    summary: {
      en: "Comprehensive mobility plan with focus on rural Nashik-Trimbakeshwar connectivity. Major bus stations to be renovated. Ring road and helipads planned.",
      hi: "ग्रामीण नासिक-त्र्यंबकेश्वर कनेक्टिविटी पर केंद्रित व्यापक गतिशीलता योजना। प्रमुख बस स्टेशनों का नवीनीकरण।",
      mr: "ग्रामीण नाशिक-त्र्यंबकेश्वर जोडणीवर केंद्रित सर्वसमावेशक गतिशीलता योजना. प्रमुख बस स्थानकांचे नूतनीकरण.",
    },
  },
  {
    id: 9,
    title: {
      en: "Tent Cities and Helicopter Service Planned for Jyotirlinga Circuit",
      hi: "ज्योतिर्लिंग सर्किट के लिए तंबू शहर और हेलीकॉप्टर सेवा",
      mr: "ज्योतिर्लिंग परिक्रमेसाठी तंबू शहर आणि हेलिकॉप्टर सेवा",
    },
    date: "2025-04-25",
    source: "Free Press Journal",
    category: "kumbh",
    summary: {
      en: "Plans for tent cities and helicopter service connecting Jyotirlinga pilgrimage circuit. NMC to acquire 250+ acres for Sadhugram with full amenities.",
      hi: "ज्योतिर्लिंग सर्किट को जोड़ने वाली तंबू शहर और हेलीकॉप्टर सेवा की योजना। साधुग्राम के लिए 250+ एकड़ भूमि अधिग्रहण।",
      mr: "ज्योतिर्लिंग परिक्रमेला जोडणाऱ्या तंबू शहर आणि हेलिकॉप्टर सेवेची योजना. साधुग्रामसाठी 250+ एकर जमीन संपादन.",
    },
  },
  {
    id: 10,
    title: {
      en: "Maharashtra Government Gears Up for Nashik Kumbh Mela 2027",
      hi: "महाराष्ट्र सरकार नासिक कुंभ मेला 2027 की तैयारी में जुटी",
      mr: "महाराष्ट्र शासन नाशिक कुंभमेळा 2027 च्या तयारीला लागले",
    },
    date: "2025-03-29",
    source: "ANI News",
    category: "govt",
    summary: {
      en: "CM Fadnavis announced this edition would be the most technologically advanced Kumbh Mela in history. The 21-month duration was planned to distribute crowds and improve safety.",
      hi: "मुख्यमंत्री फडणवीस ने घोषणा की कि यह इतिहास का सबसे तकनीकी रूप से उन्नत कुंभ होगा। 21 महीने की अवधि भीड़ वितरण और सुरक्षा सुधार के लिए।",
      mr: "मुख्यमंत्री फडणवीस यांनी घोषणा केली की हा इतिहासातील सर्वात तंत्रज्ञानदृष्ट्या प्रगत कुंभ असेल. 21 महिन्यांचा कालावधी गर्दी वितरण आणि सुरक्षा सुधारणांसाठी.",
    },
  },
  {
    id: 11,
    title: {
      en: "Monsoon-Ready Tent City Plans Reviewed for Simhastha 2027",
      hi: "सिंहस्थ 2027 के लिए मानसून-तैयार तंबू शहर की योजना",
      mr: "सिंहस्थ 2027 साठी मान्सून-तयार तंबू शहराची योजना",
    },
    date: "2026-02-12",
    source: "Punekar News",
    category: "kumbh",
    summary: {
      en: "NTKMA finalized climate-resilient tent city plans. Bamboo-based storm-proof structures designed for monsoon season. Commissioner aims to eliminate past service gaps.",
      hi: "एनटीकेएमए ने मानसून-तैयार तंबू शहर की योजना तैयार की। बांस-आधारित तूफान-रोधी संरचनाएं डिजाइन।",
      mr: "एनटीकेएमएने मान्सून-तयार तंबू शहराची योजना तयार केली. बांबू-आधारित वादळरोधी संरचना डिझाइन.",
    },
  },
  {
    id: 12,
    title: {
      en: "Telangana Delegation Visits Nashik to Study Kumbh Preparations",
      hi: "तेलंगाना प्रतिनिधिमंडल ने कुंभ तैयारियों का अध्ययन किया",
      mr: "तेलंगाणा शिष्टमंडळाने कुंभ तयारीचा अभ्यास केला",
    },
    date: "2026-01-20",
    source: "Free Press Journal",
    category: "govt",
    summary: {
      en: "A Telangana government delegation visited Nashik to draw insights for Godavari Pushkaram 2027. They toured Ramkund, Panchavati, and Kalaram Temple to assess infrastructure.",
      hi: "तेलंगाना सरकार का प्रतिनिधिमंडल गोदावरी पुष्करम 2027 के लिए अंतर्दृष्टि प्राप्त करने हेतु नासिक आया। रामकुंड और पंचवटी का दौरा किया।",
      mr: "गोदावरी पुष्करम 2027 साठी अंतर्दृष्टी मिळवण्यासाठी तेलंगाणा शिष्टमंडळाने नाशिकला भेट दिली. रामकुंड आणि पंचवटीला भेट.",
    },
  },
];

/* sort newest first */
const sortedArticles = [...newsArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/* ───────────────────────────── existing blog posts ───────────── */

const placeholderPosts = [
  {
    slug: "what-is-kumbh-mela",
    titleKey: "post1Title" as const,
    excerptKey: "post1Excerpt" as const,
    categoryKey: "catGuide" as const,
  },
  {
    slug: "shahi-snan-significance",
    titleKey: "post2Title" as const,
    excerptKey: "post2Excerpt" as const,
    categoryKey: "catSpirituality" as const,
  },
  {
    slug: "nashik-ramayana-connection",
    titleKey: "post3Title" as const,
    excerptKey: "post3Excerpt" as const,
    categoryKey: "catHeritage" as const,
  },
  {
    slug: "godavari-river-significance",
    titleKey: "post4Title" as const,
    excerptKey: "post4Excerpt" as const,
    categoryKey: "catSpirituality" as const,
  },
  {
    slug: "packing-guide-kumbh",
    titleKey: "post5Title" as const,
    excerptKey: "post5Excerpt" as const,
    categoryKey: "catTravel" as const,
  },
  {
    slug: "akhada-tradition",
    titleKey: "post6Title" as const,
    excerptKey: "post6Excerpt" as const,
    categoryKey: "catHeritage" as const,
  },
];

/* ───────────────────────────── helpers ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  kumbh: {
    bg: "rgba(245,158,11,0.12)",
    text: "#F59E0B",
    border: "rgba(245,158,11,0.25)",
  },
  infra: {
    bg: "rgba(59,130,246,0.12)",
    text: "#3B82F6",
    border: "rgba(59,130,246,0.25)",
  },
  govt: {
    bg: "rgba(16,185,129,0.12)",
    text: "#10B981",
    border: "rgba(16,185,129,0.25)",
  },
  culture: {
    bg: "rgba(139,92,246,0.12)",
    text: "#8B5CF6",
    border: "rgba(139,92,246,0.25)",
  },
  spirituality: {
    bg: "rgba(244,63,94,0.12)",
    text: "#F43F5E",
    border: "rgba(244,63,94,0.25)",
  },
  heritage: {
    bg: "rgba(249,115,22,0.12)",
    text: "#F97316",
    border: "rgba(249,115,22,0.25)",
  },
  travel: {
    bg: "rgba(14,165,233,0.12)",
    text: "#0EA5E9",
    border: "rgba(14,165,233,0.25)",
  },
  guide: {
    bg: "rgba(20,184,166,0.12)",
    text: "#14B8A6",
    border: "rgba(20,184,166,0.25)",
  },
};

const categoryTranslationMap: Record<NewsCategory, "catKumbh" | "catInfra" | "catGovt" | "catCulture"> = {
  kumbh: "catKumbh",
  infra: "catInfra",
  govt: "catGovt",
  culture: "catCulture",
};

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  const localeMap: Record<Locale, string> = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };
  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ───────────────────────────── page ───────────────────────────── */

export default function BlogPage() {
  const { t, locale } = useLanguage();
  const bp = translations.blogPage;
  const bn = translations.blogNews;
  const [activeFilter, setActiveFilter] = useState<"all" | NewsCategory>("all");

  const filteredArticles =
    activeFilter === "all"
      ? sortedArticles
      : sortedArticles.filter((a) => a.category === activeFilter);

  const filterOptions: { key: "all" | NewsCategory; label: string }[] = [
    { key: "all", label: locale === "en" ? "All" : locale === "hi" ? "सभी" : "सर्व" },
    { key: "kumbh", label: t(bn.catKumbh) },
    { key: "infra", label: t(bn.catInfra) },
    { key: "govt", label: t(bn.catGovt) },
    { key: "culture", label: t(bn.catCulture) },
  ];

  return (
    <>
      {/* ════════════════════ HERO BANNER ════════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-20 top-20 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-20 h-64 w-64 rounded-full"
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
            ज्ञान
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

      {/* ════════════════════ NEWS TIMELINE ════════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          {/* Section Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: "#D4A843",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              <Newspaper className="h-4 w-4" />
              {t(bn.latestNews)}
            </div>
            <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-4xl">
              {t(bn.latestNews)}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-cream-300/60">
              {t(bn.newsSubtitle)}
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Filter className="mr-1 h-4 w-4 text-cream-300/40" />
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.key;
              const colors = opt.key === "all" ? null : categoryColors[opt.key];
              return (
                <button
                  key={opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: colors?.bg ?? "rgba(212,168,67,0.15)",
                          color: colors?.text ?? "#D4A843",
                          border: `1px solid ${colors?.border ?? "rgba(212,168,67,0.3)"}`,
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.45)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Gold timeline line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-px md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(212,168,67,0.3) 5%, rgba(212,168,67,0.3) 95%, transparent)",
              }}
            />

            <div className="space-y-8">
              {filteredArticles.map((article, index) => {
                const colors = categoryColors[article.category];
                return (
                  <motion.div
                    key={article.id}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="relative md:pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 top-6 hidden h-5 w-5 -translate-x-1/2 rounded-full md:block"
                      style={{
                        background: colors.bg,
                        border: `2px solid ${colors.text}`,
                        boxShadow: `0 0 12px ${colors.bg}`,
                      }}
                    />

                    {/* Article Card */}
                    <article
                      className="group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 md:p-8"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(212,168,67,0.08)",
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(ellipse at top left, ${colors.bg}, transparent 70%)`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Top Row: Category + Date */}
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                            style={{
                              background: colors.bg,
                              color: colors.text,
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {t(bn[categoryTranslationMap[article.category]])}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-cream-300/40">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(article.date, locale)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-cream-100 md:text-xl">
                          {article.title[locale]}
                        </h3>

                        {/* Summary */}
                        <p className="mb-4 leading-relaxed text-cream-300/55 text-sm md:text-base">
                          {article.summary[locale]}
                        </p>

                        {/* Footer: Source */}
                        <div className="flex items-center gap-2 text-sm">
                          <ExternalLink className="h-3.5 w-3.5 text-cream-300/30" />
                          <span className="text-cream-300/30">
                            {t(bn.source)}:
                          </span>
                          <span style={{ color: "#D4A843" }} className="font-medium">
                            {article.source}
                          </span>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ ARTICLES GRID ════════════════════ */}
      <section className="section-dark relative py-8 md:py-16">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          {/* Section header for articles */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-4xl">
              {t(bp.heroTitle)}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-cream-300/60">
              {t(bp.blogIntro)}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="gold-line-thick mx-auto mt-6 w-32 origin-center"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post, index) => {
              const catKey = post.categoryKey.replace("cat", "").toLowerCase();
              const colors = categoryColors[catKey] ?? categoryColors.guide;

              return (
                <motion.article
                  key={post.slug}
                  className="card-dark group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2"
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
                    {/* Image Placeholder */}
                    <div
                      className="mb-4 flex h-48 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
                        border: "1px solid rgba(212,168,67,0.1)",
                      }}
                    >
                      <span
                        className="font-heading text-lg"
                        style={{ color: "rgba(212,168,67,0.4)" }}
                      >
                        {t(bp[post.categoryKey])}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {t(bp[post.categoryKey])}
                    </span>

                    {/* Title */}
                    <h2 className="mb-2 font-heading text-lg font-bold text-cream-100 line-clamp-2">
                      {t(bp[post.titleKey])}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-4 text-sm leading-relaxed text-cream-300/50 line-clamp-3">
                      {t(bp[post.excerptKey])}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cream-300/30">{t(bp.comingSoon)}</span>
                      <span
                        className="inline-flex items-center gap-1 font-semibold transition-colors"
                        style={{ color: "#D4A843" }}
                      >
                        {t(bp.readMore)} <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* ════════════════════ NEWSLETTER CTA ════════════════════ */}
          <motion.div
            className="mt-16 rounded-2xl p-8 text-center md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.03))",
              border: "1px solid rgba(212,168,67,0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-4 font-heading text-2xl font-bold text-cream-100 md:text-3xl">
              {t(bp.newsletterTitle)}
            </h3>
            <p className="mx-auto mb-6 max-w-lg text-cream-300/60">
              {t(bp.newsletterDesc)}
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t(bp.emailPlaceholder)}
                className="flex-1 rounded-lg px-4 py-3 text-cream-100 placeholder-cream-300/30 transition-all focus:outline-none focus:ring-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,168,67,0.12)",
                }}
              />
              <button
                type="submit"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {t(bp.subscribe)}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

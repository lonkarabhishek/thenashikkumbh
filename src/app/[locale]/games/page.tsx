"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "@/components/LocaleLink";
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
  Share2,
  Calendar,
  Flame,
  Shuffle,
  Lightbulb,
  ArrowRight,
  Clock,
  ChevronRight,
  Gamepad2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";

/* ───────────────────────────── types ───────────────────────────── */

type TranslatedString = { en: string; hi: string; mr: string };

interface Activity {
  icon: React.ReactNode;
  titleKey: TranslatedString;
  descKey: TranslatedString;
  badgeKey: TranslatedString;
  badgeColor: string;
}

interface QuizQuestion {
  question: TranslatedString;
  options: TranslatedString[];
  correctIndex: number;
}

interface ScrambleWord {
  word: TranslatedString;
  hint: TranslatedString;
  answer: string; // English answer for matching
}

/* ───────────────────────────── seeded random ───────────────────────────── */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getDayNumber(): number {
  const start = new Date("2025-01-01").getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((today - start) / 86400000) + 1;
}

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function shuffleArray<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  const rand = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/* ───────────────────────────── activity data ───────────────────────────── */

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

/* ───────────────────────────── MASSIVE quiz question pool ───────────────────────────── */

const allQuizQuestions: QuizQuestion[] = [
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
  {
    question: { en: "Which ghat in Nashik is considered the holiest?", hi: "नासिक में कौन सा घाट सबसे पवित्र माना जाता है?", mr: "नाशिकमधील कोणता घाट सर्वात पवित्र मानला जातो?" },
    options: [
      { en: "Tapovan Ghat", hi: "तपोवन घाट", mr: "तपोवन घाट" },
      { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
      { en: "Kapila Ghat", hi: "कपिला घाट", mr: "कपिला घाट" },
      { en: "Dutondya Ghat", hi: "दुतोंड्या घाट", mr: "दुतोंड्या घाट" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "How many Shahi Snan dates are there in Nashik Kumbh 2027?", hi: "नासिक कुंभ 2027 में कितने शाही स्नान हैं?", mr: "नाशिक कुंभ 2027 मध्ये किती शाही स्नान आहेत?" },
    options: [
      { en: "3", hi: "३", mr: "३" },
      { en: "5", hi: "५", mr: "५" },
      { en: "7", hi: "७", mr: "७" },
      { en: "4", hi: "४", mr: "४" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "Which planet's position determines Nashik Kumbh?", hi: "कौन से ग्रह की स्थिति नासिक कुंभ निर्धारित करती है?", mr: "कोणत्या ग्रहाच्या स्थितीवरून नाशिक कुंभ ठरतो?" },
    options: [
      { en: "Mars", hi: "मंगल", mr: "मंगळ" },
      { en: "Jupiter", hi: "बृहस्पति", mr: "बृहस्पती" },
      { en: "Saturn", hi: "शनि", mr: "शनी" },
      { en: "Venus", hi: "शुक्र", mr: "शुक्र" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "Who carried the Kumbh (pot) of Amrit according to mythology?", hi: "पौराणिक कथा के अनुसार अमृत का कुंभ कौन ले गया?", mr: "पौराणिक कथेनुसार अमृताचा कुंभ कोण घेऊन गेला?" },
    options: [
      { en: "Lord Vishnu", hi: "भगवान विष्णु", mr: "भगवान विष्णू" },
      { en: "Lord Shiva", hi: "भगवान शिव", mr: "भगवान शिव" },
      { en: "Dhanvantari / Garuda", hi: "धनवंतरी / गरुड", mr: "धन्वंतरी / गरुड" },
      { en: "Lord Brahma", hi: "भगवान ब्रह्मा", mr: "भगवान ब्रह्मा" },
    ],
    correctIndex: 2,
  },
  {
    question: { en: "From which mountain does the Godavari river originate?", hi: "गोदावरी नदी किस पर्वत से निकलती है?", mr: "गोदावरी नदी कोणत्या पर्वतावरून उगम पावते?" },
    options: [
      { en: "Sahyadri (Trimbakeshwar)", hi: "सह्याद्री (त्र्यंबकेश्वर)", mr: "सह्याद्री (त्र्यंबकेश्वर)" },
      { en: "Himalayas", hi: "हिमालय", mr: "हिमालय" },
      { en: "Vindhya", hi: "विंध्य", mr: "विंध्य" },
      { en: "Aravalli", hi: "अरावली", mr: "अरावली" },
    ],
    correctIndex: 0,
  },
  {
    question: { en: "What is a Shahi Snan?", hi: "शाही स्नान क्या है?", mr: "शाही स्नान म्हणजे काय?" },
    options: [
      { en: "A royal bath", hi: "राजघराने का स्नान", mr: "राजघराण्याचे स्नान" },
      { en: "Sacred bathing on auspicious dates", hi: "शुभ तिथियों पर पवित्र स्नान", mr: "शुभ तिथींवर पवित्र स्नान" },
      { en: "Bathing in hot springs", hi: "गर्म पानी में स्नान", mr: "गरम पाण्यात स्नान" },
      { en: "Swimming competition", hi: "तैराकी प्रतियोगिता", mr: "पोहण्याची स्पर्धा" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "Which zodiac sign (Rashi) must Jupiter be in for Nashik Kumbh?", hi: "नासिक कुंभ के लिए बृहस्पति किस राशि में होना चाहिए?", mr: "नाशिक कुंभासाठी बृहस्पती कोणत्या राशीत असावा?" },
    options: [
      { en: "Aries", hi: "मेष", mr: "मेष" },
      { en: "Leo (Simha)", hi: "सिंह", mr: "सिंह" },
      { en: "Scorpio", hi: "वृश्चिक", mr: "वृश्चिक" },
      { en: "Aquarius", hi: "कुंभ", mr: "कुंभ" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "What is Panchavati famous for in Nashik?", hi: "नासिक में पंचवटी किस लिए प्रसिद्ध है?", mr: "नाशिकमधील पंचवटी कशासाठी प्रसिद्ध आहे?" },
    options: [
      { en: "Five banyan trees, Lord Ram's exile stay", hi: "पाँच बरगद के पेड़, भगवान राम का वनवास", mr: "पाच वडाची झाडे, भगवान रामाचा वनवास" },
      { en: "Five temples", hi: "पाँच मंदिर", mr: "पाच मंदिरे" },
      { en: "Five rivers meeting point", hi: "पाँच नदियों का संगम", mr: "पाच नद्यांचा संगम" },
      { en: "Five mountain peaks", hi: "पाँच पर्वत शिखर", mr: "पाच पर्वत शिखरे" },
    ],
    correctIndex: 0,
  },
  {
    question: { en: "Which Jyotirlinga is near Nashik?", hi: "नासिक के पास कौन सा ज्योतिर्लिंग है?", mr: "नाशिकजवळ कोणते ज्योतिर्लिंग आहे?" },
    options: [
      { en: "Bhimashankar", hi: "भीमाशंकर", mr: "भीमाशंकर" },
      { en: "Trimbakeshwar", hi: "त्र्यंबकेश्वर", mr: "त्र्यंबकेश्वर" },
      { en: "Grishneshwar", hi: "घृष्णेश्वर", mr: "घृष्णेश्वर" },
      { en: "Aundha Nagnath", hi: "औंधा नागनाथ", mr: "औंधा नागनाथ" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "Which four cities host Kumbh Mela?", hi: "कुंभ मेला किन चार शहरों में लगता है?", mr: "कुंभमेळा कोणत्या चार शहरांत भरतो?" },
    options: [
      { en: "Delhi, Mumbai, Kolkata, Chennai", hi: "दिल्ली, मुंबई, कोलकाता, चेन्नई", mr: "दिल्ली, मुंबई, कोलकाता, चेन्नई" },
      { en: "Haridwar, Prayagraj, Nashik, Ujjain", hi: "हरिद्वार, प्रयागराज, नासिक, उज्जैन", mr: "हरिद्वार, प्रयागराज, नाशिक, उज्जैन" },
      { en: "Varanasi, Mathura, Nashik, Haridwar", hi: "वाराणसी, मथुरा, नासिक, हरिद्वार", mr: "वाराणसी, मथुरा, नाशिक, हरिद्वार" },
      { en: "Ayodhya, Dwarka, Puri, Nashik", hi: "अयोध्या, द्वारका, पुरी, नासिक", mr: "अयोध्या, द्वारका, पुरी, नाशिक" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "What does 'Kumbh' literally mean?", hi: "'कुंभ' का शाब्दिक अर्थ क्या है?", mr: "'कुंभ' चा शाब्दिक अर्थ काय?" },
    options: [
      { en: "Holy water", hi: "पवित्र जल", mr: "पवित्र पाणी" },
      { en: "Sacred river", hi: "पवित्र नदी", mr: "पवित्र नदी" },
      { en: "Pot / Pitcher", hi: "घड़ा / कलश", mr: "घडा / कलश" },
      { en: "Festival", hi: "उत्सव", mr: "उत्सव" },
    ],
    correctIndex: 2,
  },
  {
    question: { en: "Who leads the Shahi Snan procession?", hi: "शाही स्नान जुलूस का नेतृत्व कौन करता है?", mr: "शाही स्नान मिरवणुकीचे नेतृत्व कोण करतो?" },
    options: [
      { en: "Politicians", hi: "राजनेता", mr: "राजकारणी" },
      { en: "Akharas (Naga Sadhus)", hi: "अखाड़े (नागा साधु)", mr: "आखाडे (नागा साधू)" },
      { en: "Temple priests", hi: "मंदिर के पुजारी", mr: "मंदिराचे पुजारी" },
      { en: "Royal families", hi: "राजघराने", mr: "राजघराणे" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "What is the estimated footfall at Nashik Kumbh Mela?", hi: "नासिक कुंभ मेले में अनुमानित भीड़ कितनी होती है?", mr: "नाशिक कुंभमेळ्यात अंदाजे किती गर्दी असते?" },
    options: [
      { en: "10 million", hi: "1 करोड़", mr: "1 कोटी" },
      { en: "30 million", hi: "3 करोड़", mr: "3 कोटी" },
      { en: "75 million+", hi: "7.5 करोड़+", mr: "7.5 कोटी+" },
      { en: "100 million", hi: "10 करोड़", mr: "10 कोटी" },
    ],
    correctIndex: 2,
  },
  {
    question: { en: "What is the significance of Tapovan in Nashik?", hi: "नासिक में तपोवन का क्या महत्व है?", mr: "नाशिकमधील तपोवनाचे काय महत्त्व आहे?" },
    options: [
      { en: "Market area", hi: "बाज़ार क्षेत्र", mr: "बाजार क्षेत्र" },
      { en: "Where sages performed penance", hi: "जहाँ ऋषियों ने तपस्या की", mr: "जेथे ऋषींनी तपस्या केली" },
      { en: "Modern city center", hi: "आधुनिक शहर केंद्र", mr: "आधुनिक शहर केंद्र" },
      { en: "Railway station", hi: "रेलवे स्टेशन", mr: "रेल्वे स्थानक" },
    ],
    correctIndex: 1,
  },
  {
    question: { en: "When is the next Nashik Kumbh Mela?", hi: "अगला नासिक कुंभ मेला कब है?", mr: "पुढचा नाशिक कुंभमेळा कधी आहे?" },
    options: [
      { en: "2025", hi: "२०२५", mr: "२०२५" },
      { en: "2026", hi: "२०२६", mr: "२०२६" },
      { en: "2027", hi: "२०२७", mr: "२०२७" },
      { en: "2028", hi: "२०२८", mr: "२०२८" },
    ],
    correctIndex: 2,
  },
];

/* ───────────────────────────── word scramble data ───────────────────────────── */

const allScrambleWords: ScrambleWord[] = [
  { word: { en: "Godavari", hi: "गोदावरी", mr: "गोदावरी" }, hint: { en: "Sacred river of Nashik", hi: "नासिक की पवित्र नदी", mr: "नाशिकची पवित्र नदी" }, answer: "godavari" },
  { word: { en: "Kumbh", hi: "कुंभ", mr: "कुंभ" }, hint: { en: "The sacred pot of nectar", hi: "अमृत का पवित्र पात्र", mr: "अमृताचे पवित्र पात्र" }, answer: "kumbh" },
  { word: { en: "Nashik", hi: "नासिक", mr: "नाशिक" }, hint: { en: "City hosting Kumbh 2027", hi: "कुंभ 2027 का मेजबान शहर", mr: "कुंभ 2027 चे यजमान शहर" }, answer: "nashik" },
  { word: { en: "Trimbak", hi: "त्रिंबक", mr: "त्र्यंबक" }, hint: { en: "Home of a famous Jyotirlinga", hi: "प्रसिद्ध ज्योतिर्लिंग का घर", mr: "प्रसिद्ध ज्योतिर्लिंगाचे ठिकाण" }, answer: "trimbak" },
  { word: { en: "Sadhu", hi: "साधु", mr: "साधू" }, hint: { en: "Holy ascetic at Kumbh", hi: "कुंभ के पवित्र तपस्वी", mr: "कुंभातील पवित्र तपस्वी" }, answer: "sadhu" },
  { word: { en: "Panchavati", hi: "पंचवटी", mr: "पंचवटी" }, hint: { en: "Five banyan trees, Ram's exile", hi: "पाँच बरगद, राम का वनवास", mr: "पाच वड, रामाचा वनवास" }, answer: "panchavati" },
  { word: { en: "Amrit", hi: "अमृत", mr: "अमृत" }, hint: { en: "Nectar of immortality", hi: "अमरत्व का अमृत", mr: "अमरत्वाचे अमृत" }, answer: "amrit" },
  { word: { en: "Snan", hi: "स्नान", mr: "स्नान" }, hint: { en: "Sacred bathing ritual", hi: "पवित्र स्नान अनुष्ठान", mr: "पवित्र स्नान विधी" }, answer: "snan" },
  { word: { en: "Ramkund", hi: "रामकुंड", mr: "रामकुंड" }, hint: { en: "Holiest ghat in Nashik", hi: "नासिक का सबसे पवित्र घाट", mr: "नाशिकमधील सर्वात पवित्र घाट" }, answer: "ramkund" },
  { word: { en: "Akhara", hi: "अखाड़ा", mr: "आखाडा" }, hint: { en: "Order of holy warriors", hi: "पवित्र योद्धाओं का संप्रदाय", mr: "पवित्र योद्ध्यांचा संप्रदाय" }, answer: "akhara" },
  { word: { en: "Shahi", hi: "शाही", mr: "शाही" }, hint: { en: "Royal, as in ___ Snan", hi: "शाही, जैसे ___ स्नान", mr: "शाही, जसे ___ स्नान" }, answer: "shahi" },
  { word: { en: "Simhastha", hi: "सिंहस्थ", mr: "सिंहस्थ" }, hint: { en: "Other name for Nashik Kumbh", hi: "नासिक कुंभ का दूसरा नाम", mr: "नाशिक कुंभाचे दुसरे नाव" }, answer: "simhastha" },
  { word: { en: "Tapovan", hi: "तपोवन", mr: "तपोवन" }, hint: { en: "Forest of penance", hi: "तपस्या का वन", mr: "तपस्येचे वन" }, answer: "tapovan" },
  { word: { en: "Garuda", hi: "गरुड", mr: "गरुड" }, hint: { en: "Vehicle of Lord Vishnu", hi: "भगवान विष्णु का वाहन", mr: "भगवान विष्णूचे वाहन" }, answer: "garuda" },
  { word: { en: "Manthan", hi: "मंथन", mr: "मंथन" }, hint: { en: "Churning of the ocean", hi: "समुद्र का मंथन", mr: "समुद्राचे मंथन" }, answer: "manthan" },
];

/* ───────────────────────────── page component ───────────────────────────── */

export default function GamesPage() {
  const { t, locale } = useLanguage();
  const tq = useCallback((obj: TranslatedString): string => obj[locale as Locale] || obj.en, [locale]);

  /* ─── Daily Challenge state ─── */
  const dayNumber = useMemo(() => getDayNumber(), []);
  const todayKey = useMemo(() => getTodayKey(), []);

  const dailyQuestions = useMemo(() => {
    const shuffled = shuffleArray(allQuizQuestions, dayNumber * 7919);
    return shuffled.slice(0, 5);
  }, [dayNumber]);

  const [dailyStarted, setDailyStarted] = useState(false);
  const [dailyQ, setDailyQ] = useState(0);
  const [dailySelected, setDailySelected] = useState<number | null>(null);
  const [dailyAnswered, setDailyAnswered] = useState(false);
  const [dailyResults, setDailyResults] = useState<boolean[]>([]);
  const [dailyDone, setDailyDone] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [dailyCopied, setDailyCopied] = useState(false);
  const [dailyAlreadyPlayed, setDailyAlreadyPlayed] = useState(false);
  const [dailySavedResults, setDailySavedResults] = useState<boolean[]>([]);
  const [hoursLeft, setHoursLeft] = useState(0);

  // Load daily state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`kumbh_daily_${todayKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setDailyAlreadyPlayed(true);
        setDailySavedResults(parsed.results);
        setDailyDone(true);
      }
      const streak = parseInt(localStorage.getItem("kumbh_daily_streak") || "0");
      setDailyStreak(streak);
    } catch { /* ignore */ }
  }, [todayKey]);

  // Calculate hours until next day
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      setHoursLeft(Math.ceil((tomorrow.getTime() - now.getTime()) / 3600000));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDailyOption = (idx: number) => {
    if (dailyAnswered) return;
    setDailySelected(idx);
    setDailyAnswered(true);
    const isCorrect = idx === dailyQuestions[dailyQ].correctIndex;
    setDailyResults((prev) => [...prev, isCorrect]);
  };

  const handleDailyNext = () => {
    if (dailyQ < 4) {
      setDailyQ((prev) => prev + 1);
      setDailySelected(null);
      setDailyAnswered(false);
    } else {
      setDailyDone(true);
      // Save to localStorage
      const results = [...dailyResults];
      try {
        localStorage.setItem(`kumbh_daily_${todayKey}`, JSON.stringify({ results }));
        // Update streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
        const hadYesterday = localStorage.getItem(`kumbh_daily_${yKey}`);
        const oldStreak = parseInt(localStorage.getItem("kumbh_daily_streak") || "0");
        const newStreak = hadYesterday ? oldStreak + 1 : 1;
        localStorage.setItem("kumbh_daily_streak", String(newStreak));
        setDailyStreak(newStreak);
        setDailySavedResults(results);
      } catch { /* ignore */ }
    }
  };

  const dailyScore = useMemo(() => {
    const results = dailySavedResults.length > 0 ? dailySavedResults : dailyResults;
    return results.filter(Boolean).length;
  }, [dailySavedResults, dailyResults]);

  const handleDailyShare = useCallback(() => {
    const results = dailySavedResults.length > 0 ? dailySavedResults : dailyResults;
    const emoji = results.map((r) => (r ? "🟢" : "🔴")).join("");
    const score = results.filter(Boolean).length;
    const text = `कुंभ Daily #${dayNumber} ${emoji} ${score}/5\nthenashikkumbh.com/games`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        navigator.clipboard.writeText(text);
        setDailyCopied(true);
        setTimeout(() => setDailyCopied(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(text);
      setDailyCopied(true);
      setTimeout(() => setDailyCopied(false), 2500);
    }
  }, [dailySavedResults, dailyResults, dayNumber]);

  /* ─── Word Scramble state ─── */
  const scrambleWords = useMemo(() => {
    const shuffled = shuffleArray(allScrambleWords, dayNumber * 1301);
    return shuffled.slice(0, 5);
  }, [dayNumber]);

  const [scrambleStarted, setScrambleStarted] = useState(false);
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [scrambleInput, setScrambleInput] = useState("");
  const [scrambleShowHint, setScrambleShowHint] = useState(false);
  const [scrambleCorrect, setScrambleCorrect] = useState<boolean | null>(null);
  const [scrambleScore, setScrambleScore] = useState(0);
  const [scrambleDone, setScrambleDone] = useState(false);
  const [scrambleCopied, setScrambleCopied] = useState(false);

  const scrambleAnswer = useMemo(() => {
    if (!scrambleStarted || scrambleDone) return "";
    return scrambleWords[scrambleIndex].word[locale as Locale] || scrambleWords[scrambleIndex].word.en;
  }, [scrambleStarted, scrambleDone, scrambleWords, scrambleIndex, locale]);

  const scrambledLetters = useMemo(() => {
    if (!scrambleAnswer) return "";
    // For Devanagari, segment properly using Intl.Segmenter if available
    let chars: string[];
    if ((locale === "hi" || locale === "mr") && typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
      chars = Array.from(segmenter.segment(scrambleAnswer), (s) => s.segment);
    } else {
      chars = scrambleAnswer.split("");
    }
    return shuffleArray(chars, dayNumber * 311 + scrambleIndex * 97 + 1).join("");
  }, [scrambleAnswer, dayNumber, scrambleIndex, locale]);

  const handleScrambleSubmit = () => {
    if (!scrambleInput.trim()) return;
    const correct = scrambleInput.trim().toLowerCase() === scrambleAnswer.toLowerCase();
    setScrambleCorrect(correct);
    if (correct) setScrambleScore((p) => p + 1);
  };

  const handleScrambleNext = () => {
    if (scrambleIndex < 4) {
      setScrambleIndex((p) => p + 1);
      setScrambleInput("");
      setScrambleCorrect(null);
      setScrambleShowHint(false);
    } else {
      setScrambleDone(true);
    }
  };

  const handleScrambleSkip = () => {
    setScrambleCorrect(false);
    setTimeout(handleScrambleNext, 800);
  };

  const handleScrambleShare = useCallback(() => {
    const text = `${tq(translations.gamesPage.scrambleShareText)} ${scrambleScore} ${tq(translations.gamesPage.scrambleOf)} 5 ${tq(translations.gamesPage.scrambleWords)}! ${"⭐".repeat(scrambleScore)}${"☆".repeat(5 - scrambleScore)}\nthenashikkumbh.com/games`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        navigator.clipboard.writeText(text);
        setScrambleCopied(true);
        setTimeout(() => setScrambleCopied(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(text);
      setScrambleCopied(true);
      setTimeout(() => setScrambleCopied(false), 2500);
    }
  }, [scrambleScore, tq]);

  const handleScrambleRestart = () => {
    setScrambleStarted(false);
    setScrambleIndex(0);
    setScrambleInput("");
    setScrambleShowHint(false);
    setScrambleCorrect(null);
    setScrambleScore(0);
    setScrambleDone(false);
  };

  /* ─── Quiz state (enhanced - random 5 from pool) ─── */
  const quizQuestions = useMemo(() => {
    const seed = Math.floor(Math.random() * 100000);
    return shuffleArray(allQuizQuestions, seed).slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);

  const handleOptionClick = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    const isCorrect = index === quizQuestions[currentQ].correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);
    setQuizResults((prev) => [...prev, isCorrect]);
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
    setQuizResults([]);
  };

  const handleQuizShare = useCallback(() => {
    const emoji = quizResults.map((r) => (r ? "🟢" : "🔴")).join("");
    const text = `Kumbh Quiz ${emoji} ${score}/${quizQuestions.length}\nthenashikkumbh.com/games`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [quizResults, score, quizQuestions.length]);

  /* ─── Form state ─── */
  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    contact: "",
    description: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  /* ─── Result message helper ─── */
  const getResultMessage = (s: number, total: number) => {
    const pct = s / total;
    if (pct === 1) return t(translations.gamesPage.perfectScore);
    if (pct >= 0.6) return t(translations.gamesPage.greatScore);
    if (pct >= 0.4) return t(translations.gamesPage.goodScore);
    return t(translations.gamesPage.keepLearning);
  };

  /* ─── Shared card style ─── */
  const cardStyle = {
    background: "rgba(18,29,49,0.9)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(201,162,39,0.15)",
  };

  const goldBtnStyle = {
    background: "linear-gradient(135deg, #C9A227, #D2B94F)",
    boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
  };

  return (
    <>
      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-20 top-10 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#C9A227", textShadow: "0 0 30px rgba(201,162,39,0.4)" }}
            aria-hidden="true"
          >
            क्रीडा
          </span>

          <h1
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.gamesPage.heroTitle)}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.gamesPage.heroSubtitle)}
          </p>

          <div
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ KUMBH RUN BANNER ═══════════════════ */}
      <section className="section-dark relative py-10 md:py-14">
        <div className="section-container relative z-10">
          <div>
            <Link href="/kumbhrun" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-900/80 via-yellow-800/60 to-amber-900/80 p-6 md:p-8 shadow-xl shadow-amber-900/20 transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/20">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,185,79,0.1)_0%,transparent_70%)] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-400/15 transition-all duration-500" />
                <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-yellow-500/10 blur-3xl group-hover:bg-yellow-400/15 transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:gap-6">
                  {/* Icon */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Gamepad2 className="h-8 w-8 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-amber-100 tracking-wide group-hover:text-amber-50 transition-colors duration-300">
                      {tq(translations.kumbhRunPage.title)}
                    </h3>
                    <p className="mt-1 text-sm md:text-base text-amber-200/60">
                      {tq({ en: "Dodge obstacles and collect blessings in this endless runner!", hi: "इस एंडलेस रनर में बाधाओं से बचें और आशीर्वाद इकट्ठा करें!", mr: "या एंडलेस रनरमध्ये अडथळे टाळा आणि आशीर्वाद गोळा करा!" })}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 group-hover:shadow-xl group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                      {tq({ en: "Play Now", hi: "अभी खेलें", mr: "आता खेळा" })}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DAILY KUMBH CHALLENGE ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }}
        />
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Calendar className="h-6 w-6" style={{ color: "#C9A227" }} />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A227]">
                {t(translations.gamesPage.dailyDay)} #{dayNumber}
              </span>
              {dailyStreak > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                  <Flame className="h-3.5 w-3.5" />
                  {dailyStreak} {t(translations.gamesPage.dailyStreak)}
                </span>
              )}
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">
                {t(translations.gamesPage.dailyTitle)}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.dailySubtitle)}
            </p>
          </div>

          {/* Daily Challenge Card */}
          <div
            className="mx-auto max-w-2xl overflow-hidden rounded-2xl"
            style={cardStyle}
          >
            <div className="p-6 md:p-10">
              {/* Already played today */}
              {dailyAlreadyPlayed && !dailyStarted && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 100%)",
                      border: "2px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-cream-100">
                    {t(translations.gamesPage.dailyCompleted)}
                  </h3>

                  {/* Emoji result grid */}
                  <div className="mb-4 flex items-center justify-center gap-2">
                    {dailySavedResults.map((r, i) => (
                      <div
                        key={i}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${
                          r
                            ? "bg-green-500/20 border border-green-500/40 text-green-400"
                            : "bg-red-500/20 border border-red-500/40 text-red-400"
                        }`}
                      >
                        {r ? "🟢" : "🔴"}
                      </div>
                    ))}
                  </div>

                  <p className="mb-2 font-heading text-4xl font-bold" style={{ color: "#C9A227" }}>
                    {dailyScore}<span className="text-xl text-cream-300/40"> / 5</span>
                  </p>
                  <p className="mb-6 text-sm text-cream-300/50">
                    {getResultMessage(dailyScore, 5)}
                  </p>

                  {/* Share + Timer */}
                  <div className="flex flex-col items-center gap-4">
                    <button
                      onClick={handleDailyShare}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={goldBtnStyle}
                    >
                      {dailyCopied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyCopied)}
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyShare)}
                        </>
                      )}
                    </button>
                    <div className="flex items-center gap-2 text-sm text-cream-300/40">
                      <Clock className="h-4 w-4" />
                      {t(translations.gamesPage.dailyNextIn)} {hoursLeft} {t(translations.gamesPage.dailyHours)}
                    </div>
                  </div>
                </div>
              )}

              {/* Start screen */}
              {!dailyAlreadyPlayed && !dailyStarted && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "1px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Calendar className="h-10 w-10" style={{ color: "#C9A227" }} />
                  </div>
                  <p className="mb-2 text-lg font-semibold text-cream-100">
                    {t(translations.gamesPage.dailyDay)} #{dayNumber}
                  </p>
                  <p className="mb-8 text-cream-300/60">
                    {t(translations.gamesPage.dailySubtitle)}
                  </p>
                  <button
                    onClick={() => setDailyStarted(true)}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
                    style={goldBtnStyle}
                  >
                    <Sparkles className="h-4 w-4" />
                    {t(translations.gamesPage.dailyPlay)}
                  </button>
                </div>
              )}

              {/* Question screen */}
              {dailyStarted && !dailyDone && (
                <div>
                  {/* Progress dots */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                          i < dailyQ
                            ? dailyResults[i]
                              ? "bg-green-500"
                              : "bg-red-500"
                            : i === dailyQ
                              ? "bg-[#C9A227]"
                              : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-cream-300/40">
                    {dailyQ + 1} / 5
                  </div>

                  <h3 className="mb-6 text-center text-xl font-bold text-cream-100 md:text-2xl">
                    {tq(dailyQuestions[dailyQ].question)}
                  </h3>

                  <div className="space-y-3">
                    {dailyQuestions[dailyQ].options.map((option, idx) => {
                      const isSelected = dailySelected === idx;
                      const isCorrect = idx === dailyQuestions[dailyQ].correctIndex;
                      const showCorrect = dailyAnswered && isCorrect;
                      const showWrong = dailyAnswered && isSelected && !isCorrect;

                      let borderColor = "rgba(201,162,39,0.12)";
                      let bgColor = "rgba(18,29,49,0.6)";
                      if (showCorrect) {
                        borderColor = "rgba(34,197,94,0.6)";
                        bgColor = "rgba(34,197,94,0.1)";
                      } else if (showWrong) {
                        borderColor = "rgba(239,68,68,0.6)";
                        bgColor = "rgba(239,68,68,0.1)";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleDailyOption(idx)}
                          className="flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left transition-all duration-300"
                          style={{ border: `1px solid ${borderColor}`, background: bgColor }}
                        >
                          <span className="flex-1 text-cream-100">{tq(option)}</span>
                          {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                          {showWrong && <XCircle className="h-5 w-5 text-red-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {dailyAnswered && (
                    <div className="mt-6 flex items-center justify-between">
                      <span className={`text-sm font-medium ${dailySelected === dailyQuestions[dailyQ].correctIndex ? "text-green-400" : "text-red-400"}`}>
                        {dailySelected === dailyQuestions[dailyQ].correctIndex
                          ? t(translations.gamesPage.correct)
                          : t(translations.gamesPage.incorrect)}
                      </span>
                      <button
                        onClick={handleDailyNext}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: "linear-gradient(135deg, #C9A227, #D2B94F)" }}
                      >
                        {dailyQ < 4 ? t(translations.gamesPage.nextQuestion) : t(translations.gamesPage.seeResults)}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Results screen */}
              {dailyDone && dailyStarted && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "2px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Trophy className="h-12 w-12" style={{ color: "#D2B94F" }} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-cream-100">
                    {t(translations.gamesPage.dailyCompleted)}
                  </h3>

                  {/* Emoji result grid */}
                  <div className="mb-4 flex items-center justify-center gap-2">
                    {dailyResults.map((r, i) => (
                      <div
                        key={i}
                        className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold ${
                          r
                            ? "bg-green-500/20 border border-green-500/40"
                            : "bg-red-500/20 border border-red-500/40"
                        }`}
                      >
                        {r ? "🟢" : "🔴"}
                      </div>
                    ))}
                  </div>

                  <p className="mb-2 font-heading text-5xl font-bold" style={{ color: "#C9A227" }}>
                    {dailyScore}<span className="text-2xl text-cream-300/40"> / 5</span>
                  </p>
                  <p className="mb-8 text-sm text-cream-300/50">
                    {getResultMessage(dailyScore, 5)}
                  </p>

                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                      onClick={handleDailyShare}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={goldBtnStyle}
                    >
                      {dailyCopied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyCopied)}
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyShare)}
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-cream-300/40">
                    <Clock className="h-4 w-4" />
                    {t(translations.gamesPage.dailyNextIn)} {hoursLeft} {t(translations.gamesPage.dailyHours)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span className="mx-4 font-devanagari text-2xl" style={{ color: "#C9A227", textShadow: "0 0 20px rgba(201,162,39,0.3)" }} aria-hidden="true">ॐ</span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ WORD SCRAMBLE ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Shuffle className="h-6 w-6" style={{ color: "#C9A227" }} />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A227]">
                {t(translations.gamesPage.scrambleTitle)}
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">{t(translations.gamesPage.scrambleTitle)}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.scrambleSubtitle)}
            </p>
          </div>

          <div
            className="mx-auto max-w-2xl overflow-hidden rounded-2xl"
            style={cardStyle}
          >
            <div className="p-6 md:p-10">
              {/* Start */}
              {!scrambleStarted && !scrambleDone && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "1px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Shuffle className="h-10 w-10" style={{ color: "#C9A227" }} />
                  </div>
                  <p className="mb-8 text-cream-300/60">
                    {t(translations.gamesPage.scrambleSubtitle)}
                  </p>
                  <button
                    onClick={() => setScrambleStarted(true)}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={goldBtnStyle}
                  >
                    <Sparkles className="h-4 w-4" />
                    {t(translations.gamesPage.scramblePlay)}
                  </button>
                </div>
              )}

              {/* Playing */}
              {scrambleStarted && !scrambleDone && (
                <div>
                  <div className="mb-6 flex items-center justify-between text-sm text-cream-300/40">
                    <span>{scrambleIndex + 1} / 5</span>
                    <span>{t(translations.gamesPage.yourScore)}: {scrambleScore}</span>
                  </div>

                  {/* Scrambled letters display */}
                  <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                    {scrambledLetters.split("").map((letter, i) => (
                      <div
                        key={i}
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold uppercase text-cream-100"
                        style={{
                          background: "rgba(201,162,39,0.1)",
                          border: "1px solid rgba(201,162,39,0.25)",
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>

                  {/* Hint */}
                  {scrambleShowHint && (
                    <p className="mb-4 text-center text-sm text-amber-400/80">
                      <Lightbulb className="mr-1 inline h-4 w-4" />
                      {tq(scrambleWords[scrambleIndex].hint)}
                    </p>
                  )}

                  {/* Input */}
                  {scrambleCorrect === null && (
                    <div className="mb-4 flex gap-2">
                      <input
                        type="text"
                        value={scrambleInput}
                        onChange={(e) => setScrambleInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleScrambleSubmit()}
                        placeholder={t(translations.gamesPage.scrambleTypeAnswer)}
                        className="flex-1 rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30"
                        style={{ borderColor: "rgba(201,162,39,0.15)" }}
                        autoFocus
                      />
                      <button
                        onClick={handleScrambleSubmit}
                        className="rounded-xl px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: "linear-gradient(135deg, #C9A227, #D2B94F)" }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  {/* Correct/Wrong feedback */}
                  {scrambleCorrect !== null && (
                    <div className="mb-4 text-center">
                      <p className={`mb-1 text-lg font-bold ${scrambleCorrect ? "text-green-400" : "text-red-400"}`}>
                        {scrambleCorrect ? t(translations.gamesPage.scrambleCorrect) : t(translations.gamesPage.incorrect)}
                      </p>
                      {!scrambleCorrect && (
                        <p className="text-sm text-cream-300/50">
                          {t(translations.gamesPage.dailyCorrectAnswer)}: <span className="font-semibold text-cream-100">{scrambleAnswer}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center justify-between">
                    {scrambleCorrect === null ? (
                      <>
                        <button
                          onClick={() => setScrambleShowHint(true)}
                          className="inline-flex items-center gap-1 text-sm text-amber-400/60 hover:text-amber-400 transition-colors"
                          disabled={scrambleShowHint}
                        >
                          <Lightbulb className="h-4 w-4" />
                          {t(translations.gamesPage.scrambleHint)}
                        </button>
                        <button
                          onClick={handleScrambleSkip}
                          className="text-sm text-cream-300/40 hover:text-cream-300/70 transition-colors"
                        >
                          {t(translations.gamesPage.scrambleSkip)} →
                        </button>
                      </>
                    ) : (
                      <div className="flex w-full justify-end">
                        <button
                          onClick={handleScrambleNext}
                          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.03] active:scale-[0.97]"
                          style={{ background: "linear-gradient(135deg, #C9A227, #D2B94F)" }}
                        >
                          {scrambleIndex < 4 ? t(translations.gamesPage.scrambleNextWord) : t(translations.gamesPage.seeResults)}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Scramble Results */}
              {scrambleDone && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "2px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Sparkles className="h-12 w-12" style={{ color: "#D2B94F" }} />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-cream-100">
                    {t(translations.gamesPage.scrambleComplete)}
                  </h3>
                  <p className="mb-2 font-heading text-5xl font-bold" style={{ color: "#C9A227" }}>
                    {scrambleScore}<span className="text-2xl text-cream-300/40"> / 5</span>
                  </p>
                  {/* Star display */}
                  <p className="mb-2 text-2xl">
                    {"⭐".repeat(scrambleScore)}{"☆".repeat(5 - scrambleScore)}
                  </p>
                  <p className="mb-8 text-sm text-cream-300/50">
                    {getResultMessage(scrambleScore, 5)}
                  </p>

                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={handleScrambleShare}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.03] active:scale-[0.97]"
                      style={goldBtnStyle}
                    >
                      {scrambleCopied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyCopied)}
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          {t(translations.gamesPage.dailyShare)}
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleScrambleRestart}
                      className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-cream-100 transition-all hover:bg-white/5"
                      style={{ borderColor: "rgba(201,162,39,0.3)" }}
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t(translations.gamesPage.tryAgain)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span className="mx-4 font-devanagari text-2xl" style={{ color: "#C9A227", textShadow: "0 0 20px rgba(201,162,39,0.3)" }} aria-hidden="true">ॐ</span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ SPIRITUAL QUIZ ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)" }}
        />
        <div className="section-container relative z-10">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" style={{ color: "#C9A227" }} />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A227]">Quiz</span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">{t(translations.gamesPage.quizTitle)}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.quizSubtitle)}
            </p>
          </div>

          <div
            className="mx-auto max-w-2xl overflow-hidden rounded-2xl"
            style={cardStyle}
          >
            <div className="p-6 md:p-10">
              {/* Start Screen */}
              {!quizStarted && !showResult && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "1px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Sparkles className="h-10 w-10" style={{ color: "#C9A227" }} />
                  </div>
                  <p className="mb-8 text-cream-300/60">{t(translations.gamesPage.quizSubtitle)}</p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="group relative inline-flex items-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
                    style={goldBtnStyle}
                  >
                    {t(translations.gamesPage.startQuiz)}
                  </button>
                </div>
              )}

              {/* Question Screen */}
              {quizStarted && !showResult && (
                <div>
                  <div className="mb-6 flex items-center justify-between text-sm text-cream-300/40">
                    <span>{currentQ + 1} / {quizQuestions.length}</span>
                    <span>{t(translations.gamesPage.yourScore)}: {score}</span>
                  </div>
                  <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #C9A227, #D2B94F)",
                        width: `${((currentQ + 1) / quizQuestions.length) * 100}%`,
                        transition: "width 0.5s",
                      }}
                    />
                  </div>

                  <h3 className="mb-6 text-xl font-bold text-cream-100 md:text-2xl">
                    {tq(quizQuestions[currentQ].question)}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQ].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === quizQuestions[currentQ].correctIndex;
                      const showCorrect = answered && isCorrect;
                      const showWrong = answered && isSelected && !isCorrect;

                      let borderColor = "rgba(201,162,39,0.12)";
                      let bgColor = "rgba(18,29,49,0.6)";
                      if (showCorrect) {
                        borderColor = "rgba(34,197,94,0.6)";
                        bgColor = "rgba(34,197,94,0.1)";
                      } else if (showWrong) {
                        borderColor = "rgba(239,68,68,0.6)";
                        bgColor = "rgba(239,68,68,0.1)";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(idx)}
                          className="flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left transition-all duration-300"
                          style={{ border: `1px solid ${borderColor}`, background: bgColor }}
                        >
                          <span className="flex-1 text-cream-100">{tq(option)}</span>
                          {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                          {showWrong && <XCircle className="h-5 w-5 text-red-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <div className="mt-6 flex items-center justify-between">
                      <span className={`text-sm font-medium ${selectedOption === quizQuestions[currentQ].correctIndex ? "text-green-400" : "text-red-400"}`}>
                        {selectedOption === quizQuestions[currentQ].correctIndex
                          ? t(translations.gamesPage.correct)
                          : t(translations.gamesPage.incorrect)}
                      </span>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: "linear-gradient(135deg, #C9A227, #D2B94F)" }}
                      >
                        {currentQ < quizQuestions.length - 1 ? t(translations.gamesPage.nextQuestion) : t(translations.gamesPage.seeResults)}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Results Screen */}
              {showResult && (
                <div className="text-center">
                  <div
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "2px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <Trophy className="h-12 w-12" style={{ color: "#D2B94F" }} />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-cream-100">{t(translations.gamesPage.yourScore)}</h3>

                  {/* Emoji result grid */}
                  <div className="mb-4 flex items-center justify-center gap-2">
                    {quizResults.map((r, i) => (
                      <div
                        key={i}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${
                          r
                            ? "bg-green-500/20 border border-green-500/40"
                            : "bg-red-500/20 border border-red-500/40"
                        }`}
                      >
                        {r ? "🟢" : "🔴"}
                      </div>
                    ))}
                  </div>

                  <p className="mb-2 font-heading text-6xl font-bold" style={{ color: "#C9A227" }}>
                    {score}<span className="text-2xl text-cream-300/40"> / {quizQuestions.length}</span>
                  </p>
                  <p className="mb-8 text-sm text-cream-300/50">
                    {getResultMessage(score, quizQuestions.length)}
                  </p>

                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={handleQuizShare}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                      style={goldBtnStyle}
                    >
                      <Share2 className="h-4 w-4" />
                      {t(translations.gamesPage.dailyShare)}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-cream-100 transition-all hover:bg-white/5"
                      style={{ borderColor: "rgba(201,162,39,0.3)" }}
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t(translations.gamesPage.tryAgain)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span className="mx-4 font-devanagari text-2xl" style={{ color: "#C9A227", textShadow: "0 0 20px rgba(201,162,39,0.3)" }} aria-hidden="true">ॐ</span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ FEATURED ACTIVITIES ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div className="mb-16 text-center">
            <span className="om-decoration mb-4 inline-block" aria-hidden="true">ॐ</span>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              <span className="gradient-text">{t(translations.gamesPage.featuredTitle)}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
              {t(translations.gamesPage.featuredSubtitle)}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(18,29,49,0.85)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(201,162,39,0.12)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 60%)" }}
                />
                <div className="relative p-6 md:p-8">
                  <div
                    className="mb-5 inline-flex items-center justify-center rounded-xl p-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.05) 100%)",
                      border: "1px solid rgba(201,162,39,0.2)",
                    }}
                  >
                    <span style={{ color: "#C9A227" }}>{activity.icon}</span>
                  </div>
                  <span className={`mb-4 inline-flex items-center rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium ${activity.badgeColor}`}>
                    {t(activity.badgeKey)}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-cream-100 md:text-xl">{t(activity.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-cream-300/60 md:text-base">{t(activity.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SACRED DIVIDER ═══════════════════ */}
      <div className="section-dark flex items-center justify-center py-4">
        <div className="gold-line w-24" />
        <span className="mx-4 font-devanagari text-2xl" style={{ color: "#C9A227", textShadow: "0 0 20px rgba(201,162,39,0.3)" }} aria-hidden="true">ॐ</span>
        <div className="gold-line w-24" />
      </div>

      {/* ═══════════════════ HOST YOUR OWN ACTIVITY ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <span className="om-decoration mb-4 inline-block" aria-hidden="true">ॐ</span>
              <h2 className="font-heading text-3xl font-bold md:text-5xl">
                <span className="gradient-text">{t(translations.gamesPage.hostTitle)}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-cream-300/60">
                {t(translations.gamesPage.hostSubtitle)}
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="overflow-hidden rounded-2xl"
              style={cardStyle}
            >
              <div className="space-y-6 p-6 md:p-10">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-cream-300/70">
                    {t(translations.gamesPage.formName)}
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30"
                    style={{ borderColor: "rgba(201,162,39,0.15)" }}
                  />
                </div>
                <div>
                  <label htmlFor="organizer" className="mb-2 block text-sm font-medium text-cream-300/70">
                    {t(translations.gamesPage.formOrganizer)}
                  </label>
                  <input
                    id="organizer" name="organizer" type="text" required
                    value={formData.organizer} onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30"
                    style={{ borderColor: "rgba(201,162,39,0.15)" }}
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="mb-2 block text-sm font-medium text-cream-300/70">
                    {t(translations.gamesPage.formContact)}
                  </label>
                  <input
                    id="contact" name="contact" type="text" required
                    value={formData.contact} onChange={handleFormChange}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30"
                    style={{ borderColor: "rgba(201,162,39,0.15)" }}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-cream-300/70">
                    {t(translations.gamesPage.formDescription)}
                  </label>
                  <textarea
                    id="description" name="description" required rows={4}
                    value={formData.description} onChange={handleFormChange}
                    className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-cream-100 placeholder-cream-300/30 outline-none transition-all duration-300 focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30"
                    style={{ borderColor: "rgba(201,162,39,0.15)" }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0B1220] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]"
                    style={goldBtnStyle}
                  >
                    <Send className="h-4 w-4" />
                    {t(translations.gamesPage.formSubmit)}
                  </button>
                  {formSubmitted && (
                    <span className="flex items-center gap-2 text-sm font-medium text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      {t(translations.gamesPage.formSuccess)}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

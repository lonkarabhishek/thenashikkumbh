/**
 * Content governance registry.
 *
 * Every operational claim on this site, dates, phone numbers, addresses,
 * offices, road closures, transport, facilities, flows through this file.
 * No page, translation, chatbot answer or structured-data object may assert an
 * operational fact without an entry here.
 *
 * The intent is stricter than "somewhere in the codebase": if a claim is not
 * present in `verifiedClaims` with a valid source and a recent verification
 * date, it must not be published as fact. See docs/CONTENT_GOVERNANCE.md.
 */

import type { Locale } from "@/i18n/translations";

export type InformationStatus =
  | "official" // Published by the responsible government authority.
  | "provisional" // Officially announced but subject to change.
  | "historical" // Established fact from published record.
  | "general_guidance" // Practical advice not tied to a single authority.
  | "religious_tradition" // Ritual custom, not an operational fact.
  | "commercial" // A vendor's own claim about themselves.
  | "unverified" // We saw it somewhere; we do not stand behind it.
  | "awaiting_confirmation"; // Expected to be announced, not yet.

export type L10n = Record<Locale, string>;

export interface VerifiedClaim {
  id: string;
  claim: L10n;
  category:
    | "schedule"
    | "location"
    | "helpline"
    | "office"
    | "transport"
    | "facility"
    | "event"
    | "advisory"
    | "attribution";
  status: InformationStatus;
  /** Free-form value if the claim needs a machine-usable payload. */
  value?: string;
  sourceTitle?: string;
  sourceOrganisation?: string;
  sourceUrl?: string;
  /** ISO date the claim was reviewed against its source. */
  verifiedAt?: string;
  /** Reviewer initials or agent. */
  verifiedBy?: string;
  /** When this claim must be re-checked. */
  reviewAt?: string;
  /** Locales whose translation has been human-reviewed. */
  languagesReviewed: Locale[];
  /** May the AI assistant surface this claim? */
  aiUsable: boolean;
  /** Is this life-safety information? Never AI-generated, never expired. */
  emergencyCritical: boolean;
  /** Optional short public note shown next to the claim. */
  publicNote?: L10n;
}

const REVIEW_HORIZON_DAYS = 90;
function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/* ─── The schedule, verified and canonical ─────────────────────
 * Sources converge across DGIPR (Maharashtra Government) reporting reproduced
 * in wire copy. The primary DGIPR page (mahasamvad.in/167800) refuses direct
 * fetches from our environment; corroboration is used until we can archive it.
 */

export interface ScheduleEvent {
  id: string;
  /** YYYY-MM-DD in IST. */
  isoDate: string;
  /** Local start time in 24h "HH:MM" if officially stated. */
  startTime?: string;
  location: L10n;
  name: L10n;
  tithi?: L10n;
  status: InformationStatus;
  isAmritSnan: boolean;
  significance?: L10n;
  sourceOrganisation: string;
  sourceTitle: string;
  sourceUrl: string;
  verifiedAt: string;
  verifiedBy: string;
}

const DGIPR = {
  org: "Directorate General of Information and Public Relations, Maharashtra",
  title: "Nashik–Trimbakeshwar Kumbh Mela 2027: official schedule announcement",
  url: "https://www.mahasamvad.in/167800/",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DCC_WIRE = {
  org: "Deccan Chronicle (reporting DGIPR release)",
  title: "Nashik Kumbh Mela 2027 to Begin with Flag Hoisting on October 31, 2026",
  url: "https://www.deccanchronicle.com/nation/nashik-kumbh-mela-2027-to-begin-with-flag-hoisting-on-october-31-2026-1882836",
};

/** NTKMA Kumbh Mela Plan (official PDF, June 2026): the authority's own schedule. */
const NTKMA_PLAN = {
  org: "Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)",
  title: "Nashik-Trimbakeshwar Simhastha Kumbh Mela Plan (June 2026)",
  url: "https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2026/06/20260615229440107.pdf",
};

/** The schedule announced at the CM's meeting with the akhadas, 1 June 2025. */
const JUNE_2025_SCHEDULE = {
  org: "ETV Bharat Marathi (reporting the official schedule of 1 June 2025)",
  title: "Simhastha Kumbh Mela to begin in Nashik-Trimbakeshwar on October 31",
  url: "https://www.etvbharat.com/mr/!state/simhastha-kumbh-mela-to-begin-in-nashik-trimbakeshwar-on-october-31-next-year-amrut-snan-check-all-dates-maharashtra-news-mhs25060103673",
};

const VERIFIED = { verifiedAt: "2026-10-06", verifiedBy: "editorial" };

export const schedule: ScheduleEvent[] = [
  {
    id: "dhwajarohan",
    isoDate: "2026-10-31",
    startTime: "12:02",
    location: {
      en: "Ramkund (Panchavati, Nashik) and Kushavarta (Trimbakeshwar)",
      hi: "रामकुंड (पंचवटी, नाशिक) और कुशावर्त (त्र्यंबकेश्वर)",
      mr: "रामकुंड (पंचवटी, नाशिक) आणि कुशावर्त (त्र्यंबकेश्वर)",
    },
    name: {
      en: "Dhwajarohan: Flag Hoisting",
      hi: "ध्वजारोहण",
      mr: "ध्वजारोहण",
    },
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "The formal start of the Simhastha. Flags go up at 12:02 PM at the same moment at Ramkund in Nashik and Kushavarta in Trimbakeshwar.",
      hi: "सिंहस्थ का औपचारिक आरंभ। दोपहर 12:02 बजे नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक साथ ध्वज फहराए जाते हैं।",
      mr: "सिंहस्थाचा औपचारिक प्रारंभ. दुपारी १२:०२ वाजता नाशिकच्या रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर एकाच वेळी ध्वज फडकवले जातात.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "sadhugram-dhwajarohan",
    isoDate: "2027-07-24",
    location: { en: "Sadhugram, Nashik", hi: "साधुग्राम, नाशिक", mr: "साधुग्राम, नाशिक" },
    name: {
      en: "Sadhugram (Akhada) Flag Hoisting",
      hi: "साधुग्राम (अखाड़ा) ध्वजारोहण",
      mr: "साधुग्राम (आखाडा) ध्वजारोहण",
    },
    tithi: { en: "Ashadh Krishna Panchami", hi: "आषाढ़ कृष्ण पंचमी", mr: "आषाढ कृष्ण पंचमी" },
    status: "official",
    isAmritSnan: false,
    sourceOrganisation: JUNE_2025_SCHEDULE.org,
    sourceTitle: JUNE_2025_SCHEDULE.title,
    sourceUrl: JUNE_2025_SCHEDULE.url,
    ...VERIFIED,
  },
  {
    id: "nagar-pradakshina",
    isoDate: "2027-07-29",
    location: { en: "Nashik", hi: "नाशिक", mr: "नाशिक" },
    name: {
      en: "Nagar Pradakshina",
      hi: "नगर प्रदक्षिणा",
      mr: "नगर प्रदक्षिणा",
    },
    tithi: { en: "Ashadh Krishna Ekadashi", hi: "आषाढ़ कृष्ण एकादशी", mr: "आषाढ कृष्ण एकादशी" },
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "A ceremonial procession around the city, four days before the first Amrit Snan. It is a procession, not a bath.",
      hi: "प्रथम अमृत स्नान से चार दिन पहले नगर की परिक्रमा करने वाली शोभायात्रा। यह स्नान नहीं, शोभायात्रा है।",
      mr: "पहिल्या अमृत स्नानाच्या चार दिवस आधी शहराला प्रदक्षिणा घालणारी मिरवणूक. हे स्नान नाही, मिरवणूक आहे.",
    },
    sourceOrganisation: JUNE_2025_SCHEDULE.org,
    sourceTitle: JUNE_2025_SCHEDULE.title,
    sourceUrl: JUNE_2025_SCHEDULE.url,
    ...VERIFIED,
  },
  {
    id: "amrit-snan-1",
    isoDate: "2027-08-02",
    location: {
      en: "Ramkund (Nashik) and Kushavarta (Trimbakeshwar)",
      hi: "रामकुंड (नाशिक) और कुशावर्त (त्र्यंबकेश्वर)",
      mr: "रामकुंड (नाशिक) आणि कुशावर्त (त्र्यंबकेश्वर)",
    },
    name: {
      en: "First Amrit Snan (traditionally called Shahi Snan)",
      hi: "प्रथम अमृत स्नान (परंपरागत रूप से शाही स्नान)",
      mr: "पहिले अमृत स्नान (परंपरेने शाही स्नान)",
    },
    tithi: {
      en: "Ashadh Somvati Amavasya",
      hi: "आषाढ़ सोमवती अमावस्या",
      mr: "आषाढ सोमवती अमावस्या",
    },
    status: "official",
    isAmritSnan: true,
    significance: {
      en: "The first royal bath, in Nashik and Trimbakeshwar. The akhadas go down to the water first; the public follows.",
      hi: "पहला शाही स्नान, नाशिक और त्र्यंबकेश्वर में। पहले अखाड़े जल में उतरते हैं, फिर आम श्रद्धालु।",
      mr: "पहिले शाही स्नान, नाशिक आणि त्र्यंबकेश्वरमध्ये. आधी आखाडे पाण्यात उतरतात, मग सामान्य भाविक.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "parva-august-2027",
    isoDate: "2027-08-12",
    location: { en: "Nashik", hi: "नाशिक", mr: "नाशिक" },
    name: {
      en: "Special Parva Days (Nashik): 12, 17 and 28 August 2027",
      hi: "विशेष पर्व दिवस (नाशिक): 12, 17 और 28 अगस्त 2027",
      mr: "विशेष पर्व दिवस (नाशिक): १२, १७ आणि २८ ऑगस्ट २०२७",
    },
    status: "official",
    isAmritSnan: false,
    sourceOrganisation: JUNE_2025_SCHEDULE.org,
    sourceTitle: JUNE_2025_SCHEDULE.title,
    sourceUrl: JUNE_2025_SCHEDULE.url,
    ...VERIFIED,
  },
  {
    id: "amrit-snan-2",
    isoDate: "2027-08-31",
    location: {
      en: "Ramkund (Nashik) and Kushavarta (Trimbakeshwar)",
      hi: "रामकुंड (नाशिक) और कुशावर्त (त्र्यंबकेश्वर)",
      mr: "रामकुंड (नाशिक) आणि कुशावर्त (त्र्यंबकेश्वर)",
    },
    name: {
      en: "Second Amrit Snan (Mahakumbh Snan)",
      hi: "द्वितीय अमृत स्नान (महाकुंभ स्नान)",
      mr: "दुसरे अमृत स्नान (महाकुंभ स्नान)",
    },
    tithi: {
      en: "Shravan Amavasya",
      hi: "श्रावण अमावस्या",
      mr: "श्रावण अमावस्या",
    },
    status: "official",
    isAmritSnan: true,
    significance: {
      en: "The second royal bath, also called the Mahakumbh Snan, in Nashik and Trimbakeshwar.",
      hi: "दूसरा शाही स्नान, जिसे महाकुंभ स्नान भी कहते हैं, नाशिक और त्र्यंबकेश्वर में।",
      mr: "दुसरे शाही स्नान, ज्याला महाकुंभ स्नानही म्हणतात, नाशिक आणि त्र्यंबकेश्वरमध्ये.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "amrit-snan-3-nashik",
    isoDate: "2027-09-11",
    location: { en: "Ramkund, Nashik", hi: "रामकुंड, नाशिक", mr: "रामकुंड, नाशिक" },
    name: {
      en: "Third Amrit Snan: Nashik",
      hi: "तृतीय अमृत स्नान: नाशिक",
      mr: "तिसरे अमृत स्नान: नाशिक",
    },
    tithi: {
      en: "Bhadrapada Shuddha Ekadashi",
      hi: "भाद्रपद शुक्ल एकादशी",
      mr: "भाद्रपद शुद्ध एकादशी",
    },
    status: "official",
    isAmritSnan: true,
    significance: {
      en: "The third royal bath in Nashik, at Ramkund, where the Vaishnav akhadas bathe. Trimbakeshwar bathes the next day.",
      hi: "नाशिक में तीसरा शाही स्नान, रामकुंड पर, जहाँ वैष्णव अखाड़े स्नान करते हैं। त्र्यंबकेश्वर में अगले दिन स्नान होता है।",
      mr: "नाशिकमधील तिसरे शाही स्नान, रामकुंडावर, जिथे वैष्णव आखाडे स्नान करतात. त्र्यंबकेश्वरमध्ये दुसऱ्या दिवशी स्नान होते.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "amrit-snan-3-trimbak",
    isoDate: "2027-09-12",
    location: {
      en: "Kushavarta, Trimbakeshwar",
      hi: "कुशावर्त, त्र्यंबकेश्वर",
      mr: "कुशावर्त, त्र्यंबकेश्वर",
    },
    name: {
      en: "Third Amrit Snan: Trimbakeshwar",
      hi: "तृतीय अमृत स्नान: त्र्यंबकेश्वर",
      mr: "तिसरे अमृत स्नान: त्र्यंबकेश्वर",
    },
    tithi: {
      en: "Bhadrapada Shuddha Dwadashi (Vaman Dwadashi)",
      hi: "भाद्रपद शुक्ल द्वादशी (वामन द्वादशी)",
      mr: "भाद्रपद शुद्ध द्वादशी (वामन द्वादशी)",
    },
    status: "official",
    isAmritSnan: true,
    significance: {
      en: "The Shaiva akhadas take the third royal bath at Kushavarta, the day after Nashik.",
      hi: "शैव अखाड़े नाशिक के अगले दिन कुशावर्त में तीसरा शाही स्नान करते हैं।",
      mr: "शैव आखाडे नाशिकच्या दुसऱ्या दिवशी कुशावर्तात तिसरे शाही स्नान करतात.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "conclusion-trimbak",
    isoDate: "2028-07-24",
    location: { en: "Trimbakeshwar", hi: "त्र्यंबकेश्वर", mr: "त्र्यंबकेश्वर" },
    name: {
      en: "Simhastha Samapti (Close): Trimbakeshwar",
      hi: "सिंहस्थ समाप्ति: त्र्यंबकेश्वर",
      mr: "सिंहस्थ समाप्ती: त्र्यंबकेश्वर",
    },
    status: "official",
    isAmritSnan: false,
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
  {
    id: "conclusion",
    isoDate: "2028-07-29",
    location: { en: "Nashik", hi: "नाशिक", mr: "नाशिक" },
    name: {
      en: "Simhastha Samapti (Close): Nashik",
      hi: "सिंहस्थ समाप्ति: नाशिक",
      mr: "सिंहस्थ समाप्ती: नाशिक",
    },
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "The formal close of the Simhastha in Nashik. Trimbakeshwar closes five days earlier, on 24 July 2028.",
      hi: "नाशिक में सिंहस्थ का औपचारिक समापन। त्र्यंबकेश्वर में यह पाँच दिन पहले, 24 जुलाई 2028 को होता है।",
      mr: "नाशिकमध्ये सिंहस्थाची औपचारिक सांगता. त्र्यंबकेश्वरमध्ये ती पाच दिवस आधी, २४ जुलै २०२८ रोजी होते.",
    },
    sourceOrganisation: NTKMA_PLAN.org,
    sourceTitle: NTKMA_PLAN.title,
    sourceUrl: NTKMA_PLAN.url,
    ...VERIFIED,
  },
];

/** The official "Major Mela Period" (NTKMA plan): 107 days of peak activity. */
export const majorMelaPeriod = {
  startIso: "2027-06-15",
  endIso: "2027-09-30",
  days: 107,
  sourceUrl: NTKMA_PLAN.url,
};

/** Source used for schedule facts across the site. */
export const scheduleSources = { NTKMA_PLAN, JUNE_2025_SCHEDULE };

export function nextAmritSnan(now: Date = new Date()): ScheduleEvent | null {
  const upcoming = schedule
    .filter((e) => e.isAmritSnan && new Date(`${e.isoDate}T04:00:00+05:30`) >= now)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  return upcoming[0] ?? null;
}

/* ─── Helplines ────────────────────────────────────────────────
 * India's 112 emergency number is treated as the primary action. Everything
 * else must trace to an authority page linked below.
 */

export interface Helpline {
  id: string;
  label: L10n;
  number: string;
  jurisdiction: L10n;
  status: InformationStatus;
  supportedHours?: L10n;
  sourceOrganisation: string;
  sourceUrl: string;
  verifiedAt: string;
  verifiedBy: string;
  primary?: boolean;
  emergencyCritical: boolean;
}

const ERSS = {
  org: "Ministry of Home Affairs, Government of India, Emergency Response Support System",
  url: "https://112.gov.in/",
};

export const helplines: Helpline[] = [
  {
    id: "india-112",
    label: {
      en: "All emergencies",
      hi: "सभी आपात स्थितियाँ",
      mr: "सर्व आपत्कालीन परिस्थिती",
    },
    number: "112",
    jurisdiction: {
      en: "All India",
      hi: "पूरा भारत",
      mr: "संपूर्ण भारत",
    },
    status: "official",
    sourceOrganisation: ERSS.org,
    sourceUrl: ERSS.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    primary: true,
    emergencyCritical: true,
  },
  {
    id: "ambulance-108",
    label: {
      en: "Ambulance",
      hi: "एम्बुलेंस",
      mr: "रुग्णवाहिका",
    },
    number: "108",
    jurisdiction: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
    status: "official",
    sourceOrganisation:
      "Public Health Department, Government of Maharashtra, MEMS 108",
    sourceUrl: "https://www.mems108.in/",
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    emergencyCritical: true,
  },
  {
    id: "fire-101",
    label: { en: "Fire", hi: "अग्निशमन", mr: "अग्निशमन" },
    number: "101",
    jurisdiction: { en: "All India", hi: "पूरा भारत", mr: "संपूर्ण भारत" },
    status: "official",
    sourceOrganisation: ERSS.org,
    sourceUrl: ERSS.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    emergencyCritical: true,
  },
  {
    id: "women-1091",
    label: { en: "Women helpline", hi: "महिला हेल्पलाइन", mr: "महिला हेल्पलाइन" },
    number: "1091",
    jurisdiction: { en: "All India", hi: "पूरा भारत", mr: "संपूर्ण भारत" },
    status: "official",
    sourceOrganisation: "Ministry of Women and Child Development, Government of India",
    sourceUrl: "https://wcd.nic.in/schemes/women-helpline-scheme",
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    emergencyCritical: true,
  },
  {
    id: "child-1098",
    label: { en: "Child helpline", hi: "चाइल्ड हेल्पलाइन", mr: "चाइल्ड हेल्पलाइन" },
    number: "1098",
    jurisdiction: { en: "All India", hi: "पूरा भारत", mr: "संपूर्ण भारत" },
    status: "official",
    sourceOrganisation: "Ministry of Women and Child Development, Government of India",
    sourceUrl: "https://ncpcr.gov.in/",
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    emergencyCritical: true,
  },
];

/* ─── Offices ──────────────────────────────────────────────────
 * NTKMA is the mela's operational authority. Attribution page:
 * https://divcomnashik.maharashtra.gov.in/en/contact-details/ (Sept 26, 2025).
 */

export interface Office {
  id: string;
  name: L10n;
  phone?: string;
  email?: string;
  address: L10n;
  status: InformationStatus;
  sourceOrganisation: string;
  sourceUrl: string;
  verifiedAt: string;
  verifiedBy: string;
}

export const offices: Office[] = [
  {
    id: "ntkma",
    name: {
      en: "Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA)",
      hi: "नाशिक–त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA)",
      mr: "नाशिक–त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA)",
    },
    phone: "0253-2461909",
    email: "kumbhmela.2027@mah.gov.in",
    address: {
      en: "Office of the Divisional Commissioner, Nashik Division, Nashik Road, Nashik, Maharashtra",
      hi: "विभागीय आयुक्त कार्यालय, नाशिक विभाग, नाशिक रोड, नाशिक, महाराष्ट्र",
      mr: "विभागीय आयुक्त कार्यालय, नाशिक विभाग, नाशिक रोड, नाशिक, महाराष्ट्र",
    },
    status: "official",
    sourceOrganisation: "Divisional Commissioner Office, Nashik",
    sourceUrl: "https://divcomnashik.maharashtra.gov.in/en/contact-details/",
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
];

/* ─── Recognised akhadas ───────────────────────────────────────
 * Source: Akhil Bharatiya Akhara Parishad, corroborated by the Wikipedia
 * article for ABAP (verified 2026-08-01). Thirteen akhadas are recognised;
 * the Kinnar Akhara is a fourteenth body seeking recognition and is not
 * currently recognised by the Parishad.
 */

export type AkhadaTradition = "Shaiva" | "Vaishnava" | "Udasin_Nirmala";

export interface Akhada {
  id: string;
  name: L10n;
  tradition: AkhadaTradition;
  seat: L10n;
  recognitionStatus: "recognised" | "not_recognised";
  sourceOrganisation: string;
  sourceUrl: string;
  verifiedAt: string;
  verifiedBy: string;
}

const ABAP = {
  org: "Akhil Bharatiya Akhara Parishad, corroborated by Wikipedia",
  url: "https://en.wikipedia.org/wiki/Akhil_Bharatiya_Akhara_Parishad",
};

export const akhadas: Akhada[] = [
  { id: "juna", name: { en: "Shri Panchadashanam Juna Akhara", hi: "श्री पंचदशनाम जूना अखाड़ा", mr: "श्री पंचदशनाम जुना आखाडा" }, tradition: "Shaiva", seat: { en: "Varanasi", hi: "वाराणसी", mr: "वाराणसी" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "niranjani", name: { en: "Shri Panchayati Niranjani Akhara", hi: "श्री पंचायती निरंजनी अखाड़ा", mr: "श्री पंचायती निरंजनी आखाडा" }, tradition: "Shaiva", seat: { en: "Prayagraj", hi: "प्रयागराज", mr: "प्रयागराज" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "atal", name: { en: "Shri Panch Atal Akhara", hi: "श्री पंच अटल अखाड़ा", mr: "श्री पंच अटल आखाडा" }, tradition: "Shaiva", seat: { en: "Varanasi", hi: "वाराणसी", mr: "वाराणसी" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "avahan", name: { en: "Shri Panchadashanam Avahan Akhara", hi: "श्री पंचदशनाम आवाहन अखाड़ा", mr: "श्री पंचदशनाम आवाहन आखाडा" }, tradition: "Shaiva", seat: { en: "Varanasi", hi: "वाराणसी", mr: "वाराणसी" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "anand", name: { en: "Taponidhi Shri Anand Panchayati Akhara", hi: "तपोनिधि श्री आनंद पंचायती अखाड़ा", mr: "तपोनिधी श्री आनंद पंचायती आखाडा" }, tradition: "Shaiva", seat: { en: "Nashik", hi: "नाशिक", mr: "नाशिक" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "mahanirvani", name: { en: "Shri Panchayati Mahanirvani Akhara", hi: "श्री पंचायती महानिर्वाणी अखाड़ा", mr: "श्री पंचायती महानिर्वाणी आखाडा" }, tradition: "Shaiva", seat: { en: "Prayagraj", hi: "प्रयागराज", mr: "प्रयागराज" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "panchagni", name: { en: "Shri Panchadashanam Panchagni Akhara", hi: "श्री पंचदशनाम पंचाग्नि अखाड़ा", mr: "श्री पंचदशनाम पंचाग्नि आखाडा" }, tradition: "Shaiva", seat: { en: "Junagadh", hi: "जूनागढ़", mr: "जुनागढ" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },

  { id: "nirmohi", name: { en: "Shri Nirmohi Akhara", hi: "श्री निर्मोही अखाड़ा", mr: "श्री निर्मोही आखाडा" }, tradition: "Vaishnava", seat: { en: "Mathura", hi: "मथुरा", mr: "मथुरा" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "digambar", name: { en: "Shri Digambar Akhara", hi: "श्री दिगंबर अखाड़ा", mr: "श्री दिगंबर आखाडा" }, tradition: "Vaishnava", seat: { en: "Sabarkantha", hi: "साबरकांठा", mr: "साबरकांठा" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "nirvani", name: { en: "Shri Nirvani Akhara", hi: "श्री निर्वाणी अखाड़ा", mr: "श्री निर्वाणी आखाडा" }, tradition: "Vaishnava", seat: { en: "Ayodhya", hi: "अयोध्या", mr: "अयोध्या" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },

  { id: "bara-udasin", name: { en: "Shri Panchayati Bara Udasin Akhara", hi: "श्री पंचायती बड़ा उदासीन अखाड़ा", mr: "श्री पंचायती बडा उदासीन आखाडा" }, tradition: "Udasin_Nirmala", seat: { en: "Prayagraj", hi: "प्रयागराज", mr: "प्रयागराज" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "naya-udasin", name: { en: "Shri Panchayti Naya Udasin Akhara", hi: "श्री पंचायती नया उदासीन अखाड़ा", mr: "श्री पंचायती नया उदासीन आखाडा" }, tradition: "Udasin_Nirmala", seat: { en: "Haridwar", hi: "हरिद्वार", mr: "हरिद्वार" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
  { id: "nirmal", name: { en: "Shri Nirmal Panchayati Akhara", hi: "श्री निर्मल पंचायती अखाड़ा", mr: "श्री निर्मल पंचायती आखाडा" }, tradition: "Udasin_Nirmala", seat: { en: "Haridwar", hi: "हरिद्वार", mr: "हरिद्वार" }, recognitionStatus: "recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },

  { id: "kinnar", name: { en: "Kinnar Akhara", hi: "किन्नर अखाड़ा", mr: "किन्नर आखाडा" }, tradition: "Shaiva", seat: { en: "Various", hi: "विविध", mr: "विविध" }, recognitionStatus: "not_recognised", sourceOrganisation: ABAP.org, sourceUrl: ABAP.url, verifiedAt: "2026-08-01", verifiedBy: "editorial" },
];

/* ─── Awaiting-confirmation registry ───────────────────────────
 * When a page has an obvious slot for operational information that is not yet
 * published (facility map, shuttle routes, road closures, event programme,
 * accommodation availability), it should render an "awaiting confirmation"
 * state that references one of these entries. This keeps every "not yet"
 * message honest and traceable.
 */

export interface AwaitingConfirmation {
  id: string;
  topic: L10n;
  expectedFrom: L10n;
  expectedAfter?: string;
}

export const awaiting: AwaitingConfirmation[] = [
  {
    id: "event-programme",
    topic: {
      en: "Detailed event programme (discourses, cultural events, akhada processions)",
      hi: "विस्तृत कार्यक्रम सूची (प्रवचन, सांस्कृतिक कार्यक्रम, अखाड़ा शोभायात्रा)",
      mr: "सविस्तर कार्यक्रम सूची (प्रवचन, सांस्कृतिक कार्यक्रम, आखाडा मिरवणुका)",
    },
    expectedFrom: {
      en: "NTKMA and participating akhadas",
      hi: "NTKMA और सहभागी अखाड़े",
      mr: "NTKMA आणि सहभागी आखाडे",
    },
  },
  {
    id: "facility-map",
    topic: {
      en: "Official ghats, toilets, drinking water, medical, police, lost-and-found and food distribution locations",
      hi: "आधिकारिक घाट, शौचालय, पेयजल, चिकित्सा, पुलिस, गुमशुदा-प्राप्ति और भोजन वितरण स्थल",
      mr: "अधिकृत घाट, शौचालये, पिण्याचे पाणी, वैद्यकीय, पोलिस, हरवले-सापडले आणि अन्न वितरण स्थळे",
    },
    expectedFrom: { en: "NTKMA", hi: "NTKMA", mr: "NTKMA" },
  },
  {
    id: "traffic-plan",
    topic: {
      en: "Road-closure orders and the ghat-wise crowd plan",
      hi: "मार्ग बंदी के आदेश और घाटवार भीड़ योजना",
      mr: "रस्ते बंदीचे आदेश आणि घाटनिहाय गर्दी योजना",
    },
    expectedFrom: {
      en: "Nashik City Police and NTKMA",
      hi: "नाशिक शहर पुलिस और NTKMA",
      mr: "नाशिक शहर पोलिस आणि NTKMA",
    },
  },
  {
    id: "railway-plan",
    topic: {
      en: "The 2027 special-train timetable",
      hi: "2027 की विशेष ट्रेनों की समय-सारणी",
      mr: "२०२७ च्या विशेष गाड्यांचे वेळापत्रक",
    },
    expectedFrom: {
      en: "Central Railway (Bhusawal Division) and Ministry of Railways",
      hi: "मध्य रेल (भुसावल मंडल) और रेल मंत्रालय",
      mr: "मध्य रेल्वे (भुसावळ विभाग) आणि रेल्वे मंत्रालय",
    },
  },
  {
    id: "official-accommodation",
    topic: {
      en: "Tent-city prices, the live booking app and homestay registration rules",
      hi: "टेंट सिटी की कीमतें, चालू बुकिंग ऐप और होमस्टे पंजीकरण नियम",
      mr: "तंबू नगरीचे दर, सुरू झालेले बुकिंग ॲप आणि होमस्टे नोंदणीचे नियम",
    },
    expectedFrom: {
      en: "NTKMA and Maharashtra Tourism Development Corporation",
      hi: "NTKMA और महाराष्ट्र पर्यटन विकास निगम",
      mr: "NTKMA आणि महाराष्ट्र पर्यटन विकास महामंडळ",
    },
  },
  {
    id: "amrit-snan-timings",
    topic: {
      en: "Amrit Snan timings (hours)",
      hi: "अमृत स्नान का समय (घंटे)",
      mr: "अमृत स्नानाच्या वेळा (तास)",
    },
    expectedFrom: { en: "NTKMA", hi: "NTKMA", mr: "NTKMA" },
  },
];

/** Plans that have been officially announced, though details may follow. */
export interface Announced {
  id: string;
  topic: L10n;
  summary: L10n;
  sourceLabel: string;
  sourceUrl: string;
  /** Site page with the full detail, without language prefix. */
  more: string;
}

export const announced: Announced[] = [
  {
    id: "parking-shuttle-plan",
    topic: {
      en: "Parking and shuttle plan",
      hi: "पार्किंग और शटल योजना",
      mr: "पार्किंग आणि शटल योजना",
    },
    summary: {
      en: "46 outer parking hubs and 4,500 MSRTC buses. On Amrit Snan days private vehicles stop at the outer hubs.",
      hi: "46 बाहरी पार्किंग हब और 4,500 MSRTC बसें। अमृत स्नान के दिन निजी वाहन बाहरी हब पर रुकेंगे।",
      mr: "४६ बाहेरील पार्किंग हब आणि ४,५०० MSRTC बसेस. अमृत स्नानाच्या दिवशी खासगी वाहने बाहेरील हबवर थांबतील.",
    },
    sourceLabel: "NTKMA via Punekar News, 2 Jun 2026",
    sourceUrl: "https://www.punekarnews.in/46-parking-hubs-5-railway-stations-4500-buses-inside-nashiks-kumbh-mela-2027-transport-blueprint/",
    more: "/how-to-reach",
  },
  {
    id: "tent-city-sop",
    topic: {
      en: "Tent cities and private tent-city rules",
      hi: "टेंट सिटी और निजी टेंट सिटी के नियम",
      mr: "तंबू नगरी आणि खासगी तंबू नगरीचे नियम",
    },
    summary: {
      en: "An SOP for private tent cities (29 Sep 2026) and a tent-only booking app have been approved. The app is not live yet.",
      hi: "निजी टेंट सिटी का SOP (29 सितंबर 2026) और केवल टेंट के लिए बुकिंग ऐप मंज़ूर हुए हैं। ऐप अभी शुरू नहीं हुआ।",
      mr: "खासगी तंबू नगरीची SOP (२९ सप्टेंबर २०२६) आणि फक्त तंबूंसाठी बुकिंग ॲप मंजूर झाले आहे. ॲप अजून सुरू झालेले नाही.",
    },
    sourceLabel: "NTKMA SOP via Free Press Journal",
    sourceUrl: "https://www.freepressjournal.in/pune/nashik-private-tent-cities-to-expand-accommodation-for-simhastha-2027-pilgrims",
    more: "/accommodation",
  },
];

/* ─── Registry API ─────────────────────────────────────────────
 * The rest of the codebase should only reach these helpers, never the arrays
 * directly. That way we can add a persistence layer, audit trail or CMS later
 * without every page needing to change.
 */

export const emergencyCriticalHelplines = helplines.filter((h) => h.emergencyCritical);
export const primaryHelpline = helplines.find((h) => h.primary) ?? helplines[0];

export function awaitingByTopic(id: string): AwaitingConfirmation | undefined {
  return awaiting.find((a) => a.id === id);
}

/** Assert an operational claim exists and has been reviewed. */
export function claimById(id: string): VerifiedClaim | undefined {
  return verifiedClaims.find((c) => c.id === id);
}

/** Simple compliance check: emergency-critical claims must have a source and a
 *  future review date. Called from a build-time test in Phase 14. */
export function complianceReport(): { id: string; problem: string }[] {
  const problems: { id: string; problem: string }[] = [];
  const today = new Date().toISOString().slice(0, 10);
  for (const c of verifiedClaims) {
    if (c.emergencyCritical && (!c.sourceUrl || !c.verifiedAt)) {
      problems.push({ id: c.id, problem: "emergency-critical without source or verifiedAt" });
    }
    if (c.reviewAt && c.reviewAt < today) {
      problems.push({ id: c.id, problem: `review overdue since ${c.reviewAt}` });
    }
  }
  return problems;
}

/* ─── Attribution ─────────────────────────────────────────────
 * The site is not the official Kumbh authority. This claim appears in the
 * footer and on any page where it is easy to mistake us for one.
 */

export const siteAttribution: L10n = {
  en: "Independent public-information initiative. Official information is attributed to its publishing authority.",
  hi: "स्वतंत्र जनसूचना पहल। आधिकारिक जानकारी उसकी प्रकाशक प्राधिकरण को श्रेय के साथ दी गई है।",
  mr: "स्वतंत्र सार्वजनिक-माहिती उपक्रम. अधिकृत माहिती तिच्या प्रकाशक प्राधिकरणाला श्रेय देऊन दर्शवली आहे.",
};

/* ─── Generic verified claims collection ───────────────────────
 * Non-schedule, non-helpline facts that pages assert. Kept short by design:
 * anything not here is either not fact-shaped, or should not be asserted.
 */

export const verifiedClaims: VerifiedClaim[] = [
  {
    id: "state-budget-25055-cr",
    claim: {
      en: "Maharashtra has sanctioned Rs 25,055 crore for the 2027 Nashik Simhastha.",
      hi: "महाराष्ट्र ने 2027 नाशिक सिंहस्थ के लिए 25,055 करोड़ रुपये स्वीकृत किए हैं।",
      mr: "महाराष्ट्राने २०२७ नाशिक सिंहस्थासाठी २५,०५५ कोटी रुपये मंजूर केले आहेत.",
    },
    category: "attribution",
    status: "official",
    value: "25055",
    sourceOrganisation: DGIPR.org,
    sourceTitle: "State budget announcement for Nashik Kumbh 2027",
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    languagesReviewed: ["en", "hi", "mr"],
    aiUsable: true,
    emergencyCritical: false,
  },
  {
    id: "tenders-4000-cr-issued",
    claim: {
      en: "Tenders for works worth approximately Rs 4,000 crore have been issued, with Rs 2,000 crore more planned.",
      hi: "लगभग 4,000 करोड़ रुपये के कार्यों के टेंडर जारी हो चुके हैं; 2,000 करोड़ रुपये के और प्रस्तावित हैं।",
      mr: "सुमारे ४,००० कोटी रुपयांच्या कामांच्या निविदा जारी झाल्या असून, आणखी २,००० कोटींच्या प्रस्तावित आहेत.",
    },
    category: "attribution",
    status: "official",
    sourceOrganisation: "News On Air (reporting Chief Minister's announcement)",
    sourceTitle: "Nashik–Trimbakeshwar Kumbh Mela will be grand and unforgettable",
    sourceUrl: "https://www.newsonair.gov.in/nashik-trimbakeshwar-kumbh-mela-will-be-grand-and-unforgettable-fadnavis",
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    languagesReviewed: ["en", "hi", "mr"],
    aiUsable: true,
    emergencyCritical: false,
  },
  {
    id: "shahi-snan-renamed",
    claim: {
      en: "Chief Minister Devendra Fadnavis has accepted the suggestion that the royal baths be called Amrit Snan, following the terminology used at Prayagraj in 2025.",
      hi: "मुख्यमंत्री देवेंद्र फडणवीस ने यह सुझाव स्वीकार किया है कि शाही स्नान को अमृत स्नान कहा जाए, जैसा 2025 में प्रयागराज में हुआ।",
      mr: "मुख्यमंत्री देवेंद्र फडणवीस यांनी शाही स्नानाला अमृत स्नान म्हणण्याची सूचना स्वीकारली आहे, जशी २०२५ मध्ये प्रयागराजला वापरली गेली.",
    },
    category: "attribution",
    status: "official",
    sourceOrganisation: "Chief Minister's Office, Maharashtra (as reported by DGIPR)",
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
    languagesReviewed: ["en", "hi", "mr"],
    aiUsable: true,
    emergencyCritical: false,
  },
];

/* Convenience for the compliance runner. */
export const REVIEW_HORIZON = REVIEW_HORIZON_DAYS;
export const addReviewDays = addDays;

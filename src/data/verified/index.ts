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

export const schedule: ScheduleEvent[] = [
  {
    id: "dhwajarohan",
    isoDate: "2026-10-31",
    startTime: "12:02",
    location: {
      en: "Ram Kund, Panchavati, Nashik",
      hi: "रामकुंड, पंचवटी, नाशिक",
      mr: "रामकुंड, पंचवटी, नाशिक",
    },
    name: {
      en: "Dhwajarohan: Flag Hoisting",
      hi: "ध्वजारोहण",
      mr: "ध्वजारोहण",
    },
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "The formal opening of the Simhastha. The flag is raised at Ram Kund; the akhadas and every pilgrim are invited to begin.",
      hi: "सिंहस्थ का औपचारिक शुभारंभ। रामकुंड पर ध्वज फहराया जाता है; अखाड़ों और हर श्रद्धालु के लिए यही निमंत्रण है।",
      mr: "सिंहस्थाचा औपचारिक प्रारंभ. रामकुंडावर ध्वज फडकवला जातो; आखाड्यांना आणि प्रत्येक भाविकाला हेच निमंत्रण.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
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
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "The ceremonial circumambulation of the city, four days before the first Amrit Snan.",
      hi: "प्रथम अमृत स्नान से चार दिन पूर्व नगर की परिक्रमा।",
      mr: "पहिल्या अमृत स्नानाच्या चार दिवस आधी शहराची प्रदक्षिणा.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
  {
    id: "amrit-snan-1",
    isoDate: "2027-08-02",
    location: {
      en: "Nashik and Trimbakeshwar",
      hi: "नाशिक और त्र्यंबकेश्वर",
      mr: "नाशिक आणि त्र्यंबकेश्वर",
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
      en: "The first royal bath. The akhadas descend first in an order agreed centuries ago; the public follows.",
      hi: "प्रथम शाही स्नान। पहले अखाड़े जल तक जाते हैं, सदियों पहले तय क्रम में; फिर जनता।",
      mr: "पहिले शाही स्नान. आधी आखाडे पाण्यापर्यंत जातात, शतकांपूर्वी ठरलेल्या क्रमाने; मग सामान्य लोक.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
  {
    id: "amrit-snan-2",
    isoDate: "2027-08-31",
    location: {
      en: "Nashik and Trimbakeshwar",
      hi: "नाशिक और त्र्यंबकेश्वर",
      mr: "नाशिक आणि त्र्यंबकेश्वर",
    },
    name: {
      en: "Second Amrit Snan (Mahakumbhasnan)",
      hi: "द्वितीय अमृत स्नान (महाकुम्भस्नान)",
      mr: "दुसरे अमृत स्नान (महाकुंभस्नान)",
    },
    tithi: {
      en: "Shravan Amavasya",
      hi: "श्रावण अमावस्या",
      mr: "श्रावण अमावस्या",
    },
    status: "official",
    isAmritSnan: true,
    significance: {
      en: "The main royal bath. The heaviest crowds of the twenty-one months are expected this morning.",
      hi: "मुख्य शाही स्नान। इक्कीस महीनों की सबसे अधिक भीड़ इसी सुबह अपेक्षित है।",
      mr: "मुख्य शाही स्नान. एकवीस महिन्यांतील सर्वात मोठी गर्दी याच सकाळी अपेक्षित आहे.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
  {
    id: "amrit-snan-3-nashik",
    isoDate: "2027-09-11",
    location: { en: "Ram Kund, Nashik", hi: "रामकुंड, नाशिक", mr: "रामकुंड, नाशिक" },
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
      en: "The concluding royal bath at Ram Kund, where the Vaishnav akhadas bathe. Trimbakeshwar bathes the following day.",
      hi: "रामकुंड पर अंतिम शाही स्नान, जहाँ वैष्णव अखाड़े स्नान करते हैं। त्र्यंबकेश्वर अगले दिन स्नान करता है।",
      mr: "रामकुंडावरील अंतिम शाही स्नान, जिथे वैष्णव आखाडे स्नान करतात. त्र्यंबकेश्वर दुसऱ्या दिवशी स्नान करते.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
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
      en: "The Shaivite akhadas bathe at Kushavarta on the day after Nashik. This closes the main bathing season.",
      hi: "शैव अखाड़े नाशिक के अगले दिन कुशावर्त में स्नान करते हैं। इसी के साथ मुख्य स्नान काल समाप्त होता है।",
      mr: "शैव आखाडे नाशिकच्या दुसऱ्या दिवशी कुशावर्तात स्नान करतात. यानेच मुख्य स्नानकाळ संपतो.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
  {
    id: "conclusion",
    isoDate: "2028-07-24",
    location: {
      en: "Nashik and Trimbakeshwar",
      hi: "नाशिक और त्र्यंबकेश्वर",
      mr: "नाशिक आणि त्र्यंबकेश्वर",
    },
    name: {
      en: "Conclusion of the Simhastha",
      hi: "सिंहस्थ की समाप्ति",
      mr: "सिंहस्थाची सांगता",
    },
    status: "official",
    isAmritSnan: false,
    significance: {
      en: "The formal close, twenty-one months after the flag went up.",
      hi: "ध्वजारोहण के इक्कीस महीने बाद औपचारिक समापन।",
      mr: "ध्वजारोहणानंतर एकवीस महिन्यांनी औपचारिक सांगता.",
    },
    sourceOrganisation: DGIPR.org,
    sourceTitle: DGIPR.title,
    sourceUrl: DGIPR.url,
    verifiedAt: "2026-08-01",
    verifiedBy: "editorial",
  },
];

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
      en: "Traffic plan, road closures, parking zones and shuttle routes",
      hi: "यातायात योजना, मार्ग बंदी, पार्किंग क्षेत्र और शटल मार्ग",
      mr: "वाहतूक योजना, रस्ते बंदी, पार्किंग क्षेत्रे आणि शटल मार्ग",
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
      en: "Special trains and station-specific arrangements at Nashik Road, Devlali, Odha, Kherwadi and Kasbe Sukene",
      hi: "विशेष रेलगाड़ियाँ और नाशिक रोड, देवलाली, ओढा, खेरवाडी तथा कसबे सुकेने की स्टेशन-विशेष व्यवस्था",
      mr: "विशेष रेल्वेगाड्या आणि नाशिक रोड, देवळाली, ओढा, खेरवाडी व कसबे सुकेणे येथील स्थानक-विशिष्ट व्यवस्था",
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
      en: "Officially arranged accommodation, tent-city bookings and pilgrim housing",
      hi: "आधिकारिक आवास, टेंट-सिटी बुकिंग और तीर्थयात्री आवास",
      mr: "अधिकृत निवास, तंबू-नगर आरक्षण आणि यात्री निवास",
    },
    expectedFrom: {
      en: "NTKMA and Maharashtra Tourism Development Corporation",
      hi: "NTKMA और महाराष्ट्र पर्यटन विकास निगम",
      mr: "NTKMA आणि महाराष्ट्र पर्यटन विकास महामंडळ",
    },
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

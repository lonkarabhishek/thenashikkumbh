import type { Locale } from "@/i18n/translations";

type L = Record<Locale, string>;

/** Labels shared by the news list and the article page. */
export const CATEGORY_LABEL: Record<string, L> = {
  kumbh: { en: "Kumbh Mela", hi: "कुंभ मेला", mr: "कुंभमेळा" },
  infra: { en: "Infrastructure", hi: "बुनियादी ढाँचा", mr: "पायाभूत सुविधा" },
  govt: { en: "Government", hi: "सरकार", mr: "शासन" },
  culture: { en: "Culture", hi: "संस्कृति", mr: "संस्कृती" },
};

export const STATUS_LABEL: Record<"confirmed" | "reported", L> = {
  confirmed: { en: "Confirmed", hi: "पुष्ट", mr: "पुष्टी झालेली" },
  reported: { en: "Media report", hi: "मीडिया रिपोर्ट", mr: "माध्यमांतील वृत्त" },
};

export const STATUS_HINT: Record<"confirmed" | "reported", L> = {
  confirmed: {
    en: "Confirmed by an official or on the record.",
    hi: "किसी अधिकारी ने या आधिकारिक रूप से पुष्टि की है।",
    mr: "अधिकाऱ्यांनी किंवा अधिकृतपणे पुष्टी केली आहे.",
  },
  reported: {
    en: "Based on media reports. Details may change until officials confirm them.",
    hi: "मीडिया रिपोर्ट पर आधारित। आधिकारिक पुष्टि तक ब्योरे बदल सकते हैं।",
    mr: "माध्यमांतील वृत्तावर आधारित. अधिकृत पुष्टी होईपर्यंत तपशील बदलू शकतात.",
  },
};

export const NEWS_UI = {
  desk: { en: "The Nashik Kumbh Desk", hi: "द नाशिक कुंभ डेस्क", mr: "द नाशिक कुंभ डेस्क" },
  allNews: { en: "All news", hi: "सभी खबरें", mr: "सर्व बातम्या" },
  all: { en: "All", hi: "सभी", mr: "सर्व" },
  minRead: { en: "min read", hi: "मिनट में पढ़ें", mr: "मिनिटांत वाचा" },
  by: { en: "By", hi: "लेखक:", mr: "लेखक:" },
  updated: { en: "Updated", hi: "अपडेट", mr: "अद्ययावत" },
  share: { en: "Share", hi: "शेयर करें", mr: "शेअर करा" },
  copied: { en: "Link copied", hi: "लिंक कॉपी हुआ", mr: "लिंक कॉपी झाली" },
  sourcesTitle: { en: "Where this comes from", hi: "यह जानकारी कहाँ से है", mr: "ही माहिती कुठून आली" },
  originally: { en: "First announced on", hi: "पहली घोषणा:", mr: "पहिली घोषणा:" },
  more: { en: "More news", hi: "और खबरें", mr: "आणखी बातम्या" },
  read: { en: "Read", hi: "पढ़ें", mr: "वाचा" },
} satisfies Record<string, L>;

/**
 * Quick-start chips for the assistant. Kept apart from the full knowledge
 * base so pages can show the chips without shipping every answer.
 */
type I18nText = { en: string; hi: string; mr: string };

export const quickStartChips: { topicId: string; label: I18nText }[] = [
  {
    // Answered from the news index, not a knowledge-base topic.
    topicId: "latest-news",
    label: { en: "Latest news", hi: "ताज़ा खबरें", mr: "ताज्या बातम्या" },
  },
  {
    topicId: "kumbh-dates",
    label: { en: "Kumbh Dates", hi: "कुंभ तिथियां", mr: "कुंभ तारखा" },
  },
  {
    topicId: "how-to-reach",
    label: { en: "How to Reach", hi: "कैसे पहुंचें", mr: "कसे पोहोचायचे" },
  },
  {
    topicId: "accommodation",
    label: { en: "Where to Stay", hi: "कहां रुकें", mr: "कुठे राहायचे" },
  },
  {
    topicId: "sacred-ghats",
    label: { en: "Sacred Ghats", hi: "पवित्र घाट", mr: "पवित्र घाट" },
  },
  {
    topicId: "what-to-carry",
    label: { en: "What to Carry", hi: "क्या लाएं", mr: "काय आणायचे" },
  },
  {
    topicId: "is-free",
    label: { en: "Is it Free?", hi: "क्या मुफ्त है?", mr: "मोफत आहे का?" },
  },
  {
    topicId: "emergency",
    label: { en: "Emergency Help", hi: "आपातकालीन मदद", mr: "आणीबाणी मदत" },
  },
  {
    topicId: "naga-sadhus",
    label: { en: "Naga Sadhus", hi: "नागा साधु", mr: "नागा साधू" },
  },
  {
    topicId: "ghat-ramkund",
    label: { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
  },
  {
    topicId: "ganga-aarti",
    label: { en: "Ganga Aarti", hi: "गंगा आरती", mr: "गंगा आरती" },
  },
];

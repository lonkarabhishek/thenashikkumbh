import { Locale } from "@/i18n/translations";

type L = Record<Locale, string>;

/** Nav strings added by the redesign, kept apart from the original bundle. */
export const navExtra: Record<string, L> = {
  yatra: { en: "Audio Walks", hi: "ऑडियो यात्रा", mr: "ऑडिओ यात्रा" },
  more: { en: "More", hi: "और", mr: "अधिक" },
  menu: { en: "Menu", hi: "मेन्यू", mr: "मेनू" },
  close: { en: "Close", hi: "बंद करें", mr: "बंद करा" },
  emergency: { en: "Emergency", hi: "आपातकाल", mr: "आणीबाणी" },
  language: { en: "Language", hi: "भाषा", mr: "भाषा" },

  groupPlan: { en: "Plan your visit", hi: "यात्रा की योजना", mr: "भेटीचे नियोजन" },
  groupExplore: { en: "Experience", hi: "अनुभव", mr: "अनुभव" },
  groupLearn: { en: "Understand", hi: "समझें", mr: "समजून घ्या" },
};

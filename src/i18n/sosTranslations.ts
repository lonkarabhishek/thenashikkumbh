import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

export const sosUI: Record<string, I18nText> = {
  title: { en: "Emergency Help", hi: "आपातकालीन सहायता", mr: "आपत्कालीन मदत" },
  subtitle: { en: "Tap to call immediately", hi: "तुरंत कॉल करने के लिए टैप करें", mr: "लगेच कॉल करण्यासाठी टॅप करा" },
  police: { en: "Police", hi: "पुलिस", mr: "पोलीस" },
  ambulance: { en: "Ambulance", hi: "एम्बुलेंस", mr: "रुग्णवाहिका" },
  fire: { en: "Fire Brigade", hi: "अग्निशमन", mr: "अग्निशमन" },
  womenHelpline: { en: "Women Helpline", hi: "महिला हेल्पलाइन", mr: "महिला हेल्पलाइन" },
  kumbhControl: { en: "Kumbh Control Room", hi: "कुंभ नियंत्रण कक्ष", mr: "कुंभ नियंत्रण कक्ष" },
  disasterMgmt: { en: "Disaster Mgmt", hi: "आपदा प्रबंधन", mr: "आपत्ती व्यवस्थापन" },
  shareLocation: { en: "Share My Location", hi: "मेरा स्थान साझा करें", mr: "माझे स्थान शेअर करा" },
  locationShared: { en: "Location copied!", hi: "स्थान कॉपी हो गया!", mr: "स्थान कॉपी झाले!" },
  locationError: { en: "Could not get location", hi: "स्थान प्राप्त नहीं हो सका", mr: "स्थान मिळू शकले नाही" },
  helpText: {
    en: "Head to the nearest police booth (blue flags). Medical camps are at every major ghat. Stay calm and follow crowd directions.",
    hi: "निकटतम पुलिस बूथ (नीले झंडे) की ओर जाएं। प्रत्येक प्रमुख घाट पर चिकित्सा शिविर हैं। शांत रहें और भीड़ निर्देशों का पालन करें।",
    mr: "जवळच्या पोलीस बूथकडे जा (निळे झेंडे). प्रत्येक प्रमुख घाटावर वैद्यकीय शिबिरे आहेत. शांत रहा आणि गर्दीच्या सूचनांचे पालन करा.",
  },
  findNearestExit: {
    en: "Find Nearest Exit",
    hi: "निकटतम निकास खोजें",
    mr: "जवळचा निर्गम शोधा",
  },
  exitRoutesTitle: {
    en: "Evacuation Routes",
    hi: "निकासी मार्ग",
    mr: "निर्गम मार्ग",
  },
  nearestZone: {
    en: "Nearest zone",
    hi: "निकटतम क्षेत्र",
    mr: "जवळचा विभाग",
  },
  walkTime: {
    en: "min walk",
    hi: "मिनट पैदल",
    mr: "मिनिट चालणे",
  },
  navigate: {
    en: "Navigate",
    hi: "नेविगेट करें",
    mr: "मार्गदर्शन करा",
  },
  locatingGps: {
    en: "Getting your location...",
    hi: "आपका स्थान प्राप्त कर रहे हैं...",
    mr: "तुमचे स्थान मिळवत आहोत...",
  },
  exitRouteError: {
    en: "Could not find nearby exits. Please try again.",
    hi: "निकटतम निकास नहीं मिल सका। कृपया पुन: प्रयास करें।",
    mr: "जवळचा निर्गम सापडला नाही. कृपया पुन्हा प्रयत्न करा.",
  },
  exitDisclaimer: {
    en: "Routes are approximate. Follow police and volunteer directions on the ground.",
    hi: "मार्ग अनुमानित हैं। मैदान पर पुलिस और स्वयंसेवकों के निर्देशों का पालन करें।",
    mr: "मार्ग अंदाजे आहेत. मैदानावर पोलीस आणि स्वयंसेवकांच्या सूचनांचे पालन करा.",
  },
};

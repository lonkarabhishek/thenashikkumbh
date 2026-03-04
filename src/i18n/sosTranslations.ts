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
};

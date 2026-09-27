import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

export const sosUI: Record<string, I18nText> = {
  title: { en: "Emergency Help", hi: "आपातकालीन सहायता", mr: "आपत्कालीन मदत" },
  subtitle: { en: "Tap to call immediately", hi: "तुरंत कॉल करने के लिए टैप करें", mr: "लगेच कॉल करण्यासाठी टॅप करा" },
  police: { en: "Police", hi: "पुलिस", mr: "पोलीस" },
  ambulance: { en: "Ambulance", hi: "एम्बुलेंस", mr: "रुग्णवाहिका" },
  fire: { en: "Fire Brigade", hi: "अग्निशमन", mr: "अग्निशमन" },
  womenHelpline: { en: "Women helpline", hi: "महिला हेल्पलाइन", mr: "महिला हेल्पलाइन" },
  childHelpline: { en: "Child helpline", hi: "चाइल्ड हेल्पलाइन", mr: "चाइल्ड हेल्पलाइन" },
  // The number attached to this label is the NTKMA landline at the Divisional
  // Commissioner's office, a real published contact, not a control room.
  kumbhControl: {
    en: "NTKMA, Divisional Commissioner, Nashik",
    hi: "NTKMA, विभागीय आयुक्त, नाशिक",
    mr: "NTKMA, विभागीय आयुक्त, नाशिक",
  },
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

  /* ── Added by the redesign ─────────────────────────────── */
  callNow: { en: "Call 112 now", hi: "अभी 112 पर कॉल करें", mr: "आता ११२ वर कॉल करा" },
  callNowHint: {
    en: "One number for police, ambulance and fire",
    hi: "पुलिस, एम्बुलेंस और अग्निशमन, एक ही नंबर",
    mr: "पोलीस, रुग्णवाहिका आणि अग्निशमन, एकच क्रमांक",
  },
  otherNumbers: { en: "Other helplines", hi: "अन्य हेल्पलाइन", mr: "इतर हेल्पलाइन" },
  onThisPhone: { en: "On this phone", hi: "इसी फ़ोन पर", mr: "याच फोनवर" },
  close: { en: "Close", hi: "बंद करें", mr: "बंद करा" },
  keepCalm: {
    en: "Stay where you are if you can. Help is closer than it feels.",
    hi: "यदि संभव हो तो वहीं रुकें। सहायता जितनी लगती है उससे पास है।",
    mr: "शक्य असल्यास जिथे आहात तिथेच थांबा. मदत वाटते त्यापेक्षा जवळ आहे.",
  },
  lostTitle: { en: "Lost someone?", hi: "कोई बिछड़ गया?", mr: "कोणी हरवले?" },
  lostBody: {
    en: "Go to the nearest police booth, they have blue flags and a public address system, and every lost-person report goes out across the whole mela within minutes.",
    hi: "निकटतम पुलिस बूथ पर जाएँ, वहाँ नीले झंडे और उद्घोषणा प्रणाली है, और गुमशुदगी की सूचना कुछ ही मिनटों में पूरे मेले में प्रसारित हो जाती है।",
    mr: "जवळच्या पोलीस बूथवर जा, तिथे निळे झेंडे आणि उद्घोषणा यंत्रणा आहे, आणि हरवल्याची नोंद काही मिनिटांत संपूर्ण मेळ्यात प्रसारित होते.",
  },
  sharingHint: {
    en: "Sends your exact coordinates to anyone you choose",
    hi: "आपके सटीक निर्देशांक आपके चुने हुए व्यक्ति को भेजता है",
    mr: "तुमचे अचूक स्थान तुम्ही निवडलेल्या व्यक्तीला पाठवते",
  },
  exitHint: {
    en: "Uses your location to find the way out of the crowd",
    hi: "भीड़ से बाहर निकलने का रास्ता आपके स्थान से खोजता है",
    mr: "गर्दीतून बाहेर पडण्याचा मार्ग तुमच्या स्थानावरून शोधते",
  },
};

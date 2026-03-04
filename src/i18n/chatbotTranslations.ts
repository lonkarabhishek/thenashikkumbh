import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

export const chatbotUI: Record<string, I18nText> = {
  title: { en: "Kumbh Sahayak", hi: "कुंभ सहायक", mr: "कुंभ सहायक" },
  subtitle: { en: "AI Assistant", hi: "AI सहायक", mr: "AI सहायक" },
  welcome: {
    en: "Namaste! I'm your Kumbh Sahayak, your AI guide for Nashik Kumbh Mela 2027. Ask me anything about dates, travel, ghats, or accommodation, or tap a topic below!",
    hi: "नमस्ते! मैं आपका कुंभ सहायक हूँ, नाशिक कुंभ मेला 2027 के लिए आपका AI गाइड। तिथियों, यात्रा, घाटों, आवास के बारे में पूछें या नीचे कोई विषय चुनें!",
    mr: "नमस्कार! मी तुमचा कुंभ सहायक आहे, नाशिक कुंभमेळा 2027 साठी तुमचा AI मार्गदर्शक. तिथी, प्रवास, घाट, निवासाबद्दल विचारा किंवा खाली एखादा विषय निवडा!",
  },
  placeholder: {
    en: "Type your question...",
    hi: "अपना प्रश्न टाइप करें...",
    mr: "तुमचा प्रश्न टाइप करा...",
  },
  fallback: {
    en: "I'm not sure about that yet, but I'm learning! Try asking about Kumbh dates, how to reach Nashik, sacred ghats, or accommodation. You can also browse our website for more details.",
    hi: "मुझे इसके बारे में अभी पूरी जानकारी नहीं है, लेकिन मैं सीख रहा हूँ! कुंभ की तिथियों, नाशिक कैसे पहुँचें, पवित्र घाटों, या आवास के बारे में पूछें।",
    mr: "मला याबद्दल अजून पूर्ण माहिती नाही, पण मी शिकत आहे! कुंभाच्या तिथी, नाशिकला कसे पोहोचावे, पवित्र घाट, किंवा निवासाबद्दल विचारा.",
  },
  readMore: { en: "Read more on our site", hi: "हमारी साइट पर और पढ़ें", mr: "आमच्या साइटवर अधिक वाचा" },
  poweredBy: { en: "Powered by Kumbh AI", hi: "कुंभ AI द्वारा संचालित", mr: "कुंभ AI द्वारे संचालित" },
};

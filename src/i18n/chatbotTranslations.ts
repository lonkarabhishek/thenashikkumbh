import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

export const chatbotUI: Record<string, I18nText> = {
  title: { en: "Kumbh Sahayak", hi: "कुंभ सहायक", mr: "कुंभ सहायक" },
  subtitle: { en: "AI Assistant", hi: "AI सहायक", mr: "AI सहायक" },
  welcome: {
    en: "Namaste! I'm your Kumbh Sahayak, your AI guide for Nashik Kumbh Mela 2027. Ask me about dates, travel, ghats, stay or the latest Kumbh news, or tap a topic below!",
    hi: "नमस्ते! मैं आपका कुंभ सहायक हूँ, नाशिक कुंभ मेला 2027 के लिए आपका AI गाइड। तिथियों, यात्रा, घाटों, आवास या कुंभ की ताज़ा खबरों के बारे में पूछें, या नीचे कोई विषय चुनें!",
    mr: "नमस्कार! मी तुमचा कुंभ सहायक आहे, नाशिक कुंभमेळा 2027 साठी तुमचा AI मार्गदर्शक. तारखा, प्रवास, घाट, निवास किंवा कुंभमेळ्याच्या ताज्या बातम्यांबद्दल विचारा, किंवा खाली एखादा विषय निवडा!",
  },
  placeholder: {
    en: "Type your question...",
    hi: "अपना प्रश्न टाइप करें...",
    mr: "तुमचा प्रश्न टाइप करा...",
  },
  fallback: {
    en: "I'm not sure about that yet, but I'm learning! Try asking about Kumbh dates, how to reach Nashik, sacred ghats, accommodation, or the latest news. You can also browse our website for more details.",
    hi: "मुझे इसके बारे में अभी पूरी जानकारी नहीं है, लेकिन मैं सीख रहा हूँ! कुंभ की तिथियों, नाशिक कैसे पहुँचें, पवित्र घाटों, आवास या ताज़ा खबरों के बारे में पूछें।",
    mr: "मला याबद्दल अजून पूर्ण माहिती नाही, पण मी शिकत आहे! कुंभाच्या तारखा, नाशिकला कसे पोहोचावे, पवित्र घाट, निवास किंवा ताज्या बातम्यांबद्दल विचारा.",
  },
  readMore: { en: "Read more on our site", hi: "हमारी साइट पर और पढ़ें", mr: "आमच्या साइटवर अधिक वाचा" },
  aiNote: {
    en: "Answers are written by Claude AI from this site's verified content only. They can still be wrong. Check official notices before you travel.",
    hi: "उत्तर Claude AI इस साइट की जाँची हुई सामग्री से ही लिखता है। फिर भी गलती हो सकती है। यात्रा से पहले आधिकारिक सूचना देखें।",
    mr: "उत्तरे Claude AI या साइटवरील पडताळलेल्या माहितीतूनच लिहिते. तरीही चूक होऊ शकते. प्रवासापूर्वी अधिकृत सूचना पाहा.",
  },
  localNote: {
    en: "Answers come from this site's verified content. For any emergency dial 112.",
    hi: "उत्तर इस साइट की जाँची हुई सामग्री से आते हैं। किसी भी आपात स्थिति में 112 डायल करें।",
    mr: "उत्तरे या साइटवरील पडताळलेल्या माहितीतून येतात. कोणत्याही आपत्कालीन स्थितीत ११२ डायल करा.",
  },
  busyNote: {
    en: "The AI assistant has reached today's limit, so answers now come from the site's built-in guide.",
    hi: "AI सहायक की आज की सीमा पूरी हो गई है, इसलिए अब उत्तर साइट की अपनी गाइड से आ रहे हैं।",
    mr: "AI सहायकाची आजची मर्यादा संपली आहे, त्यामुळे आता उत्तरे साइटच्या स्वतःच्या मार्गदर्शकातून येत आहेत.",
  },
};

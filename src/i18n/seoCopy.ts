import type { Locale } from "@/i18n/translations";

/**
 * Search titles and descriptions for every page, per language.
 *
 * REVIEW NEEDED: the Marathi and Hindi strings were drafted from the English
 * and have not yet been checked by a native speaker. Please review them
 * before relying on them in search results.
 *
 * Titles are suffixed by the root layout's template (TITLE_TEMPLATE), so do
 * not repeat the site name here. Keep titles under roughly 60 characters and
 * descriptions under roughly 155 so search engines show them uncut.
 */

export interface SeoCopy {
  title: string;
  description: string;
  /** Breadcrumb label for this page. */
  crumb: string;
}

export type PageKey =
  | "home"
  | "about"
  | "blog"
  | "dates"
  | "events"
  | "gallery"
  | "games"
  | "ghats"
  | "guide"
  | "kumbhrun"
  | "naga-sadhus"
  | "yatra";

// Short brand suffix so page titles are not cut off in search results.
export const TITLE_TEMPLATE: Record<Locale, string> = {
  en: "%s | The Nashik Kumbh",
  mr: "%s | द नाशिक कुंभ",
  hi: "%s | द नाशिक कुंभ",
};

/** Suffix for a Yatra trail page title, after the trail's own name. */
export const TRAIL_TITLE_SUFFIX: Record<Locale, string> = {
  en: "Free Walking Audio Guide, Nashik",
  mr: "मोफत ऑडिओ पदयात्रा मार्गदर्शक, नाशिक",
  hi: "मुफ़्त ऑडियो वॉकिंग गाइड, नाशिक",
};

export const SEO_COPY: Record<PageKey, Record<Locale, SeoCopy>> = {
  home: {
    en: {
      title: "Nashik Kumbh Mela 2027 (Simhastha): Dates, Shahi Snan, News & Guide",
      description:
        "Nashik Kumbh 2027: Dhwajarohan 31 Oct 2026, Amrit Snan 2 Aug, 31 Aug, 11 and 12 Sep 2027. Dates, ghats, travel, stay and sourced news.",
      crumb: "Home",
    },
    mr: {
      title: "नाशिक कुंभमेळा 2027 (सिंहस्थ): तारखा, अमृत स्नान, बातम्या आणि मार्गदर्शक",
      description:
        "नाशिक कुंभमेळा 2027: ध्वजारोहण ३१ ऑक्टोबर २०२६, अमृत स्नान २ ऑगस्ट, ३१ ऑगस्ट, ११ व १२ सप्टेंबर २०२७. तारखा, घाट, प्रवास, निवास आणि बातम्या.",
      crumb: "मुख्यपृष्ठ",
    },
    hi: {
      title: "नाशिक कुंभ मेला 2027 (सिंहस्थ): तिथियाँ, अमृत स्नान, समाचार और गाइड",
      description:
        "नाशिक कुंभ 2027: ध्वजारोहण 31 अक्टूबर 2026, अमृत स्नान 2 अगस्त, 31 अगस्त, 11 और 12 सितंबर 2027। तिथियाँ, घाट, यात्रा, ठहरना और समाचार।",
      crumb: "होम",
    },
  },
  about: {
    en: {
      title: "About Kumbh Mela - History, Origins & Spiritual Significance",
      description:
        "The ancient origins of Kumbh Mela, the Samudra Manthan story, and why Nashik on the Godavari is one of its four sacred cities.",
      crumb: "About",
    },
    mr: {
      title: "कुंभमेळा माहिती मराठीत: इतिहास, उगम आणि महत्त्व",
      description:
        "कुंभमेळ्याचा प्राचीन उगम, समुद्रमंथनाची कथा आणि गोदावरीकाठचे नाशिक हे या दिव्य सोहळ्यासाठी निवडलेल्या चार पवित्र नगरांपैकी एक का आहे, ते जाणून घ्या.",
      crumb: "कुंभमेळ्याविषयी",
    },
    hi: {
      title: "कुंभ मेला जानकारी: इतिहास, उत्पत्ति और महत्व",
      description:
        "कुंभ मेले की प्राचीन उत्पत्ति, समुद्र मंथन की कथा, और गोदावरी तट पर बसा नाशिक इस दिव्य समागम के लिए चुने गए चार पवित्र नगरों में से एक क्यों है, जानिए।",
      crumb: "कुंभ के बारे में",
    },
  },
  blog: {
    en: {
      title: "Kumbh Mela Blog - Latest News, Updates and Stories from Nashik",
      description:
        "Latest Nashik Kumbh Mela 2027 news: dates, works, budget, safety, stay and travel. Every story is sourced and dated.",
      crumb: "Blog",
    },
    mr: {
      title: "नाशिक कुंभमेळा बातम्या आणि ताज्या घडामोडी",
      description:
        "नाशिक सिंहस्थ कुंभमेळा २०२७ संबंधी ताज्या बातम्या: पायाभूत सुविधा, शासनाच्या योजना, सांस्कृतिक कार्यक्रम आणि गोदावरीकाठच्या सिंहस्थासाठी भाविकांना मार्गदर्शन.",
      crumb: "बातम्या",
    },
    hi: {
      title: "नाशिक कुंभ मेला समाचार और ताज़ा अपडेट",
      description:
        "नाशिक सिंहस्थ कुंभ मेला 2027 से जुड़ी ताज़ा खबरें: बुनियादी ढाँचा, सरकारी योजनाएँ, सांस्कृतिक कार्यक्रम और गोदावरी तट के सिंहस्थ के लिए तीर्थयात्री गाइड।",
      crumb: "समाचार",
    },
  },
  dates: {
    en: {
      title: "Nashik Kumbh 2027 Shahi (Amrit) Snan Dates: 2 Aug, 31 Aug, 11 and 12 Sep",
      description:
        "Official Nashik Kumbh 2027 dates: Dhwajarohan 31 Oct 2026 at 12:02 PM; Amrit (Shahi) Snan 2 Aug, 31 Aug, 11 Sep (Nashik), 12 Sep (Trimbak).",
      crumb: "Important Dates",
    },
    mr: {
      title: "नाशिक कुंभमेळा 2027 शाही (अमृत) स्नान तारखा: २ ऑगस्ट, ३१ ऑगस्ट, ११ व १२ सप्टेंबर",
      description:
        "नाशिक कुंभमेळा 2027 तारखा: ध्वजारोहण ३१ ऑक्टोबर २०२६, दुपारी १२:०२; अमृत (शाही) स्नान २ ऑगस्ट, ३१ ऑगस्ट, ११ सप्टेंबर (नाशिक), १२ सप्टेंबर (त्र्यंबक).",
      crumb: "महत्त्वाच्या तारखा",
    },
    hi: {
      title: "नाशिक कुंभ 2027 शाही (अमृत) स्नान तिथियाँ: 2 अगस्त, 31 अगस्त, 11 और 12 सितंबर",
      description:
        "नाशिक कुंभ 2027 की आधिकारिक तिथियाँ: ध्वजारोहण 31 अक्टूबर 2026, दोपहर 12:02; अमृत (शाही) स्नान 2 अगस्त, 31 अगस्त, 11 सितंबर (नाशिक), 12 सितंबर (त्र्यंबक)।",
      crumb: "महत्वपूर्ण तिथियाँ",
    },
  },
  events: {
    en: {
      title: "Events & Akhadas - Spiritual Gatherings & Sacred Processions",
      description:
        "Explore all events at Nashik Kumbh Mela 2027 - Shahi Snan processions, satsangs, cultural performances, yoga camps, and learn about the 13 sacred akhadas.",
      crumb: "Events and Akhadas",
    },
    mr: {
      title: "कार्यक्रम आणि आखाडे: पवित्र शोभायात्रा आणि आध्यात्मिक सोहळे",
      description:
        "नाशिक कुंभमेळा २०२७ मधील सर्व कार्यक्रम: शाही स्नानाच्या शोभायात्रा, सत्संग, सांस्कृतिक कार्यक्रम, योग शिबिरे आणि १३ पवित्र आखाड्यांची माहिती.",
      crumb: "कार्यक्रम आणि आखाडे",
    },
    hi: {
      title: "कार्यक्रम और अखाड़े: पवित्र शोभायात्राएँ और आध्यात्मिक आयोजन",
      description:
        "नाशिक कुंभ मेला 2027 के सभी कार्यक्रम: शाही स्नान की शोभायात्राएँ, सत्संग, सांस्कृतिक कार्यक्रम, योग शिविर और 13 पवित्र अखाड़ों की जानकारी।",
      crumb: "कार्यक्रम और अखाड़े",
    },
  },
  gallery: {
    en: {
      title: "Kumbh Mela Photos: Pictures of Shahi Snan, Sadhus and Ghats",
      description:
        "Kumbh Mela photos and pictures: Shahi Snan crowds, Naga sadhu processions, evening aarti, temples and river ghats, all in one gallery.",
      crumb: "Gallery",
    },
    mr: {
      title: "कुंभमेळा फोटो: शाही स्नान, साधू आणि घाटांची छायाचित्रे",
      description:
        "कुंभमेळ्याचे फोटो आणि छायाचित्रे: शाही स्नानाची गर्दी, नागा साधूंच्या मिरवणुका, संध्याकाळची आरती, मंदिरे आणि नदीचे घाट, सगळे एकाच दालनात.",
      crumb: "छायाचित्रे",
    },
    hi: {
      title: "कुंभ मेला फोटो: शाही स्नान, साधुओं और घाटों की तस्वीरें",
      description:
        "कुंभ मेले की फोटो और तस्वीरें: शाही स्नान की भीड़, नागा साधुओं की शोभायात्रा, संध्या आरती, मंदिर और नदी के घाट, सब एक गैलरी में।",
      crumb: "गैलरी",
    },
  },
  games: {
    en: {
      title: "Kumbh Mela Games - Quiz, Word Scramble and Fun Activities",
      description:
        "Fun, simple games about Nashik Kumbh Mela 2027: a Kumbh quiz and word scramble on traditions, ghats and rituals.",
      crumb: "Games",
    },
    mr: {
      title: "कुंभमेळा खेळ: प्रश्नमंजुषा, शब्दकोडे आणि उपक्रम",
      description:
        "नाशिक कुंभमेळा २०२७ विषयी मनोरंजक आणि माहितीपूर्ण खेळ. कुंभ प्रश्नमंजुषा आणि शब्दकोड्यांतून पवित्र परंपरा, घाट आणि विधींबद्दल जाणून घ्या.",
      crumb: "खेळ",
    },
    hi: {
      title: "कुंभ मेला खेल: क्विज़, शब्द पहेली और गतिविधियाँ",
      description:
        "नाशिक कुंभ मेला 2027 पर मज़ेदार और ज्ञानवर्धक खेल। कुंभ क्विज़ और शब्द पहेली के साथ पवित्र परंपराओं, घाटों और अनुष्ठानों के बारे में जानिए।",
      crumb: "खेल",
    },
  },
  ghats: {
    en: {
      title: "Nashik Ghats: Ram Kund, Panchavati and Other Sacred Ghats",
      description:
        "Explore the holy bathing ghats of Nashik including Ram Kund, Godavari Ghats, Kapaleshwar Temple, and Panchavati - where Lord Rama walked during his exile.",
      crumb: "Sacred Ghats",
    },
    mr: {
      title: "नाशिकचे पवित्र घाट: रामकुंड, गोदावरी आणि पंचवटी",
      description:
        "रामकुंड, गोदावरी घाट, कपालेश्वर मंदिर आणि पंचवटीसह नाशिकचे पवित्र स्नान घाट पाहा. वनवासकाळात प्रभू श्रीराम जिथे वावरले ती ही भूमी.",
      crumb: "पवित्र घाट",
    },
    hi: {
      title: "नाशिक के पवित्र घाट: रामकुंड, गोदावरी और पंचवटी",
      description:
        "रामकुंड, गोदावरी घाट, कपालेश्वर मंदिर और पंचवटी सहित नाशिक के पवित्र स्नान घाट देखिए, जहाँ वनवास के दौरान भगवान राम ने विचरण किया था।",
      crumb: "पवित्र घाट",
    },
  },
  guide: {
    en: {
      title: "Pilgrim Guide - How to Reach, Stay & Prepare for Kumbh Mela",
      description:
        "Nashik Kumbh Mela 2027 pilgrim guide: how to reach by train, air and road, where to stay, what to carry, and safety tips.",
      crumb: "Pilgrim Guide",
    },
    mr: {
      title: "भाविक मार्गदर्शिका: कसे पोहोचाल, कुठे राहाल, काय तयारी कराल",
      description:
        "नाशिक कुंभमेळा 2027 भाविक मार्गदर्शिका: रेल्वे, विमान, रस्त्याने कसे पोहोचाल, कुठे राहाल, काय न्याल आणि सुरक्षेच्या सूचना.",
      crumb: "भाविक मार्गदर्शिका",
    },
    hi: {
      title: "तीर्थयात्री गाइड: कैसे पहुँचें, कहाँ ठहरें, कैसे तैयारी करें",
      description:
        "नाशिक कुंभ मेला 2027 तीर्थयात्री गाइड: ट्रेन, हवाई और सड़क से कैसे पहुँचें, कहाँ ठहरें, क्या ले जाएँ और सुरक्षा सुझाव।",
      crumb: "तीर्थयात्री गाइड",
    },
  },
  kumbhrun: {
    en: {
      title: "Kumbh Run - Sacred Pilgrimage Runner Game",
      description:
        "Kumbh Run: a fun runner game through Ram Kund, Panchavati, Trimbakeshwar and other holy places of the Nashik Kumbh.",
      crumb: "Kumbh Run",
    },
    mr: {
      title: "कुंभ रन: तीर्थक्षेत्रांतून धावण्याचा खेळ",
      description:
        "कुंभ रन: रामकुंड, पंचवटी, त्र्यंबकेश्वर आणि नाशिक कुंभातील इतर पवित्र स्थळांमधून धावण्याचा मजेदार खेळ.",
      crumb: "कुंभ रन",
    },
    hi: {
      title: "कुंभ रन: तीर्थ स्थलों से होकर दौड़ने का खेल",
      description:
        "कुंभ रन: रामकुंड, पंचवटी, त्र्यंबकेश्वर और नाशिक कुंभ के दूसरे पवित्र स्थलों से होकर दौड़ने का मज़ेदार खेल।",
      crumb: "कुंभ रन",
    },
  },
  "naga-sadhus": {
    en: {
      title: "Naga Sadhus - Warrior Ascetics of Kumbh Mela",
      description:
        "Who the Naga Sadhus are: history, sacred attire, akhada orders and their role at the Nashik Kumbh Mela 2027.",
      crumb: "Naga Sadhus",
    },
    mr: {
      title: "नागा साधू: कुंभमेळ्यातील योद्धा संन्यासी",
      description:
        "हिंदू परंपरेतील प्राचीन योद्धा संन्यासी नागा साधूंबद्दल जाणून घ्या: त्यांचा इतिहास, पवित्र वेशभूषा, आखाडा परंपरा आणि नाशिक कुंभमेळा २०२७ मधील त्यांची भूमिका.",
      crumb: "नागा साधू",
    },
    hi: {
      title: "नागा साधु: कुंभ मेले के योद्धा संन्यासी",
      description:
        "हिंदू परंपरा के प्राचीन योद्धा संन्यासी नागा साधुओं के बारे में जानिए: उनका इतिहास, पवित्र वेशभूषा, अखाड़ा परंपरा और नाशिक कुंभ मेला 2027 में उनकी भूमिका।",
      crumb: "नागा साधु",
    },
  },
  yatra: {
    en: {
      title: "Yatra - Free Walking Audio Guide to Nashik Kumbh Mela",
      description:
        "Free walking audio tours of Nashik's sacred quarter in Marathi, Hindi and English: Ram Kund, Kalaram, Trimbakeshwar and more.",
      crumb: "Yatra Audio Guide",
    },
    mr: {
      title: "यात्रा: नाशिक कुंभमेळ्यासाठी मोफत ऑडिओ पदयात्रा मार्गदर्शक",
      description:
        "नाशिकच्या पवित्र परिसराच्या मोफत ऑडिओ पदयात्रा, मराठी, हिंदी आणि इंग्रजीत: रामकुंड, काळाराम, त्र्यंबकेश्वर आणि बरेच काही.",
      crumb: "यात्रा ऑडिओ मार्गदर्शक",
    },
    hi: {
      title: "यात्रा: नाशिक कुंभ मेले के लिए मुफ़्त ऑडियो वॉकिंग गाइड",
      description:
        "नाशिक के पवित्र क्षेत्र के मुफ़्त ऑडियो वॉकिंग टूर, मराठी, हिंदी और अंग्रेज़ी में: रामकुंड, कालाराम, त्र्यंबकेश्वर और भी बहुत कुछ।",
      crumb: "यात्रा ऑडियो गाइड",
    },
  },
};

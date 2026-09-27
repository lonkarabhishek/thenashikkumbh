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

export const TITLE_TEMPLATE: Record<Locale, string> = {
  en: "%s | Nashik Kumbh Mela 2027",
  mr: "%s | नाशिक कुंभमेळा २०२७",
  hi: "%s | नाशिक कुंभ मेला 2027",
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
      title:
        "Nashik Kumbh Mela 2027 | Sacred Pilgrimage at Godavari River | नाशिक कुंभमेळा",
      description:
        "Independent public-information initiative for the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027. Verified Amrit Snan schedule, emergency numbers, and pilgrim guidance. Every operational claim is sourced and dated.",
      crumb: "Home",
    },
    mr: {
      title: "नाशिक कुंभमेळा २०२७ | अमृत स्नान तारखा, घाट आणि भाविक मार्गदर्शिका",
      description:
        "नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभमेळा २०२७ साठी स्वतंत्र सार्वजनिक माहिती उपक्रम. अमृत स्नानाचे पडताळलेले वेळापत्रक, आपत्कालीन क्रमांक आणि भाविकांसाठी मार्गदर्शन. प्रत्येक माहितीचा स्रोत आणि तारीख दिलेली आहे.",
      crumb: "मुख्यपृष्ठ",
    },
    hi: {
      title: "नाशिक कुंभ मेला 2027 | अमृत स्नान तिथियाँ, घाट और तीर्थयात्री गाइड",
      description:
        "नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 के लिए स्वतंत्र सार्वजनिक सूचना पहल। अमृत स्नान का सत्यापित कार्यक्रम, आपातकालीन नंबर और तीर्थयात्रियों के लिए मार्गदर्शन। हर जानकारी का स्रोत और तिथि दी गई है।",
      crumb: "होम",
    },
  },
  about: {
    en: {
      title: "About Kumbh Mela - History, Origins & Spiritual Significance",
      description:
        "Discover the ancient origins of Kumbh Mela, the Samudra Manthan legend, and why Nashik is one of four sacred cities chosen for this divine gathering at the Godavari River.",
      crumb: "About",
    },
    mr: {
      title: "कुंभमेळ्याविषयी: इतिहास, उगम आणि आध्यात्मिक महत्त्व",
      description:
        "कुंभमेळ्याचा प्राचीन उगम, समुद्रमंथनाची कथा आणि गोदावरीकाठचे नाशिक हे या दिव्य सोहळ्यासाठी निवडलेल्या चार पवित्र नगरांपैकी एक का आहे, ते जाणून घ्या.",
      crumb: "कुंभमेळ्याविषयी",
    },
    hi: {
      title: "कुंभ मेले के बारे में: इतिहास, उत्पत्ति और आध्यात्मिक महत्व",
      description:
        "कुंभ मेले की प्राचीन उत्पत्ति, समुद्र मंथन की कथा, और गोदावरी तट पर बसा नाशिक इस दिव्य समागम के लिए चुने गए चार पवित्र नगरों में से एक क्यों है, जानिए।",
      crumb: "कुंभ के बारे में",
    },
  },
  blog: {
    en: {
      title: "Kumbh Mela Blog - Latest News, Updates and Stories from Nashik",
      description:
        "Stay updated with the latest news and stories about Nashik Kumbh Mela 2027. Read about infrastructure developments, government plans, cultural events, and pilgrim guides for Simhastha Kumbh at the Godavari River.",
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
      title: "Nashik Kumbh 2027 Dates: Amrit Snan (Shahi Snan) Schedule",
      description:
        "Officially confirmed Nashik–Trimbakeshwar Simhastha dates: Dhwajarohan on 31 October 2026, Amrit Snan on 2 August, 31 August and 11–12 September 2027. Every date is sourced.",
      crumb: "Important Dates",
    },
    mr: {
      title: "नाशिक कुंभमेळा २०२७ तारखा: अमृत स्नान (शाही स्नान) वेळापत्रक",
      description:
        "नाशिक–त्र्यंबकेश्वर सिंहस्थाच्या अधिकृत तारखा: ध्वजारोहण ३१ ऑक्टोबर २०२६; अमृत स्नान २ ऑगस्ट, ३१ ऑगस्ट आणि ११–१२ सप्टेंबर २०२७. प्रत्येक तारखेचा स्रोत दिलेला आहे.",
      crumb: "महत्त्वाच्या तारखा",
    },
    hi: {
      title: "नाशिक कुंभ मेला 2027 तिथियाँ: अमृत स्नान (शाही स्नान) कार्यक्रम",
      description:
        "नाशिक–त्र्यंबकेश्वर सिंहस्थ की आधिकारिक तिथियाँ: ध्वजारोहण 31 अक्टूबर 2026; अमृत स्नान 2 अगस्त, 31 अगस्त और 11–12 सितंबर 2027। हर तिथि का स्रोत दिया गया है।",
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
      title: "Gallery - Visual Journey Through Kumbh Mela",
      description:
        "Browse stunning images from Nashik Kumbh Mela - sacred Shahi Snan, grand processions, evening aarti, temple architecture, and the spiritual energy of millions gathered at the Godavari.",
      crumb: "Gallery",
    },
    mr: {
      title: "छायाचित्रे: कुंभमेळ्याचा दृश्य प्रवास",
      description:
        "नाशिक कुंभमेळ्याची छायाचित्रे: पवित्र शाही स्नान, भव्य शोभायात्रा, सायंकाळची आरती, मंदिर स्थापत्य आणि गोदावरीकाठी जमलेल्या लाखो भाविकांचा आध्यात्मिक उत्साह.",
      crumb: "छायाचित्रे",
    },
    hi: {
      title: "गैलरी: कुंभ मेले की दृश्य यात्रा",
      description:
        "नाशिक कुंभ मेले की तस्वीरें: पवित्र शाही स्नान, भव्य शोभायात्राएँ, संध्या आरती, मंदिर स्थापत्य और गोदावरी तट पर जुटे लाखों श्रद्धालुओं का आध्यात्मिक उत्साह।",
      crumb: "गैलरी",
    },
  },
  games: {
    en: {
      title: "Kumbh Mela Games - Quiz, Word Scramble and Fun Activities",
      description:
        "Play fun and educational games about Nashik Kumbh Mela 2027. Test your knowledge with our Kumbh quiz, word scramble, and learn about sacred traditions, ghats, and rituals through interactive activities.",
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
      title: "Sacred Ghats of Nashik - Ram Kund, Godavari & Panchavati",
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
        "Complete pilgrim guide for Nashik Kumbh Mela 2027 - how to reach by train, flight, and road, accommodation options, what to carry, do's and don'ts, and essential travel tips.",
      crumb: "Pilgrim Guide",
    },
    mr: {
      title: "भाविक मार्गदर्शिका: कसे पोहोचाल, कुठे राहाल, काय तयारी कराल",
      description:
        "नाशिक कुंभमेळा २०२७ साठी संपूर्ण मार्गदर्शिका: रेल्वे, विमान आणि रस्त्याने कसे पोहोचाल, निवासाचे पर्याय, सोबत काय न्याल, काय करावे व काय टाळावे आणि प्रवासाच्या आवश्यक सूचना.",
      crumb: "भाविक मार्गदर्शिका",
    },
    hi: {
      title: "तीर्थयात्री गाइड: कैसे पहुँचें, कहाँ ठहरें, कैसे तैयारी करें",
      description:
        "नाशिक कुंभ मेला 2027 के लिए संपूर्ण गाइड: ट्रेन, हवाई जहाज़ और सड़क से कैसे पहुँचें, ठहरने के विकल्प, क्या साथ ले जाएँ, क्या करें और क्या न करें, और यात्रा के ज़रूरी सुझाव।",
      crumb: "तीर्थयात्री गाइड",
    },
  },
  kumbhrun: {
    en: {
      title: "Kumbh Run - Sacred Pilgrimage Runner Game",
      description:
        "Play Kumbh Run, a fun endless runner game set in the sacred places of Nashik Kumbh Mela. Run through Ram Kund, Panchavati, Trimbakeshwar, and other holy sites while learning about each landmark.",
      crumb: "Kumbh Run",
    },
    mr: {
      title: "कुंभ रन: तीर्थक्षेत्रांतून धावण्याचा खेळ",
      description:
        "कुंभ रन हा नाशिक कुंभमेळ्याच्या पवित्र स्थळांवर आधारित धावण्याचा खेळ आहे. रामकुंड, पंचवटी, त्र्यंबकेश्वर आणि इतर तीर्थस्थळांमधून धावा आणि प्रत्येक स्थळाबद्दल जाणून घ्या.",
      crumb: "कुंभ रन",
    },
    hi: {
      title: "कुंभ रन: तीर्थ स्थलों से होकर दौड़ने का खेल",
      description:
        "कुंभ रन नाशिक कुंभ मेले के पवित्र स्थलों पर आधारित एक दौड़ने वाला खेल है। रामकुंड, पंचवटी, त्र्यंबकेश्वर और अन्य तीर्थ स्थलों से दौड़ते हुए हर स्थल के बारे में जानिए।",
      crumb: "कुंभ रन",
    },
  },
  "naga-sadhus": {
    en: {
      title: "Naga Sadhus - Warrior Ascetics of Kumbh Mela",
      description:
        "Learn about the Naga Sadhus, the ancient warrior-monks of Hindu tradition. Their history, sacred attire, Akhada orders, and their powerful role at Nashik Kumbh Mela 2027.",
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
        "Free self-guided walking audio tours of Nashik's sacred quarter, in Marathi, Hindi and English. Hear the story of Ram Kund, Kapaleshwar, Kalaram Mandir, Trimbakeshwar and the akhadas as you reach each place.",
      crumb: "Yatra Audio Guide",
    },
    mr: {
      title: "यात्रा: नाशिक कुंभमेळ्यासाठी मोफत ऑडिओ पदयात्रा मार्गदर्शक",
      description:
        "नाशिकच्या पवित्र परिसराच्या मोफत, स्वयं-मार्गदर्शित ऑडिओ पदयात्रा, मराठी, हिंदी आणि इंग्रजीत. रामकुंड, कपालेश्वर, काळाराम मंदिर, त्र्यंबकेश्वर आणि आखाड्यांची कथा प्रत्येक ठिकाणी पोहोचताच ऐका.",
      crumb: "यात्रा ऑडिओ मार्गदर्शक",
    },
    hi: {
      title: "यात्रा: नाशिक कुंभ मेले के लिए मुफ़्त ऑडियो वॉकिंग गाइड",
      description:
        "नाशिक के पवित्र क्षेत्र के मुफ़्त, स्व-निर्देशित ऑडियो वॉकिंग टूर, मराठी, हिंदी और अंग्रेज़ी में। रामकुंड, कपालेश्वर, कालाराम मंदिर, त्र्यंबकेश्वर और अखाड़ों की कथा हर स्थान पर पहुँचते ही सुनिए।",
      crumb: "यात्रा ऑडियो गाइड",
    },
  },
};

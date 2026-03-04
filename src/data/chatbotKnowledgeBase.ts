import type { Locale } from "@/i18n/translations";

/** Trilingual text record */
type I18nText = Record<Locale, string>;

/** A single chatbot topic with trilingual Q&A, keywords, and metadata */
export interface ChatTopic {
  id: string;
  keywords: Record<Locale, string[]>;
  question: I18nText;
  answer: I18nText;
  relatedTopics: string[];
  pageLink?: string;
  emoji?: string;
}

// ---------------------------------------------------------------------------
// 18 Knowledge-base topics
// ---------------------------------------------------------------------------

export const chatTopics: ChatTopic[] = [
  // 1 ── What is Kumbh Mela? ───────────────────────────────────
  {
    id: "kumbh-what",
    keywords: {
      en: ["kumbh", "what is kumbh", "about kumbh", "kumbh mela", "festival", "samudra manthan", "legend"],
      hi: ["कुंभ क्या है", "कुंभ मेला", "समुद्र मंथन", "त्योहार", "कुंभ"],
      mr: ["कुंभ म्हणजे काय", "कुंभमेळा", "समुद्र मंथन", "सण"],
    },
    question: {
      en: "What is Kumbh Mela?",
      hi: "कुंभ मेला क्या है?",
      mr: "कुंभमेळा म्हणजे काय?",
    },
    answer: {
      en: "Kumbh Mela is the world's largest spiritual gathering, rooted in the ancient legend of Samudra Manthan (the churning of the ocean). According to Hindu mythology, drops of the sacred nectar of immortality fell at four places - Nashik being one of them. The festival is celebrated every 12 years at each location, drawing millions of pilgrims who come to bathe in the holy rivers for spiritual purification.",
      hi: "कुंभ मेला दुनिया का सबसे बड़ा आध्यात्मिक आयोजन है, जो समुद्र मंथन की प्राचीन कथा पर आधारित है। हिंदू पौराणिक कथाओं के अनुसार, अमृत की बूंदें चार स्थानों पर गिरी थीं - नाशिक उनमें से एक है। यह त्योहार हर 12 वर्षों में प्रत्येक स्थान पर मनाया जाता है, और लाखों श्रद्धालु आध्यात्मिक शुद्धि के लिए पवित्र नदियों में स्नान करने आते हैं।",
      mr: "कुंभमेळा हा जगातील सर्वात मोठा आध्यात्मिक मेळावा आहे, जो समुद्र मंथनाच्या प्राचीन कथेवर आधारित आहे. हिंदू पुराणानुसार, अमृताचे थेंब चार ठिकाणी पडले - नाशिक त्यापैकी एक आहे. हा सण दर 12 वर्षांनी प्रत्येक ठिकाणी साजरा केला जातो आणि लाखो भाविक आध्यात्मिक शुद्धीसाठी पवित्र नद्यांमध्ये स्नान करण्यासाठी येतात.",
    },
    relatedTopics: ["kumbh-dates", "shahi-snan", "trimbakeshwar"],
    pageLink: "/about",
    emoji: "🙏",
  },

  // 2 ── When is Kumbh? ────────────────────────────────────────
  {
    id: "kumbh-dates",
    keywords: {
      en: ["when", "dates", "schedule", "timeline", "duration", "how long", "start date"],
      hi: ["कब", "तारीख", "कार्यक्रम", "अवधि", "तिथि"],
      mr: ["कधी", "तारीख", "वेळापत्रक", "कालावधी"],
    },
    question: {
      en: "When is Nashik Kumbh Mela?",
      hi: "नाशिक कुंभ मेला कब है?",
      mr: "नाशिक कुंभमेळा कधी आहे?",
    },
    answer: {
      en: "Nashik Kumbh Mela 2027 begins with the flag hoisting ceremony on October 31, 2026, marking the official start of the Kumbh period. The main bathing season runs from August to October 2027, and the entire festival spans approximately 21 months. Make sure to plan your visit around the Shahi Snan dates for the most sacred experience!",
      hi: "नाशिक कुंभ मेला 2027 की शुरुआत 31 अक्टूबर 2026 को ध्वजारोहण समारोह से होगी, जो कुंभ काल की आधिकारिक शुरुआत है। मुख्य स्नान का मौसम अगस्त से अक्टूबर 2027 तक चलता है, और पूरा त्योहार लगभग 21 महीनों तक फैला है। सबसे पवित्र अनुभव के लिए शाही स्नान की तिथियों के आसपास अपनी यात्रा की योजना बनाएं!",
      mr: "नाशिक कुंभमेळा 2027 ची सुरुवात 31 ऑक्टोबर 2026 रोजी ध्वजारोहण समारंभाने होईल, जी कुंभ कालावधीची अधिकृत सुरुवात आहे. मुख्य स्नानाचा हंगाम ऑगस्ट ते ऑक्टोबर 2027 पर्यंत चालतो आणि संपूर्ण मेळा सुमारे 21 महिन्यांचा आहे. सर्वात पवित्र अनुभवासाठी शाही स्नानाच्या तारखांच्या आसपास आपल्या भेटीचे नियोजन करा!",
    },
    relatedTopics: ["shahi-snan", "kumbh-what", "how-to-reach"],
    pageLink: "/dates",
    emoji: "📅",
  },

  // 3 ── Shahi Snan dates ──────────────────────────────────────
  {
    id: "shahi-snan",
    keywords: {
      en: ["shahi snan", "royal bath", "bathing dates", "holy dip", "snan dates", "main bathing"],
      hi: ["शाही स्नान", "स्नान तिथि", "पवित्र स्नान", "मुख्य स्नान"],
      mr: ["शाही स्नान", "स्नान तिथी", "पवित्र स्नान", "मुख्य स्नान"],
    },
    question: {
      en: "What are the Shahi Snan dates?",
      hi: "शाही स्नान की तिथियां क्या हैं?",
      mr: "शाही स्नानाच्या तारखा कोणत्या आहेत?",
    },
    answer: {
      en: "There are five Shahi Snan (Royal Bath) dates during Nashik Kumbh 2027: August 20, September 3, September 17, October 2, and October 17, 2027. These are the most auspicious days for bathing in the Godavari River. Millions of devotees and Naga Sadhus participate in grand processions before taking the holy dip on these dates.",
      hi: "नाशिक कुंभ 2027 के दौरान पांच शाही स्नान तिथियां हैं: 20 अगस्त, 3 सितंबर, 17 सितंबर, 2 अक्टूबर और 17 अक्टूबर 2027। ये गोदावरी नदी में स्नान के लिए सबसे शुभ दिन हैं। इन तिथियों पर लाखों श्रद्धालु और नागा साधु भव्य जुलूस में भाग लेकर पवित्र स्नान करते हैं।",
      mr: "नाशिक कुंभ 2027 दरम्यान पाच शाही स्नान तारखा आहेत: 20 ऑगस्ट, 3 सप्टेंबर, 17 सप्टेंबर, 2 ऑक्टोबर आणि 17 ऑक्टोबर 2027. हे गोदावरी नदीत स्नान करण्यासाठी सर्वात शुभ दिवस आहेत. या तारखांना लाखो भाविक आणि नागा साधू भव्य मिरवणुकीत सहभागी होऊन पवित्र स्नान करतात.",
    },
    relatedTopics: ["kumbh-dates", "sacred-ghats", "naga-sadhus"],
    pageLink: "/dates",
    emoji: "🛕",
  },

  // 4 ── How to reach Nashik ───────────────────────────────────
  {
    id: "how-to-reach",
    keywords: {
      en: ["how to reach", "travel", "train", "flight", "bus", "transport", "nashik road", "getting there"],
      hi: ["कैसे पहुंचें", "यात्रा", "ट्रेन", "फ्लाइट", "बस"],
      mr: ["कसे पोहोचायचे", "प्रवास", "ट्रेन", "विमान", "बस"],
    },
    question: {
      en: "How do I reach Nashik?",
      hi: "नाशिक कैसे पहुंचें?",
      mr: "नाशिकला कसे पोहोचायचे?",
    },
    answer: {
      en: "Nashik is well-connected by all major modes of transport. By train, Nashik Road railway station is the nearest railhead with regular services from across India. By air, the closest major airport is Mumbai's Chhatrapati Shivaji International Airport (CSIA), about 170 km away. By road, Nashik is roughly 3-4 hours from Mumbai via NH-3, and state transport buses run frequently from major cities in Maharashtra.",
      hi: "नाशिक सभी प्रमुख परिवहन साधनों से अच्छी तरह जुड़ा हुआ है। ट्रेन से, नाशिक रोड रेलवे स्टेशन निकटतम रेलहेड है जहां पूरे भारत से नियमित सेवाएं उपलब्ध हैं। हवाई मार्ग से, निकटतम प्रमुख हवाई अड्डा मुंबई का छत्रपति शिवाजी अंतरराष्ट्रीय हवाई अड्डा (CSIA) है, जो लगभग 170 किमी दूर है। सड़क मार्ग से, नाशिक NH-3 के माध्यम से मुंबई से लगभग 3-4 घंटे की दूरी पर है।",
      mr: "नाशिक सर्व प्रमुख वाहतूक साधनांनी चांगले जोडलेले आहे. रेल्वेने, नाशिक रोड रेल्वे स्थानक हे सर्वात जवळचे रेल्वे स्थानक आहे जिथे संपूर्ण भारतातून नियमित सेवा उपलब्ध आहेत. विमानाने, सर्वात जवळचे मुख्य विमानतळ मुंबईचे छत्रपती शिवाजी आंतरराष्ट्रीय विमानतळ (CSIA) आहे, जे सुमारे 170 किमी अंतरावर आहे. रस्त्याने, नाशिक NH-3 द्वारे मुंबईपासून सुमारे 3-4 तासांच्या अंतरावर आहे.",
    },
    relatedTopics: ["accommodation", "kumbh-dates", "weather"],
    pageLink: "/guide",
    emoji: "🚂",
  },

  // 5 ── Accommodation ─────────────────────────────────────────
  {
    id: "accommodation",
    keywords: {
      en: ["stay", "hotel", "accommodation", "where to stay", "dharamshala", "tent city", "lodge", "booking"],
      hi: ["कहां रुकें", "होटल", "धर्मशाला", "टेंट सिटी", "आवास"],
      mr: ["कुठे राहायचे", "हॉटेल", "धर्मशाळा", "टेंट सिटी", "निवास"],
    },
    question: {
      en: "Where can I stay during Kumbh Mela?",
      hi: "कुंभ मेले के दौरान कहां रुकें?",
      mr: "कुंभमेळ्यादरम्यान कुठे राहायचे?",
    },
    answer: {
      en: "There are several accommodation options during Kumbh Mela. You can choose from hotels and guesthouses in Nashik city, traditional dharamshalas (pilgrim rest houses), government-organized tent cities near the ghats, or camps set up by various akhadas. Since millions of visitors are expected, it is highly recommended to book your accommodation well in advance, especially if you plan to visit during the Shahi Snan dates.",
      hi: "कुंभ मेले के दौरान ठहरने के कई विकल्प उपलब्ध हैं। आप नाशिक शहर में होटल और गेस्टहाउस, पारंपरिक धर्मशालाएं, घाटों के पास सरकार द्वारा आयोजित टेंट सिटी, या विभिन्न अखाड़ों द्वारा लगाए गए शिविरों में रुक सकते हैं। लाखों आगंतुकों की अपेक्षा है, इसलिए अपना आवास पहले से बुक करने की अत्यधिक सलाह दी जाती है, खासकर शाही स्नान तिथियों के दौरान।",
      mr: "कुंभमेळ्यादरम्यान राहण्याचे अनेक पर्याय उपलब्ध आहेत. तुम्ही नाशिक शहरातील हॉटेल्स आणि गेस्टहाउस, पारंपरिक धर्मशाळा, घाटांजवळ सरकारने आयोजित केलेली टेंट सिटी किंवा विविध अखाड्यांनी उभारलेल्या शिबिरांमध्ये राहू शकता. लाखो अभ्यागत अपेक्षित असल्याने, विशेषतः शाही स्नानाच्या तारखांदरम्यान, तुमची निवासव्यवस्था आधीच बुक करण्याची अत्यंत शिफारस केली जाते.",
    },
    relatedTopics: ["how-to-reach", "kumbh-dates", "what-to-carry"],
    pageLink: "/guide",
    emoji: "🏨",
  },

  // 6 ── Sacred Ghats ──────────────────────────────────────────
  {
    id: "sacred-ghats",
    keywords: {
      en: ["ghats", "ram kund", "godavari", "bathing place", "panchavati", "kapaleshwar", "holy place"],
      hi: ["घाट", "राम कुंड", "गोदावरी", "पंचवटी", "कपालेश्वर"],
      mr: ["घाट", "रामकुंड", "गोदावरी", "पंचवटी", "कपालेश्वर"],
    },
    question: {
      en: "Which are the sacred ghats in Nashik?",
      hi: "नाशिक में पवित्र घाट कौन से हैं?",
      mr: "नाशिकमधील पवित्र घाट कोणते आहेत?",
    },
    answer: {
      en: "Ram Kund is the holiest ghat in Nashik, believed to be the spot where Lord Rama bathed during his exile. The Godavari Ghats are the main venues for Shahi Snan processions and ritual bathing. Nearby, you will find the ancient Kapaleshwar Temple dedicated to Lord Shiva, and the sacred Panchavati area where Lord Rama is said to have lived during his 14-year exile.",
      hi: "राम कुंड नाशिक का सबसे पवित्र घाट है, माना जाता है कि यह वह स्थान है जहां भगवान राम ने अपने वनवास के दौरान स्नान किया था। गोदावरी घाट शाही स्नान जुलूसों और धार्मिक स्नान के मुख्य स्थल हैं। पास ही भगवान शिव को समर्पित प्राचीन कपालेश्वर मंदिर और पवित्र पंचवटी क्षेत्र है, जहां भगवान राम 14 वर्षों के वनवास के दौरान रहे थे।",
      mr: "रामकुंड हा नाशिकमधील सर्वात पवित्र घाट आहे, जिथे भगवान रामांनी वनवासात स्नान केले होते असे मानले जाते. गोदावरी घाट हे शाही स्नान मिरवणुका आणि धार्मिक स्नानाचे मुख्य ठिकाण आहेत. जवळच भगवान शिवाला समर्पित प्राचीन कपालेश्वर मंदिर आणि पवित्र पंचवटी परिसर आहे, जिथे भगवान राम 14 वर्षांच्या वनवासात राहिले होते.",
    },
    relatedTopics: ["shahi-snan", "trimbakeshwar", "kumbh-what"],
    pageLink: "/ghats",
    emoji: "🏞️",
  },

  // 7 ── What to carry ─────────────────────────────────────────
  {
    id: "what-to-carry",
    keywords: {
      en: ["what to carry", "packing", "essentials", "checklist", "bring", "prepare", "things to carry"],
      hi: ["क्या लाएं", "सामान", "जरूरी चीजें", "तैयारी"],
      mr: ["काय आणायचे", "सामान", "आवश्यक वस्तू", "तयारी"],
    },
    question: {
      en: "What should I carry to Kumbh Mela?",
      hi: "कुंभ मेले में क्या लेकर जाएं?",
      mr: "कुंभमेळ्यासाठी काय आणायचे?",
    },
    answer: {
      en: "Here is a handy checklist for Kumbh Mela: carry a valid ID proof (Aadhaar or passport), comfortable cotton clothes, a towel for bathing at the ghats, a reusable water bottle, any personal medicines, some cash (ATMs may be crowded), a power bank for your phone, sturdy walking shoes, and an umbrella or raincoat since the monsoon season overlaps. Travel light but prepared!",
      hi: "कुंभ मेले के लिए एक उपयोगी सूची: वैध पहचान पत्र (आधार या पासपोर्ट), आरामदायक सूती कपड़े, घाट पर स्नान के लिए तौलिया, पुन: प्रयोग योग्य पानी की बोतल, व्यक्तिगत दवाइयां, कुछ नकदी (ATM पर भीड़ हो सकती है), फोन के लिए पावर बैंक, मजबूत पैदल चलने वाले जूते, और छाता या रेनकोट क्योंकि मानसून का मौसम होता है। हल्का सामान लेकिन तैयारी पूरी रखें!",
      mr: "कुंभमेळ्यासाठी उपयुक्त यादी: वैध ओळखपत्र (आधार किंवा पासपोर्ट), आरामदायक सुती कपडे, घाटावर स्नानासाठी टॉवेल, पुन्हा वापरता येणारी पाण्याची बाटली, वैयक्तिक औषधे, काही रोख रक्कम (ATM वर गर्दी असू शकते), फोनसाठी पावर बँक, मजबूत चालण्याचे बूट आणि छत्री किंवा रेनकोट कारण पावसाळा असतो. हलके सामान पण पूर्ण तयारी ठेवा!",
    },
    relatedTopics: ["weather", "safety", "dos-donts"],
    pageLink: "/guide",
    emoji: "🎒",
  },

  // 8 ── Is it free? ───────────────────────────────────────────
  {
    id: "is-free",
    keywords: {
      en: ["free", "cost", "price", "entry fee", "ticket", "bhandara", "langar", "expense"],
      hi: ["मुफ्त", "कीमत", "शुल्क", "भंडारा", "लंगर", "खर्च"],
      mr: ["मोफत", "किंमत", "शुल्क", "भंडारा", "लंगर", "खर्च"],
    },
    question: {
      en: "Is Kumbh Mela free to attend?",
      hi: "क्या कुंभ मेला मुफ्त है?",
      mr: "कुंभमेळा मोफत आहे का?",
    },
    answer: {
      en: "Yes, Kumbh Mela is completely free to attend! There is no entry fee or ticket required. Bathing at the sacred ghats is free for everyone. Many organizations and akhadas run free bhandaras (community meals) and langars throughout the festival, so you can eat without spending a rupee. Free medical camps and first-aid stations are also set up across the Kumbh area.",
      hi: "हां, कुंभ मेला पूरी तरह से मुफ्त है! कोई प्रवेश शुल्क या टिकट नहीं लगता। पवित्र घाटों पर स्नान सभी के लिए मुफ्त है। कई संगठन और अखाड़े पूरे त्योहार में मुफ्त भंडारे और लंगर चलाते हैं, जिससे आप बिना एक पैसा खर्च किए खाना खा सकते हैं। कुंभ क्षेत्र में मुफ्त चिकित्सा शिविर और प्राथमिक उपचार केंद्र भी लगाए जाते हैं।",
      mr: "होय, कुंभमेळा पूर्णपणे मोफत आहे! कोणतेही प्रवेश शुल्क किंवा तिकीट लागत नाही. पवित्र घाटांवर स्नान सर्वांसाठी मोफत आहे. अनेक संस्था आणि अखाडे संपूर्ण मेळ्यात मोफत भंडारा आणि लंगर चालवतात, त्यामुळे तुम्ही एक रुपयाही खर्च न करता जेवू शकता. कुंभ परिसरात मोफत वैद्यकीय शिबिरे आणि प्रथमोपचार केंद्रेही उभारली जातात.",
    },
    relatedTopics: ["food", "accommodation", "what-to-carry"],
    emoji: "🆓",
  },

  // 9 ── Safety ────────────────────────────────────────────────
  {
    id: "safety",
    keywords: {
      en: ["safety", "security", "safe", "police", "cctv", "crowd", "hospital", "war room"],
      hi: ["सुरक्षा", "पुलिस", "भीड़", "अस्पताल", "सीसीटीवी"],
      mr: ["सुरक्षा", "पोलीस", "गर्दी", "रुग्णालय", "सीसीटीव्ही"],
    },
    question: {
      en: "Is Kumbh Mela safe to visit?",
      hi: "क्या कुंभ मेला जाना सुरक्षित है?",
      mr: "कुंभमेळ्याला जाणे सुरक्षित आहे का?",
    },
    answer: {
      en: "Kumbh Mela has extensive safety arrangements in place. AI-powered CCTV surveillance cameras are installed across the area, and a dedicated Kumbh War Room monitors crowd movement in real time. Mobile hospitals, ambulances, and first-aid stations are available throughout the venue. A large police force is deployed for crowd management. Just follow official crowd guidelines, stay with your group, and keep your belongings close.",
      hi: "कुंभ मेले में व्यापक सुरक्षा व्यवस्था की जाती है। पूरे क्षेत्र में AI-संचालित CCTV निगरानी कैमरे लगाए जाते हैं, और एक समर्पित कुंभ वॉर रूम भीड़ की गतिविधियों पर नजर रखता है। मोबाइल अस्पताल, एम्बुलेंस और प्राथमिक उपचार केंद्र पूरे स्थल पर उपलब्ध रहते हैं। भीड़ प्रबंधन के लिए बड़ी संख्या में पुलिस तैनात की जाती है। बस आधिकारिक भीड़ दिशानिर्देशों का पालन करें और अपना सामान अपने पास रखें।",
      mr: "कुंभमेळ्यात व्यापक सुरक्षा व्यवस्था केली जाते. संपूर्ण परिसरात AI-आधारित CCTV पाळत ठेवणारे कॅमेरे बसवले जातात आणि एक समर्पित कुंभ वॉर रूम गर्दीच्या हालचालींवर लक्ष ठेवतो. मोबाइल रुग्णालये, रुग्णवाहिका आणि प्रथमोपचार केंद्रे संपूर्ण ठिकाणी उपलब्ध असतात. गर्दी व्यवस्थापनासाठी मोठ्या प्रमाणात पोलीस तैनात केले जातात. फक्त अधिकृत गर्दी मार्गदर्शक सूचनांचे पालन करा आणि आपले सामान जवळ ठेवा.",
    },
    relatedTopics: ["emergency", "dos-donts", "what-to-carry"],
    pageLink: "/guide",
    emoji: "🛡️",
  },

  // 10 ── Naga Sadhus ──────────────────────────────────────────
  {
    id: "naga-sadhus",
    keywords: {
      en: ["naga sadhu", "naga sadhus", "warrior monks", "ash", "akhada", "renunciation", "ascetic"],
      hi: ["नागा साधु", "योद्धा संन्यासी", "भस्म", "अखाड़ा"],
      mr: ["नागा साधू", "योद्धा संन्यासी", "भस्म", "अखाडा"],
    },
    question: {
      en: "Who are Naga Sadhus?",
      hi: "नागा साधु कौन हैं?",
      mr: "नागा साधू कोण आहेत?",
    },
    answer: {
      en: "Naga Sadhus are warrior-ascetic monks who have renounced all worldly possessions and attachments. They are easily recognized by their ash-smeared bodies and minimal clothing. During Kumbh Mela, they hold the honour of leading the Shahi Snan processions before anyone else bathes. They belong to one of the 13 traditional Akhadas (monastic orders) and are a fascinating and deeply revered part of Hindu spiritual tradition.",
      hi: "नागा साधु योद्धा-तपस्वी संन्यासी हैं जिन्होंने सभी सांसारिक संपत्ति और मोह का त्याग कर दिया है। उन्हें उनके भस्म-लिप्त शरीर और न्यूनतम वस्त्रों से आसानी से पहचाना जा सकता है। कुंभ मेले के दौरान, उन्हें किसी और से पहले शाही स्नान जुलूस का नेतृत्व करने का सम्मान प्राप्त होता है। वे 13 पारंपरिक अखाड़ों में से एक से संबंधित हैं और हिंदू आध्यात्मिक परंपरा का एक अत्यंत सम्मानित हिस्सा हैं।",
      mr: "नागा साधू हे योद्धा-तपस्वी संन्यासी आहेत ज्यांनी सर्व सांसारिक संपत्ती आणि मोहमायेचा त्याग केला आहे. त्यांना त्यांच्या भस्म-लिप्त शरीरावरून आणि अत्यल्प वस्त्रांवरून सहज ओळखता येते. कुंभमेळ्यात, इतर कोणाही आधी शाही स्नान मिरवणुकीचे नेतृत्व करण्याचा मान त्यांना मिळतो. ते 13 पारंपरिक अखाड्यांपैकी एकाशी संबंधित असतात आणि हिंदू आध्यात्मिक परंपरेचा एक अत्यंत आदरणीय भाग आहेत.",
    },
    relatedTopics: ["shahi-snan", "akhadas-events", "kumbh-what"],
    pageLink: "/naga-sadhus",
    emoji: "🙇",
  },

  // 11 ── Emergency contacts ───────────────────────────────────
  {
    id: "emergency",
    keywords: {
      en: ["emergency", "help", "police", "ambulance", "fire", "sos", "women helpline", "contact number"],
      hi: ["आपातकाल", "मदद", "पुलिस", "एम्बुलेंस", "आग", "महिला हेल्पलाइन"],
      mr: ["आणीबाणी", "मदत", "पोलीस", "रुग्णवाहिका", "आग", "महिला हेल्पलाइन"],
    },
    question: {
      en: "What are the emergency contact numbers?",
      hi: "आपातकालीन संपर्क नंबर क्या हैं?",
      mr: "आणीबाणी संपर्क क्रमांक कोणते आहेत?",
    },
    answer: {
      en: "Here are the key emergency numbers for Kumbh Mela: Police - 112, Ambulance - 108, Fire Brigade - 101, Women Helpline - 1091. Save these numbers on your phone before arriving. You can also use the SOS button on this website for quick emergency assistance. Stay calm, reach a safe spot, and call for help immediately if needed.",
      hi: "कुंभ मेले के लिए प्रमुख आपातकालीन नंबर: पुलिस - 112, एम्बुलेंस - 108, दमकल - 101, महिला हेल्पलाइन - 1091। पहुंचने से पहले ये नंबर अपने फोन में सेव कर लें। आप त्वरित आपातकालीन सहायता के लिए इस वेबसाइट पर SOS बटन का भी उपयोग कर सकते हैं। शांत रहें, सुरक्षित स्थान पर पहुंचें और जरूरत पड़ने पर तुरंत मदद के लिए कॉल करें।",
      mr: "कुंभमेळ्यासाठी महत्त्वाचे आणीबाणी क्रमांक: पोलीस - 112, रुग्णवाहिका - 108, अग्निशमन दल - 101, महिला हेल्पलाइन - 1091. पोहोचण्यापूर्वी हे क्रमांक तुमच्या फोनमध्ये सेव्ह करा. तुम्ही त्वरित आणीबाणी मदतीसाठी या वेबसाइटवरील SOS बटण देखील वापरू शकता. शांत राहा, सुरक्षित ठिकाणी जा आणि गरज पडल्यास लगेच मदतीसाठी कॉल करा.",
    },
    relatedTopics: ["safety", "dos-donts"],
    emoji: "🚨",
  },

  // 12 ── Food & drink ─────────────────────────────────────────
  {
    id: "food",
    keywords: {
      en: ["food", "eat", "drink", "bhandara", "restaurant", "vegetarian", "cuisine", "water"],
      hi: ["खाना", "भोजन", "भंडारा", "शाकाहारी", "पानी", "रेस्तरां"],
      mr: ["जेवण", "खाणे", "भंडारा", "शाकाहारी", "पाणी", "रेस्टॉरंट"],
    },
    question: {
      en: "What about food and drinking water?",
      hi: "खाने-पीने की क्या व्यवस्था है?",
      mr: "जेवण आणि पिण्याच्या पाण्याची व्यवस्था कशी आहे?",
    },
    answer: {
      en: "Vegetarian food is widely available throughout the Kumbh Mela area. Many organizations and akhadas run free bhandaras (community kitchens) serving wholesome meals to all visitors. You can also try local Nashik cuisine at restaurants and food stalls nearby. Always carry a reusable water bottle and drink only filtered or bottled water. It is best to avoid street food during peak heat to prevent stomach issues.",
      hi: "कुंभ मेला क्षेत्र में शाकाहारी भोजन व्यापक रूप से उपलब्ध है। कई संगठन और अखाड़े सभी आगंतुकों को पौष्टिक भोजन परोसने वाले मुफ्त भंडारे चलाते हैं। आप आसपास के रेस्तरां और फूड स्टॉल पर स्थानीय नाशिक व्यंजन भी आजमा सकते हैं। हमेशा पुन: प्रयोग योग्य पानी की बोतल रखें और केवल फिल्टर्ड या बोतलबंद पानी पिएं। पेट की समस्याओं से बचने के लिए तेज गर्मी में स्ट्रीट फूड से बचना सबसे अच्छा है।",
      mr: "कुंभमेळा परिसरात शाकाहारी जेवण मोठ्या प्रमाणात उपलब्ध आहे. अनेक संस्था आणि अखाडे सर्व अभ्यागतांना पौष्टिक जेवण देणारे मोफत भंडारे चालवतात. तुम्ही जवळपासच्या रेस्टॉरंट आणि फूड स्टॉलवर स्थानिक नाशिक पदार्थांचा आस्वाद घेऊ शकता. नेहमी पुन्हा वापरता येणारी पाण्याची बाटली सोबत ठेवा आणि फक्त फिल्टर केलेले किंवा बाटलीबंद पाणी प्या. पोटाच्या तक्रारी टाळण्यासाठी कडक उन्हात रस्त्यावरचे खाणे टाळणे चांगले.",
    },
    relatedTopics: ["is-free", "what-to-carry", "weather"],
    emoji: "🍽️",
  },

  // 13 ── Weather ──────────────────────────────────────────────
  {
    id: "weather",
    keywords: {
      en: ["weather", "rain", "temperature", "monsoon", "climate", "umbrella", "humidity"],
      hi: ["मौसम", "बारिश", "तापमान", "मानसून", "छाता"],
      mr: ["हवामान", "पाऊस", "तापमान", "मान्सून", "छत्री"],
    },
    question: {
      en: "What will the weather be like?",
      hi: "मौसम कैसा रहेगा?",
      mr: "हवामान कसे असेल?",
    },
    answer: {
      en: "The main Kumbh bathing season falls during the monsoon months of August and September, so expect rain. Carry an umbrella or raincoat at all times. Temperatures typically range from 22 to 32 degrees Celsius, and humidity can be quite high. Wear light, breathable cotton clothing and stay hydrated. Waterproof bags for your phone and valuables are a great idea during this season.",
      hi: "कुंभ का मुख्य स्नान मौसम अगस्त और सितंबर के मानसून महीनों में पड़ता है, इसलिए बारिश की उम्मीद रखें। हमेशा छाता या रेनकोट साथ रखें। तापमान आमतौर पर 22 से 32 डिग्री सेल्सियस के बीच रहता है और उमस काफी ज्यादा हो सकती है। हल्के, आरामदायक सूती कपड़े पहनें और पानी पीते रहें। इस मौसम में फोन और कीमती सामान के लिए वॉटरप्रूफ बैग रखना अच्छा विचार है।",
      mr: "कुंभाचा मुख्य स्नान हंगाम ऑगस्ट आणि सप्टेंबरच्या मान्सून महिन्यांत येतो, त्यामुळे पावसाची अपेक्षा ठेवा. नेहमी छत्री किंवा रेनकोट सोबत ठेवा. तापमान सामान्यतः 22 ते 32 अंश सेल्सिअस दरम्यान असते आणि आर्द्रता खूप जास्त असू शकते. हलके, आरामदायक सुती कपडे घाला आणि भरपूर पाणी प्या. या हंगामात फोन आणि मौल्यवान वस्तूंसाठी वॉटरप्रूफ बॅग ठेवणे उत्तम कल्पना आहे.",
    },
    relatedTopics: ["what-to-carry", "kumbh-dates", "dos-donts"],
    pageLink: "/guide",
    emoji: "🌧️",
  },

  // 14 ── Language & culture ───────────────────────────────────
  {
    id: "language-culture",
    keywords: {
      en: ["language", "culture", "marathi", "hindi", "english", "dress code", "etiquette", "customs"],
      hi: ["भाषा", "संस्कृति", "मराठी", "शिष्टाचार", "पोशाक"],
      mr: ["भाषा", "संस्कृती", "मराठी", "शिष्टाचार", "पोशाख"],
    },
    question: {
      en: "What language is spoken and what are the cultural norms?",
      hi: "कौन सी भाषा बोली जाती है और सांस्कृतिक नियम क्या हैं?",
      mr: "कोणती भाषा बोलली जाते आणि सांस्कृतिक नियम काय आहेत?",
    },
    answer: {
      en: "Marathi is the local language in Nashik, but Hindi is widely understood and spoken by most people. English is commonly used in tourist areas, hotels, and by younger locals. When visiting temples, always remove your shoes before entering. Dress modestly - cover your shoulders and knees, especially at religious sites. Showing respect to elders and sadhus is an important part of the culture here.",
      hi: "नाशिक में स्थानीय भाषा मराठी है, लेकिन हिंदी व्यापक रूप से समझी और बोली जाती है। पर्यटक क्षेत्रों, होटलों में और युवा स्थानीय लोगों द्वारा अंग्रेजी आमतौर पर बोली जाती है। मंदिरों में जाते समय हमेशा प्रवेश से पहले जूते उतारें। शालीन वस्त्र पहनें - विशेष रूप से धार्मिक स्थलों पर कंधे और घुटने ढके रखें। बड़ों और साधुओं का सम्मान करना यहां की संस्कृति का महत्वपूर्ण हिस्सा है।",
      mr: "नाशिकमध्ये स्थानिक भाषा मराठी आहे, पण हिंदी मोठ्या प्रमाणावर समजली आणि बोलली जाते. पर्यटन क्षेत्रांमध्ये, हॉटेल्समध्ये आणि तरुण स्थानिकांकडून इंग्रजी सामान्यपणे वापरली जाते. मंदिरांना भेट देताना नेहमी आत जाण्यापूर्वी चपला काढा. नम्रपणे कपडे घाला - विशेषतः धार्मिक ठिकाणी खांदे आणि गुडघे झाकलेले ठेवा. वडीलधाऱ्यांचा आणि साधूंचा आदर करणे ही इथल्या संस्कृतीचा महत्त्वाचा भाग आहे.",
    },
    relatedTopics: ["dos-donts", "what-to-carry", "sacred-ghats"],
    emoji: "🗣️",
  },

  // 15 ── Trimbakeshwar ────────────────────────────────────────
  {
    id: "trimbakeshwar",
    keywords: {
      en: ["trimbakeshwar", "jyotirlinga", "brahmagiri", "godavari origin", "shiva temple", "trimbak"],
      hi: ["त्र्यंबकेश्वर", "ज्योतिर्लिंग", "ब्रह्मगिरि", "गोदावरी उद्गम"],
      mr: ["त्र्यंबकेश्वर", "ज्योतिर्लिंग", "ब्रह्मगिरी", "गोदावरी उगम"],
    },
    question: {
      en: "Tell me about Trimbakeshwar Temple.",
      hi: "त्र्यंबकेश्वर मंदिर के बारे में बताइए।",
      mr: "त्र्यंबकेश्वर मंदिराबद्दल सांगा.",
    },
    answer: {
      en: "Trimbakeshwar is one of the 12 sacred Jyotirlingas dedicated to Lord Shiva, located about 30 km from Nashik city. It sits at the foot of Brahmagiri Hill, which is the origin point of the holy Godavari River. This makes it one of the most important sites during Kumbh Mela. The temple has stunning Hemadpanthi architecture and is a must-visit for every pilgrim coming to Nashik Kumbh.",
      hi: "त्र्यंबकेश्वर भगवान शिव को समर्पित 12 पवित्र ज्योतिर्लिंगों में से एक है, जो नाशिक शहर से लगभग 30 किमी दूर स्थित है। यह ब्रह्मगिरि पहाड़ी की तलहटी में है, जो पवित्र गोदावरी नदी का उद्गम स्थल है। यह इसे कुंभ मेले के दौरान सबसे महत्वपूर्ण स्थलों में से एक बनाता है। मंदिर में सुंदर हेमाडपंथी वास्तुकला है और नाशिक कुंभ में आने वाले हर तीर्थयात्री को इसे जरूर देखना चाहिए।",
      mr: "त्र्यंबकेश्वर हे भगवान शिवाला समर्पित 12 पवित्र ज्योतिर्लिंगांपैकी एक आहे, जे नाशिक शहरापासून सुमारे 30 किमी अंतरावर आहे. हे ब्रह्मगिरी टेकडीच्या पायथ्याशी आहे, जे पवित्र गोदावरी नदीचे उगमस्थान आहे. यामुळे ते कुंभमेळ्यातील सर्वात महत्त्वाच्या ठिकाणांपैकी एक आहे. मंदिरात सुंदर हेमाडपंथी वास्तुकला आहे आणि नाशिक कुंभाला येणाऱ्या प्रत्येक भाविकाने हे आवर्जून भेट द्यावे.",
    },
    relatedTopics: ["sacred-ghats", "kumbh-what", "how-to-reach"],
    pageLink: "/about",
    emoji: "🕉️",
  },

  // 16 ── Events & Akhadas ─────────────────────────────────────
  {
    id: "akhadas-events",
    keywords: {
      en: ["events", "akhada", "akhadas", "procession", "satsang", "aarti", "yoga", "cultural", "program"],
      hi: ["कार्यक्रम", "अखाड़ा", "जुलूस", "सत्संग", "आरती", "योग"],
      mr: ["कार्यक्रम", "अखाडा", "मिरवणूक", "सत्संग", "आरती", "योग"],
    },
    question: {
      en: "What events happen during Kumbh Mela?",
      hi: "कुंभ मेले में कौन से कार्यक्रम होते हैं?",
      mr: "कुंभमेळ्यात कोणते कार्यक्रम होतात?",
    },
    answer: {
      en: "Kumbh Mela is packed with spiritual and cultural events. The grand Shahi Snan processions led by Naga Sadhus are the highlight. Daily satsangs (spiritual discourses), Ganga Aarti ceremonies at the ghats, yoga camps, and cultural performances take place throughout the festival. There are 13 traditional Akhadas (monastic orders) that set up camps and organize their own events. It is truly a once-in-a-lifetime cultural experience!",
      hi: "कुंभ मेला आध्यात्मिक और सांस्कृतिक कार्यक्रमों से भरा होता है। नागा साधुओं के नेतृत्व में भव्य शाही स्नान जुलूस मुख्य आकर्षण हैं। दैनिक सत्संग, घाटों पर गंगा आरती समारोह, योग शिविर और सांस्कृतिक कार्यक्रम पूरे त्योहार में होते हैं। 13 पारंपरिक अखाड़े अपने शिविर लगाते हैं और अपने कार्यक्रम आयोजित करते हैं। यह सचमुच जीवन में एक बार का सांस्कृतिक अनुभव है!",
      mr: "कुंभमेळा आध्यात्मिक आणि सांस्कृतिक कार्यक्रमांनी भरलेला असतो. नागा साधूंच्या नेतृत्वाखालील भव्य शाही स्नान मिरवणुका हे मुख्य आकर्षण आहे. दररोज सत्संग, घाटांवर गंगा आरती समारंभ, योग शिबिरे आणि सांस्कृतिक कार्यक्रम संपूर्ण मेळ्यात होतात. 13 पारंपरिक अखाडे आपली शिबिरे उभारतात आणि स्वतःचे कार्यक्रम आयोजित करतात. हा खरोखरच आयुष्यातील एक अविस्मरणीय सांस्कृतिक अनुभव आहे!",
    },
    relatedTopics: ["naga-sadhus", "shahi-snan", "sacred-ghats"],
    pageLink: "/events",
    emoji: "🎪",
  },

  // 17 ── Photography rules ────────────────────────────────────
  {
    id: "photography",
    keywords: {
      en: ["photography", "camera", "photo", "drone", "video", "pictures", "filming"],
      hi: ["फोटोग्राफी", "कैमरा", "फोटो", "ड्रोन", "वीडियो"],
      mr: ["फोटोग्राफी", "कॅमेरा", "फोटो", "ड्रोन", "व्हिडिओ"],
    },
    question: {
      en: "What are the photography rules at Kumbh Mela?",
      hi: "कुंभ मेले में फोटोग्राफी के नियम क्या हैं?",
      mr: "कुंभमेळ्यात फोटोग्राफीचे नियम काय आहेत?",
    },
    answer: {
      en: "Personal cameras and smartphones are allowed at Kumbh Mela for photography. However, flying drones requires special permission from the authorities. Always respect the privacy of sadhus and other devotees - ask before taking close-up photos of people. Avoid photography during sacred rituals unless you have explicit consent. Being respectful with your camera will ensure a positive experience for everyone.",
      hi: "कुंभ मेले में फोटोग्राफी के लिए व्यक्तिगत कैमरे और स्मार्टफोन की अनुमति है। हालांकि, ड्रोन उड़ाने के लिए अधिकारियों से विशेष अनुमति आवश्यक है। साधुओं और अन्य श्रद्धालुओं की निजता का हमेशा सम्मान करें - लोगों की क्लोज-अप फोटो लेने से पहले पूछें। स्पष्ट सहमति के बिना पवित्र अनुष्ठानों के दौरान फोटोग्राफी से बचें। कैमरे का सम्मानपूर्ण उपयोग सभी के लिए अच्छा अनुभव सुनिश्चित करेगा।",
      mr: "कुंभमेळ्यात फोटोग्राफीसाठी वैयक्तिक कॅमेरे आणि स्मार्टफोनला परवानगी आहे. तथापि, ड्रोन उडवण्यासाठी अधिकाऱ्यांकडून विशेष परवानगी आवश्यक आहे. साधूंच्या आणि इतर भाविकांच्या गोपनीयतेचा नेहमी आदर करा - लोकांचे क्लोज-अप फोटो घेण्यापूर्वी विचारा. स्पष्ट संमतीशिवाय पवित्र विधी दरम्यान फोटोग्राफी टाळा. कॅमेऱ्याचा आदरपूर्ण वापर सर्वांसाठी चांगला अनुभव सुनिश्चित करेल.",
    },
    relatedTopics: ["dos-donts", "language-culture", "naga-sadhus"],
    emoji: "📸",
  },

  // 18 ── Dos and Don'ts ───────────────────────────────────────
  {
    id: "dos-donts",
    keywords: {
      en: ["dos", "donts", "rules", "tips", "guidelines", "advice", "mistakes", "etiquette"],
      hi: ["क्या करें", "क्या न करें", "नियम", "सुझाव", "दिशानिर्देश"],
      mr: ["काय करावे", "काय करू नये", "नियम", "सूचना", "मार्गदर्शक"],
    },
    question: {
      en: "What are the dos and don'ts at Kumbh Mela?",
      hi: "कुंभ मेले में क्या करें और क्या न करें?",
      mr: "कुंभमेळ्यात काय करावे आणि काय करू नये?",
    },
    answer: {
      en: "Dos: Always carry a valid ID proof, stay well hydrated, follow the official crowd flow directions, and keep your valuables secure. Don'ts: Do not litter at the ghats or river areas, do not push or rush in crowded areas, do not disrespect sadhus or take their photos without permission, and do not swim alone in the river. Following these simple guidelines will help you have a safe and meaningful Kumbh experience.",
      hi: "क्या करें: हमेशा वैध पहचान पत्र रखें, पानी पीते रहें, आधिकारिक भीड़ प्रवाह दिशाओं का पालन करें, और अपनी कीमती चीजें सुरक्षित रखें। क्या न करें: घाटों या नदी क्षेत्रों में कूड़ा न फैलाएं, भीड़ वाले क्षेत्रों में धक्का-मुक्की न करें, साधुओं का अनादर न करें या बिना अनुमति के उनकी फोटो न लें, और अकेले नदी में तैरने न जाएं। इन सरल दिशानिर्देशों का पालन करने से आपका कुंभ अनुभव सुरक्षित और सार्थक होगा।",
      mr: "काय करावे: नेहमी वैध ओळखपत्र सोबत ठेवा, भरपूर पाणी प्या, अधिकृत गर्दी प्रवाह दिशांचे पालन करा आणि तुमच्या मौल्यवान वस्तू सुरक्षित ठेवा. काय करू नये: घाट किंवा नदी परिसरात कचरा टाकू नका, गर्दीच्या ठिकाणी ढकलू नका, साधूंचा अनादर करू नका किंवा परवानगीशिवाय त्यांचे फोटो घेऊ नका आणि एकट्याने नदीत पोहू नका. या सोप्या मार्गदर्शक सूचनांचे पालन केल्यास तुमचा कुंभ अनुभव सुरक्षित आणि अर्थपूर्ण होईल.",
    },
    relatedTopics: ["safety", "what-to-carry", "photography"],
    pageLink: "/guide",
    emoji: "✅",
  },
];

// ---------------------------------------------------------------------------
// Quick-start suggestion chips
// ---------------------------------------------------------------------------

export const quickStartChips: { topicId: string; label: I18nText }[] = [
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
];

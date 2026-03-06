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
  image?: string;
}

// ---------------------------------------------------------------------------
// 40 Knowledge-base topics
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
    image: "/images/gallery/kumbh-4.webp",
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
    image: "/images/gallery/kumbh-1.webp",
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
    image: "/images/godavari-ghats.webp",
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
    image: "/images/naga-sadhu.webp",
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
    image: "/images/gallery/kumbh-6.webp",
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
    image: "/images/gallery/kumbh-9.webp",
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
  // 19 ── Ram Kund Ghat ────────────────────────────────────────
  {
    id: "ghat-ramkund",
    keywords: {
      en: ["ram kund", "ramkund", "rama bathed", "holiest ghat", "asthi visarjan", "ashes immersion"],
      hi: ["राम कुंड", "रामकुंड", "राम स्नान", "अस्थि विसर्जन"],
      mr: ["रामकुंड", "राम स्नान", "अस्थी विसर्जन"],
    },
    question: {
      en: "Tell me about Ram Kund.",
      hi: "रामकुंड के बारे में बताइए।",
      mr: "रामकुंडाबद्दल सांगा.",
    },
    answer: {
      en: "Ram Kund is the holiest ghat in Nashik, located on the banks of the Godavari River. It is believed that Lord Rama bathed here during his 14-year exile. The kund is also a sacred site for Asthi Visarjan (immersion of ashes of the departed). During Kumbh Mela, it becomes the central point for the grand Shahi Snan processions. The ghat is open 24 hours and is free to visit.",
      hi: "रामकुंड नाशिक का सबसे पवित्र घाट है, जो गोदावरी नदी के तट पर स्थित है। माना जाता है कि भगवान राम ने अपने 14 वर्षों के वनवास के दौरान यहां स्नान किया था। यह कुंड अस्थि विसर्जन के लिए भी एक पवित्र स्थान है। कुंभ मेले के दौरान यह शाही स्नान जुलूसों का केंद्र बिंदु बन जाता है। घाट 24 घंटे खुला रहता है और प्रवेश मुफ्त है।",
      mr: "रामकुंड हा नाशिकमधील सर्वात पवित्र घाट आहे, जो गोदावरी नदीच्या काठावर आहे. भगवान रामांनी 14 वर्षांच्या वनवासात येथे स्नान केले असे मानले जाते. हा कुंड अस्थी विसर्जनासाठीही पवित्र स्थान आहे. कुंभमेळ्यात हे शाही स्नान मिरवणुकांचे केंद्रबिंदू बनते. घाट 24 तास खुला असतो आणि प्रवेश मोफत आहे.",
    },
    relatedTopics: ["sacred-ghats", "shahi-snan", "ghat-godavari"],
    pageLink: "/ghats",
    emoji: "🛕",
    image: "/images/ramkund.webp",
  },

  // 20 ── Godavari Ghats ──────────────────────────────────────
  {
    id: "ghat-godavari",
    keywords: {
      en: ["godavari ghat", "godavari ghats", "river ghat", "bathing ghat", "main ghat"],
      hi: ["गोदावरी घाट", "नदी घाट", "स्नान घाट"],
      mr: ["गोदावरी घाट", "नदी घाट", "स्नान घाट"],
    },
    question: {
      en: "Tell me about the Godavari Ghats.",
      hi: "गोदावरी घाट के बारे में बताइए।",
      mr: "गोदावरी घाटाबद्दल सांगा.",
    },
    answer: {
      en: "The Godavari Ghats stretch along the banks of the sacred Godavari River in Nashik. These ghats are the primary bathing venues during Kumbh Mela and host the grand Shahi Snan processions. The ghats are lined with ancient temples and offer a deeply spiritual atmosphere. During Kumbh, special facilities like changing rooms, drinking water stations, and medical aid are set up along the ghats for pilgrims.",
      hi: "गोदावरी घाट नाशिक में पवित्र गोदावरी नदी के किनारे फैले हुए हैं। ये घाट कुंभ मेले के दौरान मुख्य स्नान स्थल हैं और भव्य शाही स्नान जुलूसों की मेजबानी करते हैं। घाटों के किनारे प्राचीन मंदिर हैं और गहरा आध्यात्मिक वातावरण है। कुंभ के दौरान तीर्थयात्रियों के लिए चेंजिंग रूम, पेयजल स्टेशन और चिकित्सा सहायता जैसी विशेष सुविधाएं घाटों पर उपलब्ध कराई जाती हैं।",
      mr: "गोदावरी घाट नाशिकमध्ये पवित्र गोदावरी नदीच्या काठावर पसरलेले आहेत. हे घाट कुंभमेळ्यातील प्रमुख स्नान स्थळे आहेत आणि भव्य शाही स्नान मिरवणुकांचे आयोजन येथे होते. घाटांच्या बाजूला प्राचीन मंदिरे आहेत आणि गहन आध्यात्मिक वातावरण आहे. कुंभात भाविकांसाठी चेंजिंग रूम, पिण्याच्या पाण्याची ठिकाणे आणि वैद्यकीय मदत अशा विशेष सुविधा घाटांवर उपलब्ध करून दिल्या जातात.",
    },
    relatedTopics: ["ghat-ramkund", "shahi-snan", "ghat-panchavati"],
    pageLink: "/ghats",
    emoji: "🏞️",
    image: "/images/godavari-ghats.webp",
  },

  // 21 ── Kapaleshwar Temple ──────────────────────────────────
  {
    id: "ghat-kapaleshwar",
    keywords: {
      en: ["kapaleshwar", "shiva temple", "ancient temple", "kapaleshwar temple"],
      hi: ["कपालेश्वर", "शिव मंदिर", "प्राचीन मंदिर"],
      mr: ["कपालेश्वर", "शिव मंदिर", "प्राचीन मंदिर"],
    },
    question: {
      en: "Tell me about Kapaleshwar Temple.",
      hi: "कपालेश्वर मंदिर के बारे में बताइए।",
      mr: "कपालेश्वर मंदिराबद्दल सांगा.",
    },
    answer: {
      en: "Kapaleshwar Temple is one of the oldest Shiva temples in Nashik, located near the Godavari ghats. The temple has beautiful carved stone architecture and is an important pilgrimage site during Kumbh Mela. It is believed to be connected to the legend of Lord Shiva and the origin of the Godavari River. The temple is open daily from 5:30 AM to 9:30 PM and there is no entry fee.",
      hi: "कपालेश्वर मंदिर गोदावरी घाटों के पास स्थित नाशिक के सबसे पुराने शिव मंदिरों में से एक है। मंदिर में सुंदर नक्काशीदार पत्थर की वास्तुकला है और कुंभ मेले के दौरान यह एक महत्वपूर्ण तीर्थस्थल है। माना जाता है कि यह भगवान शिव और गोदावरी नदी की उत्पत्ति की कथा से जुड़ा है। मंदिर प्रतिदिन सुबह 5:30 बजे से रात 9:30 बजे तक खुला रहता है और कोई प्रवेश शुल्क नहीं है।",
      mr: "कपालेश्वर मंदिर हे गोदावरी घाटांजवळ असलेले नाशिकमधील सर्वात जुन्या शिव मंदिरांपैकी एक आहे. मंदिरात सुंदर कोरीव दगडी वास्तुकला आहे आणि कुंभमेळ्यात हे एक महत्त्वाचे तीर्थक्षेत्र आहे. हे भगवान शिव आणि गोदावरी नदीच्या उगमाच्या कथेशी जोडलेले मानले जाते. मंदिर दररोज सकाळी 5:30 ते रात्री 9:30 पर्यंत खुले असते आणि कोणतेही प्रवेश शुल्क नाही.",
    },
    relatedTopics: ["sacred-ghats", "trimbakeshwar", "ghat-ramkund"],
    pageLink: "/ghats",
    emoji: "🕉️",
    image: "/images/kapaleshwar.webp",
  },

  // 22 ── Panchavati ──────────────────────────────────────────
  {
    id: "ghat-panchavati",
    keywords: {
      en: ["panchavati", "kalaram", "kalaram temple", "sita gufa", "sita cave", "rama exile"],
      hi: ["पंचवटी", "कालाराम", "कालाराम मंदिर", "सीता गुफा"],
      mr: ["पंचवटी", "काळाराम", "काळाराम मंदिर", "सीता गुफा"],
    },
    question: {
      en: "Tell me about Panchavati.",
      hi: "पंचवटी के बारे में बताइए।",
      mr: "पंचवटीबद्दल सांगा.",
    },
    answer: {
      en: "Panchavati is the sacred area in Nashik where Lord Rama, Sita, and Lakshmana are believed to have lived during their 14-year exile. The area is home to the famous Kalaram Temple (Black Rama Temple) with its stunning architecture. Nearby is Sita Gufa (Sita's Cave), where Sita is said to have been abducted by Ravana. Panchavati is a must-visit area during Kumbh Mela and is walking distance from Ram Kund.",
      hi: "पंचवटी नाशिक का वह पवित्र क्षेत्र है जहां भगवान राम, सीता और लक्ष्मण अपने 14 वर्षों के वनवास के दौरान रहे थे। यह क्षेत्र प्रसिद्ध कालाराम मंदिर (काले राम मंदिर) का घर है जिसमें शानदार वास्तुकला है। पास में सीता गुफा है, जहां से रावण ने सीता का अपहरण किया था। पंचवटी कुंभ मेले के दौरान अवश्य देखने योग्य क्षेत्र है और रामकुंड से पैदल दूरी पर है।",
      mr: "पंचवटी हे नाशिकमधील पवित्र क्षेत्र आहे जिथे भगवान राम, सीता आणि लक्ष्मण 14 वर्षांच्या वनवासात राहिले होते. या परिसरात प्रसिद्ध काळाराम मंदिर आहे ज्यात अप्रतिम वास्तुकला आहे. जवळच सीता गुफा आहे, जिथून रावणाने सीतेचे अपहरण केले होते. पंचवटी कुंभमेळ्यात आवर्जून भेट द्यावे असे ठिकाण आहे आणि रामकुंडापासून चालत जाण्याच्या अंतरावर आहे.",
    },
    relatedTopics: ["ghat-ramkund", "sacred-ghats", "kumbh-what"],
    pageLink: "/ghats",
    emoji: "🌳",
    image: "/images/panchavati.webp",
  },

  // 23 ── Ganga Aarti ─────────────────────────────────────────
  {
    id: "ganga-aarti",
    keywords: {
      en: ["ganga aarti", "aarti", "evening aarti", "river aarti", "prayer ceremony", "godavari aarti"],
      hi: ["गंगा आरती", "आरती", "संध्या आरती", "प्रार्थना"],
      mr: ["गंगा आरती", "आरती", "संध्याकाळची आरती", "प्रार्थना"],
    },
    question: {
      en: "When is the Ganga Aarti?",
      hi: "गंगा आरती कब होती है?",
      mr: "गंगा आरती कधी होते?",
    },
    answer: {
      en: "The Ganga Aarti at the Godavari ghats is a breathtaking evening ritual performed daily at sunset. During Kumbh Mela, a grand Maha Aarti is organized with hundreds of priests performing synchronized prayers with large brass lamps. The ceremony typically starts around 7 PM and lasts about 45 minutes. Arrive early to get a good spot as it gets very crowded. The aarti is free and open to everyone.",
      hi: "गोदावरी घाटों पर गंगा आरती एक अद्भुत शाम की रस्म है जो प्रतिदिन सूर्यास्त के समय होती है। कुंभ मेले के दौरान सैकड़ों पुजारियों द्वारा बड़े पीतल के दीपों के साथ भव्य महा आरती का आयोजन किया जाता है। समारोह आमतौर पर शाम 7 बजे के आसपास शुरू होता है और लगभग 45 मिनट तक चलता है। अच्छी जगह पाने के लिए जल्दी पहुंचें क्योंकि बहुत भीड़ होती है। आरती मुफ्त है और सभी के लिए खुली है।",
      mr: "गोदावरी घाटांवर गंगा आरती ही दररोज सूर्यास्ताच्या वेळी होणारी एक अप्रतिम संध्याकाळची विधी आहे. कुंभमेळ्यात शेकडो पुजाऱ्यांकडून मोठ्या पितळी दिव्यांसह भव्य महा आरतीचे आयोजन केले जाते. समारंभ साधारणतः संध्याकाळी 7 वाजता सुरू होतो आणि सुमारे 45 मिनिटे चालतो. चांगली जागा मिळवण्यासाठी लवकर पोहोचा कारण खूप गर्दी असते. आरती मोफत आहे आणि सर्वांसाठी खुली आहे.",
    },
    relatedTopics: ["sacred-ghats", "akhadas-events", "ghat-ramkund"],
    pageLink: "/events",
    emoji: "🪔",
    image: "/images/gallery/kumbh-3.webp",
  },

  // 24 ── Yoga & Meditation ───────────────────────────────────
  {
    id: "yoga-meditation",
    keywords: {
      en: ["yoga", "meditation", "yoga camp", "spiritual practice", "pranayama", "ashram"],
      hi: ["योग", "ध्यान", "योग शिविर", "प्राणायाम", "आश्रम"],
      mr: ["योग", "ध्यान", "योग शिबिर", "प्राणायाम", "आश्रम"],
    },
    question: {
      en: "Are there yoga and meditation camps?",
      hi: "क्या योग और ध्यान शिविर हैं?",
      mr: "योग आणि ध्यान शिबिरे आहेत का?",
    },
    answer: {
      en: "Yes! During Kumbh Mela, many free yoga and meditation camps are organized by various spiritual organizations and akhadas. Morning yoga sessions typically start at sunrise near the ghats. You can also find pranayama workshops, guided meditation sessions, and spiritual discourses by renowned gurus. No prior experience is needed - beginners are always welcome. Check the Kumbh event schedule for daily timings.",
      hi: "हां! कुंभ मेले के दौरान विभिन्न आध्यात्मिक संगठनों और अखाड़ों द्वारा कई मुफ्त योग और ध्यान शिविर आयोजित किए जाते हैं। सुबह की योग कक्षाएं आमतौर पर घाटों के पास सूर्योदय के समय शुरू होती हैं। आप प्राणायाम कार्यशालाएं, निर्देशित ध्यान सत्र और प्रसिद्ध गुरुओं के आध्यात्मिक प्रवचन भी पा सकते हैं। किसी पूर्व अनुभव की आवश्यकता नहीं है।",
      mr: "होय! कुंभमेळ्यात विविध आध्यात्मिक संस्था आणि अखाड्यांकडून अनेक मोफत योग आणि ध्यान शिबिरे आयोजित केली जातात. सकाळच्या योग सत्रे सामान्यतः घाटांजवळ सूर्योदयाच्या वेळी सुरू होतात. तुम्हाला प्राणायाम कार्यशाळा, मार्गदर्शित ध्यान सत्रे आणि प्रसिद्ध गुरूंचे आध्यात्मिक प्रवचनही मिळू शकतात. कोणत्याही पूर्वानुभवाची गरज नाही.",
    },
    relatedTopics: ["akhadas-events", "ganga-aarti", "cultural-shows"],
    pageLink: "/events",
    emoji: "🧘",
    image: "/images/gallery/kumbh-8.webp",
  },

  // 25 ── Cultural Shows ──────────────────────────────────────
  {
    id: "cultural-shows",
    keywords: {
      en: ["cultural show", "performance", "music", "dance", "kirtan", "bhajan", "entertainment"],
      hi: ["सांस्कृतिक कार्यक्रम", "संगीत", "नृत्य", "कीर्तन", "भजन"],
      mr: ["सांस्कृतिक कार्यक्रम", "संगीत", "नृत्य", "कीर्तन", "भजन"],
    },
    question: {
      en: "Are there cultural shows during Kumbh?",
      hi: "कुंभ में सांस्कृतिक कार्यक्रम होते हैं?",
      mr: "कुंभात सांस्कृतिक कार्यक्रम होतात का?",
    },
    answer: {
      en: "Kumbh Mela features a rich lineup of cultural performances throughout the festival. You can enjoy traditional music, folk dances from different states of India, bhajan and kirtan sessions, classical music concerts, and theatrical performances depicting stories from Hindu mythology. The Maharashtra government also organizes special cultural evenings showcasing local Marathi art forms. Most events are free and open to all.",
      hi: "कुंभ मेले में पूरे त्योहार के दौरान सांस्कृतिक कार्यक्रमों की समृद्ध श्रृंखला होती है। आप पारंपरिक संगीत, भारत के विभिन्न राज्यों के लोक नृत्य, भजन और कीर्तन सत्र, शास्त्रीय संगीत कार्यक्रम और हिंदू पौराणिक कथाओं की कहानियों पर नाटकीय प्रदर्शन का आनंद ले सकते हैं। महाराष्ट्र सरकार स्थानीय मराठी कला रूपों का प्रदर्शन करते हुए विशेष सांस्कृतिक शामें भी आयोजित करती है।",
      mr: "कुंभमेळ्यात संपूर्ण मेळ्यादरम्यान सांस्कृतिक कार्यक्रमांची समृद्ध मालिका असते. तुम्ही पारंपरिक संगीत, भारतातील विविध राज्यांतील लोकनृत्ये, भजन आणि कीर्तन सत्रे, शास्त्रीय संगीत कार्यक्रम आणि हिंदू पुराणातील कथांवर आधारित नाट्य प्रदर्शन यांचा आनंद घेऊ शकता. महाराष्ट्र सरकार स्थानिक मराठी कलाप्रकार दर्शवणाऱ्या विशेष सांस्कृतिक संध्या आयोजित करते.",
    },
    relatedTopics: ["akhadas-events", "yoga-meditation", "ganga-aarti"],
    pageLink: "/events",
    emoji: "🎭",
    image: "/images/gallery/kumbh-10.webp",
  },

  // 26 ── Annakshetra (Community Meals) ───────────────────────
  {
    id: "annakshetra",
    keywords: {
      en: ["annakshetra", "free food", "bhandara", "community meal", "langar", "prasad", "free meal"],
      hi: ["अन्नक्षेत्र", "मुफ्त भोजन", "भंडारा", "लंगर", "प्रसाद"],
      mr: ["अन्नक्षेत्र", "मोफत जेवण", "भंडारा", "लंगर", "प्रसाद"],
    },
    question: {
      en: "Where can I get free food at Kumbh?",
      hi: "कुंभ में मुफ्त भोजन कहां मिलेगा?",
      mr: "कुंभात मोफत जेवण कुठे मिळेल?",
    },
    answer: {
      en: "Annakshetras (free community kitchens) are one of the most beautiful traditions of Kumbh Mela. Various akhadas, religious organizations, and charitable trusts set up large kitchens serving free vegetarian meals to all visitors regardless of caste, creed, or religion. You can find bhandaras near all major ghats and along the main Kumbh routes. Meals typically include roti, rice, dal, sabzi, and sweets. No registration needed - just walk in and eat!",
      hi: "अन्नक्षेत्र (मुफ्त सामुदायिक रसोई) कुंभ मेले की सबसे सुंदर परंपराओं में से एक है। विभिन्न अखाड़े, धार्मिक संगठन और धर्मार्थ ट्रस्ट जाति, धर्म या संप्रदाय की परवाह किए बिना सभी आगंतुकों को मुफ्त शाकाहारी भोजन परोसने वाली बड़ी रसोइयां लगाते हैं। सभी प्रमुख घाटों के पास और मुख्य कुंभ मार्गों पर भंडारे मिल जाएंगे। भोजन में आमतौर पर रोटी, चावल, दाल, सब्जी और मिठाई शामिल होती है।",
      mr: "अन्नक्षेत्र (मोफत सामुदायिक स्वयंपाकघरे) ही कुंभमेळ्याच्या सर्वात सुंदर परंपरांपैकी एक आहे. विविध अखाडे, धार्मिक संस्था आणि धर्मादाय ट्रस्ट जात, धर्म किंवा पंथाचा भेद न करता सर्व अभ्यागतांना मोफत शाकाहारी जेवण देणारी मोठी स्वयंपाकघरे उभारतात. सर्व प्रमुख घाटांजवळ आणि मुख्य कुंभ मार्गांवर भंडारे मिळतील. जेवणात साधारणतः पोळी, भात, डाळ, भाजी आणि गोड पदार्थ असतात.",
    },
    relatedTopics: ["food", "is-free", "akhadas-events"],
    pageLink: "/guide",
    emoji: "🍛",
    image: "/images/gallery/kumbh-5.webp",
  },

  // 27 ── Transport - Train ───────────────────────────────────
  {
    id: "transport-train",
    keywords: {
      en: ["train", "railway", "nashik road station", "rail", "platform"],
      hi: ["ट्रेन", "रेलवे", "नाशिक रोड स्टेशन", "रेल"],
      mr: ["ट्रेन", "रेल्वे", "नाशिक रोड स्थानक", "रेल"],
    },
    question: {
      en: "How to reach Nashik by train?",
      hi: "ट्रेन से नाशिक कैसे पहुंचें?",
      mr: "ट्रेनने नाशिकला कसे पोहोचायचे?",
    },
    answer: {
      en: "Nashik Road railway station (station code: NK) is the main railhead, about 8 km from the city center. It has direct trains from Mumbai (3-4 hours), Delhi (20-24 hours), Pune (5-6 hours), and many other major cities. During Kumbh Mela, Indian Railways runs special Kumbh trains with extra services. Auto-rickshaws and buses are available from the station to the ghat area. Book tickets early on IRCTC as trains fill up fast during Kumbh season.",
      hi: "नाशिक रोड रेलवे स्टेशन (स्टेशन कोड: NK) मुख्य रेलहेड है, जो शहर के केंद्र से लगभग 8 किमी दूर है। यहां मुंबई (3-4 घंटे), दिल्ली (20-24 घंटे), पुणे (5-6 घंटे) और कई अन्य प्रमुख शहरों से सीधी ट्रेनें हैं। कुंभ मेले के दौरान भारतीय रेलवे अतिरिक्त सेवाओं के साथ विशेष कुंभ ट्रेनें चलाता है। स्टेशन से घाट क्षेत्र तक ऑटो-रिक्शा और बसें उपलब्ध हैं।",
      mr: "नाशिक रोड रेल्वे स्थानक (स्थानक कोड: NK) हे मुख्य रेल्वे स्थानक आहे, जे शहराच्या मध्यभागापासून सुमारे 8 किमी अंतरावर आहे. मुंबई (3-4 तास), दिल्ली (20-24 तास), पुणे (5-6 तास) आणि इतर अनेक प्रमुख शहरांहून थेट गाड्या आहेत. कुंभमेळ्यात भारतीय रेल्वे अतिरिक्त सेवांसह विशेष कुंभ गाड्या चालवते. स्थानकापासून घाट परिसरापर्यंत ऑटो-रिक्षा आणि बस उपलब्ध आहेत.",
    },
    relatedTopics: ["how-to-reach", "transport-bus", "transport-flight"],
    pageLink: "/guide",
    emoji: "🚂",
  },

  // 28 ── Transport - Bus ─────────────────────────────────────
  {
    id: "transport-bus",
    keywords: {
      en: ["bus", "msrtc", "state transport", "volvo", "bus stand", "road travel"],
      hi: ["बस", "एमएसआरटीसी", "राज्य परिवहन", "बस स्टैंड"],
      mr: ["बस", "एमएसआरटीसी", "राज्य परिवहन", "बस स्थानक"],
    },
    question: {
      en: "How to reach Nashik by bus?",
      hi: "बस से नाशिक कैसे पहुंचें?",
      mr: "बसने नाशिकला कसे पोहोचायचे?",
    },
    answer: {
      en: "MSRTC (Maharashtra State Road Transport Corporation) operates frequent buses to Nashik from Mumbai (3-4 hours), Pune (4-5 hours), Aurangabad (3 hours), and other cities. AC Shivneri and Volvo buses are available for a comfortable ride from Mumbai. The Nashik CBS (Central Bus Stand) is the main terminal. During Kumbh, special shuttle buses run between the bus stand and the ghat areas. Private buses and shared taxis are also available.",
      hi: "MSRTC (महाराष्ट्र राज्य सड़क परिवहन निगम) मुंबई (3-4 घंटे), पुणे (4-5 घंटे), औरंगाबाद (3 घंटे) और अन्य शहरों से नाशिक तक लगातार बसें चलाता है। मुंबई से आरामदायक यात्रा के लिए AC शिवनेरी और वोल्वो बसें उपलब्ध हैं। नाशिक CBS (सेंट्रल बस स्टैंड) मुख्य टर्मिनल है। कुंभ के दौरान बस स्टैंड और घाट क्षेत्रों के बीच विशेष शटल बसें चलती हैं।",
      mr: "MSRTC (महाराष्ट्र राज्य रस्ते परिवहन महामंडळ) मुंबई (3-4 तास), पुणे (4-5 तास), औरंगाबाद (3 तास) आणि इतर शहरांहून नाशिकला वारंवार बसेस चालवते. मुंबईहून आरामदायी प्रवासासाठी AC शिवनेरी आणि वोल्वो बसेस उपलब्ध आहेत. नाशिक CBS (सेंट्रल बस स्थानक) हे मुख्य टर्मिनल आहे. कुंभात बस स्थानक आणि घाट परिसरादरम्यान विशेष शटल बसेस चालतात.",
    },
    relatedTopics: ["how-to-reach", "transport-train", "parking"],
    pageLink: "/guide",
    emoji: "🚌",
  },

  // 29 ── Transport - Flight ──────────────────────────────────
  {
    id: "transport-flight",
    keywords: {
      en: ["flight", "airport", "fly", "air travel", "plane", "ozar airport"],
      hi: ["फ्लाइट", "हवाई अड्डा", "विमान", "ओजर एयरपोर्ट"],
      mr: ["विमान", "विमानतळ", "फ्लाइट", "ओझर विमानतळ"],
    },
    question: {
      en: "Can I fly to Nashik?",
      hi: "क्या मैं नाशिक के लिए उड़ान ले सकता हूं?",
      mr: "नाशिकला विमानाने जाता येते का?",
    },
    answer: {
      en: "Nashik has its own Ozar Airport (also called Gandhinagar Airport), about 20 km from the city, but it has limited commercial flights. The best option is to fly into Mumbai's Chhatrapati Shivaji Maharaj International Airport (about 170 km away) and then take a bus, train, or taxi to Nashik. Pune Airport (about 210 km) is another option. During Kumbh Mela, additional flight services to Ozar Airport may be announced.",
      hi: "नाशिक का अपना ओजर एयरपोर्ट (गांधीनगर एयरपोर्ट भी कहा जाता है) है, शहर से लगभग 20 किमी दूर, लेकिन यहां सीमित वाणिज्यिक उड़ानें हैं। सबसे अच्छा विकल्प मुंबई के छत्रपति शिवाजी महाराज अंतरराष्ट्रीय हवाई अड्डे (लगभग 170 किमी दूर) तक उड़ान भरना और फिर बस, ट्रेन या टैक्सी से नाशिक आना है। कुंभ मेले के दौरान ओजर एयरपोर्ट के लिए अतिरिक्त उड़ान सेवाओं की घोषणा हो सकती है।",
      mr: "नाशिकचे स्वतःचे ओझर विमानतळ (गांधीनगर विमानतळ असेही म्हणतात) आहे, शहरापासून सुमारे 20 किमी अंतरावर, पण येथे मर्यादित व्यावसायिक उड्डाणे आहेत. सर्वोत्तम पर्याय म्हणजे मुंबईच्या छत्रपती शिवाजी महाराज आंतरराष्ट्रीय विमानतळावर (सुमारे 170 किमी अंतरावर) उड्डाण करणे आणि मग बस, ट्रेन किंवा टॅक्सीने नाशिकला येणे. कुंभमेळ्यात ओझर विमानतळासाठी अतिरिक्त उड्डाण सेवांची घोषणा होऊ शकते.",
    },
    relatedTopics: ["how-to-reach", "transport-train", "transport-bus"],
    pageLink: "/guide",
    emoji: "✈️",
  },

  // 30 ── Akhadas Overview ────────────────────────────────────
  {
    id: "akhadas-overview",
    keywords: {
      en: ["akhada", "akhadas", "monastic order", "13 akhadas", "juna akhada", "niranjani"],
      hi: ["अखाड़ा", "अखाड़े", "13 अखाड़े", "जूना अखाड़ा", "निरंजनी"],
      mr: ["अखाडा", "अखाडे", "13 अखाडे", "जुना अखाडा", "निरंजनी"],
    },
    question: {
      en: "What are the 13 Akhadas?",
      hi: "13 अखाड़े कौन से हैं?",
      mr: "13 अखाडे कोणते आहेत?",
    },
    answer: {
      en: "There are 13 traditional Akhadas (monastic orders) in the Hindu spiritual tradition that play a central role during Kumbh Mela. They are divided into three groups: 7 Shaiva Akhadas (Juna, Niranjani, Mahanirvani, Anand, Atal, Avahan, Agni), 3 Vaishnava Akhadas (Digambar, Nirmohi, Nirvani), and 3 Udasin Akhadas (Bada Udasin, Naya Udasin, Nirmal). Each akhada sets up elaborate camps and has a fixed order for Shahi Snan processions.",
      hi: "हिंदू आध्यात्मिक परंपरा में 13 पारंपरिक अखाड़े हैं जो कुंभ मेले में केंद्रीय भूमिका निभाते हैं। वे तीन समूहों में विभाजित हैं: 7 शैव अखाड़े (जूना, निरंजनी, महानिर्वाणी, आनंद, अटल, अवाहन, अग्नि), 3 वैष्णव अखाड़े (दिगंबर, निर्मोही, निर्वाणी), और 3 उदासीन अखाड़े (बड़ा उदासीन, नया उदासीन, निर्मल)। प्रत्येक अखाड़ा विस्तृत शिविर लगाता है और शाही स्नान जुलूसों के लिए एक निश्चित क्रम होता है।",
      mr: "हिंदू आध्यात्मिक परंपरेत 13 पारंपरिक अखाडे आहेत जे कुंभमेळ्यात मध्यवर्ती भूमिका बजावतात. ते तीन गटांत विभागले आहेत: 7 शैव अखाडे (जुना, निरंजनी, महानिर्वाणी, आनंद, अटल, अवाहन, अग्नी), 3 वैष्णव अखाडे (दिगंबर, निर्मोही, निर्वाणी), आणि 3 उदासीन अखाडे (बडा उदासीन, नया उदासीन, निर्मल). प्रत्येक अखाडा विस्तृत शिबिरे उभारतो आणि शाही स्नान मिरवणुकांसाठी एक निश्चित क्रम असतो.",
    },
    relatedTopics: ["naga-sadhus", "akhadas-events", "shahi-snan"],
    pageLink: "/events",
    emoji: "🏛️",
    image: "/images/gallery/kumbh-2.webp",
  },

  // 31 ── Godavari River ──────────────────────────────────────
  {
    id: "godavari-river",
    keywords: {
      en: ["godavari", "river", "godavari river", "dakshin ganga", "south ganga", "holy river"],
      hi: ["गोदावरी", "नदी", "गोदावरी नदी", "दक्षिण गंगा"],
      mr: ["गोदावरी", "नदी", "गोदावरी नदी", "दक्षिण गंगा"],
    },
    question: {
      en: "Tell me about the Godavari River.",
      hi: "गोदावरी नदी के बारे में बताइए।",
      mr: "गोदावरी नदीबद्दल सांगा.",
    },
    answer: {
      en: "The Godavari is India's second longest river (1,465 km) and is often called the 'Dakshin Ganga' (Ganges of the South). It originates from Brahmagiri Hill near Trimbakeshwar, about 30 km from Nashik. The river is sacred in Hindu tradition and bathing in it during Kumbh Mela is believed to wash away sins and grant moksha (spiritual liberation). The Kumbh Mela at Nashik is held specifically because of the Godavari's divine significance.",
      hi: "गोदावरी भारत की दूसरी सबसे लंबी नदी (1,465 किमी) है और इसे अक्सर 'दक्षिण गंगा' कहा जाता है। यह नाशिक से लगभग 30 किमी दूर त्र्यंबकेश्वर के पास ब्रह्मगिरि पहाड़ी से निकलती है। हिंदू परंपरा में यह नदी पवित्र है और कुंभ मेले के दौरान इसमें स्नान करने से पाप धुल जाते हैं और मोक्ष की प्राप्ति होती है। गोदावरी के दिव्य महत्व के कारण ही नाशिक में कुंभ मेला आयोजित किया जाता है।",
      mr: "गोदावरी ही भारतातील दुसरी सर्वात लांब नदी (1,465 किमी) आहे आणि तिला अनेकदा 'दक्षिण गंगा' म्हटले जाते. ती नाशिकपासून सुमारे 30 किमी अंतरावर त्र्यंबकेश्वरजवळील ब्रह्मगिरी टेकडीवरून उगम पावते. हिंदू परंपरेत ही नदी पवित्र आहे आणि कुंभमेळ्यात तिच्यात स्नान केल्याने पापे धुतली जातात आणि मोक्ष प्राप्ती होते असे मानले जाते. गोदावरीच्या दिव्य महत्त्वामुळेच नाशिकमध्ये कुंभमेळा आयोजित केला जातो.",
    },
    relatedTopics: ["trimbakeshwar", "sacred-ghats", "ghat-ramkund"],
    pageLink: "/about",
    emoji: "🌊",
    image: "/images/gallery/kumbh-7.webp",
  },

  // 32 ── Simhastha Cycle ─────────────────────────────────────
  {
    id: "simhastha-cycle",
    keywords: {
      en: ["simhastha", "12 year cycle", "why 12 years", "jupiter", "zodiac", "astronomical"],
      hi: ["सिंहस्थ", "12 साल", "बृहस्पति", "राशि चक्र"],
      mr: ["सिंहस्थ", "12 वर्षे", "बृहस्पती", "राशी चक्र"],
    },
    question: {
      en: "Why is Kumbh held every 12 years?",
      hi: "कुंभ हर 12 साल में क्यों लगता है?",
      mr: "कुंभ दर 12 वर्षांनी का भरतो?",
    },
    answer: {
      en: "Kumbh Mela follows a 12-year astronomical cycle based on the position of Jupiter (Brihaspati) in the zodiac. When Jupiter enters the sign of Leo (Simha rashi), it is called Simhastha, and that is when the Kumbh is held at Nashik. The word 'Simhastha' literally means 'Jupiter in Leo.' This planetary alignment is considered the most auspicious time for holy bathing. The next Nashik Kumbh after 2027 will be around 2039.",
      hi: "कुंभ मेला राशि चक्र में बृहस्पति (Jupiter) की स्थिति पर आधारित 12 वर्षीय खगोलीय चक्र का पालन करता है। जब बृहस्पति सिंह राशि में प्रवेश करता है, तो इसे सिंहस्थ कहा जाता है, और तभी नाशिक में कुंभ लगता है। 'सिंहस्थ' शब्द का अर्थ है 'बृहस्पति सिंह राशि में।' इस ग्रहीय स्थिति को पवित्र स्नान के लिए सबसे शुभ समय माना जाता है। 2027 के बाद अगला नाशिक कुंभ लगभग 2039 में होगा।",
      mr: "कुंभमेळा राशी चक्रातील बृहस्पतीच्या (Jupiter) स्थानावर आधारित 12 वर्षांच्या खगोलीय चक्राचे पालन करतो. जेव्हा बृहस्पती सिंह राशीत प्रवेश करतो, तेव्हा त्याला सिंहस्थ म्हणतात आणि तेव्हाच नाशिकमध्ये कुंभ भरतो. 'सिंहस्थ' या शब्दाचा अर्थ आहे 'बृहस्पती सिंह राशीत.' ही ग्रहीय स्थिती पवित्र स्नानासाठी सर्वात शुभ मानली जाते. 2027 नंतरचा पुढचा नाशिक कुंभ सुमारे 2039 मध्ये होईल.",
    },
    relatedTopics: ["kumbh-what", "kumbh-dates", "shahi-snan"],
    pageLink: "/about",
    emoji: "♌",
  },

  // 33 ── Medical Facilities ──────────────────────────────────
  {
    id: "medical-facilities",
    keywords: {
      en: ["medical", "hospital", "doctor", "health", "first aid", "clinic", "medicine"],
      hi: ["चिकित्सा", "अस्पताल", "डॉक्टर", "स्वास्थ्य", "प्राथमिक उपचार"],
      mr: ["वैद्यकीय", "रुग्णालय", "डॉक्टर", "आरोग्य", "प्रथमोपचार"],
    },
    question: {
      en: "Are there medical facilities at Kumbh?",
      hi: "कुंभ में चिकित्सा सुविधाएं हैं?",
      mr: "कुंभात वैद्यकीय सुविधा आहे का?",
    },
    answer: {
      en: "Yes, extensive medical facilities are set up during Kumbh Mela. Mobile hospitals, first-aid stations, and ambulance services are available across all ghat areas. The government deploys doctors, nurses, and paramedics throughout the Kumbh zone. Free medical camps offer basic health checkups and medicines. For serious cases, Nashik Civil Hospital and several private hospitals are within reach. Keep your personal medicines handy and stay hydrated to avoid common health issues.",
      hi: "हां, कुंभ मेले के दौरान व्यापक चिकित्सा सुविधाएं उपलब्ध कराई जाती हैं। सभी घाट क्षेत्रों में मोबाइल अस्पताल, प्राथमिक उपचार केंद्र और एम्बुलेंस सेवाएं उपलब्ध हैं। सरकार पूरे कुंभ क्षेत्र में डॉक्टर, नर्स और पैरामेडिक्स तैनात करती है। मुफ्त चिकित्सा शिविर बुनियादी स्वास्थ्य जांच और दवाइयां प्रदान करते हैं। गंभीर मामलों के लिए नाशिक सिविल अस्पताल और कई निजी अस्पताल पहुंच के भीतर हैं।",
      mr: "होय, कुंभमेळ्यात व्यापक वैद्यकीय सुविधा उपलब्ध करून दिली जाते. सर्व घाट परिसरात मोबाइल रुग्णालये, प्रथमोपचार केंद्रे आणि रुग्णवाहिका सेवा उपलब्ध असतात. सरकार संपूर्ण कुंभ परिसरात डॉक्टर, नर्स आणि पॅरामेडिक्स तैनात करते. मोफत वैद्यकीय शिबिरांमध्ये मूलभूत आरोग्य तपासणी आणि औषधे दिली जातात. गंभीर प्रकरणांसाठी नाशिक सिव्हिल हॉस्पिटल आणि अनेक खाजगी रुग्णालये जवळ आहेत.",
    },
    relatedTopics: ["safety", "emergency", "what-to-carry"],
    emoji: "🏥",
  },

  // 34 ── ATM & Banking ───────────────────────────────────────
  {
    id: "atm-banking",
    keywords: {
      en: ["atm", "bank", "money", "cash", "upi", "payment", "currency exchange"],
      hi: ["एटीएम", "बैंक", "पैसा", "नकदी", "यूपीआई", "भुगतान"],
      mr: ["एटीएम", "बँक", "पैसे", "रोख", "यूपीआय", "पेमेंट"],
    },
    question: {
      en: "Are ATMs available near Kumbh area?",
      hi: "कुंभ क्षेत्र के पास ATM उपलब्ध हैं?",
      mr: "कुंभ परिसरात ATM उपलब्ध आहेत का?",
    },
    answer: {
      en: "ATMs from major banks like SBI, HDFC, ICICI, and Bank of Maharashtra are available in Nashik city and near the ghat areas. During Kumbh Mela, additional mobile ATM vans are deployed. However, ATMs can run out of cash during peak days, so carry enough cash before visiting the ghats. UPI payments (Google Pay, PhonePe, Paytm) are widely accepted at shops and restaurants in Nashik. Some bhandaras and religious sites only accept cash.",
      hi: "SBI, HDFC, ICICI और बैंक ऑफ महाराष्ट्र जैसे प्रमुख बैंकों के ATM नाशिक शहर और घाट क्षेत्रों के पास उपलब्ध हैं। कुंभ मेले के दौरान अतिरिक्त मोबाइल ATM वैन तैनात की जाती हैं। हालांकि, व्यस्त दिनों में ATM में नकदी खत्म हो सकती है, इसलिए घाटों पर जाने से पहले पर्याप्त नकदी रखें। नाशिक में दुकानों और रेस्तरां में UPI भुगतान (Google Pay, PhonePe, Paytm) व्यापक रूप से स्वीकार किया जाता है।",
      mr: "SBI, HDFC, ICICI आणि बँक ऑफ महाराष्ट्र यांसारख्या प्रमुख बँकांचे ATM नाशिक शहरात आणि घाट परिसरात उपलब्ध आहेत. कुंभमेळ्यात अतिरिक्त मोबाइल ATM व्हॅन तैनात केल्या जातात. तथापि, गर्दीच्या दिवशी ATM मध्ये रोख संपू शकते, म्हणून घाटांना भेट देण्यापूर्वी पुरेशी रोख रक्कम सोबत ठेवा. नाशिकमधील दुकाने आणि रेस्टॉरंटमध्ये UPI पेमेंट (Google Pay, PhonePe, Paytm) मोठ्या प्रमाणात स्वीकारले जाते.",
    },
    relatedTopics: ["what-to-carry", "is-free", "safety"],
    emoji: "💳",
  },

  // 35 ── Mobile Charging ─────────────────────────────────────
  {
    id: "mobile-charging",
    keywords: {
      en: ["mobile charging", "phone charging", "power bank", "battery", "charging station", "electricity"],
      hi: ["मोबाइल चार्जिंग", "फोन चार्जिंग", "पावर बैंक", "बैटरी"],
      mr: ["मोबाइल चार्जिंग", "फोन चार्जिंग", "पावर बँक", "बॅटरी"],
    },
    question: {
      en: "Where can I charge my phone at Kumbh?",
      hi: "कुंभ में मोबाइल कहां चार्ज करें?",
      mr: "कुंभात मोबाइल कुठे चार्ज करायचा?",
    },
    answer: {
      en: "During Kumbh Mela, mobile charging stations are set up at various points near the ghats and along pilgrim routes. However, the best advice is to carry a fully charged power bank (10,000 mAh or more). Charging stations can get crowded and you may have to wait. Your accommodation will have charging points. Keep your phone in power-saving mode during the day to conserve battery for navigation and emergency calls.",
      hi: "कुंभ मेले के दौरान घाटों के पास और तीर्थ मार्गों पर विभिन्न बिंदुओं पर मोबाइल चार्जिंग स्टेशन लगाए जाते हैं। हालांकि, सबसे अच्छी सलाह है कि पूरी तरह चार्ज पावर बैंक (10,000 mAh या अधिक) साथ रखें। चार्जिंग स्टेशनों पर भीड़ हो सकती है और आपको इंतजार करना पड़ सकता है। आपके आवास में चार्जिंग पॉइंट होंगे। नेविगेशन और आपातकालीन कॉल के लिए बैटरी बचाने के लिए दिन में फोन को पावर-सेविंग मोड पर रखें।",
      mr: "कुंभमेळ्यात घाटांजवळ आणि यात्रा मार्गांवर विविध ठिकाणी मोबाइल चार्जिंग स्टेशन उभारले जातात. तथापि, सर्वोत्तम सल्ला म्हणजे पूर्ण चार्ज पावर बँक (10,000 mAh किंवा अधिक) सोबत ठेवा. चार्जिंग स्टेशनवर गर्दी होऊ शकते आणि तुम्हाला वाट पाहावी लागू शकते. तुमच्या निवासस्थानात चार्जिंग पॉइंट असतील. नेव्हिगेशन आणि आणीबाणी कॉलसाठी बॅटरी वाचवण्यासाठी दिवसा फोन पावर-सेव्हिंग मोडवर ठेवा.",
    },
    relatedTopics: ["what-to-carry", "safety", "atm-banking"],
    emoji: "🔋",
  },

  // 36 ── Parking ─────────────────────────────────────────────
  {
    id: "parking",
    keywords: {
      en: ["parking", "car parking", "vehicle", "park car", "two wheeler", "bike parking"],
      hi: ["पार्किंग", "कार पार्किंग", "वाहन", "गाड़ी"],
      mr: ["पार्किंग", "कार पार्किंग", "वाहन", "गाडी"],
    },
    question: {
      en: "Where can I park my vehicle?",
      hi: "गाड़ी कहां पार्क करें?",
      mr: "गाडी कुठे पार्क करायची?",
    },
    answer: {
      en: "During Kumbh Mela, designated parking zones are set up on the outskirts of the ghat areas. Private vehicles are usually restricted from entering the core Kumbh zone on Shahi Snan days. Shuttle buses and e-rickshaws ferry visitors from parking areas to the ghats. It is recommended to use public transport on peak days. For regular days, paid parking is available near major ghats. Follow traffic police instructions for smooth parking.",
      hi: "कुंभ मेले के दौरान घाट क्षेत्रों के बाहरी इलाकों में निर्धारित पार्किंग क्षेत्र बनाए जाते हैं। शाही स्नान के दिनों में निजी वाहनों को आमतौर पर मुख्य कुंभ क्षेत्र में प्रवेश से रोका जाता है। शटल बसें और ई-रिक्शा पार्किंग क्षेत्रों से घाटों तक आगंतुकों को ले जाते हैं। व्यस्त दिनों में सार्वजनिक परिवहन का उपयोग करने की सलाह दी जाती है। सामान्य दिनों में प्रमुख घाटों के पास सशुल्क पार्किंग उपलब्ध है।",
      mr: "कुंभमेळ्यात घाट परिसराच्या बाहेरील भागात निर्धारित पार्किंग झोन उभारले जातात. शाही स्नानाच्या दिवशी खाजगी वाहनांना सामान्यतः मुख्य कुंभ क्षेत्रात प्रवेश दिला जात नाही. शटल बसेस आणि ई-रिक्षा पार्किंग भागातून घाटांपर्यंत अभ्यागतांना नेतात. गर्दीच्या दिवशी सार्वजनिक वाहतूक वापरण्याची शिफारस केली जाते. सामान्य दिवशी प्रमुख घाटांजवळ सशुल्क पार्किंग उपलब्ध आहे.",
    },
    relatedTopics: ["how-to-reach", "transport-bus", "crowd-management"],
    emoji: "🅿️",
  },

  // 37 ── Family & Elderly Tips ───────────────────────────────
  {
    id: "family-elderly-tips",
    keywords: {
      en: ["family", "elderly", "children", "kids", "senior citizen", "old age", "wheelchair", "disabled"],
      hi: ["परिवार", "बुजुर्ग", "बच्चे", "वरिष्ठ नागरिक", "व्हीलचेयर"],
      mr: ["कुटुंब", "वृद्ध", "मुले", "ज्येष्ठ नागरिक", "व्हीलचेअर"],
    },
    question: {
      en: "Tips for visiting with family and elderly?",
      hi: "परिवार और बुजुर्गों के साथ जाने के सुझाव?",
      mr: "कुटुंब आणि वृद्धांसह भेट देण्याचे सल्ले?",
    },
    answer: {
      en: "If visiting with elderly or children, avoid Shahi Snan peak days as crowds are very dense. Visit early morning (5-7 AM) when ghats are less crowded. Carry a small first-aid kit and any required medicines. Hold hands with children at all times in the crowd. For elderly and disabled visitors, some ghats have ramp access. Write your phone number on children's arms with a marker in case of separation. Rest areas and medical aid stations are available throughout the venue.",
      hi: "यदि बुजुर्गों या बच्चों के साथ जा रहे हैं, तो शाही स्नान के व्यस्त दिनों से बचें क्योंकि भीड़ बहुत अधिक होती है। सुबह जल्दी (5-7 बजे) जाएं जब घाटों पर कम भीड़ होती है। एक छोटी प्राथमिक उपचार किट और आवश्यक दवाइयां साथ रखें। भीड़ में बच्चों का हाथ हमेशा पकड़कर रखें। बुजुर्गों और विकलांग आगंतुकों के लिए कुछ घाटों पर रैम्प की सुविधा है। बिछड़ने की स्थिति में बच्चों की बाहों पर अपना फोन नंबर मार्कर से लिखें।",
      mr: "वृद्ध किंवा मुलांसह जात असाल तर शाही स्नानाच्या गर्दीच्या दिवशी टाळा कारण गर्दी खूप दाट असते. सकाळी लवकर (5-7 वाजता) भेट द्या जेव्हा घाटांवर कमी गर्दी असते. एक छोटी प्रथमोपचार किट आणि आवश्यक औषधे सोबत ठेवा. गर्दीत मुलांचा हात नेहमी धरून ठेवा. वृद्ध आणि दिव्यांग अभ्यागतांसाठी काही घाटांवर रॅम्पची सुविधा आहे. विभक्त झाल्यास मुलांच्या हातावर तुमचा फोन नंबर मार्करने लिहा.",
    },
    relatedTopics: ["safety", "dos-donts", "crowd-management"],
    emoji: "👨‍👩‍👧‍👦",
  },

  // 38 ── Best Time to Visit ──────────────────────────────────
  {
    id: "best-time-visit",
    keywords: {
      en: ["best time", "when to go", "ideal time", "which month", "peak season", "off peak"],
      hi: ["सबसे अच्छा समय", "कब जाएं", "कौन सा महीना"],
      mr: ["सर्वोत्तम वेळ", "कधी जायचे", "कोणता महिना"],
    },
    question: {
      en: "What is the best time to visit Kumbh?",
      hi: "कुंभ जाने का सबसे अच्छा समय कब है?",
      mr: "कुंभाला भेट देण्याची सर्वोत्तम वेळ कधी आहे?",
    },
    answer: {
      en: "The Shahi Snan dates (August-October 2027) are the most auspicious and popular times to visit, but also the most crowded. For a more peaceful experience, visit during the early months of the Kumbh period (late 2026 or early 2027) or on non-Shahi-Snan days. Early mornings (4-6 AM) are the best time of day to visit the ghats for a calm and spiritual experience. The monsoon months bring rain, so plan accordingly.",
      hi: "शाही स्नान तिथियां (अगस्त-अक्टूबर 2027) सबसे शुभ और लोकप्रिय समय हैं, लेकिन सबसे अधिक भीड़ भी इसी समय होती है। शांतिपूर्ण अनुभव के लिए कुंभ काल के शुरुआती महीनों (2026 के अंत या 2027 की शुरुआत) में या गैर-शाही-स्नान दिनों में जाएं। सुबह जल्दी (4-6 बजे) घाटों पर जाने का सबसे अच्छा समय है। मानसून के महीनों में बारिश होती है, इसलिए उसी हिसाब से योजना बनाएं।",
      mr: "शाही स्नान तारखा (ऑगस्ट-ऑक्टोबर 2027) सर्वात शुभ आणि लोकप्रिय वेळ आहेत, पण सर्वाधिक गर्दीही याच वेळी असते. शांत अनुभवासाठी कुंभ कालावधीच्या सुरुवातीच्या महिन्यांत (2026 च्या शेवटी किंवा 2027 च्या सुरुवातीला) किंवा गैर-शाही-स्नान दिवशी भेट द्या. सकाळी लवकर (4-6 वाजता) घाटांना भेट देण्यासाठी दिवसाची सर्वोत्तम वेळ आहे. पावसाळ्याच्या महिन्यांत पाऊस पडतो, त्यानुसार नियोजन करा.",
    },
    relatedTopics: ["kumbh-dates", "shahi-snan", "weather"],
    pageLink: "/dates",
    emoji: "🗓️",
  },

  // 39 ── Crowd Management ────────────────────────────────────
  {
    id: "crowd-management",
    keywords: {
      en: ["crowd", "stampede", "crowd control", "overcrowded", "manage crowd", "lost in crowd"],
      hi: ["भीड़", "भगदड़", "भीड़ नियंत्रण", "भीड़ प्रबंधन"],
      mr: ["गर्दी", "चेंगराचेंगरी", "गर्दी नियंत्रण", "गर्दी व्यवस्थापन"],
    },
    question: {
      en: "How is the crowd managed at Kumbh?",
      hi: "कुंभ में भीड़ का प्रबंधन कैसे होता है?",
      mr: "कुंभात गर्दीचे व्यवस्थापन कसे केले जाते?",
    },
    answer: {
      en: "Kumbh Mela has a dedicated crowd management system. AI-powered CCTV cameras monitor crowd density in real time. A Kumbh War Room coordinates police, NDRF, and medical teams. One-way crowd flow systems are set up on Shahi Snan days. Barricades and designated entry/exit points prevent overcrowding. If you feel the crowd getting too dense, move to the side and wait. Always follow police and volunteer instructions. The SOS button on this website can help in emergencies.",
      hi: "कुंभ मेले में एक समर्पित भीड़ प्रबंधन प्रणाली है। AI-संचालित CCTV कैमरे वास्तविक समय में भीड़ की घनत्व पर नजर रखते हैं। एक कुंभ वॉर रूम पुलिस, NDRF और चिकित्सा टीमों का समन्वय करता है। शाही स्नान दिनों में एकतरफा भीड़ प्रवाह प्रणालियां स्थापित की जाती हैं। बैरिकेड और निर्धारित प्रवेश/निकास बिंदु अत्यधिक भीड़ को रोकते हैं। अगर भीड़ बहुत ज्यादा लगे, तो किनारे पर जाकर रुकें।",
      mr: "कुंभमेळ्यात एक समर्पित गर्दी व्यवस्थापन प्रणाली आहे. AI-आधारित CCTV कॅमेरे वास्तविक वेळेत गर्दीच्या घनतेवर लक्ष ठेवतात. एक कुंभ वॉर रूम पोलीस, NDRF आणि वैद्यकीय पथकांचे समन्वय करतो. शाही स्नानाच्या दिवशी एकमार्गी गर्दी प्रवाह प्रणाली उभारली जाते. बॅरिकेड्स आणि निर्धारित प्रवेश/निर्गम बिंदू अतिगर्दी रोखतात. गर्दी खूप दाट वाटल्यास बाजूला जाऊन थांबा.",
    },
    relatedTopics: ["safety", "emergency", "dos-donts"],
    emoji: "👮",
  },

  // 40 ── Volunteer & Seva ────────────────────────────────────
  {
    id: "volunteer-seva",
    keywords: {
      en: ["volunteer", "seva", "service", "help out", "contribute", "donate", "ngo"],
      hi: ["स्वयंसेवक", "सेवा", "मदद", "योगदान", "दान", "एनजीओ"],
      mr: ["स्वयंसेवक", "सेवा", "मदत", "योगदान", "दान", "एनजीओ"],
    },
    question: {
      en: "How can I volunteer at Kumbh Mela?",
      hi: "कुंभ मेले में स्वयंसेवक कैसे बनें?",
      mr: "कुंभमेळ्यात स्वयंसेवक कसे व्हायचे?",
    },
    answer: {
      en: "Volunteering at Kumbh Mela is a wonderful way to serve. You can register as a volunteer through the official Kumbh Mela administration website or through participating NGOs. Volunteer roles include crowd management assistance, medical camp support, food distribution at bhandaras, cleanliness drives, and helping elderly or differently-abled pilgrims. Many akhadas and religious organizations also welcome volunteers. It is a deeply fulfilling spiritual experience!",
      hi: "कुंभ मेले में स्वयंसेवा करना सेवा का एक अद्भुत तरीका है। आप आधिकारिक कुंभ मेला प्रशासन वेबसाइट या भाग लेने वाले NGO के माध्यम से स्वयंसेवक के रूप में पंजीकरण कर सकते हैं। स्वयंसेवक भूमिकाओं में भीड़ प्रबंधन सहायता, चिकित्सा शिविर सहायता, भंडारों में भोजन वितरण, स्वच्छता अभियान और बुजुर्ग या दिव्यांग तीर्थयात्रियों की मदद शामिल है। कई अखाड़े और धार्मिक संगठन भी स्वयंसेवकों का स्वागत करते हैं।",
      mr: "कुंभमेळ्यात स्वयंसेवा करणे ही सेवेची एक अद्भुत पद्धत आहे. तुम्ही अधिकृत कुंभमेळा प्रशासन वेबसाइट किंवा सहभागी NGO द्वारे स्वयंसेवक म्हणून नोंदणी करू शकता. स्वयंसेवक भूमिकांमध्ये गर्दी व्यवस्थापन मदत, वैद्यकीय शिबिर सहाय्य, भंडारात अन्न वितरण, स्वच्छता मोहीम आणि वृद्ध किंवा दिव्यांग भाविकांना मदत यांचा समावेश आहे. अनेक अखाडे आणि धार्मिक संस्थाही स्वयंसेवकांचे स्वागत करतात.",
    },
    relatedTopics: ["annakshetra", "akhadas-events", "kumbh-what"],
    emoji: "🤝",
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
  {
    topicId: "ghat-ramkund",
    label: { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
  },
  {
    topicId: "ganga-aarti",
    label: { en: "Ganga Aarti", hi: "गंगा आरती", mr: "गंगा आरती" },
  },
];

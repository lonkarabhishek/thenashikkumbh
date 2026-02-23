import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

/* ═══════════════════════════════════════════════════════════════════════════════
   TRILINGUAL SITE DATA - Nashik Kumbh Mela 2027
   Each text field uses { en, hi, mr } for English, Hindi, and Marathi.
   Non-translatable fields (dates, images, ids, booleans) remain as-is.
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── BATHING DATES ──────────────────────────────────────────────────────────

export interface BathingDateI18n {
  date: string;
  event: I18nText;
  nakshatra: I18nText;
  significance: I18nText;
  isMajor: boolean;
}

export const bathingDatesI18n: BathingDateI18n[] = [
  {
    date: "August 20, 2027",
    event: {
      en: "Pratham Shahi Snan",
      hi: "प्रथम शाही स्नान",
      mr: "प्रथम शाही स्नान",
    },
    nakshatra: {
      en: "Shravan Purnima",
      hi: "श्रावण पूर्णिमा",
      mr: "श्रावण पौर्णिमा",
    },
    significance: {
      en: "The first royal bath marks the grand opening of Kumbh Mela. Millions gather at the sacred Godavari to cleanse their sins.",
      hi: "प्रथम शाही स्नान कुंभ मेला के भव्य शुभारंभ का प्रतीक है। लाखों लोग अपने पापों को धोने के लिए पवित्र गोदावरी पर एकत्रित होते हैं।",
      mr: "पहिले शाही स्नान कुंभमेळ्याच्या भव्य शुभारंभाचे प्रतीक आहे. लाखो लोक आपल्या पापांचे क्षालन करण्यासाठी पवित्र गोदावरीवर एकत्र येतात.",
    },
    isMajor: true,
  },
  {
    date: "September 3, 2027",
    event: {
      en: "Dwitiya Shahi Snan",
      hi: "द्वितीय शाही स्नान",
      mr: "द्वितीय शाही स्नान",
    },
    nakshatra: {
      en: "Bhadrapad Amavasya",
      hi: "भाद्रपद अमावस्या",
      mr: "भाद्रपद अमावास्या",
    },
    significance: {
      en: "The second royal bath, observed during the new moon, holds immense spiritual power for moksha seekers.",
      hi: "अमावस्या के दौरान मनाया जाने वाला द्वितीय शाही स्नान मोक्ष साधकों के लिए अपार आध्यात्मिक शक्ति रखता है।",
      mr: "अमावास्येला साजरे केले जाणारे दुसरे शाही स्नान मोक्ष साधकांसाठी अपार आध्यात्मिक शक्ती धारण करते.",
    },
    isMajor: true,
  },
  {
    date: "September 17, 2027",
    event: {
      en: "Tritiya Shahi Snan",
      hi: "तृतीय शाही स्नान",
      mr: "तृतीय शाही स्नान",
    },
    nakshatra: {
      en: "Bhadrapad Purnima",
      hi: "भाद्रपद पूर्णिमा",
      mr: "भाद्रपद पौर्णिमा",
    },
    significance: {
      en: "The third royal bath during the full moon. Akhadas lead grand processions to the ghats.",
      hi: "पूर्णिमा के दौरान तृतीय शाही स्नान। अखाड़े घाटों तक भव्य जुलूस का नेतृत्व करते हैं।",
      mr: "पौर्णिमेला होणारे तिसरे शाही स्नान. अखाडे घाटांकडे भव्य मिरवणुकांचे नेतृत्व करतात.",
    },
    isMajor: true,
  },
  {
    date: "October 2, 2027",
    event: {
      en: "Chaturtha Shahi Snan",
      hi: "चतुर्थ शाही स्नान",
      mr: "चतुर्थ शाही स्नान",
    },
    nakshatra: {
      en: "Ashwin Amavasya",
      hi: "अश्विन अमावस्या",
      mr: "अश्विन अमावास्या",
    },
    significance: {
      en: "A deeply auspicious bath coinciding with Mahalaya Amavasya - honoring ancestors and seeking their blessings.",
      hi: "महालय अमावस्या के साथ मनाया जाने वाला अत्यंत शुभ स्नान - पूर्वजों का सम्मान और उनके आशीर्वाद की प्रार्थना।",
      mr: "महालय अमावास्येशी जुळणारे अत्यंत शुभ स्नान - पूर्वजांचा सन्मान आणि त्यांच्या आशीर्वादाची प्रार्थना.",
    },
    isMajor: true,
  },
  {
    date: "October 17, 2027",
    event: {
      en: "Panchama Shahi Snan",
      hi: "पंचम शाही स्नान",
      mr: "पंचम शाही स्नान",
    },
    nakshatra: {
      en: "Ashwin Purnima (Sharad Purnima)",
      hi: "अश्विन पूर्णिमा (शरद पूर्णिमा)",
      mr: "अश्विन पौर्णिमा (शरद पौर्णिमा)",
    },
    significance: {
      en: "The concluding royal bath under the luminous Sharad Purnima moon - a night of divine grace.",
      hi: "चमकीले शरद पूर्णिमा चंद्रमा के नीचे अंतिम शाही स्नान - दिव्य कृपा की रात।",
      mr: "तेजस्वी शरद पौर्णिमेच्या चंद्राखाली अंतिम शाही स्नान - दिव्य कृपेची रात्र.",
    },
    isMajor: true,
  },
  {
    date: "August 25, 2027",
    event: {
      en: "Parva Snan - Krishna Janmashtami",
      hi: "पर्व स्नान - कृष्ण जन्माष्टमी",
      mr: "पर्व स्नान - कृष्ण जन्माष्टमी",
    },
    nakshatra: {
      en: "Shravan Krishna Ashtami",
      hi: "श्रावण कृष्ण अष्टमी",
      mr: "श्रावण कृष्ण अष्टमी",
    },
    significance: {
      en: "Celebrating Lord Krishna's birth with sacred dips and devotional festivities along the river.",
      hi: "नदी के किनारे पवित्र स्नान और भक्ति उत्सव के साथ भगवान कृष्ण के जन्म का उत्सव।",
      mr: "नदीच्या काठी पवित्र स्नान आणि भक्ती उत्सवांसह भगवान कृष्णाच्या जन्माचा उत्सव.",
    },
    isMajor: false,
  },
  {
    date: "September 7, 2027",
    event: {
      en: "Parva Snan - Ganesh Chaturthi",
      hi: "पर्व स्नान - गणेश चतुर्थी",
      mr: "पर्व स्नान - गणेश चतुर्थी",
    },
    nakshatra: {
      en: "Bhadrapad Shukla Chaturthi",
      hi: "भाद्रपद शुक्ल चतुर्थी",
      mr: "भाद्रपद शुक्ल चतुर्थी",
    },
    significance: {
      en: "Honoring Lord Ganesha, the remover of obstacles. Special pujas and immersion ceremonies.",
      hi: "विघ्नहर्ता भगवान गणेश का सम्मान। विशेष पूजा और विसर्जन समारोह।",
      mr: "विघ्नहर्ता भगवान गणेशाचा सन्मान. विशेष पूजा आणि विसर्जन समारंभ.",
    },
    isMajor: false,
  },
  {
    date: "October 12, 2027",
    event: {
      en: "Parva Snan - Navratri Begins",
      hi: "पर्व स्नान - नवरात्रि प्रारंभ",
      mr: "पर्व स्नान - नवरात्री प्रारंभ",
    },
    nakshatra: {
      en: "Ashwin Shukla Pratipada",
      hi: "अश्विन शुक्ल प्रतिपदा",
      mr: "अश्विन शुक्ल प्रतिपदा",
    },
    significance: {
      en: "The nine nights of Goddess Durga worship begin. Devotees seek shakti through sacred baths.",
      hi: "देवी दुर्गा की आराधना की नौ रातों का आरंभ। भक्त पवित्र स्नान द्वारा शक्ति की खोज करते हैं।",
      mr: "देवी दुर्गेच्या आराधनेच्या नऊ रात्रींचा प्रारंभ. भक्त पवित्र स्नानाद्वारे शक्तीचा शोध घेतात.",
    },
    isMajor: false,
  },
];

// ─── GHATS ──────────────────────────────────────────────────────────────────

export interface GhatI18n {
  id: string;
  name: I18nText;
  subtitle: I18nText;
  description: I18nText;
  rituals: I18nText[];
  timings: I18nText;
  image: string;
}

export const ghatsI18n: GhatI18n[] = [
  {
    id: "ramkund",
    name: { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
    subtitle: { en: "The Holiest Bathing Ghat", hi: "सबसे पवित्र स्नान घाट", mr: "सर्वात पवित्र स्नान घाट" },
    description: {
      en: "Ram Kund is the most sacred ghat in Nashik, believed to be the exact spot where Lord Rama bathed during his 14-year exile. Hindus consider a dip here equivalent to bathing in all holy rivers. It is also the site for performing asthi visarjan (immersion of ashes) of the departed, granting them moksha.",
      hi: "रामकुंड नाशिक का सबसे पवित्र घाट है, माना जाता है कि यह वही स्थान है जहाँ भगवान राम ने 14 वर्ष के वनवास के दौरान स्नान किया था। हिन्दू यहाँ स्नान को सभी पवित्र नदियों में स्नान के समान मानते हैं। यह दिवंगतों के अस्थि विसर्जन का स्थान भी है, जो उन्हें मोक्ष प्रदान करता है।",
      mr: "रामकुंड हा नाशिकमधील सर्वात पवित्र घाट आहे, भगवान रामांनी १४ वर्षांच्या वनवासात जिथे स्नान केले ते हेच ठिकाण असल्याचे मानले जाते. हिंदू येथील स्नानाला सर्व पवित्र नद्यांमध्ये स्नान करण्यासारखे मानतात. हे दिवंगतांच्या अस्थी विसर्जनाचे स्थानही आहे, जे त्यांना मोक्ष प्रदान करते.",
    },
    rituals: [
      { en: "Sacred bathing for moksha", hi: "मोक्ष के लिए पवित्र स्नान", mr: "मोक्षासाठी पवित्र स्नान" },
      { en: "Asthi visarjan ceremonies", hi: "अस्थि विसर्जन समारोह", mr: "अस्थी विसर्जन समारंभ" },
      { en: "Daily aarti at dawn and dusk", hi: "प्रतिदिन सुबह और शाम आरती", mr: "दररोज पहाटे आणि संध्याकाळी आरती" },
      { en: "Pind daan for ancestors", hi: "पूर्वजों के लिए पिंडदान", mr: "पूर्वजांसाठी पिंडदान" },
    ],
    timings: { en: "Open 24 hours (Aarti: 6:00 AM & 7:00 PM)", hi: "24 घंटे खुला (आरती: सुबह 6:00 और शाम 7:00)", mr: "२४ तास खुले (आरती: सकाळी ६:०० व संध्याकाळी ७:००)" },
    image: "/images/ramkund.webp",
  },
  {
    id: "godavari-ghats",
    name: { en: "Godavari Ghats", hi: "गोदावरी घाट", mr: "गोदावरी घाट" },
    subtitle: { en: "Steps Along the Sacred River", hi: "पवित्र नदी के तट पर सीढ़ियाँ", mr: "पवित्र नदीच्या तीरावरील पायऱ्या" },
    description: {
      en: "The chain of ghats along the Godavari River forms the spiritual spine of Nashik. Known as Dakshin Ganga (Ganga of the South), the Godavari is one of India's seven sacred rivers. The ghats come alive during Kumbh with millions performing holy dips, chanting mantras, and offering prayers.",
      hi: "गोदावरी नदी के किनारे घाटों की श्रृंखला नाशिक की आध्यात्मिक रीढ़ बनाती है। दक्षिण गंगा के रूप में विख्यात गोदावरी भारत की सात पवित्र नदियों में से एक है। कुंभ के दौरान लाखों लोग पवित्र स्नान, मंत्र जाप और प्रार्थना करते हुए इन घाटों को जीवंत कर देते हैं।",
      mr: "गोदावरी नदीच्या किनाऱ्यावरील घाटांची साखळी नाशिकचा आध्यात्मिक कणा तयार करते. दक्षिणची गंगा म्हणून ओळखली जाणारी गोदावरी भारतातील सात पवित्र नद्यांपैकी एक आहे. कुंभात लाखो लोक पवित्र स्नान, मंत्रजप आणि प्रार्थना करत या घाटांना जिवंत करतात.",
    },
    rituals: [
      { en: "Shahi Snan during Kumbh", hi: "कुंभ के दौरान शाही स्नान", mr: "कुंभात शाही स्नान" },
      { en: "Evening Ganga Aarti", hi: "शाम की गंगा आरती", mr: "संध्याकाळची गंगा आरती" },
      { en: "Sunrise meditation sessions", hi: "सूर्योदय ध्यान सत्र", mr: "सूर्योदय ध्यान सत्रे" },
      { en: "Devotional kirtans", hi: "भक्ति कीर्तन", mr: "भक्ती कीर्तन" },
    ],
    timings: { en: "Open 24 hours", hi: "24 घंटे खुला", mr: "२४ तास खुले" },
    image: "/images/godavari-ghats.webp",
  },
  {
    id: "kapaleshwar",
    name: { en: "Kapaleshwar Temple & Ghat", hi: "कपालेश्वर मंदिर एवं घाट", mr: "कपालेश्वर मंदिर व घाट" },
    subtitle: { en: "Ancient Shiva Sanctum", hi: "प्राचीन शिव मंदिर", mr: "प्राचीन शिव मंदिर" },
    description: {
      en: "Kapaleshwar Temple is one of Nashik's oldest Shiva temples, dating back centuries. Legend holds that Lord Shiva granted darshan here to absolve a great sin. The adjacent ghat offers serene bathing and is less crowded than Ram Kund, making it ideal for contemplative spiritual practice.",
      hi: "कपालेश्वर मंदिर नाशिक के सबसे प्राचीन शिव मंदिरों में से एक है। किंवदंती है कि भगवान शिव ने यहाँ एक महान पाप के प्रायश्चित के लिए दर्शन दिए। निकटवर्ती घाट शांत स्नान प्रदान करता है और रामकुंड से कम भीड़भाड़ वाला है।",
      mr: "कपालेश्वर मंदिर हे नाशिकमधील सर्वात प्राचीन शिव मंदिरांपैकी एक आहे. दंतकथेनुसार भगवान शिवांनी एका महान पापाच्या प्रायश्चित्तासाठी येथे दर्शन दिले. शेजारील घाट शांत स्नान देतो आणि रामकुंडापेक्षा कमी गर्दीचा आहे.",
    },
    rituals: [
      { en: "Shiva abhishekam", hi: "शिव अभिषेक", mr: "शिव अभिषेक" },
      { en: "Maha Shivaratri celebrations", hi: "महाशिवरात्रि उत्सव", mr: "महाशिवरात्री उत्सव" },
      { en: "Rudra puja", hi: "रुद्र पूजा", mr: "रुद्र पूजा" },
      { en: "Meditation and dhyana", hi: "ध्यान और साधना", mr: "ध्यान आणि साधना" },
    ],
    timings: { en: "5:00 AM – 9:00 PM", hi: "सुबह 5:00 – रात 9:00", mr: "सकाळी ५:०० – रात्री ९:००" },
    image: "/images/kapaleshwar.webp",
  },
  {
    id: "panchavati",
    name: { en: "Panchavati", hi: "पंचवटी", mr: "पंचवटी" },
    subtitle: { en: "Where Rama Dwelt in Exile", hi: "जहाँ राम वनवास में रहे", mr: "जिथे राम वनवासात राहिले" },
    description: {
      en: "Panchavati is the sacred grove of five banyan trees where Lord Rama, Sita, and Lakshmana lived during their exile. This hallowed ground houses the ancient Kalaram Temple (Black Rama Temple), Sita Gufa (Sita's Cave), and the Tapovan gardens - a living testament to the Ramayana.",
      hi: "पंचवटी पाँच वट वृक्षों का पवित्र उपवन है जहाँ भगवान राम, सीता और लक्ष्मण वनवास में रहे। इस पवित्र भूमि में प्राचीन कालाराम मंदिर (काले राम का मंदिर), सीता गुफा और तपोवन उद्यान हैं - रामायण का जीवंत प्रमाण।",
      mr: "पंचवटी हे पाच वडाच्या वृक्षांचे पवित्र उपवन आहे जिथे भगवान राम, सीता आणि लक्ष्मण वनवासात राहिले. या पवित्र भूमीत प्राचीन कालाराम मंदिर (काळ्या रामाचे मंदिर), सीता गुफा आणि तपोवन उद्याने आहेत - रामायणाचा जिवंत पुरावा.",
    },
    rituals: [
      { en: "Darshan at Kalaram Temple", hi: "कालाराम मंदिर में दर्शन", mr: "कालाराम मंदिरात दर्शन" },
      { en: "Sita Gufa pilgrimage", hi: "सीता गुफा तीर्थयात्रा", mr: "सीता गुफा तीर्थयात्रा" },
      { en: "Ramayana recital gatherings", hi: "रामायण पाठ सभा", mr: "रामायण पाठ सभा" },
      { en: "Circumambulation of sacred trees", hi: "पवित्र वृक्षों की परिक्रमा", mr: "पवित्र वृक्षांची परिक्रमा" },
    ],
    timings: { en: "6:00 AM – 9:00 PM", hi: "सुबह 6:00 – रात 9:00", mr: "सकाळी ६:०० – रात्री ९:००" },
    image: "/images/panchavati.webp",
  },
];

// ─── EVENTS ─────────────────────────────────────────────────────────────────

export interface EventI18n {
  title: I18nText;
  date: string;
  category: I18nText;
  description: I18nText;
}

export const eventsI18n: EventI18n[] = [
  {
    title: { en: "Grand Opening Ceremony", hi: "भव्य उद्घाटन समारोह", mr: "भव्य उद्घाटन समारंभ" },
    date: "August 2027",
    category: { en: "Ceremony", hi: "समारोह", mr: "समारंभ" },
    description: {
      en: "The official inauguration with Vedic rituals, lamp lighting, and blessings from senior religious leaders.",
      hi: "वैदिक अनुष्ठानों, दीप प्रज्वलन और वरिष्ठ धर्मगुरुओं के आशीर्वाद के साथ आधिकारिक उद्घाटन।",
      mr: "वैदिक विधी, दीपप्रज्वलन आणि वरिष्ठ धर्मगुरूंच्या आशीर्वादासह अधिकृत उद्घाटन.",
    },
  },
  {
    title: { en: "Shahi Snan Processions", hi: "शाही स्नान जुलूस", mr: "शाही स्नान मिरवणुका" },
    date: "Multiple dates",
    category: { en: "Sacred Bathing", hi: "पवित्र स्नान", mr: "पवित्र स्नान" },
    description: {
      en: "Spectacular processions of Naga sadhus, adorned elephants, and decorated chariots leading to the ghats.",
      hi: "नागा साधुओं, सजे हाथियों और सजावटी रथों के भव्य जुलूस घाटों की ओर।",
      mr: "नागा साधू, सजवलेले हत्ती आणि सजावटी रथांच्या भव्य मिरवणुका घाटांकडे.",
    },
  },
  {
    title: { en: "Pravachan & Satsang", hi: "प्रवचन एवं सत्संग", mr: "प्रवचन व सत्संग" },
    date: "Daily",
    category: { en: "Spiritual", hi: "आध्यात्मिक", mr: "आध्यात्मिक" },
    description: {
      en: "Discourses by revered saints and spiritual leaders on Vedanta, Bhagavad Gita, and dharmic living.",
      hi: "पूजनीय संतों और आध्यात्मिक नेताओं द्वारा वेदांत, भगवद्गीता और धार्मिक जीवन पर प्रवचन।",
      mr: "पूजनीय संत आणि आध्यात्मिक नेत्यांचे वेदांत, भगवद्गीता आणि धार्मिक जीवनावरील प्रवचन.",
    },
  },
  {
    title: { en: "Ganga Aarti at Godavari", hi: "गोदावरी पर गंगा आरती", mr: "गोदावरीवर गंगा आरती" },
    date: "Every Evening",
    category: { en: "Devotional", hi: "भक्ति", mr: "भक्ती" },
    description: {
      en: "A mesmerizing evening aarti ceremony with thousands of lamps illuminating the sacred Godavari.",
      hi: "हजारों दीपकों से पवित्र गोदावरी को जगमगाती एक मनमोहक संध्या आरती।",
      mr: "हजारो दिव्यांनी पवित्र गोदावरी उजळून टाकणारी एक मंत्रमुग्ध करणारी संध्या आरती.",
    },
  },
  {
    title: { en: "Cultural Performances", hi: "सांस्कृतिक कार्यक्रम", mr: "सांस्कृतिक कार्यक्रम" },
    date: "Throughout Kumbh",
    category: { en: "Cultural", hi: "सांस्कृतिक", mr: "सांस्कृतिक" },
    description: {
      en: "Classical dance, devotional music, bhajan sandhya, and theatrical performances depicting Hindu epics.",
      hi: "शास्त्रीय नृत्य, भक्ति संगीत, भजन संध्या और हिन्दू महाकाव्यों का नाट्य प्रदर्शन।",
      mr: "शास्त्रीय नृत्य, भक्ती संगीत, भजन संध्या आणि हिंदू महाकाव्यांचे नाट्य प्रदर्शन.",
    },
  },
  {
    title: { en: "Yoga & Meditation Camps", hi: "योग एवं ध्यान शिविर", mr: "योग व ध्यान शिबिरे" },
    date: "Daily",
    category: { en: "Wellness", hi: "कल्याण", mr: "कल्याण" },
    description: {
      en: "Free yoga sessions and guided meditation led by renowned practitioners along the riverbanks.",
      hi: "नदी तट पर प्रसिद्ध साधकों के नेतृत्व में निःशुल्क योग सत्र और निर्देशित ध्यान।",
      mr: "नदी किनाऱ्यावर प्रसिद्ध साधकांच्या नेतृत्वाखाली विनामूल्य योग सत्रे आणि मार्गदर्शित ध्यान.",
    },
  },
  {
    title: { en: "Bhajan Sandhya", hi: "भजन संध्या", mr: "भजन संध्या" },
    date: "Every Evening",
    category: { en: "Devotional", hi: "भक्ति", mr: "भक्ती" },
    description: {
      en: "Soul-stirring devotional singing sessions featuring renowned bhajan artists from across India.",
      hi: "भारत भर के प्रसिद्ध भजन कलाकारों की आत्मा को झकझोर देने वाली भक्ति गायन सभाएं।",
      mr: "भारतभरातील प्रसिद्ध भजन कलाकारांच्या आत्म्याला स्पर्श करणाऱ्या भक्ती गायन सभा.",
    },
  },
  {
    title: { en: "Annakshetra - Free Bhandara", hi: "अन्नक्षेत्र - निःशुल्क भंडारा", mr: "अन्नक्षेत्र - विनामूल्य भंडारा" },
    date: "Daily",
    category: { en: "Seva", hi: "सेवा", mr: "सेवा" },
    description: {
      en: "Massive free food distribution (langar/bhandara) serving lakhs of pilgrims daily, organized by akhadas and trusts.",
      hi: "अखाड़ों और ट्रस्टों द्वारा आयोजित प्रतिदिन लाखों तीर्थयात्रियों को भोजन कराने वाला विशाल निःशुल्क भोजन वितरण (लंगर/भंडारा)।",
      mr: "अखाडे आणि ट्रस्टद्वारा आयोजित दररोज लाखो तीर्थयात्रेकरूंना भोजन देणारे विशाल विनामूल्य अन्नवितरण (लंगर/भंडारा).",
    },
  },
];

// ─── AKHADAS ────────────────────────────────────────────────────────────────

export interface AkhadaI18n {
  name: string;
  tradition: string;
  description: I18nText;
  established: string;
}

export const akhadasI18n: AkhadaI18n[] = [
  {
    name: "Shri Panchayati Akhada Mahanirvani",
    tradition: "Shaiva",
    description: {
      en: "One of the most ancient akhadas dedicated to Lord Shiva. Known for their ascetic practices and fire rituals. They lead the first Shahi Snan procession.",
      hi: "भगवान शिव को समर्पित सबसे प्राचीन अखाड़ों में से एक। अपनी तपस्या और अग्नि अनुष्ठानों के लिए प्रसिद्ध। वे पहले शाही स्नान जुलूस का नेतृत्व करते हैं।",
      mr: "भगवान शिवाला समर्पित सर्वात प्राचीन अखाड्यांपैकी एक. तपस्या आणि अग्नी विधींसाठी प्रसिद्ध. ते पहिल्या शाही स्नान मिरवणुकीचे नेतृत्व करतात.",
    },
    established: "Ancient (pre-historic origins)",
  },
  {
    name: "Shri Panchayati Akhada Niranjani",
    tradition: "Shaiva",
    description: {
      en: "Devoted to Lord Kartikeya, this akhada is renowned for its warrior-ascetics and their spectacular procession during Kumbh Mela.",
      hi: "भगवान कार्तिकेय को समर्पित, यह अखाड़ा अपने योद्धा-तपस्वियों और कुंभ मेला के दौरान भव्य जुलूस के लिए प्रसिद्ध है।",
      mr: "भगवान कार्तिकेयाला समर्पित, हा अखाडा आपल्या योद्धा-तपस्वी आणि कुंभमेळ्यातील भव्य मिरवणुकीसाठी प्रसिद्ध आहे.",
    },
    established: "904 CE",
  },
  {
    name: "Shri Taponidhi Anand Akhada",
    tradition: "Shaiva",
    description: {
      en: "One of the largest Shaiva akhadas, known for profound spiritual teachings and meditation traditions passed down through centuries.",
      hi: "सबसे बड़े शैव अखाड़ों में से एक, गहन आध्यात्मिक शिक्षाओं और सदियों से चली आ रही ध्यान परंपराओं के लिए प्रसिद्ध।",
      mr: "सर्वात मोठ्या शैव अखाड्यांपैकी एक, शतकानुशतके चालत आलेल्या गहन आध्यात्मिक शिक्षण आणि ध्यान परंपरांसाठी प्रसिद्ध.",
    },
    established: "855 CE",
  },
  {
    name: "Shri Panchdasnam Juna Akhada",
    tradition: "Shaiva",
    description: {
      en: "The largest of all akhadas with thousands of naga sadhus. Their procession during Shahi Snan is the most grand and awe-inspiring.",
      hi: "हजारों नागा साधुओं के साथ सभी अखाड़ों में सबसे बड़ा। शाही स्नान के दौरान उनका जुलूस सबसे भव्य और विस्मयकारी होता है।",
      mr: "हजारो नागा साधूंसह सर्व अखाड्यांमधील सर्वात मोठा. शाही स्नानादरम्यान त्यांची मिरवणूक सर्वात भव्य आणि विस्मयकारी असते.",
    },
    established: "Ancient",
  },
  {
    name: "Shri Panchdashnam Aavahan Akhada",
    tradition: "Shaiva",
    description: {
      en: "Known for strict ascetic discipline and powerful spiritual practices. They maintain ancient traditions of tapasya (austerity).",
      hi: "कठोर तपस्या अनुशासन और शक्तिशाली आध्यात्मिक साधनाओं के लिए प्रसिद्ध। वे तपस्या की प्राचीन परंपराओं को बनाए रखते हैं।",
      mr: "कठोर तपस्या शिस्त आणि शक्तिशाली आध्यात्मिक साधनांसाठी प्रसिद्ध. ते तपस्येच्या प्राचीन परंपरा जतन करतात.",
    },
    established: "646 CE",
  },
  {
    name: "Shri Panchayati Akhada Atal",
    tradition: "Shaiva",
    description: {
      en: "Named for their unwavering (atal) devotion, this akhada preserves rare spiritual texts and practices of Shaivism.",
      hi: "अपनी अटल भक्ति के लिए नामित, यह अखाड़ा शैवधर्म के दुर्लभ आध्यात्मिक ग्रंथों और साधनाओं को संरक्षित करता है।",
      mr: "त्यांच्या अटल भक्तीसाठी नामित, हा अखाडा शैवधर्माचे दुर्मिळ आध्यात्मिक ग्रंथ आणि साधना जतन करतो.",
    },
    established: "569 CE",
  },
  {
    name: "Shri Digambar Ani Akhada",
    tradition: "Vaishnava",
    description: {
      en: "A prominent Vaishnava akhada devoted to Lord Vishnu. Known for their devotional music, kirtan traditions, and tilak markings.",
      hi: "भगवान विष्णु को समर्पित एक प्रमुख वैष्णव अखाड़ा। अपने भक्ति संगीत, कीर्तन परंपराओं और तिलक चिह्नों के लिए प्रसिद्ध।",
      mr: "भगवान विष्णूला समर्पित एक प्रमुख वैष्णव अखाडा. भक्ती संगीत, कीर्तन परंपरा आणि टिळक चिन्हांसाठी प्रसिद्ध.",
    },
    established: "Ancient",
  },
  {
    name: "Shri Nirmohi Ani Akhada",
    tradition: "Vaishnava",
    description: {
      en: "Dedicated to the worship of Lord Rama, this akhada played a historical role in preserving Ram Janmabhoomi traditions.",
      hi: "भगवान राम की पूजा को समर्पित, इस अखाड़े ने राम जन्मभूमि परंपराओं को संरक्षित करने में ऐतिहासिक भूमिका निभाई।",
      mr: "भगवान रामांच्या पूजेला समर्पित, या अखाड्याने राम जन्मभूमी परंपरा जतन करण्यात ऐतिहासिक भूमिका बजावली.",
    },
    established: "Ancient",
  },
  {
    name: "Shri Nirvani Ani Akhada",
    tradition: "Vaishnava",
    description: {
      en: "Focused on bhakti (devotion) and the teachings of Ramanuja. Known for their elaborate deity worship and philosophical discourse.",
      hi: "भक्ति और रामानुज की शिक्षाओं पर केंद्रित। अपनी विस्तृत देव पूजा और दार्शनिक प्रवचन के लिए प्रसिद्ध।",
      mr: "भक्ती आणि रामानुजांच्या शिक्षणावर केंद्रित. विस्तृत देव पूजा आणि तात्त्विक प्रवचनासाठी प्रसिद्ध.",
    },
    established: "Ancient",
  },
  {
    name: "Shri Panchayati Bada Udasin Akhada",
    tradition: "Udasin",
    description: {
      en: "Founded on the teachings of Shri Chandra (son of Guru Nanak Dev Ji). They transcend sectarian boundaries and practice universal spirituality.",
      hi: "श्री चंद्र (गुरु नानक देव जी के पुत्र) की शिक्षाओं पर स्थापित। वे सांप्रदायिक सीमाओं से परे सार्वभौमिक आध्यात्मिकता का अभ्यास करते हैं।",
      mr: "श्री चंद्र (गुरू नानक देव जींचे पुत्र) यांच्या शिक्षणावर स्थापित. ते सांप्रदायिक सीमा ओलांडून सार्वत्रिक आध्यात्मिकतेचा अभ्यास करतात.",
    },
    established: "1710 CE",
  },
  {
    name: "Shri Panchayati Akhada Naya Udasin",
    tradition: "Udasin",
    description: {
      en: "A newer branch of the Udasin tradition, maintaining the syncretic spiritual practices that blend Hindu and Sikh mysticism.",
      hi: "उदासीन परंपरा की एक नई शाखा, हिन्दू और सिख रहस्यवाद को मिलाने वाली समन्वयवादी आध्यात्मिक साधनाओं को बनाए रखती है।",
      mr: "उदासीन परंपरेची नवीन शाखा, हिंदू आणि शीख रहस्यवाद मिसळणाऱ्या समन्वयवादी आध्यात्मिक साधना जतन करते.",
    },
    established: "1710 CE",
  },
  {
    name: "Shri Nirmal Panchayati Akhada",
    tradition: "Nirmal",
    description: {
      en: "Rooted in the teachings of Guru Gobind Singh Ji, this akhada combines Sikh spiritual practices with the ancient Kumbh tradition.",
      hi: "गुरु गोबिंद सिंह जी की शिक्षाओं में निहित, यह अखाड़ा सिख आध्यात्मिक साधनाओं को प्राचीन कुंभ परंपरा के साथ जोड़ता है।",
      mr: "गुरू गोबिंद सिंग जींच्या शिक्षणात मूळ असलेला, हा अखाडा शीख आध्यात्मिक साधना प्राचीन कुंभ परंपरेसह जोडतो.",
    },
    established: "1784 CE",
  },
  {
    name: "Kinnar Akhada",
    tradition: "Kinnar",
    description: {
      en: "A historic akhada representing the transgender community in the ancient Kumbh tradition, recognized in 2019. Led by Mahamandaleshwar Laxmi Narayan Tripathi.",
      hi: "प्राचीन कुंभ परंपरा में ट्रांसजेंडर समुदाय का प्रतिनिधित्व करने वाला एक ऐतिहासिक अखाड़ा, 2019 में मान्यता प्राप्त। महामंडलेश्वर लक्ष्मी नारायण त्रिपाठी के नेतृत्व में।",
      mr: "प्राचीन कुंभ परंपरेत ट्रान्सजेंडर समुदायाचे प्रतिनिधित्व करणारा एक ऐतिहासिक अखाडा, 2019 मध्ये मान्यताप्राप्त. महामंडलेश्वर लक्ष्मी नारायण त्रिपाठी यांच्या नेतृत्वाखाली.",
    },
    established: "2019 CE",
  },
];

// ─── GALLERY IMAGES ─────────────────────────────────────────────────────────

export interface GalleryImageI18n {
  src: string;
  alt: I18nText;
  category: I18nText;
}

export const galleryImagesI18n: GalleryImageI18n[] = [
  { src: "/images/gallery/kumbh-1.webp", alt: { en: "Millions of devotees at the Godavari ghats during Shahi Snan", hi: "शाही स्नान के दौरान गोदावरी घाट पर लाखों श्रद्धालु", mr: "शाही स्नानादरम्यान गोदावरी घाटावर लाखो भाविक" }, category: { en: "Shahi Snan", hi: "शाही स्नान", mr: "शाही स्नान" } },
  { src: "/images/gallery/kumbh-2.webp", alt: { en: "Naga sadhus in grand procession", hi: "भव्य जुलूस में नागा साधु", mr: "भव्य मिरवणुकीत नागा साधू" }, category: { en: "Processions", hi: "जुलूस", mr: "मिरवणुका" } },
  { src: "/images/gallery/kumbh-3.webp", alt: { en: "Evening Ganga Aarti at the Godavari", hi: "गोदावरी पर संध्या गंगा आरती", mr: "गोदावरीवर संध्याकाळची गंगा आरती" }, category: { en: "Aarti", hi: "आरती", mr: "आरती" } },
  { src: "/images/gallery/kumbh-4.webp", alt: { en: "Aerial view of the Kumbh Mela grounds", hi: "कुंभ मेला मैदान का हवाई दृश्य", mr: "कुंभमेळा मैदानाचे हवाई दृश्य" }, category: { en: "Aerial", hi: "हवाई दृश्य", mr: "हवाई दृश्य" } },
  { src: "/images/gallery/kumbh-5.webp", alt: { en: "Devotees performing sacred rituals", hi: "पवित्र अनुष्ठान करते श्रद्धालु", mr: "पवित्र विधी करणारे भाविक" }, category: { en: "Rituals", hi: "अनुष्ठान", mr: "विधी" } },
  { src: "/images/gallery/kumbh-6.webp", alt: { en: "Ancient Kalaram Temple in Panchavati", hi: "पंचवटी का प्राचीन कालाराम मंदिर", mr: "पंचवटीतील प्राचीन कालाराम मंदिर" }, category: { en: "Temples", hi: "मंदिर", mr: "मंदिरे" } },
  { src: "/images/gallery/kumbh-7.webp", alt: { en: "Sunrise over the Godavari River", hi: "गोदावरी नदी पर सूर्योदय", mr: "गोदावरी नदीवरील सूर्योदय" }, category: { en: "Nature", hi: "प्रकृति", mr: "निसर्ग" } },
  { src: "/images/gallery/kumbh-8.webp", alt: { en: "Sadhus in meditation along the riverbank", hi: "नदी किनारे ध्यान करते साधु", mr: "नदी किनाऱ्यावर ध्यान करणारे साधू" }, category: { en: "Spiritual", hi: "आध्यात्मिक", mr: "आध्यात्मिक" } },
  { src: "/images/gallery/kumbh-9.webp", alt: { en: "Grand decorated elephants in procession", hi: "जुलूस में भव्य सजे हाथी", mr: "मिरवणुकीत भव्य सजवलेले हत्ती" }, category: { en: "Processions", hi: "जुलूस", mr: "मिरवणुका" } },
  { src: "/images/gallery/kumbh-10.webp", alt: { en: "Cultural dance performances at Kumbh", hi: "कुंभ में सांस्कृतिक नृत्य प्रदर्शन", mr: "कुंभातील सांस्कृतिक नृत्य प्रदर्शन" }, category: { en: "Cultural", hi: "सांस्कृतिक", mr: "सांस्कृतिक" } },
  { src: "/images/gallery/kumbh-11.webp", alt: { en: "Flower offerings at Ram Kund", hi: "रामकुंड पर पुष्प अर्पण", mr: "रामकुंडावर पुष्पार्पण" }, category: { en: "Rituals", hi: "अनुष्ठान", mr: "विधी" } },
  { src: "/images/gallery/kumbh-12.webp", alt: { en: "Night view of illuminated ghats", hi: "प्रकाशित घाटों का रात्रि दृश्य", mr: "प्रकाशित घाटांचे रात्रीचे दृश्य" }, category: { en: "Night", hi: "रात्रि", mr: "रात्र" } },
];

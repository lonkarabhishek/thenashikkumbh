import type { Locale } from "@/i18n/translations";

export type L = Record<Locale, string>;
export interface Faq { q: L; a: L }

export const COUNTDOWN_COPY = {
  path: "/kumbh-countdown",
  title: {
    en: "Nashik Kumbh 2027 Countdown: Days to Dhwajarohan and Amrit Snan",
    hi: "नाशिक कुंभ 2027 काउंटडाउन: ध्वजारोहण और अमृत स्नान में कितने दिन",
    mr: "नाशिक कुंभ २०२७ काउंटडाउन: ध्वजारोहण आणि अमृत स्नानास किती दिवस",
  },
  desc: {
    en: "Live Kumbh Mela countdown to the 31 October 2026 flag hoisting and each Amrit Snan in Nashik and Trimbakeshwar. Add dates to your calendar, share on WhatsApp, and use a short planning checklist.",
    hi: "31 अक्टूबर 2026 के ध्वजारोहण और नाशिक-त्र्यंबकेश्वर के हर अमृत स्नान तक लाइव कुंभ मेला काउंटडाउन। तिथियाँ कैलेंडर में जोड़ें, WhatsApp पर शेयर करें और छोटी तैयारी सूची देखें।",
    mr: "३१ ऑक्टोबर २०२६ च्या ध्वजारोहणापर्यंत आणि नाशिक-त्र्यंबकेश्वरच्या प्रत्येक अमृत स्नानापर्यंत थेट कुंभमेळा काउंटडाउन. तारखा कॅलेंडरमध्ये जोडा, WhatsApp वर शेअर करा आणि नियोजनाची छोटी यादी पाहा.",
  },
  crumb: { en: "Kumbh countdown", hi: "कुंभ काउंटडाउन", mr: "कुंभ काउंटडाउन" },
  h1: { en: "Nashik Kumbh 2027 Countdown", hi: "नाशिक कुंभ 2027 काउंटडाउन", mr: "नाशिक कुंभ २०२७ काउंटडाउन" },
  lead: {
    en: "How long until the Kumbh Mela begins in Nashik and Trimbakeshwar? The first countdown is to the Dhwajarohan (flag hoisting) on 31 October 2026 at 12:02 PM. Below it, each Amrit Snan of 2027 and the close of the Simhastha.",
    hi: "नाशिक और त्र्यंबकेश्वर में कुंभ मेला शुरू होने में कितना समय बचा है? पहला काउंटडाउन 31 अक्टूबर 2026, दोपहर 12:02 बजे के ध्वजारोहण का है। उसके नीचे 2027 का हर अमृत स्नान और सिंहस्थ की समाप्ति।",
    mr: "नाशिक आणि त्र्यंबकेश्वरमध्ये कुंभमेळा सुरू होण्यास किती वेळ उरला आहे? पहिले काउंटडाउन ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजताच्या ध्वजारोहणाचे आहे. त्याखाली २०२७ चा प्रत्येक अमृत स्नान आणि सिंहस्थाची सांगता.",
  },
  until: { en: "until", hi: "तक", mr: "पर्यंत" },
  d: { en: "days", hi: "दिन", mr: "दिवस" },
  h: { en: "hours", hi: "घंटे", mr: "तास" },
  m: { en: "min", hi: "मिनट", mr: "मिनिटे" },
  s: { en: "sec", hi: "सेकंड", mr: "सेकंद" },
  passed: { en: "This date has passed", hi: "यह तिथि बीत चुकी है", mr: "ही तारीख उलटून गेली आहे" },
  timeNote: {
    en: "Counts down to 12:02 PM IST, the official time.",
    hi: "आधिकारिक समय, 12:02 PM IST तक की गिनती।",
    mr: "अधिकृत वेळ, दुपारी १२:०२ (IST) पर्यंतची मोजणी.",
  },
  noTimeNote: {
    en: "No official hour has been published, so this counts down to the start of the day (IST).",
    hi: "कोई आधिकारिक समय घोषित नहीं हुआ है, इसलिए यह उस दिन की शुरुआत (IST) तक की गिनती है।",
    mr: "अधिकृत वेळ जाहीर झालेली नाही, म्हणून ही मोजणी त्या दिवसाच्या सुरुवातीपर्यंत (IST) आहे.",
  },
  addCal: { en: "Add to calendar", hi: "कैलेंडर में जोड़ें", mr: "कॅलेंडरमध्ये जोडा" },
  ics: { en: "Download .ics", hi: ".ics डाउनलोड", mr: ".ics डाउनलोड" },
  gcal: { en: "Google Calendar", hi: "Google कैलेंडर", mr: "Google कॅलेंडर" },
  share: { en: "Share on WhatsApp", hi: "WhatsApp पर शेयर करें", mr: "WhatsApp वर शेअर करा" },
  shareText: {
    en: "Nashik Kumbh 2027 countdown: flag hoisting on 31 October 2026 at 12:02 PM, first Amrit Snan on 2 August 2027.",
    hi: "नाशिक कुंभ 2027 काउंटडाउन: 31 अक्टूबर 2026 को दोपहर 12:02 बजे ध्वजारोहण, पहला अमृत स्नान 2 अगस्त 2027।",
    mr: "नाशिक कुंभ २०२७ काउंटडाउन: ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजता ध्वजारोहण, पहिला अमृत स्नान २ ऑगस्ट २०२७.",
  },
  datesLead: {
    en: "These dates come from the same official schedule as our dates page. For the full schedule, parva days, tithis and sources, see",
    hi: "ये तिथियाँ हमारे तिथि पेज वाले उसी आधिकारिक कार्यक्रम से ली गई हैं। पूरे कार्यक्रम, पर्व दिनों, तिथियों और स्रोतों के लिए देखें",
    mr: "या तारखा आमच्या तारखांच्या पानावरील त्याच अधिकृत वेळापत्रकातून घेतल्या आहेत. संपूर्ण वेळापत्रक, पर्व दिवस, तिथी आणि स्रोतांसाठी पाहा",
  },
  datesLink: { en: "Amrit Snan and Kumbh dates 2027", hi: "अमृत स्नान और कुंभ तिथियाँ 2027", mr: "अमृत स्नान आणि कुंभ तारखा २०२७" },
  checklistH: { en: "Planning checklist", hi: "तैयारी की सूची", mr: "नियोजनाची यादी" },
  checklistNote: {
    en: "Built only from facts already published on this site. Amrit Snan hours have not been officially announced.",
    hi: "केवल इस साइट पर पहले से प्रकाशित तथ्यों से बनी। अमृत स्नान के समय आधिकारिक रूप से घोषित नहीं हुए हैं।",
    mr: "फक्त या साइटवर आधी प्रसिद्ध झालेल्या तथ्यांवरून तयार केली आहे. अमृत स्नानाच्या वेळा अधिकृतपणे जाहीर झालेल्या नाहीत.",
  },
  faqH: { en: "Questions about the countdown", hi: "काउंटडाउन के बारे में सवाल", mr: "काउंटडाउनविषयी प्रश्न" },
  relatedH: { en: "Related pages", hi: "संबंधित पेज", mr: "संबंधित पाने" },
  updated: { en: "Dates last checked", hi: "तिथियाँ अंतिम बार जाँची गईं", mr: "तारखा शेवटच्या तपासल्या" },
};

export interface CheckItem { text: L; href?: string; link?: L }
export const CHECKLIST: CheckItem[] = [
  {
    text: {
      en: "Know the dates: flag hoisting 31 October 2026, then the Amrit Snans of 2027. Use the full dates page for parva days and sources.",
      hi: "तिथियाँ जानें: 31 अक्टूबर 2026 को ध्वजारोहण, फिर 2027 के अमृत स्नान। पर्व दिन और स्रोत पूरे तिथि पेज पर देखें।",
      mr: "तारखा जाणून घ्या: ३१ ऑक्टोबर २०२६ ला ध्वजारोहण, मग २०२७ चे अमृत स्नान. पर्व दिवस आणि स्रोतांसाठी संपूर्ण तारखांचे पान पाहा.",
    },
    href: "/dates",
    link: { en: "Open the dates page", hi: "तिथि पेज खोलें", mr: "तारखांचे पान उघडा" },
  },
  {
    text: {
      en: "Check what is open now: Ramkund access is restricted in phases and Kushavarta in Trimbakeshwar is closed for renovation until about 31 October.",
      hi: "देखें अभी क्या खुला है: रामकुंड में प्रवेश चरणों में सीमित है और त्र्यंबकेश्वर का कुशावर्त लगभग 31 अक्टूबर तक नवीनीकरण के लिए बंद है।",
      mr: "सध्या काय खुले आहे ते तपासा: रामकुंडाचा प्रवेश टप्प्याटप्प्याने मर्यादित आहे आणि त्र्यंबकेश्वरचे कुशावर्त सुमारे ३१ ऑक्टोबरपर्यंत नूतनीकरणासाठी बंद आहे.",
    },
    href: "/kumbh-status",
    link: { en: "Open the status board", hi: "स्टेटस बोर्ड खोलें", mr: "स्टेटस बोर्ड उघडा" },
  },
  {
    text: {
      en: "Plan around the pre-flag-hoisting events: 17 October (gram sabha, Trimbakeshwar), 20 October ('Har Ghar Kumbh Dhwaj') and 25 October ('Shankhnaad'). Timings are not announced.",
      hi: "ध्वजारोहण से पहले के कार्यक्रमों का ध्यान रखें: 17 अक्टूबर (ग्राम सभा, त्र्यंबकेश्वर), 20 अक्टूबर ('हर घर कुंभ ध्वज') और 25 अक्टूबर ('शंखनाद')। समय घोषित नहीं हैं।",
      mr: "ध्वजारोहणापूर्वीच्या कार्यक्रमांचा विचार करा: १७ ऑक्टोबर (ग्रामसभा, त्र्यंबकेश्वर), २० ऑक्टोबर ('हर घर कुंभ ध्वज') आणि २५ ऑक्टोबर ('शंखनाद'). वेळा जाहीर नाहीत.",
    },
  },
  {
    text: {
      en: "Remember there are two bathing sites: Ramkund in Nashik and Kushavarta in Trimbakeshwar. The third Amrit Snan is on 11 September in Nashik and 12 September in Trimbakeshwar.",
      hi: "याद रखें, स्नान के दो स्थल हैं: नाशिक में रामकुंड और त्र्यंबकेश्वर में कुशावर्त। तीसरा अमृत स्नान नाशिक में 11 सितंबर और त्र्यंबकेश्वर में 12 सितंबर को है।",
      mr: "लक्षात ठेवा, स्नानाची दोन ठिकाणे आहेत: नाशिकमध्ये रामकुंड आणि त्र्यंबकेश्वरमध्ये कुशावर्त. तिसरे अमृत स्नान नाशिकमध्ये ११ सप्टेंबरला आणि त्र्यंबकेश्वरमध्ये १२ सप्टेंबरला आहे.",
    },
    href: "/ghats",
    link: { en: "Ghats and bathing sites", hi: "घाट और स्नान स्थल", mr: "घाट आणि स्नानस्थळे" },
  },
  {
    text: {
      en: "Sort out travel and stay early for the big dates, using the guides for reaching Nashik and where to stay.",
      hi: "बड़ी तिथियों के लिए यात्रा और ठहरने की व्यवस्था पहले से करें; नाशिक पहुँचने और ठहरने के गाइड देखें।",
      mr: "मोठ्या तारखांसाठी प्रवास आणि निवासाची व्यवस्था आधी करा; नाशिकला पोहोचण्याचे आणि निवासाचे मार्गदर्शक पाहा.",
    },
    href: "/how-to-reach",
    link: { en: "How to reach Nashik", hi: "नाशिक कैसे पहुँचें", mr: "नाशिकला कसे पोहोचाल" },
  },
  {
    text: {
      en: "Save the emergency numbers: 112 (emergency) and 108 (ambulance).",
      hi: "आपातकालीन नंबर सेव करें: 112 (आपातकाल) और 108 (एम्बुलेंस)।",
      mr: "आणीबाणीचे क्रमांक सेव्ह करा: ११२ (आणीबाणी) आणि १०८ (रुग्णवाहिका).",
    },
    href: "/emergency",
    link: { en: "Emergency contacts", hi: "आपातकालीन संपर्क", mr: "आणीबाणी संपर्क" },
  },
];

export const COUNTDOWN_FAQS: Faq[] = [
  {
    q: { en: "How many days are left for the Nashik Kumbh Mela?", hi: "नाशिक कुंभ मेले में कितने दिन बचे हैं?", mr: "नाशिक कुंभमेळ्यास किती दिवस उरले आहेत?" },
    a: {
      en: "The counter at the top of this page shows the live time left. The Simhastha formally begins with the Dhwajarohan (flag hoisting) on 31 October 2026 at 12:02 PM, and the first Amrit Snan is on 2 August 2027.",
      hi: "इस पेज के ऊपर का काउंटर बचा हुआ समय लाइव दिखाता है। सिंहस्थ की औपचारिक शुरुआत 31 अक्टूबर 2026 को दोपहर 12:02 बजे ध्वजारोहण से होती है, और पहला अमृत स्नान 2 अगस्त 2027 को है।",
      mr: "या पानावरील वरचे काउंटर उरलेला वेळ थेट दाखवते. सिंहस्थाची औपचारिक सुरुवात ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजता ध्वजारोहणाने होते आणि पहिले अमृत स्नान २ ऑगस्ट २०२७ ला आहे.",
    },
  },
  {
    q: { en: "What time is the flag hoisting on 31 October 2026?", hi: "31 अक्टूबर 2026 को ध्वजारोहण कितने बजे है?", mr: "३१ ऑक्टोबर २०२६ ला ध्वजारोहण किती वाजता आहे?" },
    a: {
      en: "12:02 PM. Flags go up at the same moment at Ramkund in Nashik and Kushavarta in Trimbakeshwar, according to the NTKMA Kumbh Mela Plan.",
      hi: "दोपहर 12:02 बजे। NTKMA कुंभ मेला योजना के अनुसार नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक ही क्षण ध्वज फहराए जाते हैं।",
      mr: "दुपारी १२:०२ वाजता. NTKMA कुंभमेळा आराखड्यानुसार नाशिकच्या रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर एकाच वेळी ध्वज फडकवले जातात.",
    },
  },
  {
    q: { en: "Have the Amrit Snan timings been announced?", hi: "क्या अमृत स्नान के समय घोषित हो गए हैं?", mr: "अमृत स्नानाच्या वेळा जाहीर झाल्या आहेत का?" },
    a: {
      en: "No. Only the dates are official. The countdown for each Amrit Snan therefore runs to the start of that day (IST). We will update when timings are published.",
      hi: "नहीं। केवल तिथियाँ आधिकारिक हैं। इसलिए हर अमृत स्नान का काउंटडाउन उस दिन की शुरुआत (IST) तक चलता है। समय घोषित होते ही हम अपडेट करेंगे।",
      mr: "नाही. फक्त तारखा अधिकृत आहेत. म्हणून प्रत्येक अमृत स्नानाचे काउंटडाउन त्या दिवसाच्या सुरुवातीपर्यंत (IST) चालते. वेळा जाहीर झाल्यावर आम्ही बदल करू.",
    },
  },
  {
    q: { en: "Can I add the Kumbh dates to my phone calendar?", hi: "क्या मैं कुंभ की तिथियाँ फ़ोन के कैलेंडर में जोड़ सकता हूँ?", mr: "मी कुंभ तारखा फोनच्या कॅलेंडरमध्ये जोडू शकतो का?" },
    a: {
      en: "Yes. Every date has a .ics download (works with Apple, Google and Outlook calendars) and a Google Calendar link.",
      hi: "हाँ। हर तिथि के साथ .ics डाउनलोड (Apple, Google और Outlook कैलेंडर में चलता है) और Google कैलेंडर लिंक है।",
      mr: "हो. प्रत्येक तारखेसाठी .ics डाउनलोड (Apple, Google आणि Outlook कॅलेंडरमध्ये चालते) आणि Google कॅलेंडर लिंक आहे.",
    },
  },
];

export const STATUS_COPY = {
  path: "/kumbh-status",
  title: {
    en: "Kumbh Status Board: What Is Open or Closed in Nashik and Trimbakeshwar",
    hi: "कुंभ स्टेटस बोर्ड: नाशिक और त्र्यंबकेश्वर में क्या खुला है, क्या बंद",
    mr: "कुंभ स्टेटस बोर्ड: नाशिक आणि त्र्यंबकेश्वरमध्ये काय खुले, काय बंद",
  },
  desc: {
    en: "What is open, closed or restricted right now for Kumbh 2027 in Nashik and Trimbakeshwar: Ramkund access, Kushavarta Tirth, the Trimbakeshwar hospital and upcoming events, each marked confirmed or reported with a source and date.",
    hi: "नाशिक और त्र्यंबकेश्वर में कुंभ 2027 के लिए अभी क्या खुला, बंद या सीमित है: रामकुंड प्रवेश, कुशावर्त तीर्थ, त्र्यंबकेश्वर अस्पताल और आगामी कार्यक्रम, हर एक पर पुष्ट या रिपोर्टेड का निशान, स्रोत और तारीख के साथ।",
    mr: "नाशिक आणि त्र्यंबकेश्वरमध्ये कुंभ २०२७ साठी सध्या काय खुले, बंद किंवा मर्यादित आहे: रामकुंड प्रवेश, कुशावर्त तीर्थ, त्र्यंबकेश्वर रुग्णालय आणि आगामी कार्यक्रम, प्रत्येकावर पुष्टी किंवा वृत्त असा शिक्का, स्रोत आणि तारखेसह.",
  },
  crumb: { en: "Kumbh status board", hi: "कुंभ स्टेटस बोर्ड", mr: "कुंभ स्टेटस बोर्ड" },
  h1: { en: "Kumbh Status Board: Open or Closed Right Now", hi: "कुंभ स्टेटस बोर्ड: अभी खुला या बंद", mr: "कुंभ स्टेटस बोर्ड: सध्या खुले की बंद" },
  lead: {
    en: "A plain list of what is open, closed or still unclear for pilgrims in Nashik and Trimbakeshwar. Every item shows when we last checked it and where the information comes from.",
    hi: "नाशिक और त्र्यंबकेश्वर में श्रद्धालुओं के लिए क्या खुला, बंद या अभी अस्पष्ट है, उसकी सीधी सूची। हर आइटम में दिखता है कि हमने उसे कब जाँचा और जानकारी कहाँ से आई।",
    mr: "नाशिक आणि त्र्यंबकेश्वरमधील भाविकांसाठी काय खुले, बंद किंवा अजून अस्पष्ट आहे याची सरळ यादी. प्रत्येक मुद्द्यावर आम्ही तो कधी तपासला आणि माहिती कुठून आली हे दिसते.",
  },
  lastUpdated: { en: "Board last updated", hi: "बोर्ड अंतिम बार अपडेट", mr: "बोर्ड शेवटचे अद्ययावत" },
  itemChecked: { en: "Checked", hi: "जाँचा गया", mr: "तपासले" },
  confirmed: { en: "CONFIRMED", hi: "पुष्ट", mr: "पुष्टी" },
  reported: { en: "REPORTED", hi: "रिपोर्टेड", mr: "वृत्त" },
  legend: {
    en: "CONFIRMED means an official source, or an official speaking on record and named, says it. REPORTED means it comes from media only or is still a proposal.",
    hi: "पुष्ट का अर्थ है कि आधिकारिक स्रोत, या नाम के साथ ऑन-रिकॉर्ड बोलने वाला अधिकारी, यह कहता है। रिपोर्टेड का अर्थ है कि यह केवल मीडिया से है या अभी प्रस्ताव है।",
    mr: "पुष्टी म्हणजे अधिकृत स्रोत किंवा नाव घेऊन अधिकृतपणे बोलणारा अधिकारी हे सांगतो. वृत्त म्हणजे हे फक्त माध्यमांतून आले आहे किंवा अजून प्रस्ताव आहे.",
  },
  states: {
    closed: { en: "Closed", hi: "बंद", mr: "बंद" },
    restricted: { en: "Restricted", hi: "सीमित", mr: "मर्यादित" },
    upcoming: { en: "Upcoming", hi: "आगामी", mr: "आगामी" },
    unsettled: { en: "Unsettled", hi: "अनिश्चित", mr: "अनिश्चित" },
  } as Record<string, L>,
  notKnown: { en: "Not yet known", hi: "अभी पता नहीं", mr: "अजून माहीत नाही" },
  source: { en: "Source", hi: "स्रोत", mr: "स्रोत" },
  fullStory: { en: "Read the full news post", hi: "पूरी खबर पढ़ें", mr: "संपूर्ण बातमी वाचा" },
  disclaimer: {
    en: "This is an independent site, not an official notice. Check with the Nashik-Trimbakeshwar Kumbh Mela Authority before you travel.",
    hi: "यह एक स्वतंत्र साइट है, आधिकारिक सूचना नहीं। यात्रा से पहले नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण से पुष्टि कर लें।",
    mr: "ही स्वतंत्र साइट आहे, अधिकृत सूचना नाही. प्रवासापूर्वी नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाकडे खात्री करा.",
  },
  faqH: { en: "Questions about what is open", hi: "क्या खुला है, इस बारे में सवाल", mr: "काय खुले आहे याविषयी प्रश्न" },
  relatedH: { en: "Related pages", hi: "संबंधित पेज", mr: "संबंधित पाने" },
};

export const STATUS_FAQS: Faq[] = [
  {
    q: { en: "Is Ramkund open for pilgrims right now?", hi: "क्या रामकुंड अभी श्रद्धालुओं के लिए खुला है?", mr: "रामकुंड सध्या भाविकांसाठी खुले आहे का?" },
    a: {
      en: "Public access around Ramkund, between Ahilyabai Holkar bridge and Talukteshwar temple, is restricted for 15 to 20 days from the NMC announcement on 12 October, in phases, while works finish before the 31 October flag hoisting. Dashkriya rituals continue at the designated site. See the board above for the latest check date.",
      hi: "12 अक्टूबर की NMC घोषणा से 15 से 20 दिन तक अहिल्याबाई होलकर पुल और तालुकतेश्वर मंदिर के बीच रामकुंड परिसर में आम प्रवेश चरणों में सीमित है, ताकि 31 अक्टूबर के ध्वजारोहण से पहले काम पूरे हों। दशक्रिया विधि तय जगह पर जारी है। ताज़ा जाँच की तारीख ऊपर बोर्ड में देखें।",
      mr: "१२ ऑक्टोबरच्या महापालिकेच्या घोषणेपासून १५ ते २० दिवस अहिल्याबाई होळकर पूल ते तालुकतेश्वर मंदिर दरम्यान रामकुंड परिसरात सर्वसामान्यांचा प्रवेश टप्प्याटप्प्याने मर्यादित आहे, जेणेकरून ३१ ऑक्टोबरच्या ध्वजारोहणापूर्वी कामे पूर्ण होतील. दशक्रिया विधी नेमलेल्या ठिकाणी सुरू आहेत. ताज्या तपासणीची तारीख वरील बोर्डवर पाहा.",
    },
  },
  {
    q: { en: "Is Kushavarta Tirth in Trimbakeshwar open?", hi: "क्या त्र्यंबकेश्वर का कुशावर्त तीर्थ खुला है?", mr: "त्र्यंबकेश्वरचे कुशावर्त तीर्थ खुले आहे का?" },
    a: {
      en: "No. It has been closed for renovation since 30 September. The renovated kund is to be inaugurated on 31 October; sources differ by a day on the exact reopening date.",
      hi: "नहीं। यह 30 सितंबर से नवीनीकरण के लिए बंद है। नए रूप में कुंड का उद्घाटन 31 अक्टूबर को होना है; दोबारा खुलने की सटीक तारीख पर स्रोतों में एक दिन का अंतर है।",
      mr: "नाही. ते ३० सप्टेंबरपासून नूतनीकरणासाठी बंद आहे. नव्या रूपातील कुंडाचे लोकार्पण ३१ ऑक्टोबरला होणार आहे; पुन्हा खुले होण्याच्या नेमक्या तारखेबाबत स्रोतांमध्ये एका दिवसाचा फरक आहे.",
    },
  },
  {
    q: { en: "Where is the Trimbakeshwar sub-district hospital now?", hi: "त्र्यंबकेश्वर उप-जिला अस्पताल अभी कहाँ है?", mr: "त्र्यंबकेश्वर उपजिल्हा रुग्णालय सध्या कुठे आहे?" },
    a: {
      en: "For now it runs with 50 beds at Tupadevi Phata, about 4 km out of town. A new site opposite the police station has been reported as approved for a 100-bed hospital, but that is not officially confirmed and no dates are given.",
      hi: "फ़िलहाल यह शहर से लगभग 4 किमी दूर तुपादेवी फाटा पर 50 बेड के साथ चल रहा है। पुलिस थाने के सामने 100 बेड के अस्पताल के लिए नई जगह की मंज़ूरी की खबर है, पर यह आधिकारिक रूप से पुष्ट नहीं है और कोई तारीख नहीं दी गई है।",
      mr: "सध्या ते शहरापासून सुमारे ४ किमी दूर तुपादेवी फाटा येथे ५० खाटांसह सुरू आहे. पोलीस ठाण्यासमोर १०० खाटांच्या रुग्णालयासाठी नव्या जागेला मंजुरी मिळाल्याचे वृत्त आहे, पण त्याची अधिकृत पुष्टी नाही आणि कोणत्याही तारखा दिलेल्या नाहीत.",
    },
  },
  {
    q: { en: "How often is this board updated?", hi: "यह बोर्ड कितनी बार अपडेट होता है?", mr: "हे बोर्ड किती वेळा अद्ययावत होते?" },
    a: {
      en: "Each item shows its own last-checked date, and the board shows the newest of them at the top. We update an item when a new official statement or a reliable news report changes it, and remove items that stop being true.",
      hi: "हर आइटम पर उसकी अपनी अंतिम जाँच की तारीख है, और बोर्ड के ऊपर उनमें से सबसे नई तारीख दिखती है। नया आधिकारिक बयान या भरोसेमंद खबर बदलाव लाए तो हम आइटम अपडेट करते हैं, और जो बात सही नहीं रहती उसे हटा देते हैं।",
      mr: "प्रत्येक मुद्द्यावर त्याची स्वतःची शेवटची तपासणी तारीख आहे आणि बोर्डच्या वर त्यातली सर्वात नवी तारीख दिसते. नवे अधिकृत वक्तव्य किंवा विश्वसनीय बातमीमुळे बदल झाला की आम्ही मुद्दा अद्ययावत करतो आणि खरा न राहिलेला मुद्दा काढून टाकतो.",
    },
  },
];

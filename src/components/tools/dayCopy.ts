import type { Faq, L } from "@/components/tools/toolCopy";
import type { Reason } from "@/lib/dayPicker";
import { amritPhrase, bathingDays, leadAnswer, melaBounds, parvaPhrase } from "@/lib/dayPicker";
import { formatDate, localDigits } from "@/lib/dates";
import type { Locale } from "@/i18n/translations";

export const DAY_COPY = {
  path: "/day-picker",
  title: {
    en: "Which Day Should I Go to the Nashik Kumbh 2027?",
    hi: "नाशिक कुंभ 2027: किस दिन जाएँ?",
    mr: "नाशिक कुंभ २०२७: कोणत्या दिवशी जायचे?",
  },
  desc: {
    en: "Compare Amrit Snan days with ordinary days in the Nashik–Trimbakeshwar main mela, 15 June to 30 September 2027. Colours come from the same verified schedule as the dates page. This is not a crowd forecast.",
    hi: "नाशिक–त्र्यंबकेश्वर के मुख्य मेले, 15 जून से 30 सितंबर 2027, में अमृत स्नान के दिनों की तुलना साधारण दिनों से करें। रंग तिथि पेज वाले ही सत्यापित कार्यक्रम से आते हैं। यह भीड़ का पूर्वानुमान नहीं है।",
    mr: "नाशिक–त्र्यंबकेश्वरच्या मुख्य मेळ्यात, १५ जून ते ३० सप्टेंबर २०२७, अमृत स्नानाच्या दिवसांची तुलना साध्या दिवसांशी करा. रंग तिथी पानाच्या त्याच तपासलेल्या वेळापत्रकातून येतात. हा गर्दीचा अंदाज नाही.",
  },
  crumb: { en: "Which day to go", hi: "किस दिन जाएँ", mr: "कोणत्या दिवशी जायचे" },
  h1: { en: "Which day should I go?", hi: "किस दिन जाएँ?", mr: "कोणत्या दिवशी जायचे?" },
  lead: {
    en: "A day picker for Nashik and Trimbakeshwar during the main mela. Choose a month, a place, and whether you want the Amrit Snan or a quieter day.",
    hi: "मुख्य मेले के दौरान नाशिक और त्र्यंबकेश्वर के लिए दिन चुनने का साधन। महीना, जगह, और यह चुनें कि अमृत स्नान चाहिए या शांत दिन।",
    mr: "मुख्य मेळ्यादरम्यान नाशिक आणि त्र्यंबकेश्वरसाठी दिवस निवडण्याचे साधन. महिना, ठिकाण आणि अमृत स्नान हवे की शांत दिवस ते निवडा.",
  },
  answerH: {
    en: "Go on an Amrit Snan for the royal bath, and on any other main-mela day for a quieter visit",
    hi: "शाही स्नान के लिए अमृत स्नान के दिन जाएँ, शांत भेंट के लिए मुख्य मेले का कोई और दिन",
    mr: "शाही स्नानासाठी अमृत स्नानाच्या दिवशी जा, शांत भेटीसाठी मुख्य मेळ्यातील दुसरा दिवस",
  },
  moreDates: {
    en: "Bathing days continue after September 2027. This picker stops at the major mela period.",
    hi: "सितंबर 2027 के बाद भी स्नान के दिन चलते हैं। यह साधन मुख्य मेला अवधि तक ही रंग देता है।",
    mr: "सप्टेंबर २०२७ नंतरही स्नानाचे दिवस सुरू राहतात. हे साधन फक्त मुख्य मेळा कालावधी रंगवते.",
  },
  datesLink: { en: "Full Kumbh schedule", hi: "पूरा कुंभ कार्यक्रम", mr: "संपूर्ण कुंभ वेळापत्रक" },
  parvaLink: { en: "Parva Snan calendar through 2028", hi: "2028 तक का पर्व स्नान कैलेंडर", mr: "२०२८ पर्यंतची पर्व स्नान दिनदर्शिका" },
  intentLegend: { en: "What do you want from the day?", hi: "उस दिन आप क्या चाहते हैं?", mr: "त्या दिवसापासून काय हवे आहे?" },
  intentSnan: { en: "Amrit / Shahi Snan", hi: "अमृत / शाही स्नान", mr: "अमृत / शाही स्नान" },
  intentQuiet: { en: "Avoid the crowds", hi: "भीड़ से बचें", mr: "गर्दी टाळा" },
  intentElderly: { en: "Easier for elderly", hi: "बुजुर्गों के लिए आसान", mr: "ज्येष्ठांसाठी सोपे" },
  placeLegend: { en: "Where do you want to bathe?", hi: "कहाँ स्नान करना है?", mr: "कुठे स्नान करायचे आहे?" },
  placeNashik: { en: "Nashik", hi: "नाशिक", mr: "नाशिक" },
  placeTrimbak: { en: "Trimbakeshwar", hi: "त्र्यंबकेश्वर", mr: "त्र्यंबकेश्वर" },
  placeEither: { en: "Either", hi: "कोई भी", mr: "कोणतेही" },
  scopeLegend: { en: "Which part of the main mela?", hi: "मुख्य मेले का कौन सा हिस्सा?", mr: "मुख्य मेळ्याचा कोणता भाग?" },
  modeMonth: { en: "A month", hi: "एक महीना", mr: "एक महिना" },
  modeRange: { en: "A date range", hi: "तिथि सीमा", mr: "तारीख मर्यादा" },
  from: { en: "From", hi: "से", mr: "पासून" },
  to: { en: "To", hi: "तक", mr: "पर्यंत" },
  badRange: {
    en: "The end date is before the start date.",
    hi: "अंतिम तिथि आरंभ तिथि से पहले है।",
    mr: "शेवटची तारीख सुरुवातीच्या आधी आहे.",
  },
  pickRange: {
    en: "Choose both dates. Only days inside the main mela are coloured.",
    hi: "दोनों तिथियाँ चुनें। रंग केवल मुख्य मेले के दिनों पर हैं।",
    mr: "दोन्ही तारखा निवडा. रंग फक्त मुख्य मेळ्याच्या दिवसांवर आहेत.",
  },
  weekdays: {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    mr: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
  },
  legendOutside: { en: "Outside the main mela", hi: "मुख्य मेले के बाहर", mr: "मुख्य मेळ्याबाहेर" },
  markYes: { en: "Yes", hi: "हाँ", mr: "हो" },
  markNote: { en: "Note", hi: "नोट", mr: "टीप" },
  markNo: { en: "No", hi: "नहीं", mr: "नाही" },
  summaryH: { en: "What this choice shows", hi: "यह चुनाव क्या दिखाता है", mr: "ही निवड काय दाखवते" },
  dayH: { en: "This day", hi: "यह दिन", mr: "हा दिवस" },
  clearDay: { en: "Back to the month", hi: "महीने पर वापस", mr: "महिन्यावर परत" },
  countGreen: { en: "green", hi: "हरा", mr: "हिरवा" },
  countAmber: { en: "amber", hi: "पीला", mr: "पिवळा" },
  countRed: { en: "red", hi: "लाल", mr: "लाल" },
  goOn: { en: "Go on these days", hi: "इन दिनों जाएँ", mr: "या दिवशी जा" },
  avoid: { en: "These are Amrit Snan days for your place", hi: "ये आपके स्थान के अमृत स्नान के दिन हैं", mr: "ही तुमच्या ठिकाणचे अमृत स्नान दिवस आहेत" },
  caution: { en: "Listed, but not the royal bath at your place", hi: "सूची में हैं, पर आपके स्थान का शाही स्नान नहीं", mr: "यादीत आहेत, पण तुमच्या ठिकाणचे शाही स्नान नाही" },
  noneGo: {
    en: "No Amrit Snan at your place falls in these dates.",
    hi: "इन तिथियों में आपके स्थान पर कोई अमृत स्नान नहीं है।",
    mr: "या तारखांमध्ये तुमच्या ठिकाणी अमृत स्नान नाही.",
  },
  noneAvoid: {
    en: "No Amrit Snan at your place falls in these dates.",
    hi: "इन तिथियों में आपके स्थान पर कोई अमृत स्नान नहीं है।",
    mr: "या तारखांमध्ये तुमच्या ठिकाणी अमृत स्नान नाही.",
  },
  quietRest: {
    en: "other days here have no listed Amrit Snan or special parva day for your place.",
    hi: "बाकी दिनों पर आपके स्थान का कोई अमृत स्नान या विशेष पर्व दिवस सूची में नहीं है।",
    mr: "इतर दिवसांवर तुमच्या ठिकाणचे अमृत स्नान किंवा विशेष पर्व दिवस यादीत नाही.",
  },
  snanRest: {
    en: "other days are not listed bathing days for your place.",
    hi: "बाकी दिन आपके स्थान के सूचीबद्ध स्नान दिवस नहीं हैं।",
    mr: "इतर दिवस तुमच्या ठिकाणचे नोंदलेले स्नान दिवस नाहीत.",
  },
  nearestH: { en: "Nearest bathing days", hi: "सबसे नज़दीकी स्नान दिवस", mr: "सर्वात जवळचे स्नान दिवस" },
  nearestNote: {
    en: "From the verified schedule, for the place you chose.",
    hi: "सत्यापित कार्यक्रम से, आपके चुने स्थान के लिए।",
    mr: "तपासलेल्या वेळापत्रकातून, तुम्ही निवडलेल्या ठिकाणासाठी.",
  },
  sameDay: { en: "This day", hi: "यही दिन", mr: "हाच दिवस" },
  inDays: { en: "days later", hi: "दिन बाद", mr: "दिवसांनी" },
  daysEarlier: { en: "days earlier", hi: "दिन पहले", mr: "दिवस आधी" },
  alsoH: { en: "Same date, other place", hi: "उसी दिन, दूसरी जगह", mr: "त्याच दिवशी, दुसरे ठिकाण" },
  parvaName: { en: "Special parva day (Nashik)", hi: "विशेष पर्व दिवस (नाशिक)", mr: "विशेष पर्व दिवस (नाशिक)" },
  notForecast: {
    en: "Green, amber and red describe the published schedule. They do not predict how many people will come, and they are not a medical recommendation.",
    hi: "हरा, पीला और लाल प्रकाशित कार्यक्रम बताते हैं। वे यह नहीं बताते कि कितने लोग आएँगे, और यह चिकित्सकीय सलाह नहीं है।",
    mr: "हिरवा, पिवळा आणि लाल रंग प्रकाशित वेळापत्रक सांगतात. किती लोक येतील हे ते सांगत नाहीत, आणि हा वैद्यकीय सल्ला नाही.",
  },
  elderlyNote: {
    en: "For an easier day, this page only says: do not pick an Amrit Snan at your place. It does not know which ghat has a ramp, or which hour is calmer. Those details are not in the verified schedule.",
    hi: "आसान दिन के लिए यह पेज केवल इतना कहता है: अपने स्थान का अमृत स्नान न चुनें। कौन से घाट पर रैंप है या कौन सा घंटा शांत है, यह सत्यापित कार्यक्रम में नहीं है।",
    mr: "सोप्या दिवसासाठी हे पान फक्त एवढे सांगते: तुमच्या ठिकाणचा अमृत स्नान दिवस निवडू नका. कोणत्या घाटावर रॅम्प आहे किंवा कोणता तास शांत आहे हे तपासलेल्या वेळापत्रकात नाही.",
  },
  source: { en: "Schedule checked", hi: "कार्यक्रम जाँचा गया", mr: "वेळापत्रक तपासले" },
  faqH: { en: "Questions about which day to go", hi: "किस दिन जाएँ, इस पर सवाल", mr: "कोणत्या दिवशी जायचे, यावरील प्रश्न" },
  relatedH: { en: "Related pages", hi: "संबंधित पेज", mr: "संबंधित पाने" },
} as const;

export const DAY_REASONS: Record<Reason, L> = {
  outside: {
    en: "This date is outside the major mela period named in the NTKMA plan. This picker does not rate it.",
    hi: "यह तिथि NTKMA योजना की मुख्य मेला अवधि के बाहर है। यह साधन इसे रंग नहीं देता।",
    mr: "ही तारीख NTKMA आराखड्यातील मुख्य मेळा कालावधीच्या बाहेर आहे. हे साधन तिला रंग देत नाही.",
  },
  "snan-amrit": {
    en: "This is an Amrit Snan at the place you chose. The akhadas go into the water first, and the public follows. These are the crowded royal-bath days on the verified schedule. Bathing hours are not published.",
    hi: "यह आपके चुने स्थान का अमृत स्नान है। अखाड़े पहले जल में उतरते हैं, फिर श्रद्धालु। सत्यापित कार्यक्रम में यही भीड़ वाले शाही स्नान के दिन हैं। स्नान के घंटे घोषित नहीं हैं।",
    mr: "हा तुम्ही निवडलेल्या ठिकाणचा अमृत स्नान आहे. आखाडे आधी पाण्यात उतरतात, मग भाविक. तपासलेल्या वेळापत्रकात हेच गर्दीचे शाही स्नान दिवस आहेत. स्नानाच्या वेळा जाहीर नाहीत.",
  },
  "snan-elsewhere": {
    en: "There is an Amrit Snan on this date, but not at the place you chose. The other city's bath is the next or previous day when the third snan is split.",
    hi: "इस तिथि को अमृत स्नान है, पर आपके चुने स्थान पर नहीं। तीसरा स्नान बँटा होने पर दूसरे शहर का स्नान अगले या पिछले दिन होता है।",
    mr: "या तारखेला अमृत स्नान आहे, पण तुम्ही निवडलेल्या ठिकाणी नाही. तिसरे स्नान विभागलेले असताना दुसऱ्या शहराचे स्नान आदल्या किंवा दुसऱ्या दिवशी असते.",
  },
  "snan-parva": {
    en: "This is one of Nashik's three special parva days. It is a bathing day in the schedule. It is not an Amrit Snan.",
    hi: "यह नाशिक के तीन विशेष पर्व दिनों में से एक है। कार्यक्रम में यह स्नान का दिन है। यह अमृत स्नान नहीं है।",
    mr: "हा नाशिकच्या तीन विशेष पर्व दिवसांपैकी एक आहे. वेळापत्रकात हा स्नानाचा दिवस आहे. हा अमृत स्नान नाही.",
  },
  "snan-ceremony": {
    en: "The schedule lists a ceremony or procession on this date. It is not a bathing day.",
    hi: "कार्यक्रम में इस तिथि पर एक समारोह या शोभायात्रा है। यह स्नान का दिन नहीं है।",
    mr: "वेळापत्रकात या तारखेला सोहळा किंवा मिरवणूक आहे. हा स्नानाचा दिवस नाही.",
  },
  "snan-ordinary": {
    en: "No bathing day is listed here for the place you chose. Look at the nearest Amrit Snan below if that is the bath you want.",
    hi: "आपके चुने स्थान के लिए यहाँ कोई स्नान दिवस सूची में नहीं है। अगर वही स्नान चाहिए तो नीचे नज़दीकी अमृत स्नान देखें।",
    mr: "तुम्ही निवडलेल्या ठिकाणासाठी येथे स्नान दिवस नोंदलेला नाही. ते स्नान हवे असेल तर खालील जवळचे अमृत स्नान पाहा.",
  },
  "quiet-amrit": {
    en: "This is an Amrit Snan at the place you chose. The verified schedule treats these as the royal-bath days, which are the ones to avoid if you want fewer people.",
    hi: "यह आपके चुने स्थान का अमृत स्नान है। सत्यापित कार्यक्रम इन्हें शाही स्नान के दिन मानता है। कम भीड़ चाहिए तो इन्हीं दिनों से बचें।",
    mr: "हा तुम्ही निवडलेल्या ठिकाणचा अमृत स्नान आहे. तपासलेले वेळापत्रक हे शाही स्नानाचे दिवस मानते. कमी गर्दी हवी असेल तर हे दिवस टाळा.",
  },
  "quiet-elsewhere": {
    en: "An Amrit Snan is listed, but at the other place. Your place does not have the royal bath on this date. The cities are close, and this page does not know whether that makes your ghat quieter.",
    hi: "अमृत स्नान सूची में है, पर दूसरी जगह। इस तिथि को आपके स्थान पर शाही स्नान नहीं है। दोनों शहर पास हैं, और यह पेज नहीं जानता कि इससे आपका घाट शांत होगा या नहीं।",
    mr: "अमृत स्नान यादीत आहे, पण दुसऱ्या ठिकाणी. या तारखेला तुमच्या ठिकाणी शाही स्नान नाही. दोन्ही शहरे जवळ आहेत आणि त्यामुळे तुमचा घाट शांत राहील का हे हे पान सांगत नाही.",
  },
  "quiet-parva": {
    en: "This is a special parva day in Nashik, not an Amrit Snan. It is a named bathing day, so it is not marked as an ordinary day. The schedule does not say how it compares for crowds.",
    hi: "यह नाशिक का विशेष पर्व दिवस है, अमृत स्नान नहीं। यह नामित स्नान दिवस है, इसलिए इसे साधारण दिन नहीं माना गया। भीड़ की तुलना कार्यक्रम में नहीं है।",
    mr: "हा नाशिकचा विशेष पर्व दिवस आहे, अमृत स्नान नाही. हा नोंदलेला स्नान दिवस आहे, म्हणून तो साधा दिवस म्हणून दाखवला नाही. गर्दीची तुलना वेळापत्रकात नाही.",
  },
  "quiet-ceremony": {
    en: "A ceremony or procession is listed, not a bath. Nagar Pradakshina is a city procession. It may draw people. This page does not have a crowd figure for it.",
    hi: "एक समारोह या शोभायात्रा सूची में है, स्नान नहीं। नगर प्रदक्षिणा शहर की परिक्रमा है। लोग आ सकते हैं। इस पेज के पास उसकी भीड़ का आँकड़ा नहीं है।",
    mr: "सोहळा किंवा मिरवणूक नोंदली आहे, स्नान नाही. नगरप्रदक्षिणा ही शहराची मिरवणूक आहे. लोक येऊ शकतात. या पानाकडे तिच्या गर्दीचा आकडा नाही.",
  },
  "quiet-ordinary": {
    en: "No Amrit Snan and no special parva day is listed for your place. The main mela is still on, so this is the quieter kind of day in the schedule, not a promise of a small crowd.",
    hi: "आपके स्थान का कोई अमृत स्नान या विशेष पर्व दिवस सूची में नहीं है। मुख्य मेला तब भी चल रहा है। कार्यक्रम में यह शांत किस्म का दिन है, छोटी भीड़ का वादा नहीं।",
    mr: "तुमच्या ठिकाणचा अमृत स्नान किंवा विशेष पर्व दिवस यादीत नाही. मुख्य मेळा तेव्हाही सुरू असतो. वेळापत्रकात हा शांत प्रकारचा दिवस आहे, कमी गर्दीचे वचन नाही.",
  },
};

const LEGEND: Record<"snan" | "quiet", Record<"green" | "amber" | "red", L>> = {
  snan: {
    green: {
      en: "Green: an Amrit Snan at your place",
      hi: "हरा: आपके स्थान का अमृत स्नान",
      mr: "हिरवा: तुमच्या ठिकाणचा अमृत स्नान",
    },
    amber: {
      en: "Amber: a listed parva day, ceremony, or the other city's bath",
      hi: "पीला: सूचीबद्ध पर्व, समारोह, या दूसरे शहर का स्नान",
      mr: "पिवळा: नोंदलेला पर्व दिवस, सोहळा किंवा दुसऱ्या शहराचे स्नान",
    },
    red: {
      en: "Red: not a listed bathing day for your place",
      hi: "लाल: आपके स्थान का सूचीबद्ध स्नान दिवस नहीं",
      mr: "लाल: तुमच्या ठिकाणचा नोंदलेला स्नान दिवस नाही",
    },
  },
  quiet: {
    green: {
      en: "Green: no Amrit Snan or special parva day listed for your place",
      hi: "हरा: आपके स्थान का अमृत स्नान या विशेष पर्व दिवस सूची में नहीं",
      mr: "हिरवा: तुमच्या ठिकाणचा अमृत स्नान किंवा विशेष पर्व दिवस यादीत नाही",
    },
    amber: {
      en: "Amber: a special parva day, a ceremony, or the other city's Amrit Snan",
      hi: "पीला: विशेष पर्व, समारोह, या दूसरे शहर का अमृत स्नान",
      mr: "पिवळा: विशेष पर्व, सोहळा किंवा दुसऱ्या शहराचा अमृत स्नान",
    },
    red: {
      en: "Red: an Amrit Snan at your place",
      hi: "लाल: आपके स्थान का अमृत स्नान",
      mr: "लाल: तुमच्या ठिकाणचा अमृत स्नान",
    },
  },
};

export function legendFor(intent: "snan" | "quiet" | "elderly", band: "green" | "amber" | "red"): L {
  return LEGEND[intent === "snan" ? "snan" : "quiet"][band];
}

function thirdWhen(locale: Locale): string {
  const nashik = bathingDays().find((day) => day.id === "amrit-snan-3-nashik");
  const trimbak = bathingDays().find((day) => day.id === "amrit-snan-3-trimbak");
  const nashikDate = nashik ? formatDate(nashik.isoDate, locale) : "";
  const trimbakDate = trimbak ? formatDate(trimbak.isoDate, locale) : "";
  if (locale === "hi") return `${nashikDate} को नाशिक के रामकुंड पर और ${trimbakDate} को त्र्यंबकेश्वर के कुशावर्त पर है`;
  if (locale === "mr") return `${nashikDate} रोजी नाशिकच्या रामकुंडावर आणि ${trimbakDate} रोजी त्र्यंबकेश्वरच्या कुशावर्तावर आहे`;
  return `${nashikDate} at Ramkund in Nashik and ${trimbakDate} at Kushavarta in Trimbakeshwar`;
}

export function dayPickerFaqs(): Faq[] {
  const bounds = melaBounds();
  const windowLabel = (locale: Locale) =>
    `${formatDate(bounds.startIso, locale)} – ${formatDate(bounds.endIso, locale)}`;
  return [
    {
      q: {
        en: "Which day is quieter at the Nashik Kumbh 2027?",
        hi: "नाशिक कुंभ 2027 में कौन सा दिन शांत है?",
        mr: "नाशिक कुंभ २०२७ मध्ये कोणता दिवस शांत आहे?",
      },
      a: {
        en: `Any day in the main mela (${windowLabel("en")}) that is not an Amrit Snan. The confirmed royal baths are ${amritPhrase("en")}. Nashik's special parva days are ${parvaPhrase("en")}. The picker colours those from the verified schedule. It does not predict how many people will come.`,
        hi: `मुख्य मेले (${windowLabel("hi")}) में अमृत स्नान के अलावा कोई भी दिन। पुष्ट शाही स्नान ये हैं: ${amritPhrase("hi")}। नाशिक के विशेष पर्व दिवस ${parvaPhrase("hi")} हैं। साधन उन्हें सत्यापित कार्यक्रम से रंगता है। कितने लोग आएँगे, यह यह नहीं बताता।`,
        mr: `मुख्य मेळ्यात (${windowLabel("mr")}) अमृत स्नान नसलेला कोणताही दिवस. निश्चित शाही स्नान हे आहेत: ${amritPhrase("mr")}. नाशिकचे विशेष पर्व दिवस ${parvaPhrase("mr")} आहेत. साधन त्यांना तपासलेल्या वेळापत्रकातून रंगवते. किती लोक येतील हे ते सांगत नाही.`,
      },
    },
    {
      q: {
        en: "Which day should I go if I want the Amrit Snan?",
        hi: "अमृत स्नान के लिए किस दिन जाएँ?",
        mr: "अमृत स्नानासाठी कोणत्या दिवशी जायचे?",
      },
      a: {
        en: `Go on ${amritPhrase("en")}. Shahi Snan is the older name for the same bath. The first two are on the same day in Nashik and Trimbakeshwar. The third is a day apart.`,
        hi: `${amritPhrase("hi")} को जाएँ। शाही स्नान उसी स्नान का पुराना नाम है। पहले दो नाशिक और त्र्यंबकेश्वर में एक ही दिन हैं। तीसरा एक दिन के अंतर पर है।`,
        mr: `${amritPhrase("mr")} या दिवशी जा. शाही स्नान हे त्याच स्नानाचे जुने नाव आहे. पहिली दोन नाशिक आणि त्र्यंबकेश्वरमध्ये एकाच दिवशी आहेत. तिसरे एका दिवसाच्या फरकाने आहे.`,
      },
    },
    {
      q: {
        en: "Is Trimbakeshwar on a different day from Nashik?",
        hi: "क्या त्र्यंबकेश्वर का दिन नाशिक से अलग है?",
        mr: "त्र्यंबकेश्वरचा दिवस नाशिकपेक्षा वेगळा आहे का?",
      },
      a: {
        en: `The first two Amrit Snans are on the same day in both places. The third is ${thirdWhen("en")}. The August special parva days are listed for Nashik, not Trimbakeshwar.`,
        hi: `पहले दो अमृत स्नान दोनों जगह एक ही दिन हैं। तीसरा ${thirdWhen("hi")}। अगस्त के विशेष पर्व दिन नाशिक के लिए लिखे हैं, त्र्यंबकेश्वर के लिए नहीं।`,
        mr: `पहिले दोन अमृत स्नान दोन्ही ठिकाणी एकाच दिवशी आहेत. तिसरे ${thirdWhen("mr")}. ऑगस्टचे विशेष पर्व दिवस नाशिकसाठी नोंदले आहेत, त्र्यंबकेश्वरसाठी नाही.`,
      },
    },
    {
      q: {
        en: "Does a green day mean the ghat will be empty?",
        hi: "क्या हरा दिन मतलब घाट खाली होगा?",
        mr: "हिरवा दिवस म्हणजे घाट रिकामा असेल का?",
      },
      a: {
        en: "No. Green means the published schedule has no Amrit Snan and no special parva day for the place you chose. The main mela is still on. Official bathing hours and a day-by-day crowd forecast have not been published. The full schedule is on the dates page.",
        hi: "नहीं। हरा मतलब प्रकाशित कार्यक्रम में आपके स्थान का अमृत स्नान और विशेष पर्व दिवस नहीं है। मुख्य मेला तब भी चल रहा है। आधिकारिक स्नान घंटे और दिन-वार भीड़ पूर्वानुमान प्रकाशित नहीं हुए। पूरा कार्यक्रम तिथि पेज पर है।",
        mr: "नाही. हिरवा म्हणजे प्रकाशित वेळापत्रकात तुमच्या ठिकाणचा अमृत स्नान आणि विशेष पर्व दिवस नाही. मुख्य मेळा तेव्हाही सुरू असतो. अधिकृत स्नान वेळा आणि दिवसानुसार गर्दीचा अंदाज जाहीर झालेला नाही. संपूर्ण वेळापत्रक तिथी पानावर आहे.",
      },
    },
  ];
}

export function answerText(locale: Locale): string {
  return leadAnswer(locale);
}

export function rangeCount(n: number, locale: Locale): string {
  return localDigits(String(n), locale);
}

import type { L10n } from "@/data/verified";

/**
 * KUMBH STATUS BOARD DATA: the single source for /kumbh-status.
 * See docs/STATUS_BOARD.md for how to update it.
 *
 * Rules:
 *  - Add an item only if a news post in src/data/news (or the verified registry)
 *    already carries the fact. `newsSlug` must point at that post.
 *  - `confidence` is "confirmed" only when an official source or an official
 *    on record, quoted by name, says it. Media-only reports are "reported".
 *  - Update `lastUpdated` (YYYY-MM-DD) whenever you re-check or change an item.
 *    The page's headline "last updated" date is the newest item date.
 *  - Remove or rewrite an item once it is no longer true. Never leave stale
 *    "closed" statuses on the board.
 */
export type StatusState = "closed" | "restricted" | "upcoming" | "unsettled";
export type Confidence = "confirmed" | "reported";

export interface StatusItem {
  id: string;
  place: L10n;
  state: StatusState;
  /** Short headline, e.g. "Access limited in phases". */
  headline: L10n;
  detail: L10n;
  /** Plain note on what is NOT known yet. */
  unknown?: L10n;
  confidence: Confidence;
  /** Extra line explaining the confidence label, e.g. which part is only reported. */
  confidenceNote?: L10n;
  lastUpdated: string;
  sourceTitle: string;
  sourceUrl: string;
  /** Slug of the news post under /blog that explains it in full. */
  newsSlug: string;
}

export const statusItems: StatusItem[] = [
  {
    id: "ramkund-access",
    place: { en: "Ramkund and nearby ghats, Nashik", hi: "रामकुंड और आसपास के घाट, नाशिक", mr: "रामकुंड व परिसरातील घाट, नाशिक" },
    state: "restricted",
    headline: {
      en: "Public access restricted for 15–20 days",
      hi: "आम श्रद्धालुओं का प्रवेश 15–20 दिन सीमित",
      mr: "सर्वसामान्य भाविकांचा प्रवेश १५–२० दिवस मर्यादित",
    },
    detail: {
      en: "NMC announced on 12 October that access between Ahilyabai Holkar bridge and Talukteshwar temple is restricted for 15 to 20 days so paving, concreting and other works finish before the 31 October flag hoisting. Pudhari reports the closure is in phases. Dashkriya rituals continue at the designated site.",
      hi: "NMC ने 12 अक्टूबर को बताया कि 31 अक्टूबर के ध्वजारोहण से पहले फ़र्श, कंक्रीट और अन्य काम पूरे करने के लिए अहिल्याबाई होलकर पुल और तालुकतेश्वर मंदिर के बीच प्रवेश 15 से 20 दिन के लिए सीमित है। पुढारी के अनुसार यह बंदी चरणों में है। दशक्रिया विधि तय जगह पर जारी है।",
      mr: "३१ ऑक्टोबरच्या ध्वजारोहणापूर्वी फरसबंदी, काँक्रीट व इतर कामे पूर्ण व्हावीत म्हणून अहिल्याबाई होळकर पूल ते तालुकतेश्वर मंदिर दरम्यानचा प्रवेश १५ ते २० दिवस मर्यादित असल्याचे महापालिकेने १२ ऑक्टोबरला जाहीर केले. पुढारीच्या वृत्तानुसार ही बंदी टप्प्याटप्प्याने आहे. दशक्रिया विधी नेमलेल्या ठिकाणी सुरू आहेत.",
    },
    unknown: {
      en: "Daily timings and the exact phase-wise schedule have not been announced.",
      hi: "रोज़ के समय और चरणवार कार्यक्रम की घोषणा नहीं हुई है।",
      mr: "दैनंदिन वेळा आणि टप्प्यानुसार वेळापत्रक जाहीर झालेले नाही.",
    },
    confidence: "confirmed",
    confidenceNote: {
      en: "The restriction is confirmed (NMC Commissioner on record). That it is in phases is reported by Pudhari.",
      hi: "प्रतिबंध की पुष्टि हुई है (NMC आयुक्त का ऑन-रिकॉर्ड बयान)। चरणों में होने की बात पुढारी ने बताई है।",
      mr: "निर्बंधाची पुष्टी झाली आहे (महापालिका आयुक्तांचे अधिकृत वक्तव्य). टप्प्याटप्प्याने असल्याचे पुढारीने नमूद केले आहे.",
    },
    lastUpdated: "2026-10-14",
    sourceTitle: "Times of India, 13 Oct 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/ramkund-closed-for-15-20-days-as-nashik-civic-body-races-to-wrap-up-kumbh-works/articleshow/134901215.cms",
    newsSlug: "ramkund-ghats-closed-15-20-days-before-flag-hoisting",
  },
  {
    id: "kushavarta-closed",
    place: { en: "Kushavarta Tirth, Trimbakeshwar", hi: "कुशावर्त तीर्थ, त्र्यंबकेश्वर", mr: "कुशावर्त तीर्थ, त्र्यंबकेश्वर" },
    state: "closed",
    headline: {
      en: "Closed for renovation since 30 September",
      hi: "30 सितंबर से नवीनीकरण के लिए बंद",
      mr: "३० सप्टेंबरपासून नूतनीकरणासाठी बंद",
    },
    detail: {
      en: "The kund is closed to pilgrims for renovation (draining, stone-step conservation, a filtration plant and heritage lighting). The renovated kund is to be inaugurated on 31 October, the day of the Dhwajarohan. Collector Ayush Prasad said on record the closure runs from 30 September to 30 October; Lokmat Times reports it reopens on 31 October.",
      hi: "नवीनीकरण (कुंड खाली करना, पत्थर की सीढ़ियों का संरक्षण, फ़िल्टरेशन प्लांट और हेरिटेज लाइटिंग) के लिए कुंड श्रद्धालुओं के लिए बंद है। नए रूप में कुंड का उद्घाटन ध्वजारोहण के दिन, 31 अक्टूबर को होना है। कलेक्टर आयुष प्रसाद ने ऑन-रिकॉर्ड कहा कि बंदी 30 सितंबर से 30 अक्टूबर तक है; लोकमत टाइम्स के अनुसार कुंड 31 अक्टूबर को खुलेगा।",
      mr: "नूतनीकरणासाठी (कुंड रिकामे करणे, दगडी पायऱ्यांचे संवर्धन, गाळण प्रकल्प आणि हेरिटेज दिवे) कुंड भाविकांना बंद आहे. नव्या रूपातील कुंडाचे लोकार्पण ध्वजारोहणाच्या दिवशी, ३१ ऑक्टोबरला होणार आहे. जिल्हाधिकारी आयुष प्रसाद यांनी बंदी ३० सप्टेंबर ते ३० ऑक्टोबर असल्याचे अधिकृतपणे सांगितले; लोकमत टाइम्सच्या वृत्तानुसार कुंड ३१ ऑक्टोबरला खुले होईल.",
    },
    unknown: {
      en: "No official notice with exact reopening hours has been published. Do not count on bathing at Kushavarta before 31 October.",
      hi: "दोबारा खुलने के सटीक समय की कोई आधिकारिक सूचना जारी नहीं हुई है। 31 अक्टूबर से पहले कुशावर्त पर स्नान की उम्मीद न रखें।",
      mr: "पुन्हा खुले होण्याच्या नेमक्या वेळेची अधिकृत सूचना प्रसिद्ध झालेली नाही. ३१ ऑक्टोबरपूर्वी कुशावर्तावर स्नानाची अपेक्षा ठेवू नका.",
    },
    confidence: "confirmed",
    confidenceNote: {
      en: "The closure is confirmed (Collector on record). The one-day difference in the reopening date between sources is noted above.",
      hi: "बंदी की पुष्टि हुई है (कलेक्टर का ऑन-रिकॉर्ड बयान)। दोबारा खुलने की तारीख में स्रोतों का एक दिन का अंतर ऊपर बताया गया है।",
      mr: "बंदीची पुष्टी झाली आहे (जिल्हाधिकाऱ्यांचे अधिकृत वक्तव्य). पुन्हा खुले होण्याच्या तारखेत स्रोतांमधील एका दिवसाचा फरक वर नमूद केला आहे.",
    },
    lastUpdated: "2026-10-06",
    sourceTitle: "Times of India, 29 Sep 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/kushavarta-teerth-to-remain-closed-for-month-long-renovation/articleshow/134572629.cms",
    newsSlug: "kushavarta-tirth-closed-for-renovation-october-2026",
  },
  {
    id: "trimbak-hospital",
    place: { en: "Trimbakeshwar sub-district hospital", hi: "त्र्यंबकेश्वर उप-जिला अस्पताल", mr: "त्र्यंबकेश्वर उपजिल्हा रुग्णालय" },
    state: "unsettled",
    headline: {
      en: "Running with 50 beds at Tupadevi Phata; new site not final",
      hi: "तुपादेवी फाटा पर 50 बेड के साथ चालू; नई जगह अंतिम नहीं",
      mr: "तुपादेवी फाटा येथे ५० खाटांसह सुरू; नवी जागा अंतिम नाही",
    },
    detail: {
      en: "For now the hospital runs with 50 beds at Tupadevi Phata, about 4 km out of town, because the old building is to make way for the Kumbh Darshan Path. Loksatta reports that a plot opposite the Trimbakeshwar police station has been approved for a new 100-bed hospital. On 22 August the Health Minister said demolition of the old building was stayed.",
      hi: "फ़िलहाल अस्पताल शहर से लगभग 4 किमी दूर तुपादेवी फाटा पर 50 बेड के साथ चल रहा है, क्योंकि पुरानी इमारत कुंभ दर्शन पथ के लिए हटाई जानी है। लोकसत्ता के अनुसार त्र्यंबकेश्वर पुलिस थाने के सामने के भूखंड को नए 100 बेड के अस्पताल के लिए मंज़ूरी मिली है। 22 अगस्त को स्वास्थ्य मंत्री ने कहा था कि पुरानी इमारत का ध्वस्तीकरण रोका गया है।",
      mr: "सध्या रुग्णालय शहरापासून सुमारे ४ किमी दूर तुपादेवी फाटा येथे ५० खाटांसह सुरू आहे, कारण जुनी इमारत कुंभ दर्शन पथासाठी हटवली जाणार आहे. लोकसत्ताच्या वृत्तानुसार त्र्यंबकेश्वर पोलीस ठाण्यासमोरील भूखंडावर १०० खाटांच्या नव्या रुग्णालयास मंजुरी मिळाली आहे. २२ ऑगस्टला आरोग्यमंत्र्यांनी जुन्या इमारतीचे पाडकाम थांबवल्याचे सांगितले होते.",
    },
    unknown: {
      en: "When the old building will be demolished and when the new hospital will open are both unclear. For an emergency call 112 or 108 (ambulance).",
      hi: "पुरानी इमारत कब गिराई जाएगी और नया अस्पताल कब खुलेगा, दोनों साफ़ नहीं हैं। आपात स्थिति में 112 या 108 (एम्बुलेंस) पर कॉल करें।",
      mr: "जुनी इमारत कधी पाडली जाईल आणि नवे रुग्णालय कधी सुरू होईल, दोन्ही स्पष्ट नाही. आणीबाणीत ११२ किंवा १०८ (रुग्णवाहिका) वर संपर्क करा.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "The new site is a media report (Loksatta) and is not officially confirmed.",
      hi: "नई जगह मीडिया रिपोर्ट (लोकसत्ता) है और आधिकारिक रूप से पुष्ट नहीं है।",
      mr: "नवी जागा ही माध्यमातील बातमी (लोकसत्ता) आहे; अधिकृतपणे पुष्टी झालेली नाही.",
    },
    lastUpdated: "2026-10-07",
    sourceTitle: "Loksatta, 7 Oct 2026",
    sourceUrl:
      "https://www.loksatta.com/nashik/trimbakeshwar-sub-district-hospital-new-location-approved-police-station-nashik-news-sap-05-6177075/",
    newsSlug: "new-site-for-100-bed-trimbakeshwar-sub-district-hospital",
  },
  {
    id: "oct-events",
    place: { en: "Events before the Dhwajarohan (17, 20 and 25 October)", hi: "ध्वजारोहण से पहले के कार्यक्रम (17, 20 और 25 अक्टूबर)", mr: "ध्वजारोहणापूर्वीचे कार्यक्रम (१७, २० आणि २५ ऑक्टोबर)" },
    state: "upcoming",
    headline: {
      en: "Gram sabha 17 Oct, 'Har Ghar Kumbh Dhwaj' 20 Oct, 'Shankhnaad' 25 Oct",
      hi: "ग्राम सभा 17 अक्टूबर, 'हर घर कुंभ ध्वज' 20 अक्टूबर, 'शंखनाद' 25 अक्टूबर",
      mr: "ग्रामसभा १७ ऑक्टोबर, 'हर घर कुंभ ध्वज' २० ऑक्टोबर, 'शंखनाद' २५ ऑक्टोबर",
    },
    detail: {
      en: "NTKMA lists a gram sabha at Trimbakeshwar on 17 October, the 'Har Ghar Kumbh Dhwaj' campaign on 20 October (also the deadline for departments' micro-planning for the Dhwajarohan) and the 'Shankhnaad', a Guinness World Records attempt, on 25 October. At the Shankhnaad a Simhastha postage stamp, the authority's website and a coffee-table book are to be released.",
      hi: "NTKMA ने 17 अक्टूबर को त्र्यंबकेश्वर में ग्राम सभा, 20 अक्टूबर को 'हर घर कुंभ ध्वज' अभियान (यही ध्वजारोहण की सूक्ष्म योजना की विभागों के लिए अंतिम तिथि भी है) और 25 अक्टूबर को 'शंखनाद', गिनीज़ वर्ल्ड रिकॉर्ड्स का प्रयास, बताया है। शंखनाद में सिंहस्थ डाक टिकट, प्राधिकरण की वेबसाइट और कॉफ़ी-टेबल बुक जारी होनी है।",
      mr: "NTKMA ने १७ ऑक्टोबरला त्र्यंबकेश्वर येथे ग्रामसभा, २० ऑक्टोबरला 'हर घर कुंभ ध्वज' अभियान (हीच ध्वजारोहणाच्या सूक्ष्म नियोजनाची विभागांसाठी अंतिम मुदतही आहे) आणि २५ ऑक्टोबरला 'शंखनाद' हा गिनीज वर्ल्ड रेकॉर्ड्सचा प्रयत्न जाहीर केला आहे. शंखनाद कार्यक्रमात सिंहस्थ टपाल तिकीट, प्राधिकरणाचे संकेतस्थळ आणि कॉफी-टेबल पुस्तक प्रकाशित होणार आहे.",
    },
    unknown: {
      en: "Timings for these events have not been announced.",
      hi: "इन कार्यक्रमों के समय घोषित नहीं हुए हैं।",
      mr: "या कार्यक्रमांच्या वेळा जाहीर झालेल्या नाहीत.",
    },
    confidence: "confirmed",
    confidenceNote: {
      en: "The dates are confirmed (NTKMA Commissioner on record, Times of India). The outline of the 25 October programme is still preliminary.",
      hi: "तिथियों की पुष्टि हुई है (NTKMA आयुक्त का ऑन-रिकॉर्ड बयान, टाइम्स ऑफ इंडिया)। 25 अक्टूबर के कार्यक्रम की रूपरेखा अभी प्रारंभिक है।",
      mr: "तारखांची पुष्टी झाली आहे (NTKMA आयुक्तांचे अधिकृत वक्तव्य, टाइम्स ऑफ इंडिया). २५ ऑक्टोबरच्या कार्यक्रमाची रूपरेषा अजून प्राथमिक आहे.",
    },
    lastUpdated: "2026-10-14",
    sourceTitle: "Times of India, 13 Oct 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/kumbh-authority-sets-oct-20-deadline-for-dhwajarohan-preparations/articleshow/134924262.cms",
    newsSlug: "kumbh-authority-sets-october-20-deadline-for-dhwajarohan-preparations",
  },
  {
    id: "maha-aarti-godaghat",
    place: { en: "Joint Maha Aarti, Godaghat, Nashik", hi: "संयुक्त महाआरती, गोदाघाट, नाशिक", mr: "संयुक्त महाआरती, गोदाघाट, नाशिक" },
    state: "upcoming",
    headline: {
      en: "Planned for the eve of the flag hoisting",
      hi: "ध्वजारोहण की पूर्व संध्या पर प्रस्तावित",
      mr: "ध्वजारोहणाच्या पूर्वसंध्येला नियोजित",
    },
    detail: {
      en: "A joint Maha Aarti of the Shaiva and Vaishnava akharas at Godaghat is planned for the eve of the Simhastha flag hoisting. NTKMA Commissioner Shekhar Singh announced it at a press conference on 12 October.",
      hi: "सिंहस्थ ध्वजारोहण की पूर्व संध्या पर गोदाघाट पर शैव और वैष्णव अखाड़ों की संयुक्त महाआरती की योजना है। NTKMA आयुक्त शेखर सिंह ने 12 अक्टूबर की प्रेस कॉन्फ़्रेंस में यह बताया।",
      mr: "सिंहस्थ ध्वजारोहणाच्या पूर्वसंध्येला गोदाघाटावर शैव आणि वैष्णव आखाड्यांची संयुक्त महाआरती करण्याचे नियोजन आहे. NTKMA आयुक्त शेखर सिंह यांनी १२ ऑक्टोबरच्या पत्रकार परिषदेत ही माहिती दिली.",
    },
    unknown: {
      en: "Pudhari notes the programme outline is still preliminary. No time has been announced.",
      hi: "पुढारी के अनुसार कार्यक्रम की रूपरेखा अभी प्रारंभिक है। कोई समय घोषित नहीं हुआ है।",
      mr: "पुढारीनुसार कार्यक्रमाची रूपरेषा अजून प्राथमिक आहे. कोणतीही वेळ जाहीर झालेली नाही.",
    },
    confidence: "confirmed",
    lastUpdated: "2026-10-14",
    sourceTitle: "Pudhari, 13 Oct 2026",
    sourceUrl:
      "https://pudhari.news/maharashtra/north-maharashtra/nashik/shaiv-and-vaishnav-akhadas-to-come-together-for-joint-maha-aarti-before-simhastha-flag-hoisting-sd22",
    newsSlug: "shaiva-vaishnava-akharas-joint-maha-aarti-before-dhwajarohan",
  },
];

/** Newest item date: shown as the board's headline "last updated". */
export const statusBoardUpdated = statusItems.reduce((m, i) => (i.lastUpdated > m ? i.lastUpdated : m), "0000-00-00");

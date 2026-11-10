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
export type StatusState = "open" | "underway" | "closed" | "restricted" | "upcoming" | "unsettled";
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
    state: "open",
    headline: {
      en: "Water is back, and devotees filled the ghats on 31 October",
      hi: "पानी लौटा, 31 अक्टूबर को घाटों पर फिर श्रद्धालुओं की भीड़",
      mr: "रामकुंडात पाणी परतले, ३१ ऑक्टोबरला घाट भाविकांनी पुन्हा फुलले",
    },
    detail: {
      en: "Water released from Gangapur dam early on 30 October reached Ramkund after nearly three months of dry ghats. On 31 October the riverfront was crowded with devotees for the Dhwajarohan, with barricades and security checkpoints on the approach roads, the Times of India reported. NMC's 15–20 day restriction from 12 October had been announced so that works would finish before this ceremony.",
      hi: "करीब तीन महीने सूखे रहे रामकुंड में 30 अक्टूबर तड़के गंगापुर बांध से छोड़ा गया पानी पहुँचा। टाइम्स ऑफ इंडिया के अनुसार 31 अक्टूबर को ध्वजारोहण के लिए नदी किनारा श्रद्धालुओं से भर गया था, और पहुँच मार्गों पर बैरिकेड व सुरक्षा जाँच चौकियाँ थीं। NMC ने 12 अक्टूबर से 15–20 दिन का प्रतिबंध इसीलिए लगाया था कि इस समारोह से पहले काम पूरे हो जाएँ।",
      mr: "जवळपास तीन महिने कोरड्या पडलेल्या रामकुंडात ३० ऑक्टोबरच्या पहाटे गंगापूर धरणातून सोडलेले पाणी पोहोचले. टाइम्स ऑफ इंडियाच्या वृत्तानुसार ३१ ऑक्टोबरला ध्वजारोहणासाठी गोदाकाठ भाविकांनी फुलून गेला होता; रामकुंडाकडे जाणाऱ्या रस्त्यांवर बॅरिकेड्स आणि सुरक्षा तपासणी नाके होते. महापालिकेने १२ ऑक्टोबरपासून १५–२० दिवसांचा प्रवेश निर्बंध याच सोहळ्यापूर्वी कामे पूर्ण व्हावीत म्हणून लावला होता.",
    },
    unknown: {
      en: "NMC has not published a notice saying the work restriction is formally over, and ghat works continue towards the March 2027 deadline, so parts of the riverfront may still be barricaded. No daily timings have been announced.",
      hi: "NMC ने अभी कोई सूचना जारी नहीं की है कि काम के लिए लगा प्रतिबंध औपचारिक रूप से खत्म हुआ। घाटों का काम मार्च 2027 की समय-सीमा तक जारी है, इसलिए नदी किनारे के कुछ हिस्सों पर अब भी बैरिकेड हो सकते हैं। रोज़ के समय घोषित नहीं हुए हैं।",
      mr: "कामांसाठीचा निर्बंध अधिकृतपणे संपल्याची सूचना महापालिकेने अजून प्रसिद्ध केलेली नाही. घाटांची कामे मार्च २०२७ च्या मुदतीपर्यंत सुरू आहेत, त्यामुळे काठावरील काही भागांत अजूनही बॅरिकेड्स असू शकतात. दैनंदिन वेळा जाहीर झालेल्या नाहीत.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "The crowd, the water and the checkpoints are from a Times of India report. There is no official reopening notice yet.",
      hi: "भीड़, पानी और जाँच चौकियों की जानकारी टाइम्स ऑफ इंडिया की रिपोर्ट से है। दोबारा खुलने की कोई आधिकारिक सूचना अभी नहीं है।",
      mr: "गर्दी, पाणी आणि तपासणी नाक्यांची माहिती टाइम्स ऑफ इंडियाच्या वृत्तातील आहे. पुन्हा खुले झाल्याची अधिकृत सूचना अजून नाही.",
    },
    lastUpdated: "2026-11-01",
    sourceTitle: "Times of India, 31 Oct 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/ramkund-finds-its-rhythm-again-as-simhastha-kumbh-begins/articleshow/135409498.cms",
    newsSlug: "nashik-kumbh-2027-flag-hoisting",
  },
  {
    id: "trimbakeshwar-temple",
    place: { en: "Trimbakeshwar Jyotirlinga temple", hi: "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर", mr: "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर" },
    state: "open",
    headline: {
      en: "Open, with extra police and security checks after a threat email",
      hi: "खुला है, धमकी भरे ईमेल के बाद अतिरिक्त पुलिस और सुरक्षा जाँच",
      mr: "खुले आहे, धमकीच्या ई-मेलनंतर जादा पोलीस आणि सुरक्षा तपासणी",
    },
    detail: {
      en: "Newspapers reported on 9 November 2026 that the temple received a threat email. SP Dr D S Swami confirmed it. More than 50 extra police, including armed personnel, are on duty, and devotees go in only after security checks. Police say darshan continues and devotees need not panic. The 30–31 October closure order for the flag hoisting ended long ago.",
      hi: "9 नवंबर 2026 की खबरों के अनुसार मंदिर को धमकी भरा ईमेल मिला। पुलिस अधीक्षक डॉ. डी. एस. स्वामी ने इसकी पुष्टि की। 50 से अधिक अतिरिक्त पुलिसकर्मी, जिनमें हथियारबंद जवान भी हैं, तैनात हैं, और श्रद्धालुओं को सुरक्षा जाँच के बाद ही अंदर जाने दिया जा रहा है। पुलिस का कहना है कि दर्शन जारी है और घबराने की ज़रूरत नहीं। ध्वजारोहण के लिए 30–31 अक्टूबर का बंदी आदेश कब का खत्म हो चुका है।",
      mr: "९ नोव्हेंबर २०२६ च्या बातम्यांनुसार मंदिराला धमकीचा ई-मेल आला. पोलीस अधीक्षक डॉ. डी. एस. स्वामी यांनी त्याला दुजोरा दिला. ५० हून अधिक जादा पोलीस, त्यात सशस्त्र कर्मचारीही, तैनात आहेत आणि भाविकांना सुरक्षा तपासणीनंतरच आत सोडले जात आहे. दर्शन सुरू आहे, भाविकांनी घाबरू नये, असे पोलिसांनी सांगितले. ध्वजारोहणासाठीचा ३०–३१ ऑक्टोबरचा बंदी आदेश केव्हाच संपला आहे.",
    },
    unknown: {
      en: "Police have not said what the email says, who sent it, or how long the extra checks will last. For darshan timings and online booking, use the official Shri Trimbakeshwar Devasthan Trust website.",
      hi: "ईमेल में क्या है, किसने भेजा और अतिरिक्त जाँच कब तक चलेगी, यह पुलिस ने नहीं बताया। दर्शन के समय और ऑनलाइन बुकिंग के लिए श्री त्र्यंबकेश्वर देवस्थान ट्रस्ट की आधिकारिक वेबसाइट ही देखें।",
      mr: "ई-मेलमध्ये काय आहे, तो कोणी पाठवला आणि जादा तपासणी किती दिवस राहील, हे पोलिसांनी सांगितलेले नाही. दर्शनवेळा आणि ऑनलाइन बुकिंगसाठी श्री त्र्यंबकेश्वर देवस्थान ट्रस्टचे अधिकृत संकेतस्थळच पाहा.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "From newspaper reports of 9 November (Times of India, Free Press Journal, Sarkarnama). The SP is quoted by name, but we have not seen a police press release.",
      hi: "9 नवंबर की अख़बारी खबरों (टाइम्स ऑफ इंडिया, फ्री प्रेस जर्नल, सरकारनामा) पर आधारित। पुलिस अधीक्षक का नाम के साथ हवाला है, पर हमने पुलिस की प्रेस विज्ञप्ति नहीं देखी।",
      mr: "९ नोव्हेंबरच्या वृत्तपत्रीय बातम्यांवर (टाइम्स ऑफ इंडिया, फ्री प्रेस जर्नल, सरकारनामा) आधारित. पोलीस अधीक्षकांचे नावानिशी विधान आहे, पण पोलिसांचे प्रसिद्धिपत्रक आम्ही पाहिलेले नाही.",
    },
    lastUpdated: "2026-11-10",
    sourceTitle: "Free Press Journal, 9 Nov 2026",
    sourceUrl: "https://www.freepressjournal.in/pune/nashik-threat-emails-target-trimbakeshwar-saptashrungi-temples-security-tightened",
    newsSlug: "threat-emails-trimbakeshwar-saptashrungi-kalaram-temples-security-tightened",
  },
  {
    id: "kushavarta-closed",
    place: { en: "Kushavarta Tirth, Trimbakeshwar", hi: "कुशावर्त तीर्थ, त्र्यंबकेश्वर", mr: "कुशावर्त तीर्थ, त्र्यंबकेश्वर" },
    state: "open",
    headline: {
      en: "Devotees bathing again from 1 November (reported); new ghats near Prayag Tirth in use",
      hi: "1 नवंबर से फिर स्नान (रिपोर्ट); प्रयाग तीर्थ के पास नए घाटों का भी उपयोग",
      mr: "१ नोव्हेंबरपासून पुन्हा स्नान (वृत्त); प्रयाग तीर्थाजवळील नव्या घाटांचाही वापर",
    },
    detail: {
      en: "Chief Minister Devendra Fadnavis hoisted the Dharma Dhwaja at Kushavarta at 12:02 PM on 31 October (PTI). The kund had been closed for renovation since 30 September, and the Collector's order kept outside devotees out until 6 PM that day. Pudhari reported on 2 November that once the restrictions were relaxed, more than 10,000 devotees bathed at Kushavarta and took darshan on Sunday 1 November, and that devotees also began bathing at the new ghats in the Godavari bed near Prayag Tirth at Pegalwadi, where works are still in progress. Pudhari reported that the remaining heritage and infrastructure works around Kushavarta are planned for December 2026 to March 2027.",
      hi: "31 अक्टूबर दोपहर 12:02 बजे मुख्यमंत्री देवेंद्र फडणवीस ने कुशावर्त पर धर्मध्वज फहराया (PTI)। कुंड 30 सितंबर से नवीनीकरण के लिए बंद था, और कलेक्टर के आदेश से उस दिन शाम 6 बजे तक बाहर के श्रद्धालुओं को प्रवेश नहीं था। पुढारी ने 2 नवंबर को बताया कि पाबंदियाँ ढीली होते ही रविवार 1 नवंबर को 10,000 से ज़्यादा श्रद्धालुओं ने कुशावर्त पर स्नान और दर्शन किए, और पेगलवाड़ी में प्रयाग तीर्थ के पास गोदावरी पात्र के नए घाटों पर भी स्नान शुरू हुआ, जहाँ काम अभी जारी है। पुढारी के अनुसार कुशावर्त परिसर के बाकी हेरिटेज और बुनियादी ढाँचे के काम दिसंबर 2026 से मार्च 2027 के बीच होने हैं।",
      mr: "३१ ऑक्टोबरला दुपारी १२:०२ वाजता मुख्यमंत्री देवेंद्र फडणवीस यांनी कुशावर्तावर धर्मध्वज फडकवला (PTI). कुंड ३० सप्टेंबरपासून नूतनीकरणासाठी बंद होते, आणि जिल्हाधिकाऱ्यांच्या आदेशानुसार त्या दिवशी सायंकाळी ६ पर्यंत बाहेरगावच्या भाविकांना प्रवेश नव्हता. निर्बंध शिथिल होताच रविवारी, १ नोव्हेंबरला १० हजारांहून अधिक भाविकांनी कुशावर्तावर स्नान व दर्शन घेतले, आणि पेगलवाडी येथील प्रयाग तीर्थाजवळ गोदावरी पात्रातील नव्या घाटांवरही स्नान सुरू झाले, जेथे कामे अजून सुरू आहेत, असे पुढारीने २ नोव्हेंबरला दिले. पुढारीच्या वृत्तानुसार कुशावर्त परिसरातील उर्वरित हेरिटेज आणि पायाभूत कामे डिसेंबर २०२६ ते मार्च २०२७ या काळात करण्याचे नियोजन आहे.",
    },
    unknown: {
      en: "We have not seen an official notice giving bathing timings or rules for Kushavarta after the renovation, and remaining works could close parts of the area again. Ask locally before you plan a ritual bath.",
      hi: "नवीनीकरण के बाद कुशावर्त पर स्नान का समय या नियम बताने वाली कोई आधिकारिक सूचना हमें नहीं मिली है, और बाकी कामों के कारण परिसर के कुछ हिस्से फिर बंद हो सकते हैं। स्नान या विधि की योजना से पहले स्थानीय स्तर पर पूछ लें।",
      mr: "नूतनीकरणानंतर कुशावर्तावरील स्नानाच्या वेळा किंवा नियम सांगणारी अधिकृत सूचना आमच्या पाहण्यात आलेली नाही, आणि उर्वरित कामांमुळे परिसराचे काही भाग पुन्हा बंद होऊ शकतात. स्नान किंवा विधीचे नियोजन करण्यापूर्वी स्थानिक पातळीवर चौकशी करा.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "The flag hoisting is reported by PTI, and the reopening for bathing and the works timeline by Pudhari. No official notice on bathing.",
      hi: "ध्वजारोहण की जानकारी PTI से, और स्नान के लिए फिर खुलने व कामों की समय-सीमा की जानकारी पुढारी से है। स्नान पर कोई आधिकारिक सूचना नहीं।",
      mr: "ध्वजारोहणाची माहिती PTI कडून, आणि स्नानासाठी पुन्हा खुले होणे व कामांचे वेळापत्रक पुढारीकडून आहे. स्नानाबाबत अधिकृत सूचना नाही.",
    },
    lastUpdated: "2026-11-05",
    sourceTitle: "Pudhari, 2 Nov 2026",
    sourceUrl:
      "https://pudhari.news/maharashtra/north-maharashtra/nashik/kushavarta-teerth-overflows-with-devotees-as-restrictions-lifted-after-historic-simhastha-flag-hoisting-sd22",
    newsSlug: "kushavarta-open-again-over-10000-devotees-bathe-1-november-new-ghats-near-prayag-tirth-pegalwadi",
  },
  {
    id: "trimbak-heliport",
    place: { en: "New heliport, Trimbakeshwar", hi: "नया हेलिपोर्ट, त्र्यंबकेश्वर", mr: "नवे हेलिपोर्ट, त्र्यंबकेश्वर" },
    state: "unsettled",
    headline: {
      en: "Heliport built; no report yet that private helicopter flights have started",
      hi: "हेलिपोर्ट बना है; निजी हेलिकॉप्टर उड़ानें शुरू होने की कोई रिपोर्ट अभी नहीं",
      mr: "हेलिपोर्ट उभारले आहे; खासगी हेलिकॉप्टर उड्डाणे सुरू झाल्याचे वृत्त अद्याप नाही",
    },
    detail: {
      en: "The Kumbh Mela Authority has built a heliport at Trimbakeshwar that can take three helicopters at once. Collector Ayush Prasad told the Times of India on 22 October that private operators could start flights from 2 November at the earliest, from cities such as Mumbai, Pune, Surat and Chhatrapati Sambhajinagar, with darshan and return in about three hours. As of 10 November we have found no report that any operator has started flights.",
      hi: "कुंभ मेला प्राधिकरण ने त्र्यंबकेश्वर में हेलिपोर्ट बनाया है जहाँ एक साथ तीन हेलिकॉप्टर उतर सकते हैं। कलेक्टर आयुष प्रसाद ने 22 अक्टूबर को टाइम्स ऑफ इंडिया से कहा कि निजी ऑपरेटर 2 नवंबर से, यानी उससे पहले नहीं, मुंबई, पुणे, सूरत और छत्रपति संभाजीनगर जैसे शहरों से उड़ानें शुरू कर सकते हैं, और दर्शन करके लौटने में करीब तीन घंटे लगेंगे। 10 नवंबर तक हमें ऐसी कोई रिपोर्ट नहीं मिली कि किसी ऑपरेटर ने उड़ानें शुरू की हैं।",
      mr: "कुंभमेळा प्राधिकरणाने त्र्यंबकेश्वरमध्ये एकाच वेळी तीन हेलिकॉप्टर उतरू शकतील असे हेलिपोर्ट उभारले आहे. खासगी ऑपरेटर २ नोव्हेंबरपासून, त्याआधी नाही, मुंबई, पुणे, सुरत, छत्रपती संभाजीनगर अशा शहरांतून उड्डाणे सुरू करू शकतात आणि दर्शन घेऊन सुमारे तीन तासांत परतता येईल, असे जिल्हाधिकारी आयुष प्रसाद यांनी २२ ऑक्टोबरला टाइम्स ऑफ इंडियाला सांगितले. १० नोव्हेंबरपर्यंत कोणत्याही ऑपरेटरने उड्डाणे सुरू केल्याचे वृत्त आम्हाला आढळलेले नाही.",
    },
    unknown: {
      en: "No operator, schedule, fare or booking link has been announced. Do not pay anyone for a helicopter darshan package until fares are officially published.",
      hi: "कोई ऑपरेटर, समय-सारणी, किराया या बुकिंग लिंक घोषित नहीं हुआ है। किराए आधिकारिक रूप से जारी होने तक किसी को हेलिकॉप्टर दर्शन पैकेज के पैसे न दें।",
      mr: "कोणताही ऑपरेटर, वेळापत्रक, भाडे किंवा बुकिंग लिंक जाहीर झालेली नाही. भाडे अधिकृतपणे जाहीर होईपर्यंत 'हेलिकॉप्टर दर्शन पॅकेज'साठी कोणालाही पैसे देऊ नका.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "The 2 November date was a 'could start' statement from the Collector, carried by the Times of India, not a confirmed schedule, and we have found no report that flights began.",
      hi: "2 नवंबर की तारीख कलेक्टर का 'शुरू हो सकती है' वाला बयान थी, जिसे टाइम्स ऑफ इंडिया ने छापा; यह पुष्ट समय-सारणी नहीं थी, और उड़ानें शुरू होने की कोई रिपोर्ट हमें नहीं मिली।",
      mr: "२ नोव्हेंबरची तारीख हे जिल्हाधिकाऱ्यांचे 'सुरू होऊ शकते' असे वक्तव्य होते, जे टाइम्स ऑफ इंडियाने दिले; ते निश्चित वेळापत्रक नव्हते, आणि उड्डाणे सुरू झाल्याचे वृत्त आम्हाला आढळलेले नाही.",
    },
    lastUpdated: "2026-11-10",
    sourceTitle: "Times of India, 22 Oct 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/now-fly-directly-to-trimbakeshwar-for-quick-darshan/articleshow/135125239.cms",
    newsSlug: "trimbakeshwar-heliport-ready-private-helicopter-flights-may-start-2-november-mumbai-pune-surat",
  },
  {
    id: "kumbh-works",
    place: { en: "Kumbh works overall, Nashik and Trimbakeshwar", hi: "कुंभ के कुल काम, नाशिक और त्र्यंबकेश्वर", mr: "कुंभाची एकूण कामे, नाशिक आणि त्र्यंबकेश्वर" },
    state: "underway",
    headline: {
      en: "About 51% done, with a March 2027 deadline",
      hi: "करीब 51% काम पूरे, समय-सीमा मार्च 2027",
      mr: "सुमारे ५१ टक्के कामे पूर्ण, मुदत मार्च २०२७",
    },
    detail: {
      en: "NTKMA commissioner Shekhar Singh told the Times of India that about 51% of Kumbh works are complete and the deadline is March 2027. The biggest gap is the Tapovan Sadhugram: NMC holds only 94 of the more than 1,400 acres planned. NMC commissioner Manisha Khatri said all concrete works will be done by January 2027.",
      hi: "NTKMA आयुक्त शेखर सिंह ने टाइम्स ऑफ इंडिया को बताया कि कुंभ के करीब 51% काम पूरे हो चुके हैं और समय-सीमा मार्च 2027 है। सबसे बड़ी कमी तपोवन साधुग्राम में है: योजना की 1,400 एकड़ से ज़्यादा ज़मीन में से NMC के पास सिर्फ 94 एकड़ है। NMC आयुक्त मनीषा खत्री ने कहा कि सभी कंक्रीट काम जनवरी 2027 तक पूरे होंगे।",
      mr: "कुंभाची सुमारे ५१ टक्के कामे पूर्ण झाली असून मुदत मार्च २०२७ आहे, असे NTKMA आयुक्त शेखर सिंह यांनी टाइम्स ऑफ इंडियाला सांगितले. सर्वात मोठी अडचण तपोवनातील साधुग्रामची आहे: नियोजित १,४०० एकरांहून अधिक जमिनीपैकी महापालिकेकडे फक्त ९४ एकर ताब्यात आहेत. सर्व काँक्रीट कामे जानेवारी २०२७ पर्यंत पूर्ण होतील, असे महापालिका आयुक्त मनीषा खत्री यांनी सांगितले.",
    },
    unknown: {
      en: "NTKMA has not published a work-by-work progress report, so it is not clear which ghats, roads or sites are finished.",
      hi: "NTKMA ने काम-वार प्रगति रिपोर्ट जारी नहीं की है, इसलिए साफ़ नहीं है कि कौन से घाट, सड़कें या स्थल पूरे हो चुके हैं।",
      mr: "NTKMA ने कामनिहाय प्रगती अहवाल प्रसिद्ध केलेला नाही, त्यामुळे कोणते घाट, रस्ते किंवा ठिकाणे पूर्ण झाली हे स्पष्ट नाही.",
    },
    confidence: "reported",
    confidenceNote: {
      en: "The figures are from a Times of India report quoting the two commissioners; there is no official progress report yet.",
      hi: "आँकड़े टाइम्स ऑफ इंडिया की रिपोर्ट से हैं, जिसमें दोनों आयुक्तों के हवाले हैं; अभी कोई आधिकारिक प्रगति रिपोर्ट नहीं है।",
      mr: "आकडे दोन्ही आयुक्तांचा हवाला देणाऱ्या टाइम्स ऑफ इंडियाच्या वृत्तातील आहेत; अधिकृत प्रगती अहवाल अजून नाही.",
    },
    lastUpdated: "2026-11-01",
    sourceTitle: "Times of India, 31 Oct 2026",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/nashik/kumbh-clock-ticks-nashik-has-just-months-to-finish-rs-35000-crore-works/articleshow/135409600.cms",
    newsSlug: "kumbh-works-51-percent-done-march-2027-deadline-sadhugram-94-acres-godavari-bathing-quality-march",
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
];

/** Newest item date: shown as the board's headline "last updated". */
export const statusBoardUpdated = statusItems.reduce((m, i) => (i.lastUpdated > m ? i.lastUpdated : m), "0000-00-00");

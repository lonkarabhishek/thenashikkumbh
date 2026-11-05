import type { BlogArticle } from "@/data/blogData";

const TOI = "https://timesofindia.indiatimes.com/city/nashik/were-not-against-kumbh-works-but-corruption-rohit-pawar/articleshow/135548487.cms";
const ETV_EN = "https://www.etvbharat.com/en/state/rohit-pawar-alleges-corruption-in-rs-35000-crore-kumbh-mela-projects-in-nashik-raises-pollution-concerns-enn26110408135";
const ETV_MR = "https://www.etvbharat.com/mr/state/mla-rohit-pawar-alleges-rs-7000-crore-scam-in-nashik-kumbh-mela-works-mhs26110406980";
const SAKAL = "https://www.esakal.com/uttar-maharashtra/nashik/kumbh-mela-corruption-rohit-pawar";
const DM = "https://divyamarathi.bhaskar.com/local/maharashtra/nashik/news/nashik-kumbh-mela-scam-rohit-pawar-targets-girish-mahajan-139590128.html";
const PUDHARI_AUG = "https://pudhari.news/maharashtra/north-maharashtra/nashik/girish-mahajan-statment-congress-and-opposition-over-kumbh-mela-tenders-and-vande-mataram-sd22";
const BUDGET = "/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay";
const WORKS = "/blog/kumbh-works-51-percent-done-march-2027-deadline-sadhugram-94-acres-godavari-bathing-quality-march";
const STP = "/blog/godavari-rejuvenation-four-new-stps-bathing-quality-by-may-2027";
const RING = "/blog/nashik-ring-road-work-begins-on-seven-stretches";

export const article: BlogArticle = {
  id: 282,
  slug: "rohit-pawar-alleges-corruption-in-nashik-kumbh-works-seeks-accounts-in-10-days-20-day-ultimatum-midc-mpcb-godavari-pollution",
  title: {
    en: "Rohit Pawar Alleges Corruption in Nashik Kumbh Works, Seeks Accounts Within 10 Days and Gives MIDC and MPCB a 20-Day Ultimatum on Godavari Pollution",
    hi: "रोहित पवार का नाशिक कुंभ कामों में भ्रष्टाचार का आरोप, 10 दिन में हिसाब माँगा, गोदावरी प्रदूषण पर MIDC और MPCB को 20 दिन का अल्टीमेटम",
    mr: "रोहित पवारांचा नाशिक कुंभमेळा कामांत भ्रष्टाचाराचा आरोप; १० दिवसांत हिशेब मागितला, गोदावरी प्रदूषणावर एमआयडीसी व एमपीसीबीला २० दिवसांचा अल्टिमेटम",
  },
  date: "2026-11-05",
  originallyAnnounced: "2026-11-04",
  source: "Times of India, ETV Bharat, eSakal, Divya Marathi",
  sources: [
    {
      title: "'We're not against Kumbh works but corruption': Rohit Pawar",
      publisher: "Times of India",
      date: "2026-11-04",
      url: TOI,
      status: "reported",
    },
    {
      title: "Rohit Pawar alleges corruption in Rs 35,000 crore Kumbh Mela projects in Nashik, raises pollution concerns",
      publisher: "ETV Bharat",
      date: "2026-11-04",
      url: ETV_EN,
      status: "reported",
    },
    {
      title: "नाशिक कुंभमेळ्यातील कामांत सात हजार कोटींचा घोटाळा: आमदार रोहित पवार",
      publisher: "ETV Bharat Marathi",
      date: "2026-11-04",
      url: ETV_MR,
      status: "reported",
    },
    {
      title: "Kumbh Mela corruption: Rohit Pawar",
      publisher: "eSakal",
      date: "2026-11-04",
      url: SAKAL,
      status: "reported",
    },
    {
      title: "Nashik Kumbh Mela scam: Rohit Pawar targets Girish Mahajan",
      publisher: "Divya Marathi",
      date: "2026-11-05",
      url: DM,
      status: "reported",
    },
    {
      title: "Girish Mahajan on Kumbh Mela tenders (August 2026)",
      publisher: "Pudhari",
      date: "2026-08-20",
      url: PUDHARI_AUG,
      status: "reported",
    },
  ],
  category: "kumbh",
  image: "/images/og-image.jpg",
  photoId: 25,
  summary: {
    en: "NCP (SP) MLA Rohit Pawar inspected Kumbh works at Ramkund on 4 November and alleged corruption of ₹7,000 to ₹8,000 crore in Simhastha works by people close to Kumbh Mela Minister Girish Mahajan. He said he has written to the Divisional Commissioner, the Collector and the Kumbh Commissioner seeking accounts within 10 days, and gave MIDC and the pollution control board 20 days to stop chemical effluent reaching the Godavari. REPORTED: these are allegations; no response from Mahajan or the Authority was found by 5 November morning.",
    hi: "NCP (SP) विधायक रोहित पवार ने 4 नवंबर को रामकुंड पर कुंभ कामों का निरीक्षण किया और आरोप लगाया कि कुंभ मंत्री गिरीश महाजन के करीबी लोगों ने सिंहस्थ कामों में ₹7,000 से ₹8,000 करोड़ का भ्रष्टाचार किया है। उन्होंने कहा कि उन्होंने विभागीय आयुक्त, कलेक्टर और कुंभ आयुक्त को पत्र लिखकर 10 दिन में हिसाब माँगा है, और गोदावरी में रासायनिक पानी रोकने के लिए MIDC और प्रदूषण नियंत्रण बोर्ड को 20 दिन दिए हैं। रिपोर्ट: ये आरोप हैं; 5 नवंबर सुबह तक महाजन या प्राधिकरण का कोई जवाब नहीं मिला।",
    mr: "राष्ट्रवादी काँग्रेस (शरदचंद्र पवार) पक्षाचे आमदार रोहित पवार यांनी ४ नोव्हेंबरला रामकुंड परिसरातील कुंभमेळा कामांची पाहणी केली आणि कुंभमेळा मंत्री गिरीश महाजन यांच्या निकटवर्तीयांनी सिंहस्थ कामांत ₹७ ते ८ हजार कोटींचा भ्रष्टाचार केल्याचा आरोप केला. विभागीय आयुक्त, जिल्हाधिकारी आणि कुंभमेळा आयुक्तांना पत्र लिहून १० दिवसांत हिशेब मागितल्याचे आणि गोदावरीत जाणारे रासायनिक सांडपाणी थांबवण्यासाठी एमआयडीसी व प्रदूषण नियंत्रण मंडळाला २० दिवसांची मुदत दिल्याचे त्यांनी सांगितले. वृत्त: हे आरोप आहेत; ५ नोव्हेंबर सकाळपर्यंत महाजन किंवा प्राधिकरणाची प्रतिक्रिया आढळली नाही.",
  },
  content: {
    en: `**REPORTED:** everything below is what Rohit Pawar said, as reported by the Times of India, ETV Bharat, eSakal and Divya Marathi on 4 and 5 November 2026. These are political allegations, not findings. We have not found any response from Kumbh Mela Minister Girish Mahajan, the Nashik-Trimbakeshwar Kumbh Mela Authority or the district administration as of the morning of 5 November. We will add their response when it comes.

## What Rohit Pawar did and said (4 November)

- **Site visit:** the NCP (SP) MLA inspected the Kumbh works at Ramkund and took darshan at the Kalaram temple.
- **Corruption claim:** he alleged that people close to Girish Mahajan have made **₹7,000 to ₹8,000 crore** from Kumbh works. ETV Bharat Marathi also quotes him saying works of ₹5,000 to ₹7,000 crore were given to relatives and associates, so the figure differs even within one report. He also alleged that officials from Jalgaon were brought into the Kumbh Authority.
- **Works not visible:** he said that of about **₹35,000 crore** of works, little can be seen on the ground, and that good roads were dug up. He said 15 people died in pothole accidents in the monsoon (ETV Bharat; eSakal says 15 to 16). For the official budget, see our story on the [₹34,732 crore total outlay](${BUDGET}).
- **Accounts in 10 days:** he said he has written to the Divisional Commissioner, the Collector and the Kumbh Commissioner asking for accounts of the works within 10 days (eSakal, Divya Marathi). The Times of India reports he said earlier RTI requests went unanswered and that he will go to court if he does not get answers.
- **"Not against the works":** the Times of India quotes him saying he is not against Kumbh works, even if they cost ₹50,000 crore, but against corruption.

## The Godavari pollution ultimatum

- He gave **MIDC and the Maharashtra Pollution Control Board 20 days** to stop chemical effluent from industries reaching the Godavari, and said a check dam is needed downstream.
- He objected to concrete in the riverbed around Ramkund.
- The Times of India reports he raised contaminated borewells in Dattanagar near Ambad MIDC.
- For the official plan to clean the river, see our story on the [four new STPs and bathing quality](${STP}).

## Other claims

- **Ring road:** eSakal and Divya Marathi report he said the ring road is being built without full permissions and that farmers have not been paid compensation. Background: [ring road work on seven stretches](${RING}).
- **Trees:** eSakal reports he said he will pursue the case of an officer who cut trees planted under CSR and built a hotel.
- **Prayagraj comparison (figures differ):** ETV Bharat English quotes him saying Prayagraj spent about ₹7,500 crore for 50 to 60 crore visitors. eSakal and Divya Marathi quote about ₹7,000 crore and 16 crore people in one day.

## The other side so far

There has been no reply yet to these specific claims. In August 2026, replying to earlier opposition criticism, Girish Mahajan said Kumbh tenders were transparent and competitive and that most came in **20 to 42 percent below** estimates (Pudhari, 20 August). The Authority's latest figure is that about 51 percent of works are done, with a March 2027 deadline: see [Kumbh works 51 percent done](${WORKS}).`,
    hi: `**रिपोर्ट:** नीचे लिखी सारी बातें रोहित पवार ने कहीं, जैसा टाइम्स ऑफ़ इंडिया, ETV भारत, ई-सकाळ और दिव्य मराठी ने 4 और 5 नवंबर 2026 को बताया। ये राजनीतिक आरोप हैं, किसी जाँच के निष्कर्ष नहीं। 5 नवंबर सुबह तक कुंभ मंत्री गिरीश महाजन, नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण या ज़िला प्रशासन का कोई जवाब हमें नहीं मिला। जवाब आने पर हम उसे जोड़ेंगे।

## रोहित पवार ने क्या किया और कहा (4 नवंबर)

- **निरीक्षण:** NCP (SP) विधायक ने रामकुंड पर कुंभ कामों का निरीक्षण किया और कालाराम मंदिर में दर्शन किए।
- **भ्रष्टाचार का आरोप:** उन्होंने आरोप लगाया कि गिरीश महाजन के करीबी लोगों ने कुंभ कामों से **₹7,000 से ₹8,000 करोड़** कमाए हैं। ETV भारत मराठी उन्हें यह भी कहते हुए बताता है कि ₹5,000 से ₹7,000 करोड़ के काम रिश्तेदारों और सहयोगियों को दिए गए, यानी एक ही रिपोर्ट में आँकड़ा अलग है। उन्होंने यह भी आरोप लगाया कि जलगाँव के अधिकारियों को कुंभ प्राधिकरण में लाया गया।
- **काम दिखते नहीं:** उन्होंने कहा कि करीब **₹35,000 करोड़** के कामों में से ज़मीन पर कम दिखता है, और अच्छी सड़कें खोद दी गईं। उन्होंने कहा कि मानसून में गड्ढों के हादसों में 15 लोगों की मौत हुई (ETV भारत; ई-सकाळ के अनुसार 15 से 16)। आधिकारिक बजट के लिए देखें [₹34,732 करोड़ कुल खर्च](${BUDGET}) पर हमारी ख़बर।
- **10 दिन में हिसाब:** उन्होंने कहा कि उन्होंने विभागीय आयुक्त, कलेक्टर और कुंभ आयुक्त को पत्र लिखकर 10 दिन में कामों का हिसाब माँगा है (ई-सकाळ, दिव्य मराठी)। टाइम्स ऑफ़ इंडिया के अनुसार उन्होंने कहा कि पहले की RTI अर्ज़ियों का जवाब नहीं मिला और जवाब न मिलने पर वे अदालत जाएँगे।
- **"कामों के ख़िलाफ़ नहीं":** टाइम्स ऑफ़ इंडिया उन्हें यह कहते हुए बताता है कि वे कुंभ कामों के ख़िलाफ़ नहीं हैं, चाहे वे ₹50,000 करोड़ के हों, बल्कि भ्रष्टाचार के ख़िलाफ़ हैं।

## गोदावरी प्रदूषण पर अल्टीमेटम

- उन्होंने उद्योगों का रासायनिक पानी गोदावरी में जाने से रोकने के लिए **MIDC और महाराष्ट्र प्रदूषण नियंत्रण बोर्ड को 20 दिन** दिए, और कहा कि नीचे की ओर एक चेक डैम ज़रूरी है।
- उन्होंने रामकुंड के आसपास नदी पात्र में कंक्रीट पर आपत्ति जताई।
- टाइम्स ऑफ़ इंडिया के अनुसार उन्होंने अंबड MIDC के पास दत्तनगर में दूषित बोरवेल का मुद्दा उठाया।
- नदी की सफ़ाई की आधिकारिक योजना के लिए देखें [चार नए STP और स्नान योग्य पानी](${STP}) पर हमारी ख़बर।

## अन्य दावे

- **रिंग रोड:** ई-सकाळ और दिव्य मराठी के अनुसार उन्होंने कहा कि रिंग रोड पूरी अनुमतियों के बिना बन रहा है और किसानों को मुआवज़ा नहीं मिला। पृष्ठभूमि: [सात हिस्सों पर रिंग रोड का काम](${RING})।
- **पेड़:** ई-सकाळ के अनुसार उन्होंने कहा कि CSR के तहत लगाए पेड़ काटकर होटल बनाने वाले अधिकारी का मामला वे उठाएँगे।
- **प्रयागराज से तुलना (आँकड़े अलग):** ETV भारत अंग्रेज़ी के अनुसार उन्होंने कहा कि प्रयागराज में करीब ₹7,500 करोड़ ख़र्च हुए और 50 से 60 करोड़ लोग आए। ई-सकाळ और दिव्य मराठी करीब ₹7,000 करोड़ और एक दिन में 16 करोड़ लोग बताते हैं।

## दूसरा पक्ष अब तक

इन ख़ास आरोपों का अभी जवाब नहीं आया है। अगस्त 2026 में विपक्ष की पिछली आलोचना पर गिरीश महाजन ने कहा था कि कुंभ के टेंडर पारदर्शी और प्रतिस्पर्धी हैं और ज़्यादातर अनुमान से **20 से 42 प्रतिशत कम** पर आए (पुढारी, 20 अगस्त)। प्राधिकरण का ताज़ा आँकड़ा है कि करीब 51 प्रतिशत काम पूरे हैं और समय सीमा मार्च 2027 है: देखें [कुंभ के 51 प्रतिशत काम पूरे](${WORKS})।`,
    mr: `**वृत्त:** खालील सर्व मुद्दे रोहित पवार यांनी मांडले, जसे टाइम्स ऑफ इंडिया, ईटीव्ही भारत, ई-सकाळ आणि दिव्य मराठीने ४ व ५ नोव्हेंबर २०२६ रोजी दिले. हे राजकीय आरोप आहेत, कोणत्याही चौकशीचे निष्कर्ष नाहीत. ५ नोव्हेंबर सकाळपर्यंत कुंभमेळा मंत्री गिरीश महाजन, नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरण किंवा जिल्हा प्रशासनाची प्रतिक्रिया आम्हाला आढळली नाही. प्रतिक्रिया आल्यावर ती येथे जोडू.

## रोहित पवार यांनी काय केले आणि काय म्हणाले (४ नोव्हेंबर)

- **पाहणी:** राष्ट्रवादी काँग्रेस (शरदचंद्र पवार) पक्षाच्या आमदारांनी रामकुंड परिसरातील कुंभमेळा कामांची पाहणी केली आणि काळाराम मंदिरात दर्शन घेतले.
- **भ्रष्टाचाराचा आरोप:** गिरीश महाजन यांच्या निकटवर्तीयांनी कुंभमेळा कामांतून **₹७ ते ८ हजार कोटी** कमावल्याचा आरोप त्यांनी केला. ईटीव्ही भारत मराठीनुसार त्यांनी ₹५ ते ७ हजार कोटींची कामे नातेवाईक व सहकाऱ्यांना दिल्याचेही म्हटले, म्हणजे एकाच वृत्तात आकडा वेगळा आहे. जळगावचे अधिकारी कुंभमेळा प्राधिकरणात आणल्याचा आरोपही त्यांनी केला.
- **कामे दिसत नाहीत:** सुमारे **₹३५ हजार कोटींच्या** कामांपैकी प्रत्यक्षात फार कमी दिसते, आणि चांगले रस्ते खोदले गेले, असे ते म्हणाले. पावसाळ्यात खड्ड्यांमुळे झालेल्या अपघातांत १५ जणांचा मृत्यू झाल्याचे त्यांनी सांगितले (ईटीव्ही भारत; ई-सकाळनुसार १५ ते १६). अधिकृत अंदाजपत्रकासाठी [₹३४,७३२ कोटींचा एकूण खर्च](${BUDGET}) ही आमची बातमी पाहा.
- **१० दिवसांत हिशेब:** विभागीय आयुक्त, जिल्हाधिकारी आणि कुंभमेळा आयुक्तांना पत्र लिहून १० दिवसांत कामांचा हिशेब मागितल्याचे त्यांनी सांगितले (ई-सकाळ, दिव्य मराठी). टाइम्स ऑफ इंडियानुसार, आधीच्या माहिती अधिकार अर्जांना उत्तर मिळाले नाही आणि उत्तरे न मिळाल्यास न्यायालयात जाऊ, असे ते म्हणाले.
- **"कामांच्या विरोधात नाही":** कुंभमेळ्याची कामे ₹५० हजार कोटींची असली तरी आम्ही कामांच्या नव्हे तर भ्रष्टाचाराच्या विरोधात आहोत, असे त्यांनी म्हटल्याचे टाइम्स ऑफ इंडियाने दिले आहे.

## गोदावरी प्रदूषणावर अल्टिमेटम

- उद्योगांचे रासायनिक सांडपाणी गोदावरीत जाणे थांबवण्यासाठी त्यांनी **एमआयडीसी आणि महाराष्ट्र प्रदूषण नियंत्रण मंडळाला २० दिवसांची** मुदत दिली, आणि खालच्या बाजूला चेक डॅमची गरज असल्याचे सांगितले.
- रामकुंड परिसरात नदीपात्रातील काँक्रिटीकरणावर त्यांनी आक्षेप घेतला.
- टाइम्स ऑफ इंडियानुसार त्यांनी अंबड एमआयडीसीजवळील दत्तनगरमधील दूषित कूपनलिकांचा मुद्दा मांडला.
- नदी स्वच्छतेच्या अधिकृत नियोजनासाठी [चार नवे एसटीपी आणि स्नानयोग्य पाणी](${STP}) ही आमची बातमी पाहा.

## इतर दावे

- **रिंग रोड:** ई-सकाळ व दिव्य मराठीनुसार, रिंग रोड सर्व परवानग्यांशिवाय होत असून शेतकऱ्यांना मोबदला मिळालेला नाही, असे ते म्हणाले. पार्श्वभूमी: [सात टप्प्यांत रिंग रोडचे काम](${RING}).
- **झाडे:** सीएसआरअंतर्गत लावलेली झाडे तोडून हॉटेल उभारणाऱ्या अधिकाऱ्याचे प्रकरण लावून धरू, असे त्यांनी म्हटल्याचे ई-सकाळने दिले आहे.
- **प्रयागराजशी तुलना (आकडे वेगवेगळे):** ईटीव्ही भारत इंग्रजीनुसार प्रयागराजमध्ये सुमारे ₹७,५०० कोटी खर्च झाले आणि ५० ते ६० कोटी भाविक आले, असे ते म्हणाले. ई-सकाळ व दिव्य मराठी सुमारे ₹७,००० कोटी आणि एका दिवसात १६ कोटी भाविक असे देतात.

## दुसरी बाजू आतापर्यंत

या विशिष्ट आरोपांना अद्याप उत्तर आलेले नाही. ऑगस्ट २०२६ मध्ये विरोधकांच्या आधीच्या टीकेला उत्तर देताना गिरीश महाजन यांनी कुंभमेळ्याच्या निविदा पारदर्शक व स्पर्धात्मक असून बहुतांश निविदा अंदाजापेक्षा **२० ते ४२ टक्के कमी** दराने आल्याचे म्हटले होते (पुढारी, २० ऑगस्ट). प्राधिकरणाच्या ताज्या आकडेवारीनुसार सुमारे ५१ टक्के कामे पूर्ण असून मुदत मार्च २०२७ आहे: [कुंभमेळ्याची ५१ टक्के कामे पूर्ण](${WORKS}) पाहा.`,
  },
};

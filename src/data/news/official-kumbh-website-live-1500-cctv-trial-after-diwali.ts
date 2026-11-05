import type { BlogArticle } from "@/data/blogData";

const SITE = "https://simhasthamahakumbh.maharashtra.gov.in";
const ETV_EN = "https://www.etvbharat.com/en/state/nashik-trimbakeshwar-kumbh-mela-authority-launches-official-website-for-2027-simhastha-kumbh-enn26110308192";
const ETV_MR = "https://www.etvbharat.com/mr/state/official-website-nashik-simhastha-kumbh-mela-open-information-preparations-available-with-a-click-mhs26110307191";
const TOI_CCTV = "https://timesofindia.indiatimes.com/city/nashik/1500-of-5500-kumbh-cctvs-to-go-live-on-trial-after-diwali-initiative-to-ensure-real-time-monitoring-of-crowd-movement-traffic-flow-and-security-arrangements-during-kumbh-mela/articleshow/135508792.cms";
const TOI_DEA = "https://timesofindia.indiatimes.com/city/nashik/economic-advisory-team-reviews-nashik-trimbak-simhastha-kumbh-preparations/articleshow/135471008.cms";
const FPJ_DEA = "https://www.freepressjournal.in/pune/nashik-centres-economic-delegation-reviews-simhastha-preparations-explores-regional-economic-potential";
const INTERVIEW = "/blog/kumbh-commissioner-shekhar-singh-works-by-1-march-5000-buses-official-website-october-31";
const COMMAND = "/blog/third-kumbh-command-centre-approved-5000-cctv-cameras";
const DATES = "/dates";
const HUB = "/dhwajarohan-2026";

export const article: BlogArticle = {
  id: 280,
  slug: "official-kumbh-website-live-simhasthamahakumbh-maharashtra-gov-in-1500-of-5500-cctv-cameras-trial-after-diwali",
  title: {
    en: "The Official Kumbh Website Is Live at simhasthamahakumbh.maharashtra.gov.in; 1,500 of 5,500 Kumbh CCTV Cameras to Go on Trial After Diwali",
    hi: "कुंभ की आधिकारिक वेबसाइट simhasthamahakumbh.maharashtra.gov.in पर शुरू; 5,500 में से 1,500 CCTV कैमरों का ट्रायल दिवाली के बाद",
    mr: "कुंभमेळ्याचे अधिकृत संकेतस्थळ simhasthamahakumbh.maharashtra.gov.in वर सुरू; ५,५०० पैकी १,५०० सीसीटीव्ही कॅमेऱ्यांची चाचणी दिवाळीनंतर",
  },
  date: "2026-11-05",
  originallyAnnounced: "2026-11-03",
  source: "Nashik-Trimbakeshwar Kumbh Mela Authority website, ETV Bharat, Times of India",
  sources: [
    {
      title: "Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027 | Official website",
      publisher: "Nashik Trimbakeshwar Kumbh Mela Authority (Government of Maharashtra)",
      date: "2026-11-05",
      url: SITE,
      status: "confirmed",
    },
    {
      title: "Nashik-Trimbakeshwar Kumbh Mela Authority Launches Official Website For 2027 Simhastha Kumbh",
      publisher: "ETV Bharat",
      date: "2026-11-03",
      url: ETV_EN,
      status: "reported",
    },
    {
      title: "नाशिक सिंहस्थ कुंभमेळ्याचे अधिकृत संकेतस्थळ भाविकांसाठी खुले; तयारीची माहिती एका क्लिकवर",
      publisher: "ETV Bharat Marathi",
      date: "2026-11-03",
      url: ETV_MR,
      status: "reported",
    },
    {
      title: "1,500 of 5,500 Kumbh CCTVs to go live on trial after Diwali",
      publisher: "Times of India",
      date: "2026-11-03",
      url: TOI_CCTV,
      status: "reported",
    },
    {
      title: "Economic advisory team reviews Nashik, Trimbak Simhastha Kumbh preparations",
      publisher: "Times of India",
      date: "2026-11-02",
      url: TOI_DEA,
      status: "reported",
    },
    {
      title: "Nashik: Centre's Economic Delegation Reviews Simhastha Preparations, Explores Regional Economic Potential",
      publisher: "Free Press Journal",
      date: "2026-11-03",
      url: FPJ_DEA,
      status: "reported",
    },
  ],
  category: "kumbh",
  image: "/images/og-image.jpg",
  photoId: 27,
  summary: {
    en: "The Nashik-Trimbakeshwar Kumbh Mela Authority has opened its official website at simhasthamahakumbh.maharashtra.gov.in, and on 3 November it asked departments, hotels, transport operators and the media to point people to it. We checked the site on 5 November: it is live in English, Hindi and Marathi and lists the Amrit Snan dates as 2 August, 31 August and 11 September 2027 in Nashik and 12 September 2027 in Trimbakeshwar, but its live updates page is still empty. Separately, the Times of India reports that 1,500 of the 5,500 Kumbh CCTV cameras will start trial runs after Diwali.",
    hi: "नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण ने अपनी आधिकारिक वेबसाइट simhasthamahakumbh.maharashtra.gov.in शुरू कर दी है, और 3 नवंबर को विभागों, होटलों, परिवहन संचालकों और मीडिया से लोगों को इसी पर भेजने की अपील की। हमने 5 नवंबर को साइट देखी: यह अंग्रेज़ी, हिंदी और मराठी में चल रही है और अमृत स्नान की तिथियाँ नाशिक में 2 अगस्त, 31 अगस्त और 11 सितंबर 2027 तथा त्र्यंबकेश्वर में 12 सितंबर 2027 बताती है, लेकिन इसका लाइव अपडेट पेज अभी खाली है। अलग से, टाइम्स ऑफ इंडिया के अनुसार कुंभ के 5,500 में से 1,500 CCTV कैमरों का ट्रायल दिवाली के बाद शुरू होगा।",
    mr: "नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाने simhasthamahakumbh.maharashtra.gov.in हे अधिकृत संकेतस्थळ सुरू केले असून ३ नोव्हेंबरला शासकीय विभाग, निवास व्यावसायिक, वाहतूकदार आणि प्रसारमाध्यमांनी लोकांना हेच संकेतस्थळ सांगावे असे आवाहन केले. आम्ही ५ नोव्हेंबरला संकेतस्थळ तपासले: ते इंग्रजी, हिंदी व मराठीत सुरू आहे आणि त्यावर अमृतस्नानाच्या तारखा नाशिकमध्ये २ ऑगस्ट, ३१ ऑगस्ट व ११ सप्टेंबर २०२७ आणि त्र्यंबकेश्वरमध्ये १२ सप्टेंबर २०२७ अशा आहेत; मात्र लाइव्ह अपडेट्सचे पान अजून रिकामे आहे. स्वतंत्रपणे, कुंभासाठीच्या ५,५०० पैकी १,५०० सीसीटीव्ही कॅमेऱ्यांची चाचणी दिवाळीनंतर सुरू होणार असल्याचे टाइम्स ऑफ इंडियाने म्हटले आहे.",
  },
  content: {
    en: `Two pieces of Kumbh information infrastructure moved forward after the flag hoisting. **CONFIRMED:** the official website is live; we opened it ourselves on 5 November. **REPORTED:** the Authority's appeal to share the site was carried by ETV Bharat on 3 November, and the CCTV trial plan is from the Times of India (3 November, 11:08 PM). We have not seen a written Authority press release on either.

This is a follow-up to our 23 October story on the [Kumbh Commissioner's interview and the planned website](${INTERVIEW}), where we said the web address had not been announced.

## 1. The official website: simhasthamahakumbh.maharashtra.gov.in

- **Address:** [simhasthamahakumbh.maharashtra.gov.in](${SITE}). It carries the Government of Maharashtra and Nashik district branding and is run by the **Nashik Trimbakeshwar Kumbh Mela Authority (NTKMA)**. Treat other sites that call themselves "official" with care.
- **The Authority's appeal (3 November, via ETV Bharat):** government departments, the district administration, NMC, elected representatives, religious bodies, transport and accommodation businesses and the media should share the link, and the media should refer to it when reporting on the Kumbh. Kumbh Mela Commissioner **Shekhar Singh** is quoted on what the site will carry.
- **What it is meant to have:** bathing dates and timings, official announcements, temples, ghats and akhadas, travel by air, rail and road, local transport, and, **in phases**, toilets, drinking water points, medical centres, hospitals, accommodation, parking, help desks, emergency numbers and safety advisories. The KumbhDoot visitor assistant is also on the home page.
- **Amrit Snan dates on the site:** the Simhastha runs from **31 October 2026 to 24 July 2028**. Amrit Snans are on **2 August 2027**, **31 August 2027** and **11 September 2027** at Ramtirth, Nashik, and **12 September 2027** at Kushavarta, Trimbakeshwar. The Amrit Snan dates match the [dates on our site](${DATES}). **One difference:** the site gives a single end date, 24 July 2028, while the Authority's own Kumbh Mela Plan (June 2026) closes the Simhastha on **29 July 2028 in Nashik** and **24 July 2028 in Trimbakeshwar**. We are keeping the plan's two dates until the Authority clarifies. The site adds that almanac details are indicative and the final word rests with the priests, the Akhada Parishad and the government.

**What we found when we checked (5 November):** the site works in English, Hindi and Marathi. The **live updates page says updates will be posted during the Mela** and is empty for now. The "Circulars and Press Releases" list so far shows only media reports up to 26 October, and the footer says it was last updated on **31 October 2026**. Parking, shuttle timings and facility maps are menu items, but much of that detail is still to come, as the Authority itself says.

## 2. 1,500 Kumbh CCTV cameras to go on trial after Diwali

- With the flag hoisting over, NMC has shifted focus to finishing Kumbh works, the Times of India reports. **About 1,500 CCTV cameras already installed in Nashik** will go live on a **trial basis after Diwali**, as the first phase of the Kumbh surveillance network.
- **The full network:** the Nashik Municipal Smart City Development Corporation is installing **5,500 cameras**, **4,500 in Nashik city and 1,000 in Trimbakeshwar**, at the Shahi Marg procession routes, Sadhugram, roads to Ramkund and the Godavari ghats, city entry points, parking zones and major junctions.
- **Monitoring:** the trial will be watched from the **Command and Control Centre at the Smart City office in Panchavati**. About **355 km** of the optical fibre network has been laid, an official said, and the rest is being coordinated with road works.
- **In her words:** "In the first phase, we will conduct trials of around 1,500 CCTVs already installed in the city to check their operations through the Command and Control Centre. The cameras will also be used to implement and test crowd-management standard operating procedures (SOPs) well in advance," NMC Commissioner **Manisha Khatri** told TOI.

**Figures differ:** our 6 October story on the [third command centre](${COMMAND}) cited about **5,000** cameras for Nashik and Trimbak. The Times of India now gives **5,500**. No official camera list has been published, and the trial start date beyond "after Diwali" has not been announced.

## Also: Finance Ministry economists at the Kumbh Authority

A delegation from the **Department of Economic Affairs**, Union Finance Ministry, ended a three-day Nashik study tour at the NTKMA office, where it reviewed Kumbh administrative preparedness, civic infrastructure plans and crowd management (Times of India, 2 November). TOI says the 31-member team was led by Chief Economic Adviser **V Anantha Nageswaran**; Commissioner Shekhar Singh received economic advisers **Dr Anuradha Guru** and **Dr Rose Mary K Abraham** and director **Kokila Jayaram**. **Dates differ:** the Free Press Journal and Sarkarnama say the Authority visit was on **Sunday 1 November**, while TOI says **Monday**. REPORTED; no announcements came out of the meeting.

## What this means for you

- **Bookmark the official site** for dates and notices, and cross-check anything that claims to be an "official" pass, booking or package against it.
- **Parking and shuttle details are not there yet.** Until they are, check our [Dhwajarohan 2026 hub](${HUB}) and the guides on this site, and watch for official notices before big days.
- **Cameras:** if you live near Ramkund or the procession routes, the trial runs mean the crowd control room will start practising its plans well before the 2027 Amrit Snans.`,
    hi: `ध्वजारोहण के बाद कुंभ की सूचना व्यवस्था के दो हिस्से आगे बढ़े। **पुष्ट:** आधिकारिक वेबसाइट चालू है; हमने 5 नवंबर को इसे खुद खोलकर देखा। **रिपोर्ट:** वेबसाइट साझा करने की प्राधिकरण की अपील ETV भारत ने 3 नवंबर को छापी, और CCTV ट्रायल की योजना टाइम्स ऑफ इंडिया (3 नवंबर, रात 11:08) की ख़बर से है। इन दोनों पर प्राधिकरण की लिखित प्रेस विज्ञप्ति हमें नहीं मिली।

यह हमारी 23 अक्टूबर की ख़बर [कुंभ आयुक्त का इंटरव्यू और प्रस्तावित वेबसाइट](${INTERVIEW}) का फ़ॉलो-अप है, जिसमें हमने लिखा था कि वेब पता अभी घोषित नहीं हुआ है।

## 1. आधिकारिक वेबसाइट: simhasthamahakumbh.maharashtra.gov.in

- **पता:** [simhasthamahakumbh.maharashtra.gov.in](${SITE})। इस पर महाराष्ट्र शासन और नाशिक ज़िले की पहचान है और इसे **नाशिक त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA)** चलाता है। ख़ुद को "आधिकारिक" बताने वाली दूसरी साइटों से सावधान रहें।
- **प्राधिकरण की अपील (3 नवंबर, ETV भारत के अनुसार):** सरकारी विभाग, ज़िला प्रशासन, महानगरपालिका, जनप्रतिनिधि, धार्मिक संस्थाएँ, परिवहन और ठहरने की सुविधा देने वाले व्यवसाय और मीडिया इस लिंक को साझा करें, और मीडिया कुंभ की ख़बरों में इसी का हवाला दे। साइट पर क्या रहेगा, इस बारे में कुंभ मेला आयुक्त **शेखर सिंह** के हवाले से जानकारी दी गई है।
- **क्या मिलेगा:** स्नान की तिथियाँ और समय, आधिकारिक घोषणाएँ, मंदिर, घाट और अखाड़े, हवाई, रेल और सड़क से पहुँचने की जानकारी, स्थानीय परिवहन, और **चरणों में** शौचालय, पीने का पानी, चिकित्सा केंद्र, अस्पताल, ठहरने की व्यवस्था, पार्किंग, सहायता कक्ष, आपात नंबर और सुरक्षा सूचनाएँ। होम पेज पर कुंभदूत सहायक भी है।
- **साइट पर अमृत स्नान की तिथियाँ:** सिंहस्थ **31 अक्टूबर 2026 से 24 जुलाई 2028** तक है। अमृत स्नान **2 अगस्त 2027**, **31 अगस्त 2027** और **11 सितंबर 2027** को रामतीर्थ, नाशिक में, और **12 सितंबर 2027** को कुशावर्त, त्र्यंबकेश्वर में हैं। अमृत स्नान की तिथियाँ [हमारी साइट की तिथियों](${DATES}) से मेल खाती हैं। **एक फ़र्क:** साइट समापन की एक ही तारीख़, 24 जुलाई 2028, देती है, जबकि प्राधिकरण की अपनी कुंभ मेला योजना (जून 2026) में सिंहस्थ का समापन **नाशिक में 29 जुलाई 2028** और **त्र्यंबकेश्वर में 24 जुलाई 2028** है। प्राधिकरण के स्पष्ट करने तक हम योजना की दोनों तारीख़ें रख रहे हैं। साइट यह भी कहती है कि पंचांग की जानकारी संकेत भर है और अंतिम निर्णय पुरोहित संघ, अखाड़ा परिषद और सरकार का होगा।

**5 नवंबर को जाँचने पर हमने क्या पाया:** साइट अंग्रेज़ी, हिंदी और मराठी में चलती है। **लाइव अपडेट पेज पर लिखा है कि अपडेट मेले के दौरान दिए जाएँगे**, और अभी वह खाली है। "परिपत्र और प्रेस विज्ञप्ति" सूची में अभी 26 अक्टूबर तक की केवल मीडिया ख़बरें हैं, और फ़ुटर के अनुसार साइट आख़िरी बार **31 अक्टूबर 2026** को अपडेट हुई। पार्किंग, शटल समय और सुविधाओं के नक्शे मेन्यू में हैं, लेकिन इनकी ज़्यादातर जानकारी अभी आनी है, जैसा प्राधिकरण ख़ुद कहता है।

## 2. कुंभ के 1,500 CCTV कैमरों का ट्रायल दिवाली के बाद

- टाइम्स ऑफ इंडिया के अनुसार ध्वजारोहण के बाद NMC ने कुंभ के काम पूरे करने पर ध्यान लगाया है। **नाशिक में पहले से लगे करीब 1,500 CCTV कैमरे** **दिवाली के बाद ट्रायल के तौर पर** चालू होंगे। यह कुंभ निगरानी नेटवर्क का पहला चरण है।
- **पूरा नेटवर्क:** नाशिक म्युनिसिपल स्मार्ट सिटी डेवलपमेंट कॉर्पोरेशन **5,500 कैमरे** लगा रहा है, **4,500 नाशिक शहर में और 1,000 त्र्यंबकेश्वर में**। ये शाही मार्ग, साधुग्राम, रामकुंड और गोदावरी घाटों की ओर जाने वाली सड़कों, शहर के प्रवेश बिंदुओं, पार्किंग क्षेत्रों और बड़े चौराहों पर लग रहे हैं।
- **निगरानी:** ट्रायल पर **पंचवटी स्थित स्मार्ट सिटी कार्यालय के कमांड एंड कंट्रोल सेंटर** से नज़र रखी जाएगी। एक अधिकारी के अनुसार करीब **355 किमी** ऑप्टिकल फ़ाइबर बिछ चुका है, और बाकी काम सड़क कामों के साथ तालमेल से हो रहा है।
- **उनके शब्दों में (अनुवाद):** "पहले चरण में शहर में पहले से लगे करीब 1,500 CCTV का कमांड एंड कंट्रोल सेंटर से ट्रायल करेंगे। इन कैमरों से भीड़ प्रबंधन की मानक कार्य प्रणाली (SOP) भी पहले से लागू करके परखी जाएगी," NMC आयुक्त **मनीषा खत्री** ने TOI से कहा।

**आँकड़ों में फ़र्क:** [तीसरे कमांड सेंटर](${COMMAND}) पर हमारी 6 अक्टूबर की ख़बर में नाशिक और त्र्यंबक के लिए करीब **5,000** कैमरे बताए गए थे। टाइम्स ऑफ इंडिया अब **5,500** बताता है। कैमरों की कोई आधिकारिक सूची जारी नहीं हुई है, और "दिवाली के बाद" के अलावा ट्रायल की तारीख़ घोषित नहीं हुई।

## और: वित्त मंत्रालय के अर्थशास्त्री कुंभ प्राधिकरण में

केंद्रीय वित्त मंत्रालय के **आर्थिक मामलों के विभाग** के एक प्रतिनिधिमंडल ने नाशिक का तीन दिन का अध्ययन दौरा NTKMA कार्यालय में ख़त्म किया, जहाँ कुंभ की प्रशासनिक तैयारी, नागरी ढाँचे की योजना और भीड़ प्रबंधन की समीक्षा हुई (टाइम्स ऑफ इंडिया, 2 नवंबर)। TOI के अनुसार 31 सदस्यों वाले दल का नेतृत्व मुख्य आर्थिक सलाहकार **वी अनंत नागेश्वरन** ने किया; आयुक्त शेखर सिंह ने आर्थिक सलाहकार **डॉ. अनुराधा गुरु** और **डॉ. रोज़ मेरी के अब्राहम** तथा निदेशक **कोकिला जयराम** का स्वागत किया। **तारीख़ में फ़र्क:** फ़्री प्रेस जर्नल और सरकारनामा के अनुसार प्राधिकरण का दौरा **रविवार 1 नवंबर** को हुआ, जबकि TOI **सोमवार** बताता है। रिपोर्ट; बैठक से कोई घोषणा नहीं हुई।

## आपके लिए इसका मतलब

- तिथियों और सूचनाओं के लिए **आधिकारिक साइट बुकमार्क करें**, और "आधिकारिक" पास, बुकिंग या पैकेज का दावा करने वाली किसी भी चीज़ को उससे मिलाकर देखें।
- **पार्किंग और शटल की जानकारी अभी वहाँ नहीं है।** तब तक हमारा [ध्वजारोहण 2026 हब](${HUB}) और इस साइट की गाइड देखें, और बड़े दिनों से पहले आधिकारिक सूचनाओं पर नज़र रखें।
- **कैमरे:** अगर आप रामकुंड या शोभायात्रा मार्गों के पास रहते हैं, तो ट्रायल का मतलब है कि भीड़ नियंत्रण कक्ष 2027 के अमृत स्नानों से काफ़ी पहले अपनी योजनाओं का अभ्यास शुरू कर देगा।`,
    mr: `ध्वजारोहणानंतर कुंभमेळ्याच्या माहिती यंत्रणेतील दोन गोष्टी पुढे सरकल्या. **अधिकृत:** अधिकृत संकेतस्थळ सुरू आहे; आम्ही ५ नोव्हेंबरला ते स्वतः उघडून पाहिले. **वृत्त:** संकेतस्थळ सर्वांपर्यंत पोहोचवण्याचे प्राधिकरणाचे आवाहन ईटीव्ही भारतने ३ नोव्हेंबरला दिले, आणि सीसीटीव्ही चाचणीची माहिती टाइम्स ऑफ इंडियाच्या (३ नोव्हेंबर, रात्री ११.०८) वृत्तातील आहे. यापैकी कशावरही प्राधिकरणाचे लेखी प्रसिद्धिपत्रक आम्हाला दिसलेले नाही.

ही आमच्या २३ ऑक्टोबरच्या [कुंभमेळा आयुक्तांची मुलाखत आणि प्रस्तावित संकेतस्थळ](${INTERVIEW}) या बातमीची पुढची अपडेट आहे; त्यात आम्ही संकेतस्थळाचा पत्ता जाहीर झाला नसल्याचे म्हटले होते.

## १. अधिकृत संकेतस्थळ: simhasthamahakumbh.maharashtra.gov.in

- **पत्ता:** [simhasthamahakumbh.maharashtra.gov.in](${SITE}). त्यावर महाराष्ट्र शासन आणि नाशिक जिल्ह्याची ओळख असून ते **नाशिक त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA)** चालवते. स्वतःला "अधिकृत" म्हणवणाऱ्या इतर संकेतस्थळांपासून सावध राहा.
- **प्राधिकरणाचे आवाहन (३ नोव्हेंबर, ईटीव्ही भारतनुसार):** शासकीय विभाग, जिल्हा प्रशासन, महापालिका, लोकप्रतिनिधी, धार्मिक संस्था, पर्यटन व वाहतूक क्षेत्रातील घटक, निवास व्यावसायिक आणि प्रसारमाध्यमांनी ही लिंक जास्तीत जास्त लोकांपर्यंत पोहोचवावी, आणि माध्यमांनी कुंभमेळ्याच्या बातम्या देताना अधिकृत संकेतस्थळाचा संदर्भ द्यावा. संकेतस्थळावर काय असेल याची माहिती कुंभमेळा आयुक्त **शेखर सिंह** यांनी दिली आहे.
- **काय असेल:** पर्वणी स्नानाच्या तारखा व वेळा, महत्त्वाच्या घोषणा, मंदिरे, घाट आणि आखाडे, हवाई, रेल्वे व रस्ते मार्गाने पोहोचण्याची माहिती, स्थानिक वाहतूक, आणि **टप्प्याटप्प्याने** स्वच्छतागृहे, पिण्याचे पाणी, वैद्यकीय मदत केंद्रे, रुग्णालये, निवास, वाहनतळ, मदत कक्ष, आपत्कालीन क्रमांक आणि सुरक्षाविषयक सूचना. मुखपृष्ठावर कुंभदूत सहायकही आहे.
- **संकेतस्थळावरील अमृतस्नान तारखा:** सिंहस्थ **३१ ऑक्टोबर २०२६ ते २४ जुलै २०२८** असा आहे. अमृतस्नान **२ ऑगस्ट २०२७**, **३१ ऑगस्ट २०२७** आणि **११ सप्टेंबर २०२७** रोजी रामतीर्थ, नाशिक येथे, तर **१२ सप्टेंबर २०२७** रोजी कुशावर्त, त्र्यंबकेश्वर येथे. अमृतस्नानाच्या तारखा [आमच्या संकेतस्थळावरील तारखांशी](${DATES}) जुळतात. **एक फरक:** संकेतस्थळ सांगतेची एकच तारीख, २४ जुलै २०२८, देते, तर प्राधिकरणाच्याच कुंभमेळा आराखड्यात (जून २०२६) सिंहस्थाची सांगता **नाशिकमध्ये २९ जुलै २०२८** आणि **त्र्यंबकेश्वरमध्ये २४ जुलै २०२८** अशी आहे. प्राधिकरण स्पष्ट करेपर्यंत आम्ही आराखड्यातील दोन्ही तारखा ठेवत आहोत. पंचांगातील तपशील केवळ मार्गदर्शक असून अंतिम घोषणा पुरोहित संघ, आखाडा परिषद आणि शासन करतील, असेही संकेतस्थळावर म्हटले आहे.

**५ नोव्हेंबरला तपासताना काय दिसले:** संकेतस्थळ इंग्रजी, हिंदी आणि मराठीत चालते. **लाइव्ह अपडेट्सच्या पानावर मेळ्यादरम्यान अपडेट्स दिले जातील असे लिहिले आहे** आणि ते सध्या रिकामे आहे. "परिपत्रके व प्रसिद्धिपत्रके" या यादीत सध्या २६ ऑक्टोबरपर्यंतच्या केवळ माध्यमांच्या बातम्या आहेत, आणि तळटिपेनुसार संकेतस्थळ शेवटचे **३१ ऑक्टोबर २०२६** रोजी अपडेट झाले. वाहनतळ, शटलच्या वेळा आणि सुविधांचे नकाशे मेनूमध्ये आहेत, पण त्यातील बहुतांश माहिती अजून यायची आहे, असे प्राधिकरणानेच म्हटले आहे.

## २. कुंभासाठीच्या १,५०० सीसीटीव्ही कॅमेऱ्यांची चाचणी दिवाळीनंतर

- ध्वजारोहण झाल्यानंतर महापालिकेने कुंभाची कामे पूर्ण करण्यावर लक्ष केंद्रित केले आहे, असे टाइम्स ऑफ इंडियाने म्हटले आहे. **नाशिकमध्ये आधीच बसवलेले सुमारे १,५०० सीसीटीव्ही कॅमेरे** **दिवाळीनंतर चाचणी तत्त्वावर** सुरू होतील. हा कुंभ निगराणी नेटवर्कचा पहिला टप्पा आहे.
- **संपूर्ण नेटवर्क:** नाशिक म्युनिसिपल स्मार्ट सिटी डेव्हलपमेंट कॉर्पोरेशन **५,५०० कॅमेरे** बसवत आहे, त्यापैकी **४,५०० नाशिक शहरात आणि १,००० त्र्यंबकेश्वरमध्ये**. शाही मार्ग, साधुग्राम, रामकुंड व गोदाघाटांकडे जाणारे रस्ते, शहराचे प्रवेशमार्ग, वाहनतळ आणि मोठे चौक येथे ते बसवले जात आहेत.
- **निगराणी:** चाचणीवर **पंचवटीतील स्मार्ट सिटी कार्यालयातील कमांड अँड कंट्रोल सेंटरमधून** लक्ष ठेवले जाईल. सुमारे **३५५ किमी** ऑप्टिकल फायबर टाकून झाले असून उर्वरित काम रस्त्यांच्या कामांशी समन्वय साधून सुरू आहे, असे एका अधिकाऱ्याने सांगितले.
- **त्यांच्या शब्दांत (अनुवाद):** "पहिल्या टप्प्यात शहरात आधीच बसवलेल्या सुमारे १,५०० सीसीटीव्हींची कमांड अँड कंट्रोल सेंटरमधून चाचणी घेऊ. या कॅमेऱ्यांच्या मदतीने गर्दी व्यवस्थापनाच्या प्रमाणित कार्यपद्धती (SOP) देखील आधीच राबवून तपासल्या जातील," असे महापालिका आयुक्त **मनीषा खत्री** यांनी टाइम्स ऑफ इंडियाला सांगितले.

**आकड्यांत फरक:** [तिसऱ्या कमांड सेंटरवरील](${COMMAND}) आमच्या ६ ऑक्टोबरच्या बातमीत नाशिक व त्र्यंबकसाठी सुमारे **५,०००** कॅमेरे सांगितले होते. टाइम्स ऑफ इंडिया आता **५,५००** सांगतो. कॅमेऱ्यांची अधिकृत यादी प्रसिद्ध झालेली नाही, आणि "दिवाळीनंतर" याशिवाय चाचणीची तारीख जाहीर झालेली नाही.

## आणखी: केंद्रीय अर्थ मंत्रालयाचे अर्थतज्ज्ञ कुंभमेळा प्राधिकरणात

केंद्रीय अर्थ मंत्रालयाच्या **आर्थिक व्यवहार विभागाच्या** शिष्टमंडळाने नाशिकचा तीन दिवसांचा अभ्यास दौरा NTKMA कार्यालयात संपवला, जिथे कुंभाची प्रशासकीय तयारी, नागरी पायाभूत आराखडे आणि गर्दी व्यवस्थापनाचा आढावा घेण्यात आला (टाइम्स ऑफ इंडिया, २ नोव्हेंबर). टाइम्स ऑफ इंडियानुसार ३१ जणांच्या या पथकाचे नेतृत्व मुख्य आर्थिक सल्लागार **व्ही. अनंत नागेश्वरन** यांनी केले; कुंभमेळा आयुक्त शेखर सिंह यांनी आर्थिक सल्लागार **डॉ. अनुराधा गुरु**, **डॉ. रोझ मेरी के. अब्राहम** आणि संचालक **कोकिला जयराम** यांचे स्वागत केले. **तारखेत फरक:** फ्री प्रेस जर्नल आणि सरकारनामानुसार प्राधिकरणाची भेट **रविवारी, १ नोव्हेंबरला** झाली, तर टाइम्स ऑफ इंडिया **सोमवार** सांगतो. वृत्त; बैठकीतून कोणतीही घोषणा झाली नाही.

## तुमच्यासाठी याचा अर्थ

- तारखा व सूचनांसाठी **अधिकृत संकेतस्थळ बुकमार्क करा**, आणि "अधिकृत" पास, बुकिंग किंवा पॅकेजचा दावा करणारी कोणतीही गोष्ट त्याच्याशी पडताळून पाहा.
- **वाहनतळ आणि शटलची माहिती अजून तिथे नाही.** तोपर्यंत आमचा [ध्वजारोहण २०२६ हब](${HUB}) आणि या संकेतस्थळावरील मार्गदर्शक पाहा, आणि मोठ्या दिवसांपूर्वी अधिकृत सूचनांकडे लक्ष ठेवा.
- **कॅमेरे:** तुम्ही रामकुंड किंवा मिरवणूक मार्गांजवळ राहत असाल, तर या चाचणीमुळे गर्दी नियंत्रण कक्ष २०२७ च्या अमृतस्नानांच्या खूप आधीच आपल्या आराखड्यांचा सराव सुरू करेल.`,
  },
};

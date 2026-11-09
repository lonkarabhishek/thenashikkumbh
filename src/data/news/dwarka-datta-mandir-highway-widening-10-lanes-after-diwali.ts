import type { BlogArticle } from "@/data/blogData";

const TOI = "https://timesofindia.indiatimes.com/city/nashik/work-on-widening-nashik-pune-highways-dwarka-circle-datta-mandir-stretch-to-begin-after-diwali/articleshow/135548688.cms";
const WORKS = "/blog/kumbh-works-51-percent-done-march-2027-deadline-sadhugram-94-acres-godavari-bathing-quality-march";
const ASPHALT = "/blog/nmc-to-start-large-scale-kumbh-road-asphalting-after-diwali";
const REACH = "/how-to-reach";

export const article: BlogArticle = {
  id: 293,
  slug: "dwarka-circle-datta-mandir-nashik-pune-highway-widening-to-10-lanes-after-diwali-221-crore",
  title: {
    en: "Dwarka Circle to Datta Mandir: Rs 221 Crore Widening to 10 Lanes Set to Begin After Diwali, 40% by March 2027 (Reported)",
    hi: "द्वारका सर्कल से दत्त मंदिर: 221 करोड़ रुपये से 10 लेन चौड़ीकरण दिवाली के बाद शुरू होगा, मार्च 2027 तक 40% (रिपोर्ट)",
    mr: "द्वारका सर्कल ते दत्त मंदिर: २२१ कोटींचे १० पदरी रुंदीकरण दिवाळीनंतर सुरू होणार, मार्च २०२७ पर्यंत ४०% (वृत्त)",
  },
  date: "2026-11-09",
  originallyAnnounced: "2026-11-04",
  source: "Times of India",
  sources: [
    {
      title: "Work on widening Nashik-Pune highway's Dwarka Circle-Datta Mandir stretch to begin after Diwali",
      publisher: "Times of India",
      date: "2026-11-04",
      url: TOI,
      status: "reported",
    },
  ],
  category: "infra",
  image: "/images/og-image.jpg",
  photoId: 50,
  summary: {
    en: "REPORTED. Widening of the 6.4 km Dwarka Circle to Datta Mandir stretch of the Nashik-Pune highway is to begin right after Diwali, the Times of India reported on 4 November. The Rs 221 crore project, funded by NHAI and carried out by NMC, takes the road from about 25 m to about 45 m: six main lanes, two-lane service roads on each side and footpaths. NMC plans 40% by March 2027 and the rest before the first Amrit Snan on 2 August 2027. Expect diversions on this busy corridor.",
    hi: "रिपोर्ट। टाइम्स ऑफ इंडिया ने 4 नवंबर को लिखा कि नाशिक-पुणे राजमार्ग के 6.4 किमी द्वारका सर्कल से दत्त मंदिर हिस्से का चौड़ीकरण दिवाली के तुरंत बाद शुरू होगा। 221 करोड़ रुपये की परियोजना NHAI के पैसे से मनपा करेगी। सड़क करीब 25 मीटर से करीब 45 मीटर होगी: छह मुख्य लेन, दोनों ओर दो लेन की सर्विस रोड और फुटपाथ। मनपा मार्च 2027 तक 40% और बाकी 2 अगस्त 2027 के पहले अमृत स्नान से पहले पूरा करना चाहती है। इस व्यस्त मार्ग पर डायवर्ज़न की उम्मीद रखें।",
    mr: "वृत्त. टाइम्स ऑफ इंडियाने ४ नोव्हेंबरला दिले की नाशिक-पुणे महामार्गाच्या ६.४ किमी द्वारका सर्कल ते दत्त मंदिर टप्प्याचे रुंदीकरण दिवाळीनंतर लगेच सुरू होणार आहे. २२१ कोटींचा हा प्रकल्प NHAI च्या निधीतून महापालिका राबवणार आहे. रस्ता सुमारे २५ मीटरवरून सुमारे ४५ मीटर होईल: सहा मुख्य मार्गिका, दोन्ही बाजूंना दोन पदरी सेवा रस्ते आणि पदपथ. मार्च २०२७ पर्यंत ४०% आणि उर्वरित काम २ ऑगस्ट २०२७ च्या पहिल्या अमृत स्नानापूर्वी पूर्ण करण्याचे महापालिकेचे नियोजन आहे. या वर्दळीच्या मार्गावर वळवलेल्या वाहतुकीची तयारी ठेवा.",
  },
  content: {
    en: `**REPORTED.** This is from the Times of India of 4 November 2026. We have not seen an NMC or NHAI notice with a start date or traffic diversions.

Our [1 November post on Kumbh works](${WORKS}) said this stretch had not started even though its tender was done. TOI now reports that work will begin **immediately after Diwali**. As of 9 November we have not seen a report that work has actually started.

## The project

- **Stretch:** 6.4 km of the Nashik-Pune highway, from **Dwarka Circle to Datta Mandir**.
- **Cost:** about **Rs 221 crore**. NHAI pays. NMC builds. A contractor has been appointed.
- **Width:** from about **25 m to about 45 m**. TOI describes the result as a 10-lane road: a **six-lane main carriageway**, **two-lane service roads on both sides**, and **2.5 m footpaths**.
- **Timeline:** NMC plans to finish **40% by March 2027** and the rest before the first Amrit Snan on **2 August 2027**.

## Before work starts

NMC commissioner Manisha Khatri has told departments to shift water, sewer and electric utilities first and to clear encroachments. Deputy commissioner (encroachment) Suvarna Dakhane said a joint inspection is done and road markings are in place. About **15 to 20 unauthorised structures** are likely to be affected. Owners have been asked to remove them themselves, and demolition will follow if they do not.

## Why it matters

This corridor carries traffic to Pune, Shirdi and the Sinnar industrial belt, and it is a main way into Nashik from the south. Note that NMC's own target for this stretch runs past the general March 2027 deadline for Kumbh works, which our earlier posts reported. City road asphalting is also due to start after Diwali ([our 6 November post](${ASPHALT})).

If you drive into Nashik from Pune or Shirdi over the coming months, expect lane closures and diversions near Dwarka Circle, and check our [how to reach](${REACH}) page for travel planning.`,
    hi: `**रिपोर्ट।** यह 4 नवंबर 2026 के टाइम्स ऑफ इंडिया से है। आरंभ तिथि या डायवर्ज़न वाली मनपा या NHAI की कोई सूचना हमने नहीं देखी।

हमारी [1 नवंबर की कुंभ कामों वाली पोस्ट](${WORKS}) में लिखा था कि टेंडर होने के बावजूद यह हिस्सा शुरू नहीं हुआ। TOI अब बताता है कि काम **दिवाली के तुरंत बाद** शुरू होगा। 9 नवंबर तक हमें काम वास्तव में शुरू होने की कोई रिपोर्ट नहीं मिली।

## परियोजना

- **हिस्सा:** नाशिक-पुणे राजमार्ग का 6.4 किमी, **द्वारका सर्कल से दत्त मंदिर** तक।
- **लागत:** करीब **221 करोड़ रुपये**। पैसा NHAI देगा, काम मनपा करेगी। ठेकेदार नियुक्त हो चुका है।
- **चौड़ाई:** करीब **25 मीटर से करीब 45 मीटर**। TOI इसे 10 लेन की सड़क बताता है: **छह लेन की मुख्य सड़क**, **दोनों ओर दो लेन की सर्विस रोड**, और **2.5 मीटर के फुटपाथ**।
- **समय-सीमा:** मनपा की योजना **मार्च 2027 तक 40%** और बाकी **2 अगस्त 2027** के पहले अमृत स्नान से पहले पूरा करने की है।

## काम से पहले

मनपा आयुक्त मनीषा खत्री ने विभागों से पहले पानी, सीवर और बिजली की लाइनें हटाने और अतिक्रमण साफ़ करने को कहा है। उपायुक्त (अतिक्रमण) सुवर्णा दखणे ने कहा कि संयुक्त निरीक्षण हो चुका है और सड़क पर निशान लगाए गए हैं। करीब **15 से 20 अनधिकृत ढाँचे** प्रभावित हो सकते हैं। मालिकों से खुद हटाने को कहा गया है, वरना तोड़ने की कार्रवाई होगी।

## यह क्यों अहम है

यह मार्ग पुणे, शिर्डी और सिन्नर औद्योगिक क्षेत्र का यातायात ले जाता है, और दक्षिण से नाशिक आने का मुख्य रास्ता है। ध्यान दें कि इस हिस्से के लिए मनपा का अपना लक्ष्य कुंभ कामों की सामान्य मार्च 2027 समय-सीमा से आगे जाता है, जो हमारी पिछली पोस्टों में था। शहर की सड़कों का डामरीकरण भी दिवाली के बाद शुरू होना है ([हमारी 6 नवंबर की पोस्ट](${ASPHALT}))।

आने वाले महीनों में पुणे या शिर्डी से नाशिक गाड़ी से आ रहे हों, तो द्वारका सर्कल के पास लेन बंद होने और डायवर्ज़न की उम्मीद रखें, और यात्रा की योजना के लिए हमारा [कैसे पहुँचें](${REACH}) पेज देखें।`,
    mr: `**वृत्त.** हे ४ नोव्हेंबर २०२६ च्या टाइम्स ऑफ इंडियावर आधारित आहे. सुरुवातीची तारीख किंवा वाहतूक वळवण्याची महापालिका किंवा NHAI ची सूचना आम्ही पाहिलेली नाही.

आमच्या [१ नोव्हेंबरच्या कुंभ कामांच्या बातमीत](${WORKS}) निविदा होऊनही हा टप्पा सुरू झाला नसल्याचे होते. TOI आता सांगते की काम **दिवाळीनंतर लगेच** सुरू होईल. ९ नोव्हेंबरपर्यंत काम प्रत्यक्ष सुरू झाल्याचे वृत्त आम्हाला आढळले नाही.

## प्रकल्प

- **टप्पा:** नाशिक-पुणे महामार्गाचा ६.४ किमी, **द्वारका सर्कल ते दत्त मंदिर**.
- **खर्च:** सुमारे **२२१ कोटी रुपये**. निधी NHAI देणार, काम महापालिका करणार. ठेकेदार नियुक्त झाला आहे.
- **रुंदी:** सुमारे **२५ मीटरवरून सुमारे ४५ मीटर**. TOI याला १० पदरी रस्ता म्हणते: **सहा पदरी मुख्य रस्ता**, **दोन्ही बाजूंना दोन पदरी सेवा रस्ते**, आणि **२.५ मीटरचे पदपथ**.
- **कालमर्यादा:** **मार्च २०२७ पर्यंत ४०%** आणि उर्वरित काम **२ ऑगस्ट २०२७** च्या पहिल्या अमृत स्नानापूर्वी पूर्ण करण्याचे महापालिकेचे नियोजन आहे.

## काम सुरू होण्यापूर्वी

महापालिका आयुक्त मनीषा खत्री यांनी विभागांना आधी पाणी, मलनिस्सारण आणि वीज वाहिन्या हलवण्याचे आणि अतिक्रमणे हटवण्याचे निर्देश दिले आहेत. उपायुक्त (अतिक्रमण) सुवर्णा दखणे यांनी सांगितले की संयुक्त पाहणी झाली आहे आणि रस्त्यावर खुणा केल्या आहेत. सुमारे **१५ ते २० अनधिकृत बांधकामे** बाधित होऊ शकतात. मालकांना ती स्वतःहून हटवण्यास सांगितले आहे, अन्यथा पाडकाम होईल.

## हे का महत्त्वाचे

हा मार्ग पुणे, शिर्डी आणि सिन्नर औद्योगिक पट्ट्याकडील वाहतूक वाहतो, आणि दक्षिणेकडून नाशिकमध्ये येण्याचा मुख्य रस्ता आहे. लक्षात घ्या की या टप्प्यासाठी महापालिकेचे स्वतःचे लक्ष्य कुंभ कामांच्या सर्वसाधारण मार्च २०२७ मुदतीपलीकडे जाते, जी आमच्या आधीच्या बातम्यांत होती. शहरातील रस्त्यांचे डांबरीकरणही दिवाळीनंतर सुरू होणार आहे ([आमची ६ नोव्हेंबरची बातमी](${ASPHALT})).

येत्या काही महिन्यांत पुणे किंवा शिर्डीकडून नाशिकला गाडीने येत असाल तर द्वारका सर्कलजवळ मार्गिका बंद आणि वळवलेल्या वाहतुकीची तयारी ठेवा, आणि प्रवासाच्या नियोजनासाठी आमचे [कसे पोहोचाल](${REACH}) पान पाहा.`,
  },
};

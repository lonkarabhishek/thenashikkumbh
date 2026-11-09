import type { BlogArticle } from "@/data/blogData";

const TOI = "https://timesofindia.indiatimes.com/city/nashik/nmc-revises-water-demand-to-8280mcft-seeks-exemption-from-10-cut/articleshow/135583519.cms";
const SARKARNAMA = "https://sarkarnama.esakal.com/maharashtra/uttar-maharashtra/nashik-simhastha-kumbh-mela-2027-water-reservation-8280-mcm-additional-water-demand-municipal-commissioner-two-major-demands-gs97";
const EARLIER = "/blog/gangapur-release-for-eklahare-to-flow-past-ramkund-before-flag-hoisting-nmc-gets-6973-mcft-not-8005";
const FIRST = "/blog/nmc-seeks-8005-mcft-water-reservation-for-kumbh-2027";

export const article: BlogArticle = {
  id: 291,
  slug: "nmc-revises-water-demand-to-8280-mcft-635-mcft-for-kumbh-seeks-exemption-from-10-percent-cut",
  title: {
    en: "NMC Asks Again: Revised Water Demand of 8,280 MCFT, With 635 MCFT for the Kumbh and a Plea to Skip the 10% Cut (Reported)",
    hi: "मनपा ने फिर माँगा पानी: 8,280 एमसीएफटी की संशोधित माँग, कुंभ के लिए 635 एमसीएफटी और 10% कटौती से छूट की गुहार (रिपोर्ट)",
    mr: "महापालिकेची पुन्हा मागणी: ८,२८० दलघफू पाण्याचा सुधारित प्रस्ताव, कुंभासाठी ६३५ दलघफू आणि १०% कपातीतून सूट (वृत्त)",
  },
  date: "2026-11-09",
  originallyAnnounced: "2026-11-05",
  source: "Times of India, Sarkarnama",
  sources: [
    {
      title: "NMC revises water demand to 8,280mcft, seeks exemption from 10% cut",
      publisher: "Times of India",
      date: "2026-11-05",
      url: TOI,
      status: "reported",
    },
    {
      title: "Nashik Kumbh Mela water reservation: commissioner seeks extra water for Nashik",
      publisher: "Sarkarnama (Sakal group)",
      date: "2026-11-06",
      url: SARKARNAMA,
      status: "reported",
    },
  ],
  category: "infra",
  image: "/images/og-image.jpg",
  photoId: 49,
  summary: {
    en: "REPORTED. A week after the district committee gave Nashik Municipal Corporation 6,973 MCFT and turned down its Kumbh request, NMC sent a revised proposal on 5 November for 8,280 MCFT: 7,645 MCFT for the city's regular supply and 635 MCFT for the Kumbh, the Times of India and Sarkarnama report. NMC also wants Nashik exempted from the state's 10% cut in water reservations. The district committee has not yet decided.",
    hi: "रिपोर्ट। ज़िला समिति ने नाशिक मनपा को 6,973 एमसीएफटी दिया था और कुंभ की माँग नहीं मानी थी। एक हफ़्ते बाद मनपा ने 5 नवंबर को 8,280 एमसीएफटी का संशोधित प्रस्ताव भेजा: शहर की नियमित आपूर्ति के लिए 7,645 और कुंभ के लिए 635 एमसीएफटी, टाइम्स ऑफ इंडिया और सरकारनामा के अनुसार। मनपा चाहती है कि नाशिक को राज्य की 10% आरक्षण कटौती से छूट मिले। ज़िला समिति का फ़ैसला अभी नहीं आया।",
    mr: "वृत्त. जिल्हा समितीने नाशिक महापालिकेला ६,९७३ दलघफू दिले आणि कुंभाची मागणी फेटाळली होती. आठवड्याभराने महापालिकेने ५ नोव्हेंबरला ८,२८० दलघफूचा सुधारित प्रस्ताव पाठवला: शहराच्या नियमित पुरवठ्यासाठी ७,६४५ आणि कुंभासाठी ६३५ दलघफू, असे टाइम्स ऑफ इंडिया आणि सरकारनामाने दिले. राज्याच्या १०% पाणी आरक्षण कपातीतून नाशिकला सूट मिळावी, अशीही मागणी आहे. जिल्हा समितीचा निर्णय अजून आलेला नाही.",
  },
  content: {
    en: `**REPORTED.** This is from the Times of India (5 November 2026) and Sarkarnama (6 November). We have not seen NMC's letter or any reply from the district administration.

## What happened before

On 29 October the district water reservation committee, chaired by guardian minister Girish Mahajan, reserved **6,973 MCFT** for the Nashik Municipal Corporation and did not accept the extra Kumbh demand. Our [30 October post](${EARLIER}) covered that decision. TOI says Mahajan asked NMC to reassess its needs and send a fresh proposal.

## The revised proposal (sent 5 November)

- **Total: 8,280 MCFT**, for 15 October 2026 to 31 August 2027 (Sarkarnama).
- **7,645 MCFT** for the city's regular drinking water.
- **635 MCFT** for the Kumbh, for Sadhugram and visiting pilgrims during the July to August 2027 period.
- **By dam** (Sarkarnama's split): Gangapur dam group 5,780 MCFT (5,715 city plus 65 Kumbh), Mukane dam 2,270 MCFT (1,700 city plus 570 Kumbh), and 230 MCFT from Darna through the Chehedi weir.
- NMC asks that Nashik be **exempted from the state's 10% cut** in water reservations because of the Kumbh.

NMC expects use to rise by about 10% if drought pushes people from rural areas into the city. Sarkarnama says the proposal also asks for 275 MCFT more for this. It is not clear from either report whether that 275 is inside the 8,280 figure.

## Small differences between the reports

TOI lists the 2,270 MCFT from Mukane as being for regular supply. Sarkarnama splits it into 1,700 for the city and 570 for the Kumbh. Both give the same totals: 8,280, 7,645 and 635. Our [first post on this](${FIRST}) had NMC's October demand as 8,005 MCFT. TOI now calls the earlier demand 8,000.

## Pipeline work

Sarkarnama also reports that a new 1,800 mm gravity main from Gangapur dam to the Bara Bungalow water treatment plant has been laid, and NMC plans to test it and bring it into use by the **end of November**. Capacity upgrades at the Bara Bungalow and Panchavati treatment plants are said to be in the final stage.

## What to watch

The district committee has to decide on the revised demand. At the 29 October meeting Mahajan suggested a one-day-a-week cut in city supply and warned of hard choices in summer (TOI). Nashik residents should watch for an NMC notice before assuming any cut or extra supply.`,
    hi: `**रिपोर्ट।** यह टाइम्स ऑफ इंडिया (5 नवंबर 2026) और सरकारनामा (6 नवंबर) से है। मनपा का पत्र या ज़िला प्रशासन का कोई जवाब हमने नहीं देखा।

## पहले क्या हुआ

29 अक्टूबर को अभिभावक मंत्री गिरीश महाजन की अध्यक्षता वाली ज़िला जल आरक्षण समिति ने नाशिक मनपा के लिए **6,973 एमसीएफटी** आरक्षित किया और कुंभ की अतिरिक्त माँग नहीं मानी। हमारी [30 अक्टूबर की पोस्ट](${EARLIER}) में वह फ़ैसला है। TOI के अनुसार महाजन ने मनपा से ज़रूरत दोबारा आँककर नया प्रस्ताव भेजने को कहा।

## संशोधित प्रस्ताव (5 नवंबर को भेजा)

- **कुल: 8,280 एमसीएफटी**, 15 अक्टूबर 2026 से 31 अगस्त 2027 के लिए (सरकारनामा)।
- शहर की नियमित पेयजल आपूर्ति के लिए **7,645 एमसीएफटी**।
- कुंभ के लिए **635 एमसीएफटी**, जुलाई से अगस्त 2027 के दौरान साधुग्राम और आने वाले श्रद्धालुओं के लिए।
- **बाँध के हिसाब से** (सरकारनामा): गंगापुर बाँध समूह 5,780 (शहर 5,715 और कुंभ 65), मुकणे बाँध 2,270 (शहर 1,700 और कुंभ 570), और दारणा से चेहेडी बंधारे के ज़रिए 230 एमसीएफटी।
- मनपा चाहती है कि कुंभ के कारण नाशिक को राज्य की **10% आरक्षण कटौती से छूट** मिले।

मनपा का अनुमान है कि सूखे के कारण ग्रामीण इलाकों से लोग शहर आए तो खपत करीब 10% बढ़ सकती है। सरकारनामा के अनुसार प्रस्ताव में इसके लिए 275 एमसीएफटी और माँगा गया है। दोनों रिपोर्टों से साफ़ नहीं कि यह 275 कुल 8,280 के भीतर है या नहीं।

## रिपोर्टों में छोटे अंतर

TOI मुकणे के 2,270 एमसीएफटी को नियमित आपूर्ति के लिए बताता है। सरकारनामा इसे शहर के 1,700 और कुंभ के 570 में बाँटता है। कुल आँकड़े दोनों में वही हैं: 8,280, 7,645 और 635। हमारी [इस पर पहली पोस्ट](${FIRST}) में मनपा की अक्टूबर की माँग 8,005 एमसीएफटी थी। TOI अब पहले की माँग 8,000 बताता है।

## पाइपलाइन का काम

सरकारनामा के अनुसार गंगापुर बाँध से बारा बंगला जल शोधन केंद्र तक 1,800 मिमी की नई गुरुत्व पाइपलाइन बिछ चुकी है, और मनपा **नवंबर के अंत** तक इसका परीक्षण कर इसे चालू करने की योजना में है। बारा बंगला और पंचवटी शोधन केंद्रों की क्षमता बढ़ाने का काम अंतिम चरण में बताया गया है।

## आगे क्या देखें

संशोधित माँग पर ज़िला समिति को फ़ैसला करना है। 29 अक्टूबर की बैठक में महाजन ने शहर की आपूर्ति में हफ़्ते में एक दिन कटौती का सुझाव दिया था और गर्मी में कठिन फ़ैसलों की चेतावनी दी थी (TOI)। किसी कटौती या अतिरिक्त आपूर्ति को मानने से पहले नाशिक के निवासी मनपा की सूचना देखें।`,
    mr: `**वृत्त.** हे टाइम्स ऑफ इंडिया (५ नोव्हेंबर २०२६) आणि सरकारनामा (६ नोव्हेंबर) यांच्यावर आधारित आहे. महापालिकेचे पत्र किंवा जिल्हा प्रशासनाचे उत्तर आम्ही पाहिलेले नाही.

## आधी काय झाले

२९ ऑक्टोबरला पालकमंत्री गिरीश महाजन यांच्या अध्यक्षतेखालील जिल्हा पाणी आरक्षण समितीने नाशिक महापालिकेसाठी **६,९७३ दलघफू** आरक्षित केले आणि कुंभाची जादा मागणी मान्य केली नाही. आमच्या [३० ऑक्टोबरच्या बातमीत](${EARLIER}) तो निर्णय आहे. TOI नुसार महाजन यांनी महापालिकेला गरजेचा फेरआढावा घेऊन नवा प्रस्ताव पाठवण्यास सांगितले.

## सुधारित प्रस्ताव (५ नोव्हेंबरला पाठवला)

- **एकूण: ८,२८० दलघफू**, १५ ऑक्टोबर २०२६ ते ३१ ऑगस्ट २०२७ या कालावधीसाठी (सरकारनामा).
- शहराच्या नियमित पिण्याच्या पाण्यासाठी **७,६४५ दलघफू**.
- कुंभासाठी **६३५ दलघफू**, जुलै ते ऑगस्ट २०२७ दरम्यान साधुग्राम आणि येणाऱ्या भाविकांसाठी.
- **धरणनिहाय** (सरकारनामा): गंगापूर धरण समूह ५,७८० (शहर ५,७१५ आणि कुंभ ६५), मुकणे धरण २,२७० (शहर १,७०० आणि कुंभ ५७०), आणि दारणातून चेहेडी बंधाऱ्याद्वारे २३० दलघफू.
- कुंभामुळे नाशिकला राज्याच्या **१०% आरक्षण कपातीतून सूट** मिळावी, अशी मागणी.

दुष्काळामुळे ग्रामीण भागातून लोक शहरात आले तर वापर सुमारे १०% वाढू शकतो, असा महापालिकेचा अंदाज आहे. सरकारनामानुसार प्रस्तावात यासाठी आणखी २७५ दलघफू मागितले आहे. हे २७५ एकूण ८,२८० मध्ये आहे की नाही, ते दोन्ही वृत्तांतून स्पष्ट होत नाही.

## वृत्तांतील छोटे फरक

TOI मुकणेचे २,२७० दलघफू नियमित पुरवठ्यासाठी असल्याचे देते. सरकारनामा त्याचे शहरासाठी १,७०० आणि कुंभासाठी ५७० असे विभाजन करते. एकूण आकडे दोन्हीत तेच आहेत: ८,२८०, ७,६४५ आणि ६३५. आमच्या [याबाबतच्या पहिल्या बातमीत](${FIRST}) महापालिकेची ऑक्टोबरची मागणी ८,००५ दलघफू होती. TOI आता आधीची मागणी ८,००० असे देते.

## जलवाहिनीचे काम

सरकारनामानुसार गंगापूर धरणापासून बारा बंगला जलशुद्धीकरण केंद्रापर्यंत १,८०० मिमी व्यासाची नवी गुरुत्ववाहिनी टाकून झाली आहे, आणि **नोव्हेंबरअखेर** तिची चाचणी घेऊन ती वापरात आणण्याचे महापालिकेचे नियोजन आहे. बारा बंगला आणि पंचवटी जलशुद्धीकरण केंद्रांची क्षमता वाढवण्याचे काम अंतिम टप्प्यात असल्याचे सांगितले आहे.

## पुढे काय पाहावे

सुधारित मागणीवर जिल्हा समितीला निर्णय घ्यायचा आहे. २९ ऑक्टोबरच्या बैठकीत महाजन यांनी शहराच्या पुरवठ्यात आठवड्यातून एक दिवस कपातीची सूचना केली होती आणि उन्हाळ्यात कठोर निर्णयांचा इशारा दिला होता (TOI). कोणतीही कपात किंवा जादा पुरवठा गृहीत धरण्यापूर्वी नाशिककरांनी महापालिकेची सूचना पाहावी.`,
  },
};

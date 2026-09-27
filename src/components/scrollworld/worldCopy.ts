import type { Locale } from "@/i18n/translations";

type L10n = Record<Locale, string>;

export interface WorldFact {
  label: L10n;
  value: L10n;
}

export interface SceneCopy {
  eyebrow: L10n;
  title: L10n;
  body: L10n;
  /** Revealed one at a time as the camera moves deeper into the scene. */
  facts: WorldFact[];
}

export const worldCopy: SceneCopy[] = [
  {
    eyebrow: { en: "Brahmagiri · the source", hi: "ब्रह्मगिरि · उद्गम", mr: "ब्रह्मगिरी · उगम" },
    title: {
      en: "It starts as a spring you could cover with both hands",
      hi: "आरंभ एक ऐसे स्रोत से, जिसे दोनों हथेलियों से ढका जा सके",
      mr: "सुरुवात अशा झऱ्यातून, जो दोन्ही तळहातांनी झाकता येईल",
    },
    body: {
      en: "The hill is not treated as Shiva's home but as Shiva himself, which is why climbing it was long thought improper, and why the steps are relatively recent. At the summit water surfaces and divides three ways.",
      hi: "इस पर्वत को शिव का निवास नहीं, स्वयं शिव माना जाता है, इसीलिए उस पर चढ़ना लंबे समय तक अनुचित समझा गया, और सीढ़ियाँ अपेक्षाकृत हाल की हैं। शिखर पर जल फूटता है और तीन दिशाओं में बँट जाता है।",
      mr: "या डोंगराला शिवाचे घर नव्हे तर स्वतः शिव मानतात, म्हणूनच त्यावर चढणे बराच काळ अनुचित समजले जाई, आणि पायऱ्या तुलनेने अलीकडच्या आहेत. शिखरावर पाणी उमलते आणि तीन दिशांना विभागते.",
    },
    facts: [
      {
        label: { en: "Height", hi: "ऊँचाई", mr: "उंची" },
        value: { en: "about 1,300 m", hi: "लगभग 1,300 मी", mr: "सुमारे १,३०० मी" },
      },
      {
        label: { en: "Steps to the top", hi: "शिखर तक सीढ़ियाँ", mr: "शिखरापर्यंत पायऱ्या" },
        value: { en: "about 500", hi: "लगभग 500", mr: "सुमारे ५००" },
      },
      {
        label: { en: "Rivers born here", hi: "यहाँ जन्मी नदियाँ", mr: "इथे जन्मलेल्या नद्या" },
        value: {
          en: "three, only one is the Godavari",
          hi: "तीन, उनमें एक ही गोदावरी",
          mr: "तीन, त्यातली एकच गोदावरी",
        },
      },
    ],
  },
  {
    eyebrow: {
      en: "Trimbakeshwar · the temple",
      hi: "त्र्यंबकेश्वर · मंदिर",
      mr: "त्र्यंबकेश्वर · मंदिर",
    },
    title: {
      en: "One of twelve Jyotirlingas, and it is three thumbs of stone",
      hi: "बारह ज्योतिर्लिंगों में एक: और वह तीन अंगूठे भर पत्थर",
      mr: "बारा ज्योतिर्लिंगांपैकी एक: आणि तो तीन अंगठ्यांएवढा दगड",
    },
    body: {
      en: "Not a pillar you look up at. A hollow you look down into, where Brahma, Vishnu and Shiva sit worn smooth by centuries of water and milk. Custom is strict: you bathe at Kushavarta first, then you go in.",
      hi: "ऊपर देखने वाला स्तंभ नहीं। नीचे झाँकने वाला गड्ढा, जहाँ ब्रह्मा, विष्णु और महेश सदियों के जल-दूध से घिसकर बैठे हैं। परंपरा कठोर है: पहले कुशावर्त में स्नान, फिर भीतर।",
      mr: "वर पाहायचा स्तंभ नाही. खाली डोकावायची खोलगट जागा, जिथे ब्रह्मा, विष्णू आणि महेश शतकांच्या पाण्या-दुधाने झिजून बसले आहेत. प्रथा कडक आहे: आधी कुशावर्तात स्नान, मग आत.",
    },
    facts: [
      {
        label: { en: "Present temple", hi: "वर्तमान मंदिर", mr: "सध्याचे मंदिर" },
        value: {
          en: "c. 1755, Peshwa Balaji Bajirao",
          hi: "लगभग 1755, पेशवा बालाजी बाजीराव",
          mr: "सुमारे १७५५, पेशवा बाळाजी बाजीराव",
        },
      },
      {
        label: { en: "Took", hi: "निर्माण काल", mr: "बांधकाम काळ" },
        value: { en: "31 years to build", hi: "बनने में 31 वर्ष", mr: "बांधायला ३१ वर्षे" },
      },
      {
        label: { en: "Shaivite Shahi Snan", hi: "शैव शाही स्नान", mr: "शैव शाही स्नान" },
        value: {
          en: "happens here, not at Nashik",
          hi: "यहीं होता है, नाशिक में नहीं",
          mr: "इथेच होते, नाशिकला नाही",
        },
      },
    ],
  },
  {
    eyebrow: { en: "Panchavati · the ghats", hi: "पंचवटी · घाट", mr: "पंचवटी · घाट" },
    title: {
      en: "Thirty kilometres downstream, the river meets the city",
      hi: "तीस किलोमीटर आगे, नदी नगर से मिलती है",
      mr: "तीस किलोमीटर पुढे, नदी शहराला भेटते",
    },
    body: {
      en: "The kund where Rama is said to have offered water to his dead father. A Shiva temple with no bull at its door. And a black stone Rama whose gate stayed shut in 1930 while fifteen thousand people asked to be let in.",
      hi: "वह कुंड जहाँ राम ने अपने दिवंगत पिता को जल दिया। वह शिव मंदिर जिसके द्वार पर नंदी नहीं। और काले पत्थर के वे राम, जिनका द्वार 1930 में बंद रहा जब पंद्रह हज़ार लोग भीतर आने की माँग कर रहे थे।",
      mr: "ज्या कुंडात रामाने आपल्या दिवंगत पित्याला जल अर्पण केले ते. ज्याच्या दारात नंदी नाही ते शिवमंदिर. आणि काळ्या दगडातील ते राम, ज्यांचे दार १९३० मध्ये बंद राहिले, जेव्हा पंधरा हजार माणसे आत येऊ देण्याची मागणी करत होती.",
    },
    facts: [
      {
        label: { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
        value: {
          en: "where ash is said to dissolve",
          hi: "जहाँ अस्थि विलीन होती है",
          mr: "जिथे अस्थी विरघळते",
        },
      },
      {
        label: { en: "Kalaram Mandir", hi: "काळाराम मंदिर", mr: "काळाराम मंदिर" },
        value: { en: "1792 · 84 pillars", hi: "1792 · 84 स्तंभ", mr: "१७९२ · ८४ खांब" },
      },
      {
        label: { en: "On a Shahi Snan morning", hi: "शाही स्नान की सुबह", mr: "शाही स्नानाच्या सकाळी" },
        value: {
          en: "about 1 lakh people an hour",
          hi: "लगभग 1 लाख लोग प्रति घंटा",
          mr: "सुमारे १ लाख माणसे दर तासाला",
        },
      },
    ],
  },
  {
    eyebrow: { en: "Sadhugram · the tent city", hi: "साधुग्राम · तंबू नगर", mr: "साधुग्राम · तंबूंचे शहर" },
    title: {
      en: "A city goes up beside it, built to be taken down",
      hi: "उसके पास एक नगर उठता है, जो उखाड़ने के लिए बना है",
      mr: "त्याच्या शेजारी एक शहर उभे राहते, उखडण्यासाठीच बांधलेले",
    },
    body: {
      en: "Roads cut, water piped, power run, drains laid, hospitals and fire posts staffed, one of the largest temporary settlements human beings build anywhere. Whatever you believe, notice the engineering.",
      hi: "सड़कें, पानी की पाइप, बिजली, नालियाँ, अस्पताल और अग्निशमन चौकियाँ, मनुष्य द्वारा कहीं भी बनाई जाने वाली सबसे बड़ी अस्थायी बस्तियों में से एक। आप जो भी मानते हों, इस अभियांत्रिकी को देखिए।",
      mr: "रस्ते, पाण्याच्या वाहिन्या, वीज, नाले, रुग्णालये आणि अग्निशमन चौक्या, माणसाने कुठेही उभारलेल्या सर्वात मोठ्या तात्पुरत्या वस्त्यांपैकी एक. तुमची श्रद्धा काहीही असो, ही अभियांत्रिकी पाहा.",
    },
    facts: [
      {
        label: { en: "Built in", hi: "निर्माण", mr: "उभारणी" },
        value: { en: "a matter of weeks", hi: "कुछ ही सप्ताहों में", mr: "काही आठवड्यांत" },
      },
      {
        label: { en: "Serves", hi: "आबादी", mr: "लोकसंख्या" },
        value: {
          en: "a district-sized population",
          hi: "एक ज़िले जितनी आबादी",
          mr: "एका जिल्ह्याएवढी लोकसंख्या",
        },
      },
      {
        label: { en: "Afterwards", hi: "उसके बाद", mr: "त्यानंतर" },
        value: {
          en: "lifted; the ground returns to floodplain",
          hi: "सब हटा दिया जाता है; भूमि फिर नदी का पाट",
          mr: "सर्व उचलले जाते; जमीन पुन्हा नदीचे पात्र",
        },
      },
    ],
  },
  {
    eyebrow: { en: "Shahi Snan · before dawn", hi: "शाही स्नान · भोर से पहले", mr: "शाही स्नान · पहाटेआधी" },
    title: {
      en: "Once in twelve years, all of it arrives at once",
      hi: "हर बारह वर्ष में एक बार, सब कुछ एक साथ आता है",
      mr: "दर बारा वर्षांनी एकदा, सर्व काही एकदम येते",
    },
    body: {
      en: "The akhadas go down to the water first, in an order agreed centuries ago and taken extremely seriously. Then everyone else. Know your way out before you go in, and agree a meeting point that is a place, not a person.",
      hi: "पहले अखाड़े जल तक जाते हैं, सदियों पहले तय क्रम में, जिसे अत्यंत गंभीरता से लिया जाता है। फिर बाकी सब। भीतर जाने से पहले निकास जान लें, और मिलने की जगह तय करें, कोई व्यक्ति नहीं, कोई स्थान।",
      mr: "आधी आखाडे पाण्यापर्यंत जातात, शतकांपूर्वी ठरलेल्या आणि अत्यंत गांभीर्याने घेतल्या जाणाऱ्या क्रमाने. मग बाकी सगळे. आत जाण्यापूर्वी बाहेर पडण्याचा मार्ग माहीत करा, आणि भेटण्याची जागा ठरवा, कोणी माणूस नव्हे, एखादे ठिकाण.",
    },
    facts: [
      {
        label: { en: "Recognised akhadas", hi: "मान्यता प्राप्त अखाड़े", mr: "मान्यताप्राप्त आखाडे" },
        value: {
          en: "13, Juna is the largest",
          hi: "13, जूना सबसे बड़ा",
          mr: "१३, जुना सर्वात मोठा",
        },
      },
      {
        label: { en: "First Amrit Snan", hi: "प्रथम अमृत स्नान", mr: "पहिले अमृत स्नान" },
        value: { en: "2 August 2027", hi: "2 अगस्त 2027", mr: "२ ऑगस्ट २०२७" },
      },
      {
        label: { en: "Returns", hi: "पुनरागमन", mr: "पुनरागमन" },
        value: { en: "every twelve years", hi: "हर बारह वर्ष में", mr: "दर बारा वर्षांनी" },
      },
    ],
  },
];

export const worldUI = {
  hint: { en: "scroll to fly in", hi: "उड़ान के लिए स्क्रॉल करें", mr: "उड्डाणासाठी स्क्रोल करा" },
  walks: { en: "Walk it yourself", hi: "स्वयं चलकर देखें", mr: "स्वतः चालून पाहा" },
  dates: { en: "Sacred dates", hi: "पवित्र तिथियाँ", mr: "पवित्र तिथी" },
  of: { en: "of", hi: "में से", mr: "पैकी" },
} satisfies Record<string, L10n>;

"use client";

import Link from "@/components/LocaleLink";
import { useState, useEffect } from "react";
import {
  Train,
  Plane,
  Car,
  Hotel,
  Tent,
  Home,
  Building2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  CloudRain,
  Phone,
  Stethoscope,
  Smartphone,
  Wallet,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import CommonsPhoto from "@/components/photos/CommonsPhoto";

/* ───────────────────────────── data ───────────────────────────── */

const quickNavItems = [
  { labelKey: translations.guidePage.navHowToReach, href: "#how-to-reach" },
  { labelKey: translations.guidePage.navAccommodation, href: "#accommodation" },
  { labelKey: translations.guidePage.navWhatToCarry, href: "#what-to-carry" },
  { labelKey: translations.guidePage.navDosAndDonts, href: "#dos-and-donts" },
  { labelKey: translations.guidePage.navEssentialTips, href: "#essential-tips" },
];

type T = { en: string; hi: string; mr: string };

const transportModes: {
  Icon: typeof Train;
  titleKey: T;
  descKey: T;
  details: T[];
  tip: T;
}[] = [
  {
    Icon: Train,
    titleKey: translations.guidePage.byTrain,
    descKey: translations.guidePage.byTrainDesc,
    details: [
      {
        en: "Five stations are being developed for the Simhastha: Nashik Road, Devlali, Odha, Kherwadi and Kasbe Sukene (PIB, July 2025).",
        hi: "सिंहस्थ के लिए पाँच स्टेशन विकसित किए जा रहे हैं: नाशिक रोड, देवलाली, ओढा, खेरवाडी और कसबे सुकेणे (PIB, जुलाई 2025)।",
        mr: "सिंहस्थासाठी पाच स्थानके विकसित केली जात आहेत: नाशिक रोड, देवळाली, ओढा, खेरवाडी आणि कसबे सुकेणे (PIB, जुलै २०२५).",
      },
      {
        en: "Mumbai CSMT to Nashik Road: Panchvati Express, Godavari Express (about 3.5 hours)",
        hi: "मुंबई CSMT से नाशिक रोड: पंचवटी एक्सप्रेस, गोदावरी एक्सप्रेस (लगभग 3.5 घंटे)",
        mr: "मुंबई CSMT ते नाशिक रोड: पंचवटी एक्सप्रेस, गोदावरी एक्सप्रेस (सुमारे साडेतीन तास)",
      },
      {
        en: "Pune to Nashik Road: several daily trains (about 4.5 hours)",
        hi: "पुणे से नाशिक रोड: रोज़ कई ट्रेनें (लगभग 4.5 घंटे)",
        mr: "पुणे ते नाशिक रोड: दररोज अनेक गाड्या (सुमारे साडेचार तास)",
      },
      {
        en: "Special trains are planned from Kamakhya, Howrah, Patna, Delhi, Jaipur, Bikaner, Mumbai, Pune, Nagpur and Nanded, plus a circuit train for three Jyotirlingas (PIB).",
        hi: "कामाख्या, हावड़ा, पटना, दिल्ली, जयपुर, बीकानेर, मुंबई, पुणे, नागपुर और नांदेड़ से विशेष ट्रेनें और तीन ज्योतिर्लिंगों के लिए सर्किट ट्रेन प्रस्तावित हैं (PIB)।",
        mr: "कामाख्या, हावडा, पाटणा, दिल्ली, जयपूर, बिकानेर, मुंबई, पुणे, नागपूर आणि नांदेडहून विशेष गाड्या आणि तीन ज्योतिर्लिंगांसाठी सर्किट गाडी नियोजित आहे (PIB).",
      },
    ],
    tip: {
      en: "The 2027 special-train timetable has not been published yet. Book as soon as it is out, and expect very high demand.",
      hi: "2027 की विशेष ट्रेनों की समय-सारणी अभी घोषित नहीं हुई है। घोषित होते ही बुक करें, माँग बहुत अधिक रहेगी।",
      mr: "२०२७ च्या विशेष गाड्यांचे वेळापत्रक अजून जाहीर झालेले नाही. जाहीर होताच बुकिंग करा, मागणी खूप जास्त असेल.",
    },
  },
  {
    Icon: Plane,
    titleKey: translations.guidePage.byAir,
    descKey: translations.guidePage.byAirDesc,
    details: [
      {
        en: "Nashik airport (Ozar, at Janori): flights to Delhi, Ahmedabad, Hyderabad and Bengaluru, with night operations",
        hi: "नाशिक हवाई अड्डा (ओझर, जानोरी): दिल्ली, अहमदाबाद, हैदराबाद और बेंगलुरु के लिए उड़ानें, रात की उड़ानों के साथ",
        mr: "नाशिक विमानतळ (ओझर, जानोरी): दिल्ली, अहमदाबाद, हैदराबाद आणि बेंगळुरूसाठी विमाने, रात्रीच्या उड्डाणांसह",
      },
      {
        en: "A new, bigger terminal is due by 31 March 2027 (TOI, Aug 2026)",
        hi: "नया और बड़ा टर्मिनल 31 मार्च 2027 तक तैयार होना है (TOI, अगस्त 2026)",
        mr: "नवे, मोठे टर्मिनल ३१ मार्च २०२७ पर्यंत तयार होणार आहे (TOI, ऑगस्ट २०२६)",
      },
      {
        en: "Mumbai airport (BOM): about 170 km, with wide domestic and international links",
        hi: "मुंबई हवाई अड्डा (BOM): लगभग 170 किमी, देश-विदेश से अच्छी कनेक्टिविटी",
        mr: "मुंबई विमानतळ (BOM): सुमारे १७० किमी, देश-विदेशाशी चांगली जोडणी",
      },
      {
        en: "Pune airport (PNQ): about 210 km, good domestic links",
        hi: "पुणे हवाई अड्डा (PNQ): लगभग 210 किमी, घरेलू उड़ानों के लिए अच्छा",
        mr: "पुणे विमानतळ (PNQ): सुमारे २१० किमी, देशांतर्गत उड्डाणांसाठी चांगले",
      },
    ],
    tip: {
      en: "From Mumbai airport, pre-book a cab or take a bus to Nashik (about 3 to 4 hours).",
      hi: "मुंबई हवाई अड्डे से पहले से कैब बुक करें या नाशिक के लिए बस लें (लगभग 3 से 4 घंटे)।",
      mr: "मुंबई विमानतळावरून आधीच कॅब बुक करा किंवा नाशिकसाठी बस घ्या (सुमारे ३ ते ४ तास).",
    },
  },
  {
    Icon: Car,
    titleKey: translations.guidePage.byRoad,
    descKey: translations.guidePage.byRoadDesc,
    details: [
      {
        en: "Mumbai to Nashik by the Mumbai–Agra highway: about 170 km (3 to 4 hours by car)",
        hi: "मुंबई से नाशिक, मुंबई–आगरा हाईवे से: लगभग 170 किमी (कार से 3 से 4 घंटे)",
        mr: "मुंबई ते नाशिक, मुंबई–आग्रा महामार्गाने: सुमारे १७० किमी (कारने ३ ते ४ तास)",
      },
      {
        en: "Pune to Nashik by the Pune–Nashik highway: about 210 km (4 to 5 hours)",
        hi: "पुणे से नाशिक, पुणे–नाशिक हाईवे से: लगभग 210 किमी (4 से 5 घंटे)",
        mr: "पुणे ते नाशिक, पुणे–नाशिक महामार्गाने: सुमारे २१० किमी (४ ते ५ तास)",
      },
      {
        en: "MSRTC and private coaches run often from Mumbai and Pune",
        hi: "मुंबई और पुणे से MSRTC और निजी बसें अक्सर चलती हैं",
        mr: "मुंबई आणि पुण्याहून MSRTC व खासगी बसेस वारंवार धावतात",
      },
    ],
    tip: {
      en: "On Amrit Snan days private cars stop at 46 outer parking hubs, and MSRTC shuttle buses (4,500 in the plan) take you onward (NTKMA, June 2026).",
      hi: "अमृत स्नान के दिनों में निजी गाड़ियाँ 46 बाहरी पार्किंग हब पर रुकेंगी, और आगे MSRTC की शटल बसें (योजना में 4,500) ले जाएँगी (NTKMA, जून 2026)।",
      mr: "अमृत स्नानाच्या दिवशी खासगी गाड्या ४६ बाहेरील पार्किंग हबवर थांबतील, आणि पुढे MSRTC च्या शटल बसेस (योजनेत ४,५००) नेतील (NTKMA, जून २०२६).",
    },
  },
];

const accommodationTypes: { Icon: typeof Hotel; titleKey: T; description: T; note: T; tip: T }[] = [
  {
    Icon: Hotel,
    titleKey: translations.guidePage.hotels,
    description: {
      en: "Nashik has hotels from budget to luxury. Areas like College Road, Panchavati and Trimbak Road are close to the ghats.",
      hi: "नाशिक में सस्ते से लेकर महँगे तक होटल हैं। कॉलेज रोड, पंचवटी और त्र्यंबक रोड घाटों के पास हैं।",
      mr: "नाशिकमध्ये स्वस्तापासून आलिशानपर्यंत हॉटेल्स आहेत. कॉलेज रोड, पंचवटी आणि त्र्यंबक रोड घाटांजवळ आहेत.",
    },
    note: {
      en: "About 1,500+ hotel beds, which NTKMA says is not enough",
      hi: "लगभग 1,500 से अधिक होटल बेड, जो NTKMA के अनुसार पर्याप्त नहीं",
      mr: "सुमारे १,५०० पेक्षा जास्त हॉटेल बेड, जे NTKMA नुसार पुरेसे नाहीत",
    },
    tip: {
      en: "Book early. No official price list exists.",
      hi: "जल्दी बुक करें। कोई आधिकारिक मूल्य सूची नहीं है।",
      mr: "लवकर बुकिंग करा. कोणतीही अधिकृत दरसूची नाही.",
    },
  },
  {
    Icon: Home,
    titleKey: translations.guidePage.dharamshalas,
    description: {
      en: "Temple trusts and religious groups run dharamshalas (pilgrim rest houses) with simple rooms.",
      hi: "मंदिर ट्रस्ट और धार्मिक संस्थाएँ सादे कमरों वाली धर्मशालाएँ चलाती हैं।",
      mr: "मंदिर ट्रस्ट आणि धार्मिक संस्था साध्या खोल्या असलेल्या धर्मशाळा चालवतात.",
    },
    note: {
      en: "100+ dharamshalas across Nashik and Trimbak (NTKMA)",
      hi: "नाशिक और त्र्यंबक में 100 से अधिक धर्मशालाएँ (NTKMA)",
      mr: "नाशिक आणि त्र्यंबकमध्ये १०० पेक्षा जास्त धर्मशाळा (NTKMA)",
    },
    tip: {
      en: "Contact the trust office in advance.",
      hi: "पहले से ट्रस्ट कार्यालय से संपर्क करें।",
      mr: "आधीच ट्रस्ट कार्यालयाशी संपर्क करा.",
    },
  },
  {
    Icon: Building2,
    titleKey: translations.guidePage.ashrams,
    description: {
      en: "Some ashrams in and around Nashik host pilgrims during the Kumbh.",
      hi: "नाशिक और आसपास के कुछ आश्रम कुंभ के दौरान श्रद्धालुओं को ठहराते हैं।",
      mr: "नाशिक व परिसरातील काही आश्रम कुंभकाळात भाविकांची राहण्याची सोय करतात.",
    },
    note: {
      en: "Arrangements vary by ashram",
      hi: "व्यवस्था हर आश्रम में अलग है",
      mr: "व्यवस्था प्रत्येक आश्रमानुसार वेगळी",
    },
    tip: {
      en: "Check directly with the ashram before you travel.",
      hi: "यात्रा से पहले सीधे आश्रम से पूछें।",
      mr: "प्रवासापूर्वी थेट आश्रमाकडे चौकशी करा.",
    },
  },
  {
    Icon: Tent,
    titleKey: translations.guidePage.tentCities,
    description: {
      en: "NTKMA is setting up tent cities with private operators: about 80 acres in Nashik and 50+ acres in Trimbak. Private tent cities follow an official SOP (29 Sep 2026).",
      hi: "NTKMA निजी ऑपरेटरों के साथ टेंट सिटी बना रहा है: नाशिक में लगभग 80 एकड़ और त्र्यंबक में 50 से अधिक एकड़। निजी टेंट सिटी के लिए आधिकारिक SOP (29 सितंबर 2026) है।",
      mr: "NTKMA खासगी ऑपरेटर्ससोबत तंबू नगरी उभारत आहे: नाशिकमध्ये सुमारे ८० एकर आणि त्र्यंबकमध्ये ५० पेक्षा जास्त एकर. खासगी तंबू नगरींसाठी अधिकृत SOP (२९ सप्टेंबर २०२६) आहे.",
    },
    note: {
      en: "Booking app approved (tents only), not live yet",
      hi: "बुकिंग ऐप मंज़ूर (केवल टेंट), अभी शुरू नहीं",
      mr: "बुकिंग ॲप मंजूर (फक्त तंबू), अजून सुरू नाही",
    },
    tip: {
      en: "No official tent prices have been published.",
      hi: "टेंट की कोई आधिकारिक कीमत घोषित नहीं हुई है।",
      mr: "तंबूंचे कोणतेही अधिकृत दर जाहीर झालेले नाहीत.",
    },
  },
  {
    Icon: Home,
    titleKey: { en: "Homestays", hi: "होमस्टे", mr: "होमस्टे" },
    description: {
      en: "About 600 Nashik homes are on Airbnb. NTKMA is working with Airbnb to reach at least 2,000 and wants residents to rent out rooms.",
      hi: "नाशिक के लगभग 600 घर Airbnb पर हैं। NTKMA Airbnb के साथ इसे कम से कम 2,000 तक ले जाना चाहता है।",
      mr: "नाशिकमधील सुमारे ६०० घरे Airbnb वर आहेत. NTKMA Airbnb सोबत ही संख्या किमान २,००० पर्यंत नेण्याचे काम करत आहे.",
    },
    note: {
      en: "No official homestay registration rules yet",
      hi: "होमस्टे पंजीकरण के आधिकारिक नियम अभी नहीं",
      mr: "होमस्टे नोंदणीचे अधिकृत नियम अजून नाहीत",
    },
    tip: {
      en: "Use trusted platforms and check reviews.",
      hi: "भरोसेमंद प्लेटफ़ॉर्म चुनें और समीक्षाएँ देखें।",
      mr: "विश्वासार्ह प्लॅटफॉर्म वापरा आणि रिव्ह्यू तपासा.",
    },
  },
];

const carryItems: T[] = [
  { en: "Valid identity documents (Aadhaar, Passport, etc.)", hi: "वैध पहचान पत्र (आधार, पासपोर्ट आदि)", mr: "वैध ओळखपत्र (आधार, पासपोर्ट इ.)" },
  { en: "Comfortable cotton clothes", hi: "आरामदायक सूती कपड़े", mr: "आरामदायक सुती कपडे" },
  { en: "An extra set of dry clothes for after bathing", hi: "स्नान के बाद के लिए सूखे कपड़ों का एक जोड़ा", mr: "स्नानानंतर घालण्यासाठी कोरड्या कपड्यांचा एक जोड" },
  { en: "Towel and basic toiletries", hi: "तौलिया और ज़रूरी सामान", mr: "टॉवेल आणि आवश्यक प्रसाधने" },
  { en: "Reusable water bottle", hi: "दोबारा इस्तेमाल होने वाली पानी की बोतल", mr: "पुन्हा वापरता येणारी पाण्याची बाटली" },
  { en: "Your medicines and a basic first-aid kit", hi: "अपनी दवाइयाँ और प्राथमिक उपचार किट", mr: "तुमची औषधे आणि प्रथमोपचार किट" },
  { en: "Enough cash (ATMs may be crowded)", hi: "पर्याप्त नकदी (ATM पर भीड़ हो सकती है)", mr: "पुरेशी रोकड (ATM वर गर्दी असू शकते)" },
  { en: "Mobile charger and power bank", hi: "मोबाइल चार्जर और पावर बैंक", mr: "मोबाइल चार्जर आणि पॉवर बँक" },
  { en: "Comfortable walking shoes (you will walk a lot)", hi: "चलने के लिए आरामदायक जूते (बहुत चलना होगा)", mr: "चालण्यासाठी आरामदायक चपला/बूट (खूप चालावे लागेल)" },
  { en: "Umbrella or raincoat (the peak period is in the monsoon)", hi: "छाता या रेनकोट (मुख्य अवधि मानसून में है)", mr: "छत्री किंवा रेनकोट (मुख्य काळ पावसाळ्यात आहे)" },
  { en: "Puja items: flowers, incense, camphor, coconut", hi: "पूजा सामग्री: फूल, अगरबत्ती, कपूर, नारियल", mr: "पूजेचे साहित्य: फुले, उदबत्ती, कापूर, नारळ" },
  { en: "A cloth bag for offerings and belongings", hi: "चढ़ावे और सामान के लिए कपड़े का थैला", mr: "नैवेद्य व सामानासाठी कापडी पिशवी" },
  { en: "Sunscreen and a hat", hi: "सनस्क्रीन और टोपी", mr: "सनस्क्रीन आणि टोपी" },
  { en: "A small lock for your luggage", hi: "सामान के लिए छोटा ताला", mr: "सामानासाठी लहान कुलूप" },
];

const dos: T[] = [
  { en: "Respect local customs and religious feelings", hi: "स्थानीय रीति-रिवाज़ और धार्मिक भावनाओं का सम्मान करें", mr: "स्थानिक रूढी आणि धार्मिक भावनांचा आदर करा" },
  { en: "Carry a government photo ID at all times", hi: "हर समय सरकारी फ़ोटो पहचान पत्र साथ रखें", mr: "नेहमी सरकारी फोटो ओळखपत्र सोबत ठेवा" },
  { en: "Drink enough water and eat at clean stalls", hi: "पर्याप्त पानी पिएँ और साफ़ दुकानों पर खाएँ", mr: "पुरेसे पाणी प्या आणि स्वच्छ ठिकाणीच खा" },
  { en: "Follow police and crowd directions and marked routes", hi: "पुलिस और भीड़ प्रबंधन के निर्देश और तय मार्ग मानें", mr: "पोलीस व गर्दी व्यवस्थापनाच्या सूचना आणि ठरलेले मार्ग पाळा" },
  { en: "Keep valuables safe in inner pockets", hi: "क़ीमती सामान अंदर की जेब में सुरक्षित रखें", mr: "मौल्यवान वस्तू आतल्या खिशात सुरक्षित ठेवा" },
  { en: "Bathe only at marked ghats", hi: "केवल तय घाटों पर ही स्नान करें", mr: "फक्त ठरवलेल्या घाटांवरच स्नान करा" },
  { en: "Attend the evening aarti at the Godavari", hi: "गोदावरी की संध्या आरती में शामिल हों", mr: "गोदावरीच्या संध्याकाळच्या आरतीला उपस्थित राहा" },
  { en: "Keep the ghats and temples clean", hi: "घाटों और मंदिरों को साफ़ रखें", mr: "घाट आणि मंदिरे स्वच्छ ठेवा" },
  { en: "Keep your group together and agree a meeting point", hi: "अपने समूह को साथ रखें और मिलने की जगह तय करें", mr: "तुमचा गट एकत्र ठेवा आणि भेटण्याची जागा ठरवा" },
];

const donts: T[] = [
  { en: "Don't litter at the ghats, river or temples", hi: "घाट, नदी या मंदिरों में कचरा न फैलाएँ", mr: "घाट, नदी किंवा मंदिरांत कचरा टाकू नका" },
  { en: "Don't carry leather items into temples", hi: "मंदिरों में चमड़े की चीज़ें न ले जाएँ", mr: "मंदिरांत चामड्याच्या वस्तू नेऊ नका" },
  { en: "Don't photograph sadhus without permission", hi: "बिना अनुमति साधुओं की फ़ोटो न लें", mr: "परवानगीशिवाय साधूंचे फोटो काढू नका" },
  { en: "Don't carry or drink alcohol in the Kumbh area", hi: "कुंभ क्षेत्र में शराब न ले जाएँ और न पिएँ", mr: "कुंभ परिसरात दारू नेऊ नका किंवा पिऊ नका" },
  { en: "Don't swim in deep or closed parts of the river", hi: "नदी के गहरे या बंद हिस्सों में न तैरें", mr: "नदीच्या खोल किंवा बंद भागात पोहू नका" },
  { en: "Don't block procession routes", hi: "शोभायात्रा के मार्ग न रोकें", mr: "मिरवणुकीचे मार्ग अडवू नका" },
  { en: "Don't leave children alone in crowds", hi: "भीड़ में बच्चों को अकेला न छोड़ें", mr: "गर्दीत मुलांना एकटे सोडू नका" },
  { en: "Don't use plastic bags", hi: "प्लास्टिक की थैलियाँ इस्तेमाल न करें", mr: "प्लास्टिक पिशव्या वापरू नका" },
  { en: "Don't trust unofficial guides, touts or 'official pass' sellers", hi: "अनधिकृत गाइड, दलालों या 'आधिकारिक पास' बेचने वालों पर भरोसा न करें", mr: "अनधिकृत गाईड, दलाल किंवा 'अधिकृत पास' विकणाऱ्यांवर विश्वास ठेवू नका" },
];

const essentialTips: {
  Icon: typeof Phone;
  titleKey: T;
  color: string;
  content?: T;
  contacts?: { label: T; number: string }[];
}[] = [
  {
    Icon: CloudRain,
    titleKey: translations.guidePage.weatherTitle,
    color: "#60A5FA",
    content: {
      en: "The Simhastha runs from October 2026 to July 2028, but the official Major Mela Period is 15 June to 30 September 2027, the monsoon months. Expect rain and slippery ghats then: carry rain gear and waterproof bags for phones.",
      hi: "सिंहस्थ अक्टूबर 2026 से जुलाई 2028 तक चलता है, पर आधिकारिक मुख्य मेला अवधि 15 जून से 30 सितंबर 2027 है, यानी मानसून। तब बारिश और फिसलन भरे घाटों के लिए तैयार रहें: रेनकोट और फ़ोन के लिए वाटरप्रूफ़ थैली रखें।",
      mr: "सिंहस्थ ऑक्टोबर २०२६ ते जुलै २०२८ असा चालतो, पण अधिकृत मुख्य मेळा कालावधी १५ जून ते ३० सप्टेंबर २०२७ आहे, म्हणजे पावसाळा. तेव्हा पाऊस आणि निसरड्या घाटांसाठी तयार राहा: रेनकोट आणि फोनसाठी वॉटरप्रूफ पिशवी ठेवा.",
    },
  },
  {
    Icon: Phone,
    titleKey: translations.guidePage.emergencyTitle,
    color: "#F87171",
    // Sourced from the content registry (src/data/verified/index.ts).
    contacts: [
      { label: { en: "All emergencies (ERSS)", hi: "सभी आपात स्थितियाँ (ERSS)", mr: "सर्व आपत्कालीन (ERSS)" }, number: "112" },
      { label: { en: "Ambulance (MEMS 108)", hi: "एम्बुलेंस (MEMS 108)", mr: "रुग्णवाहिका (MEMS 108)" }, number: "108" },
      { label: { en: "Fire", hi: "अग्निशमन", mr: "अग्निशमन" }, number: "101" },
      { label: { en: "Women helpline", hi: "महिला हेल्पलाइन", mr: "महिला हेल्पलाइन" }, number: "1091" },
      { label: { en: "Child helpline", hi: "चाइल्ड हेल्पलाइन", mr: "बाल हेल्पलाइन" }, number: "1098" },
      { label: { en: "NTKMA, Divisional Commissioner, Nashik", hi: "NTKMA, विभागीय आयुक्त, नाशिक", mr: "NTKMA, विभागीय आयुक्त, नाशिक" }, number: "0253-2461909" },
    ],
  },
  {
    Icon: Stethoscope,
    titleKey: translations.guidePage.medicalTitle,
    color: "#34D399",
    content: {
      en: "A ₹260 crore health plan is approved: 136 temporary medical facilities, 190 ambulances and 1,945 beds (TOI, Sep 2026). Locations are not published yet. Dial 108 for an ambulance or 112 for any emergency.",
      hi: "₹260 करोड़ की स्वास्थ्य योजना मंज़ूर है: 136 अस्थायी चिकित्सा केंद्र, 190 एम्बुलेंस और 1,945 बेड (TOI, सितंबर 2026)। स्थान अभी घोषित नहीं हुए। एम्बुलेंस के लिए 108 या किसी भी आपात स्थिति में 112 डायल करें।",
      mr: "₹२६० कोटींची आरोग्य योजना मंजूर आहे: १३६ तात्पुरती वैद्यकीय केंद्रे, १९० रुग्णवाहिका आणि १,९४५ खाटा (TOI, सप्टेंबर २०२६). ठिकाणे अजून जाहीर झालेली नाहीत. रुग्णवाहिकेसाठी १०८ किंवा कोणत्याही आपत्कालीन स्थितीत ११२ डायल करा.",
    },
  },
  {
    Icon: Smartphone,
    titleKey: translations.guidePage.mobileTitle,
    color: "#A78BFA",
    content: {
      en: "On Amrit Snan days mobile networks can get very busy. Download offline maps and write important numbers on paper.",
      hi: "अमृत स्नान के दिनों में मोबाइल नेटवर्क बहुत व्यस्त हो सकता है। ऑफ़लाइन नक्शे डाउनलोड करें और ज़रूरी नंबर काग़ज़ पर लिख लें।",
      mr: "अमृत स्नानाच्या दिवशी मोबाइल नेटवर्क खूप व्यस्त होऊ शकते. ऑफलाइन नकाशे डाउनलोड करा आणि महत्त्वाचे क्रमांक कागदावर लिहून ठेवा.",
    },
  },
  {
    Icon: Wallet,
    titleKey: translations.guidePage.moneyTitle,
    color: "#FBBF24",
    content: {
      en: "Carry cash in small notes. ATMs near the ghats can run out or have long queues. UPI works at most shops, but small vendors may want cash.",
      hi: "छोटे नोटों में नकदी रखें। घाटों के पास ATM खाली हो सकते हैं या लंबी कतारें हो सकती हैं। ज़्यादातर दुकानों पर UPI चलता है, पर छोटे विक्रेता नकद चाहते हैं।",
      mr: "लहान नोटांमध्ये रोकड ठेवा. घाटांजवळचे ATM रिकामे होऊ शकतात किंवा लांब रांगा असू शकतात. बहुतेक दुकानांत UPI चालते, पण लहान विक्रेते रोख मागू शकतात.",
    },
  },
  {
    Icon: ShieldCheck,
    titleKey: translations.guidePage.generalSafetyTitle,
    color: "#C9A227",
    content: {
      en: "Agree a meeting point with your group. Wear shoes that don't slip, as ghat steps get wet. Avoid big bags and costly jewellery. Lost-and-found locations will be announced by the authorities.",
      hi: "अपने समूह के साथ मिलने की जगह तय करें। फिसलन न होने वाले जूते पहनें, घाट की सीढ़ियाँ गीली रहती हैं। बड़े बैग और महँगे गहने न लाएँ। खोया-पाया केंद्रों की जगह प्रशासन घोषित करेगा।",
      mr: "तुमच्या गटासोबत भेटण्याची जागा ठरवा. न घसरणारी पादत्राणे घाला, घाटांच्या पायऱ्या ओल्या असतात. मोठ्या बॅगा आणि महागडे दागिने टाळा. हरवले-सापडले केंद्रांची ठिकाणे प्रशासन जाहीर करेल.",
    },
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function PilgrimGuidePage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = quickNavItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#C9A227", textShadow: "0 0 30px rgba(201,162,39,0.4)" }}
            aria-hidden="true"
          >
            तीर्थ यात्रा
          </span>

          <h1
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.guidePage.heroTitle)}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.guidePage.heroSubtitle)}
          </p>

          <div
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ QUICK NAVIGATION ═══════════════════ */}
      <nav
        className="sticky top-16 z-40 border-b lg:top-20"
        style={{
          background: "rgba(11,18,32,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(201,162,39,0.12)",
        }}
      >
        <div className="section-container">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto py-3">
            {quickNavItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #C9A227, #B8922D)",
                          color: "#0B1220",
                          boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
                        }
                      : {
                          color: "rgba(201,162,39,0.6)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#C9A227";
                      (e.target as HTMLElement).style.background = "rgba(201,162,39,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "rgba(201,162,39,0.6)";
                      (e.target as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {t(item.labelKey)}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HOW TO REACH ═══════════════════ */}
      <section id="how-to-reach" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.howToReachTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.guidePage.howToReachDesc)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {transportModes.map((mode) => (
              <div
                key={t(mode.titleKey)}
                className="card-glass flex flex-col p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(201,162,39,0.1)",
                }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(201,162,39,0.1)" }}
                >
                  <mode.Icon className="h-7 w-7" style={{ color: "#C9A227" }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-cream-100">
                  {t(mode.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-300/60">
                  {t(mode.descKey)}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {mode.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-cream-300/60"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#C9A227" }} />
                      <span>{t(detail)}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-5 rounded-xl p-3"
                  style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.1)" }}
                >
                  <p className="text-xs font-semibold" style={{ color: "#C9A227" }}>
                    {t(translations.guidePage.tip)} <span className="font-normal text-cream-300/60">{t(mode.tip)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ACCOMMODATION ═══════════════════ */}
      <div className="section-container mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
        <CommonsPhoto id={38} />
        <CommonsPhoto id={41} />
      </div>

      <section
        id="accommodation"
        className="relative scroll-mt-32 bg-cream-50 py-16 md:py-24"
      >
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.whereToStay)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-temple-500">
              {t(translations.guidePage.whereToStayDesc)}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {accommodationTypes.map((acc) => (
              <div
                key={t(acc.titleKey)}
                className="card-glass flex flex-col p-6"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(201,162,39,0.1)" }}
                >
                  <acc.Icon className="h-6 w-6" style={{ color: "#C9A227" }} />
                </div>
                <h3 className="font-heading text-lg font-bold text-temple-800">
                  {t(acc.titleKey)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-temple-600">
                  {t(acc.description)}
                </p>
                <div
                  className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.15)" }}
                >
                  <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#C9A227" }} />
                  <span className="text-xs font-semibold" style={{ color: "#B8922D" }}>
                    {t(acc.note)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-temple-500">
                  <strong>{t(translations.guidePage.tip)}</strong> {t(acc.tip)}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center"
            style={{
              background: "rgba(201,162,39,0.05)",
              border: "1px solid rgba(201,162,39,0.2)",
            }}
          >
            <p className="text-sm leading-relaxed text-temple-600">
              {t(translations.guidePage.akhadaNote)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHAT TO CARRY ═══════════════════ */}
      <section id="what-to-carry" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.whatToCarryTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.guidePage.whatToCarryDesc)}
            </p>
          </div>

          <div
            className="mx-auto max-w-3xl"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {carryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,162,39,0.1)",
                  }}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "#C9A227" }} />
                  <span className="text-sm text-cream-300/80">{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DO'S AND DON'TS ═══════════════════ */}
      <section
        id="dos-and-donts"
        className="relative scroll-mt-32 bg-cream-50 py-16 md:py-24"
      >
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.dosAndDontsTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-temple-500">
              {t(translations.guidePage.dosAndDontsDesc)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Do's Column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)" }}
                >
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-green-600">
                  {t(translations.guidePage.dosLabel)}
                </h3>
              </div>
              <div className="space-y-3">
                {dos.map((item, idx) => (
                  <div
                    key={idx}
                    className="card-glass flex items-start gap-3 p-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm text-temple-700">{t(item)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts Column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "rgba(239,68,68,0.1)" }}
                >
                  <XCircle className="h-6 w-6 text-red-500" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-red-500">
                  {t(translations.guidePage.dontsLabel)}
                </h3>
              </div>
              <div className="space-y-3">
                {donts.map((item, idx) => (
                  <div
                    key={idx}
                    className="card-glass flex items-start gap-3 p-4"
                  >
                    <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <span className="text-sm text-temple-700">{t(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ESSENTIAL TIPS ═══════════════════ */}
      <section id="essential-tips" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.essentialTipsTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {essentialTips.map((tip) => (
              <div
                key={t(tip.titleKey)}
                className="card-dark p-8"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${tip.color}15` }}
                >
                  <tip.Icon className="h-7 w-7" style={{ color: tip.color }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-cream-100">
                  {t(tip.titleKey)}
                </h3>
                {"contacts" in tip && tip.contacts ? (
                  <ul className="mt-3 space-y-3">
                    {tip.contacts.map((contact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-cream-300/60">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: tip.color }} />
                        <span>
                          <strong className="text-cream-300/80">{t(contact.label)}:</strong>{" "}
                          {contact.number}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-relaxed text-cream-300/60">
                    {tip.content && t(tip.content)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #0B1220 50%, #1a0a00 100%)",
        }}
      >
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.06)_0%,transparent_70%)]" />

        <div
          className="section-container relative z-10 text-center"
        >
          <div className="sacred-divider mx-auto mb-8 max-w-xs">
            <span className="font-devanagari text-sm" style={{ color: "#C9A227" }}>
              ॐ
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.guidePage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream-300/70">
            {t(translations.guidePage.ctaDesc)}
          </p>
          <Link
            href="/dates"
            className="btn-gold mt-10 inline-flex items-center gap-2"
          >
            {t(translations.guidePage.ctaButton)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>


    </>
  );
}

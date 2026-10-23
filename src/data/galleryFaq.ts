import type { Locale } from "@/i18n/translations";
import { availablePhotos } from "@/data/photos";
import { schedule, scheduleSources } from "@/data/verified";
import { formatDate, localDigits } from "@/lib/dates";

/**
 * Photo-intent Q&A for /gallery. Shared by the visible FAQ and FAQPage
 * JSON-LD so the two cannot disagree. Counts come from availablePhotos.
 */

type L10n = Record<Locale, string>;

export function galleryPhotoCount(): number {
  return availablePhotos.length;
}

/**
 * Photos whose Commons source dates them to 2015 and whose caption names the
 * Kumbh (the last Nashik-Trimbakeshwar Simhastha). Counted from the data so the
 * number can never drift from what the page shows.
 */
export function kumbh2015PhotoCount(): number {
  return availablePhotos.filter(
    (p) => /\b2015\b/.test(p.dateOnSource) && /kumbh|simhastha/i.test(p.caption)
  ).length;
}

/** Photos of the works for Simhastha 2027 (topic in the photo data). */
export function preparationPhotoCount(): number {
  return availablePhotos.filter((p) => p.topic === "Simhastha 2027 preparations").length;
}

const opening = schedule.find((e) => e.id === "dhwajarohan");
const firstAmritSnan = schedule.find((e) => e.id === "amrit-snan-1");

/** Named sources for the gallery's text (photos are credited one by one). */
export const GALLERY_SOURCES: { label: string; url: string }[] = [
  {
    label: "Wikimedia Commons: Kumbh Mela in Nashik (photo files and licences)",
    url: "https://commons.wikimedia.org/wiki/Category:Kumbh_Mela_in_Nashik",
  },
  {
    label: "Wikimedia Commons: 2015 Kumbh Mela",
    url: "https://commons.wikimedia.org/wiki/Category:2015_Kumbh_Mela",
  },
  {
    label: scheduleSources.NTKMA_PLAN.org + ": " + scheduleSources.NTKMA_PLAN.title,
    url: scheduleSources.NTKMA_PLAN.url,
  },
];

/**
 * The short answer shown at the top of /gallery: what the photos are, how many,
 * which Simhastha they come from, and the next dates (linked to /dates, the
 * canonical page for dates, rather than listed in full).
 */
export function galleryInBrief(locale: Locale): string {
  const n = localDigits(String(galleryPhotoCount()), locale);
  const k15 = localDigits(String(kumbh2015PhotoCount()), locale);
  const prep = localDigits(String(preparationPhotoCount()), locale);
  const open = opening ? formatDate(opening.isoDate, locale) : "";
  const first = firstAmritSnan ? formatDate(firstAmritSnan.isoDate, locale) : "";
  const copy: L10n = {
    mr: `या पानावर नाशिक-त्र्यंबकेश्वर कुंभमेळ्याची (सिंहस्थ) ${n} मुक्त-परवाना छायाचित्रे आहेत. ती सर्व विकिमीडिया कॉमन्सवरून घेतली असून प्रत्येकावर छायाचित्रकाराचे नाव दिले आहे. यात रामकुंड व गोदावरीचे घाट, स्नानाची गर्दी, साधू व आखाड्यांच्या मिरवणुका, त्र्यंबकेश्वर व कुशावर्त, पंचवटीतील मंदिरे, संध्याकाळची आरती आणि सिंहस्थ २०२७ ची कामे दिसतात. यातील ${k15} छायाचित्रे २०१५ च्या मागच्या नाशिक कुंभातील आहेत, असे त्यांच्या छायाचित्रकारांनी नोंदवले आहे; ${prep} छायाचित्रे रामकुंडावरील २०२७ च्या तयारीची (२०२५–२०२६) आहेत. पुढील सिंहस्थाचे ध्वजारोहण ${open} रोजी आणि पहिले अमृत स्नान ${first} रोजी आहे.`,
    hi: `इस पेज पर नाशिक-त्र्यंबकेश्वर कुंभ मेले (सिंहस्थ) की ${n} मुक्त-लाइसेंस तस्वीरें हैं। सभी विकिमीडिया कॉमन्स से ली गई हैं और हर तस्वीर पर फोटोग्राफर का नाम दिया गया है। इनमें रामकुंड और गोदावरी के घाट, स्नान की भीड़, साधु और अखाड़ों की शोभायात्राएँ, त्र्यंबकेश्वर और कुशावर्त, पंचवटी के मंदिर, शाम की आरती और सिंहस्थ 2027 के काम दिखते हैं। इनमें से ${k15} तस्वीरें पिछले, यानी 2015 के नाशिक कुंभ की हैं, जैसा उनके फोटोग्राफरों ने दर्ज किया है; ${prep} तस्वीरें रामकुंड पर 2027 की तैयारी (2025–2026) की हैं। अगले सिंहस्थ का ध्वजारोहण ${open} को और पहला अमृत स्नान ${first} को है।`,
    en: `This page has ${n} freely licensed photos of the Nashik-Trimbakeshwar Kumbh Mela (Simhastha), all from Wikimedia Commons and each credited to its photographer. They show Ramkund and the Godavari ghats, snan crowds, sadhus and akhada processions, Trimbakeshwar and Kushavarta, the Panchavati temples, evening aarti, and the works for Simhastha 2027. Of these, ${k15} are dated and labelled by their photographers as the 2015 Nashik Kumbh, the last Simhastha, and ${prep} show the 2027 preparations at Ramkund (2025–2026). The next Simhastha's flag hoisting is on ${open} and the first Amrit Snan on ${first}.`,
  };
  return copy[locale];
}

/**
 * The guide page that answers the questions each photo topic raises, so the
 * gallery passes readers (and link equity) to the canonical page for that
 * subject instead of competing with it.
 */
export const TOPIC_GUIDE: Record<string, { href: string; label: L10n }> = {
  "Ramkund & Godavari ghats": {
    href: "/ghats",
    label: {
      mr: "रामकुंड आणि नाशिकचे गोदावरी घाट: नावे, अमृत स्नानाची ठिकाणे आणि नवे घाट",
      hi: "रामकुंड और नाशिक के गोदावरी घाट: नाम, अमृत स्नान स्थल और नए घाट",
      en: "Ramkund and Nashik's Godavari ghats: names, Amrit Snan sites and new ghats",
    },
  },
  "Snan crowds": {
    href: "/dates",
    label: {
      mr: "नाशिक कुंभमेळा २०२७ च्या अमृत स्नानाच्या तारखा",
      hi: "नाशिक कुंभ 2027 के अमृत स्नान की तिथियाँ",
      en: "Nashik Kumbh 2027 Amrit Snan dates",
    },
  },
  "Sadhus, akharas & processions": {
    href: "/naga-sadhus",
    label: {
      mr: "नाशिक कुंभातील नागा साधू आणि आखाडे",
      hi: "नाशिक कुंभ में नागा साधु और अखाड़े",
      en: "Naga sadhus and akhadas at the Nashik Kumbh",
    },
  },
  "Trimbakeshwar & Kushavarta": {
    href: "/trimbakeshwar-kumbh-2027",
    label: {
      mr: "त्र्यंबकेश्वर कुंभमेळा २०२७: कुशावर्त आणि शैव आखाडे",
      hi: "त्र्यंबकेश्वर कुंभ 2027: कुशावर्त और शैव अखाड़े",
      en: "Trimbakeshwar Kumbh 2027: Kushavarta and the Shaiva akhadas",
    },
  },
  "Panchavati temples": {
    href: "/yatra/panchavati",
    label: {
      mr: "पंचवटी वाट: कालाराम मंदिर आणि सीता गुंफेची ऑडिओ पदयात्रा",
      hi: "पंचवटी पथ: कालाराम मंदिर और सीता गुफा की ऑडियो पदयात्रा",
      en: "The Panchavati Trail: audio walk past the Kalaram temple and Sita Gufa",
    },
  },
  "Night & aarti": {
    href: "/blog/two-world-record-attempts-501-conch-shankhnaad-6500-maha-goda-aarti",
    label: {
      mr: "३१ ऑक्टोबरची महा गोदा आरती आणि २५ ऑक्टोबरचा शंखनाद",
      hi: "31 अक्टूबर की महा गोदा आरती और 25 अक्टूबर का शंखनाद",
      en: "The 31 October Maha Goda Aarti and the 25 October Shankhnaad",
    },
  },
  "Nashik city & landmarks": {
    href: "/how-to-reach",
    label: {
      mr: "नाशिक आणि रामकुंडला कसे पोहोचायचे",
      hi: "नाशिक और रामकुंड कैसे पहुँचें",
      en: "How to reach Nashik and Ramkund",
    },
  },
  "Simhastha 2027 preparations": {
    href: "/blog/ntkma-tells-nmc-to-fast-track-ramkund-works-before-dhwajarohan",
    label: {
      mr: "रामकुंडावरील कुंभ कामे: ध्वजारोहणापूर्वीची ताजी बातमी",
      hi: "रामकुंड पर कुंभ के काम: ध्वजारोहण से पहले की ताज़ा ख़बर",
      en: "Kumbh works at Ramkund: the latest before the flag hoisting",
    },
  },
};

export function galleryFaqs(): { q: L10n; a: L10n }[] {
  const n = galleryPhotoCount();
  const k15 = kumbh2015PhotoCount();
  const open = opening ? formatDate(opening.isoDate, "en") : "";
  const openHi = opening ? formatDate(opening.isoDate, "hi") : "";
  const openMr = opening ? formatDate(opening.isoDate, "mr") : "";
  const first = firstAmritSnan ? formatDate(firstAmritSnan.isoDate, "en") : "";
  const firstHi = firstAmritSnan ? formatDate(firstAmritSnan.isoDate, "hi") : "";
  const firstMr = firstAmritSnan ? formatDate(firstAmritSnan.isoDate, "mr") : "";
  return [
    {
      q: {
        en: "Where do these Kumbh Mela photos come from?",
        hi: "ये कुंभ मेला की तस्वीरें कहाँ से हैं?",
        mr: "ही कुंभमेळ्याची छायाचित्रे कुठून आली आहेत?",
      },
      a: {
        en: `All ${n} photos are freely licensed files from Wikimedia Commons. They show Nashik, Trimbakeshwar, the Godavari ghats, and earlier Simhastha gatherings. Each file is self-hosted on this site and credited to its photographer.`,
        hi: `सभी ${n} तस्वीरें विकिमीडिया कॉमन्स की मुक्त-लाइसेंस फ़ाइलें हैं। इनमें नाशिक, त्र्यंबकेश्वर, गोदावरी घाट और पहले के सिंहस्थ दिखते हैं। हर फ़ाइल इस साइट पर स्वयं होस्ट है और फोटोग्राफर का श्रेय दिया गया है।`,
        mr: `ही सर्व ${n} छायाचित्रे विकिमीडिया कॉमन्सवरील मुक्त-परवाना फायली आहेत. त्यात नाशिक, त्र्यंबकेश्वर, गोदावरी घाट आणि आधीचे सिंहस्थ दिसतात. प्रत्येक फाइल या साइटवर स्वतः होस्ट केली आहे आणि छायाचित्रकाराचे श्रेय दिले आहे.`,
      },
    },
    {
      q: {
        en: "Are these photos free to view?",
        hi: "क्या ये तस्वीरें मुफ्त देखी जा सकती हैं?",
        mr: "ही छायाचित्रे मोफत पाहता येतात का?",
      },
      a: {
        en: "Yes. You can view every photo on this gallery page at no cost. Licenses are mostly Creative Commons (for example CC BY or CC BY-SA) or public domain / CC0. Reuse outside this site must follow each photo’s licence, which is listed under the image and on the credits page.",
        hi: "हाँ। इस गैलरी पेज पर हर तस्वीर बिना शुल्क देखी जा सकती है। लाइसेंस अधिकतर क्रिएटिव कॉमन्स (जैसे CC BY या CC BY-SA) या पब्लिक डोमेन / CC0 हैं। साइट से बाहर उपयोग के लिए प्रत्येक फोटो का लाइसेंस मानना होगा, जो तस्वीर के नीचे और श्रेय पेज पर लिखा है।",
        mr: "हो. या गॅलरी पानावर प्रत्येक छायाचित्र विनामूल्य पाहता येते. परवाने बहुतेक क्रिएटिव्ह कॉमन्स (उदा. CC BY किंवा CC BY-SA) किंवा पब्लिक डोमेन / CC0 आहेत. या साइटबाहेर वापरताना प्रत्येक फोटोचा परवाना पाळावा लागतो; तो फोटोखाली आणि श्रेय पानावर दिला आहे.",
      },
    },
    {
      q: {
        en: "Are these Nashik Kumbh photos or generic Kumbh pictures?",
        hi: "क्या ये नाशिक कुंभ की तस्वीरें हैं या सामान्य कुंभ की?",
        mr: "ही नाशिक कुंभाची छायाचित्रे आहेत की सामान्य कुंभाची?",
      },
      a: {
        en: "They are of Nashik and Trimbakeshwar: Ramkund and Godavari ghats, snan crowds, sadhus and processions, Kushavarta, Panchavati temples, and Simhastha preparations. Captions keep the date or place only when the Commons source records it, so you can tell which frames are from earlier Simhasthas.",
        hi: "ये नाशिक और त्र्यंबकेश्वर की हैं: रामकुंड और गोदावरी घाट, स्नान की भीड़, साधु और शोभायात्राएँ, कुशावर्त, पंचवटी मंदिर, और सिंहस्थ की तैयारी। कैप्शन में तारीख या स्थान तभी है जब कॉमन्स स्रोत में दर्ज हो, ताकि पहले के सिंहस्थ के फ़्रेम पहचाने जा सकें।",
        mr: "ही नाशिक आणि त्र्यंबकेश्वरची आहेत: रामकुंड व गोदावरी घाट, स्नानाची गर्दी, साधू व मिरवणुका, कुशावर्त, पंचवटीची मंदिरे आणि सिंहस्थ तयारी. कॉमन्स स्रोतात नोंद असेल तरच मथळ्यात तारीख किंवा ठिकाण ठेवले आहे, जेणेकरून आधीच्या सिंहस्थांचे फ्रेम ओळखता येतील.",
      },
    },
    {
      q: {
        en: "How many photos are in the Nashik Kumbh gallery?",
        hi: "नाशिक कुंभ गैलरी में कितनी तस्वीरें हैं?",
        mr: "नाशिक कुंभ गॅलरीत किती छायाचित्रे आहेत?",
      },
      a: {
        en: `There are currently ${n} freely licensed photos on this page, grouped by topic. New Commons files are added when they are imported and credited.`,
        hi: `इस पेज पर अभी ${n} मुक्त-लाइसेंस तस्वीरें हैं, विषय के अनुसार समूहों में। नई कॉमन्स फ़ाइलें आयात और श्रेय देने के बाद जोड़ी जाती हैं।`,
        mr: `या पानावर सध्या ${n} मुक्त-परवाना छायाचित्रे आहेत, विष्यानुसार गटांमध्ये. नवीन कॉमन्स फायली आयात करून श्रेय दिल्यानंतर जोडल्या जातात.`,
      },
    },
    {
      q: {
        en: "Are there photos of the 2015 Nashik Kumbh Mela here?",
        hi: "क्या यहाँ 2015 के नाशिक कुंभ मेले की तस्वीरें हैं?",
        mr: "इथे २०१५ च्या नाशिक कुंभमेळ्याची छायाचित्रे आहेत का?",
      },
      a: {
        en: `Yes. ${k15} photos are dated 2015 on Wikimedia Commons and their photographers label them as the Kumbh: sadhus in Nashik and Trimbakeshwar, offerings and devotees at the Godavari ghats, and the Trimbakeshwar temple during the Simhastha. They are in the "Sadhus, akhadas & processions", "Snan crowds" and "Trimbakeshwar & Kushavarta" sections. Each caption keeps the photographer's own wording.`,
        hi: `हाँ। ${k15} तस्वीरें विकिमीडिया कॉमन्स पर 2015 की दर्ज हैं और उनके फोटोग्राफरों ने उन्हें कुंभ की बताया है: नाशिक और त्र्यंबकेश्वर के साधु, गोदावरी घाटों पर चढ़ावा और श्रद्धालु, और सिंहस्थ के दौरान त्र्यंबकेश्वर मंदिर। ये "साधु, अखाड़े और शोभायात्राएँ", "स्नान की भीड़" और "त्र्यंबकेश्वर और कुशावर्त" हिस्सों में हैं। हर कैप्शन में फोटोग्राफर के अपने शब्द रखे गए हैं।`,
        mr: `हो. ${localDigits(String(k15), "mr")} छायाचित्रांची विकिमीडिया कॉमन्सवर २०१५ ची नोंद आहे आणि त्यांच्या छायाचित्रकारांनी ती कुंभाची असल्याचे लिहिले आहे: नाशिक व त्र्यंबकेश्वरमधील साधू, गोदावरी घाटांवरील अर्पण व भाविक, आणि सिंहस्थाच्या काळातील त्र्यंबकेश्वर मंदिर. ती "साधू, आखाडे व मिरवणुका", "स्नानाची गर्दी" आणि "त्र्यंबकेश्वर व कुशावर्त" या विभागांत आहेत. प्रत्येक मथळ्यात छायाचित्रकाराचेच शब्द ठेवले आहेत.`,
      },
    },
    {
      q: {
        en: "When is the next Nashik Kumbh, when new photos will be taken?",
        hi: "अगला नाशिक कुंभ कब है, जब नई तस्वीरें ली जाएँगी?",
        mr: "पुढचा नाशिक कुंभमेळा कधी आहे, जेव्हा नवी छायाचित्रे टिपली जातील?",
      },
      a: {
        en: `The Nashik-Trimbakeshwar Simhastha opens with the flag hoisting (Dhwajarohan) at Ramkund and Kushavarta on ${open}. The first Amrit Snan is on ${first}, per the Nashik-Trimbakeshwar Kumbh Mela Authority's plan. All the Amrit Snan dates are on the dates page.`,
        hi: `नाशिक-त्र्यंबकेश्वर सिंहस्थ की शुरुआत ${openHi} को रामकुंड और कुशावर्त पर ध्वजारोहण से होती है। नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण की योजना के अनुसार पहला अमृत स्नान ${firstHi} को है। अमृत स्नान की सभी तिथियाँ तिथियों वाले पेज पर हैं।`,
        mr: `नाशिक-त्र्यंबकेश्वर सिंहस्थाची सुरुवात ${openMr} रोजी रामकुंड आणि कुशावर्तावरील ध्वजारोहणाने होते. नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाच्या आराखड्यानुसार पहिले अमृत स्नान ${firstMr} रोजी आहे. अमृत स्नानाच्या सर्व तारखा तारखांच्या पानावर आहेत.`,
      },
    },
  ];
}

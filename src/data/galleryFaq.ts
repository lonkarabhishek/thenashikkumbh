import type { Locale } from "@/i18n/translations";
import { availablePhotos } from "@/data/photos";

/**
 * Photo-intent Q&A for /gallery. Shared by the visible FAQ and FAQPage
 * JSON-LD so the two cannot disagree. Counts come from availablePhotos.
 */

type L10n = Record<Locale, string>;

export function galleryPhotoCount(): number {
  return availablePhotos.length;
}

export function galleryFaqs(): { q: L10n; a: L10n }[] {
  const n = galleryPhotoCount();
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
  ];
}

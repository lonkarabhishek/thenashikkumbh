import { offices, schedule, scheduleSources } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { formatDate, formatTime } from "@/lib/dates";

/**
 * Plain answers for the home page: when the Nashik Kumbh is, where it is held,
 * how to get there, and whether this is the official website. Shared by the
 * visible answers and the home FAQPage structured data, so they cannot
 * disagree. Dates come from the verified schedule; /dates stays the canonical
 * page for the full date list, /ghats for the ghats, /how-to-reach for travel
 * and /about for the history (its FAQ covers "what is Kumbh" and "why
 * Simhastha", so those are not repeated here).
 */

type L10n = Record<Locale, string>;

const byId = (id: string) => schedule.find((e) => e.id === id);
const ntkma = offices.find((o) => o.id === "ntkma");

export const HOME_SOURCES: { label: string; url: string }[] = [
  {
    label: scheduleSources.NTKMA_PLAN.org + ": " + scheduleSources.NTKMA_PLAN.title,
    url: scheduleSources.NTKMA_PLAN.url,
  },
  {
    label: "Divisional Commissioner Office, Nashik: contact details",
    url: "https://divcomnashik.maharashtra.gov.in/en/contact-details/",
  },
  {
    label: "PIB: Railway preparations for Nashik Simhastha Kumbh Mela (25 Jul 2025)",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2148431",
  },
  {
    label: "Times of India: Nashik's new airport terminal (18 Aug 2026)",
    url: "https://timesofindia.indiatimes.com/city/nashik/nashiks-new-airport-terminal-to-be-ready-by-march-next-year-to-strengthen-air-connectivity-ahead-of-simhastha-kumbh-mela/articleshow/133305725.cms",
  },
];

function dates(locale: Locale) {
  const d = (id: string) => {
    const e = byId(id);
    return e ? formatDate(e.isoDate, locale) : "";
  };
  const open = byId("dhwajarohan");
  return {
    open: d("dhwajarohan"),
    openTime: open?.startTime ? formatTime(open.startTime, locale) : "",
    a1: d("amrit-snan-1"),
    a2: d("amrit-snan-2"),
    a3n: d("amrit-snan-3-nashik"),
    a3t: d("amrit-snan-3-trimbak"),
    closeT: d("conclusion-trimbak"),
    closeN: d("conclusion"),
  };
}

export function homeInBrief(locale: Locale): string {
  const x = dates(locale);
  const copy: L10n = {
    mr: `नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभमेळा ${x.open} रोजी ध्वजारोहणाने सुरू होत आहे. मुख्य अमृत स्नाने (पूर्वीचे शाही स्नान) ${x.a1}, ${x.a2} आणि ${x.a3n} (नाशिक) / ${x.a3t} (त्र्यंबकेश्वर) या दिवशी आहेत. स्नान नाशिकच्या पंचवटीतील रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर गोदावरीत होते. सिंहस्थाची सांगता जुलै २०२८ मध्ये होईल.`,
    hi: `नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभ मेला ${x.open} को ध्वजारोहण से शुरू हो रहा है। मुख्य अमृत स्नान (पहले शाही स्नान) ${x.a1}, ${x.a2} और ${x.a3n} (नाशिक) / ${x.a3t} (त्र्यंबकेश्वर) को हैं। स्नान नाशिक के पंचवटी में रामकुंड पर और त्र्यंबकेश्वर के कुशावर्त पर गोदावरी में होता है। सिंहस्थ का समापन जुलाई 2028 में होगा।`,
    en: `The Nashik–Trimbakeshwar Simhastha Kumbh Mela opens with flag hoisting (Dhwajarohan) on ${x.open}. The main Amrit Snans (formerly Shahi Snans) are on ${x.a1}, ${x.a2} and ${x.a3n} (Nashik) / ${x.a3t} (Trimbakeshwar). Pilgrims bathe in the Godavari at Ramkund in Panchavati, Nashik, and at Kushavarta in Trimbakeshwar. The Simhastha formally closes in July 2028.`,
  };
  return copy[locale];
}

export function homeFaqs(locale: Locale): { q: L10n; a: L10n }[] {
  const x = dates(locale);
  const phone = ntkma?.phone ?? "";
  const email = ntkma?.email ?? "";

  return [
    {
      q: {
        mr: "नाशिक कुंभमेळा २०२७ कधी आहे?",
        hi: "नाशिक कुंभ मेला 2027 कब है?",
        en: "When is the Nashik Kumbh Mela 2027?",
      },
      a: {
        mr: `सिंहस्थाची सुरुवात ${x.open} रोजी ${x.openTime} ध्वजारोहणाने होईल. अमृत स्नान: ${x.a1}, ${x.a2} आणि ${x.a3n} (नाशिक) / ${x.a3t} (त्र्यंबकेश्वर). सांगता त्र्यंबकेश्वरला ${x.closeT} आणि नाशिकला ${x.closeN} रोजी. पर्वस्नानांसह सर्व तारखा 'महत्त्वाच्या तारखा' पानावर आहेत.`,
        hi: `सिंहस्थ की शुरुआत ${x.open} को ${x.openTime} बजे ध्वजारोहण से होगी। अमृत स्नान: ${x.a1}, ${x.a2} और ${x.a3n} (नाशिक) / ${x.a3t} (त्र्यंबकेश्वर)। समापन त्र्यंबकेश्वर में ${x.closeT} और नाशिक में ${x.closeN} को। पर्व स्नान समेत सारी तिथियाँ 'महत्वपूर्ण तिथियाँ' पेज पर हैं।`,
        en: `The Simhastha opens with flag hoisting on ${x.open} at ${x.openTime}. Amrit Snans: ${x.a1}, ${x.a2} and ${x.a3n} (Nashik) / ${x.a3t} (Trimbakeshwar). It closes at Trimbakeshwar on ${x.closeT} and in Nashik on ${x.closeN}. Every date, including the other bathing days, is on the Important Dates page.`,
      },
    },
    {
      q: {
        mr: "नाशिकमध्ये कुंभमेळा नेमका कुठे भरतो?",
        hi: "नाशिक में कुंभ मेला ठीक कहाँ लगता है?",
        en: "Where exactly is the Kumbh Mela held in Nashik?",
      },
      a: {
        mr: "दोन मुख्य स्नानस्थळे आहेत: नाशिक शहरातील पंचवटी भागात गोदावरीवरील रामकुंड, जिथे वैष्णव आखाडे स्नान करतात, आणि त्र्यंबकेश्वरमधील कुशावर्त कुंड, जिथे शैव आखाडे स्नान करतात. आखाड्यांचे साधू नाशिकमधील साधुग्राममध्ये मुक्काम करतात. रामकुंडाजवळ गोदावरीकाठी इतरही घाट आहेत.",
        hi: "दो मुख्य स्नान स्थल हैं: नाशिक शहर के पंचवटी में गोदावरी पर रामकुंड, जहाँ वैष्णव अखाड़े स्नान करते हैं, और त्र्यंबकेश्वर का कुशावर्त कुंड, जहाँ शैव अखाड़े स्नान करते हैं। अखाड़ों के साधु नाशिक के साधुग्राम में ठहरते हैं। रामकुंड के पास गोदावरी किनारे और भी घाट हैं।",
        en: "There are two main bathing sites: Ramkund on the Godavari in the Panchavati area of Nashik city, where the Vaishnava akhadas bathe, and the Kushavarta tank in Trimbakeshwar, where the Shaiva akhadas bathe. The akhadas' sadhus camp at Sadhugram in Nashik. There are more ghats along the Godavari near Ramkund.",
      },
    },
    {
      q: {
        mr: "कुंभमेळ्यासाठी नाशिकला कसे पोहोचायचे?",
        hi: "कुंभ मेले के लिए नाशिक कैसे पहुँचें?",
        en: "How do I reach Nashik for the Kumbh Mela?",
      },
      a: {
        mr: "रेल्वेने: PIB नुसार रेल्वे कुंभासाठी नाशिक रोड, देवळाली, ओढा, खेरवाडी आणि कसबे सुकेणे ही पाच स्थानके विकसित करत आहे; विशेष गाड्यांचे वेळापत्रक अजून जाहीर झालेले नाही. विमानाने: नाशिकचा विमानतळ जानोरी येथील ओझर विमानतळ आहे. अमृत स्नानाच्या दिवशी खासगी वाहने शहराबाहेर थांबवली जातील आणि बसमधून भाविकांना आत नेले जाईल.",
        hi: "ट्रेन से: PIB के अनुसार रेलवे कुंभ के लिए नाशिक रोड, देवलाली, ओढा, खेरवाडी और कसबे सुकेणे, ये पाँच स्टेशन विकसित कर रही है; स्पेशल ट्रेनों की समय-सारिणी अभी जारी नहीं हुई है। हवाई जहाज़ से: नाशिक का एयरपोर्ट जानोरी में ओझर एयरपोर्ट है। अमृत स्नान के दिन निजी गाड़ियाँ शहर के बाहर रोकी जाएँगी और बसें श्रद्धालुओं को अंदर ले जाएँगी।",
        en: "By train: according to PIB, Railways are developing five stations for the Kumbh: Nashik Road, Devlali, Odha, Kherwadi and Kasbe Sukene. No special-train timetable has been published yet. By air: Nashik's airport is Ozar airport at Janori. On Amrit Snan days private vehicles will be stopped outside the city and buses will carry pilgrims in.",
      },
    },
    {
      q: {
        mr: "नाशिक कुंभमेळ्याची अधिकृत वेबसाइट कोणती?",
        hi: "नाशिक कुंभ मेले की आधिकारिक वेबसाइट कौन-सी है?",
        en: "Is this the official Nashik Kumbh Mela website?",
      },
      a: {
        mr: `नाही. द नाशिक कुंभ ही स्वतंत्र माहिती साइट आहे, शासकीय नाही. कुंभमेळ्याचे नियोजन नाशिक–त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA) करते. अधिकृत माहितीसाठी प्राधिकरणाशी ${phone} किंवा ${email} वर संपर्क साधा. आम्ही प्रत्येक बातमीसोबत तिचा स्रोत देतो.`,
        hi: `नहीं। द नाशिक कुंभ एक स्वतंत्र सूचना साइट है, सरकारी नहीं। कुंभ मेले की योजना नाशिक–त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) बनाता है। आधिकारिक जानकारी के लिए प्राधिकरण से ${phone} या ${email} पर संपर्क करें। हम हर ख़बर के साथ उसका स्रोत देते हैं।`,
        en: `No. The Nashik Kumbh is an independent information site, not a government website. The Kumbh is planned by the Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA); for official information contact the authority at ${phone} or ${email}. We link the source for every news item we publish.`,
      },
    },
  ];
}

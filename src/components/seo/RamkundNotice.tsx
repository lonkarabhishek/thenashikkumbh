"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

// Source: NMC announcement, Times of India 13 Oct 2026 (confirmed); phasing per Pudhari (reported).
// Mirrors src/data/news/ramkund-closed-15-20-days.ts.
const TOI =
  "https://timesofindia.indiatimes.com/city/nashik/ramkund-closed-for-15-20-days-as-nashik-civic-body-races-to-wrap-up-kumbh-works/articleshow/134901215.cms";
const POST = "/blog/ramkund-ghats-closed-15-20-days-before-flag-hoisting";

const COPY = {
  title: { en: "Visitor notice: Ramkund access restricted (October 2026)", hi: "श्रद्धालु सूचना: रामकुंड में प्रवेश सीमित (अक्टूबर 2026)", mr: "भाविकांसाठी सूचना: रामकुंड प्रवेश मर्यादित (ऑक्टोबर २०२६)" },
  body: {
    en: "From 12 October 2026, NMC has restricted public access between Ahilyabai Holkar bridge and Talukteshwar temple for 15–20 days so works finish before the 31 October flag hoisting. Pudhari reports the closure is in phases; daily timings have not been announced. Dashkriya rituals continue at the designated site. Kushavarta in Trimbakeshwar is also closed for renovation until about 31 October.",
    hi: "12 अक्टूबर 2026 से NMC ने अहिल्याबाई होलकर पुल और तालुकतेश्वर मंदिर के बीच 15–20 दिन के लिए आम लोगों का प्रवेश सीमित किया है, ताकि 31 अक्टूबर के ध्वजारोहण से पहले काम पूरे हों। पुढारी के अनुसार यह चरणों में है; रोज़ का समय घोषित नहीं हुआ है। दशक्रिया विधि तय जगह पर जारी है। त्र्यंबकेश्वर का कुशावर्त भी लगभग 31 अक्टूबर तक नवीनीकरण के लिए बंद है।",
    mr: "१२ ऑक्टोबर २०२६ पासून महापालिकेने अहिल्याबाई होळकर पूल ते तालुकतेश्वर मंदिर दरम्यान १५–२० दिवस प्रवेश मर्यादित केला आहे, जेणेकरून ३१ ऑक्टोबरच्या ध्वजारोहणापूर्वी कामे पूर्ण होतील. पुढारीनुसार हे टप्प्याटप्प्याने आहे; दररोजच्या वेळा जाहीर झालेल्या नाहीत. दशक्रिया विधी नेमलेल्या ठिकाणी सुरू आहेत. त्र्यंबकेश्वरचे कुशावर्तही साधारण ३१ ऑक्टोबरपर्यंत नूतनीकरणासाठी बंद आहे.",
  },
  src: { en: "Source: Times of India, 13 Oct 2026", hi: "स्रोत: टाइम्स ऑफ इंडिया, 13 अक्टूबर 2026", mr: "स्रोत: टाइम्स ऑफ इंडिया, १३ ऑक्टोबर २०२६" },
  more: { en: "Full update", hi: "पूरी खबर", mr: "संपूर्ण बातमी" },
};

export default function RamkundNotice() {
  const { locale } = useLanguage();
  return (
    <section className="bg-cream-50 pt-10" aria-labelledby="ramkund-notice-title">
      <div className="section-container mx-auto max-w-3xl">
        <div role="note" className="rounded-xl border border-amber-400 bg-amber-50 p-5 text-temple-800">
          <h2 id="ramkund-notice-title" className="font-heading text-xl font-bold text-temple-900">{COPY.title[locale]}</h2>
          <p className="mt-2 leading-relaxed">{COPY.body[locale]}</p>
          <p className="mt-2 text-sm">
            <a href={TOI} target="_blank" rel="noopener noreferrer" className="underline">{COPY.src[locale]}</a> ·{" "}
            <Link href={POST} className="font-semibold underline">{COPY.more[locale]}</Link> ·{" "}
            <Link href="/map" className="underline">Kumbh map</Link> ·{" "}
            <Link href="/kumbh-status" className="font-semibold underline">Kumbh status board</Link> ·{" "}
            <Link href="/dates" className="underline">Amrit Snan Dates 2027</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

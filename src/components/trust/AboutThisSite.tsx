"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_OWNER } from "@/data/siteOwner";

type L = { en: string; hi: string; mr: string };
const SECTIONS: { id: string; title: L; body: L[] }[] = [
  {
    id: "who-runs-this-site",
    title: { en: "Who runs this site", hi: "यह साइट कौन चलाता है", mr: "ही साइट कोण चालवते" },
    body: [
      SITE_OWNER.bio,
      {
        en: "The Nashik Kumbh is an independent information site about the 2027 Nashik–Trimbakeshwar Simhastha Kumbh Mela. It is not an official government website and is not run by the Kumbh Mela Authority or any government department.",
        hi: "द नाशिक कुंभ 2027 के नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभ मेले पर एक स्वतंत्र सूचना साइट है। यह सरकारी वेबसाइट नहीं है और इसे कुंभ मेला प्राधिकरण या कोई सरकारी विभाग नहीं चलाता।",
        mr: "द नाशिक कुंभ ही २०२७ च्या नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभमेळ्याविषयीची स्वतंत्र माहिती साइट आहे. ही सरकारी वेबसाइट नाही आणि ती कुंभमेळा प्राधिकरण किंवा कोणताही सरकारी विभाग चालवत नाही.",
      },
    ],
  },
  {
    id: "why",
    title: { en: "Why it exists", hi: "यह साइट क्यों है", mr: "ही साइट का आहे" },
    body: [
      {
        en: "Kumbh news is spread across government notices, PDFs and newspapers in three languages. This site brings the dates, preparations and pilgrim information together in Marathi, Hindi and English, with a link to the source for each claim.",
        hi: "कुंभ से जुड़ी जानकारी सरकारी सूचनाओं, PDF और तीन भाषाओं के अख़बारों में बिखरी रहती है। यह साइट तिथियाँ, तैयारियाँ और यात्रियों के काम की जानकारी मराठी, हिंदी और अंग्रेज़ी में एक जगह देती है, और हर दावे के साथ उसका स्रोत जोड़ती है।",
        mr: "कुंभाची माहिती सरकारी सूचना, PDF आणि तीन भाषांतील वर्तमानपत्रांत विखुरलेली असते. ही साइट तारखा, तयारी आणि भाविकांसाठी उपयुक्त माहिती मराठी, हिंदी आणि इंग्रजीत एकत्र देते, आणि प्रत्येक दाव्यासोबत त्याचा स्रोत जोडते.",
      },
    ],
  },
  {
    id: "how-we-verify",
    title: { en: "How news is sourced and verified", hi: "ख़बरें कैसे जुटाई और जाँची जाती हैं", mr: "बातम्या कशा मिळवल्या आणि तपासल्या जातात" },
    body: [
      {
        en: "Official sources come first: the Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA), the Government of Maharashtra and its departments, and the district and municipal bodies. Newspapers and news agencies are used for corroboration and for stories officials have not yet published.",
        hi: "पहले आधिकारिक स्रोत: नाशिक–त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA), महाराष्ट्र सरकार और उसके विभाग, तथा ज़िला और नगर निकाय। अख़बारों और समाचार एजेंसियों का उपयोग पुष्टि के लिए और उन ख़बरों के लिए होता है जो अधिकारियों ने अभी प्रकाशित नहीं कीं।",
        mr: "आधी अधिकृत स्रोत: नाशिक–त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA), महाराष्ट्र शासन व त्याचे विभाग, तसेच जिल्हा आणि महापालिका संस्था. वर्तमानपत्रे आणि वृत्तसंस्था यांचा वापर पुष्टीसाठी आणि अधिकाऱ्यांनी अजून प्रसिद्ध न केलेल्या बातम्यांसाठी होतो.",
      },
      {
        en: "Every news post lists its sources with links. Each source is tagged CONFIRMED (an official document or an on-record official statement) or REPORTED (a media report not yet confirmed officially). Where two reports disagree, we say so instead of picking a number.",
        hi: "हर ख़बर के नीचे उसके स्रोत लिंक के साथ दिए जाते हैं। हर स्रोत पर CONFIRMED (आधिकारिक दस्तावेज़ या अधिकारी का ऑन-रिकॉर्ड बयान) या REPORTED (मीडिया रिपोर्ट, जिसकी आधिकारिक पुष्टि अभी नहीं हुई) का टैग होता है। दो रिपोर्टें अलग हों तो हम कोई एक आँकड़ा चुनने के बजाय यह साफ़ लिखते हैं।",
        mr: "प्रत्येक बातमीखाली तिचे स्रोत लिंकसह दिलेले असतात. प्रत्येक स्रोताला CONFIRMED (अधिकृत दस्तऐवज किंवा अधिकाऱ्याचे अधिकृत विधान) किंवा REPORTED (माध्यमांतील वृत्त, ज्याला अजून अधिकृत दुजोरा नाही) असा टॅग असतो. दोन वृत्तांत फरक असल्यास आम्ही एखादा आकडा निवडण्याऐवजी तसे स्पष्ट लिहितो.",
      },
    ],
  },
  {
    id: "editorial-policy",
    title: { en: "Editorial policy and corrections", hi: "संपादकीय नीति और सुधार", mr: "संपादकीय धोरण आणि दुरुस्त्या" },
    body: [
      {
        en: "We do not invent dates, figures or quotes. If a fact is not published yet, the page says so. Proposals are called proposals until they are approved. We do not accept paid placements.",
        hi: "हम तिथियाँ, आँकड़े या उद्धरण नहीं गढ़ते। कोई तथ्य अभी प्रकाशित नहीं हुआ हो तो पेज पर यही लिखा जाता है। प्रस्ताव मंज़ूर होने तक प्रस्ताव ही कहे जाते हैं। हम पैसे लेकर कुछ नहीं छापते।",
        mr: "आम्ही तारखा, आकडे किंवा अवतरणे रचत नाही. एखादी माहिती अजून प्रसिद्ध झाली नसेल तर पानावर तसेच लिहिलेले असते. मंजुरी मिळेपर्यंत प्रस्तावाला प्रस्तावच म्हटले जाते. आम्ही पैसे घेऊन काहीही प्रसिद्ध करत नाही.",
      },
      {
        en: "When we get something wrong, we correct it, add a dated update note to the post and record it in the public changelog. To report an error, see the contact page.",
        hi: "गलती होने पर हम उसे सुधारते हैं, लेख में तारीख़ के साथ अपडेट नोट जोड़ते हैं और सार्वजनिक परिवर्तन-लॉग में दर्ज करते हैं। गलती बताने के लिए संपर्क पेज देखें।",
        mr: "चूक झाल्यास आम्ही ती दुरुस्त करतो, बातमीत तारखेसह अपडेट नोंद जोडतो आणि सार्वजनिक बदल-नोंदीत नोंदवतो. चूक कळवण्यासाठी संपर्क पान पाहा.",
      },
    ],
  },
];

const LINKS = [
  { href: "/policies#editorial", label: { en: "Full editorial policy", hi: "पूरी संपादकीय नीति", mr: "संपूर्ण संपादकीय धोरण" } },
  { href: "/policies#corrections", label: { en: "Corrections policy", hi: "सुधार नीति", mr: "दुरुस्ती धोरण" } },
  { href: "/changelog", label: { en: "Changelog", hi: "परिवर्तन-लॉग", mr: "बदल-नोंद" } },
  { href: "/contact", label: { en: "Contact", hi: "संपर्क", mr: "संपर्क" } },
  { href: "/credits", label: { en: "Photo credits", hi: "फोटो श्रेय", mr: "फोटो श्रेय" } },
];

export default function AboutThisSite() {
  const { locale } = useLanguage();
  return (
    <section id="about-this-site" className="bg-cream-50 py-16 md:py-20">
      <div className="section-container max-w-3xl">
        <h2 className="font-heading text-3xl font-bold text-temple-900">
          {{ en: "About this site", hi: "इस साइट के बारे में", mr: "या साइटविषयी" }[locale]}
        </h2>
        {SECTIONS.map((s) => (
          <div key={s.id} id={s.id} className="mt-8 scroll-mt-24">
            <h3 className="font-heading text-xl font-bold text-temple-900">{s.title[locale]}</h3>
            {s.body.map((p) => (
              <p key={p.en} className="mt-3 leading-relaxed text-temple-700">{p[locale]}</p>
            ))}
          </div>
        ))}
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}><Link href={l.href} className="font-semibold text-saffron-700 underline">{l.label[locale]}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

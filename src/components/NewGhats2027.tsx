"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

/**
 * The 12 new ghats being built for 2027, plus Kushavarta.
 * Source: NTKMA Commissioner Shekhar Singh, Punekar News, 30 Mar 2026
 * (names, lengths, budgets); ghat-count conflict per TOI 11 Aug 2026;
 * Kushavarta closure per TOI 29 Sep 2026 and Lokmat Times 4 Oct 2026.
 */

const NASHIK_GHATS: { name: { en: string; hi: string; mr: string }; m: number }[] = [
  { name: { en: "Kapila Sangam", hi: "कपिला संगम", mr: "कपिला संगम" }, m: 400 },
  { name: { en: "Nandini Sangam", hi: "नंदिनी संगम", mr: "नंदिनी संगम" }, m: 275 },
  { name: { en: "Takali Sangam Bridge", hi: "टाकली संगम पुल", mr: "टाकळी संगम पूल" }, m: 400 },
  { name: { en: "Takali Sangam", hi: "टाकली संगम", mr: "टाकळी संगम" }, m: 300 },
  { name: { en: "Nandur Dasak (left bank)", hi: "नांदूर दसक (बायाँ तट)", mr: "नांदूर दसक (डावा तीर)" }, m: 500 },
  { name: { en: "Nandur Dasak (right bank)", hi: "नांदूर दसक (दायाँ तट)", mr: "नांदूर दसक (उजवा तीर)" }, m: 570 },
  { name: { en: "Odha", hi: "ओढा", mr: "ओढा" }, m: 255 },
  { name: { en: "Someshwar Waterfall", hi: "सोमेश्वर जलप्रपात", mr: "सोमेश्वर धबधबा" }, m: 174 },
  { name: { en: "Navashya Ganpati", hi: "नवश्या गणपति", mr: "नवश्या गणपती" }, m: 167 },
  { name: { en: "Lakshminarayan", hi: "लक्ष्मीनारायण", mr: "लक्ष्मीनारायण" }, m: 410 },
];

const COPY = {
  kicker: { en: "New for 2027", hi: "2027 के लिए नया", mr: "2027 साठी नवे" },
  title: { en: "12 new ghats are being built", hi: "12 नए घाट बन रहे हैं", mr: "१२ नवे घाट बांधले जात आहेत" },
  intro: {
    en: "NTKMA says Nashik will go from 10 ghats to 20 along about 9 km of the Godavari, with 2 more in Trimbakeshwar. The target is March 2027.",
    hi: "NTKMA के अनुसार नाशिक में गोदावरी के लगभग 9 किमी हिस्से पर घाट 10 से बढ़कर 20 होंगे, और त्र्यंबकेश्वर में 2 और। लक्ष्य मार्च 2027 है।",
    mr: "NTKMA नुसार नाशिकमध्ये गोदावरीच्या सुमारे ९ किमी पट्ट्यात घाट १० वरून २० होतील, आणि त्र्यंबकेश्वरमध्ये आणखी २. लक्ष्य मार्च २०२७ आहे.",
  },
  nashik: { en: "Nashik: 10 new ghats (3,451 m, ₹361.26 crore)", hi: "नाशिक: 10 नए घाट (3,451 मीटर, ₹361.26 करोड़)", mr: "नाशिक: १० नवे घाट (३,४५१ मीटर, ₹३६१.२६ कोटी)" },
  trimbak: { en: "Trimbakeshwar: 2 new ghats (₹146.10 crore)", hi: "त्र्यंबकेश्वर: 2 नए घाट (₹146.10 करोड़)", mr: "त्र्यंबकेश्वर: २ नवे घाट (₹१४६.१० कोटी)" },
  trimbakBody: {
    en: "One on the left bank (1,614 m) and one on the right bank (1,526 m), built by the Water Resources Department.",
    hi: "एक बाएँ तट पर (1,614 मीटर) और एक दाएँ तट पर (1,526 मीटर), जलसंपदा विभाग द्वारा।",
    mr: "एक डाव्या तीरावर (१,६१४ मीटर) आणि एक उजव्या तीरावर (१,५२६ मीटर), जलसंपदा विभागामार्फत.",
  },
  conflict: {
    en: "Note: police briefings (TOI, 11 Aug 2026) describe the count as going from 9 to 18, while NTKMA says 10 to 20.",
    hi: "ध्यान दें: पुलिस की जानकारी (TOI, 11 अगस्त 2026) में संख्या 9 से 18 बताई गई है, जबकि NTKMA 10 से 20 कहता है।",
    mr: "टीप: पोलिसांच्या माहितीत (TOI, ११ ऑगस्ट २०२६) ही संख्या ९ वरून १८ सांगितली आहे, तर NTKMA १० वरून २० म्हणते.",
  },
  kushTitle: { en: "Kushavarta, Trimbakeshwar", hi: "कुशावर्त, त्र्यंबकेश्वर", mr: "कुशावर्त, त्र्यंबकेश्वर" },
  kushBody: {
    en: "Kushavarta is the main bathing tank in Trimbakeshwar, where the Shaiva akhadas take their Amrit Snans. It is closed to pilgrims from 30 September 2026 for renovation, and the renovated kund is to open around 31 October (sources differ by a day).",
    hi: "कुशावर्त त्र्यंबकेश्वर का मुख्य स्नान कुंड है, जहाँ शैव अखाड़े अमृत स्नान करते हैं। यह 30 सितंबर 2026 से जीर्णोद्धार के लिए श्रद्धालुओं के लिए बंद है, और नया कुंड लगभग 31 अक्टूबर को खुलना है (स्रोतों में एक दिन का अंतर है)।",
    mr: "कुशावर्त हा त्र्यंबकेश्वरमधील मुख्य स्नान कुंड आहे, जिथे शैव आखाडे अमृत स्नान करतात. तो ३० सप्टेंबर २०२६ पासून नूतनीकरणासाठी भाविकांना बंद आहे, आणि नूतनीकृत कुंड साधारण ३१ ऑक्टोबरला खुला होणार आहे (स्रोतांमध्ये एका दिवसाचा फरक आहे).",
  },
  more: { en: "Read the full story", hi: "पूरी खबर पढ़ें", mr: "संपूर्ण बातमी वाचा" },
  trimbakPage: { en: "Trimbakeshwar Kumbh 2027 guide", hi: "त्र्यंबकेश्वर कुंभ 2027 गाइड", mr: "त्र्यंबकेश्वर कुंभ 2027 मार्गदर्शक" },
  metres: { en: "m", hi: "मीटर", mr: "मीटर" },
};

export default function NewGhats2027() {
  const { t, locale } = useLanguage();
  const num = (n: number) => n.toLocaleString(locale === "mr" ? "mr-IN" : "en-IN");

  return (
    <section className="relative bg-[#0B1220] py-20 md:py-28" aria-labelledby="new-ghats-title">
      <div className="section-container mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">{t(COPY.kicker)}</p>
        <h2 id="new-ghats-title" className="mt-3 font-heading text-3xl font-bold text-cream-100 md:text-5xl">
          {t(COPY.title)}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-cream-300/70">{t(COPY.intro)}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="card-dark p-6">
            <h3 className="font-heading text-xl font-bold text-cream-100">{t(COPY.nashik)}</h3>
            <ul className="mt-4 divide-y divide-white/5">
              {NASHIK_GHATS.map((g) => (
                <li key={g.name.en} className="flex justify-between py-2 text-cream-300/80">
                  <span>{t(g.name)}</span>
                  <span className="text-cream-300/50">
                    {num(g.m)} {t(COPY.metres)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div className="card-dark p-6">
              <h3 className="font-heading text-xl font-bold text-cream-100">{t(COPY.trimbak)}</h3>
              <p className="mt-3 leading-relaxed text-cream-300/80">{t(COPY.trimbakBody)}</p>
            </div>
            <div className="card-dark border-l-4 p-6" style={{ borderLeftColor: "#C9A227" }}>
              <h3 className="font-heading text-xl font-bold text-cream-100">{t(COPY.kushTitle)}</h3>
              <p className="mt-3 leading-relaxed text-cream-300/80">{t(COPY.kushBody)}</p>
              <Link href="/trimbakeshwar-kumbh-2027" className="rich-link mt-3 inline-block text-sm text-[#DFCC78]">
                {t(COPY.trimbakPage)}
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-cream-300/50">{t(COPY.conflict)}</p>
        <Link
          href="/blog/12-new-ghats-nashik-trimbakeshwar-march-2027"
          className="rich-link mt-4 inline-block text-sm text-[#DFCC78]"
        >
          {t(COPY.more)}
        </Link>
      </div>
    </section>
  );
}

"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

// Source: NTKMA review meeting, Times of India, 13 Oct 2026 (confirmed).
// Mirrors src/data/news/dhwajarohan-prep-deadline-oct-20.ts.
const SRC =
  "https://timesofindia.indiatimes.com/city/nashik/kumbh-authority-sets-oct-20-deadline-for-dhwajarohan-preparations/articleshow/134924262.cms";
const POST = "/blog/kumbh-authority-sets-october-20-deadline-for-dhwajarohan-preparations";

const COPY = {
  title: {
    en: "Events before the Dhwajarohan (October 2026)",
    hi: "ध्वजारोहण से पहले के कार्यक्रम (अक्टूबर 2026)",
    mr: "ध्वजारोहणापूर्वीचे कार्यक्रम (ऑक्टोबर २०२६)",
  },
  intro: {
    en: "The Kumbh flag hoisting (Dhwajarohan) is on 31 October 2026 at 12:02 PM. NTKMA has listed these events before it:",
    hi: "कुंभ ध्वजारोहण 31 अक्टूबर 2026 को दोपहर 12:02 बजे है। NTKMA ने इससे पहले ये कार्यक्रम बताए हैं:",
    mr: "कुंभ ध्वजारोहण ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजता आहे. NTKMA ने त्यापूर्वी हे कार्यक्रम जाहीर केले आहेत:",
  },
  rows: [
    { d: { en: "17 October", hi: "17 अक्टूबर", mr: "१७ ऑक्टोबर" }, e: { en: "Gram sabha at Trimbakeshwar", hi: "त्र्यंबकेश्वर में ग्राम सभा", mr: "त्र्यंबकेश्वर येथे ग्रामसभा" } },
    { d: { en: "20 October", hi: "20 अक्टूबर", mr: "२० ऑक्टोबर" }, e: { en: "'Har Ghar Kumbh Dhwaj' campaign; deadline for departments' micro-planning", hi: "'हर घर कुंभ ध्वज' अभियान; विभागों की सूक्ष्म योजना की अंतिम तिथि", mr: "'हर घर कुंभ ध्वज' अभियान; विभागांच्या सूक्ष्म नियोजनाची मुदत" } },
    { d: { en: "25 October", hi: "25 अक्टूबर", mr: "२५ ऑक्टोबर" }, e: { en: "'Shankhnaad', a Guinness World Records attempt", hi: "'शंखनाद', गिनीज़ वर्ल्ड रिकॉर्ड्स का प्रयास", mr: "'शंखनाद', गिनीज वर्ल्ड रेकॉर्ड्सचा प्रयत्न" } },
    { d: { en: "31 October, 12:02 PM", hi: "31 अक्टूबर, दोपहर 12:02", mr: "३१ ऑक्टोबर, दुपारी १२:०२" }, e: { en: "Dhwajarohan (flag hoisting)", hi: "ध्वजारोहण", mr: "ध्वजारोहण" } },
  ],
  note: {
    en: "Source: Times of India, 13 Oct 2026. Timings for the 17–25 October events have not been announced.",
    hi: "स्रोत: टाइम्स ऑफ इंडिया, 13 अक्टूबर 2026। 17–25 अक्टूबर के कार्यक्रमों का समय घोषित नहीं हुआ है।",
    mr: "स्रोत: टाइम्स ऑफ इंडिया, १३ ऑक्टोबर २०२६. १७–२५ ऑक्टोबरच्या कार्यक्रमांच्या वेळा जाहीर झालेल्या नाहीत.",
  },
  more: { en: "Read the full update", hi: "पूरी खबर पढ़ें", mr: "संपूर्ण बातमी वाचा" },
};

export default function PreDhwajarohanEvents() {
  const { locale } = useLanguage();
  return (
    <section className="bg-cream-50 py-12" aria-labelledby="pre-dhwaj-title">
      <div className="section-container mx-auto max-w-3xl">
        <h2 id="pre-dhwaj-title" className="font-heading text-2xl font-bold text-temple-900 md:text-3xl">
          {COPY.title[locale]}
        </h2>
        <p className="mt-3 text-temple-600">{COPY.intro[locale]}</p>
        <table className="mt-5 w-full border-collapse text-left text-temple-800">
          <tbody>
            {COPY.rows.map((r) => (
              <tr key={r.d.en} className="border-b border-temple-200">
                <th scope="row" className="whitespace-nowrap py-2 pr-4 font-semibold">{r.d[locale]}</th>
                <td className="py-2">{r.e[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm text-temple-500">
          <a href={SRC} target="_blank" rel="noopener noreferrer" className="underline">{COPY.note[locale]}</a>{" "}
          <Link href={POST} className="font-semibold underline">{COPY.more[locale]}</Link> ·{" "}
          <Link href="/dhwajarohan-2026" className="underline">Dhwajarohan 2026</Link>
        </p>
      </div>
    </section>
  );
}

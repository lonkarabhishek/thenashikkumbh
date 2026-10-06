import { schedule } from "@/data/verified";
import type { Locale } from "@/i18n/translations";

/**
 * Plain-language answers to the date questions people search for. Shared by
 * the visible FAQ on /dates and its FAQPage structured data, so the two can
 * never disagree. Dates come from the verified schedule.
 */

const DATE_LOCALE: Record<Locale, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

export function formatScheduleDate(iso: string, locale: Locale) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export const amritSnans = schedule
  .filter((e) => e.isAmritSnan)
  .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
const opening = schedule.find((e) => e.id === "dhwajarohan");
const closing = schedule.find((e) => e.id === "conclusion");
const closingTrimbak = schedule.find((e) => e.id === "conclusion-trimbak");

type L10n = Record<Locale, string>;

export function datesFaqs(locale: Locale): { q: L10n; a: L10n }[] {
  const d = (iso?: string) => (iso ? formatScheduleDate(iso, locale) : "");
  const [first, second, thirdNashik, thirdTrimbak] = amritSnans.map((e) => d(e.isoDate));

  return [
    {
      q: {
        en: "When is the Nashik Kumbh Mela 2027?",
        hi: "नाशिक कुंभ मेला 2027 कब है?",
        mr: "नाशिक कुंभमेळा २०२७ कधी आहे?",
      },
      a: {
        en: `It starts with flag hoisting (Dhwajarohan) on ${d(opening?.isoDate)} and closes on ${d(closing?.isoDate)} in Nashik and ${d(closingTrimbak?.isoDate)} in Trimbakeshwar. The main bathing days, the Amrit Snans, are in August and September 2027.`,
        hi: `यह ${d(opening?.isoDate)} को ध्वजारोहण से शुरू होता है और नाशिक में ${d(closing?.isoDate)} तथा त्र्यंबकेश्वर में ${d(closingTrimbak?.isoDate)} को समाप्त होता है। मुख्य स्नान, यानी अमृत स्नान, अगस्त और सितंबर 2027 में हैं।`,
        mr: `तो ${d(opening?.isoDate)} रोजी ध्वजारोहणाने सुरू होतो आणि नाशिकमध्ये ${d(closing?.isoDate)} व त्र्यंबकेश्वरमध्ये ${d(closingTrimbak?.isoDate)} रोजी संपतो. मुख्य स्नाने, म्हणजे अमृत स्नान, ऑगस्ट आणि सप्टेंबर २०२७ मध्ये आहेत.`,
      },
    },
    {
      q: {
        en: "What are the Shahi Snan dates for Nashik Kumbh 2027?",
        hi: "नाशिक कुंभ 2027 की शाही स्नान तिथियाँ क्या हैं?",
        mr: "नाशिक कुंभ २०२७ च्या शाही स्नानाच्या तारखा कोणत्या?",
      },
      a: {
        en: `First: ${first}. Second: ${second}. Third: ${thirdNashik} at Nashik and ${thirdTrimbak} at Trimbakeshwar.`,
        hi: `पहला: ${first}। दूसरा: ${second}। तीसरा: नाशिक में ${thirdNashik} और त्र्यंबकेश्वर में ${thirdTrimbak}।`,
        mr: `पहिले: ${first}. दुसरे: ${second}. तिसरे: नाशिकला ${thirdNashik} आणि त्र्यंबकेश्वरला ${thirdTrimbak}.`,
      },
    },
    {
      q: {
        en: "Is Shahi Snan the same as Amrit Snan?",
        hi: "क्या शाही स्नान और अमृत स्नान एक ही हैं?",
        mr: "शाही स्नान आणि अमृत स्नान एकच आहे का?",
      },
      a: {
        en: "Yes. The Maharashtra government now calls the Shahi Snan the Amrit Snan, the same name used at Prayagraj in 2025. The dates and the ritual are the same.",
        hi: "हाँ। महाराष्ट्र सरकार अब शाही स्नान को अमृत स्नान कहती है, वही नाम जो 2025 में प्रयागराज में इस्तेमाल हुआ। तिथियाँ और विधि वही हैं।",
        mr: "हो. महाराष्ट्र सरकार आता शाही स्नानाला अमृत स्नान म्हणते, जे नाव २०२५ मध्ये प्रयागराजला वापरले गेले. तारखा आणि विधी तेच आहेत.",
      },
    },
    {
      q: {
        en: "Is there a Shahi Snan in 2026?",
        hi: "क्या 2026 में शाही स्नान है?",
        mr: "२०२६ मध्ये शाही स्नान आहे का?",
      },
      a: {
        en: `No. In 2026 there is only the opening flag hoisting on ${d(opening?.isoDate)}. All Amrit Snans are in 2027.`,
        hi: `नहीं। 2026 में केवल ${d(opening?.isoDate)} को उद्घाटन ध्वजारोहण है। सभी अमृत स्नान 2027 में हैं।`,
        mr: `नाही. २०२६ मध्ये फक्त ${d(opening?.isoDate)} रोजी उद्घाटनाचे ध्वजारोहण आहे. सर्व अमृत स्नाने २०२७ मध्ये आहेत.`,
      },
    },
    {
      q: {
        en: "Where does the Amrit Snan happen?",
        hi: "अमृत स्नान कहाँ होता है?",
        mr: "अमृत स्नान कुठे होते?",
      },
      a: {
        en: "At Ram Kund on the Godavari in Nashik, where the Vaishnav akhadas bathe, and at Kushavarta in Trimbakeshwar, where the Shaiva akhadas bathe.",
        hi: "नाशिक में गोदावरी पर रामकुंड में, जहाँ वैष्णव अखाड़े स्नान करते हैं, और त्र्यंबकेश्वर में कुशावर्त में, जहाँ शैव अखाड़े स्नान करते हैं।",
        mr: "नाशिकमध्ये गोदावरीवरील रामकुंडात, जिथे वैष्णव आखाडे स्नान करतात, आणि त्र्यंबकेश्वरमध्ये कुशावर्तात, जिथे शैव आखाडे स्नान करतात.",
      },
    },
    {
      q: {
        en: "What time does the Amrit Snan start?",
        hi: "अमृत स्नान किस समय शुरू होता है?",
        mr: "अमृत स्नान किती वाजता सुरू होते?",
      },
      a: {
        en: "Official timings are not published yet. The akhadas bathe first, well before dawn, and the public follows after them. We will add the times here once the authority announces them.",
        hi: "आधिकारिक समय अभी घोषित नहीं हुआ है। अखाड़े पहले, भोर से काफ़ी पहले स्नान करते हैं, उसके बाद आम श्रद्धालु। प्रशासन के घोषणा करते ही हम समय यहाँ जोड़ेंगे।",
        mr: "अधिकृत वेळा अजून जाहीर झालेल्या नाहीत. आखाडे आधी, पहाटेच्या बऱ्याच आधी स्नान करतात आणि त्यानंतर सामान्य भाविक. प्रशासनाने जाहीर करताच आम्ही वेळा इथे देऊ.",
      },
    },
    {
      q: {
        en: "When was the last Kumbh Mela in Nashik?",
        hi: "नाशिक में पिछला कुंभ मेला कब हुआ था?",
        mr: "नाशिकमध्ये मागचा कुंभमेळा कधी झाला?",
      },
      a: {
        en: "In 2015. The Simhastha comes to Nashik and Trimbakeshwar once every twelve years, so 2027 is the next one.",
        hi: "2015 में। सिंहस्थ नाशिक और त्र्यंबकेश्वर में हर बारह साल में एक बार आता है, इसलिए अगला 2027 में है।",
        mr: "२०१५ मध्ये. सिंहस्थ नाशिक आणि त्र्यंबकेश्वरला दर बारा वर्षांनी एकदा येतो, म्हणून पुढचा २०२७ मध्ये आहे.",
      },
    },
  ];
}

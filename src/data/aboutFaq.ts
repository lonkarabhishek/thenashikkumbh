import { schedule, scheduleSources } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { formatDate } from "@/lib/dates";

/**
 * Plain answers for /about ("What is Kumbh Mela", history, why Nashik and
 * Trimbakeshwar, when the last and next Simhastha are). Shared by the visible
 * answers on the page and the FAQPage structured data in the layout, so the
 * two can never disagree. Upcoming dates come from the verified schedule;
 * /dates stays the canonical page for the full date list.
 *
 * History facts are from the Wikipedia articles listed in ABOUT_SOURCES.
 */

type L10n = Record<Locale, string>;

const opening = schedule.find((e) => e.id === "dhwajarohan");
const amrit = schedule
  .filter((e) => e.isAmritSnan)
  .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

export const ABOUT_SOURCES: { label: string; url: string }[] = [
  {
    label: "Wikipedia: Kumbh Mela",
    url: "https://en.wikipedia.org/wiki/Kumbh_Mela",
  },
  {
    label: "Wikipedia: Nashik-Trimbakeshwar Simhastha",
    url: "https://en.wikipedia.org/wiki/Nashik-Trimbakeshwar_Simhastha",
  },
  {
    label: "Wikipedia: 2015 Nashik-Trimbakeshwar Simhastha",
    url: "https://en.wikipedia.org/wiki/2015_Nashik-Trimbakeshwar_Simhastha",
  },
  {
    label: scheduleSources.NTKMA_PLAN.org + ": " + scheduleSources.NTKMA_PLAN.title,
    url: scheduleSources.NTKMA_PLAN.url,
  },
];

export function aboutInBrief(locale: Locale): string {
  const d = (iso?: string) => (iso ? formatDate(iso, locale) : "");
  const open = d(opening?.isoDate);
  const copy: L10n = {
    mr: `कुंभमेळा ही हिंदूंची तीर्थयात्रा भारतात चार ठिकाणी भरते: प्रयागराज, हरिद्वार, उज्जैन आणि नाशिक–त्र्यंबकेश्वर. नाशिकच्या कुंभमेळ्याला सिंहस्थ म्हणतात, कारण तो गुरू सिंह राशीत असताना, साधारण दर १२ वर्षांनी भरतो. भाविक नाशिकमधील रामकुंडावर आणि त्र्यंबकेश्वरमधील कुशावर्तावर गोदावरीत स्नान करतात. मागचा सिंहस्थ २०१५–१६ मध्ये झाला; पुढचा ${open} रोजी ध्वजारोहणाने सुरू होईल आणि त्याची अमृत स्नाने ऑगस्ट–सप्टेंबर २०२७ मध्ये आहेत.`,
    hi: `कुंभ मेला हिंदुओं की तीर्थयात्रा है जो भारत में चार जगह लगती है: प्रयागराज, हरिद्वार, उज्जैन और नाशिक–त्र्यंबकेश्वर। नाशिक के कुंभ को सिंहस्थ कहते हैं, क्योंकि यह तब लगता है जब बृहस्पति (गुरु) सिंह राशि में होते हैं, यानी लगभग हर 12 साल में। श्रद्धालु नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर गोदावरी में स्नान करते हैं। पिछला सिंहस्थ 2015–16 में हुआ था; अगला ${open} को ध्वजारोहण से शुरू होगा और इसके अमृत स्नान अगस्त–सितंबर 2027 में हैं।`,
    en: `Kumbh Mela is a Hindu pilgrimage held at four places in India: Prayagraj, Haridwar, Ujjain and Nashik–Trimbakeshwar. In Nashik it is called Simhastha, because it is held when Jupiter (Guru) is in Leo (Simha), roughly once every 12 years. Pilgrims bathe in the Godavari at Ramkund in Nashik and at Kushavarta in Trimbakeshwar. The last one was in 2015–16; the next begins with flag hoisting (Dhwajarohan) on ${open}, and its Amrit Snans fall in August and September 2027.`,
  };
  return copy[locale];
}

export function aboutFaqs(locale: Locale): { q: L10n; a: L10n }[] {
  const d = (iso?: string) => (iso ? formatDate(iso, locale) : "");
  const [first, second, thirdNashik, thirdTrimbak] = amrit.map((e) => d(e.isoDate));
  const open = d(opening?.isoDate);

  return [
    {
      q: {
        mr: "कुंभमेळा म्हणजे काय?",
        hi: "कुंभ मेला क्या है?",
        en: "What is Kumbh Mela?",
      },
      a: {
        mr: "कुंभमेळा ही प्रयागराज, हरिद्वार, उज्जैन आणि नाशिक या चार ठिकाणी भरणारी हिंदू तीर्थयात्रा आहे. पुराणांनुसार समुद्रमंथनातून निघालेल्या अमृताचे थेंब या चार ठिकाणी पडले. पवित्र नदीत स्नान हा मेळ्याचा मुख्य विधी आहे. युनेस्कोच्या मानवतेच्या अमूर्त सांस्कृतिक वारसा यादीत कुंभमेळ्याचा समावेश आहे.",
        hi: "कुंभ मेला प्रयागराज, हरिद्वार, उज्जैन और नाशिक, इन चार जगहों पर लगने वाली हिंदू तीर्थयात्रा है। पुराणों के अनुसार समुद्र मंथन से निकले अमृत की बूँदें इन्हीं चार जगहों पर गिरी थीं। पवित्र नदी में स्नान इस मेले का मुख्य अनुष्ठान है। यूनेस्को ने कुंभ मेले को मानवता की अमूर्त सांस्कृतिक विरासत की सूची में शामिल किया है।",
        en: "Kumbh Mela is a Hindu pilgrimage held at four places: Prayagraj, Haridwar, Ujjain and Nashik. According to the Puranas, drops of amrit (divine nectar) from the Samudra Manthan fell at these four sites. A bath in the sacred river is the central ritual. Kumbh Mela is on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity.",
      },
    },
    {
      q: {
        mr: "नाशिकच्या कुंभमेळ्याला सिंहस्थ का म्हणतात?",
        hi: "नाशिक के कुंभ को सिंहस्थ क्यों कहते हैं?",
        en: "Why is the Nashik Kumbh called Simhastha?",
      },
      a: {
        mr: "गुरू (बृहस्पती) सिंह राशीत असताना हा मेळा भरतो, म्हणून त्याला सिंहस्थ म्हणतात. गुरू साधारण १२ वर्षांनी पुन्हा सिंह राशीत येतो, त्यामुळे नाशिक–त्र्यंबकेश्वरला कुंभमेळा दर १२ वर्षांनी होतो. १६९५ च्या 'खुलासत-उत-तवारीख' या ग्रंथातही, गुरू सिंह राशीत गेल्यावर त्र्यंबकला भरणाऱ्या मोठ्या मेळ्याचा उल्लेख आहे.",
        hi: "यह मेला तब लगता है जब बृहस्पति (गुरु) सिंह राशि में होते हैं, इसलिए इसे सिंहस्थ कहते हैं। बृहस्पति लगभग 12 साल में फिर सिंह राशि में आते हैं, इसलिए नाशिक–त्र्यंबकेश्वर में कुंभ हर 12 साल में होता है। 1695 के ग्रंथ 'ख़ुलासत-उत-तवारीख़' में भी बृहस्पति के सिंह राशि में आने पर त्र्यंबक में लगने वाले बड़े मेले का ज़िक्र है।",
        en: "It is held when Jupiter (Guru or Brihaspati) is in Leo (Simha), hence the name Simhastha. Jupiter returns to Leo roughly every 12 years, so the Kumbh comes back to Nashik–Trimbakeshwar about once in 12 years. The Khulasat-ut-Tawarikh (1695 CE) already describes a large gathering at Trimbak whenever Jupiter entered Leo.",
      },
    },
    {
      q: {
        mr: "कुंभमेळा नाशिक आणि त्र्यंबकेश्वर अशा दोन ठिकाणी का भरतो?",
        hi: "कुंभ मेला नाशिक और त्र्यंबकेश्वर, दो जगह क्यों लगता है?",
        en: "Why is the Kumbh held at both Nashik and Trimbakeshwar?",
      },
      a: {
        mr: "१७८९ पर्यंत हा मेळा फक्त त्र्यंबकला भरत असे. त्या वर्षी स्नानाच्या क्रमावरून शैव संन्यासी आणि वैष्णव बैरागी यांच्यात संघर्ष झाला. त्यानंतर पेशव्यांनी वैष्णवांचे स्नानस्थळ नाशिकमधील रामकुंडावर हलवले. तेव्हापासून वैष्णव आखाडे रामकुंडावर आणि शैव आखाडे त्र्यंबकेश्वरच्या कुशावर्तावर स्नान करतात.",
        hi: "1789 तक यह मेला सिर्फ़ त्र्यंबक में लगता था। उस साल स्नान के क्रम को लेकर शैव संन्यासियों और वैष्णव बैरागियों में संघर्ष हुआ। इसके बाद पेशवा ने वैष्णवों का स्नान स्थल नाशिक के रामकुंड पर कर दिया। तब से वैष्णव अखाड़े रामकुंड पर और शैव अखाड़े त्र्यंबकेश्वर के कुशावर्त पर स्नान करते हैं।",
        en: "Until 1789 the fair was held only at Trimbak. That year Shaiva sanyasis and Vaishnava bairagis clashed over the order of bathing, and the Maratha Peshwa moved the Vaishnava bathing place to Ramkund in Nashik. Since then the Vaishnava akhadas bathe at Ramkund and the Shaiva akhadas at Kushavarta in Trimbakeshwar.",
      },
    },
    {
      q: {
        mr: "नाशिकमध्ये मागचा कुंभमेळा कधी झाला?",
        hi: "नाशिक में पिछला कुंभ मेला कब हुआ था?",
        en: "When was the last Kumbh Mela in Nashik?",
      },
      a: {
        mr: "मागचा नाशिक–त्र्यंबकेश्वर सिंहस्थ २०१५–१६ मध्ये झाला. तो मुख्यतः जुलै ते सप्टेंबर २०१५ दरम्यान भरला होता आणि त्याची सुरुवात ध्वजारोहणाने रामकुंड व कुशावर्त येथे झाली होती. त्याआधीचा सिंहस्थ २००३ मध्ये (२७ जुलै ते ७ सप्टेंबर) झाला होता.",
        hi: "पिछला नाशिक–त्र्यंबकेश्वर सिंहस्थ 2015–16 में हुआ था। यह मुख्य रूप से जुलाई से सितंबर 2015 के बीच लगा था, और इसकी शुरुआत रामकुंड व कुशावर्त पर ध्वजारोहण से हुई थी। उससे पहले का सिंहस्थ 2003 में (27 जुलाई से 7 सितंबर) हुआ था।",
        en: "The last Nashik–Trimbakeshwar Simhastha was in 2015–16. It was held mainly from July to September 2015 and opened with flag hoisting at Ramkund and Kushavarta. The one before that was in 2003 (27 July to 7 September).",
      },
    },
    {
      q: {
        mr: "पुढचा नाशिक कुंभमेळा कधी आहे?",
        hi: "अगला नाशिक कुंभ मेला कब है?",
        en: "When is the next Nashik Kumbh Mela?",
      },
      a: {
        mr: `पुढचा सिंहस्थ ${open} रोजी दुपारी १२:०२ वाजता ध्वजारोहणाने सुरू होईल. अमृत स्नान: ${first}, ${second} आणि ${thirdNashik} (नाशिक) / ${thirdTrimbak} (त्र्यंबकेश्वर). सर्व तारखा आणि पर्वस्नाने 'महत्त्वाच्या तारखा' पानावर आहेत.`,
        hi: `अगला सिंहस्थ ${open} को दोपहर 12:02 बजे ध्वजारोहण से शुरू होगा। अमृत स्नान: ${first}, ${second} और ${thirdNashik} (नाशिक) / ${thirdTrimbak} (त्र्यंबकेश्वर)। सारी तिथियाँ और पर्व स्नान 'महत्वपूर्ण तिथियाँ' पेज पर हैं।`,
        en: `The next Simhastha opens with flag hoisting on ${open} at 12:02 PM. Amrit Snans: ${first}, ${second} and ${thirdNashik} (Nashik) / ${thirdTrimbak} (Trimbakeshwar). The full list of dates and bathing days is on the Important Dates page.`,
      },
    },
  ];
}

import { schedule, scheduleSources } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { formatDate, formatTime } from "@/lib/dates";

/**
 * Plain answers for /ghats: which ghats Nashik has (by name), where the Amrit
 * Snans happen, the 12 new ghats for 2027, whether Ramkund and Kushavarta are
 * open right now, and why the Godavari and Ramkund are sacred. Shared by the
 * visible answers on the page and the FAQPage schema in the layout, so the two
 * cannot disagree. /ghats is the canonical page for ghat questions; /dates
 * stays the canonical page for the date list, so dates are linked, not listed.
 *
 * Facts: Amrit Snan and Dhwajarohan sites from src/data/verified (NTKMA plan);
 * new ghats from Punekar News 30 Mar 2026 (NTKMA Commissioner Shekhar Singh)
 * and TOI 11 Aug 2026; Ramkund restriction from TOI 13 Oct 2026; Kushavarta
 * closure from TOI 29 Sep 2026 and Lokmat Times 4 Oct 2026; Godavari facts
 * from Wikipedia. Mirrors NewGhats2027, RamkundNotice and the news posts.
 */

type L10n = Record<Locale, string>;

const opening = schedule.find((e) => e.id === "dhwajarohan");

export const GHATS_SOURCES: { label: string; url: string }[] = [
  {
    label: scheduleSources.NTKMA_PLAN.org + ": " + scheduleSources.NTKMA_PLAN.title,
    url: scheduleSources.NTKMA_PLAN.url,
  },
  {
    label: "Punekar News: 12 new ghats along the Godavari (30 Mar 2026)",
    url: "https://www.punekarnews.in/simhastha-2027-12-new-ghats-to-come-up-along-godavari-in-nashik-and-trimbakeshwar/",
  },
  {
    label: "Times of India: Ramkund closed for 15–20 days (13 Oct 2026)",
    url: "https://timesofindia.indiatimes.com/city/nashik/ramkund-closed-for-15-20-days-as-nashik-civic-body-races-to-wrap-up-kumbh-works/articleshow/134901215.cms",
  },
  {
    label: "Times of India: Ramkund finds its rhythm again as Simhastha Kumbh begins (31 Oct 2026)",
    url: "https://timesofindia.indiatimes.com/city/nashik/ramkund-finds-its-rhythm-again-as-simhastha-kumbh-begins/articleshow/135409498.cms",
  },
  {
    label: "Times of India: Kushavarta closed for renovation (29 Sep 2026)",
    url: "https://timesofindia.indiatimes.com/city/nashik/kushavarta-teerth-to-remain-closed-for-month-long-renovation/articleshow/134572629.cms",
  },
  {
    label: "Times of India: police briefing on ghat count (11 Aug 2026)",
    url: "https://timesofindia.indiatimes.com/city/nashik/nashik-police-likely-to-get-two-additional-dcps-for-kumbh-mela/articleshow/133159847.cms",
  },
  {
    label: "Wikipedia: Godavari River",
    url: "https://en.wikipedia.org/wiki/Godavari_River",
  },
];

export function ghatsInBrief(locale: Locale): string {
  const copy: L10n = {
    mr: "नाशिक कुंभमेळ्याचे मुख्य स्नान पंचवटीतील रामकुंडावर होते; इथे वैष्णव आखाडे गोदावरीत अमृत स्नान करतात. त्र्यंबकेश्वरमध्ये शैव आखाड्यांचे स्नान कुशावर्त तीर्थावर होते. रामकुंडाच्या आसपास गोदावरीकाठी आणखी घाट आहेत, आणि सिंहस्थ २०२७ साठी १२ नवे घाट बांधले जात आहेत: नाशिकमध्ये १० आणि त्र्यंबकेश्वरमध्ये २, मार्च २०२७ पर्यंत. ऑक्टोबर २०२६ मध्ये ध्वजारोहणापूर्वीच्या कामांमुळे रामकुंड आणि कुशावर्त या दोन्ही ठिकाणी भाविकांचा प्रवेश मर्यादित आहे.",
    hi: "नाशिक कुंभ का मुख्य स्नान पंचवटी के रामकुंड पर होता है; यहाँ वैष्णव अखाड़े गोदावरी में अमृत स्नान करते हैं। त्र्यंबकेश्वर में शैव अखाड़ों का स्नान कुशावर्त तीर्थ पर होता है। रामकुंड के आसपास गोदावरी किनारे और भी घाट हैं, और सिंहस्थ 2027 के लिए 12 नए घाट बन रहे हैं: नाशिक में 10 और त्र्यंबकेश्वर में 2, मार्च 2027 तक। अक्टूबर 2026 में ध्वजारोहण से पहले के कामों की वजह से रामकुंड और कुशावर्त, दोनों जगह श्रद्धालुओं का प्रवेश सीमित है।",
    en: "The main Nashik Kumbh bath is at Ramkund in Panchavati, where the Vaishnava akhadas take their Amrit Snan in the Godavari. In Trimbakeshwar, the Shaiva akhadas bathe at Kushavarta. More ghats line the Godavari around Ramkund, and 12 new ghats are being built for Simhastha 2027: 10 in Nashik and 2 in Trimbakeshwar, due by March 2027. In October 2026, access to both Ramkund and Kushavarta is restricted while works finish before the flag hoisting.",
  };
  return copy[locale];
}

export function ghatsFaqs(locale: Locale): { q: L10n; a: L10n }[] {
  const open = opening ? formatDate(opening.isoDate, locale) : "";
  const time = opening?.startTime ? formatTime(opening.startTime, locale) : "";

  return [
    {
      q: {
        mr: "नाशिकमधील मुख्य घाट कोणते? घाटांची नावे काय आहेत?",
        hi: "नाशिक के मुख्य घाट कौन से हैं? घाटों के नाम क्या हैं?",
        en: "What are the main ghats in Nashik, and what are they called?",
      },
      a: {
        mr: "सर्वात महत्त्वाचा घाट म्हणजे पंचवटीतील रामकुंड. त्याच्या जवळच गोदावरीकाठचे घाट आणि कपालेश्वर मंदिराचा घाट आहे, आणि कालाराम मंदिर व सीता गुंफा असलेली पंचवटी काही अंतरावरच आहे. त्र्यंबकेश्वरमधील मुख्य स्नान कुंड कुशावर्त आहे. सिंहस्थ २०२७ साठी नाशिकमध्ये बांधले जाणारे नवे घाट: कपिला संगम, नंदिनी संगम, टाकळी संगम पूल, टाकळी संगम, नांदूर दसक (डावा आणि उजवा तीर), ओढा, सोमेश्वर धबधबा, नवश्या गणपती आणि लक्ष्मीनारायण.",
        hi: "सबसे अहम घाट पंचवटी का रामकुंड है। इसके पास ही गोदावरी किनारे के घाट और कपालेश्वर मंदिर का घाट है, और कालाराम मंदिर व सीता गुफा वाली पंचवटी थोड़ी ही दूरी पर है। त्र्यंबकेश्वर का मुख्य स्नान कुंड कुशावर्त है। सिंहस्थ 2027 के लिए नाशिक में बन रहे नए घाट: कपिला संगम, नंदिनी संगम, टाकली संगम पुल, टाकली संगम, नांदूर दसक (बायाँ और दायाँ तट), ओढा, सोमेश्वर जलप्रपात, नवश्या गणपति और लक्ष्मीनारायण।",
        en: "The most important ghat is Ramkund in Panchavati. Next to it are the Godavari ghats and the Kapaleshwar temple ghat, and Panchavati, with the Kalaram temple and Sita Gufa, is a short walk away. In Trimbakeshwar the main bathing tank is Kushavarta. The new ghats being built in Nashik for Simhastha 2027 are Kapila Sangam, Nandini Sangam, Takali Sangam Bridge, Takali Sangam, Nandur Dasak (left and right banks), Odha, Someshwar Waterfall, Navashya Ganpati and Lakshminarayan.",
      },
    },
    {
      q: {
        mr: "कुंभमेळ्यातील अमृत स्नान (शाही स्नान) कोणत्या घाटावर होते?",
        hi: "कुंभ का अमृत स्नान (शाही स्नान) किस घाट पर होता है?",
        en: "Which ghat is the Amrit Snan (Shahi Snan) held at?",
      },
      a: {
        mr: "NTKMA च्या आराखड्यानुसार नाशिकमध्ये अमृत स्नान रामकुंडावर होते, जिथे वैष्णव आखाडे स्नान करतात, आणि त्र्यंबकेश्वरमध्ये कुशावर्तावर, जिथे शैव आखाडे स्नान करतात. आधी आखाडे पाण्यात उतरतात, त्यानंतर सामान्य भाविक. तिसऱ्या अमृत स्नानाला आधी नाशिक आणि दुसऱ्या दिवशी त्र्यंबकेश्वर स्नान करते. सिंहस्थाची सुरुवात " + open + " रोजी " + time + " वाजता या दोन्ही ठिकाणी एकाच वेळी ध्वजारोहणाने होईल. सर्व तारखा तारखांच्या पानावर आहेत.",
        hi: "NTKMA की योजना के अनुसार नाशिक में अमृत स्नान रामकुंड पर होता है, जहाँ वैष्णव अखाड़े स्नान करते हैं, और त्र्यंबकेश्वर में कुशावर्त पर, जहाँ शैव अखाड़े स्नान करते हैं। पहले अखाड़े पानी में उतरते हैं, फिर आम श्रद्धालु। तीसरे अमृत स्नान में पहले नाशिक और अगले दिन त्र्यंबकेश्वर स्नान करता है। सिंहस्थ की शुरुआत " + open + " को " + time + " बजे इन दोनों जगहों पर एक साथ ध्वजारोहण से होगी। सभी तिथियाँ तिथियों वाले पेज पर हैं।",
        en: "Under the NTKMA plan, Nashik's Amrit Snans are at Ramkund, where the Vaishnava akhadas bathe, and Trimbakeshwar's are at Kushavarta, where the Shaiva akhadas bathe. The akhadas go into the water first and the public follows. For the third Amrit Snan, Nashik bathes first and Trimbakeshwar the next day. The Simhastha opens with flag hoisting at both sites at the same moment, at " + time + " on " + open + ". All the dates are on the dates page.",
      },
    },
    {
      q: {
        mr: "सिंहस्थ २०२७ साठी किती नवे घाट बांधले जात आहेत?",
        hi: "सिंहस्थ 2027 के लिए कितने नए घाट बन रहे हैं?",
        en: "How many new ghats are being built for Simhastha 2027?",
      },
      a: {
        mr: "एकूण १२. कुंभमेळा आयुक्त शेखर सिंह यांच्या माहितीनुसार (पुणेकर न्यूज, ३० मार्च २०२६) नाशिकमध्ये १० नवे घाट (एकूण ३,४५१ मीटर, ₹३६१.२६ कोटी) आणि त्र्यंबकेश्वरमध्ये २ (₹१४६.१० कोटी; डाव्या तीरावर १,६१४ मीटर आणि उजव्या तीरावर १,५२६ मीटर, जलसंपदा विभागामार्फत) उभारले जात आहेत. उद्दिष्ट मार्च २०२७ आहे. NTKMA नुसार नाशिकमधील घाट गोदावरीच्या सुमारे ९ किमी पट्ट्यात १० वरून २० होतील; पोलिसांच्या माहितीत (TOI, ११ ऑगस्ट २०२६) हा आकडा ९ वरून १८ सांगितला आहे.",
        hi: "कुल 12। कुंभ मेला आयुक्त शेखर सिंह के अनुसार (पुणेकर न्यूज़, 30 मार्च 2026) नाशिक में 10 नए घाट (कुल 3,451 मीटर, ₹361.26 करोड़) और त्र्यंबकेश्वर में 2 (₹146.10 करोड़; बाएँ तट पर 1,614 मीटर और दाएँ तट पर 1,526 मीटर, जलसंपदा विभाग द्वारा) बन रहे हैं। लक्ष्य मार्च 2027 है। NTKMA के अनुसार नाशिक में गोदावरी के लगभग 9 किमी हिस्से पर घाट 10 से बढ़कर 20 होंगे; पुलिस की जानकारी (TOI, 11 अगस्त 2026) में यह संख्या 9 से 18 बताई गई है।",
        en: "Twelve. According to Kumbh Mela Commissioner Shekhar Singh (Punekar News, 30 March 2026), Nashik is getting 10 new ghats (3,451 m in all, ₹361.26 crore) and Trimbakeshwar 2 (₹146.10 crore; 1,614 m on the left bank and 1,526 m on the right, built by the Water Resources Department). The target is March 2027. NTKMA says Nashik will go from 10 ghats to 20 along about 9 km of the Godavari; a police briefing (TOI, 11 August 2026) put it at 9 to 18.",
      },
    },
    {
      q: {
        mr: "आता (नोव्हेंबर २०२६) रामकुंड आणि कुशावर्तावर स्नान करता येते का?",
        hi: "अभी (नवंबर 2026) रामकुंड और कुशावर्त पर स्नान कर सकते हैं?",
        en: "Can I bathe at Ramkund and Kushavarta right now (November 2026)?",
      },
      a: {
        mr: "रामकुंडावर बहुतांशी हो, कुशावर्ताबद्दल अजून स्पष्टता नाही. जवळपास तीन महिन्यांनी ३० ऑक्टोबरला गंगापूर धरणाचे पाणी रामकुंडात पोहोचले आणि ३१ ऑक्टोबरच्या ध्वजारोहणाला घाटांवर भाविकांची गर्दी होती (टाइम्स ऑफ इंडिया, ३१ ऑक्टोबर), मात्र महापालिकेने निर्बंध उठवल्याची अधिकृत सूचना काढलेली नाही आणि घाटांची कामे मार्च २०२७ पर्यंत सुरू आहेत. त्र्यंबकेश्वरचे कुशावर्त ३० सप्टेंबरपासून नूतनीकरणासाठी बंद होते; ३१ ऑक्टोबरला तेथे ध्वज फडकला, पण सर्वसामान्य स्नान पुन्हा सुरू झाल्याची सूचना अजून आलेली नाही. ताजी स्थिती कुंभ स्थिती फलकावर पाहा.",
        hi: "रामकुंड पर ज़्यादातर हाँ, कुशावर्त पर अभी साफ़ नहीं। करीब तीन महीने बाद 30 अक्टूबर को गंगापुर बांध का पानी रामकुंड पहुँचा और 31 अक्टूबर के ध्वजारोहण पर घाटों पर श्रद्धालुओं की भीड़ थी (टाइम्स ऑफ इंडिया, 31 अक्टूबर), पर NMC ने प्रतिबंध हटाने की आधिकारिक सूचना नहीं दी है और घाटों का काम मार्च 2027 तक जारी है। त्र्यंबकेश्वर का कुशावर्त 30 सितंबर से नवीनीकरण के लिए बंद था; 31 अक्टूबर को वहाँ ध्वज फहराया गया, पर आम स्नान फिर शुरू होने की सूचना अभी नहीं आई है। ताज़ा स्थिति कुंभ स्टेटस बोर्ड पर देखें।",
        en: "Mostly yes at Ramkund, still unclear at Kushavarta. Water from Gangapur dam reached Ramkund on 30 October after nearly three months, and devotees crowded the ghats for the 31 October flag hoisting (Times of India, 31 October), but NMC has not issued a notice formally lifting its restriction and ghat works continue to March 2027. Kushavarta in Trimbakeshwar was closed for renovation from 30 September; the flag was hoisted there on 31 October, but no notice says ordinary bathing has resumed. See the Kumbh status board for the latest.",
      },
    },
    {
      q: {
        mr: "रामकुंड आणि गोदावरीला इतके पवित्र का मानतात?",
        hi: "रामकुंड और गोदावरी को इतना पवित्र क्यों माना जाता है?",
        en: "Why are Ramkund and the Godavari considered so sacred?",
      },
      a: {
        mr: "गोदावरी त्र्यंबकेश्वरला उगम पावते आणि सुमारे १,४६५ किमी वाहते; ती गंगेनंतरची भारतातील दुसरी सर्वात लांब नदी असून तिला दक्षिण गंगा म्हणतात. परंपरेनुसार वनवासात प्रभू श्रीरामांनी रामकुंडावर स्नान केले, म्हणून या कुंडाला विशेष महत्त्व आहे. अनेक कुटुंबे इथे अस्थी विसर्जन आणि पिंडदान करतात.",
        hi: "गोदावरी त्र्यंबकेश्वर से निकलती है और लगभग 1,465 किमी बहती है; यह गंगा के बाद भारत की दूसरी सबसे लंबी नदी है और इसे दक्षिण गंगा कहा जाता है। परंपरा के अनुसार वनवास के दौरान भगवान राम ने रामकुंड पर स्नान किया था, इसलिए इस कुंड का खास महत्व है। कई परिवार यहाँ अस्थि विसर्जन और पिंडदान करते हैं।",
        en: "The Godavari rises at Trimbakeshwar and flows about 1,465 km; it is India's second-longest river after the Ganges and is known as the Dakshina Ganga, the Ganges of the South. By tradition, Lord Rama bathed at Ramkund during his exile, which gives the kund its special place. Many families come here for asthi visarjan (immersing ashes) and pind daan.",
      },
    },
  ];
}

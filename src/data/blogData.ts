import { latestNews } from "@/data/news";

export type Locale = "en" | "hi" | "mr";
export type NewsCategory = "kumbh" | "infra" | "govt" | "culture" | "guide";

type L10n = { en: string; hi: string; mr: string };

/** One source behind a news post, linked at the foot of the article. */
export interface NewsSource {
  /** Headline or document title, in its original language. */
  title: string;
  /** Publisher or authority, e.g. "Times of India" or "PIB". */
  publisher: string;
  /** Date the source was published, YYYY-MM-DD. */
  date: string;
  url: string;
  /** CONFIRMED = official document or official on record; REPORTED = media only. */
  status: "confirmed" | "reported";
}

export interface BlogArticle {
  id: number;
  slug: string;
  title: L10n;
  /** Date this site published the post, YYYY-MM-DD. */
  date: string;
  /** Date the post was last materially updated, YYYY-MM-DD. */
  updated?: string;
  /** When the news itself was first announced, if earlier than `date`. */
  originallyAnnounced?: string;
  /** Short name of the main original source (shown in the meta row). */
  source: string;
  /** Every source behind the post, linked at the foot. */
  sources?: NewsSource[];
  category: NewsCategory;
  image: string;
  /** Wikimedia photo id from src/data/photos.ts, used when the file exists. */
  photoId?: number;
  summary: L10n;
  /**
   * Body in light markup: blank-line separated paragraphs, "## " headings,
   * "- " bullet lines, and [text](href) links (internal hrefs like /dates get
   * the reader's language prefix automatically).
   */
  content: L10n;
  /** Optional per-language share image (1200x630), used as og:image and attached by Web Share. */
  shareImage?: L10n;
  /** Optional short forwardable greeting, shown in a box with its own WhatsApp share. */
  greeting?: L10n;
  /** Optional forwardable info block (event card) with image share + WhatsApp. */
  forward?: L10n;
  /** Optional Q&A shown after the body and emitted as FAQPage JSON-LD. */
  faq?: { q: L10n; a: L10n }[];
  /**
   * Optional schema.org Event for a post that covers a dated ceremony.
   * Use only verified name / startDate / place facts already in the body.
   * Prefer date-only startDate when the clock time is approximate.
   */
  event?: {
    name: L10n;
    /** ISO 8601 date or date-time with offset, e.g. 2026-10-25 or 2026-10-31T12:02:00+05:30 */
    startDate: string;
    endDate?: string;
    description?: L10n;
    location: {
      name: string;
      addressLocality: string;
      addressRegion?: string;
      addressCountry?: string;
    } | {
      name: string;
      addressLocality: string;
      addressRegion?: string;
      addressCountry?: string;
    }[];
  };
  /**
   * Set on an older post when a genuine follow-up has been published. A note
   * at the top of this post (mr/hi/en) then links readers to the newer story.
   */
  followUp?: { slug: string; date: string };
}

/** The byline on every post. Never a government office. */
export const NEWS_AUTHOR = {
  name: "The Nashik Kumbh Desk",
  path: "/about",
};

const archiveArticles: BlogArticle[] = [
  {
    id: 101,
    slug: "amrit-snan-dates-confirmed-2027",
    title: {
      en: "How the Nashik Kumbh 2027 Amrit Snan Dates Were Announced (1 June 2025)",
      hi: "नाशिक कुंभ 2027: अमृत स्नान की तिथियाँ कैसे घोषित हुईं (1 जून 2025)",
      mr: "नाशिक कुंभमेळा २०२७: अमृत स्नानाच्या तारखा कशा जाहीर झाल्या (१ जून २०२५)",
    },
    date: "2026-06-12",
    originallyAnnounced: "2025-06-01",
    updated: "2026-10-22",
    source: "NTKMA plan / TOI",
    sources: [
      {
        title: "Kumbh Mela Plan, Nashik-Trimbakeshwar Simhastha 2027",
        publisher: "Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)",
        date: "2026-06-15",
        url: "https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2026/06/20260615229440107.pdf",
        status: "confirmed",
      },
      {
        title: "Maharashtra CM Devendra Fadnavis says Nashik Kumbh to begin October 31, 2026; first holy dips on August 2, 2027",
        publisher: "Times of India",
        date: "2025-06-01",
        url: "https://timesofindia.indiatimes.com/city/nashik/maharashtra-cm-devendra-fadnavis-says-nashik-kumbh-to-begin-october-31-2026-first-holy-dips-on-august-2-2027/articleshow/121559808.cms",
        status: "confirmed",
      },
      {
        title: "Simhastha Kumbh Mela to begin in Nashik-Trimbakeshwar on October 31 next year: Amrut Snan, check all dates",
        publisher: "ETV Bharat Marathi",
        date: "2025-06-01",
        url: "https://www.etvbharat.com/mr/!state/simhastha-kumbh-mela-to-begin-in-nashik-trimbakeshwar-on-october-31-next-year-amrut-snan-check-all-dates-maharashtra-news-mhs25060103673",
        status: "confirmed",
      },
      {
        title: "Dhwajarohan review meeting: 12:02 PM muhurat (Girish Mahajan)",
        publisher: "eSakal",
        date: "2026-09-19",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/todays-latest-marathi-news-nsk26h35648-txt-nskmain1-20260919044516",
        status: "confirmed",
      },
    ],
    category: "kumbh",
    image: "/images/gallery/kumbh-2.webp",
    summary: {
      en: "On 1 June 2025, Chief Minister Devendra Fadnavis announced the Amrit Snan dates after meeting the 13 akharas in Nashik: 2 August, 31 August, and 11 September (Nashik) / 12 September (Trimbakeshwar) 2027. The official NTKMA plan of June 2026 gives the same dates. The full schedule is on our Dates page.",
      hi: "मुख्यमंत्री देवेंद्र फडणवीस ने 1 जून 2025 को नाशिक में 13 अखाड़ों से बैठक के बाद अमृत स्नान की तिथियाँ घोषित कीं: 2 अगस्त, 31 अगस्त, और 11 सितंबर (नाशिक) / 12 सितंबर (त्र्यंबकेश्वर) 2027। NTKMA की जून 2026 की आधिकारिक योजना में भी यही तिथियाँ हैं। पूरा कार्यक्रम हमारे तिथियाँ पेज पर है।",
      mr: "मुख्यमंत्री देवेंद्र फडणवीस यांनी १ जून २०२५ रोजी नाशिकमध्ये १३ आखाड्यांसोबतच्या बैठकीनंतर अमृत स्नानाच्या तारखा जाहीर केल्या: २ ऑगस्ट, ३१ ऑगस्ट, आणि ११ सप्टेंबर (नाशिक) / १२ सप्टेंबर (त्र्यंबकेश्वर) २०२७. NTKMA च्या जून २०२६ च्या अधिकृत आराखड्यातही याच तारखा आहेत. संपूर्ण वेळापत्रक आमच्या तारखा पानावर आहे.",
    },
    content: {
      en: "Update (22 October 2026): We have added how and by whom these dates were announced, whether anything has changed since, and answers to common questions.\n\nIn brief: Chief Minister Devendra Fadnavis announced the Amrit Snan dates for the Nashik-Trimbakeshwar Simhastha on 1 June 2025, after meeting the heads of the 13 akharas in Nashik (Times of India, ETV Bharat). The first Amrit Snan is on 2 August 2027, the second on 31 August 2027, and the third on 11 September 2027 in Nashik and 12 September 2027 in Trimbakeshwar. The official Kumbh Mela Plan of the Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA), published in June 2026, gives the same dates. This post is the news report on that announcement. The full, up-to-date schedule, from Dhwajarohan to the close of the mela, is on our [Nashik Kumbh 2027 dates page](/dates).\n\n## How the dates were announced\n\nOn 1 June 2025, Fadnavis held talks in Nashik with leading seers of the Vaishnav and Shaiva sects, with state ministers Girish Mahajan and Dada Bhuse (Times of India, 2 June 2025). After the meeting he said: \"After discussions with the seers, we finalised the dates for the Amrut Snan at both Nashik and Trimbakeshwar, which will start on Aug 2, 2027.\" He added that there are many Parva Snan days spread across 2027-28, so Nashik should expect a large number of visitors. The same meeting also settled the new name: the bath once called Shahi Snan is now Amrit Snan, as explained in [Shahi Snan is now Amrit Snan](/blog/shahi-snan-renamed-amrit-snan).\n\n## Flag hoisting on 31 October 2026\n\nThe Simhastha opens with Dhwajarohan on Saturday 31 October 2026 at 12:02 PM. According to the NTKMA plan, flags go up at the same moment at Ramkund in Panchavati, Nashik, and at Kushavarta in Trimbakeshwar. Kumbh Mela Minister Girish Mahajan confirmed the 12:02 PM muhurat on 19 September 2026. More on our [Dhwajarohan 2026 page](/dhwajarohan-2026).\n\n## The three Amrit Snans\n\n- Thursday 29 July 2027: Nagar Pradakshina in Nashik. This is a procession, not a snan.\n- Monday 2 August 2027, Ashadh Somvati Amavasya: first Amrit Snan, at Ramkund and Kushavarta.\n- Tuesday 31 August 2027, Shravan Amavasya: second Amrit Snan, in Nashik and Trimbakeshwar.\n- Saturday 11 September 2027: third Amrit Snan in Nashik, for the Vaishnav akhadas at Ramkund.\n- Sunday 12 September 2027: third Amrit Snan in Trimbakeshwar, for the Shaiva akhadas at Kushavarta.\n\nThe third snan is split by place and by date. The Vaishnav akhadas bathe at Ramkund in Nashik and the Shaiva akhadas at Kushavarta in Trimbakeshwar. Amrit Snan timings (the hours) have not been published yet.\n\n## When does the Simhastha end?\n\nThe Simhastha does not end with the bathing. According to the NTKMA plan, Simhastha Samapti (the close) is on Saturday 29 July 2028 in Nashik and on Monday 24 July 2028 in Trimbakeshwar. The plan puts the whole mela period at 20 months and 3 weeks (632 days).\n\n## What this means for pilgrims\n\nThe three Amrit Snan mornings will be the most crowded hours of the whole event. On those days, transport, road closures and ghat access will be run differently from an ordinary day. A quieter darshan is possible on almost any other day of the mela. For every date in one place, see the [Nashik Kumbh 2027 dates page](/dates). The other auspicious bathing days are on the [Parva Snan calendar for 2027-28](/parva-snan-calendar), and the bathing sites are in our [guide to the Nashik and Trimbakeshwar ghats](/ghats).",
      hi: "अपडेट (22 अक्टूबर 2026): इस खबर में जोड़ा गया है कि ये तिथियाँ कब और किसने घोषित कीं, उसके बाद कुछ बदला या नहीं, और आम सवालों के जवाब।\n\nसंक्षेप में: मुख्यमंत्री देवेंद्र फडणवीस ने 1 जून 2025 को नाशिक में 13 अखाड़ों के प्रमुखों से बैठक के बाद नाशिक-त्र्यंबकेश्वर सिंहस्थ के अमृत स्नान की तिथियाँ घोषित कीं (टाइम्स ऑफ इंडिया, ETV भारत)। पहला अमृत स्नान 2 अगस्त 2027 को, दूसरा 31 अगस्त 2027 को, और तीसरा नाशिक में 11 सितंबर 2027 व त्र्यंबकेश्वर में 12 सितंबर 2027 को है। नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) की जून 2026 में प्रकाशित आधिकारिक कुंभ मेला योजना में भी यही तिथियाँ हैं। यह लेख उसी घोषणा की खबर है। ध्वजारोहण से मेले के समापन तक का पूरा और ताज़ा कार्यक्रम हमारे [नाशिक कुंभ 2027 तिथियाँ पेज](/dates) पर है।\n\n## तिथियाँ कैसे घोषित हुईं\n\n1 जून 2025 को फडणवीस ने नाशिक में वैष्णव और शैव संप्रदायों के प्रमुख संतों से चर्चा की। उनके साथ राज्य के मंत्री गिरीश महाजन और दादा भुसे थे (टाइम्स ऑफ इंडिया, 2 जून 2025)। बैठक के बाद उन्होंने कहा कि संतों से चर्चा के बाद नाशिक और त्र्यंबकेश्वर दोनों जगह के अमृत स्नान की तिथियाँ तय की गई हैं, और इनकी शुरुआत 2 अगस्त 2027 से होगी। उन्होंने यह भी कहा कि 2027-28 में कई पर्व स्नान हैं, इसलिए नाशिक में बड़ी संख्या में श्रद्धालु आएँगे। इसी बैठक में नया नाम भी तय हुआ: जिसे पहले शाही स्नान कहा जाता था, वह अब अमृत स्नान है। इसकी पूरी कहानी [शाही स्नान अब अमृत स्नान](/blog/shahi-snan-renamed-amrit-snan) लेख में है।\n\n## 31 अक्टूबर 2026 को ध्वजारोहण\n\nसिंहस्थ की शुरुआत शनिवार 31 अक्टूबर 2026 को दोपहर 12:02 बजे ध्वजारोहण से होगी। NTKMA योजना के अनुसार नाशिक के पंचवटी में रामकुंड और त्र्यंबकेश्वर में कुशावर्त पर एक ही समय ध्वज फहराए जाएँगे। कुंभ मेला मंत्री गिरीश महाजन ने 19 सितंबर 2026 को 12:02 बजे के मुहूर्त की पुष्टि की। अधिक जानकारी हमारे [ध्वजारोहण 2026 पेज](/dhwajarohan-2026) पर है।\n\n## तीन अमृत स्नान\n\n- गुरुवार 29 जुलाई 2027: नाशिक में नगर प्रदक्षिणा। यह शोभायात्रा है, स्नान नहीं।\n- सोमवार 2 अगस्त 2027, आषाढ़ सोमवती अमावस्या: पहला अमृत स्नान, रामकुंड और कुशावर्त पर।\n- मंगलवार 31 अगस्त 2027, श्रावण अमावस्या: दूसरा अमृत स्नान, नाशिक और त्र्यंबकेश्वर में।\n- शनिवार 11 सितंबर 2027: नाशिक में तीसरा अमृत स्नान, रामकुंड पर वैष्णव अखाड़ों का।\n- रविवार 12 सितंबर 2027: त्र्यंबकेश्वर में तीसरा अमृत स्नान, कुशावर्त पर शैव अखाड़ों का।\n\nतीसरा स्नान जगह और तिथि दोनों से बँटा है। वैष्णव अखाड़े नाशिक के रामकुंड में और शैव अखाड़े त्र्यंबकेश्वर के कुशावर्त में स्नान करते हैं। अमृत स्नान का समय (घंटे) अभी प्रकाशित नहीं हुआ है।\n\n## सिंहस्थ कब समाप्त होगा?\n\nसिंहस्थ स्नान के साथ खत्म नहीं होता। NTKMA योजना के अनुसार सिंहस्थ समाप्ति नाशिक में शनिवार 29 जुलाई 2028 और त्र्यंबकेश्वर में सोमवार 24 जुलाई 2028 को है। योजना के अनुसार पूरा मेला काल 20 महीने 3 सप्ताह (632 दिन) का है।\n\n## श्रद्धालुओं के लिए इसका मतलब\n\nतीनों अमृत स्नान की सुबहें पूरे आयोजन के सबसे भीड़ वाले घंटे होंगी। उन दिनों परिवहन, सड़क बंदी और घाट प्रवेश की व्यवस्था सामान्य दिनों से अलग होगी। मेले के लगभग किसी भी दूसरे दिन शांत दर्शन संभव है। सारी तिथियाँ एक जगह [नाशिक कुंभ 2027 तिथियाँ पेज](/dates) पर देखें। बाकी पुण्य स्नान के दिन [2027-28 के पर्व स्नान कैलेंडर](/parva-snan-calendar) में हैं, और स्नान स्थलों के लिए [नाशिक और त्र्यंबकेश्वर घाट गाइड](/ghats) देखें।",
      mr: "अपडेट (२२ ऑक्टोबर २०२६): या तारखा कधी आणि कोणी जाहीर केल्या, त्यानंतर काही बदलले का, आणि नेहमीच्या प्रश्नांची उत्तरे या बातमीत जोडली आहेत.\n\nथोडक्यात: मुख्यमंत्री देवेंद्र फडणवीस यांनी १ जून २०२५ रोजी नाशिकमध्ये १३ आखाड्यांच्या प्रमुखांसोबत बैठक घेऊन नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळ्याच्या अमृत स्नानाच्या तारखा जाहीर केल्या (टाइम्स ऑफ इंडिया, ETV भारत). पहिले अमृत स्नान २ ऑगस्ट २०२७ रोजी, दुसरे ३१ ऑगस्ट २०२७ रोजी, आणि तिसरे नाशिकमध्ये ११ सप्टेंबर २०२७ व त्र्यंबकेश्वरमध्ये १२ सप्टेंबर २०२७ रोजी आहे. नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाच्या (NTKMA) जून २०२६ मध्ये प्रसिद्ध झालेल्या अधिकृत कुंभमेळा आराखड्यातही याच तारखा आहेत. ही बातमी त्या घोषणेबद्दल आहे. ध्वजारोहणापासून मेळ्याच्या समाप्तीपर्यंतचे संपूर्ण आणि अद्ययावत वेळापत्रक आमच्या [नाशिक कुंभमेळा २०२७ तारखा पानावर](/dates) आहे.\n\n## तारखा कशा जाहीर झाल्या\n\n१ जून २०२५ रोजी फडणवीस यांनी नाशिकमध्ये वैष्णव आणि शैव पंथांच्या प्रमुख साधू-महंतांशी चर्चा केली. राज्याचे मंत्री गिरीश महाजन आणि दादा भुसे त्यांच्यासोबत होते (टाइम्स ऑफ इंडिया, २ जून २०२५). बैठकीनंतर त्यांनी सांगितले की साधू-महंतांशी चर्चा करून नाशिक आणि त्र्यंबकेश्वर दोन्ही ठिकाणच्या अमृत स्नानाच्या तारखा निश्चित केल्या आहेत, आणि त्यांची सुरुवात २ ऑगस्ट २०२७ पासून होईल. २०२७-२८ मध्ये अनेक पर्वस्नाने असल्याने नाशिकमध्ये मोठ्या संख्येने भाविक येतील, असेही ते म्हणाले. याच बैठकीत नवे नावही ठरले: पूर्वी ज्याला शाही स्नान म्हणत, ते आता अमृत स्नान आहे. त्याची संपूर्ण माहिती [शाही स्नान आता अमृत स्नान](/blog/shahi-snan-renamed-amrit-snan) या लेखात आहे.\n\n## ३१ ऑक्टोबर २०२६ रोजी ध्वजारोहण\n\nसिंहस्थाची सुरुवात शनिवार, ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजता ध्वजारोहणाने होईल. NTKMA आराखड्यानुसार पंचवटीतील रामकुंड आणि त्र्यंबकेश्वरमधील कुशावर्त येथे एकाच वेळी ध्वज फडकतील. कुंभमेळा मंत्री गिरीश महाजन यांनी १९ सप्टेंबर २०२६ रोजी १२:०२ च्या मुहूर्ताला दुजोरा दिला. अधिक माहिती आमच्या [ध्वजारोहण २०२६ पानावर](/dhwajarohan-2026) आहे.\n\n## तीन अमृत स्नान\n\n- गुरुवार, २९ जुलै २०२७: नाशिकमध्ये नगर प्रदक्षिणा. ही मिरवणूक आहे, स्नान नव्हे.\n- सोमवार, २ ऑगस्ट २०२७, आषाढ सोमवती अमावस्या: पहिले अमृत स्नान, रामकुंड आणि कुशावर्त येथे.\n- मंगळवार, ३१ ऑगस्ट २०२७, श्रावण अमावस्या: दुसरे अमृत स्नान, नाशिक आणि त्र्यंबकेश्वर येथे.\n- शनिवार, ११ सप्टेंबर २०२७: नाशिकमध्ये तिसरे अमृत स्नान, रामकुंडावर वैष्णव आखाड्यांचे.\n- रविवार, १२ सप्टेंबर २०२७: त्र्यंबकेश्वरमध्ये तिसरे अमृत स्नान, कुशावर्तात शैव आखाड्यांचे.\n\nतिसरे स्नान ठिकाण आणि तारीख दोन्हींनी विभागले आहे. वैष्णव आखाडे नाशिकच्या रामकुंडावर, तर शैव आखाडे त्र्यंबकेश्वरच्या कुशावर्तात स्नान करतात. अमृत स्नानाच्या वेळा (तास) अद्याप जाहीर झालेल्या नाहीत.\n\n## सिंहस्थ कधी संपणार?\n\nसिंहस्थ स्नानांनी संपत नाही. NTKMA आराखड्यानुसार सिंहस्थ समाप्ती नाशिकमध्ये शनिवार, २९ जुलै २०२८ रोजी आणि त्र्यंबकेश्वरमध्ये सोमवार, २४ जुलै २०२८ रोजी आहे. आराखड्यानुसार संपूर्ण मेळा कालावधी २० महिने ३ आठवडे (६३२ दिवस) आहे.\n\n## भाविकांसाठी याचा अर्थ\n\nतिन्ही अमृत स्नानाच्या सकाळी संपूर्ण सोहळ्यातील सर्वात गर्दीचे तास असतील. त्या दिवशी वाहतूक, रस्ते बंदी आणि घाट प्रवेशाची व्यवस्था नेहमीपेक्षा वेगळी असेल. मेळ्याच्या जवळपास कोणत्याही इतर दिवशी शांत दर्शन घेता येईल. सर्व तारखा एकाच ठिकाणी [नाशिक कुंभमेळा २०२७ तारखा पानावर](/dates) पाहा. इतर पुण्यस्नानाचे दिवस [२०२७-२८ च्या पर्वस्नान दिनदर्शिकेत](/parva-snan-calendar) आहेत, आणि स्नानस्थळांसाठी [नाशिक आणि त्र्यंबकेश्वर घाट मार्गदर्शक](/ghats) पाहा.",
    },
    faq: [
      {
        q: { en: "Who announced the Nashik Kumbh 2027 Amrit Snan dates, and when?", hi: "नाशिक कुंभ 2027 के अमृत स्नान की तिथियाँ किसने और कब घोषित कीं?", mr: "नाशिक कुंभमेळा २०२७ च्या अमृत स्नानाच्या तारखा कोणी आणि कधी जाहीर केल्या?" },
        a: {
          en: "Chief Minister Devendra Fadnavis, on 1 June 2025, after a meeting in Nashik with the heads of the 13 akharas. Ministers Girish Mahajan and Dada Bhuse were with him. The NTKMA Kumbh Mela Plan of June 2026 restates the same dates.",
          hi: "मुख्यमंत्री देवेंद्र फडणवीस ने, 1 जून 2025 को, नाशिक में 13 अखाड़ों के प्रमुखों के साथ बैठक के बाद। मंत्री गिरीश महाजन और दादा भुसे उनके साथ थे। NTKMA की जून 2026 की कुंभ मेला योजना में भी यही तिथियाँ हैं।",
          mr: "मुख्यमंत्री देवेंद्र फडणवीस यांनी, १ जून २०२५ रोजी, नाशिकमध्ये १३ आखाड्यांच्या प्रमुखांसोबतच्या बैठकीनंतर. मंत्री गिरीश महाजन आणि दादा भुसे त्यांच्यासोबत होते. NTKMA च्या जून २०२६ च्या कुंभमेळा आराखड्यातही याच तारखा आहेत.",
        },
      },
      {
        q: { en: "Have the Amrit Snan dates changed since they were announced?", hi: "क्या घोषणा के बाद अमृत स्नान की तिथियाँ बदली हैं?", mr: "जाहीर झाल्यानंतर अमृत स्नानाच्या तारखा बदलल्या आहेत का?" },
        a: {
          en: "No. The official NTKMA plan published in June 2026 gives the same three Amrit Snans: 2 August, 31 August, and 11 September (Nashik) / 12 September (Trimbakeshwar) 2027. If anything changes, we update our Dates page first.",
          hi: "नहीं। जून 2026 में प्रकाशित NTKMA की आधिकारिक योजना में वही तीन अमृत स्नान हैं: 2 अगस्त, 31 अगस्त, और 11 सितंबर (नाशिक) / 12 सितंबर (त्र्यंबकेश्वर) 2027। कोई बदलाव होने पर हम सबसे पहले अपना तिथियाँ पेज अपडेट करते हैं।",
          mr: "नाही. जून २०२६ मध्ये प्रसिद्ध झालेल्या NTKMA च्या अधिकृत आराखड्यात तीच तीन अमृत स्नाने आहेत: २ ऑगस्ट, ३१ ऑगस्ट, आणि ११ सप्टेंबर (नाशिक) / १२ सप्टेंबर (त्र्यंबकेश्वर) २०२७. काही बदल झाल्यास आम्ही सर्वात आधी आमचे तारखा पान अद्ययावत करतो.",
        },
      },
      {
        q: { en: "Why is the third Amrit Snan on two different days?", hi: "तीसरा अमृत स्नान दो अलग दिनों पर क्यों है?", mr: "तिसरे अमृत स्नान दोन वेगवेगळ्या दिवशी का आहे?" },
        a: {
          en: "Because the Vaishnav and Shaiva akharas bathe at different places. The Vaishnav akharas bathe at Ramkund in Nashik on 11 September 2027, and the Shaiva akharas at Kushavarta in Trimbakeshwar on 12 September 2027.",
          hi: "क्योंकि वैष्णव और शैव अखाड़े अलग-अलग जगह स्नान करते हैं। वैष्णव अखाड़े 11 सितंबर 2027 को नाशिक के रामकुंड में, और शैव अखाड़े 12 सितंबर 2027 को त्र्यंबकेश्वर के कुशावर्त में स्नान करेंगे।",
          mr: "कारण वैष्णव आणि शैव आखाडे वेगवेगळ्या ठिकाणी स्नान करतात. वैष्णव आखाडे ११ सप्टेंबर २०२७ रोजी नाशिकच्या रामकुंडावर, तर शैव आखाडे १२ सप्टेंबर २०२७ रोजी त्र्यंबकेश्वरच्या कुशावर्तात स्नान करतील.",
        },
      },
      {
        q: { en: "Have the Amrit Snan timings been announced?", hi: "क्या अमृत स्नान का समय घोषित हुआ है?", mr: "अमृत स्नानाच्या वेळा जाहीर झाल्या आहेत का?" },
        a: {
          en: "Not yet. Only the dates have been announced. The hours of each Amrit Snan have not been published.",
          hi: "अभी नहीं। अभी केवल तिथियाँ घोषित हुई हैं। हर अमृत स्नान का समय (घंटे) प्रकाशित नहीं हुआ है।",
          mr: "अद्याप नाही. सध्या फक्त तारखा जाहीर झाल्या आहेत. प्रत्येक अमृत स्नानाच्या वेळा (तास) अजून प्रसिद्ध झालेल्या नाहीत.",
        },
      },
    ],
  },
  {
    id: 102,
    slug: "shahi-snan-renamed-amrit-snan",
    title: {
      en: "Shahi Snan Is Now Amrit Snan at Nashik Kumbh 2027: What Changed and Why",
      hi: "नाशिक कुंभ 2027: शाही स्नान अब अमृत स्नान, क्या बदला और क्यों",
      mr: "नाशिक कुंभमेळा २०२७: शाही स्नान आता अमृत स्नान, काय बदलले आणि का",
    },
    date: "2026-04-08",
    originallyAnnounced: "2025-06-01",
    updated: "2026-10-21",
    source: "ANI",
    sources: [
      {
        title: "In a spiritual shift, Nashik Simhastha Kumbh Mela 2027 to replace 'Shahi Snan' with 'Amrit Snan'",
        publisher: "ANI",
        date: "2025-06-01",
        url: "https://www.aninews.in/news/national/politics/in-a-spiritual-shift-nashik-simhastha-kumbh-mela-2027-to-replace-shahi-snan-with-amrit-snan20250601232326",
        status: "confirmed",
      },
      {
        title: "Mahant Rajender Das : ‘शाही नव्हे, अमृतस्नान म्हणा’ ; महंत राजेंद्रदास",
        publisher: "eSakal",
        date: "2025-06-01",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/nashikkumbh-mela-2027-nashik-akharas-demand-1500-acre-land-amrit-snan-authority-representation-pilgrim-arrangements-nmk01",
        status: "reported",
      },
      {
        title: "कुंभमेळ्यात आता शाही स्नान नव्हे तर अमृत स्नान? मुख्यमंत्री जाहीर करणार तारखा",
        publisher: "TV9 Marathi",
        date: "2025-06-01",
        url: "https://www.tv9marathi.com/maharashtra/kumbh-mela-meeting-in-nashik-today-chief-minister-to-announce-dates-for-amrit-snan-1415519.html",
        status: "reported",
      },
      {
        title: "Kumbh Mela Plan, Nashik-Trimbakeshwar Simhastha 2027",
        publisher: "Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)",
        date: "2026-06-15",
        url: "https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2026/06/20260615229440107.pdf",
        status: "confirmed",
      },
      {
        title: "ABAP passes resolution to replace 'Shahi' and 'Peshwai' with Hindi or Sanskrit words",
        publisher: "Times of India",
        date: "2024-10-05",
        url: "https://timesofindia.indiatimes.com/city/allahabad/abap-calls-for-replacement-of-shahi-and-peshwai-with-sanskrit-terms-in-kumbh-traditions/articleshow/113969993.cms",
        status: "reported",
      },
      {
        title: "Maha Kumbh Gets Sanatani Spin As Shahi Snan Makes Way For Rajasi, Amrit Snans",
        publisher: "News18",
        date: "2025-01-14",
        url: "https://www.news18.com/india/maha-kumbh-gets-sanatani-spin-as-shahi-snan-makes-way-for-rajasi-amrit-snans-9188599.html",
        status: "reported",
      },
    ],
    category: "govt",
    image: "/images/gallery/kumbh-7.webp",
    summary: {
      en: "Shahi Snan and Amrit Snan are the same bath: the main bathing days of the Kumbh, led by the akharas. At the Nashik-Trimbakeshwar Simhastha the official name is now Amrit Snan, decided at Chief Minister Devendra Fadnavis's meeting with the 13 akharas on 1 June 2025. The dates did not change: 2 August, 31 August and 11 September 2027 (12 September in Trimbakeshwar).",
      hi: "शाही स्नान और अमृत स्नान एक ही स्नान हैं: कुंभ के मुख्य स्नान, जिनकी अगुवाई अखाड़े करते हैं। नाशिक-त्र्यंबकेश्वर सिंहस्थ में अब आधिकारिक नाम अमृत स्नान है। यह फैसला 1 जून 2025 को मुख्यमंत्री देवेंद्र फडणवीस की 13 अखाड़ों के साथ बैठक में हुआ। तिथियाँ नहीं बदलीं: 2 अगस्त, 31 अगस्त और 11 सितंबर 2027 (त्र्यंबकेश्वर में 12 सितंबर)।",
      mr: "शाही स्नान आणि अमृत स्नान हे एकच स्नान आहे: आखाड्यांच्या नेतृत्वाखाली होणारी कुंभमेळ्यातील मुख्य स्नाने. नाशिक-त्र्यंबकेश्वर सिंहस्थात आता अधिकृत नाव अमृत स्नान आहे. १ जून २०२५ रोजी मुख्यमंत्री देवेंद्र फडणवीस यांच्या १३ आखाड्यांसोबतच्या बैठकीत हा निर्णय झाला. तारखा बदललेल्या नाहीत: २ ऑगस्ट, ३१ ऑगस्ट आणि ११ सप्टेंबर २०२७ (त्र्यंबकेश्वरमध्ये १२ सप्टेंबर).",
    },
    content: {
      en: "Update (21 October 2026): We have added who asked for the new name and why, how Prayagraj made the same change in 2025, and answers to common questions.\n\nIn brief: Shahi Snan and Amrit Snan mean the same thing. Both are the names for the main bathing days of the Kumbh, when the akharas go in procession to bathe. At the Nashik-Trimbakeshwar Simhastha, the official name is now Amrit Snan. The decision was taken on 1 June 2025, at Chief Minister Devendra Fadnavis's meeting in Nashik with the 13 akharas (ANI, 1 June 2025). The dates and places stay the same.\n\n## Who asked for the change\n\nThe demand came from the sadhus. On the morning of the meeting, eSakal and TV9 Marathi reported that Mahant Rajendradas Maharaj wanted the bath to be called Amrit Snan instead of Shahi Snan. According to TV9 Marathi, he said the word 'Shahi' is linked to the Mughals.\n\nAfter the meeting, Mahant Bhakti Charan Das, spokesperson of the All India Vaishnav Akhara, told ANI: \"The term Shahi Snan was introduced during the Mughal era. Therefore, this tradition is now being changed, and the Shahi Snan will henceforth be referred to as Amrit Snan.\"\n\n## Why 'Amrit'\n\n'Amrit' is the nectar that came out of the churning of the ocean (Samudra Manthan). In Hindu belief, drops of it fell at the four Kumbh sites, Nashik among them, and that is why the Kumbh is held there. ANI reported that saints from several akharas want the bath to stand for spiritual discipline rather than royal pageantry, and that is the reason for the new name.\n\n## Prayagraj made the same change first\n\nNashik is not the first. In October 2024, the Akhil Bharatiya Akhara Parishad passed a resolution in Prayagraj to replace the words 'Shahi' and 'Peshwai' with Hindi or Sanskrit words (Times of India, 5 October 2024). At the Prayagraj Maha Kumbh in January 2025, the baths were called Amrit Snan or Rajasi Snan, and Peshwai became Chhavni Pravesh (News18, 14 January 2025). Nashik took up the Amrit Snan name for its 2027 Simhastha a few months later.\n\n## Both names will be heard\n\nOfficial papers now use the new name. The NTKMA Kumbh Mela Plan (June 2026) calls the three bathing days Amrit Snan throughout, although its list of works still has an item for 'Shahi Marg' electrical works. In daily speech, many sadhus, priests and pilgrims will still say Shahi Snan for a long time. If you hear either name, it means the same bath.\n\n## The dates do not change\n\nThe new name changes nothing for visitors. The three Amrit Snans are:\n\n- Monday 2 August 2027 (Ashadh Somvati Amavasya), at Ramkund and Kushavarta\n- Tuesday 31 August 2027 (Shravan Amavasya), in Nashik and Trimbakeshwar\n- Saturday 11 September 2027 in Nashik, and Sunday 12 September 2027 in Trimbakeshwar\n\nAmrit Snan timings (the hours) have not been published yet. For the full schedule, with Dhwajarohan, Nagar Pradakshina and the close of the Simhastha, see our [Nashik Kumbh 2027 dates page](/dates). How these dates were announced is in our report on the [confirmed Amrit Snan dates](/blog/amrit-snan-dates-confirmed-2027). The bathing sites are on the [Nashik and Trimbakeshwar ghats guide](/ghats), and the akharas who lead the procession are explained on our page about [Naga sadhus and the akharas](/naga-sadhus).",
      hi: "अपडेट (21 अक्टूबर 2026): इस लेख में जोड़ा गया है कि नया नाम किसने माँगा और क्यों, 2025 में प्रयागराज ने यही बदलाव कैसे किया, और आम सवालों के जवाब।\n\nसंक्षेप में: शाही स्नान और अमृत स्नान का मतलब एक ही है। दोनों कुंभ के मुख्य स्नान के नाम हैं, जब अखाड़े शोभायात्रा के साथ स्नान के लिए निकलते हैं। नाशिक-त्र्यंबकेश्वर सिंहस्थ में अब आधिकारिक नाम अमृत स्नान है। यह फैसला 1 जून 2025 को नाशिक में मुख्यमंत्री देवेंद्र फडणवीस की 13 अखाड़ों के साथ बैठक में हुआ (ANI, 1 जून 2025)। तिथियाँ और स्थान वही हैं।\n\n## बदलाव की माँग किसने की\n\nयह माँग साधु-संतों की ओर से आई। बैठक वाले दिन सुबह eSakal और TV9 मराठी ने बताया कि महंत राजेंद्रदास महाराज चाहते हैं कि इस स्नान को शाही स्नान की जगह अमृत स्नान कहा जाए। TV9 मराठी के अनुसार उन्होंने कहा कि 'शाही' शब्द मुगलों से जुड़ा है।\n\nबैठक के बाद अखिल भारतीय वैष्णव अखाड़े के प्रवक्ता महंत भक्ति चरण दास ने ANI से कहा कि शाही स्नान शब्द मुगल काल में आया था, इसलिए अब यह परंपरा बदली जा रही है और आगे से शाही स्नान को अमृत स्नान कहा जाएगा।\n\n## 'अमृत' ही क्यों\n\n'अमृत' वह है जो समुद्र मंथन से निकला। मान्यता है कि इसकी बूँदें कुंभ के चारों स्थलों पर गिरीं, जिनमें नाशिक भी है, और इसी कारण वहाँ कुंभ लगता है। ANI के अनुसार कई अखाड़ों के संत चाहते हैं कि यह स्नान शाही ठाठ-बाट का नहीं, आध्यात्मिक अनुशासन का प्रतीक बने, और नया नाम इसी वजह से है।\n\n## प्रयागराज ने यह बदलाव पहले किया\n\nनाशिक पहला नहीं है। अक्टूबर 2024 में अखिल भारतीय अखाड़ा परिषद ने प्रयागराज में प्रस्ताव पारित किया कि 'शाही' और 'पेशवाई' शब्दों की जगह हिंदी या संस्कृत शब्द लाए जाएँ (टाइम्स ऑफ इंडिया, 5 अक्टूबर 2024)। जनवरी 2025 के प्रयागराज महाकुंभ में स्नान को अमृत स्नान या राजसी स्नान कहा गया, और पेशवाई को छावनी प्रवेश (News18, 14 जनवरी 2025)। कुछ महीने बाद नाशिक ने भी 2027 के सिंहस्थ के लिए अमृत स्नान नाम अपना लिया।\n\n## दोनों नाम सुनाई देंगे\n\nसरकारी कागज़ों में अब नया नाम है। NTKMA की कुंभ मेला योजना (जून 2026) में तीनों मुख्य स्नानों को हर जगह अमृत स्नान लिखा गया है, हालाँकि कामों की सूची में 'शाही मार्ग' के बिजली कामों का ज़िक्र अब भी है। बोलचाल में कई साधु, पुरोहित और श्रद्धालु लंबे समय तक शाही स्नान ही कहेंगे। कोई भी नाम सुनें, मतलब एक ही स्नान है।\n\n## तिथियाँ नहीं बदलीं\n\nनए नाम से श्रद्धालुओं के लिए कुछ नहीं बदलता। तीनों अमृत स्नान:\n\n- सोमवार 2 अगस्त 2027 (आषाढ़ सोमवती अमावस्या), रामकुंड और कुशावर्त पर\n- मंगलवार 31 अगस्त 2027 (श्रावण अमावस्या), नाशिक और त्र्यंबकेश्वर में\n- शनिवार 11 सितंबर 2027 को नाशिक में, और रविवार 12 सितंबर 2027 को त्र्यंबकेश्वर में\n\nअमृत स्नान का समय (घंटे) अभी प्रकाशित नहीं हुआ है। ध्वजारोहण, नगर प्रदक्षिणा और सिंहस्थ समापन समेत पूरा कार्यक्रम हमारे [नाशिक कुंभ 2027 तिथियाँ पेज](/dates) पर देखें। ये तिथियाँ कैसे घोषित हुईं, यह [अमृत स्नान की तय तिथियों वाली खबर](/blog/amrit-snan-dates-confirmed-2027) में है। स्नान स्थलों के लिए [नाशिक और त्र्यंबकेश्वर घाट गाइड](/ghats) देखें, और शोभायात्रा की अगुवाई करने वाले अखाड़ों के बारे में [नागा साधु और अखाड़े](/naga-sadhus) पेज पढ़ें।",
      mr: "अपडेट (२१ ऑक्टोबर २०२६): नवे नाव कोणी मागितले आणि का, प्रयागराजने २०२५ मध्ये हाच बदल कसा केला, आणि नेहमीच्या प्रश्नांची उत्तरे या लेखात जोडली आहेत.\n\nथोडक्यात: शाही स्नान आणि अमृत स्नान याचा अर्थ एकच. आखाडे मिरवणुकीने स्नानाला निघतात त्या कुंभमेळ्यातील मुख्य स्नानांची ही दोन नावे आहेत. नाशिक-त्र्यंबकेश्वर सिंहस्थात आता अधिकृत नाव अमृत स्नान आहे. १ जून २०२५ रोजी नाशिकमध्ये मुख्यमंत्री देवेंद्र फडणवीस यांच्या १३ आखाड्यांसोबतच्या बैठकीत हा निर्णय झाला (ANI, १ जून २०२५). तारखा आणि ठिकाणे तीच आहेत.\n\n## बदलाची मागणी कोणाची\n\nही मागणी साधू-महंतांकडून आली. बैठकीच्या दिवशी सकाळीच ई-सकाळ आणि TV9 मराठीने वृत्त दिले की महंत राजेंद्रदास महाराज यांना या स्नानाला शाही स्नानऐवजी अमृत स्नान म्हटले जावे असे वाटते. TV9 मराठीनुसार 'शाही' हा शब्द मुघलांशी संबंधित आहे, असे त्यांनी सांगितले.\n\nबैठकीनंतर अखिल भारतीय वैष्णव आखाड्याचे प्रवक्ते महंत भक्ती चरण दास यांनी ANI ला सांगितले की शाही स्नान हा शब्द मुघल काळात आला, म्हणून आता ही परंपरा बदलली जात असून यापुढे शाही स्नानाला अमृत स्नान म्हटले जाईल.\n\n## 'अमृत'च का\n\n'अमृत' म्हणजे समुद्रमंथनातून निघालेले. त्याचे थेंब कुंभमेळ्याच्या चारही स्थळांवर, नाशिकसह, पडले अशी श्रद्धा आहे, आणि म्हणूनच तिथे कुंभ भरतो. ANI च्या वृत्तानुसार अनेक आखाड्यांच्या संतांना हे स्नान शाही थाटमाटाचे नव्हे, तर आध्यात्मिक शिस्तीचे प्रतीक व्हावे असे वाटते, आणि नवे नाव त्याचसाठी आहे.\n\n## प्रयागराजने हा बदल आधी केला\n\nनाशिक पहिले नाही. ऑक्टोबर २०२४ मध्ये अखिल भारतीय आखाडा परिषदेने प्रयागराजमध्ये 'शाही' आणि 'पेशवाई' या शब्दांऐवजी हिंदी किंवा संस्कृत शब्द वापरण्याचा ठराव केला (टाइम्स ऑफ इंडिया, ५ ऑक्टोबर २०२४). जानेवारी २०२५ च्या प्रयागराज महाकुंभात स्नानाला अमृत स्नान किंवा राजसी स्नान म्हटले गेले, आणि पेशवाईला छावणी प्रवेश (News18, १४ जानेवारी २०२५). काही महिन्यांनी नाशिकनेही २०२७ च्या सिंहस्थासाठी अमृत स्नान हेच नाव स्वीकारले.\n\n## दोन्ही नावे ऐकू येतील\n\nशासकीय कागदपत्रांत आता नवे नाव आहे. NTKMA च्या कुंभमेळा आराखड्यात (जून २०२६) तिन्ही मुख्य स्नानांना सगळीकडे अमृत स्नान म्हटले आहे, मात्र कामांच्या यादीत 'शाही मार्ग' विद्युत कामांचा उल्लेख अजूनही आहे. बोलीभाषेत अनेक साधू, पुरोहित आणि भाविक बराच काळ शाही स्नानच म्हणत राहतील. कोणतेही नाव ऐकले तरी अर्थ एकाच स्नानाचा आहे.\n\n## तारखा बदललेल्या नाहीत\n\nनव्या नावाने भाविकांसाठी काहीच बदलत नाही. तिन्ही अमृत स्नान:\n\n- सोमवार, २ ऑगस्ट २०२७ (आषाढ सोमवती अमावस्या), रामकुंड आणि कुशावर्त येथे\n- मंगळवार, ३१ ऑगस्ट २०२७ (श्रावण अमावस्या), नाशिक आणि त्र्यंबकेश्वर येथे\n- शनिवार, ११ सप्टेंबर २०२७ रोजी नाशिक, आणि रविवार, १२ सप्टेंबर २०२७ रोजी त्र्यंबकेश्वर\n\nअमृत स्नानाच्या वेळा (तास) अद्याप जाहीर झालेल्या नाहीत. ध्वजारोहण, नगर प्रदक्षिणा आणि सिंहस्थ समाप्तीसह संपूर्ण वेळापत्रक आमच्या [नाशिक कुंभमेळा २०२७ तारखा पानावर](/dates) पाहा. या तारखा कशा जाहीर झाल्या ते [अमृत स्नानाच्या निश्चित तारखांच्या बातमीत](/blog/amrit-snan-dates-confirmed-2027) आहे. स्नानस्थळांसाठी [नाशिक आणि त्र्यंबकेश्वर घाट मार्गदर्शक](/ghats) पाहा, आणि मिरवणुकीचे नेतृत्व करणाऱ्या आखाड्यांबद्दल [नागा साधू आणि आखाडे](/naga-sadhus) हे पान वाचा.",
    },
    faq: [
      {
        q: { en: "Is Shahi Snan the same as Amrit Snan?", hi: "क्या शाही स्नान और अमृत स्नान एक ही हैं?", mr: "शाही स्नान आणि अमृत स्नान एकच आहे का?" },
        a: {
          en: "Yes. Both names refer to the main bathing days of the Kumbh, when the akharas bathe in procession. At the Nashik-Trimbakeshwar Simhastha 2027 the official name is Amrit Snan, but many people will still say Shahi Snan.",
          hi: "हाँ। दोनों नाम कुंभ के मुख्य स्नान के दिनों के हैं, जब अखाड़े शोभायात्रा के साथ स्नान करते हैं। नाशिक-त्र्यंबकेश्वर सिंहस्थ 2027 में आधिकारिक नाम अमृत स्नान है, पर कई लोग अब भी शाही स्नान कहेंगे।",
          mr: "हो. दोन्ही नावे कुंभमेळ्यातील मुख्य स्नानाच्या दिवसांची आहेत, जेव्हा आखाडे मिरवणुकीने स्नान करतात. नाशिक-त्र्यंबकेश्वर सिंहस्थ २०२७ मध्ये अधिकृत नाव अमृत स्नान आहे, पण अनेक जण अजूनही शाही स्नानच म्हणतील.",
        },
      },
      {
        q: { en: "When was Shahi Snan renamed Amrit Snan for Nashik?", hi: "नाशिक में शाही स्नान का नाम अमृत स्नान कब हुआ?", mr: "नाशिकमध्ये शाही स्नानाचे नाव अमृत स्नान कधी झाले?" },
        a: {
          en: "On 1 June 2025, at Chief Minister Devendra Fadnavis's meeting with the 13 akharas at the Nashik Collector's office. Mahant Rajendradas Maharaj had asked for the change, and the same meeting announced the Simhastha dates.",
          hi: "1 जून 2025 को, नाशिक कलेक्टर कार्यालय में मुख्यमंत्री देवेंद्र फडणवीस की 13 अखाड़ों के साथ बैठक में। महंत राजेंद्रदास महाराज ने यह बदलाव माँगा था, और उसी बैठक में सिंहस्थ की तिथियाँ भी घोषित हुईं।",
          mr: "१ जून २०२५ रोजी, नाशिक जिल्हाधिकारी कार्यालयात मुख्यमंत्री देवेंद्र फडणवीस यांच्या १३ आखाड्यांसोबतच्या बैठकीत. महंत राजेंद्रदास महाराज यांनी हा बदल मागितला होता, आणि त्याच बैठकीत सिंहस्थाच्या तारखाही जाहीर झाल्या.",
        },
      },
      {
        q: { en: "Why was the name Shahi Snan changed?", hi: "शाही स्नान का नाम क्यों बदला गया?", mr: "शाही स्नानाचे नाव का बदलले?" },
        a: {
          en: "Akhara leaders say the word 'Shahi' came in during the Mughal era. They want a name tied to the Samudra Manthan story, in which drops of amrit fell at the Kumbh sites, and a bath that stands for spiritual discipline rather than royal display (ANI, 1 June 2025).",
          hi: "अखाड़ों के प्रमुखों का कहना है कि 'शाही' शब्द मुगल काल में आया। वे ऐसा नाम चाहते हैं जो समुद्र मंथन की कथा से जुड़ा हो, जिसमें अमृत की बूँदें कुंभ स्थलों पर गिरीं, और ऐसा स्नान जो शाही दिखावे का नहीं, आध्यात्मिक अनुशासन का प्रतीक हो (ANI, 1 जून 2025)।",
          mr: "'शाही' हा शब्द मुघल काळात आला, असे आखाड्यांच्या प्रमुखांचे म्हणणे आहे. अमृताचे थेंब कुंभ स्थळांवर पडले त्या समुद्रमंथनाच्या कथेशी जोडलेले नाव, आणि शाही दिखाव्याचे नव्हे तर आध्यात्मिक शिस्तीचे प्रतीक असलेले स्नान त्यांना हवे आहे (ANI, १ जून २०२५).",
        },
      },
      {
        q: { en: "Was Shahi Snan also renamed at the Prayagraj Maha Kumbh?", hi: "क्या प्रयागराज महाकुंभ में भी शाही स्नान का नाम बदला गया था?", mr: "प्रयागराज महाकुंभातही शाही स्नानाचे नाव बदलले होते का?" },
        a: {
          en: "Yes. The Akhil Bharatiya Akhara Parishad passed a resolution in October 2024, and at the Prayagraj Maha Kumbh in 2025 the baths were called Amrit Snan or Rajasi Snan, while Peshwai became Chhavni Pravesh.",
          hi: "हाँ। अखिल भारतीय अखाड़ा परिषद ने अक्टूबर 2024 में प्रस्ताव पारित किया, और 2025 के प्रयागराज महाकुंभ में स्नान को अमृत स्नान या राजसी स्नान कहा गया, और पेशवाई को छावनी प्रवेश।",
          mr: "हो. अखिल भारतीय आखाडा परिषदेने ऑक्टोबर २०२४ मध्ये ठराव केला, आणि २०२५ च्या प्रयागराज महाकुंभात स्नानाला अमृत स्नान किंवा राजसी स्नान, तर पेशवाईला छावणी प्रवेश म्हटले गेले.",
        },
      },
      {
        q: { en: "What are the Shahi Snan (Amrit Snan) dates for Nashik Kumbh 2027?", hi: "नाशिक कुंभ 2027 में शाही स्नान (अमृत स्नान) की तिथियाँ क्या हैं?", mr: "नाशिक कुंभमेळा २०२७ मधील शाही स्नानाच्या (अमृत स्नान) तारखा कोणत्या?" },
        a: {
          en: "2 August 2027, 31 August 2027, and 11 September 2027 in Nashik (12 September 2027 in Trimbakeshwar). The hours have not been published yet. The full schedule is on our Dates page.",
          hi: "2 अगस्त 2027, 31 अगस्त 2027, और नाशिक में 11 सितंबर 2027 (त्र्यंबकेश्वर में 12 सितंबर 2027)। स्नान का समय अभी प्रकाशित नहीं हुआ है। पूरा कार्यक्रम हमारे तिथियाँ पेज पर है।",
          mr: "२ ऑगस्ट २०२७, ३१ ऑगस्ट २०२७, आणि नाशिकमध्ये ११ सप्टेंबर २०२७ (त्र्यंबकेश्वरमध्ये १२ सप्टेंबर २०२७). स्नानाच्या वेळा अद्याप जाहीर झालेल्या नाहीत. संपूर्ण वेळापत्रक आमच्या तारखा पानावर आहे.",
        },
      },
    ],
  },
  {
    id: 103,
    slug: "kumbh-tenders-4000-crore-issued",
    title: {
      en: "Tenders Worth Rs 4,000 Crore Issued; Rs 2,000 Crore More to Follow",
      hi: "4,000 करोड़ रुपये के टेंडर जारी; 2,000 करोड़ के और आएँगे",
      mr: "४,००० कोटींच्या निविदा जारी; आणखी २,००० कोटींच्या येणार",
    },
    date: "2026-05-20",
    originallyAnnounced: "2025-06-01",
    updated: "2026-10-06",
    source: "Times of India",
    sources: [
      {
        title: "Maharashtra CM Devendra Fadnavis says Nashik Kumbh to begin October 31, 2026; first holy dips on August 2, 2027",
        publisher: "Times of India",
        date: "2025-06-01",
        url: "https://timesofindia.indiatimes.com/city/nashik/maharashtra-cm-devendra-fadnavis-says-nashik-kumbh-to-begin-october-31-2026-first-holy-dips-on-august-2-2027/articleshow/121559808.cms",
        status: "confirmed",
      },
      {
        title: "Simhastha Kumbh Mela to begin in Nashik-Trimbakeshwar on October 31 next year: Amrut Snan, check all dates",
        publisher: "ETV Bharat Marathi",
        date: "2025-06-01",
        url: "https://www.etvbharat.com/mr/!state/simhastha-kumbh-mela-to-begin-in-nashik-trimbakeshwar-on-october-31-next-year-amrut-snan-check-all-dates-maharashtra-news-mhs25060103673",
        status: "confirmed",
      },
      {
        title: "Rs 25,055 crore development plan approved for 2027 Nashik Kumbh Mela",
        publisher: "Free Press Journal",
        date: "2025-10-30",
        url: "https://www.freepressjournal.in/pune/rs-25055-crore-development-plan-approved-for-2027-nashik-kumbh-mela",
        status: "reported",
      },
      {
        title: "Lok Sabha reply on the Nashik Simhastha Kumbh Mela (Ministry of Tourism)",
        publisher: "PIB",
        date: "2026-07-27",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289872",
        status: "confirmed",
      },
      {
        title: "85% of Rs 34,732 crore Kumbh outlay for permanent infrastructure: Nashik-Trimbakeshwar Kumbh Mela Authority commissioner",
        publisher: "Times of India",
        date: "2026-08-21",
        url: "https://timesofindia.indiatimes.com/city/nashik/85-of-rs-34732-crore-kumbh-outlay-for-permanent-infrastructure-nashik-trimbakeshwar-kumbh-mela-authority-commissioner/articleshow/133410592.cms",
        status: "confirmed",
      },
      {
        title: "Nashik: Girish Mahajan sets March 2027 deadline for Simhastha ghats and infrastructure works",
        publisher: "Free Press Journal",
        date: "2026-07-20",
        url: "https://www.freepressjournal.in/pune/nashik-girish-mahajan-sets-march-2027-deadline-for-simhastha-ghats-and-infrastructure-works",
        status: "confirmed",
      },
    ],
    category: "infra",
    image: "/images/gallery/kumbh-5.webp",
    summary: {
      en: "On 1 June 2025, Chief Minister Devendra Fadnavis said tenders worth about ₹4,000 crore had been issued, with about ₹2,000 crore more to follow. The budget has changed since then: ₹22,425.39 crore was approved on 13 March 2026, and the total outlay is now ₹34,732 crore.",
      hi: "1 जून 2025 को मुख्यमंत्री देवेंद्र फडणवीस ने कहा था कि लगभग ₹4,000 करोड़ के टेंडर जारी हो चुके हैं और लगभग ₹2,000 करोड़ के और आएँगे। तब से बजट बदल गया है: 13 मार्च 2026 को ₹22,425.39 करोड़ मंजूर हुए, और कुल खर्च अब ₹34,732 करोड़ है।",
      mr: "१ जून २०२५ रोजी मुख्यमंत्री देवेंद्र फडणवीस यांनी सुमारे ₹४,००० कोटींच्या निविदा जारी झाल्याचे आणि आणखी सुमारे ₹२,००० कोटींच्या येणार असल्याचे सांगितले. त्यानंतर निधीचे आकडे बदलले: १३ मार्च २०२६ रोजी ₹२२,४२५.३९ कोटी मंजूर झाले, आणि एकूण खर्च आता ₹३४,७३२ कोटी आहे.",
    },
    content: {
      en: "Update (6 October 2026): This post reports a statement made on 1 June 2025. We have updated the budget figures, which have changed since then.\n\nOn 1 June 2025, Chief Minister Devendra Fadnavis said tenders for works worth about ₹4,000 crore had already been issued for the Nashik-Trimbakeshwar Simhastha, and tenders for about ₹2,000 crore more would follow soon.\n\n## Three kinds of work\n\nThree strands of work were under way. Sewage treatment plants are being built or upgraded, because the hardest problem of a river mela is what happens to the water when huge crowds arrive beside it. Godavari cleaning is running alongside. And land is being acquired for Sadhugram, the temporary city for the akhadas and sadhus.\n\n## The budget has changed\n\n- October 2025: a ₹25,055 crore joint plan of the Centre and the state was announced, with ₹7,410 crore sanctioned at the time (Free Press Journal). This figure is now out of date.\n- 13 March 2026: the Apex Committee chaired by the Chief Minister approved a development plan of ₹22,425.39 crore (PIB).\n- 21 August 2026: NTKMA Commissioner Shekhar Singh said the total outlay is ₹34,732 crore. This includes about ₹8,762 crore from central agencies. About 85% is for permanent infrastructure (Times of India).\n\nRead more in our report on the [₹22,425.39 crore plan and the ₹34,732 crore outlay](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay).\n\n## What this means for pilgrims\n\nFor pilgrims, the real question is not the budget but the timing. More than 350 works are under way, and officials have set March 2027 as the target for all major works, ahead of the Amrit Snans in August and September 2027. See the snan calendar on [Dates](/dates) and plan your trip with the [Guide](/guide).",
      hi: "अपडेट (6 अक्टूबर 2026): यह लेख 1 जून 2025 के एक बयान पर आधारित है। तब से बजट के आँकड़े बदल गए हैं, इसलिए उन्हें अपडेट किया गया है।\n\n1 जून 2025 को मुख्यमंत्री देवेंद्र फडणवीस ने कहा था कि नाशिक-त्र्यंबकेश्वर सिंहस्थ के लिए लगभग ₹4,000 करोड़ के कामों के टेंडर जारी हो चुके हैं, और जल्द ही लगभग ₹2,000 करोड़ के और टेंडर आएँगे।\n\n## तीन तरह के काम\n\nतीन दिशाओं में काम चल रहा था। सीवेज उपचार संयंत्र बनाए या उन्नत किए जा रहे हैं, क्योंकि नदी मेले की सबसे कठिन समस्या यही है कि भारी भीड़ आने पर पानी का क्या हो। साथ में गोदावरी की सफाई चल रही है। और साधुग्राम के लिए ज़मीन ली जा रही है, जो अखाड़ों और साधुओं का अस्थायी नगर है।\n\n## बजट बदल गया है\n\n- अक्टूबर 2025: केंद्र और राज्य की ₹25,055 करोड़ की संयुक्त योजना घोषित हुई, जिसमें से उस समय ₹7,410 करोड़ मंजूर हुए (फ्री प्रेस जर्नल)। यह आँकड़ा अब पुराना है।\n- 13 मार्च 2026: मुख्यमंत्री की अध्यक्षता वाली शीर्ष समिति (Apex Committee) ने ₹22,425.39 करोड़ की विकास योजना मंजूर की (PIB)।\n- 21 अगस्त 2026: NTKMA आयुक्त शेखर सिंह ने बताया कि कुल खर्च ₹34,732 करोड़ है। इसमें केंद्रीय एजेंसियों के लगभग ₹8,762 करोड़ शामिल हैं। लगभग 85% पैसा स्थायी बुनियादी ढाँचे पर है (टाइम्स ऑफ इंडिया)।\n\nविस्तार से पढ़ें: [₹22,425.39 करोड़ की योजना और ₹34,732 करोड़ का कुल खर्च](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay)।\n\n## श्रद्धालुओं के लिए इसका मतलब\n\nश्रद्धालुओं के लिए असली सवाल बजट नहीं, समय है। 350 से ज़्यादा काम चल रहे हैं, और अधिकारियों ने सभी बड़े कामों के लिए मार्च 2027 का लक्ष्य रखा है, यानी अगस्त और सितंबर 2027 के अमृत स्नान से पहले। स्नान की तिथियाँ [तिथियाँ](/dates) पेज पर देखें और यात्रा की योजना [गाइड](/guide) से बनाएँ।",
      mr: "अपडेट (६ ऑक्टोबर २०२६): ही बातमी १ जून २०२५ रोजीच्या निवेदनावर आधारित आहे. त्यानंतर निधीचे आकडे बदलले असल्याने ते अद्ययावत केले आहेत.\n\n१ जून २०२५ रोजी मुख्यमंत्री देवेंद्र फडणवीस यांनी सांगितले की नाशिक-त्र्यंबकेश्वर सिंहस्थासाठी सुमारे ₹४,००० कोटींच्या कामांच्या निविदा आधीच जारी झाल्या असून, लवकरच आणखी सुमारे ₹२,००० कोटींच्या निविदा येतील.\n\n## तीन प्रकारची कामे\n\nतीन दिशांनी काम सुरू होते. सांडपाणी प्रक्रिया प्रकल्प उभारले किंवा सुधारले जात आहेत, कारण नदीकाठच्या मेळ्यात प्रचंड गर्दी आली की पाण्याचे काय, हाच सर्वात कठीण प्रश्न असतो. सोबत गोदावरी स्वच्छता सुरू आहे. आणि आखाडे व साधूंच्या तात्पुरत्या वसाहतीसाठी, म्हणजे साधुग्रामसाठी, जमीन ताब्यात घेतली जात आहे.\n\n## निधीचे आकडे बदलले\n\n- ऑक्टोबर २०२५: केंद्र आणि राज्याचा ₹२५,०५५ कोटींचा संयुक्त आराखडा जाहीर झाला, त्यापैकी त्या वेळी ₹७,४१० कोटी मंजूर झाले (फ्री प्रेस जर्नल). हा आकडा आता जुना झाला आहे.\n- १३ मार्च २०२६: मुख्यमंत्र्यांच्या अध्यक्षतेखालील शिखर समितीने (Apex Committee) ₹२२,४२५.३९ कोटींच्या विकास आराखड्याला मंजुरी दिली (PIB).\n- २१ ऑगस्ट २०२६: NTKMA आयुक्त शेखर सिंह यांनी सांगितले की एकूण खर्च ₹३४,७३२ कोटी आहे. त्यात केंद्रीय यंत्रणांचे सुमारे ₹८,७६२ कोटी आहेत. सुमारे ८५% रक्कम कायमस्वरूपी पायाभूत सुविधांसाठी आहे (टाइम्स ऑफ इंडिया).\n\nसविस्तर वाचा: [₹२२,४२५.३९ कोटींचा आराखडा आणि ₹३४,७३२ कोटींचा एकूण खर्च](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay).\n\n## भाविकांसाठी याचा अर्थ\n\nभाविकांसाठी खरा प्रश्न निधीचा नाही, तर वेळेचा आहे. ३५० हून अधिक कामे सुरू आहेत, आणि सर्व मोठी कामे मार्च २०२७ पर्यंत पूर्ण करण्याचे लक्ष्य अधिकाऱ्यांनी ठेवले आहे, म्हणजे ऑगस्ट आणि सप्टेंबर 2027 मधील अमृत स्नानांच्या आधी. स्नानाच्या तारखा [तारखा](/dates) पानावर पाहा आणि प्रवासाचे नियोजन [मार्गदर्शक](/guide) पानावरून करा.",
    },
  },
  {
    id: 104,
    slug: "ai-crowd-management-kumbh-authority",
    title: {
      en: "Nashik Kumbh 2027 Crowd Management: AI, Command Centres and CCTV Explained",
      hi: "नाशिक कुंभ 2027 में भीड़ प्रबंधन: AI, कमांड सेंटर और CCTV की पूरी जानकारी",
      mr: "नाशिक कुंभमेळा २०२७ गर्दी व्यवस्थापन: AI, कमांड सेंटर आणि सीसीटीव्हीची संपूर्ण माहिती",
    },
    date: "2026-04-05",
    updated: "2026-10-20",
    source: "News On Air",
    sources: [
      {
        title: "NMC gets Rs 32.8 crore nod for third Kumbh command centre",
        publisher: "Times of India",
        date: "2026-10-04",
        url: "https://timesofindia.indiatimes.com/city/nashik/nmc-gets-rs32-8-crore-nod-for-third-kumbh-command-centre/articleshow/134678576.cms",
        status: "confirmed",
      },
      {
        title: "Real-time management: AI-powered platform planned to help track crowds, simulate scenarios, strengthen emergency response during Kumbh",
        publisher: "Times of India",
        date: "2026-08-18",
        url: "https://timesofindia.indiatimes.com/city/nashik/real-time-management-ai-powered-platform-planned-to-help-track-crowds-simulate-scenarios-strengthen-emergency-response-during-kumbh/articleshow/133327515.cms",
        status: "confirmed",
      },
      {
        title: "Kumbh Mela Plan, Nashik-Trimbakeshwar Simhastha 2027",
        publisher: "Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)",
        date: "2026-06-15",
        url: "https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2026/06/20260615229440107.pdf",
        status: "confirmed",
      },
      {
        title: "How AI may power pilgrims' progress during Nashik Kumbh Mela in 2027",
        publisher: "India Today",
        date: "2026-10-05",
        url: "https://www.indiatoday.in/india-today-insight/story/how-ai-may-power-pilgrims-progress-during-nashik-kumbh-mela-in-2027-3010133-2026-10-05",
        status: "reported",
      },
      {
        title: "Nashik: Digital Kumbh To Bring AI, QR Codes And Smart Technology To Simhastha 2027",
        publisher: "Free Press Journal",
        date: "2026-10-07",
        url: "https://www.freepressjournal.in/pune/nashik-digital-kumbh-to-bring-ai-qr-codes-and-smart-technology-to-simhastha-2027",
        status: "reported",
      },
      {
        title: "Colour-coded signboards to guide pilgrims at Simhastha Kumbh",
        publisher: "Times of India",
        date: "2026-10-18",
        url: "https://timesofindia.indiatimes.com/city/nashik/colour-coded-signboards-to-guide-pilgrims-at-simhastha-kumbh/articleshow/135032492.cms",
        status: "reported",
      },
      {
        title: "The Nashik-Trimbakeshwar Kumbh Mela Authority Act, 2025 (Mah. Act No. XXXIII of 2025), Maharashtra Government Gazette",
        publisher: "Government of Maharashtra (copy via PRS Legislative Research)",
        date: "2025-07-10",
        url: "https://prsindia.org/files/bills_acts/acts_states/maharashtra/2025/Act33of2025MH.pdf",
        status: "confirmed",
      },
    ],
    category: "govt",
    image: "/images/gallery/kumbh-9.webp",
    summary: {
      en: "Nashik Kumbh crowds will be watched from three command centres (ICCC); the third, at Adgaon, is approved and due by March 2027. About 4,000 CCTV cameras in Nashik and 1,000 in Trimbakeshwar are being linked. The AI 'Digital Twin', AI call centre and KumbhDoot assistant are still proposals, not live. NTKMA, set up under a 2025 state law, runs the plan.",
      hi: "नाशिक कुंभ की भीड़ पर तीन कमांड सेंटर (ICCC) से नज़र रखी जाएगी; तीसरा आडगांव में मंज़ूर हुआ है और मार्च 2027 तक शुरू होना है। नाशिक में करीब 4,000 और त्र्यंबकेश्वर में 1,000 CCTV कैमरे जोड़े जा रहे हैं। AI 'डिजिटल ट्विन', AI कॉल सेंटर और कुंभदूत सहायक अभी प्रस्ताव हैं, चालू नहीं। यह व्यवस्था 2025 के राज्य क़ानून से बना NTKMA संभालता है।",
      mr: "नाशिक कुंभमेळ्यातील गर्दीवर तीन कमांड सेंटरमधून (ICCC) लक्ष ठेवले जाईल; तिसरे आडगावला मंजूर झाले असून ते मार्च २०२७ पर्यंत सुरू होणार आहे. नाशिकमध्ये सुमारे ४,००० आणि त्र्यंबकेश्वरमध्ये १,००० सीसीटीव्ही कॅमेरे जोडले जात आहेत. AI 'डिजिटल ट्विन', AI कॉल सेंटर आणि कुंभदूत मदतनीस अजून प्रस्तावातच आहेत, सुरू झालेले नाहीत. ही व्यवस्था २०२५ च्या राज्य कायद्याने स्थापन झालेले NTKMA पाहते.",
    },
    content: {
      en: "Update (20 October 2026): We have added what the official NTKMA plan says about crowd control, links to the newer reports, and answers to common questions.\n\nMaharashtra has said the 2027 Simhastha will use digital tools and artificial intelligence across departments, from planning and infrastructure to crowd monitoring and the coordination of road, rail and air transport.\n\n## The Authority law is in force\n\nAn earlier version of this post said a law was only planned. That was wrong. The Nashik-Trimbakeshwar Kumbh Mela Authority Act, 2025 (Maharashtra Act 33 of 2025) is already in force ([read the Act](https://prsindia.org/files/bills_acts/acts_states/maharashtra/2025/Act33of2025MH.pdf)). It set up the Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA). Divisional Commissioner Dr Praveen Gedam is its Chairman, Shekhar Singh is its Commissioner, and Collector Ayush Prasad is its Vice-chairman.\n\nA legal authority matters. It gives Kumbh projects a framework that stays in place when officers change, and it puts crowd decisions with one body that can act fast.\n\n## Why crowds are the big problem\n\nAccording to the NTKMA plan, about 1.5 crore pilgrims are expected in Nashik and about 0.75 crore in Trimbakeshwar on an Amrit Snan day. At that scale, the gap between a calm morning and a disaster can be a few minutes, and depends on how fast someone can close one road and open another. Cameras and computer models help only if one authority can act on what they show.\n\n## What the official NTKMA plan says about crowds\n\nThe NTKMA Kumbh Mela Plan (June 2026) sets out how crowds are to be handled. The plan itself says it is still under review, so read these as planned measures, not final orders. In its chapter on lessons from earlier Kumbhs, it lists these measures for Nashik-Trimbakeshwar:\n\n- central monitoring from the ICCC, with fixed cameras, PTZ cameras and drones\n- holding areas along all approach roads, with hold-and-release and zig-zag queues\n- one-way routes, and separate routes in and out\n- the mela area declared a strict no-vehicle zone\n- one colour code for pathways, signs, holding areas and zones\n- a 'Zero Corridor' kept clear for ambulances and emergency vehicles\n- high-risk spots marked as no-stopping, no-sitting and no-sleeping zones\n- a separate crowd plan for Kushavarta in Trimbakeshwar, which is only 75 ft × 75 ft\n\nThe reason is the ground itself. Prayagraj has flat land along the Sangam. Nashik and Trimbakeshwar have hilly terrain and narrow ghats on the Godavari, so crowds must be handled in a much tighter space.\n\nThe plan's disaster chapter adds AI-based crowd analytics and drone surveillance linked to the ICCC, and public-address and SMS alerts in several languages. Its Digital Kumbh chapter proposes an AI voice bot for lost-and-found help, routing medical emergencies and crowd alerts. All of these are proposals.\n\n## Newer reports on this story\n\n- [Third Kumbh command centre approved, about 5,000 CCTV cameras being linked](/blog/third-kumbh-command-centre-approved-5000-cctv-cameras): the ₹32.8 crore Adgaon ICCC, the Digital Twin plan and police numbers (6 October 2026).\n- [KumbhDoot AI assistant, QR codes and crowd monitoring proposed](/blog/digital-kumbh-kumbhdoot-ai-assistant-qr-codes): an AI helper in more than 20 Indian languages, still a proposal (14 October 2026).\n- [Colour-coded signboards and sectors planned](/blog/colour-coded-signboards-sectors-simhastha-kumbh-dawale-review): follow one colour from entry to exit; movement between sectors may be stopped on peak bathing days (19 October 2026).\n\n## What visitors should do\n\nWhatever technology the mela uses, the advice for a visitor stays the same. Know your way out before you go down to the water. Agree on a meeting point with your family that is a place, not a person. Once the colour-coded signs are up, note the colour of your route and your parking so you can follow it back. Save the numbers on our [Emergency](/emergency) page, check the snan days on [Dates](/dates), and read the [Guide](/guide) before you travel.\n\n## Update (6 October 2026)\n\n- NTKMA has approved ₹32.8 crore for a third integrated command centre at the Rural Police HQ in Adgaon, to be running by March 2027. The other two are at NMC's Panchavati office and the city police commissionerate (Times of India, 4 October 2026).\n- About 4,000 CCTV cameras in Nashik and 1,000 in Trimbakeshwar are being linked over the Smart City fibre network.\n- An AI 'Digital Twin' is proposed: a live map-based dashboard at the command centre for crowd density, traffic, health, disasters and lost-and-found. Commissioner Shekhar Singh said it will run 'human-in-the-loop' (Times of India, 18 August 2026). It is still a proposal.",
      hi: "अपडेट (20 अक्टूबर 2026): इस लेख में भीड़ नियंत्रण पर NTKMA की आधिकारिक योजना, नई खबरों के लिंक और आम सवालों के जवाब जोड़े गए हैं।\n\nमहाराष्ट्र ने कहा है कि 2027 के सिंहस्थ में योजना और बुनियादी ढाँचे से लेकर भीड़ निगरानी और सड़क, रेल व हवाई परिवहन के तालमेल तक, सभी विभागों में डिजिटल उपकरण और कृत्रिम बुद्धिमत्ता (AI) का उपयोग होगा।\n\n## प्राधिकरण का क़ानून लागू है\n\nइस लेख के पहले संस्करण में लिखा था कि क़ानून लाने की योजना है। यह गलत था। नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण अधिनियम, 2025 (महाराष्ट्र अधिनियम 33, 2025) पहले से लागू है ([अधिनियम पढ़ें](https://prsindia.org/files/bills_acts/acts_states/maharashtra/2025/Act33of2025MH.pdf))। इसी से नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) बना। विभागीय आयुक्त डॉ. प्रवीण गेडाम इसके अध्यक्ष, शेखर सिंह आयुक्त और कलेक्टर आयुष प्रसाद उपाध्यक्ष हैं।\n\nक़ानूनी प्राधिकरण इसलिए अहम है क्योंकि यह कुंभ परियोजनाओं को ऐसा ढाँचा देता है जो अधिकारी बदलने पर भी बना रहता है, और भीड़ से जुड़े फैसले एक ऐसे निकाय को देता है जो तुरंत कदम उठा सके।\n\n## भीड़ सबसे बड़ी चुनौती क्यों\n\nNTKMA योजना के अनुसार अमृत स्नान के दिन नाशिक में लगभग 1.5 करोड़ और त्र्यंबकेश्वर में लगभग 0.75 करोड़ श्रद्धालु आने का अनुमान है। इतनी भीड़ में शांत सुबह और हादसे के बीच का अंतर कुछ मिनटों का हो सकता है, और इस पर निर्भर करता है कि कोई कितनी जल्दी एक रास्ता बंद कर दूसरा खोल सकता है। कैमरे और कंप्यूटर मॉडल तभी काम आते हैं जब एक प्राधिकरण उन पर तुरंत कार्रवाई कर सके।\n\n## NTKMA की आधिकारिक योजना भीड़ के बारे में क्या कहती है\n\nNTKMA की कुंभ मेला योजना (जून 2026) में भीड़ संभालने का खाका दिया गया है। योजना में ही लिखा है कि इसकी समीक्षा जारी है, इसलिए इन्हें अंतिम आदेश नहीं, प्रस्तावित उपाय समझें। पिछले कुंभों से मिली सीख वाले अध्याय में नाशिक-त्र्यंबकेश्वर के लिए ये उपाय दिए गए हैं:\n\n- ICCC से केंद्रीय निगरानी, फिक्स्ड कैमरे, PTZ कैमरे और ड्रोन के ज़रिए\n- सभी पहुँच मार्गों पर होल्डिंग एरिया, जहाँ भीड़ को रोककर थोड़ा-थोड़ा छोड़ा जाएगा और ज़िग-ज़ैग कतारें होंगी\n- एकतरफ़ा रास्ते, और आने-जाने के अलग रास्ते\n- मेला क्षेत्र को सख़्त 'नो-व्हीकल ज़ोन' घोषित करना\n- रास्तों, साइनबोर्ड, होल्डिंग एरिया और ज़ोन के लिए एक जैसा रंग-कोड\n- एम्बुलेंस और आपात वाहनों के लिए खाली रखा गया 'ज़ीरो कॉरिडोर'\n- जोखिम वाली जगहों पर रुकना, बैठना और सोना मना\n- त्र्यंबकेश्वर के कुशावर्त के लिए अलग भीड़ योजना, क्योंकि यह कुंड सिर्फ़ 75 फुट × 75 फुट का है\n\nइसकी वजह यहाँ की ज़मीन है। प्रयागराज में संगम किनारे समतल ज़मीन है। नाशिक और त्र्यंबकेश्वर में पहाड़ी इलाका और गोदावरी के सँकरे घाट हैं, इसलिए भीड़ को बहुत कम जगह में संभालना होगा।\n\nयोजना के आपदा प्रबंधन अध्याय में ICCC से जुड़े AI आधारित भीड़ विश्लेषण और ड्रोन निगरानी, और कई भाषाओं में लाउडस्पीकर व SMS अलर्ट की बात है। डिजिटल कुंभ अध्याय में एक AI वॉइस बॉट प्रस्तावित है, जो खोया-पाया, मेडिकल आपात स्थिति में सही जगह संपर्क जोड़ने और भीड़ के अलर्ट में मदद करेगा। ये सभी प्रस्ताव हैं।\n\n## इस विषय पर नई खबरें\n\n- [कुंभ के लिए तीसरा कमांड सेंटर मंज़ूर, करीब 5,000 CCTV कैमरे जुड़ेंगे](/blog/third-kumbh-command-centre-approved-5000-cctv-cameras): आडगांव का ₹32.8 करोड़ का ICCC, डिजिटल ट्विन योजना और पुलिस बल (6 अक्टूबर 2026)।\n- [कुंभदूत AI सहायक, QR कोड और भीड़ निगरानी का प्रस्ताव](/blog/digital-kumbh-kumbhdoot-ai-assistant-qr-codes): 20 से ज़्यादा भारतीय भाषाओं वाला AI साथी, अभी प्रस्ताव ही (14 अक्टूबर 2026)।\n- [रंगों वाले दिशा-संकेत और सेक्टर व्यवस्था की योजना](/blog/colour-coded-signboards-sectors-simhastha-kumbh-dawale-review): प्रवेश से निकास तक एक ही रंग के पीछे चलें; मुख्य स्नान के दिनों में सेक्टरों के बीच आवाजाही रोकी जा सकती है (19 अक्टूबर 2026)।\n\n## श्रद्धालु क्या करें\n\nमेला चाहे जो तकनीक लगाए, श्रद्धालु के लिए सलाह वही है। पानी तक उतरने से पहले बाहर निकलने का रास्ता जान लें। परिवार के साथ मिलने की एक जगह तय करें, कोई व्यक्ति नहीं। रंगों वाले दिशा-संकेत लगने के बाद अपने रास्ते और पार्किंग का रंग याद रखें, ताकि उसी के सहारे लौट सकें। हमारे [आपातकालीन](/emergency) पेज के नंबर फोन में सेव करें, स्नान की तिथियाँ [तिथियाँ](/dates) पर देखें और यात्रा से पहले [गाइड](/guide) पढ़ें।\n\n## अपडेट (6 अक्टूबर 2026)\n\n- NTKMA ने अडगांव में ग्रामीण पुलिस मुख्यालय पर तीसरे एकीकृत कमांड सेंटर के लिए ₹32.8 करोड़ मंजूर किए हैं, जो मार्च 2027 तक चालू होगा। बाकी दो NMC के पंचवटी कार्यालय और शहर पुलिस आयुक्तालय में हैं (टाइम्स ऑफ इंडिया, 4 अक्टूबर 2026)।\n- नाशिक में लगभग 4,000 और त्र्यंबकेश्वर में 1,000 CCTV कैमरे स्मार्ट सिटी फाइबर नेटवर्क से जोड़े जा रहे हैं।\n- एक AI 'डिजिटल ट्विन' प्रस्तावित है: कमांड सेंटर पर नक्शे पर आधारित लाइव डैशबोर्ड, जिसमें भीड़ घनत्व, यातायात, स्वास्थ्य, आपदा और खोया-पाया की जानकारी होगी। आयुक्त शेखर सिंह ने कहा कि यह 'human-in-the-loop' तरीके से चलेगा, यानी अंतिम फैसला इंसान लेंगे (टाइम्स ऑफ इंडिया, 18 अगस्त 2026)। यह अभी प्रस्ताव ही है।",
      mr: "अपडेट (२० ऑक्टोबर २०२६): या लेखात गर्दी नियंत्रणाबाबत NTKMA च्या अधिकृत आराखड्यातील माहिती, ताज्या बातम्यांचे दुवे आणि नेहमीच्या प्रश्नांची उत्तरे जोडली आहेत.\n\n२०२७ च्या सिंहस्थात नियोजन आणि पायाभूत सुविधांपासून गर्दी निरीक्षण आणि रस्ते, रेल्वे व हवाई वाहतुकीच्या समन्वयापर्यंत सर्व विभागांत डिजिटल साधने आणि कृत्रिम बुद्धिमत्ता (AI) वापरली जाईल, असे महाराष्ट्राने सांगितले आहे.\n\n## प्राधिकरणाचा कायदा लागू आहे\n\nया बातमीच्या आधीच्या आवृत्तीत कायदा फक्त प्रस्तावित असल्याचे म्हटले होते. ते चुकीचे होते. नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरण अधिनियम, २०२५ (महाराष्ट्र अधिनियम क्र. ३३, २०२५) आधीच लागू आहे ([अधिनियम वाचा](https://prsindia.org/files/bills_acts/acts_states/maharashtra/2025/Act33of2025MH.pdf)). याच कायद्याने नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA) स्थापन झाले. विभागीय आयुक्त डॉ. प्रवीण गेडाम अध्यक्ष, शेखर सिंह आयुक्त आणि जिल्हाधिकारी आयुष प्रसाद उपाध्यक्ष आहेत.\n\nकायदेशीर प्राधिकरण महत्त्वाचे आहे. अधिकारी बदलले तरी कुंभ प्रकल्पांची चौकट टिकून राहते, आणि गर्दीचे निर्णय तातडीने घेऊ शकणाऱ्या एकाच संस्थेकडे राहतात.\n\n## गर्दी हेच मोठे आव्हान\n\nNTKMA आराखड्यानुसार अमृत स्नानाच्या दिवशी नाशिकमध्ये सुमारे १.५ कोटी आणि त्र्यंबकेश्वरमध्ये सुमारे ०.७५ कोटी भाविक येतील असा अंदाज आहे. इतक्या गर्दीत शांत सकाळ आणि दुर्घटना यांतील फरक काही मिनिटांचा असू शकतो, आणि तो एक रस्ता बंद करून दुसरा किती लवकर उघडता येतो यावर अवलंबून असतो. कॅमेरे आणि संगणकीय प्रारूपे तेव्हाच उपयोगी, जेव्हा एक प्राधिकरण त्यावर लगेच कृती करू शकते.\n\n## NTKMA च्या अधिकृत आराखड्यात गर्दीबद्दल काय आहे\n\nNTKMA च्या कुंभमेळा आराखड्यात (जून २०२६) गर्दी कशी हाताळायची याची रूपरेषा दिली आहे. आराखड्याचा अजून आढावा सुरू असल्याचे त्यातच नमूद आहे, त्यामुळे हे अंतिम आदेश नव्हेत, तर नियोजित उपाय समजावेत. मागील कुंभमेळ्यांतील अनुभवांच्या प्रकरणात नाशिक-त्र्यंबकेश्वरसाठी हे उपाय दिले आहेत:\n\n- ICCC मधून केंद्रीय देखरेख: स्थिर कॅमेरे, PTZ कॅमेरे आणि ड्रोनद्वारे\n- सर्व प्रवेशमार्गांवर होल्डिंग एरिया, जिथे गर्दी थांबवून टप्प्याटप्प्याने सोडली जाईल आणि नागमोडी रांगा असतील\n- एकेरी मार्ग, आणि येण्या-जाण्याचे वेगळे मार्ग\n- मेळा क्षेत्र कडक 'नो-व्हेइकल झोन' म्हणून जाहीर करणे\n- मार्ग, फलक, होल्डिंग एरिया आणि झोनसाठी एकसारखे रंगसंकेत\n- रुग्णवाहिका आणि आपत्कालीन वाहनांसाठी मोकळा ठेवलेला 'झिरो कॉरिडॉर'\n- धोकादायक ठिकाणी थांबणे, बसणे आणि झोपणे मनाई\n- त्र्यंबकेश्वरच्या कुशावर्तासाठी स्वतंत्र गर्दी नियोजन, कारण हे कुंड फक्त ७५ फूट × ७५ फूट आहे\n\nयामागचे कारण इथली भौगोलिक रचना आहे. प्रयागराजला संगमाकाठी सपाट जमीन आहे. नाशिक-त्र्यंबकेश्वरमध्ये डोंगराळ भाग आणि गोदावरीचे अरुंद घाट आहेत, त्यामुळे खूप कमी जागेत गर्दी सांभाळावी लागेल.\n\nआराखड्याच्या आपत्ती व्यवस्थापन प्रकरणात ICCC शी जोडलेले AI आधारित गर्दी विश्लेषण आणि ड्रोनद्वारे देखरेख, तसेच अनेक भाषांत ध्वनिक्षेपक व SMS सूचना यांचा उल्लेख आहे. डिजिटल कुंभ प्रकरणात AI व्हॉइस बॉट प्रस्तावित आहे; तो हरवले-सापडले, वैद्यकीय आणीबाणीत योग्य ठिकाणी संपर्क जोडणे आणि गर्दीच्या सूचना यांसाठी मदत करेल. हे सर्व प्रस्ताव आहेत.\n\n## या विषयावरील ताज्या बातम्या\n\n- [कुंभमेळ्यासाठी तिसऱ्या कमांड सेंटरला मंजुरी, सुमारे ५,००० सीसीटीव्ही कॅमेरे जोडणार](/blog/third-kumbh-command-centre-approved-5000-cctv-cameras): आडगावचे ₹३२.८ कोटींचे ICCC, डिजिटल ट्विन योजना आणि पोलीस बळ (६ ऑक्टोबर २०२६).\n- [कुंभदूत AI मदतनीस, QR कोड आणि गर्दी निरीक्षणाचा प्रस्ताव](/blog/digital-kumbh-kumbhdoot-ai-assistant-qr-codes): २० हून अधिक भारतीय भाषांतील AI सहायक, अजून प्रस्तावच (१४ ऑक्टोबर २०२६).\n- [भाविकांची चुकामूक टाळण्यासाठी रंगसंकेतांचे फलक आणि सेक्टर व्यवस्था](/blog/colour-coded-signboards-sectors-simhastha-kumbh-dawale-review): प्रवेशापासून बाहेर पडेपर्यंत एकाच रंगाचा माग; मुख्य स्नानाच्या दिवशी सेक्टरमधील ये-जा थांबवली जाऊ शकते (१९ ऑक्टोबर २०२६).\n\n## भाविकांनी काय करावे\n\nमेळ्यात कोणतेही तंत्रज्ञान वापरले तरी भाविकांसाठी सल्ला तोच आहे. पाण्यापर्यंत उतरण्यापूर्वी बाहेर पडण्याचा मार्ग माहीत करून घ्या. कुटुंबाशी भेटण्याची एक जागा ठरवा, कोणी व्यक्ती नव्हे. रंगसंकेतांचे फलक लागल्यावर आपल्या मार्गाचा आणि पार्किंगचा रंग लक्षात ठेवा, म्हणजे त्याच रंगाच्या आधारे परत येता येईल. आमच्या [आपत्कालीन](/emergency) पानावरील क्रमांक फोनमध्ये जतन करा, स्नानाच्या तारखा [तारखा](/dates) पानावर पाहा आणि प्रवासापूर्वी [मार्गदर्शक](/guide) वाचा. नाशिक कुंभमेळा 2027 साठी हे उपयोगी ठरेल.\n\n## अपडेट (६ ऑक्टोबर २०२६)\n\n- NTKMA ने आडगाव येथील ग्रामीण पोलीस मुख्यालयात तिसऱ्या एकात्मिक नियंत्रण केंद्रासाठी ₹३२.८ कोटी मंजूर केले असून, ते मार्च २०२७ पर्यंत सुरू होईल. उरलेली दोन केंद्रे NMC च्या पंचवटी कार्यालयात आणि शहर पोलीस आयुक्तालयात आहेत (टाइम्स ऑफ इंडिया, ४ ऑक्टोबर २०२६).\n- नाशिकमध्ये सुमारे ४,००० आणि त्र्यंबकेश्वरमध्ये १,००० CCTV कॅमेरे स्मार्ट सिटी फायबर नेटवर्कने जोडले जात आहेत.\n- AI 'डिजिटल ट्विन' प्रस्तावित आहे: नियंत्रण केंद्रावरील नकाशाआधारित थेट डॅशबोर्ड, ज्यात गर्दीची घनता, वाहतूक, आरोग्य, आपत्ती आणि हरवले-सापडले यांची माहिती असेल. आयुक्त शेखर सिंह यांनी ही यंत्रणा 'human-in-the-loop' पद्धतीने, म्हणजे अंतिम निर्णय माणसांकडे ठेवून, चालेल असे सांगितले (टाइम्स ऑफ इंडिया, १८ ऑगस्ट २०२६). हा अद्याप प्रस्तावच आहे.",
    },
    faq: [
      {
        q: { en: "How will crowds be managed at the Nashik Kumbh 2027?", hi: "नाशिक कुंभ 2027 में भीड़ कैसे संभाली जाएगी?", mr: "नाशिक कुंभमेळा २०२७ मध्ये गर्दी कशी सांभाळली जाणार?" },
        a: {
          en: "From command centres and on the ground. Cameras and drones feed the Integrated Command and Control Centres (ICCC). The NTKMA plan adds holding areas on approach roads, one-way routes, separate routes in and out, colour-coded signs and a no-vehicle mela area. Its training plan expects more than 50,000 police and more than 10,000 volunteers.",
          hi: "कमांड सेंटर से भी और ज़मीन पर भी। कैमरे और ड्रोन की जानकारी इंटीग्रेटेड कमांड एंड कंट्रोल सेंटर (ICCC) तक पहुँचेगी। NTKMA योजना में पहुँच मार्गों पर होल्डिंग एरिया, एकतरफ़ा रास्ते, आने-जाने के अलग रास्ते, रंगों वाले दिशा-संकेत और वाहन-मुक्त मेला क्षेत्र भी है। प्रशिक्षण योजना में 50,000 से ज़्यादा पुलिसकर्मी और 10,000 से ज़्यादा स्वयंसेवक अपेक्षित हैं।",
          mr: "कमांड सेंटरमधूनही आणि प्रत्यक्ष मैदानावरही. कॅमेरे आणि ड्रोनची माहिती एकात्मिक नियंत्रण व आदेश केंद्रांकडे (ICCC) जाईल. NTKMA आराखड्यात प्रवेशमार्गांवर होल्डिंग एरिया, एकेरी मार्ग, येण्या-जाण्याचे वेगळे मार्ग, रंगसंकेतांचे फलक आणि वाहनमुक्त मेळा क्षेत्र यांचाही समावेश आहे. प्रशिक्षण आराखड्यात ५०,००० हून अधिक पोलीस आणि १०,००० हून अधिक स्वयंसेवक अपेक्षित आहेत.",
        },
      },
      {
        q: { en: "How many command centres and CCTV cameras will there be?", hi: "कितने कमांड सेंटर और CCTV कैमरे होंगे?", mr: "किती कमांड सेंटर आणि सीसीटीव्ही कॅमेरे असतील?" },
        a: {
          en: "Three ICCCs: at NMC's Panchavati office, at the city police commissionerate, and a third at the Rural Police HQ in Adgaon, approved for ₹32.8 crore and due by March 2027. About 4,000 CCTV cameras in Nashik and 1,000 in Trimbakeshwar are being linked over the Smart City fibre network (Times of India, 4 October 2026).",
          hi: "तीन ICCC: NMC के पंचवटी कार्यालय में, शहर पुलिस आयुक्तालय में, और तीसरा आडगांव के ग्रामीण पुलिस मुख्यालय में, जिसके लिए ₹32.8 करोड़ मंज़ूर हुए हैं और जो मार्च 2027 तक शुरू होना है। नाशिक में करीब 4,000 और त्र्यंबकेश्वर में 1,000 CCTV कैमरे स्मार्ट सिटी फाइबर नेटवर्क से जोड़े जा रहे हैं (टाइम्स ऑफ इंडिया, 4 अक्टूबर 2026)।",
          mr: "तीन ICCC: NMC च्या पंचवटी कार्यालयात, शहर पोलीस आयुक्तालयात, आणि तिसरे आडगावच्या ग्रामीण पोलीस मुख्यालयात. त्यासाठी ₹३२.८ कोटी मंजूर असून ते मार्च २०२७ पर्यंत सुरू होणार आहे. नाशिकमध्ये सुमारे ४,००० आणि त्र्यंबकेश्वरमध्ये १,००० सीसीटीव्ही कॅमेरे स्मार्ट सिटीच्या फायबर नेटवर्कने जोडले जात आहेत (टाइम्स ऑफ इंडिया, ४ ऑक्टोबर २०२६).",
        },
      },
      {
        q: { en: "Is the AI 'Digital Twin' or the KumbhDoot assistant live?", hi: "क्या AI 'डिजिटल ट्विन' या कुंभदूत सहायक शुरू हो गया है?", mr: "AI 'डिजिटल ट्विन' किंवा कुंभदूत मदतनीस सुरू झाला आहे का?" },
        a: {
          en: "No. As of 20 October 2026, the Digital Twin dashboard, the AI call centre, AI lost-and-found and the KumbhDoot assistant are all proposals. NTKMA Commissioner Shekhar Singh has said the system will run 'human-in-the-loop', with people making the final decisions. Be careful of any app that calls itself the official Kumbh assistant before NTKMA announces one.",
          hi: "नहीं। 20 अक्टूबर 2026 तक डिजिटल ट्विन डैशबोर्ड, AI कॉल सेंटर, AI खोया-पाया और कुंभदूत सहायक, सभी प्रस्ताव ही हैं। NTKMA आयुक्त शेखर सिंह ने कहा है कि यह व्यवस्था 'human-in-the-loop' चलेगी, यानी अंतिम फैसले इंसान लेंगे। NTKMA की घोषणा से पहले खुद को आधिकारिक कुंभ सहायक बताने वाले किसी भी ऐप से सावधान रहें।",
          mr: "नाही. २० ऑक्टोबर २०२६ पर्यंत डिजिटल ट्विन डॅशबोर्ड, AI कॉल सेंटर, AI हरवले-सापडले आणि कुंभदूत मदतनीस हे सगळे प्रस्तावच आहेत. ही यंत्रणा 'human-in-the-loop' पद्धतीने, म्हणजे अंतिम निर्णय माणसांकडे ठेवून चालेल, असे NTKMA आयुक्त शेखर सिंह यांनी सांगितले आहे. NTKMA ने घोषणा करण्याआधी स्वतःला अधिकृत कुंभ मदतनीस म्हणवणाऱ्या कोणत्याही ॲपपासून सावध राहा.",
        },
      },
      {
        q: { en: "Will facial recognition be used at the Nashik Kumbh?", hi: "क्या नाशिक कुंभ में फेशियल रिकग्निशन (चेहरा पहचान) का इस्तेमाल होगा?", mr: "नाशिक कुंभमेळ्यात चेहरा ओळख प्रणाली (फेशियल रिकग्निशन) वापरली जाणार का?" },
        a: {
          en: "No decision has been announced. India Today reported on 5 October 2026 that a Nashik team is studying the AI headcount and facial-recognition system that Solapur Rural police used at the Ashadhi wari in Pandharpur.",
          hi: "ऐसा कोई फैसला घोषित नहीं हुआ है। इंडिया टुडे ने 5 अक्टूबर 2026 को बताया कि नाशिक की एक टीम उस AI हेडकाउंट और फेशियल रिकग्निशन सिस्टम का अध्ययन कर रही है, जिसे सोलापुर ग्रामीण पुलिस ने पंढरपुर की आषाढ़ी वारी में इस्तेमाल किया था।",
          mr: "असा कोणताही निर्णय जाहीर झालेला नाही. पंढरपूरच्या आषाढी वारीत सोलापूर ग्रामीण पोलिसांनी वापरलेल्या AI हेडकाउंट आणि चेहरा ओळख प्रणालीचा नाशिकचे एक पथक अभ्यास करत आहे, असे वृत्त इंडिया टुडेने ५ ऑक्टोबर २०२६ रोजी दिले.",
        },
      },
      {
        q: { en: "How many people are expected on an Amrit Snan day?", hi: "अमृत स्नान के दिन कितने लोग आने का अनुमान है?", mr: "अमृत स्नानाच्या दिवशी किती भाविक येण्याचा अंदाज आहे?" },
        a: {
          en: "The NTKMA plan expects about 1.5 crore people in Nashik and 0.75 crore in Trimbakeshwar on an Amrit Snan day, and about 12 crore pilgrims over the whole Kumbh. The Amrit Snans are on 2 August, 31 August and 11 September 2027 (12 September in Trimbakeshwar).",
          hi: "NTKMA योजना के अनुसार अमृत स्नान के दिन नाशिक में करीब 1.5 करोड़ और त्र्यंबकेश्वर में 0.75 करोड़ लोग आएँगे, और पूरे कुंभ में करीब 12 करोड़ श्रद्धालु। अमृत स्नान 2 अगस्त, 31 अगस्त और 11 सितंबर 2027 (त्र्यंबकेश्वर में 12 सितंबर) को हैं।",
          mr: "NTKMA आराखड्यानुसार अमृत स्नानाच्या दिवशी नाशिकमध्ये सुमारे १.५ कोटी आणि त्र्यंबकेश्वरमध्ये ०.७५ कोटी भाविक येतील, तर संपूर्ण कुंभमेळ्यात सुमारे १२ कोटी. अमृत स्नान २ ऑगस्ट, ३१ ऑगस्ट आणि ११ सप्टेंबर २०२७ (त्र्यंबकेश्वरमध्ये १२ सप्टेंबर) रोजी आहे.",
        },
      },
      {
        q: { en: "Who is in charge of crowd management at the Kumbh?", hi: "कुंभ में भीड़ प्रबंधन की ज़िम्मेदारी किसकी है?", mr: "कुंभमेळ्यातील गर्दी व्यवस्थापनाची जबाबदारी कोणाची?" },
        a: {
          en: "The Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA), set up under Maharashtra Act 33 of 2025, working with the Nashik Municipal Corporation and the city and rural police. Divisional Commissioner Dr Praveen Gedam is its Chairman, Shekhar Singh its Commissioner and Collector Ayush Prasad its Vice-chairman.",
          hi: "नाशिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) की, जो महाराष्ट्र अधिनियम 33, 2025 से बना है और नाशिक महानगरपालिका तथा शहर व ग्रामीण पुलिस के साथ काम करता है। विभागीय आयुक्त डॉ. प्रवीण गेडाम इसके अध्यक्ष, शेखर सिंह आयुक्त और कलेक्टर आयुष प्रसाद उपाध्यक्ष हैं।",
          mr: "नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाची (NTKMA). हे प्राधिकरण महाराष्ट्र अधिनियम क्र. ३३, २०२५ नुसार स्थापन झाले असून नाशिक महानगरपालिका आणि शहर व ग्रामीण पोलिसांसोबत काम करते. विभागीय आयुक्त डॉ. प्रवीण गेडाम अध्यक्ष, शेखर सिंह आयुक्त आणि जिल्हाधिकारी आयुष प्रसाद उपाध्यक्ष आहेत.",
        },
      },
    ],
  },
  {
    id: 1,
    slug: "nashik-kumbh-2027-flag-hoisting",
    title: {
      en: "Nashik Kumbh Mela 2027 to Begin with Flag Hoisting on October 31, 2026",
      hi: "नासिक कुंभ मेला 2027 की शुरुआत 31 अक्टूबर 2026 को ध्वजारोहण से होगी",
      mr: "नाशिक कुंभमेळा 2027 ची सुरुवात ३१ ऑक्टोबर २०२६ रोजी ध्वजारोहणाने होणार",
    },
    date: "2025-12-15",
    originallyAnnounced: "2025-06-01",
    updated: "2026-10-24",
    source: "Times of India / PTI",
    sources: [
      {
        title: "Maharashtra CM Devendra Fadnavis says Nashik Kumbh to begin October 31, 2026; first holy dips on August 2, 2027",
        publisher: "Times of India",
        date: "2025-06-01",
        url: "https://timesofindia.indiatimes.com/city/nashik/maharashtra-cm-devendra-fadnavis-says-nashik-kumbh-to-begin-october-31-2026-first-holy-dips-on-august-2-2027/articleshow/121559808.cms",
        status: "confirmed",
      },
      {
        title: "Dates set for Nashik-Trimbakeshwar Simhastha Kumbh Mela",
        publisher: "Rediff / PTI",
        date: "2025-06-01",
        url: "https://www.rediff.com/news/report/dates-set-for-nashik-trimbakeshwar-simhastha-kumbh-mela-2026/20250601.htm",
        status: "confirmed",
      },
      {
        title: "Kumbh Mela Plan, Nashik-Trimbakeshwar Simhastha 2027",
        publisher: "Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)",
        date: "2026-06-15",
        url: "https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2026/06/20260615229440107.pdf",
        status: "confirmed",
      },
      {
        title: "Dhwajarohan review meeting: 12:02 PM muhurat (Girish Mahajan)",
        publisher: "eSakal",
        date: "2026-09-19",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/todays-latest-marathi-news-nsk26h35648-txt-nskmain1-20260919044516",
        status: "confirmed",
      },
      {
        title: "CM Devendra Fadnavis invites President Droupadi Murmu to Simhastha Kumbh Mela flag-hoisting ceremony",
        publisher: "UNI",
        date: "2026-10-21",
        url: "https://www.uniindia.com/west-india/event-nashik-cm-fadnavis-invites-president/220859",
        status: "confirmed",
      },
      {
        title: "President Murmu Invited To Flag-Off Nashik Kumbh Mela",
        publisher: "Deccan Chronicle",
        date: "2026-10-21",
        url: "https://www.deccanchronicle.com/nation/president-murmu-invited-to-flag-off-nashik-kumbh-mela-1997671",
        status: "reported",
      },
      {
        title: "Minister Girish Mahajan invites Governor to Kumbh Mela Flag Hoisting Ceremony",
        publisher: "Lok Bhavan, Maharashtra",
        date: "2026-10-23",
        url: "https://lokbhavan.maharashtra.gov.in/en/23-10-2026-minister-girish-mahajan-invites-governor-to-kumbh-mela-flag-hoisting-ceremony/",
        status: "confirmed",
      },
      {
        title: "सिंहस्थ कुंभमेळा ध्वजारोहणाच्या पार्श्वभूमीवर नाशिक मध्ये दोन विश्वविक्रमांचा प्रयत्न",
        publisher: "District Information Office, Nashik (on X)",
        date: "2026-10-18",
        url: "https://x.com/InfoNashik/status/2111862546781347954",
        status: "confirmed",
      },
      {
        title: "त्र्यंबकेश्‍वर मंदिर ३१ ऑक्टेबरला खुले",
        publisher: "eSakal",
        date: "2026-10-21",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/todays-latest-marathi-news-nsk26h40329-txt-nskmain3-20261021160415",
        status: "reported",
      },
      {
        title: "दोनदिवस मद्यविक्री बंदी आदेशात बदल: जिल्हाधिकारी कार्यालयाकडून सुधारित आदेश",
        publisher: "eSakal",
        date: "2026-10-22",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/nashik-kumbh-mela-liquor-sales-ban-changes",
        status: "reported",
      },
      {
        title: "वाहतूक कोंडी टाळण्यासाठी पोलिस ॲक्शन मोडमध्ये: रामतीर्थ परिसर आणि पार्किंगच्या जागा",
        publisher: "eSakal",
        date: "2026-10-23",
        url: "https://www.esakal.com/uttar-maharashtra/nashik/nashik-traffic-management-ramteerth-stalls",
        status: "reported",
      },
      {
        title: "Preparations at Ramkund in full swing for Oct 31 Dhwajarohan",
        publisher: "Times of India",
        date: "2026-10-23",
        url: "https://timesofindia.indiatimes.com/city/nashik/preparations-at-ramkund-in-full-swing-for-oct-31-dhwajarohan/articleshow/135152137.cms",
        status: "reported",
      },
      {
        title: "NMC told to fast-track Ramkund works ahead of Dhwajarohan",
        publisher: "Times of India",
        date: "2026-10-05",
        url: "https://timesofindia.indiatimes.com/city/nashik/nmc-told-to-fast-track-ramkund-works-ahead-of-dhwajarohan/articleshow/134714447.cms",
        status: "confirmed",
      },
    ],
    category: "kumbh",
    image: "/images/gallery/kumbh-1.webp",
    summary: {
      en: "The Nashik-Trimbakeshwar Simhastha Kumbh Mela opens with Dhwajarohan (flag hoisting) on Saturday 31 October 2026 at 12:02 PM, at Ramkund in Nashik and Kushavarta in Trimbakeshwar at the same moment. Updated 24 October: President and Governor invited, 30 October procession, evening Maha Goda Aarti, liquor and parking arrangements.",
      hi: "नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेले की शुरुआत शनिवार, 31 अक्टूबर 2026 को दोपहर 12:02 बजे ध्वजारोहण से होगी, रामकुंड और कुशावर्त पर एक ही समय। 24 अक्टूबर का अपडेट: राष्ट्रपति और राज्यपाल को न्योता, 30 अक्टूबर की यात्रा, शाम की महा गोदा आरती, शराब बंदी और पार्किंग।",
      mr: "नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळ्याचा प्रारंभ शनिवार, ३१ ऑक्टोबर २०२६ रोजी दुपारी १२.०२ वाजता ध्वजारोहणाने होईल, रामकुंड व कुशावर्तावर एकाच वेळी. २४ ऑक्टोबरचे अपडेट: राष्ट्रपती व राज्यपालांना निमंत्रण, ३० ऑक्टोबरची ग्रामप्रदक्षिणा, सायंकाळची महा गोदा आरती, मद्यविक्री बंदी आणि पार्किंग.",
    },
    content: {
      en: "Update (24 October 2026): One week before the ceremony, we have added what is new: who has been invited, the 30 October procession, the evening aarti, the liquor and parking arrangements, and answers to common questions.\n\n**In brief:** The Nashik-Trimbakeshwar Simhastha Kumbh Mela formally begins with Dhwajarohan (flag hoisting) on **Saturday 31 October 2026 at 12:02 PM**, at Ramkund in Nashik and at Kushavarta in Trimbakeshwar at the same moment. It is not a bathing day: the first Amrit Snan is on Monday 2 August 2027. For live timings, routes and closures, see our [Dhwajarohan 2026 live guide](/dhwajarohan-2026).\n\n## What is new, one week before (as of 24 October 2026)\n\n- **President invited (confirmed):** on 21 October, Chief Minister Devendra Fadnavis, with Deputy Chief Ministers Eknath Shinde and Sunetra Pawar, invited President Droupadi Murmu to the ceremony at Rashtrapati Bhavan (official release, UNI). Shinde told reporters on 22 October that she has accepted (Deccan Chronicle, reported). Rashtrapati Bhavan has not published her itinerary.\n- **Governor invited (confirmed):** Kumbh Mela Minister Girish Mahajan invited Governor Jishnu Dev Varma in Mumbai on 23 October (Lok Bhavan release).\n- **30 October, Gram Pradakshina (reported):** a procession from Tapovan to Ramkund on the day before the flag hoisting. Start times and the route differ between Sakal, Navbharat and Saamana. The police traffic notice (reported by Sakal on 25 October) gives a route via Ganeshwadi and Gadge Maharaj bridge, with roads closed from 6 AM until the procession ends ([traffic notice](/blog/nashik-traffic-notice-30-31-october-godaghat-no-vehicle-zone-ramtirth-roads-shut-diversions-parking-iim-nagpur-crowd-plan)). [Route and timings as reported](/blog/gram-pradakshina-30-october-route-tapovan-to-ramkund-nmc-encroachment-drive-october-24-29).\n- **31 October evening, Maha Goda Aarti (reported):** at Ramkund, with about 6,500 people from tribal villages of Nashik district. NTKMA and the District Information Office announced it on 18 October; reports give times from 6 PM to 7 PM.\n- **Trimbakeshwar temple (reported):** open on 31 October, but only for 3,000 pass holders (eSakal, 21 October). [Temple passes and Kushavarta works](/blog/trimbakeshwar-temple-open-on-31-october-3000-passes-kushavarta-works-by-october-25).\n- **Liquor shops (reported):** under a revised Collector's order of 22 October, shops within 2 km of Ramtirth (Ramkund) and in all of Trimbakeshwar municipal limits stay shut on 30 and 31 October (eSakal).\n- **Parking and buses (reported):** the traffic police have kept grounds such as B.D. Bhalekar ground, the Chhatrapati Shivaji Maharaj Sports Complex at CBS and Rungtha High School for parking (Sakal), and the NMC will run special city buses to Ramkund on 31 October (Times of India). [Parking grounds, city buses and ambulances](/blog/dhwajarohan-30-31-october-parking-grounds-liquor-shops-shut-2-km-ramkund-city-buses).\n- **Update, 27 October: Trimbak road closed and fuller route (reported):** an Additional District Magistrate's order closes the usual Nashik–Trimbakeshwar road from 8 AM on 30 October to 8 PM on 31 October, with traffic sent via Girnare (about 61 km instead of 30 km, per the Times of India). TOI's fuller account of the city police notice gives the 30 October procession route via Phul Bazaar, Delhi Gate, Nehru Chowk, Dhumal Point, Main Road and Ravivar Karanja, and puts the Goda Aarti at 7 PM (other reports say 6 PM or 6:45 PM). [Trimbak road closure and Goda Aarti entry bans](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route).\n\n## The flag hoisting itself\n\nThe Nashik Simhastha Kumbh Mela 2027 will formally begin with Dhwajarohan, the flag hoisting, on Saturday 31 October 2026 at 12:02 PM. Chief Minister Devendra Fadnavis announced the start date on 1 June 2025, after a meeting with the akhadas. According to the NTKMA Kumbh Mela Plan, flags go up at the same moment at Ramkund in Panchavati, Nashik, and at Kushavarta in Trimbakeshwar. Kumbh Mela Minister Girish Mahajan confirmed the 12:02 PM muhurat on 19 September 2026. The ceremony, also called Dhwaja Sthapana, is the formal invitation to saints, sadhus and devotees.\n\n## The Amrit Snan dates\n\n- Monday 2 August 2027, Ashadh Somvati Amavasya: first Amrit Snan\n- Tuesday 31 August 2027, Shravan Amavasya: second Amrit Snan\n- Saturday 11 September 2027: third Amrit Snan in Nashik\n- Sunday 12 September 2027: third Amrit Snan in Trimbakeshwar\n\nDevotees believe a dip in the Godavari on these days washes away sins. Amrit Snan timings have not been published yet.\n\n## How long the mela runs\n\nAccording to the NTKMA plan, the mela runs for 20 months and 3 weeks (632 days). It closes on 29 July 2028 in Nashik and on 24 July 2028 in Trimbakeshwar. All 13 akhadas take part.\n\n## How many pilgrims\n\nThe NTKMA plan estimates about 12 crore pilgrims in total, with about 1.5 crore in Nashik and 0.75 crore in Trimbakeshwar on an Amrit Snan day. Preparations cover roads, transport, sanitation and security, along with new ghats on the Godavari.\n\n## Related guides\n\n- [Dhwajarohan 2026 live guide: timings, routes and closures](/dhwajarohan-2026)\n- [All Nashik Kumbh 2027 dates and Amrit Snan days](/dates)\n- [Trimbakeshwar Kumbh 2027 guide: Kushavarta and the temple](/trimbakeshwar-kumbh-2027)\n- [Ramkund and the Godavari bathing ghats](/ghats)",
      hi: "अपडेट (24 अक्टूबर 2026): समारोह से एक हफ़्ता पहले हमने नई जानकारी जोड़ी है: किसे न्योता गया, 30 अक्टूबर की यात्रा, शाम की आरती, शराब बंदी और पार्किंग की व्यवस्था, और आम सवालों के जवाब।\n\n**संक्षेप में:** नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेले की औपचारिक शुरुआत **शनिवार, 31 अक्टूबर 2026 को दोपहर 12:02 बजे** ध्वजारोहण से होगी, नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक ही समय। यह स्नान का दिन नहीं है: पहला अमृत स्नान सोमवार, 2 अगस्त 2027 को है। लाइव समय, रास्ते और बंदी के लिए हमारी [ध्वजारोहण 2026 लाइव गाइड](/dhwajarohan-2026) देखें।\n\n## एक हफ़्ता पहले क्या नया है (24 अक्टूबर 2026 तक)\n\n- **राष्ट्रपति को न्योता (पुष्ट):** 21 अक्टूबर को मुख्यमंत्री देवेंद्र फडणवीस ने उपमुख्यमंत्री एकनाथ शिंदे और सुनेत्रा पवार के साथ राष्ट्रपति भवन में राष्ट्रपति द्रौपदी मुर्मू को समारोह का न्योता दिया (आधिकारिक विज्ञप्ति, UNI)। शिंदे ने 22 अक्टूबर को पत्रकारों से कहा कि राष्ट्रपति ने न्योता स्वीकार कर लिया है (डेक्कन क्रॉनिकल, रिपोर्ट)। राष्ट्रपति भवन ने अभी उनका कार्यक्रम जारी नहीं किया है।\n- **राज्यपाल को न्योता (पुष्ट):** कुंभ मेला मंत्री गिरीश महाजन ने 23 अक्टूबर को मुंबई में राज्यपाल जिष्णु देव वर्मा को न्योता दिया (लोक भवन विज्ञप्ति)।\n- **30 अक्टूबर, ग्राम प्रदक्षिणा (रिपोर्ट):** ध्वजारोहण से एक दिन पहले तपोवन से रामकुंड तक यात्रा। सकाळ, नवभारत और सामना में शुरू होने का समय और मार्ग अलग-अलग हैं। पुलिस की ट्रैफ़िक अधिसूचना (सकाळ, 25 अक्टूबर) में मार्ग गणेशवाड़ी और गाडगे महाराज पुल होकर है, और सुबह 6 बजे से यात्रा ख़त्म होने तक सड़कें बंद रहेंगी ([ट्रैफ़िक सूचना](/blog/nashik-traffic-notice-30-31-october-godaghat-no-vehicle-zone-ramtirth-roads-shut-diversions-parking-iim-nagpur-crowd-plan))। [रिपोर्ट में बताया मार्ग और समय](/blog/gram-pradakshina-30-october-route-tapovan-to-ramkund-nmc-encroachment-drive-october-24-29)।\n- **31 अक्टूबर की शाम, महा गोदा आरती (रिपोर्ट):** रामकुंड पर, नाशिक ज़िले के जनजातीय गाँवों के करीब 6,500 लोगों के साथ। NTKMA और ज़िला सूचना कार्यालय ने 18 अक्टूबर को इसकी घोषणा की; ख़बरों में समय शाम 6 से 7 बजे के बीच बताया गया है।\n- **त्र्यंबकेश्वर मंदिर (रिपोर्ट):** 31 अक्टूबर को खुला रहेगा, लेकिन सिर्फ़ 3,000 पासधारकों के लिए (eSakal, 21 अक्टूबर)। [मंदिर पास और कुशावर्त के काम](/blog/trimbakeshwar-temple-open-on-31-october-3000-passes-kushavarta-works-by-october-25)।\n- **शराब की दुकानें (रिपोर्ट):** 22 अक्टूबर के कलेक्टर के संशोधित आदेश के मुताबिक रामतीर्थ (रामकुंड) के 2 किमी दायरे में और पूरी त्र्यंबकेश्वर नगर परिषद सीमा में दुकानें 30 और 31 अक्टूबर को बंद रहेंगी (eSakal)।\n- **पार्किंग और बसें (रिपोर्ट):** ट्रैफ़िक पुलिस ने बी.डी. भालेकर मैदान, CBS का छत्रपति शिवाजी महाराज क्रीड़ा संकुल और रुंगठा हाईस्कूल जैसे मैदान पार्किंग के लिए रखे हैं (सकाळ), और महानगरपालिका 31 अक्टूबर को रामकुंड तक विशेष सिटी बसें चलाएगी (टाइम्स ऑफ इंडिया)। [पार्किंग, सिटी बसें और एम्बुलेंस](/blog/dhwajarohan-30-31-october-parking-grounds-liquor-shops-shut-2-km-ramkund-city-buses)।\n- **अपडेट, 27 अक्टूबर: त्र्यंबक मार्ग बंद और विस्तृत मार्ग (रिपोर्ट):** अपर ज़िला दंडाधिकारी के आदेश से नाशिक–त्र्यंबकेश्वर का नियमित मार्ग 30 अक्टूबर सुबह 8 बजे से 31 अक्टूबर रात 8 बजे तक बंद रहेगा और ट्रैफ़िक गिरणारे होकर जाएगा (टाइम्स ऑफ इंडिया के अनुसार 30 की जगह करीब 61 किमी)। शहर पुलिस अधिसूचना के TOI वाले विस्तृत ब्योरे में 30 अक्टूबर की यात्रा का मार्ग फूल बाज़ार, दिल्ली दरवाज़ा, नेहरू चौक, धुमाल पॉइंट, मेन रोड और रविवार कारंजा होकर है, और गोदा आरती शाम 7 बजे बताई गई है (दूसरी ख़बरों में 6 या 6:45 बजे)। [त्र्यंबक मार्ग बंदी और गोदा आरती प्रवेशबंदी](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route)।\n\n## ध्वजारोहण के बारे में\n\nनासिक (नाशिक) सिंहस्थ कुंभ मेला 2027 की औपचारिक शुरुआत शनिवार 31 अक्टूबर 2026 को दोपहर 12:02 बजे ध्वजारोहण से होगी। मुख्यमंत्री देवेंद्र फडणवीस ने 1 जून 2025 को अखाड़ों के साथ बैठक के बाद यह तिथि घोषित की थी। NTKMA की कुंभ मेला योजना के अनुसार पंचवटी, नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक ही समय ध्वज फहराए जाएँगे। कुंभ मेला मंत्री गिरीश महाजन ने 19 सितंबर 2026 को 12:02 बजे के मुहूर्त की पुष्टि की। 'ध्वज स्थापना' कहलाने वाली यह रस्म संतों, साधुओं और श्रद्धालुओं के लिए औपचारिक निमंत्रण है।\n\n## अमृत स्नान की तिथियाँ\n\n- सोमवार 2 अगस्त 2027, आषाढ़ सोमवती अमावस्या: पहला अमृत स्नान\n- मंगलवार 31 अगस्त 2027, श्रावण अमावस्या: दूसरा अमृत स्नान\n- शनिवार 11 सितंबर 2027: नाशिक में तीसरा अमृत स्नान\n- रविवार 12 सितंबर 2027: त्र्यंबकेश्वर में तीसरा अमृत स्नान\n\nमान्यता है कि इन दिनों गोदावरी में स्नान से पाप धुल जाते हैं। अमृत स्नान का समय अभी प्रकाशित नहीं हुआ है।\n\n## मेला कितने दिन चलेगा\n\nNTKMA योजना के अनुसार मेला 20 महीने 3 सप्ताह (632 दिन) चलेगा। इसका समापन नाशिक में 29 जुलाई 2028 और त्र्यंबकेश्वर में 24 जुलाई 2028 को होगा। सभी 13 अखाड़े इसमें भाग लेते हैं।\n\n## कितने श्रद्धालु आएँगे\n\nNTKMA योजना के अनुसार कुल लगभग 12 करोड़ श्रद्धालु आने का अनुमान है। अमृत स्नान के दिन नाशिक में लगभग 1.5 करोड़ और त्र्यंबकेश्वर में लगभग 0.75 करोड़ श्रद्धालु आ सकते हैं। तैयारियों में सड़कें, परिवहन, स्वच्छता और सुरक्षा के साथ गोदावरी पर नए घाट भी शामिल हैं।\n\n## संबंधित गाइड\n\n- [ध्वजारोहण 2026 लाइव गाइड: समय, रास्ते और बंदी](/dhwajarohan-2026)\n- [नाशिक कुंभ 2027 की सभी तिथियाँ और अमृत स्नान](/dates)\n- [त्र्यंबकेश्वर कुंभ 2027 गाइड: कुशावर्त और मंदिर](/trimbakeshwar-kumbh-2027)\n- [रामकुंड और गोदावरी के स्नान घाट](/ghats)",
      mr: "अपडेट (२४ ऑक्टोबर २०२६): सोहळ्याला आठवडा उरला असताना नवी माहिती जोडली आहे: कोणाला निमंत्रण गेले, ३० ऑक्टोबरची ग्रामप्रदक्षिणा, सायंकाळची आरती, मद्यविक्री बंदी व पार्किंगची व्यवस्था, आणि नेहमीच्या प्रश्नांची उत्तरे.\n\n**थोडक्यात:** नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभमेळ्याचा औपचारिक प्रारंभ **शनिवार, ३१ ऑक्टोबर २०२६ रोजी दुपारी १२.०२ वाजता** ध्वजारोहणाने होईल, नाशिकच्या रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर एकाच वेळी. हा स्नानाचा दिवस नाही: पहिले अमृत स्नान सोमवार, २ ऑगस्ट २०२७ रोजी आहे. थेट वेळा, मार्ग आणि बंदीसाठी आमचे [ध्वजारोहण २०२६ थेट मार्गदर्शक पान](/dhwajarohan-2026) पाहा.\n\n## आठवडाभर आधी नवे काय (२४ ऑक्टोबर २०२६ पर्यंत)\n\n- **राष्ट्रपतींना निमंत्रण (अधिकृत):** २१ ऑक्टोबरला मुख्यमंत्री देवेंद्र फडणवीस यांनी उपमुख्यमंत्री एकनाथ शिंदे व सुनेत्रा पवार यांच्यासह राष्ट्रपती भवनात राष्ट्रपती द्रौपदी मुर्मू यांना सोहळ्याचे निमंत्रण दिले (अधिकृत निवेदन, UNI). राष्ट्रपतींनी निमंत्रण स्वीकारल्याचे शिंदे यांनी २२ ऑक्टोबरला पत्रकारांना सांगितले (डेक्कन क्रॉनिकल, वृत्त). राष्ट्रपती भवनाने अद्याप त्यांचा दौरा जाहीर केलेला नाही.\n- **राज्यपालांना निमंत्रण (अधिकृत):** कुंभमेळा मंत्री गिरीश महाजन यांनी २३ ऑक्टोबरला मुंबईत राज्यपाल जिष्णु देव वर्मा यांना निमंत्रण दिले (लोकभवन निवेदन).\n- **३० ऑक्टोबर, ग्रामप्रदक्षिणा (वृत्त):** ध्वजारोहणाच्या आदल्या दिवशी तपोवन ते रामकुंड परिक्रमा. सकाळ, नवभारत आणि सामना यांच्या वृत्तांत सुरुवातीची वेळ व मार्ग वेगवेगळे आहेत. पोलिसांच्या वाहतूक अधिसूचनेत (सकाळ, २५ ऑक्टोबर) मार्ग गणेशवाडी व गाडगे महाराज पुलावरून असून सकाळी ६ पासून मिरवणूक संपेपर्यंत रस्ते बंद राहतील ([वाहतूक अधिसूचना](/blog/nashik-traffic-notice-30-31-october-godaghat-no-vehicle-zone-ramtirth-roads-shut-diversions-parking-iim-nagpur-crowd-plan)). [वृत्तांतील मार्ग व वेळ](/blog/gram-pradakshina-30-october-route-tapovan-to-ramkund-nmc-encroachment-drive-october-24-29).\n- **३१ ऑक्टोबर सायंकाळ, महा गोदा आरती (वृत्त):** रामकुंडावर, नाशिक जिल्ह्यातील आदिवासी गावांमधील सुमारे ६,५०० जणांच्या सहभागाने. NTKMA व जिल्हा माहिती कार्यालयाने १८ ऑक्टोबरला ती जाहीर केली; वृत्तांमध्ये वेळ सायंकाळी ६ ते ७ दरम्यान दिली आहे.\n- **त्र्यंबकेश्वर मंदिर (वृत्त):** ३१ ऑक्टोबरला खुले राहील, पण फक्त ३,००० पासधारकांसाठी (eSakal, २१ ऑक्टोबर). [मंदिर पास व कुशावर्ताची कामे](/blog/trimbakeshwar-temple-open-on-31-october-3000-passes-kushavarta-works-by-october-25).\n- **मद्यविक्री बंद (वृत्त):** जिल्हाधिकाऱ्यांच्या २२ ऑक्टोबरच्या सुधारित आदेशानुसार रामतीर्थ (रामकुंड) पासून २ किमी परिसरातील आणि संपूर्ण त्र्यंबकेश्वर नगर परिषद हद्दीतील दुकाने ३० व ३१ ऑक्टोबरला बंद राहतील (eSakal).\n- **पार्किंग व बस (वृत्त):** वाहतूक पोलिसांनी बी. डी. भालेकर मैदान, सीबीएस येथील छत्रपती शिवाजी महाराज क्रीडा संकुल आणि रुंगठा हायस्कूल अशी मैदाने पार्किंगसाठी राखीव ठेवली आहेत (सकाळ), आणि महापालिका ३१ ऑक्टोबरला रामकुंडपर्यंत विशेष सिटी बस सोडणार आहे (टाइम्स ऑफ इंडिया). [पार्किंगची मैदाने, सिटी बस व रुग्णवाहिका](/blog/dhwajarohan-30-31-october-parking-grounds-liquor-shops-shut-2-km-ramkund-city-buses).\n- **अपडेट, २७ ऑक्टोबर: त्र्यंबक रस्ता बंद व सविस्तर मार्ग (वृत्त):** अपर जिल्हादंडाधिकाऱ्यांच्या आदेशानुसार नेहमीचा नाशिक–त्र्यंबकेश्वर रस्ता ३० ऑक्टोबर सकाळी ८ ते ३१ ऑक्टोबर रात्री ८ पर्यंत बंद राहील आणि वाहतूक गिरणारेमार्गे वळवली आहे (टाइम्स ऑफ इंडियानुसार ३० ऐवजी सुमारे ६१ किमी). शहर पोलिस अधिसूचनेच्या TOI मधील सविस्तर तपशिलानुसार ३० ऑक्टोबरच्या मिरवणुकीचा मार्ग फूल बाजार, दिल्ली दरवाजा, नेहरू चौक, धुमाळ पॉइंट, मेनरोड व रविवार कारंजामार्गे आहे, आणि गोदा आरती सायंकाळी ७ वाजता सांगितली आहे (इतर वृत्तांत ६ किंवा पावणेसात). [त्र्यंबक रस्ता बंद व गोदा आरती प्रवेशबंदी](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route).\n\n## ध्वजारोहणाविषयी\n\nनाशिक सिंहस्थ कुंभमेळ्याची औपचारिक सुरुवात शनिवार, ३१ ऑक्टोबर २०२६ रोजी दुपारी १२:०२ वाजता ध्वजारोहणाने होईल. मुख्यमंत्री देवेंद्र फडणवीस यांनी १ जून २०२५ रोजी आखाड्यांसोबतच्या बैठकीनंतर ही तारीख जाहीर केली. NTKMA च्या कुंभमेळा आराखड्यानुसार पंचवटीतील रामकुंड आणि त्र्यंबकेश्वरमधील कुशावर्त येथे एकाच वेळी ध्वज फडकतील. कुंभमेळा मंत्री गिरीश महाजन यांनी १९ सप्टेंबर २०२६ रोजी १२:०२ च्या मुहूर्ताला दुजोरा दिला. 'ध्वज स्थापना' म्हणून ओळखला जाणारा हा सोहळा संत, साधू आणि भाविकांना औपचारिक निमंत्रण आहे.\n\n## अमृत स्नानाच्या तारखा\n\n- सोमवार, २ ऑगस्ट २०२७, आषाढ सोमवती अमावस्या: पहिले अमृत स्नान\n- मंगळवार, ३१ ऑगस्ट २०२७, श्रावण अमावस्या: दुसरे अमृत स्नान\n- शनिवार, ११ सप्टेंबर २०२७: नाशिकमध्ये तिसरे अमृत स्नान\n- रविवार, १२ सप्टेंबर २०२७: त्र्यंबकेश्वरमध्ये तिसरे अमृत स्नान\n\nया दिवशी गोदावरीत स्नान केल्याने पापांचा नाश होतो, अशी श्रद्धा आहे. अमृत स्नानाच्या वेळा अद्याप जाहीर झालेल्या नाहीत.\n\n## मेळा किती काळ चालणार\n\nNTKMA आराखड्यानुसार मेळा २० महिने ३ आठवडे (६३२ दिवस) चालेल. समाप्ती नाशिकमध्ये २९ जुलै २०२८ रोजी आणि त्र्यंबकेश्वरमध्ये २४ जुलै २०२८ रोजी आहे. सर्व १३ आखाडे यात सहभागी होतात.\n\n## किती भाविक येणार\n\nNTKMA आराखड्यानुसार एकूण सुमारे १२ कोटी भाविक येतील असा अंदाज आहे. अमृत स्नानाच्या दिवशी नाशिकमध्ये सुमारे १.५ कोटी आणि त्र्यंबकेश्वरमध्ये सुमारे ०.७५ कोटी भाविक येऊ शकतात. तयारीत रस्ते, वाहतूक, स्वच्छता आणि सुरक्षेसोबत गोदावरीवरील नवे घाटही आहेत.\n\n## संबंधित मार्गदर्शक\n\n- [ध्वजारोहण २०२६ थेट मार्गदर्शक: वेळा, मार्ग आणि बंदी](/dhwajarohan-2026)\n- [नाशिक कुंभमेळा २०२७ च्या सर्व तारखा आणि अमृत स्नान](/dates)\n- [त्र्यंबकेश्वर कुंभ २०२७ मार्गदर्शक: कुशावर्त आणि मंदिर](/trimbakeshwar-kumbh-2027)\n- [रामकुंड आणि गोदावरीचे स्नानघाट](/ghats)",
    },
    faq: [
      {
        q: { en: "When is the Nashik Kumbh flag hoisting, and at what time?", hi: "नाशिक कुंभ का ध्वजारोहण कब और किस समय है?", mr: "नाशिक कुंभमेळ्याचे ध्वजारोहण कधी आणि किती वाजता आहे?" },
        a: {
          en: "On Saturday 31 October 2026 at 12:02 PM, at Ramkund in Nashik and at Kushavarta in Trimbakeshwar at the same moment. The date and venues are in the NTKMA Kumbh Mela Plan, and Kumbh Mela Minister Girish Mahajan confirmed the 12:02 PM muhurat on 19 September 2026 (eSakal).",
          hi: "शनिवार, 31 अक्टूबर 2026 को दोपहर 12:02 बजे, नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक ही समय। तारीख और स्थान NTKMA की कुंभ मेला योजना में हैं, और कुंभ मेला मंत्री गिरीश महाजन ने 19 सितंबर 2026 को 12:02 बजे के मुहूर्त की पुष्टि की (eSakal)।",
          mr: "शनिवार, ३१ ऑक्टोबर २०२६ रोजी दुपारी १२.०२ वाजता, नाशिकच्या रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर एकाच वेळी. तारीख व ठिकाणे NTKMA च्या कुंभमेळा आराखड्यात आहेत, आणि कुंभमेळा मंत्री गिरीश महाजन यांनी १९ सप्टेंबर २०२६ रोजी १२.०२ च्या मुहूर्ताला दुजोरा दिला (eSakal).",
        },
      },
      {
        q: { en: "Is 31 October a holy bathing (snan) day?", hi: "क्या 31 अक्टूबर स्नान का दिन है?", mr: "३१ ऑक्टोबर हा स्नानाचा दिवस आहे का?" },
        a: {
          en: "No. The flag hoisting opens the mela period. The three Amrit Snans are on 2 August 2027, 31 August 2027, and 11 September 2027 in Nashik / 12 September 2027 in Trimbakeshwar.",
          hi: "नहीं। ध्वजारोहण से मेले की अवधि शुरू होती है। तीन अमृत स्नान 2 अगस्त 2027, 31 अगस्त 2027, और 11 सितंबर 2027 (नाशिक) / 12 सितंबर 2027 (त्र्यंबकेश्वर) को हैं।",
          mr: "नाही. ध्वजारोहणाने मेळ्याचा कालावधी सुरू होतो. तीन अमृत स्नाने २ ऑगस्ट २०२७, ३१ ऑगस्ट २०२७, आणि ११ सप्टेंबर २०२७ (नाशिक) / १२ सप्टेंबर २०२७ (त्र्यंबकेश्वर) रोजी आहेत.",
        },
      },
      {
        q: { en: "Will President Droupadi Murmu attend?", hi: "क्या राष्ट्रपति द्रौपदी मुर्मू आएँगी?", mr: "राष्ट्रपती द्रौपदी मुर्मू उपस्थित राहणार का?" },
        a: {
          en: "She was formally invited on 21 October 2026, according to the official release, and Deputy Chief Minister Eknath Shinde said on 22 October that she has accepted (reported). Rashtrapati Bhavan has not published her itinerary yet.",
          hi: "आधिकारिक विज्ञप्ति के अनुसार 21 अक्टूबर 2026 को उन्हें औपचारिक न्योता दिया गया, और उपमुख्यमंत्री एकनाथ शिंदे ने 22 अक्टूबर को कहा कि उन्होंने न्योता स्वीकार कर लिया है (रिपोर्ट)। राष्ट्रपति भवन ने अभी उनका कार्यक्रम जारी नहीं किया है।",
          mr: "अधिकृत निवेदनानुसार २१ ऑक्टोबर २०२६ रोजी त्यांना औपचारिक निमंत्रण देण्यात आले, आणि त्यांनी ते स्वीकारल्याचे उपमुख्यमंत्री एकनाथ शिंदे यांनी २२ ऑक्टोबरला सांगितले (वृत्त). राष्ट्रपती भवनाने अद्याप त्यांचा दौरा जाहीर केलेला नाही.",
        },
      },
      {
        q: { en: "Can ordinary devotees attend, and where do I park?", hi: "क्या आम श्रद्धालु जा सकते हैं, और गाड़ी कहाँ खड़ी करें?", mr: "सामान्य भाविक जाऊ शकतात का, आणि गाडी कुठे लावायची?" },
        a: {
          en: "No official public entry order has been published, but Navbharat reported on 28 October that ordinary devotees will not get direct entry to the Ramkund area on 31 October; only VVIPs and special guests will, and citizen seating is planned from Devmamledar ground to Rokdoba ground (Sakal; [details](/blog/ramkund-no-general-entry-31-october-1-lakh-crowd-cctv-control-rooms-rehearsal-president-day-plan)). NTKMA has asked for separate VIP and public entry routes at Ramkund (Times of India, 5 October 2026), and the Trimbakeshwar temple will be open only to 3,000 pass holders that day (reported). The police traffic notice (reported by Sakal on 25 October) makes Ramtirth and the whole Godaghat a no-vehicle zone and lists parking at grounds such as Sambhaji Maharaj Garden, Shivaji Maharaj Stadium, B.D. Bhalekar ground, Rungtha School, Shinde Mala and Gauri Patangan, with walking routes to the ghat. If you are going to Trimbakeshwar, the usual Nashik–Trimbak road is closed from 8 AM on 30 October to 8 PM on 31 October; use the detour via Girnare (reported, 26 October; [details](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route)).",
          hi: "आम लोगों के प्रवेश का कोई आधिकारिक आदेश जारी नहीं हुआ है, पर नवभारत ने 28 अक्टूबर को बताया कि 31 अक्टूबर को आम श्रद्धालुओं को रामकुंड परिसर में सीधा प्रवेश नहीं मिलेगा; सिर्फ़ VVIP और विशेष अतिथि जा सकेंगे, और नागरिकों के बैठने की जगह देवमामलेदार मैदान से रोकडोबा मैदान तक होगी (सकाळ; [पूरी ख़बर](/blog/ramkund-no-general-entry-31-october-1-lakh-crowd-cctv-control-rooms-rehearsal-president-day-plan))। NTKMA ने रामकुंड पर VIP और आम लोगों के लिए अलग प्रवेश मार्ग माँगे हैं (टाइम्स ऑफ इंडिया, 5 अक्टूबर 2026), और उस दिन त्र्यंबकेश्वर मंदिर सिर्फ़ 3,000 पासधारकों के लिए खुला रहेगा (रिपोर्ट)। पुलिस की ट्रैफ़िक अधिसूचना (सकाळ, 25 अक्टूबर) के अनुसार रामतीर्थ और पूरा गोदाघाट 'नो व्हीकल ज़ोन' रहेगा, और संभाजी महाराज उद्यान, शिवाजी महाराज स्टेडियम, बी.डी. भालेकर मैदान, रुंगठा स्कूल, शिंदे मळा और गौरी पटांगण जैसी जगहों पर पार्किंग है, जहाँ से घाट तक पैदल रास्ते तय हैं। त्र्यंबकेश्वर जा रहे हैं तो नाशिक–त्र्यंबक का नियमित मार्ग 30 अक्टूबर सुबह 8 बजे से 31 अक्टूबर रात 8 बजे तक बंद है; गिरणारे होकर वैकल्पिक मार्ग लें (रिपोर्ट, 26 अक्टूबर; [पूरी ख़बर](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route))।",
          mr: "सामान्य भाविकांच्या प्रवेशाचा अधिकृत आदेश अद्याप जाहीर झालेला नाही, मात्र ३१ ऑक्टोबरला सामान्य भाविकांना रामकुंड परिसरात थेट प्रवेश मिळणार नाही, फक्त अतिमहत्त्वाच्या व्यक्ती व विशेष निमंत्रितांना प्रवेश असेल, असे नवभारतने २८ ऑक्टोबरला दिले; नागरिकांची आसनव्यवस्था देवमामलेदार मैदान ते रोकडोबा मैदान अशी असेल (सकाळ; [सविस्तर](/blog/ramkund-no-general-entry-31-october-1-lakh-crowd-cctv-control-rooms-rehearsal-president-day-plan)). NTKMA ने रामकुंडावर व्हीआयपी व सामान्य भाविकांसाठी वेगळे प्रवेशमार्ग मागितले आहेत (टाइम्स ऑफ इंडिया, ५ ऑक्टोबर २०२६), आणि त्या दिवशी त्र्यंबकेश्वर मंदिर फक्त ३,००० पासधारकांसाठी खुले राहील (वृत्त). पोलिसांच्या वाहतूक अधिसूचनेनुसार (सकाळ, २५ ऑक्टोबर) रामतीर्थ आणि संपूर्ण गोदाघाट 'नो व्हेईकल झोन' राहील, आणि संभाजी महाराज उद्यान, शिवाजी महाराज स्टेडियम, बी. डी. भालेकर मैदान, रुंगठा स्कूल, शिंदे मळा व गौरी पटांगण येथे वाहनतळ असून तिथून घाटापर्यंत पायी मार्ग ठरले आहेत. त्र्यंबकेश्वरला जाणार असाल तर नेहमीचा नाशिक–त्र्यंबक रस्ता ३० ऑक्टोबर सकाळी ८ ते ३१ ऑक्टोबर रात्री ८ पर्यंत बंद आहे; गिरणारेमार्गे पर्यायी रस्ता वापरा (वृत्त, २६ ऑक्टोबर; [सविस्तर](/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route)).",
        },
      },
    ],
    event: {
      name: {
        en: "Nashik-Trimbakeshwar Simhastha Dhwajarohan (flag hoisting)",
        hi: "नाशिक-त्र्यंबकेश्वर सिंहस्थ ध्वजारोहण",
        mr: "नाशिक-त्र्यंबकेश्वर सिंहस्थ ध्वजारोहण",
      },
      startDate: "2026-10-31T12:02:00+05:30",
      description: {
        en: "Flags go up at 12:02 PM at Ramkund in Panchavati, Nashik, and at Kushavarta in Trimbakeshwar at the same moment. Muhurat confirmed on record by Kumbh Mela Minister Girish Mahajan (eSakal, 19 Sep 2026); date and venues in the NTKMA plan.",
        hi: "दोपहर 12:02 बजे पंचवटी, नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर एक ही समय ध्वज फहराए जाएँगे। मुहूर्त कुंभ मेला मंत्री गिरीश महाजन ने आधिकारिक रूप से पुष्टि की (eSakal, 19 सितंबर 2026); तारीख और स्थान NTKMA योजना में हैं।",
        mr: "दुपारी १२:०२ वाजता पंचवटीतील रामकुंड आणि त्र्यंबकेश्वरमधील कुशावर्त येथे एकाच वेळी ध्वज फडकतील. मुहूर्ताला कुंभमेळा मंत्री गिरीश महाजन यांनी अधिकृत दुजोरा दिला (eSakal, १९ सप्टेंबर २०२६); तारीख व ठिकाणे NTKMA आराखड्यात आहेत.",
      },
      location: [
        {
          name: "Ramkund (Ramtirth), Panchavati",
          addressLocality: "Nashik",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        {
          name: "Kushavarta",
          addressLocality: "Trimbakeshwar",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      ],
    },
  },
  {
    id: 2,
    slug: "maharashtra-25055-crore-budget",
    title: {
      en: "Maharashtra Govt Approves Rs 25,055 Crore for 2027 Nashik Kumbh Mela",
      hi: "महाराष्ट्र सरकार ने 2027 नासिक कुंभ मेले के लिए 25,055 करोड़ रुपये मंजूर किए",
      mr: "महाराष्ट्र शासनाने 2027 नाशिक कुंभमेळ्यासाठी 25,055 कोटी रुपयांना मंजुरी दिली",
    },
    date: "2025-10-30",
    updated: "2026-10-06",
    source: "Free Press Journal",
    sources: [
      {
        title: "Rs 25,055 crore development plan approved for 2027 Nashik Kumbh Mela",
        publisher: "Free Press Journal",
        date: "2025-10-30",
        url: "https://www.freepressjournal.in/pune/rs-25055-crore-development-plan-approved-for-2027-nashik-kumbh-mela",
        status: "reported",
      },
      {
        title: "Lok Sabha reply on the Nashik Simhastha Kumbh Mela (Ministry of Tourism)",
        publisher: "PIB",
        date: "2026-07-27",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289872",
        status: "confirmed",
      },
      {
        title: "85% of Rs 34,732 crore Kumbh outlay for permanent infrastructure: Nashik-Trimbakeshwar Kumbh Mela Authority commissioner",
        publisher: "Times of India",
        date: "2026-08-21",
        url: "https://timesofindia.indiatimes.com/city/nashik/85-of-rs-34732-crore-kumbh-outlay-for-permanent-infrastructure-nashik-trimbakeshwar-kumbh-mela-authority-commissioner/articleshow/133410592.cms",
        status: "confirmed",
      },
    ],
    followUp: { slug: "kumbh-budget-22425-crore-plan-34732-crore-total-outlay", date: "2026-10-06" },
    category: "govt",
    image: "/images/gallery/kumbh-4.webp",
    summary: {
      en: "In October 2025, a Rs 25,055 crore joint Centre and state development plan was announced for the 2027 Nashik Kumbh Mela, with Rs 7,410 crore sanctioned at the time. This figure has since been superseded by the ₹22,425.39 crore plan (March 2026) and the ₹34,732 crore total outlay (August 2026).",
      hi: "अक्टूबर 2025 में 2027 नासिक कुंभ मेले के लिए केंद्र और राज्य की 25,055 करोड़ रुपये की संयुक्त विकास योजना घोषित हुई थी, जिसमें से उस समय 7,410 करोड़ रुपये मंजूर हुए। यह आँकड़ा अब ₹22,425.39 करोड़ की योजना (मार्च 2026) और ₹34,732 करोड़ के कुल खर्च (अगस्त 2026) से बदल चुका है।",
      mr: "ऑक्टोबर २०२५ मध्ये 2027 नाशिक कुंभमेळ्यासाठी केंद्र आणि राज्याचा २५,०५५ कोटी रुपयांचा संयुक्त विकास आराखडा जाहीर झाला होता, त्यापैकी त्या वेळी ७,४१० कोटी रुपये मंजूर झाले. हा आकडा आता ₹२२,४२५.३९ कोटींच्या आराखड्याने (मार्च २०२६) आणि ₹३४,७३२ कोटींच्या एकूण खर्चाने (ऑगस्ट २०२६) मागे पडला आहे.",
    },
    content: {
      en: "## Update (6 October 2026)\n\nThis figure is now out of date. On 13 March 2026, the Apex Committee chaired by the Chief Minister approved a development plan of ₹22,425.39 crore (PIB). In August 2026, NTKMA Commissioner Shekhar Singh said the total outlay, including central agencies, is ₹34,732 crore (Times of India). Read our [latest budget report](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay), and see the snan days on [Dates](/dates).\n\n## The October 2025 plan\n\nIn October 2025, a Rs 25,055 crore development plan for the Nashik Simhastha Kumbh Mela 2027 was announced. It was a joint plan of the Centre and the state, and Rs 7,410 crore of it was sanctioned at the time, the Free Press Journal reported.\n\nThe budget allocation covers a wide spectrum of development activities. A significant portion, approximately Rs 8,000 crore, was earmarked for an outer ring road around Nashik city to ease traffic congestion. (The ring road is now costed at ₹7,922 crore for 66.15 km; see our [ring road update](/blog/nashik-ring-road-work-begins-on-seven-stretches).) Another Rs 2,270 crore will be spent on upgrading 289 kilometers of roads connecting key pilgrimage sites. Additional funds are directed toward water supply augmentation, sewage treatment, and the construction of temporary and permanent sanitation facilities along the Godavari riverbanks.\n\nThe plan also includes substantial investments in healthcare infrastructure, with mobile hospitals, emergency trauma centers, and Ayush wellness camps planned at strategic locations. Digital infrastructure is another priority, with free Wi-Fi zones, a dedicated Kumbh mobile application, and real-time crowd monitoring dashboards being developed to enhance the pilgrim experience.\n\nOfficials have emphasized that every rupee will be subject to strict auditing and time-bound completion targets. Chief Minister Devendra Fadnavis has personally reviewed the progress of key projects and has directed departments to treat the Kumbh preparations as a mission-mode initiative, ensuring that Nashik emerges as a world-class pilgrimage destination.",
      hi: "## अपडेट (6 अक्टूबर 2026)\n\nयह आँकड़ा अब पुराना हो चुका है। 13 मार्च 2026 को मुख्यमंत्री की अध्यक्षता वाली शीर्ष समिति (Apex Committee) ने ₹22,425.39 करोड़ की विकास योजना मंजूर की (PIB)। अगस्त 2026 में NTKMA आयुक्त शेखर सिंह ने बताया कि केंद्रीय एजेंसियों सहित कुल खर्च ₹34,732 करोड़ है (टाइम्स ऑफ इंडिया)। हमारी [नई बजट रिपोर्ट](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay) पढ़ें, और स्नान की तिथियाँ [तिथियाँ](/dates) पेज पर देखें।\n\n## अक्टूबर 2025 की योजना\n\nफ्री प्रेस जर्नल की रिपोर्ट के अनुसार, अक्टूबर 2025 में नासिक सिंहस्थ कुंभ मेला 2027 के लिए 25,055 करोड़ रुपये की विकास योजना घोषित हुई थी। यह केंद्र और राज्य की संयुक्त योजना थी, और इसमें से उस समय 7,410 करोड़ रुपये मंजूर हुए थे।\n\nबजट आवंटन विकास गतिविधियों के व्यापक दायरे को कवर करता है। एक बड़ा हिस्सा, लगभग 8,000 करोड़ रुपये, नासिक शहर के चारों ओर बाहरी रिंग रोड के लिए रखा गया था। (रिंग रोड की लागत अब 66.15 किमी के लिए ₹7,922 करोड़ है; हमारा [रिंग रोड अपडेट](/blog/nashik-ring-road-work-begins-on-seven-stretches) देखें।) 2,270 करोड़ रुपये प्रमुख तीर्थ स्थलों को जोड़ने वाली 289 किलोमीटर सड़कों के उन्नयन पर खर्च किए जाएंगे। अतिरिक्त धनराशि जल आपूर्ति, सीवेज उपचार और गोदावरी नदी के किनारे स्वच्छता सुविधाओं के निर्माण के लिए निर्धारित है।\n\nयोजना में स्वास्थ्य बुनियादी ढाँचे में पर्याप्त निवेश भी शामिल है, जिसमें रणनीतिक स्थानों पर मोबाइल अस्पताल, आपातकालीन ट्रॉमा सेंटर और आयुष वेलनेस शिविर शामिल हैं। डिजिटल बुनियादी ढाँचा भी प्राथमिकता है, मुफ्त वाई-फाई जोन, समर्पित कुंभ मोबाइल ऐप और रीयल-टाइम भीड़ निगरानी डैशबोर्ड विकसित किए जा रहे हैं।\n\nअधिकारियों ने जोर दिया है कि हर रुपये का सख्त ऑडिट और समयबद्ध लक्ष्य निर्धारित होगा। मुख्यमंत्री देवेंद्र फडणवीस ने व्यक्तिगत रूप से प्रमुख परियोजनाओं की प्रगति की समीक्षा की है और विभागों को कुंभ की तैयारियों को मिशन मोड पहल के रूप में मानने का निर्देश दिया है, ताकि नासिक एक विश्वस्तरीय तीर्थ स्थल बन सके।",
      mr: "## अपडेट (६ ऑक्टोबर २०२६)\n\nहा आकडा आता जुना झाला आहे. १३ मार्च २०२६ रोजी मुख्यमंत्र्यांच्या अध्यक्षतेखालील शिखर समितीने (Apex Committee) ₹२२,४२५.३९ कोटींच्या विकास आराखड्याला मंजुरी दिली (PIB). ऑगस्ट २०२६ मध्ये NTKMA आयुक्त शेखर सिंह यांनी केंद्रीय यंत्रणांसह एकूण खर्च ₹३४,७३२ कोटी असल्याचे सांगितले (टाइम्स ऑफ इंडिया). आमचा [नवा निधी अहवाल](/blog/kumbh-budget-22425-crore-plan-34732-crore-total-outlay) वाचा, आणि स्नानाच्या तारखा [तारखा](/dates) पानावर पाहा.\n\n## ऑक्टोबर २०२५ चा आराखडा\n\nफ्री प्रेस जर्नलच्या वृत्तानुसार, ऑक्टोबर २०२५ मध्ये नाशिक सिंहस्थ कुंभमेळा 2027 साठी २५,०५५ कोटी रुपयांचा विकास आराखडा जाहीर झाला होता. हा केंद्र आणि राज्याचा संयुक्त आराखडा होता, आणि त्यापैकी त्या वेळी ७,४१० कोटी रुपये मंजूर झाले होते.\n\nअर्थसंकल्पातील तरतूद विकास कामांच्या विस्तृत श्रेणीला व्यापते. एक मोठा भाग, सुमारे ८,००० कोटी रुपये, नाशिक शहराभोवतीच्या बाह्य रिंग रोडसाठी राखीव ठेवण्यात आला होता. (रिंग रोडचा खर्च आता ६६.१५ किमीसाठी ₹७,९२२ कोटी आहे; आमचे [रिंग रोड अपडेट](/blog/nashik-ring-road-work-begins-on-seven-stretches) पाहा.) प्रमुख तीर्थक्षेत्रांना जोडणाऱ्या २८९ किलोमीटर रस्त्यांच्या सुधारणेसाठी २,२७० कोटी रुपये खर्च केले जातील. पाणीपुरवठा, सांडपाणी प्रक्रिया आणि गोदावरी नदीकाठी स्वच्छता सुविधांसाठी अतिरिक्त निधी ठेवण्यात आला आहे.\n\nयोजनेत आरोग्य पायाभूत सुविधांमध्ये मोठी गुंतवणूक समाविष्ट आहे, ज्यात रणनीतिक ठिकाणी मोबाइल रुग्णालये, आपत्कालीन ट्रॉमा सेंटर आणि आयुष वेलनेस शिबिरे नियोजित आहेत. डिजिटल पायाभूत सुविधाही प्राधान्य आहे, मोफत वाय-फाय झोन, समर्पित कुंभमेळा मोबाइल अॅप आणि रिअल-टाइम गर्दी निरीक्षण डॅशबोर्ड विकसित केले जात आहेत.\n\nअधिकाऱ्यांनी प्रत्येक रुपयाचे कठोर लेखापरीक्षण आणि वेळेत काम पूर्ण करण्याचे लक्ष्य निश्चित केले आहे. मुख्यमंत्री देवेंद्र फडणवीस यांनी स्वतः प्रमुख प्रकल्पांच्या प्रगतीचा आढावा घेतला आहे आणि विभागांना कुंभमेळ्याच्या तयारींना मिशन मोड उपक्रम म्हणून हाताळण्याचे निर्देश दिले आहेत, जेणेकरून नाशिक जागतिक दर्जाचे तीर्थक्षेत्र म्हणून उदयास येईल.",
    },
  },
  {
    id: 3,
    slug: "fadnavis-strict-deadlines",
    title: {
      en: "CM Fadnavis Sets Strict Deadlines for Kumbh Infrastructure",
      hi: "मुख्यमंत्री फडणवीस ने कुंभ बुनियादी ढाँचे के लिए सख्त समय सीमा तय की",
      mr: "मुख्यमंत्री फडणवीस यांनी कुंभ पायाभूत सुविधांसाठी कडक मुदती निश्चित केल्या",
    },
    date: "2025-10-08",
    source: "Swarajya Magazine",
    category: "infra",
    image: "/images/gallery/kumbh-8.webp",
    summary: {
      en: "Chief Minister Devendra Fadnavis has set strict deadlines for Kumbh infrastructure projects, including AI-powered crowd monitoring and Rs 4,000 crore worth of technology-driven initiatives.",
      hi: "मुख्यमंत्री देवेंद्र फडणवीस ने कुंभ बुनियादी ढाँचा परियोजनाओं के लिए सख्त समय सीमा निर्धारित की है, जिसमें AI-संचालित भीड़ निगरानी और 4,000 करोड़ रुपये की प्रौद्योगिकी-आधारित पहल शामिल हैं।",
      mr: "मुख्यमंत्री देवेंद्र फडणवीस यांनी कुंभ पायाभूत सुविधा प्रकल्पांसाठी कडक मुदती निश्चित केल्या आहेत, ज्यात AI-आधारित गर्दी निरीक्षण आणि 4,000 कोटी रुपयांच्या तंत्रज्ञान-चलित उपक्रमांचा समावेश आहे.",
    },
    content: {
      en: "Chief Minister Devendra Fadnavis has taken direct charge of the Nashik Kumbh Mela 2027 preparations, setting strict and non-negotiable deadlines for all infrastructure projects. In a high-level review meeting attended by senior bureaucrats and project heads, the CM made it clear that any delays would not be tolerated, and that department heads would be held personally accountable for meeting the October 2026 flag hoisting deadline.\n\nA key highlight of the CM's vision is the deployment of AI-powered crowd monitoring technology across all major Kumbh venues. Over 5,000 AI-enabled CCTV cameras will be installed at ghats, roads, and congregation points, feeding real-time data into a central command center. These systems will use machine learning algorithms to predict crowd density, detect stampede risks, and trigger automated alerts to security personnel - a first for any Kumbh Mela in history.\n\nThe technology portfolio, estimated at Rs 4,000 crore, also includes drone surveillance, facial recognition for missing person identification, IoT-based water quality sensors in the Godavari, and a multi-language AI chatbot for pilgrim assistance. The entire Kumbh zone will have 5G connectivity, enabling seamless digital services for devotees including live darshan streaming and digital navigation maps.\n\nFadnavis has also directed the creation of a dedicated Kumbh War Room that will operate 24/7 during the festival period, integrating feeds from all departments - police, fire, health, transport, and municipal services. This centralized approach aims to ensure real-time decision-making and rapid response to any emergencies, setting a new benchmark for managing large-scale religious gatherings.",
      hi: "मुख्यमंत्री देवेंद्र फडणवीस ने नासिक कुंभ मेला 2027 की तैयारियों की सीधी कमान संभाली है, सभी बुनियादी ढाँचा परियोजनाओं के लिए सख्त और अटल समय सीमाएँ निर्धारित की हैं। वरिष्ठ अधिकारियों और परियोजना प्रमुखों की उपस्थिति में एक उच्चस्तरीय समीक्षा बैठक में सीएम ने स्पष्ट किया कि किसी भी देरी को बर्दाश्त नहीं किया जाएगा और विभाग प्रमुखों को अक्टूबर 2026 की ध्वजारोहण समय सीमा पूरी करने के लिए व्यक्तिगत रूप से जवाबदेह ठहराया जाएगा।\n\nसीएम की दृष्टि की एक प्रमुख विशेषता सभी प्रमुख कुंभ स्थलों पर AI-संचालित भीड़ निगरानी तकनीक की तैनाती है। घाटों, सड़कों और सभा स्थलों पर 5,000 से अधिक AI-सक्षम सीसीटीवी कैमरे लगाए जाएंगे, जो एक केंद्रीय कमांड सेंटर को रीयल-टाइम डेटा भेजेंगे। ये सिस्टम भीड़ की घनत्व का अनुमान लगाने, भगदड़ के खतरे का पता लगाने और सुरक्षा कर्मियों को स्वचालित अलर्ट भेजने के लिए मशीन लर्निंग एल्गोरिदम का उपयोग करेंगे।\n\nलगभग 4,000 करोड़ रुपये की अनुमानित प्रौद्योगिकी योजना में ड्रोन निगरानी, लापता व्यक्तियों की पहचान के लिए फेशियल रिकग्निशन, गोदावरी में IoT-आधारित जल गुणवत्ता सेंसर और तीर्थयात्री सहायता के लिए बहुभाषी AI चैटबोट भी शामिल हैं। पूरे कुंभ क्षेत्र में 5G कनेक्टिविटी होगी, जो श्रद्धालुओं को लाइव दर्शन स्ट्रीमिंग और डिजिटल नेविगेशन मैप जैसी सेवाएँ प्रदान करेगी।\n\nफडणवीस ने एक समर्पित कुंभ वॉर रूम बनाने का भी निर्देश दिया है जो महोत्सव अवधि के दौरान 24/7 संचालित होगा, पुलिस, अग्निशमन, स्वास्थ्य, परिवहन और नगरपालिका सेवाओं सहित सभी विभागों से फीड को एकीकृत करेगा। यह केंद्रीकृत दृष्टिकोण रीयल-टाइम निर्णय लेने और किसी भी आपात स्थिति में त्वरित प्रतिक्रिया सुनिश्चित करने का लक्ष्य रखता है।",
      mr: "मुख्यमंत्री देवेंद्र फडणवीस यांनी नाशिक कुंभमेळा 2027 च्या तयारींची थेट कमान हाती घेतली असून, सर्व पायाभूत सुविधा प्रकल्पांसाठी कडक आणि अंतिम मुदती निश्चित केल्या आहेत. वरिष्ठ अधिकारी आणि प्रकल्प प्रमुखांच्या उपस्थितीत झालेल्या उच्चस्तरीय आढावा बैठकीत मुख्यमंत्र्यांनी स्पष्ट केले की कोणत्याही विलंबाला खपवून घेतले जाणार नाही आणि ऑक्टोबर 2026 च्या ध्वजारोहण मुदतीसाठी विभाग प्रमुखांना वैयक्तिकरित्या जबाबदार धरले जाईल.\n\nमुख्यमंत्र्यांच्या दृष्टिकोनाचे एक प्रमुख वैशिष्ट्य म्हणजे सर्व प्रमुख कुंभ स्थळांवर AI-आधारित गर्दी निरीक्षण तंत्रज्ञानाची तैनाती. घाट, रस्ते आणि सभा स्थळांवर 5,000 हून अधिक AI-सक्षम सीसीटीव्ही कॅमेरे बसवले जातील, जे केंद्रीय कमांड सेंटरला रिअल-टाइम डेटा पाठवतील. या प्रणाली गर्दीची घनता अंदाज करण्यासाठी, चेंगराचेंगरीचा धोका ओळखण्यासाठी आणि सुरक्षा कर्मचाऱ्यांना स्वयंचलित सूचना देण्यासाठी मशीन लर्निंग अल्गोरिदम वापरतील.\n\nसुमारे 4,000 कोटी रुपयांच्या तंत्रज्ञान योजनेत ड्रोन पाळत, बेपत्ता व्यक्तींच्या शोधासाठी फेशियल रिकग्निशन, गोदावरीत IoT-आधारित जलगुणवत्ता सेन्सर आणि भाविकांच्या मदतीसाठी बहुभाषिक AI चॅटबोट यांचाही समावेश आहे. संपूर्ण कुंभ क्षेत्रात 5G कनेक्टिव्हिटी असेल, ज्यामुळे भाविकांना लाइव्ह दर्शन स्ट्रीमिंग आणि डिजिटल नेव्हिगेशन नकाशे यांसारख्या सेवा मिळतील.\n\nफडणवीस यांनी एक समर्पित कुंभ वॉर रूम तयार करण्याचे निर्देश दिले आहेत जो महोत्सव काळात 24/7 कार्यरत राहील, पोलीस, अग्निशमन, आरोग्य, वाहतूक आणि महापालिका सेवा या सर्व विभागांच्या माहितीचे एकत्रीकरण करेल. हा केंद्रीभूत दृष्टिकोन रिअल-टाइम निर्णय घेणे आणि कोणत्याही आपत्कालीन परिस्थितीत जलद प्रतिसाद सुनिश्चित करण्याचे उद्दिष्ट ठेवतो.",
    },
  },
  {
    id: 4,
    slug: "ring-road-project-8000-crore",
    title: {
      en: "Nashik Ring Road Project for the Kumbh (Updated: ₹7,922 Crore, 66.15 km)",
      hi: "नासिक कुंभ के लिए रिंग रोड परियोजना (अपडेट: ₹7,922 करोड़, 66.15 किमी)",
      mr: "नाशिक कुंभसाठी रिंग रोड प्रकल्प (अपडेट: ₹७,९२२ कोटी, ६६.१५ किमी)",
    },
    date: "2025-09-15",
    updated: "2026-10-14",
    source: "Times of India",
    sources: [
      {
        title: "Work on seven stretches of Nashik ring road project begins",
        publisher: "Times of India",
        date: "2026-09-17",
        url: "https://timesofindia.indiatimes.com/city/nashik/work-on-seven-stretches-of-nashik-ring-road-project-begins/articleshow/134318230.cms",
        status: "confirmed",
      },
      {
        title: "66km Outer Ring Road around Nashik city to be ready before Kumbh",
        publisher: "Times of India",
        date: "2026-02-19",
        url: "https://timesofindia.indiatimes.com/city/nashik/66km-outer-ring-road-around-nashik-city-to-be-ready-before-kumbh/articleshow/128520236.cms",
        status: "confirmed",
      },
      {
        title: "96 hectares directly purchased for ring road",
        publisher: "Lokmat Times",
        date: "2026-10-04",
        url: "https://www.lokmattimes.com/nashik/96-hectares-directly-purchased-for-ring-road/",
        status: "reported",
      },
      {
        title: "46 parking hubs, 5 railway stations, 4,500 buses: inside Nashik's Kumbh Mela 2027 transport blueprint",
        publisher: "Punekar News",
        date: "2026-06-02",
        url: "https://www.punekarnews.in/46-parking-hubs-5-railway-stations-4500-buses-inside-nashiks-kumbh-mela-2027-transport-blueprint/",
        status: "confirmed",
      },
    ],
    category: "infra",
    image: "/images/gallery/kumbh-5.webp",
    summary: {
      en: "Nashik's outer ring road is a key Kumbh project. As of September 2026 it is 66.15 km long and will cost ₹7,922 crore. About 30% of the land is acquired, work has started on 7 stretches, and the target is to finish before the Kumbh.",
      hi: "नाशिक की बाहरी रिंग रोड कुंभ की एक प्रमुख परियोजना है। सितंबर 2026 की जानकारी के अनुसार यह 66.15 किमी लंबी है और इस पर ₹7,922 करोड़ खर्च होंगे। लगभग 30% ज़मीन ली जा चुकी है, 7 हिस्सों पर काम शुरू है, और लक्ष्य कुंभ से पहले पूरा करने का है।",
      mr: "नाशिकचा बाह्य रिंग रोड हा कुंभमेळ्याचा महत्त्वाचा प्रकल्प आहे. सप्टेंबर २०२६ च्या माहितीनुसार तो ६६.१५ किमी लांब असून त्यावर ₹७,९२२ कोटी खर्च होणार आहेत. सुमारे ३०% जमीन ताब्यात आली आहे, ७ टप्प्यांवर काम सुरू आहे, आणि कुंभपूर्वी काम पूर्ण करण्याचे लक्ष्य आहे.",
    },
    content: {
      en: "Nashik's outer ring road, also called the Parikrama Marg, is one of the biggest road projects planned for the 2027 Simhastha Kumbh. This guide brings together the route, the length, the cost, the land acquisition status and what it means for pilgrims. Each fact below is from an official on record or a named news report, linked at the foot of this page.\n\n## Nashik ring road at a glance\n\n- **Length:** 66.15 km (Times of India, 17 September 2026).\n- **Cost:** ₹7,922 crore in all: ₹3,659 crore for about 386 hectares of land across 25 villages, and ₹4,262 crore for construction.\n- **Builder:** Maharashtra State Infrastructure Development Corporation (MSIDC), with 7 contractors for 7 stretches.\n- **Land:** about 30% acquired as of 17 September 2026, per an MSIDC official.\n- **Target:** before the Kumbh. Officials have set March 2027 for major Kumbh works.\n\n## Route: where the ring road goes\n\nAccording to the Times of India, the ring road will begin and end at **Adgaon**. On the way it passes through:\n\n- DRDO Junction\n- Dindori Road\n- Dakambale Shivar\n- Peth-Gavalwadi\n- Gangapur Road\n- Govardhan\n- Trimbak Road\n- Belgaon Dhaga\n- Vilholi\n\nThe alignment can still be adjusted in places as land is acquired. We will update this list if an official map is published.\n\n## Land acquisition status\n\n- **17 September 2026 (Times of India, on record):** an MSIDC official said nearly 30% of the land had been acquired and another 20% was likely within 10 days. NTKMA Commissioner Shekhar Singh said the authority would release about ₹550 crore to the district collectorate to speed it up.\n- **4 October 2026 (Lokmat Times, reported):** land acquisition is complete in 20 villages, and MSIDC has bought 96 hectares directly, paying ₹1,153 crore to landowners. The same report gives 19.57 km of the length as acquired, and a total land need of 365 hectares.\n\nSources give slightly different totals for the land needed (386 hectares in the Times of India, 365 hectares in Lokmat Times). We show both until an official figure is published.\n\n## Why the ring road matters for the Kumbh\n\n- It is meant to take heavy traffic away from the crowded city centre during the Kumbh.\n- It gives an outer route around the city to reach Kumbh areas such as Ramkund, Tapovan and the Trimbak Road side.\n- On Amrit Snan days private vehicles will stop at outer parking. The NTKMA transport plan (June 2026) lists 46 outer parking hubs and 4,500 MSRTC shuttle buses, and the Ramkund and Trimbak temple areas will be walking-only.\n\n## Old figures, corrected\n\nAn earlier version of this post said 91 km, ₹8,000 crore, 70% of land acquired and an October 2026 deadline. Those figures are out of date. The figures above are the current ones from officials.\n\nRead more: [ring road work begins on seven stretches](/blog/nashik-ring-road-work-begins-on-seven-stretches). For snan days see [Amrit Snan dates](/dates). For travel tips see [How to reach](/how-to-reach).",
      hi: "नाशिक की बाहरी रिंग रोड, जिसे परिक्रमा मार्ग भी कहा जाता है, 2027 सिंहस्थ कुंभ के लिए सबसे बड़ी सड़क परियोजनाओं में से एक है। इस गाइड में रूट, लंबाई, लागत, भूमि अधिग्रहण की स्थिति और श्रद्धालुओं के लिए इसका मतलब एक जगह दिया गया है। हर जानकारी किसी अधिकारी के आधिकारिक बयान या नामित समाचार रिपोर्ट से है; लिंक पेज के अंत में हैं।\n\n## नाशिक रिंग रोड एक नज़र में\n\n- **लंबाई:** 66.15 किमी (टाइम्स ऑफ इंडिया, 17 सितंबर 2026)।\n- **लागत:** कुल ₹7,922 करोड़: 25 गाँवों की लगभग 386 हेक्टेयर ज़मीन के लिए ₹3,659 करोड़ और निर्माण के लिए ₹4,262 करोड़।\n- **निर्माण एजेंसी:** महाराष्ट्र राज्य इन्फ्रास्ट्रक्चर डेवलपमेंट कॉर्पोरेशन (MSIDC), 7 हिस्सों के लिए 7 ठेकेदार।\n- **ज़मीन:** 17 सितंबर 2026 तक लगभग 30% ज़मीन ली जा चुकी, MSIDC अधिकारी के अनुसार।\n- **लक्ष्य:** कुंभ से पहले। कुंभ के बड़े कामों के लिए अधिकारियों ने मार्च 2027 का लक्ष्य रखा है।\n\n## रूट: रिंग रोड कहाँ से गुज़रेगी\n\nटाइम्स ऑफ इंडिया के अनुसार रिंग रोड **आडगाँव** से शुरू होकर आडगाँव पर ही खत्म होगी। रास्ते में यह इन इलाकों से गुज़रेगी:\n\n- DRDO जंक्शन\n- दिंडोरी रोड\n- दकांबले शिवार\n- पेठ-गवलवाड़ी\n- गंगापुर रोड\n- गोवर्धन\n- त्र्यंबक रोड\n- बेलगाँव ढगा\n- विल्होली\n\nज़मीन मिलने के हिसाब से कुछ जगहों पर रूट बदल सकता है। आधिकारिक नक्शा जारी होने पर हम यह सूची अपडेट करेंगे।\n\n## भूमि अधिग्रहण की स्थिति\n\n- **17 सितंबर 2026 (टाइम्स ऑफ इंडिया, आधिकारिक):** MSIDC के एक अधिकारी ने बताया कि लगभग 30% ज़मीन ली जा चुकी है और अगले 10 दिनों में 20% और मिलने की संभावना है। NTKMA आयुक्त शेखर सिंह ने कहा कि प्रक्रिया तेज़ करने के लिए प्राधिकरण ज़िला कलेक्टरेट को लगभग ₹550 करोड़ देगा।\n- **4 अक्टूबर 2026 (लोकमत टाइम्स, रिपोर्ट):** 20 गाँवों में भूमि अधिग्रहण पूरा हो चुका है, और MSIDC ने 96 हेक्टेयर ज़मीन सीधे खरीदकर ज़मीन मालिकों को ₹1,153 करोड़ दिए हैं। इसी रिपोर्ट के अनुसार 19.57 किमी लंबाई की ज़मीन मिल चुकी है और कुल 365 हेक्टेयर ज़मीन चाहिए।\n\nकुल ज़मीन के आँकड़े स्रोतों में थोड़े अलग हैं (टाइम्स ऑफ इंडिया में 386 हेक्टेयर, लोकमत टाइम्स में 365 हेक्टेयर)। आधिकारिक आँकड़ा आने तक हम दोनों दिखा रहे हैं।\n\n## कुंभ के लिए रिंग रोड क्यों ज़रूरी\n\n- कुंभ के दौरान भारी वाहनों को भीड़ वाले शहर के बीच से दूर रखना इसका मकसद है।\n- रामकुंड, तपोवन और त्र्यंबक रोड जैसे कुंभ इलाकों तक शहर के बाहर से रास्ता मिलेगा।\n- अमृत स्नान के दिन निजी वाहन बाहरी पार्किंग पर रुकेंगे। NTKMA की परिवहन योजना (जून 2026) में 46 बाहरी पार्किंग हब और 4,500 MSRTC शटल बसें हैं, और रामकुंड व त्र्यंबक मंदिर क्षेत्र केवल पैदल होंगे।\n\n## पुराने आँकड़े, सुधार\n\nइस लेख के पुराने संस्करण में 91 किमी, ₹8,000 करोड़, 70% भूमि अधिग्रहण और अक्टूबर 2026 की समय सीमा लिखी थी। वे आँकड़े अब पुराने हैं। ऊपर दिए आँकड़े अधिकारियों के ताज़ा आँकड़े हैं।\n\nऔर पढ़ें: [रिंग रोड के सात हिस्सों पर काम शुरू](/blog/nashik-ring-road-work-begins-on-seven-stretches)। स्नान के दिनों के लिए [अमृत स्नान तिथियाँ](/dates) देखें। यात्रा के लिए [कैसे पहुँचें](/how-to-reach) देखें।",
      mr: "नाशिकचा बाह्य रिंग रोड, ज्याला परिक्रमा मार्ग असेही म्हणतात, हा २०२७ सिंहस्थ कुंभमेळ्यासाठीचा सर्वात मोठ्या रस्ते प्रकल्पांपैकी एक आहे. या मार्गदर्शकात मार्ग, लांबी, खर्च, भूसंपादनाची स्थिती आणि भाविकांसाठी त्याचा अर्थ एकत्र दिला आहे. खालील प्रत्येक माहिती अधिकाऱ्यांनी अधिकृतपणे सांगितलेली किंवा नामांकित वृत्तपत्रातील आहे; दुवे पानाच्या शेवटी आहेत.\n\n## नाशिक रिंग रोड एका नजरेत\n\n- **लांबी:** ६६.१५ किमी (टाइम्स ऑफ इंडिया, १७ सप्टेंबर २०२६).\n- **खर्च:** एकूण ₹७,९२२ कोटी: २५ गावांतील सुमारे ३८६ हेक्टर जमिनीसाठी ₹३,६५९ कोटी आणि बांधकामासाठी ₹४,२६२ कोटी.\n- **काम करणारी संस्था:** महाराष्ट्र राज्य पायाभूत सुविधा विकास महामंडळ (MSIDC), ७ टप्प्यांसाठी ७ कंत्राटदार.\n- **जमीन:** १७ सप्टेंबर २०२६ पर्यंत सुमारे ३०% जमीन ताब्यात, MSIDC अधिकाऱ्याच्या माहितीनुसार.\n- **लक्ष्य:** कुंभपूर्वी. कुंभमेळ्याच्या मोठ्या कामांसाठी अधिकाऱ्यांनी मार्च २०२७ ची मुदत ठेवली आहे.\n\n## मार्ग: रिंग रोड कुठून जातो\n\nटाइम्स ऑफ इंडियानुसार रिंग रोड **आडगाव** येथून सुरू होऊन आडगाव येथेच संपेल. वाटेत तो या भागांतून जातो:\n\n- DRDO जंक्शन\n- दिंडोरी रोड\n- दकांबळे शिवार\n- पेठ-गवळवाडी\n- गंगापूर रोड\n- गोवर्धन\n- त्र्यंबक रोड\n- बेळगाव ढगा\n- विल्होळी\n\nभूसंपादनानुसार काही ठिकाणी मार्गात बदल होऊ शकतो. अधिकृत नकाशा प्रसिद्ध झाल्यास आम्ही ही यादी अद्ययावत करू.\n\n## भूसंपादनाची स्थिती\n\n- **१७ सप्टेंबर २०२६ (टाइम्स ऑफ इंडिया, अधिकृत):** सुमारे ३०% जमीन ताब्यात आली असून पुढील १० दिवसांत आणखी २०% मिळण्याची शक्यता असल्याचे MSIDC अधिकाऱ्याने सांगितले. प्रक्रिया वेगाने व्हावी यासाठी प्राधिकरण जिल्हाधिकारी कार्यालयाला सुमारे ₹५५० कोटी देणार असल्याचे NTKMA आयुक्त शेखर सिंह यांनी सांगितले.\n- **४ ऑक्टोबर २०२६ (लोकमत टाइम्स, वृत्त):** २० गावांत भूसंपादन पूर्ण झाले असून MSIDC ने ९६ हेक्टर जमीन थेट खरेदी करून जमीनमालकांना ₹१,१५३ कोटी दिले आहेत. याच वृत्तानुसार १९.५७ किमी लांबीची जमीन ताब्यात आली आहे आणि एकूण ३६५ हेक्टर जमीन लागणार आहे.\n\nएकूण लागणाऱ्या जमिनीचे आकडे स्रोतांमध्ये थोडे वेगळे आहेत (टाइम्स ऑफ इंडियात ३८६ हेक्टर, लोकमत टाइम्समध्ये ३६५ हेक्टर). अधिकृत आकडा येईपर्यंत आम्ही दोन्ही दाखवत आहोत.\n\n## कुंभमेळ्यासाठी रिंग रोड का महत्त्वाचा\n\n- कुंभकाळात जड वाहतूक गर्दीच्या शहरमध्यापासून दूर ठेवणे हा उद्देश आहे.\n- रामकुंड, तपोवन आणि त्र्यंबक रोड परिसरासारख्या कुंभ स्थळांकडे जाण्यासाठी शहराबाहेरून मार्ग मिळेल.\n- अमृत स्नानाच्या दिवशी खासगी वाहने बाहेरील पार्किंगवर थांबतील. NTKMA च्या वाहतूक आराखड्यात (जून २०२६) ४६ बाह्य पार्किंग हब आणि ४,५०० MSRTC शटल बस आहेत, आणि रामकुंड व त्र्यंबक मंदिर परिसर फक्त पायी चालणाऱ्यांसाठी असेल.\n\n## जुने आकडे, दुरुस्त\n\nया बातमीच्या आधीच्या आवृत्तीत ९१ किमी, ₹८,००० कोटी, ७०% भूसंपादन आणि ऑक्टोबर २०२६ ची मुदत असे आकडे होते. ते आता जुने झाले आहेत. वरील आकडे अधिकाऱ्यांनी दिलेले ताजे आकडे आहेत.\n\nअधिक वाचा: [रिंग रोडच्या सात टप्प्यांवर काम सुरू](/blog/nashik-ring-road-work-begins-on-seven-stretches). स्नानाच्या दिवसांसाठी [अमृत स्नान तारखा](/dates) पाहा. प्रवासासाठी [कसे पोहोचाल](/how-to-reach) पाहा.",
    },
    faq: [
      { q: { en: "How long is the Nashik ring road?", hi: "नाशिक रिंग रोड कितनी लंबी है?", mr: "नाशिक रिंग रोड किती लांब आहे?" }, a: { en: "66.15 km, per NTKMA and MSIDC officials (Times of India, 17 September 2026).", hi: "66.15 किमी, NTKMA और MSIDC अधिकारियों के अनुसार (टाइम्स ऑफ इंडिया, 17 सितंबर 2026)।", mr: "६६.१५ किमी, NTKMA आणि MSIDC अधिकाऱ्यांच्या माहितीनुसार (टाइम्स ऑफ इंडिया, १७ सप्टेंबर २०२६)." } },
      { q: { en: "What is the route of the Nashik ring road?", hi: "नाशिक रिंग रोड का रूट क्या है?", mr: "नाशिक रिंग रोडचा मार्ग कोणता?" }, a: { en: "It begins and ends at Adgaon and passes DRDO Junction, Dindori Road, Dakambale Shivar, Peth-Gavalwadi, Gangapur Road, Govardhan, Trimbak Road, Belgaon Dhaga and Vilholi (Times of India).", hi: "यह आडगाँव से शुरू होकर आडगाँव पर खत्म होती है और DRDO जंक्शन, दिंडोरी रोड, दकांबले शिवार, पेठ-गवलवाड़ी, गंगापुर रोड, गोवर्धन, त्र्यंबक रोड, बेलगाँव ढगा और विल्होली से गुज़रती है (टाइम्स ऑफ इंडिया)।", mr: "तो आडगाव येथून सुरू होऊन आडगावलाच संपतो आणि DRDO जंक्शन, दिंडोरी रोड, दकांबळे शिवार, पेठ-गवळवाडी, गंगापूर रोड, गोवर्धन, त्र्यंबक रोड, बेळगाव ढगा आणि विल्होळी येथून जातो (टाइम्स ऑफ इंडिया)." } },
      { q: { en: "How much does the Nashik ring road cost?", hi: "नाशिक रिंग रोड की लागत कितनी है?", mr: "नाशिक रिंग रोडचा खर्च किती?" }, a: { en: "₹7,922 crore: ₹3,659 crore for land and ₹4,262 crore for construction. Older reports of ₹8,000 crore are rounded or out of date.", hi: "₹7,922 करोड़: ज़मीन के लिए ₹3,659 करोड़ और निर्माण के लिए ₹4,262 करोड़। ₹8,000 करोड़ वाली पुरानी रिपोर्टें गोल आँकड़ा या पुरानी हैं।", mr: "₹७,९२२ कोटी: जमिनीसाठी ₹३,६५९ कोटी आणि बांधकामासाठी ₹४,२६२ कोटी. ₹८,००० कोटींचे जुने आकडे ढोबळ किंवा कालबाह्य आहेत." } },
      { q: { en: "How much land has been acquired for the ring road?", hi: "रिंग रोड के लिए कितनी ज़मीन ली जा चुकी है?", mr: "रिंग रोडसाठी किती जमीन ताब्यात आली आहे?" }, a: { en: "About 30% as of 17 September 2026, per an MSIDC official. Lokmat Times reported on 4 October 2026 that acquisition is complete in 20 villages, with 96 hectares bought directly.", hi: "17 सितंबर 2026 तक लगभग 30%, MSIDC अधिकारी के अनुसार। लोकमत टाइम्स ने 4 अक्टूबर 2026 को बताया कि 20 गाँवों में अधिग्रहण पूरा है और 96 हेक्टेयर सीधे खरीदी गई है।", mr: "१७ सप्टेंबर २०२६ पर्यंत सुमारे ३०%, MSIDC अधिकाऱ्याच्या माहितीनुसार. लोकमत टाइम्सने ४ ऑक्टोबर २०२६ रोजी २० गावांत भूसंपादन पूर्ण झाले आणि ९६ हेक्टर थेट खरेदी झाल्याचे वृत्त दिले." } },
      { q: { en: "Will the ring road be ready before the Kumbh?", hi: "क्या रिंग रोड कुंभ से पहले तैयार होगी?", mr: "रिंग रोड कुंभपूर्वी तयार होईल का?" }, a: { en: "That is the official target. Officials have set March 2027 for major Kumbh works, and the first Amrit Snan is on 2 August 2027.", hi: "आधिकारिक लक्ष्य यही है। कुंभ के बड़े कामों के लिए मार्च 2027 का लक्ष्य है, और पहला अमृत स्नान 2 अगस्त 2027 को है।", mr: "अधिकृत लक्ष्य तेच आहे. कुंभमेळ्याच्या मोठ्या कामांसाठी मार्च २०२७ ची मुदत आहे, आणि पहिले अमृत स्नान २ ऑगस्ट २०२७ रोजी आहे." } },
    ],
  },
  {
    id: 5,
    slug: "railways-preparations-simhastha",
    title: {
      en: "Railways Begin Preparations for Nashik Simhastha 2027",
      hi: "रेलवे ने नासिक सिंहस्थ 2027 की तैयारियाँ शुरू कीं",
      mr: "रेल्वेने नाशिक सिंहस्थ 2027 च्या तयारी सुरू केल्या",
    },
    date: "2025-08-22",
    updated: "2026-10-06",
    source: "PIB",
    sources: [
      {
        title: "Railways' preparations for Simhastha Kumbh Mela 2027 at Nashik",
        publisher: "PIB",
        date: "2025-07-25",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2148431",
        status: "confirmed",
      },
      {
        title: "Central Railway launches largest-ever infrastructure upgrade for Simhastha Kumbh 2027 in Nashik",
        publisher: "Free Press Journal",
        date: "2026-07-07",
        url: "https://www.freepressjournal.in/pune/central-railway-launches-largest-ever-infrastructure-upgrade-for-simhastha-kumbh-2027-in-nashik",
        status: "confirmed",
      },
      {
        title: "46 parking hubs, 5 railway stations, 4,500 buses: inside Nashik's Kumbh Mela 2027 transport blueprint",
        publisher: "Punekar News",
        date: "2026-06-02",
        url: "https://www.punekarnews.in/46-parking-hubs-5-railway-stations-4500-buses-inside-nashiks-kumbh-mela-2027-transport-blueprint/",
        status: "confirmed",
      },
    ],
    category: "infra",
    image: "/images/gallery/kumbh-9.webp",
    summary: {
      en: "The Railways plan to develop five stations around Nashik for Simhastha 2027 and to run special trains from across India. Central Railway said in July 2026 that 90 of 92 projects have approval. No special-train timetable for 2027 has been published yet.",
      hi: "रेलवे सिंहस्थ 2027 के लिए नाशिक के आसपास पाँच स्टेशन विकसित करेगा और देश भर से विशेष ट्रेनें चलाएगा। मध्य रेलवे ने जुलाई 2026 में बताया कि 92 में से 90 परियोजनाओं को मंजूरी मिल चुकी है। 2027 की विशेष ट्रेनों की समय-सारणी अभी प्रकाशित नहीं हुई है।",
      mr: "सिंहस्थ 2027 साठी रेल्वे नाशिक परिसरातील पाच स्थानके विकसित करणार असून देशभरातून विशेष गाड्या चालवणार आहे. मध्य रेल्वेने जुलै २०२६ मध्ये ९२ पैकी ९० प्रकल्पांना मंजुरी मिळाल्याचे सांगितले. २०२७ च्या विशेष गाड्यांचे वेळापत्रक अद्याप जाहीर झालेले नाही.",
    },
    content: {
      en: "Update (6 October 2026): An earlier version of this post had claims that no official source supports. We have rewritten it using the official plan and later Central Railway updates.\n\n## Five stations\n\nAccording to the Railways plan (PIB, 25 July 2025), five stations will be developed for the Simhastha: Nashik Road, Devlali, Odha, Kherwadi and Kasbe Sukene. At Nashik Road, Platform 4 will be made two-way, Platform 1 will be extended to take 24-coach trains, and a 12 m foot overbridge, stabling lines and a holding area in the goods shed are planned.\n\n## Special trains\n\nSpecial trains are planned from Kamakhya, Howrah, Patna, Delhi, Jaipur, Bikaner, Mumbai, Pune, Nagpur and Nanded. MEMU trains will also run, along with a circuit train for three Jyotirlingas: Trimbakeshwar, Grishneshwar and Omkareshwar. In February 2026, DRM Punit Agrawal said specials from the Bhusawal side will end at Odha, Kasbe Sukene and Kherwadi, and Mumbai-side specials at Devlali ([ETInfra](https://infra.economictimes.indiatimes.com/news/railways/nashik-railway-stations-set-for-1200-crore-upgrade-ahead-of-simhastha-kumbh-mela/128105933)).\n\nNo special-train timetable for 2027 has been published yet.\n\n## July 2026 update from Central Railway\n\nCentral Railway's Bhusawal Division said in July 2026 that 90 of 92 projects have administrative approval (Free Press Journal, 7 July 2026). These include:\n\n- 9 new foot overbridges, 6 escalators and 16 toilets at Nashik Road\n- more than 51,000 sq m of platform cover\n- Devlali as the main operations hub\n- automatic block signalling on the Manmad to Igatpuri section\n\n## Buses are run by MSRTC, not the Railways\n\nThe 4,500 buses in the Kumbh plan will be run by MSRTC under the NTKMA plan, not by the Railways. Of these, 1,500 will link railway stations to parking areas and to Trimbakeshwar.\n\nFor travel options see [How to reach](/how-to-reach). For the snan days see [Dates](/dates), and plan your trip with the [Guide](/guide).",
      hi: "अपडेट (6 अक्टूबर 2026): इस लेख के पहले संस्करण में कुछ ऐसे दावे थे जिनकी पुष्टि किसी आधिकारिक स्रोत से नहीं होती। हमने इसे आधिकारिक योजना और मध्य रेलवे की बाद की जानकारी के आधार पर दोबारा लिखा है।\n\n## पाँच स्टेशन\n\nरेलवे की योजना (PIB, 25 जुलाई 2025) के अनुसार सिंहस्थ के लिए पाँच स्टेशन विकसित किए जाएँगे: नाशिक रोड, देवलाली, ओढा, खेरवाड़ी और कसबे सुकेणे। नाशिक रोड पर प्लेटफॉर्म 4 को दोनों दिशाओं के लिए बनाया जाएगा, प्लेटफॉर्म 1 को 24 डिब्बों की ट्रेन के लिए बढ़ाया जाएगा, और 12 मीटर का फुट ओवरब्रिज, स्टेबलिंग लाइनें और माल गोदाम में होल्डिंग एरिया बनाने की योजना है।\n\n## विशेष ट्रेनें\n\nकामाख्या, हावड़ा, पटना, दिल्ली, जयपुर, बीकानेर, मुंबई, पुणे, नागपुर और नांदेड़ से विशेष ट्रेनों की योजना है। MEMU ट्रेनें भी चलेंगी, और तीन ज्योतिर्लिंगों (त्र्यंबकेश्वर, घृष्णेश्वर और ओंकारेश्वर) के लिए एक सर्किट ट्रेन भी। फरवरी 2026 में DRM पुनीत अग्रवाल ने बताया कि भुसावल की ओर से आने वाली विशेष ट्रेनें ओढा, कसबे सुकेणे और खेरवाड़ी पर, और मुंबई की ओर से आने वाली ट्रेनें देवलाली पर समाप्त होंगी ([ETInfra](https://infra.economictimes.indiatimes.com/news/railways/nashik-railway-stations-set-for-1200-crore-upgrade-ahead-of-simhastha-kumbh-mela/128105933))।\n\n2027 की विशेष ट्रेनों की समय-सारणी अभी प्रकाशित नहीं हुई है।\n\n## जुलाई 2026 में मध्य रेलवे की जानकारी\n\nमध्य रेलवे के भुसावल मंडल ने जुलाई 2026 में बताया कि 92 में से 90 परियोजनाओं को प्रशासनिक मंजूरी मिल चुकी है (फ्री प्रेस जर्नल, 7 जुलाई 2026)। इनमें शामिल हैं:\n\n- नाशिक रोड पर 9 नए फुट ओवरब्रिज, 6 एस्केलेटर और 16 शौचालय\n- 51,000 वर्ग मीटर से अधिक प्लेटफॉर्म शेड\n- देवलाली मुख्य संचालन केंद्र\n- मनमाड से इगतपुरी खंड पर ऑटोमैटिक ब्लॉक सिग्नलिंग\n\n## बसें MSRTC चलाएगा, रेलवे नहीं\n\nकुंभ योजना की 4,500 बसें NTKMA योजना के तहत MSRTC चलाएगा, रेलवे नहीं। इनमें से 1,500 बसें रेलवे स्टेशनों को पार्किंग क्षेत्रों और त्र्यंबकेश्वर से जोड़ेंगी।\n\nयात्रा के विकल्पों के लिए [कैसे पहुँचें](/how-to-reach) देखें। स्नान की तिथियाँ [तिथियाँ](/dates) पेज पर देखें, और यात्रा की योजना [गाइड](/guide) से बनाएँ।",
      mr: "अपडेट (६ ऑक्टोबर २०२६): या बातमीच्या आधीच्या आवृत्तीत काही दावे असे होते ज्यांना कोणत्याही अधिकृत स्रोताचा आधार नाही. अधिकृत आराखडा आणि मध्य रेल्वेच्या नंतरच्या माहितीवरून आम्ही ती पुन्हा लिहिली आहे.\n\n## पाच स्थानके\n\nरेल्वेच्या आराखड्यानुसार (PIB, २५ जुलै २०२५) सिंहस्थासाठी पाच स्थानके विकसित होणार आहेत: नाशिक रोड, देवळाली, ओढा, खेरवाडी आणि कसबे सुकेणे. नाशिक रोडवर फलाट ४ दोन्ही दिशांसाठी केला जाईल, फलाट १ ची लांबी २४ डब्यांच्या गाडीसाठी वाढवली जाईल, आणि १२ मीटरचा पादचारी पूल, स्टेबलिंग लाइन व मालधक्क्यात थांबण्याची जागा यांचे नियोजन आहे.\n\n## विशेष गाड्या\n\nकामाख्या, हावडा, पाटणा, दिल्ली, जयपूर, बिकानेर, मुंबई, पुणे, नागपूर आणि नांदेड येथून विशेष गाड्यांचे नियोजन आहे. MEMU गाड्याही धावतील, तसेच त्र्यंबकेश्वर, घृष्णेश्वर आणि ओंकारेश्वर या तीन ज्योतिर्लिंगांसाठी सर्किट गाडी असेल. फेब्रुवारी २०२६ मध्ये DRM पुनीत अग्रवाल यांनी सांगितले की भुसावळकडून येणाऱ्या विशेष गाड्या ओढा, कसबे सुकेणे आणि खेरवाडी येथे, तर मुंबईकडून येणाऱ्या गाड्या देवळाली येथे थांबतील ([ETInfra](https://infra.economictimes.indiatimes.com/news/railways/nashik-railway-stations-set-for-1200-crore-upgrade-ahead-of-simhastha-kumbh-mela/128105933)).\n\n2027 च्या विशेष गाड्यांचे वेळापत्रक अद्याप जाहीर झालेले नाही.\n\n## जुलै २०२६ मधील मध्य रेल्वेची माहिती\n\nमध्य रेल्वेच्या भुसावळ विभागाने जुलै २०२६ मध्ये ९२ पैकी ९० प्रकल्पांना प्रशासकीय मंजुरी मिळाल्याचे सांगितले (फ्री प्रेस जर्नल, ७ जुलै २०२६). त्यात हे समाविष्ट आहे:\n\n- नाशिक रोडवर ९ नवे पादचारी पूल, ६ सरकते जिने आणि १६ स्वच्छतागृहे\n- ५१,००० चौरस मीटरहून अधिक फलाट छत\n- देवळाली हे मुख्य संचालन केंद्र\n- मनमाड ते इगतपुरी विभागात स्वयंचलित ब्लॉक सिग्नलिंग\n\n## बस MSRTC च्या, रेल्वेच्या नव्हे\n\nकुंभ आराखड्यातील ४,५०० बस NTKMA आराखड्यानुसार MSRTC चालवणार आहे, रेल्वे नव्हे. त्यापैकी १,५०० बस रेल्वे स्थानकांना पार्किंग क्षेत्रे आणि त्र्यंबकेश्वरशी जोडतील.\n\nप्रवासाच्या पर्यायांसाठी [कसे पोहोचाल](/how-to-reach) पाहा. स्नानाच्या तारखा [तारखा](/dates) पानावर पाहा, आणि प्रवासाचे नियोजन [मार्गदर्शक](/guide) पानावरून करा.",
    },
  },
  {
    id: 6,
    slug: "ntkma-phase-2-trimbakeshwar",
    title: {
      en: "NTKMA Approves Major Phase 2 Infrastructure at Trimbakeshwar",
      hi: "NTKMA ने त्र्यंबकेश्वर में प्रमुख चरण 2 बुनियादी ढाँचे को मंजूरी दी",
      mr: "NTKMA ने त्र्यंबकेश्वर येथील प्रमुख टप्पा 2 पायाभूत सुविधांना मंजुरी दिली",
    },
    date: "2025-07-10",
    source: "Free Press Journal",
    category: "infra",
    image: "/images/gallery/kumbh-6.webp",
    summary: {
      en: "The NTKMA has approved Phase 2 infrastructure at Trimbakeshwar worth Rs 390 crore, including the Darshan Path, renovated ghats, and improved pilgrim amenities near the Jyotirlinga temple.",
      hi: "NTKMA ने त्र्यंबकेश्वर में 390 करोड़ रुपये की चरण 2 बुनियादी ढाँचे को मंजूरी दी है, जिसमें दर्शन पथ, नवीनीकृत घाट और ज्योतिर्लिंग मंदिर के पास बेहतर तीर्थयात्री सुविधाएँ शामिल हैं।",
      mr: "NTKMA ने त्र्यंबकेश्वर येथील 390 कोटी रुपयांच्या टप्पा 2 पायाभूत सुविधांना मंजुरी दिली आहे, ज्यात दर्शन पथ, नूतनीकृत घाट आणि ज्योतिर्लिंग मंदिराजवळ सुधारित भाविक सुविधांचा समावेश आहे.",
    },
    content: {
      en: "The Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA) has given the green light to an ambitious Phase 2 infrastructure development plan at Trimbakeshwar worth Rs 390 crore. Trimbakeshwar, home to one of the twelve sacred Jyotirlingas of Lord Shiva and the origin point of the Godavari River, is the spiritual heart of the Nashik Kumbh Mela and will host some of the most significant rituals during the 2027 festival.\n\nThe centerpiece of the Phase 2 plan is the construction of a dedicated Darshan Path - a wide, covered walkway that will allow pilgrims to approach the Trimbakeshwar temple in a systematic and safe manner. Currently, the narrow lanes around the temple become dangerously overcrowded during peak periods. The new Darshan Path will incorporate queue management systems, shaded rest areas, drinking water fountains, and accessibility ramps for elderly and differently-abled devotees.\n\nThe development also includes the complete renovation of bathing ghats along the Godavari near Trimbakeshwar, with stepped terraces, anti-slip surfaces, and safety railings. New changing rooms, locker facilities, and clean washrooms will be constructed at each ghat. A scenic promenade along the riverfront will connect the ghats to the temple complex, lined with heritage-style lighting and landscaped gardens.\n\nTraimbakeshwar's Phase 2 plan also addresses long-standing civic issues including a new sewage treatment plant to ensure zero untreated discharge into the Godavari, underground electrical cabling to eliminate visual clutter, and a modern drainage system to prevent waterlogging during the monsoon - crucial since the Kumbh's Shahi Snan dates fall within the rainy season. The entire project is expected to be completed by July 2026.",
      hi: "नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) ने त्र्यंबकेश्वर में 390 करोड़ रुपये की महत्वाकांक्षी चरण 2 बुनियादी ढाँचा विकास योजना को हरी झंडी दे दी है। त्र्यंबकेश्वर, जो भगवान शिव के बारह पवित्र ज्योतिर्लिंगों में से एक और गोदावरी नदी के उद्गम स्थल के रूप में जाना जाता है, नासिक कुंभ मेले का आध्यात्मिक केंद्र है और 2027 के महोत्सव के दौरान सबसे महत्वपूर्ण अनुष्ठानों का आयोजन करेगा।\n\nचरण 2 योजना का मुख्य आकर्षण एक समर्पित दर्शन पथ का निर्माण है - एक चौड़ा, छत से ढका हुआ मार्ग जो श्रद्धालुओं को व्यवस्थित और सुरक्षित तरीके से त्र्यंबकेश्वर मंदिर तक पहुँचने की सुविधा देगा। वर्तमान में, मंदिर के आसपास की संकरी गलियाँ चरम अवधि में खतरनाक रूप से भीड़भाड़ वाली हो जाती हैं। नए दर्शन पथ में कतार प्रबंधन प्रणाली, छायादार विश्राम क्षेत्र, पेयजल फव्वारे और बुजुर्गों तथा दिव्यांग भक्तों के लिए सुगम्यता रैंप शामिल होंगे।\n\nविकास में त्र्यंबकेश्वर के पास गोदावरी के किनारे स्नान घाटों का पूर्ण नवीनीकरण भी शामिल है, जिसमें सीढ़ीदार छतें, एंटी-स्लिप सतह और सुरक्षा रेलिंग होंगी। प्रत्येक घाट पर नए चेंजिंग रूम, लॉकर सुविधाएँ और स्वच्छ शौचालय बनाए जाएंगे। नदी तट के किनारे एक सुंदर प्रोमेनेड घाटों को मंदिर परिसर से जोड़ेगा।\n\nत्र्यंबकेश्वर की चरण 2 योजना पुरानी नागरिक समस्याओं को भी संबोधित करती है जिसमें गोदावरी में अशोधित पानी के शून्य निर्वहन के लिए नया सीवेज उपचार संयंत्र, दृश्य अव्यवस्था दूर करने के लिए भूमिगत विद्युत केबलिंग, और मानसून के दौरान जलभराव रोकने के लिए आधुनिक जल निकासी प्रणाली शामिल है। पूरी परियोजना जुलाई 2026 तक पूरी होने की उम्मीद है।",
      mr: "नाशिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरण (NTKMA) ने त्र्यंबकेश्वर येथील 390 कोटी रुपयांच्या महत्त्वाकांक्षी टप्पा 2 पायाभूत सुविधा विकास योजनेला हिरवा कंदील दिला आहे. त्र्यंबकेश्वर, जे भगवान शिवाच्या बारा पवित्र ज्योतिर्लिंगांपैकी एक आणि गोदावरी नदीचे उगमस्थान म्हणून ओळखले जाते, हे नाशिक कुंभमेळ्याचे आध्यात्मिक केंद्र आहे आणि 2027 च्या महोत्सवातील सर्वात महत्त्वाच्या विधींचे आयोजन येथे होणार आहे.\n\nटप्पा 2 योजनेचे मुख्य आकर्षण म्हणजे समर्पित दर्शन पथाचे बांधकाम - एक रुंद, छत असलेला मार्ग जो भाविकांना व्यवस्थित आणि सुरक्षित पद्धतीने त्र्यंबकेश्वर मंदिरापर्यंत पोहोचू देईल. सध्या, मंदिराभोवतीच्या अरुंद गल्ल्या सर्वाधिक गर्दीच्या काळात धोकादायकरित्या गर्दीने भरतात. नवीन दर्शन पथात रांग व्यवस्थापन प्रणाली, सावलीची विश्रांती क्षेत्रे, पिण्याच्या पाण्याचे कारंजे आणि ज्येष्ठ नागरिक व दिव्यांग भक्तांसाठी सुलभता रँप असतील.\n\nविकासात त्र्यंबकेश्वरजवळील गोदावरीकाठच्या स्नान घाटांचे संपूर्ण नूतनीकरणही समाविष्ट आहे, ज्यात पायऱ्यांचे टेरेस, घसरणविरोधी पृष्ठभाग आणि सुरक्षा कठडे असतील. प्रत्येक घाटावर नवीन कपडे बदलण्याच्या खोल्या, लॉकर सुविधा आणि स्वच्छ शौचालये बांधली जातील. नदीकाठावरील एक सुंदर प्रॉमेनेड घाटांना मंदिर परिसराशी जोडेल.\n\nत्र्यंबकेश्वरच्या टप्पा 2 योजनेत जुन्या नागरी समस्यांचे निराकरणही समाविष्ट आहे ज्यात गोदावरीत अप्रक्रिया केलेल्या पाण्याचा शून्य विसर्ग सुनिश्चित करण्यासाठी नवीन सांडपाणी प्रक्रिया प्रकल्प, दृश्य अव्यवस्था दूर करण्यासाठी भूमिगत विद्युत केबलिंग आणि पावसाळ्यात पाणी साचणे टाळण्यासाठी आधुनिक निचरा प्रणाली यांचा समावेश आहे. संपूर्ण प्रकल्प जुलै 2026 पर्यंत पूर्ण होण्याची अपेक्षा आहे.",
    },
  },
  {
    id: 7,
    slug: "plastic-to-fuel-drive",
    title: {
      en: "Nashik Launches 'Plastic to Fuel' Drive in 200 Schools",
      hi: "नासिक ने 200 स्कूलों में 'प्लास्टिक से ईंधन' अभियान शुरू किया",
      mr: "नाशिकने 200 शाळांमध्ये 'प्लास्टिकपासून इंधन' मोहीम सुरू केली",
    },
    date: "2025-06-05",
    source: "Free Press Journal",
    category: "culture",
    image: "/images/gallery/kumbh-7.webp",
    summary: {
      en: "Nashik has launched a massive plastic-free campaign across 200 schools as part of a broader Rs 2,000 crore initiative to clean and restore the Godavari River before the Kumbh Mela 2027.",
      hi: "नासिक ने कुंभ मेला 2027 से पहले गोदावरी नदी को स्वच्छ और पुनर्स्थापित करने की 2,000 करोड़ रुपये की व्यापक पहल के तहत 200 स्कूलों में बड़े पैमाने पर प्लास्टिक-मुक्त अभियान शुरू किया है।",
      mr: "कुंभमेळा 2027 पूर्वी गोदावरी नदीच्या स्वच्छता व पुनर्स्थापनेसाठी 2,000 कोटी रुपयांच्या व्यापक उपक्रमाचा भाग म्हणून नाशिकने 200 शाळांमध्ये मोठ्या प्रमाणावर प्लास्टिक-मुक्त मोहीम सुरू केली आहे.",
    },
    content: {
      en: "Nashik has embarked on an ambitious environmental campaign by launching the 'Plastic to Fuel' drive across 200 schools in the district, aiming to create a generation of environmentally conscious citizens ahead of the Kumbh Mela 2027. The initiative, organized by the Nashik Municipal Corporation in collaboration with environmental NGOs, teaches students to collect, segregate, and convert plastic waste into usable fuel through pyrolysis technology, turning a pollutant into an energy resource.\n\nThe school campaign is part of a much larger Rs 2,000 crore Godavari River restoration project that aims to present a clean, rejuvenated river to the millions of devotees who will bathe in its waters during the Kumbh. The project includes the construction of 12 new sewage treatment plants along the Godavari's banks in Nashik, the elimination of 47 identified sewage discharge points, and the installation of real-time water quality monitoring stations at every major ghat.\n\nBeyond infrastructure, the campaign envisions a cultural shift. Over 5,000 street vendors and shopkeepers along pilgrimage routes are being trained to use biodegradable alternatives to plastic bags and disposable cutlery. The Nashik Municipal Corporation has announced that the entire Kumbh zone will be declared a single-use plastic-free area, with strict penalties for violations. Biodegradable waste collection points and composting stations will be set up at every 200-meter interval.\n\nEnvironmental experts have lauded the initiative as a model for other cities hosting large religious gatherings. The restored Godavari - free of plastic, sewage, and industrial pollutants - will not only serve the spiritual needs of Kumbh pilgrims but will also set a benchmark for river conservation across India. The project has already shown results, with water quality at Ramkund improving by 35 percent in the past six months.",
      hi: "नासिक ने जिले भर के 200 स्कूलों में 'प्लास्टिक से ईंधन' अभियान शुरू करके एक महत्वाकांक्षी पर्यावरण अभियान की शुरुआत की है, जिसका लक्ष्य कुंभ मेला 2027 से पहले पर्यावरण के प्रति जागरूक नागरिकों की पीढ़ी तैयार करना है। नासिक नगर निगम द्वारा पर्यावरण एनजीओ के सहयोग से आयोजित इस पहल में छात्रों को पायरोलिसिस तकनीक के माध्यम से प्लास्टिक कचरे को एकत्र करने, अलग करने और उपयोग योग्य ईंधन में बदलने की शिक्षा दी जाती है।\n\nस्कूल अभियान 2,000 करोड़ रुपये की बहुत बड़ी गोदावरी नदी पुनर्स्थापना परियोजना का हिस्सा है जिसका उद्देश्य कुंभ के दौरान पवित्र स्नान करने वाले लाखों श्रद्धालुओं को एक स्वच्छ, पुनर्जीवित नदी प्रदान करना है। परियोजना में नासिक में गोदावरी के किनारे 12 नए सीवेज उपचार संयंत्रों का निर्माण, 47 चिह्नित सीवेज डिस्चार्ज बिंदुओं का उन्मूलन और हर प्रमुख घाट पर रीयल-टाइम जल गुणवत्ता निगरानी स्टेशन शामिल हैं।\n\nबुनियादी ढाँचे से परे, अभियान एक सांस्कृतिक बदलाव की परिकल्पना करता है। तीर्थयात्रा मार्गों पर 5,000 से अधिक सड़क विक्रेताओं और दुकानदारों को प्लास्टिक बैग और डिस्पोजेबल कटलरी के बायोडिग्रेडेबल विकल्पों का उपयोग करने का प्रशिक्षण दिया जा रहा है। नासिक नगर निगम ने घोषणा की है कि पूरे कुंभ क्षेत्र को सिंगल-यूज प्लास्टिक-मुक्त क्षेत्र घोषित किया जाएगा।\n\nपर्यावरण विशेषज्ञों ने इस पहल को बड़े धार्मिक आयोजनों की मेजबानी करने वाले अन्य शहरों के लिए एक मॉडल के रूप में सराहा है। पुनर्स्थापित गोदावरी - प्लास्टिक, सीवेज और औद्योगिक प्रदूषकों से मुक्त - न केवल कुंभ तीर्थयात्रियों की आध्यात्मिक जरूरतों को पूरा करेगी बल्कि पूरे भारत में नदी संरक्षण के लिए एक मानक भी स्थापित करेगी। परियोजना ने पहले ही परिणाम दिखाए हैं, पिछले छह महीनों में रामकुंड में जल गुणवत्ता में 35 प्रतिशत सुधार हुआ है।",
      mr: "नाशिकने जिल्ह्यातील 200 शाळांमध्ये 'प्लास्टिकपासून इंधन' मोहीम सुरू करून एक महत्त्वाकांक्षी पर्यावरण अभियानाला सुरुवात केली आहे, ज्याचे उद्दिष्ट कुंभमेळा 2027 पूर्वी पर्यावरणाप्रती जागरूक नागरिकांची पिढी तयार करणे हे आहे. नाशिक महानगरपालिकेने पर्यावरण संस्थांच्या सहकार्याने आयोजित केलेल्या या उपक्रमात विद्यार्थ्यांना पायरोलिसिस तंत्रज्ञानाद्वारे प्लास्टिक कचरा गोळा करणे, वेगळा करणे आणि वापरण्यायोग्य इंधनात रूपांतरित करणे शिकवले जाते.\n\nशालेय मोहीम ही 2,000 कोटी रुपयांच्या गोदावरी नदी पुनर्स्थापना प्रकल्पाचा भाग आहे ज्याचे उद्दिष्ट कुंभमेळ्यादरम्यान पवित्र स्नान करणाऱ्या कोट्यवधी भाविकांना स्वच्छ, पुनर्जीवित नदी उपलब्ध करून देणे हे आहे. प्रकल्पात नाशिकमध्ये गोदावरीकाठी 12 नवीन सांडपाणी प्रक्रिया प्रकल्पांचे बांधकाम, 47 ओळखल्या गेलेल्या सांडपाणी विसर्जन स्थळांचे निर्मूलन आणि प्रत्येक प्रमुख घाटावर रिअल-टाइम जलगुणवत्ता निरीक्षण केंद्रांची स्थापना समाविष्ट आहे.\n\nपायाभूत सुविधांपलीकडे, मोहीम एक सांस्कृतिक बदलाची कल्पना करते. तीर्थयात्रा मार्गांवरील 5,000 हून अधिक रस्त्यावरील विक्रेते आणि दुकानदारांना प्लास्टिक पिशव्या आणि डिस्पोझेबल कटलरीला जैवविघटनशील पर्यायांचा वापर करण्याचे प्रशिक्षण दिले जात आहे. नाशिक महानगरपालिकेने संपूर्ण कुंभ क्षेत्र एकदाच वापरता येणाऱ्या प्लास्टिक-मुक्त क्षेत्र म्हणून घोषित केले जाईल असे जाहीर केले आहे.\n\nपर्यावरण तज्ज्ञांनी या उपक्रमाचे मोठ्या धार्मिक सोहळ्यांचे आयोजन करणाऱ्या इतर शहरांसाठी आदर्श म्हणून कौतुक केले आहे. पुनर्स्थापित गोदावरी - प्लास्टिक, सांडपाणी आणि औद्योगिक प्रदूषकांपासून मुक्त - केवळ कुंभ भाविकांच्या आध्यात्मिक गरजा पूर्ण करणार नाही तर संपूर्ण भारतात नदी संवर्धनासाठी एक मानदंड प्रस्थापित करेल. प्रकल्पाने आधीच परिणाम दाखवले आहेत, गेल्या सहा महिन्यांत रामकुंडावरील जलगुणवत्तेत 35 टक्के सुधारणा झाली आहे.",
    },
  },
  {
    id: 8,
    slug: "mobility-planning-rural-connectivity",
    title: {
      en: "Mobility Planning for Simhastha Focuses on Rural Connectivity",
      hi: "सिंहस्थ के लिए गतिशीलता योजना ग्रामीण कनेक्टिविटी पर केंद्रित",
      mr: "सिंहस्थासाठी वाहतूक नियोजन ग्रामीण जोडणीवर केंद्रित",
    },
    date: "2025-05-18",
    source: "Punekar News",
    category: "infra",
    image: "/images/gallery/kumbh-10.webp",
    summary: {
      en: "A comprehensive rural connectivity plan has been unveiled for Simhastha 2027, including bus station renovations and new routes connecting remote villages to Kumbh sites.",
      hi: "सिंहस्थ 2027 के लिए एक व्यापक ग्रामीण कनेक्टिविटी योजना का अनावरण किया गया है, जिसमें बस स्टेशन नवीनीकरण और दूरदराज के गाँवों को कुंभ स्थलों से जोड़ने वाले नए मार्ग शामिल हैं।",
      mr: "सिंहस्थ 2027 साठी सर्वसमावेशक ग्रामीण जोडणी योजना जाहीर करण्यात आली आहे, ज्यात बस स्थानक नूतनीकरण आणि दुर्गम गावांना कुंभ स्थळांशी जोडणारे नवीन मार्ग समाविष्ट आहेत.",
    },
    content: {
      en: "While much of the Kumbh infrastructure focus has been on Nashik city, a comprehensive mobility plan has been unveiled that places special emphasis on rural connectivity, ensuring that devotees from remote villages and smaller towns in the Nashik division have seamless access to the Kumbh Mela sites. The plan, developed by the Maharashtra State Road Transport Corporation (MSRTC) in coordination with the district administration, covers a network spanning over 1,200 kilometers of rural routes.\n\nThe Nashik Central Bus Station, known as the Mahamarg Bus Stand, will undergo a complete renovation costing Rs 180 crore. The upgraded facility will feature climate-controlled waiting areas, digital route information displays, automated ticketing kiosks, and dedicated bays for Kumbh shuttle services. Satellite bus stations at Panchavati, Satpur, and Gangapur will also be upgraded to handle overflow traffic.\n\nA key innovation is the introduction of a hub-and-spoke bus network where rural feeder buses from tehsil-level towns will connect to express shuttle services running between major Kumbh venues. Over 350 new bus routes have been planned, covering areas like Igatpuri, Dindori, Niphad, Sinnar, and Surgana - regions that are home to large tribal and farming communities who form a significant portion of local Kumbh pilgrims.\n\nThe rural mobility plan also includes improvements to over 500 kilometers of village roads under the Pradhan Mantri Gram Sadak Yojana, installation of bus shelters with solar lighting at 800 rural stops, and a mobile app that will provide real-time bus tracking and seat availability for rural routes. Special attention is being given to accessibility, with low-floor buses and wheelchair-accessible vehicles deployed on key routes to ensure that the Kumbh experience is truly inclusive.",
      hi: "जबकि कुंभ बुनियादी ढाँचे का अधिकांश ध्यान नासिक शहर पर रहा है, एक व्यापक गतिशीलता योजना का अनावरण किया गया है जो ग्रामीण कनेक्टिविटी पर विशेष जोर देती है, यह सुनिश्चित करती है कि नासिक संभाग के दूरदराज के गाँवों और छोटे कस्बों के भक्तों को कुंभ मेला स्थलों तक निर्बाध पहुँच हो। महाराष्ट्र राज्य सड़क परिवहन निगम (MSRTC) द्वारा जिला प्रशासन के समन्वय से विकसित इस योजना में 1,200 किलोमीटर से अधिक ग्रामीण मार्गों का नेटवर्क शामिल है।\n\nनासिक केंद्रीय बस स्टेशन, जिसे महामार्ग बस स्टैंड के नाम से जाना जाता है, का 180 करोड़ रुपये की लागत से पूर्ण नवीनीकरण किया जाएगा। उन्नत सुविधा में वातानुकूलित प्रतीक्षा क्षेत्र, डिजिटल मार्ग सूचना डिस्प्ले, स्वचालित टिकट कियोस्क और कुंभ शटल सेवाओं के लिए समर्पित बे होंगे। पंचवटी, सातपुर और गंगापुर के उपग्रह बस स्टेशनों को भी अतिरिक्त यातायात संभालने के लिए उन्नत किया जाएगा।\n\nएक प्रमुख नवाचार हब-एंड-स्पोक बस नेटवर्क है जहाँ तहसील स्तर के कस्बों से ग्रामीण फीडर बसें प्रमुख कुंभ स्थलों के बीच चलने वाली एक्सप्रेस शटल सेवाओं से जुड़ेंगी। 350 से अधिक नए बस मार्गों की योजना बनाई गई है, जो इगतपुरी, दिंडोरी, निफाड, सिन्नर और सुरगाणा जैसे क्षेत्रों को कवर करती हैं - जो बड़े आदिवासी और कृषक समुदायों का घर हैं।\n\nग्रामीण गतिशीलता योजना में प्रधानमंत्री ग्राम सड़क योजना के तहत 500 किलोमीटर से अधिक ग्रामीण सड़कों में सुधार, 800 ग्रामीण स्टॉप पर सोलर लाइटिंग वाले बस शेल्टर की स्थापना और ग्रामीण मार्गों के लिए रीयल-टाइम बस ट्रैकिंग प्रदान करने वाला मोबाइल ऐप भी शामिल है। सुगम्यता पर विशेष ध्यान दिया जा रहा है, प्रमुख मार्गों पर लो-फ्लोर बसें और व्हीलचेयर-सुलभ वाहन तैनात किए जाएंगे।",
      mr: "कुंभ पायाभूत सुविधांचे बरेचसे लक्ष नाशिक शहरावर केंद्रित असताना, एक सर्वसमावेशक वाहतूक योजना जाहीर करण्यात आली आहे जी ग्रामीण जोडणीवर विशेष भर देते, ज्यामुळे नाशिक विभागातील दुर्गम गावे आणि लहान शहरांमधील भाविकांना कुंभमेळा स्थळांपर्यंत सहज प्रवेश मिळेल याची खात्री करते. महाराष्ट्र राज्य मार्ग परिवहन महामंडळाने (MSRTC) जिल्हा प्रशासनाच्या समन्वयाने विकसित केलेल्या या योजनेत 1,200 किलोमीटरहून अधिक ग्रामीण मार्गांचे जाळे समाविष्ट आहे.\n\nनाशिक केंद्रीय बस स्थानक, ज्याला महामार्ग बस स्टँड म्हणून ओळखले जाते, त्याचे 180 कोटी रुपये खर्चाने संपूर्ण नूतनीकरण केले जाईल. सुधारित सुविधेत वातानुकूलित प्रतीक्षा क्षेत्रे, डिजिटल मार्ग माहिती डिस्प्ले, स्वयंचलित तिकीट कियॉस्क आणि कुंभ शटल सेवांसाठी समर्पित बे असतील. पंचवटी, सातपूर आणि गंगापूर येथील उपग्रह बस स्थानकेही अतिरिक्त वाहतूक हाताळण्यासाठी सुधारली जातील.\n\nएक प्रमुख नवकल्पना म्हणजे हब-अँड-स्पोक बस नेटवर्क जिथे तालुका स्तरावरील शहरांमधून ग्रामीण फीडर बसेस प्रमुख कुंभ स्थळांदरम्यान धावणाऱ्या एक्स्प्रेस शटल सेवांशी जोडल्या जातील. 350 हून अधिक नवीन बस मार्गांचे नियोजन करण्यात आले आहे, ज्यात इगतपुरी, दिंडोरी, निफाड, सिन्नर आणि सुरगाणा यांसारख्या भागांचा समावेश आहे - जे मोठ्या आदिवासी आणि शेतकरी समुदायांचे घर आहेत.\n\nग्रामीण वाहतूक योजनेत प्रधानमंत्री ग्राम सडक योजनेंतर्गत 500 किलोमीटरहून अधिक ग्रामीण रस्त्यांच्या सुधारणा, 800 ग्रामीण थांब्यांवर सौर प्रकाश व्यवस्था असलेल्या बस निवाऱ्यांची स्थापना आणि ग्रामीण मार्गांसाठी रिअल-टाइम बस ट्रॅकिंग उपलब्ध करणारे मोबाइल अॅप यांचाही समावेश आहे. सुलभतेवर विशेष लक्ष दिले जात आहे, प्रमुख मार्गांवर लो-फ्लोर बसेस आणि व्हीलचेअर-सुलभ वाहने तैनात केली जातील.",
    },
  },
  {
    id: 9,
    slug: "tent-cities-helicopter-jyotirlinga",
    title: {
      en: "Tent Cities and Helicopter Service Planned for Jyotirlinga Circuit",
      hi: "ज्योतिर्लिंग सर्किट के लिए टेंट सिटी और हेलीकॉप्टर सेवा की योजना",
      mr: "ज्योतिर्लिंग सर्किटसाठी तंबू शहरे आणि हेलिकॉप्टर सेवेचे नियोजन",
    },
    date: "2025-04-25",
    source: "Free Press Journal",
    category: "kumbh",
    image: "/images/ramkund.webp",
    summary: {
      en: "Luxurious tent cities and helicopter darshan services are being planned for the Jyotirlinga circuit during Kumbh 2027, with a 250+ acre Sadhugram to house saints and their followers.",
      hi: "कुंभ 2027 के दौरान ज्योतिर्लिंग सर्किट के लिए शानदार टेंट सिटी और हेलीकॉप्टर दर्शन सेवाओं की योजना बनाई जा रही है, संतों और उनके अनुयायियों के लिए 250+ एकड़ का साधुग्राम।",
      mr: "कुंभ 2027 दरम्यान ज्योतिर्लिंग सर्किटसाठी आलिशान तंबू शहरे आणि हेलिकॉप्टर दर्शन सेवांचे नियोजन केले जात आहे, संत आणि त्यांच्या अनुयायांसाठी 250+ एकरांचे साधुग्राम.",
    },
    content: {
      en: "In a bid to elevate the pilgrim experience at the Nashik Kumbh Mela 2027, authorities have announced plans for luxurious tent cities and a helicopter darshan service covering the Jyotirlinga circuit in the Nashik-Trimbakeshwar region. The tent city concept, inspired by the successful model at the Rann of Kutch festival, will offer pilgrims a range of accommodation options from basic tented shelters to premium glamping experiences with attached bathrooms, air conditioning, and traditional Maharashtrian decor.\n\nThe flagship accommodation project is the Sadhugram - a sprawling 250-plus-acre campus that will serve as the residential hub for thousands of saints, sadhus, and their followers during the Kumbh. Located strategically between Nashik and Trimbakeshwar, the Sadhugram will feature designated zones for each of the 13 Akhadas, complete with their own temples, kitchens (langars), meditation halls, and discourse pavilions. The layout has been designed in consultation with Akhada leaders to respect traditional hierarchies and protocols.\n\nThe helicopter Jyotirlinga darshan service is perhaps the most exciting addition to the 2027 Kumbh. Pilgrims will be able to book helicopter rides that connect Trimbakeshwar's Jyotirlinga with other sacred sites in the region, offering an aerial view of the magnificent Sahyadri mountains and the Godavari valley. The service will operate from three helipads - at Trimbakeshwar, Nashik city, and Sadhugram - and is expected to serve both pilgrims seeking a premium experience and emergency medical needs.\n\nAdditional tent cities are planned at Tapovan, Ramkund, and along the Godavari at Anandvalli, with a combined capacity of over 50,000 pilgrims per night. Each tent city will be self-contained with medical facilities, food courts offering sattvic cuisine, cultural performance stages, and spiritual discourse tents. The Maharashtra Tourism Development Corporation (MTDC) will operate the premium tent cities, while basic shelters will be provided free of cost to ensure that accommodation is accessible to all devotees regardless of their financial means.",
      hi: "नासिक कुंभ मेला 2027 में तीर्थयात्री अनुभव को ऊँचा उठाने के प्रयास में, अधिकारियों ने नासिक-त्र्यंबकेश्वर क्षेत्र में ज्योतिर्लिंग सर्किट को कवर करने वाली शानदार टेंट सिटी और हेलीकॉप्टर दर्शन सेवा की योजनाओं की घोषणा की है। रण ऑफ कच्छ उत्सव के सफल मॉडल से प्रेरित टेंट सिटी अवधारणा श्रद्धालुओं को बुनियादी तंबू आश्रयों से लेकर अटैच्ड बाथरूम, एयर कंडीशनिंग और पारंपरिक महाराष्ट्रीय सज्जा वाले प्रीमियम ग्लैम्पिंग अनुभव तक विभिन्न आवास विकल्प प्रदान करेगी।\n\nप्रमुख आवास परियोजना साधुग्राम है -250 एकड़ से अधिक का विशाल परिसर जो कुंभ के दौरान हजारों संतों, साधुओं और उनके अनुयायियों के आवासीय केंद्र के रूप में काम करेगा। नासिक और त्र्यंबकेश्वर के बीच रणनीतिक रूप से स्थित साधुग्राम में प्रत्येक 13 अखाड़ों के लिए निर्दिष्ट क्षेत्र होंगे, जिनमें अपने मंदिर, रसोई (लंगर), ध्यान कक्ष और प्रवचन मंडप होंगे।\n\nहेलीकॉप्टर ज्योतिर्लिंग दर्शन सेवा शायद 2027 कुंभ का सबसे रोमांचक अतिरिक्त है। श्रद्धालु हेलीकॉप्टर यात्रा बुक कर सकेंगे जो त्र्यंबकेश्वर के ज्योतिर्लिंग को क्षेत्र के अन्य पवित्र स्थलों से जोड़ेगी, सह्याद्री पर्वतों और गोदावरी घाटी का हवाई दृश्य प्रदान करेगी। सेवा तीन हेलीपैड से संचालित होगी - त्र्यंबकेश्वर, नासिक शहर और साधुग्राम में।\n\nअतिरिक्त टेंट सिटी तपोवन, रामकुंड और अनंदवल्ली में गोदावरी के किनारे नियोजित हैं, जिनकी संयुक्त क्षमता प्रति रात 50,000 से अधिक श्रद्धालुओं की है। प्रत्येक टेंट सिटी चिकित्सा सुविधाओं, सात्विक भोजन फूड कोर्ट, सांस्कृतिक कार्यक्रम मंच और आध्यात्मिक प्रवचन तंबू के साथ आत्मनिर्भर होगी। महाराष्ट्र पर्यटन विकास निगम (MTDC) प्रीमियम टेंट सिटी का संचालन करेगा, जबकि बुनियादी आश्रय सभी भक्तों को मुफ्त प्रदान किए जाएंगे।",
      mr: "नाशिक कुंभमेळा 2027 मध्ये भाविकांचा अनुभव उंचावण्याच्या प्रयत्नात, अधिकाऱ्यांनी नाशिक-त्र्यंबकेश्वर परिसरातील ज्योतिर्लिंग सर्किट कव्हर करणाऱ्या आलिशान तंबू शहरे आणि हेलिकॉप्टर दर्शन सेवेच्या योजना जाहीर केल्या आहेत. कच्छच्या रणोत्सवाच्या यशस्वी मॉडेलवरून प्रेरित तंबू शहर संकल्पना भाविकांना मूलभूत तंबू निवाऱ्यांपासून ते संलग्न स्नानगृह, वातानुकूलन आणि पारंपारिक महाराष्ट्रीय सजावट असलेल्या प्रीमियम ग्लँपिंग अनुभवापर्यंत विविध निवास पर्याय उपलब्ध करून देईल.\n\nप्रमुख निवास प्रकल्प म्हणजे साधुग्राम -250 एकरांपेक्षा अधिक विस्तारलेला परिसर जो कुंभमेळ्यादरम्यान हजारो संत, साधू आणि त्यांच्या अनुयायांचे निवासी केंद्र म्हणून काम करेल. नाशिक आणि त्र्यंबकेश्वर दरम्यान रणनीतिक ठिकाणी असलेल्या साधुग्राममध्ये प्रत्येक 13 आखाड्यांसाठी नियुक्त विभाग असतील, ज्यात स्वतःची मंदिरे, स्वयंपाकगृहे (लंगर), ध्यान कक्ष आणि प्रवचन मंडप असतील.\n\nहेलिकॉप्टर ज्योतिर्लिंग दर्शन सेवा ही 2027 कुंभमेळ्यातील कदाचित सर्वात रोमांचक भर आहे. भाविक हेलिकॉप्टर सवारी बुक करू शकतील जी त्र्यंबकेश्वरच्या ज्योतिर्लिंगाला परिसरातील इतर पवित्र स्थळांशी जोडेल, भव्य सह्याद्री पर्वत आणि गोदावरी खोऱ्याचे हवाई दृश्य देईल. ही सेवा तीन हेलिपॅडवरून चालवली जाईल - त्र्यंबकेश्वर, नाशिक शहर आणि साधुग्राम येथे.\n\nतपोवन, रामकुंड आणि आनंदवल्ली येथे गोदावरीकाठी अतिरिक्त तंबू शहरांचे नियोजन केले आहे, ज्यांची एकत्रित क्षमता प्रति रात्र 50,000 हून अधिक भाविकांची आहे. प्रत्येक तंबू शहर वैद्यकीय सुविधा, सात्त्विक भोजन फूड कोर्ट, सांस्कृतिक कार्यक्रम मंच आणि आध्यात्मिक प्रवचन तंबू यांसह स्वयंपूर्ण असेल. महाराष्ट्र पर्यटन विकास महामंडळ (MTDC) प्रीमियम तंबू शहरांचे संचालन करेल, तर मूलभूत निवारे सर्व भाविकांना मोफत उपलब्ध करून दिले जातील.",
    },
  },
  {
    id: 10,
    slug: "maharashtra-gears-up-kumbh",
    title: {
      en: "Maharashtra Government Gears Up for Nashik Kumbh Mela 2027",
      hi: "महाराष्ट्र सरकार नासिक कुंभ मेला 2027 की तैयारी में जुटी",
      mr: "महाराष्ट्र शासन नाशिक कुंभमेळा 2027 च्या तयारीला लागले",
    },
    date: "2025-03-29",
    source: "ANI News",
    category: "govt",
    image: "/images/gallery/kumbh-3.webp",
    summary: {
      en: "The Maharashtra government is positioning Nashik Kumbh 2027 as the most technologically advanced Kumbh Mela in history, with the 21-month festival integrating AI, IoT, and smart city solutions.",
      hi: "महाराष्ट्र सरकार नासिक कुंभ 2027 को इतिहास में सबसे तकनीकी रूप से उन्नत कुंभ मेले के रूप में स्थापित कर रही है, 21 महीने का महोत्सव AI, IoT और स्मार्ट सिटी समाधानों को एकीकृत करेगा।",
      mr: "महाराष्ट्र शासन नाशिक कुंभ 2027 ला इतिहासातील सर्वात तांत्रिकदृष्ट्या प्रगत कुंभमेळा म्हणून स्थापित करत आहे, 21 महिन्यांचा महोत्सव AI, IoT आणि स्मार्ट सिटी उपायांचे एकत्रीकरण करेल.",
    },
    content: {
      en: "The Maharashtra government has officially declared the Nashik Kumbh Mela 2027 as a state-priority mission, with Chief Minister Devendra Fadnavis setting the ambitious goal of making it the most technologically advanced and well-organized Kumbh in the event's centuries-old history. The announcement came during a special cabinet meeting dedicated entirely to Kumbh preparations, signaling the highest level of political commitment to the festival's success.\n\nWhat sets this Kumbh apart from its predecessors is the unprecedented integration of technology into every aspect of the festival management. An AI-powered central command center will serve as the nerve center of operations, processing data from thousands of sensors, cameras, and field devices in real time. IoT sensors will monitor crowd density, water quality, air pollution levels, and even waste bin fill levels, enabling proactive rather than reactive management.\n\nThe 21-month duration of the festival - from the flag hoisting in October 2026 to the concluding ceremonies in mid-2028 - presents unique logistical challenges. Unlike shorter festivals, the Kumbh must sustain infrastructure, services, and security across monsoon seasons, extreme heat, and winter months. The government has therefore adopted a phased approach, with different zones activated based on the festival calendar and expected crowd patterns.\n\nA dedicated Kumbh mobile application will serve as the digital companion for every pilgrim, offering features such as real-time navigation to ghats and temples, crowd density heat maps, accommodation booking, emergency SOS buttons, live streaming of rituals, and an AI chatbot that can answer queries in Hindi, Marathi, and English. The app will also feature an augmented reality guide that overlays historical and mythological information on landmarks when viewed through a smartphone camera.",
      hi: "महाराष्ट्र सरकार ने आधिकारिक रूप से नासिक कुंभ मेला 2027 को राज्य-प्राथमिकता मिशन घोषित किया है, मुख्यमंत्री देवेंद्र फडणवीस ने इसे सदियों पुराने इतिहास में सबसे तकनीकी रूप से उन्नत और सुव्यवस्थित कुंभ बनाने का महत्वाकांक्षी लक्ष्य रखा है। यह घोषणा पूरी तरह से कुंभ की तैयारियों को समर्पित एक विशेष कैबिनेट बैठक में की गई, जो महोत्सव की सफलता के लिए उच्चतम स्तर की राजनीतिक प्रतिबद्धता का संकेत है।\n\nइस कुंभ को अपने पूर्ववर्तियों से जो अलग करता है वह है महोत्सव प्रबंधन के हर पहलू में प्रौद्योगिकी का अभूतपूर्व एकीकरण। एक AI-संचालित केंद्रीय कमांड सेंटर संचालन के तंत्रिका केंद्र के रूप में काम करेगा, हजारों सेंसर, कैमरों और फील्ड उपकरणों से रीयल-टाइम डेटा संसाधित करेगा। IoT सेंसर भीड़ की घनत्व, जल गुणवत्ता, वायु प्रदूषण स्तर और यहाँ तक कि कचरा पेटी भरने के स्तर की निगरानी करेंगे।\n\n21 महीने की महोत्सव अवधि - अक्टूबर 2026 में ध्वजारोहण से लेकर 2028 के मध्य में समापन समारोह तक - अनूठी तार्किक चुनौतियाँ प्रस्तुत करती है। छोटे महोत्सवों के विपरीत, कुंभ को मानसून, भीषण गर्मी और सर्दियों के महीनों में बुनियादी ढाँचे, सेवाओं और सुरक्षा को बनाए रखना होगा। सरकार ने इसलिए चरणबद्ध दृष्टिकोण अपनाया है।\n\nएक समर्पित कुंभ मोबाइल ऐप हर तीर्थयात्री के डिजिटल साथी के रूप में काम करेगा, जो घाटों और मंदिरों तक रीयल-टाइम नेविगेशन, भीड़ घनत्व हीट मैप, आवास बुकिंग, आपातकालीन SOS बटन, अनुष्ठानों की लाइव स्ट्रीमिंग और हिंदी, मराठी और अंग्रेजी में सवालों का जवाब देने वाला AI चैटबोट जैसी सुविधाएँ प्रदान करेगा।",
      mr: "महाराष्ट्र शासनाने अधिकृतपणे नाशिक कुंभमेळा 2027 ला राज्य-प्राधान्य मिशन म्हणून घोषित केले आहे, मुख्यमंत्री देवेंद्र फडणवीस यांनी शतकानुशतकांच्या इतिहासातील सर्वात तांत्रिकदृष्ट्या प्रगत आणि सुव्यवस्थित कुंभमेळा बनवण्याचे महत्त्वाकांक्षी लक्ष्य ठेवले आहे. ही घोषणा संपूर्णपणे कुंभ तयारींना समर्पित विशेष मंत्रिमंडळ बैठकीत करण्यात आली, जी महोत्सवाच्या यशासाठी सर्वोच्च राजकीय बांधिलकी दर्शवते.\n\nया कुंभमेळ्याला त्याच्या पूर्वसुरींपेक्षा वेगळे करणारी बाब म्हणजे महोत्सव व्यवस्थापनाच्या प्रत्येक पैलूत तंत्रज्ञानाचे अभूतपूर्व एकत्रीकरण. AI-आधारित केंद्रीय कमांड सेंटर संचालनाचे मज्जातंतू केंद्र म्हणून काम करेल, हजारो सेन्सर, कॅमेरे आणि फील्ड उपकरणांमधून रिअल-टाइम डेटा प्रक्रिया करेल. IoT सेन्सर गर्दीची घनता, जलगुणवत्ता, वायू प्रदूषण पातळी आणि कचरापेटी भरण्याच्या पातळीचेही निरीक्षण करतील.\n\n21 महिन्यांचा महोत्सव कालावधी - ऑक्टोबर 2026 मधील ध्वजारोहणापासून 2028 च्या मध्यापर्यंतच्या समारोप सोहळ्यापर्यंत - अनोख्या तार्किक आव्हाने सादर करतो. लहान महोत्सवांपेक्षा वेगळे, कुंभमेळ्याला पावसाळा, कडक उन्हाळा आणि हिवाळ्याच्या महिन्यांत पायाभूत सुविधा, सेवा आणि सुरक्षा टिकवून ठेवावी लागेल. त्यामुळे शासनाने टप्प्याटप्प्याने दृष्टिकोन स्वीकारला आहे.\n\nसमर्पित कुंभ मोबाइल अॅप प्रत्येक भाविकाचा डिजिटल साथीदार म्हणून काम करेल, ज्यात घाट आणि मंदिरांपर्यंत रिअल-टाइम नेव्हिगेशन, गर्दी घनता हीट मॅप, निवास बुकिंग, आपत्कालीन SOS बटण, विधींचे लाइव्ह स्ट्रीमिंग आणि हिंदी, मराठी व इंग्रजीत प्रश्नांची उत्तरे देणारा AI चॅटबोट यांसारख्या सुविधा असतील.",
    },
  },
  {
    id: 11,
    slug: "monsoon-ready-tent-city",
    title: {
      en: "Monsoon-Ready Tent City Plans Reviewed for Simhastha 2027",
      hi: "सिंहस्थ 2027 के लिए मानसून-तैयार टेंट सिटी योजनाओं की समीक्षा",
      mr: "सिंहस्थ 2027 साठी पावसाळा-सज्ज तंबू शहर योजनांचा आढावा",
    },
    date: "2026-02-12",
    source: "Punekar News",
    category: "kumbh",
    image: "/images/gallery/kumbh-2.webp",
    summary: {
      en: "Climate-resilient bamboo tent structures have been designed for the Simhastha 2027 Kumbh Mela, engineered to withstand heavy monsoon rains while maintaining comfort and safety for pilgrims.",
      hi: "सिंहस्थ 2027 कुंभ मेले के लिए जलवायु-लचीले बाँस तंबू संरचनाओं को डिज़ाइन किया गया है, जो भारी मानसून बारिश का सामना करते हुए श्रद्धालुओं के आराम और सुरक्षा बनाए रखने के लिए इंजीनियर किए गए हैं।",
      mr: "सिंहस्थ 2027 कुंभमेळ्यासाठी हवामान-प्रतिरोधक बांबू तंबू संरचना तयार करण्यात आल्या आहेत, ज्या जोरदार पावसाळी पावसाला तोंड देताना भाविकांचा आराम आणि सुरक्षा राखतील.",
    },
    content: {
      en: "A high-level review committee has assessed the innovative monsoon-ready tent city designs proposed for the Simhastha Kumbh Mela 2027, marking a significant engineering breakthrough for large-scale temporary accommodation in India. Since the Kumbh's sacred bathing dates fall during the peak monsoon months of August and September, the traditional canvas tent model is entirely inadequate, necessitating a radically new approach to pilgrim shelter.\n\nThe winning design features climate-resilient structures built primarily from treated bamboo - a material that is lightweight, sustainable, and abundantly available in the Nashik region. The bamboo frames are engineered to withstand wind speeds of up to 120 kilometers per hour and are fitted with multi-layered waterproof canopies that include UV-resistant outer layers and insulated inner linings. Each tent unit includes raised flooring to prevent water seepage, proper drainage channels, and ventilation systems that prevent humidity buildup.\n\nThe engineering team, comprising architects from IIT Bombay and traditional bamboo craftsmen from Konkan, has created a modular system where tent units can be quickly assembled, disassembled, and relocated as needed. A prototype village of 50 tent units has been erected at the Sadhugram site for live testing during the current monsoon season. Initial results show the structures performing excellently, with zero leakage even during heavy downpours exceeding 100mm in a single day.\n\nBeyond weather resistance, the bamboo tent city concept aligns with the Kumbh's sustainability goals. Bamboo is a rapidly renewable resource, and the treated bamboo used in construction can be repurposed for furniture and rural housing after the festival. The tent structures will also incorporate solar panels for lighting and phone charging, rainwater harvesting systems, and composting toilets - making them self-sufficient eco-units that leave a minimal environmental footprint.",
      hi: "एक उच्चस्तरीय समीक्षा समिति ने सिंहस्थ कुंभ मेला 2027 के लिए प्रस्तावित नवीन मानसून-तैयार टेंट सिटी डिजाइनों का मूल्यांकन किया है, जो भारत में बड़े पैमाने पर अस्थायी आवास के लिए एक महत्वपूर्ण इंजीनियरिंग सफलता है। चूँकि कुंभ की पवित्र स्नान तिथियाँ अगस्त और सितंबर के चरम मानसून महीनों में आती हैं, पारंपरिक कैनवास तंबू मॉडल पूरी तरह से अपर्याप्त है, जिससे तीर्थयात्री आश्रय के लिए मौलिक रूप से नए दृष्टिकोण की आवश्यकता है।\n\nविजेता डिजाइन में मुख्य रूप से उपचारित बाँस से निर्मित जलवायु-लचीली संरचनाएँ हैं - एक ऐसी सामग्री जो हल्की, टिकाऊ और नासिक क्षेत्र में प्रचुर मात्रा में उपलब्ध है। बाँस के फ्रेम 120 किलोमीटर प्रति घंटे तक की हवा की गति सहने के लिए इंजीनियर किए गए हैं और UV-प्रतिरोधी बाहरी परतों और इन्सुलेटेड आंतरिक अस्तर वाली बहुपरत जलरोधक छतरियों से सुसज्जित हैं। प्रत्येक तंबू इकाई में पानी के रिसाव को रोकने के लिए ऊँचा फर्श, उचित जल निकासी चैनल और आर्द्रता संचय को रोकने वाली वेंटिलेशन प्रणाली शामिल है।\n\nIIT बॉम्बे के वास्तुकारों और कोंकण के पारंपरिक बाँस कारीगरों की इंजीनियरिंग टीम ने एक मॉड्यूलर सिस्टम बनाया है जहाँ तंबू इकाइयों को जल्दी से जोड़ा, खोला और स्थानांतरित किया जा सकता है। वर्तमान मानसून सीजन के दौरान लाइव परीक्षण के लिए साधुग्राम स्थल पर 50 तंबू इकाइयों का प्रोटोटाइप गाँव खड़ा किया गया है। प्रारंभिक परिणाम दिखाते हैं कि संरचनाएँ उत्कृष्ट प्रदर्शन कर रही हैं, एक दिन में 100mm से अधिक भारी बारिश में भी शून्य रिसाव है।\n\nमौसम प्रतिरोध के अलावा, बाँस टेंट सिटी अवधारणा कुंभ के स्थिरता लक्ष्यों के अनुरूप है। बाँस एक तेजी से नवीकरणीय संसाधन है, और निर्माण में उपयोग किए गए उपचारित बाँस को महोत्सव के बाद फर्नीचर और ग्रामीण आवास के लिए पुनर्उपयोग किया जा सकता है। तंबू संरचनाओं में प्रकाश और फोन चार्जिंग के लिए सोलर पैनल, वर्षा जल संचयन प्रणाली और कम्पोस्टिंग शौचालय भी शामिल होंगे।",
      mr: "एका उच्चस्तरीय आढावा समितीने सिंहस्थ कुंभमेळा 2027 साठी प्रस्तावित नाविन्यपूर्ण पावसाळा-सज्ज तंबू शहर रचनांचे मूल्यांकन केले आहे, जे भारतातील मोठ्या प्रमाणावरील तात्पुरत्या निवासासाठी एक महत्त्वपूर्ण अभियांत्रिकी प्रगती आहे. कुंभमेळ्याच्या पवित्र स्नानाच्या तारखा ऑगस्ट आणि सप्टेंबरच्या सर्वाधिक पावसाळी महिन्यांत येत असल्याने, पारंपारिक कॅनव्हास तंबू मॉडेल पूर्णपणे अपुरे आहे, ज्यामुळे भाविकांच्या निवाऱ्यासाठी मूलभूतपणे नव्या दृष्टिकोनाची आवश्यकता आहे.\n\nविजेत्या रचनेत प्रामुख्याने प्रक्रिया केलेल्या बांबूपासून बनवलेल्या हवामान-प्रतिरोधक संरचना आहेत - एक हलके, टिकाऊ आणि नाशिक परिसरात मुबलक उपलब्ध असलेले साहित्य. बांबूचे सांगाडे 120 किलोमीटर प्रति तास वाऱ्याचा वेग सहन करण्यासाठी तयार केले आहेत आणि UV-प्रतिरोधक बाहेरील थर आणि इन्सुलेटेड आतील अस्तर असलेल्या बहुस्तरीय जलरोधक छतांनी सज्ज आहेत. प्रत्येक तंबू युनिटमध्ये पाण्याचा शिरकाव रोखण्यासाठी उंचावलेला मजला, योग्य निचरा वाहिन्या आणि आर्द्रता जमा होणे टाळणारी हवेशीर यंत्रणा आहे.\n\nIIT बॉम्बेच्या वास्तुविशारद आणि कोकणच्या पारंपारिक बांबू कारागीरांच्या अभियांत्रिकी पथकाने एक मॉड्युलर प्रणाली तयार केली आहे जिथे तंबू युनिट्स लवकर जोडता, विघटित करता आणि आवश्यकतेनुसार हलवता येतात. सध्याच्या पावसाळी हंगामात प्रत्यक्ष चाचणीसाठी साधुग्राम स्थळावर 50 तंबू युनिट्सचे प्रोटोटाइप गाव उभारले गेले आहे. प्रारंभिक निकाल दर्शवतात की संरचना उत्कृष्ट कामगिरी करत आहेत, एका दिवसात 100mm पेक्षा जास्त जोरदार पावसातही शून्य गळती आहे.\n\nहवामान प्रतिरोधकतेपलीकडे, बांबू तंबू शहर संकल्पना कुंभमेळ्याच्या टिकाऊपणा उद्दिष्टांशी सुसंगत आहे. बांबू हा वेगाने नवीकरणीय स्रोत आहे आणि बांधकामात वापरलेला प्रक्रिया केलेला बांबू महोत्सवानंतर फर्निचर आणि ग्रामीण गृहनिर्माणासाठी पुन्हा वापरता येतो. तंबू संरचनांमध्ये प्रकाश आणि फोन चार्जिंगसाठी सोलर पॅनेल, पावसाचे पाणी साठवण प्रणाली आणि कंपोस्टिंग शौचालये यांचाही समावेश असेल.",
    },
  },
  {
    id: 12,
    slug: "telangana-delegation-visits",
    title: {
      en: "Telangana Delegation Visits Nashik to Study Kumbh Preparations",
      hi: "तेलंगाना प्रतिनिधिमंडल ने कुंभ की तैयारियों का अध्ययन करने नासिक का दौरा किया",
      mr: "तेलंगणा शिष्टमंडळाने कुंभ तयारींचा अभ्यास करण्यासाठी नाशिकला भेट दिली",
    },
    date: "2026-01-20",
    source: "Free Press Journal",
    category: "govt",
    image: "/images/panchavati.webp",
    summary: {
      en: "A high-level delegation from Telangana visited Nashik to study Kumbh Mela preparations and explore coordination opportunities for the Godavari Pushkaram festival.",
      hi: "तेलंगाना से एक उच्चस्तरीय प्रतिनिधिमंडल ने कुंभ मेला की तैयारियों का अध्ययन करने और गोदावरी पुष्करम उत्सव के लिए समन्वय के अवसरों का पता लगाने के लिए नासिक का दौरा किया।",
      mr: "तेलंगणातील एका उच्चस्तरीय शिष्टमंडळाने कुंभमेळा तयारींचा अभ्यास करण्यासाठी आणि गोदावरी पुष्करम सोहळ्यासाठी समन्वयाच्या संधी शोधण्यासाठी नाशिकला भेट दिली.",
    },
    content: {
      en: "A high-level delegation from the Telangana state government, led by senior officials from the Endowments and Tourism departments, visited Nashik to study the ongoing preparations for the Kumbh Mela 2027. The visit underscores the growing inter-state interest in the Nashik Kumbh, particularly because the Godavari River - central to both the Nashik Kumbh and the Telangana Pushkaram - serves as a sacred thread connecting the two states.\n\nThe Telangana delegation spent three days inspecting key infrastructure projects, including the Trimbakeshwar Darshan Path, the Sadhugram site, the ring road construction, and the Godavari riverfront development. Officials from both states discussed possibilities for joint promotion of a 'Godavari Heritage Corridor' that would encourage pilgrims attending the Nashik Kumbh to also visit the Godavari Pushkaram sites in Basara, Dharmapuri, and Bhadrachalam in Telangana.\n\nThe shared heritage of the Godavari offers a unique opportunity for cultural and spiritual tourism collaboration. The river, which originates at Trimbakeshwar in Nashik and flows 1,465 kilometers to the Bay of Bengal through Telangana and Andhra Pradesh, is revered as the Dakshin Ganga (Ganges of the South). Both governments have expressed interest in coordinating festival calendars, offering combined pilgrimage packages, and sharing best practices in crowd management and river conservation.\n\nThe Telangana delegation was particularly impressed by Nashik's AI-powered crowd management systems and the bamboo tent city designs, expressing interest in adapting these innovations for the Pushkaram. A memorandum of understanding is being drafted to formalize the collaboration, which could set a precedent for inter-state cooperation in managing large religious festivals across India.",
      hi: "तेलंगाना राज्य सरकार से एक उच्चस्तरीय प्रतिनिधिमंडल, जिसमें बंदोबस्ती और पर्यटन विभागों के वरिष्ठ अधिकारी शामिल थे, ने कुंभ मेला 2027 की चल रही तैयारियों का अध्ययन करने के लिए नासिक का दौरा किया। यह दौरा नासिक कुंभ में बढ़ती अंतरराज्यीय रुचि को दर्शाता है, विशेष रूप से इसलिए क्योंकि गोदावरी नदी - जो नासिक कुंभ और तेलंगाना पुष्करम दोनों के केंद्र में है - दोनों राज्यों को जोड़ने वाले पवित्र सूत्र के रूप में काम करती है।\n\nतेलंगाना प्रतिनिधिमंडल ने तीन दिन त्र्यंबकेश्वर दर्शन पथ, साधुग्राम स्थल, रिंग रोड निर्माण और गोदावरी रिवरफ्रंट विकास सहित प्रमुख बुनियादी ढाँचा परियोजनाओं का निरीक्षण किया। दोनों राज्यों के अधिकारियों ने 'गोदावरी विरासत गलियारे' के संयुक्त प्रचार की संभावनाओं पर चर्चा की, जो नासिक कुंभ में आने वाले तीर्थयात्रियों को तेलंगाना में बसारा, धर्मपुरी और भद्राचलम के पुष्करम स्थलों का भी दौरा करने के लिए प्रोत्साहित करेगा।\n\nगोदावरी की साझी विरासत सांस्कृतिक और आध्यात्मिक पर्यटन सहयोग का अनूठा अवसर प्रदान करती है। नदी, जो नासिक में त्र्यंबकेश्वर से निकलती है और तेलंगाना व आंध्र प्रदेश से होकर 1,465 किलोमीटर बहते हुए बंगाल की खाड़ी तक पहुँचती है, दक्षिण गंगा के रूप में पूजनीय है। दोनों सरकारों ने महोत्सव कैलेंडर में समन्वय, संयुक्त तीर्थयात्रा पैकेज और भीड़ प्रबंधन एवं नदी संरक्षण में सर्वोत्तम प्रथाओं को साझा करने में रुचि व्यक्त की है।\n\nतेलंगाना प्रतिनिधिमंडल नासिक की AI-संचालित भीड़ प्रबंधन प्रणालियों और बाँस टेंट सिटी डिजाइनों से विशेष रूप से प्रभावित हुआ और पुष्करम के लिए इन नवाचारों को अपनाने में रुचि व्यक्त की। सहयोग को औपचारिक रूप देने के लिए एक समझौता ज्ञापन तैयार किया जा रहा है।",
      mr: "तेलंगणा राज्य शासनातील बंदोबस्त आणि पर्यटन विभागांच्या वरिष्ठ अधिकाऱ्यांच्या नेतृत्वाखालील एका उच्चस्तरीय शिष्टमंडळाने कुंभमेळा 2027 च्या सुरू असलेल्या तयारींचा अभ्यास करण्यासाठी नाशिकला भेट दिली. ही भेट नाशिक कुंभमेळ्यातील वाढत्या आंतरराज्य स्वारस्याचे प्रतीक आहे, विशेषतः गोदावरी नदी - जी नाशिक कुंभ आणि तेलंगणा पुष्करम दोन्हींच्या केंद्रस्थानी आहे - दोन्ही राज्यांना जोडणारा पवित्र दुवा म्हणून काम करते.\n\nतेलंगणा शिष्टमंडळाने तीन दिवस त्र्यंबकेश्वर दर्शन पथ, साधुग्राम स्थळ, रिंग रोड बांधकाम आणि गोदावरी नदीकाठ विकास यांसारख्या प्रमुख पायाभूत सुविधा प्रकल्पांची पाहणी केली. दोन्ही राज्यांच्या अधिकाऱ्यांनी 'गोदावरी वारसा मार्ग' च्या संयुक्त प्रचाराच्या शक्यतांवर चर्चा केली, जो नाशिक कुंभमेळ्याला येणाऱ्या भाविकांना तेलंगणातील बसारा, धर्मपुरी आणि भद्राचलम येथील पुष्करम स्थळांनाही भेट देण्यास प्रोत्साहित करेल.\n\nगोदावरीचा सामायिक वारसा सांस्कृतिक आणि आध्यात्मिक पर्यटन सहकार्याची अनोखी संधी देतो. नदी, जी नाशिकमधील त्र्यंबकेश्वर येथे उगम पावते आणि तेलंगणा व आंध्र प्रदेशातून 1,465 किलोमीटर वाहत बंगालच्या उपसागरापर्यंत पोहोचते, दक्षिण गंगा म्हणून पूजली जाते. दोन्ही शासनांनी महोत्सव दिनदर्शिका समन्वय, संयुक्त तीर्थयात्रा पॅकेज आणि गर्दी व्यवस्थापन व नदी संवर्धनातील सर्वोत्तम पद्धती सामायिक करण्यात स्वारस्य व्यक्त केले आहे.\n\nतेलंगणा शिष्टमंडळ नाशिकच्या AI-आधारित गर्दी व्यवस्थापन प्रणाली आणि बांबू तंबू शहर रचनांनी विशेषतः प्रभावित झाले आणि पुष्करमसाठी या नवकल्पना अवलंबण्यात स्वारस्य व्यक्त केले. सहकार्य अधिकृत करण्यासाठी सामंजस्य करार तयार केला जात आहे.",
    },
  },
];

/** Every post, newest first. */
export const blogArticles: BlogArticle[] = [...latestNews, ...archiveArticles].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogArticles.map((a) => a.slug);
}

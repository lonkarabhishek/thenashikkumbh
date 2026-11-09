import type { BlogArticle } from "@/data/blogData";

const TOI_MINUTES = "https://timesofindia.indiatimes.com/city/nashik/chief-secretary-orders-crackdown-on-units-polluting-godavari/articleshow/135664673.cms";
const TOI_MEETING = "https://timesofindia.indiatimes.com/city/nashik/chief-secretary-raps-mpcb-nmc-over-river-pollution-chromium-contamination/articleshow/135548548.cms";
const CHROMIUM = "/blog/hexavalent-chromium-found-in-nandini-river-near-ambad-midc";
const HC = "/blog/high-court-asks-nmc-for-godavari-pollution-plan-within-two-weeks-hearing-october-27";
const PAWAR = "/blog/rohit-pawar-alleges-corruption-in-nashik-kumbh-works-seeks-accounts-in-10-days-20-day-ultimatum-midc-mpcb-godavari-pollution";
const GHATS = "/ghats";

export const article: BlogArticle = {
  id: 290,
  slug: "chief-secretary-orders-crackdown-on-industries-polluting-godavari-mpcb-raids-officials-accountable",
  title: {
    en: "Chief Secretary Orders Crackdown on Units Polluting the Godavari; Officials Who Allowed Violations to Be Held Responsible (Reported)",
    hi: "मुख्य सचिव का आदेश: गोदावरी प्रदूषित करने वाले उद्योगों पर सख़्ती, उल्लंघन होने देने वाले अधिकारियों की ज़िम्मेदारी तय होगी (रिपोर्ट)",
    mr: "मुख्य सचिवांचे आदेश: गोदावरी प्रदूषित करणाऱ्या उद्योगांवर कारवाई, उल्लंघनाकडे डोळेझाक करणाऱ्या अधिकाऱ्यांवर जबाबदारी (वृत्त)",
  },
  date: "2026-11-09",
  originallyAnnounced: "2026-11-04",
  source: "Times of India",
  sources: [
    {
      title: "Chief secretary orders crackdown on units polluting Godavari",
      publisher: "Times of India",
      date: "2026-11-08",
      url: TOI_MINUTES,
      status: "reported",
    },
    {
      title: "Chief secretary raps MPCB, NMC over river pollution, chromium contamination",
      publisher: "Times of India",
      date: "2026-11-04",
      url: TOI_MEETING,
      status: "reported",
    },
  ],
  category: "govt",
  image: "/images/og-image.jpg",
  photoId: 49,
  summary: {
    en: "REPORTED. Maharashtra Chief Secretary Rajesh Aggarwal has directed the Maharashtra Pollution Control Board (MPCB) to raid and act against industries sending untreated effluent into the Godavari and its tributaries in Nashik, and to fix responsibility on officials who allowed violations despite zero liquid discharge rules, the Times of India reported on 8 November from the minutes of a 4 November Mantralaya meeting. MIDC and NMC are to share a roughly Rs 250 crore treatment plant for the Ambad and Satpur industrial areas. We have not seen the minutes ourselves.",
    hi: "रिपोर्ट। टाइम्स ऑफ इंडिया ने 8 नवंबर को 4 नवंबर की मंत्रालय बैठक के कार्यवृत्त के हवाले से लिखा कि मुख्य सचिव राजेश अग्रवाल ने महाराष्ट्र प्रदूषण नियंत्रण बोर्ड (MPCB) को नाशिक में गोदावरी और उसकी सहायक नदियों में बिना शोधन का अपशिष्ट छोड़ने वाले उद्योगों पर छापे और कार्रवाई का निर्देश दिया है। शून्य तरल निर्वहन (ZLD) शर्त के बावजूद उल्लंघन होने देने वाले अधिकारियों की ज़िम्मेदारी भी तय होगी। अंबड और सातपुर औद्योगिक क्षेत्र के लिए करीब 250 करोड़ रुपये का शोधन संयंत्र MIDC और मनपा मिलकर बनाएँगे। कार्यवृत्त हमने खुद नहीं देखा।",
    mr: "वृत्त. टाइम्स ऑफ इंडियाने ८ नोव्हेंबरला ४ नोव्हेंबरच्या मंत्रालयातील बैठकीच्या इतिवृत्ताच्या आधारे दिले की मुख्य सचिव राजेश अग्रवाल यांनी महाराष्ट्र प्रदूषण नियंत्रण मंडळाला (MPCB) नाशिकमध्ये गोदावरी आणि तिच्या उपनद्यांत प्रक्रिया न केलेले सांडपाणी सोडणाऱ्या उद्योगांवर छापे टाकून कारवाई करण्याचे निर्देश दिले आहेत. शून्य द्रव विसर्ग (ZLD) अट असूनही उल्लंघन होऊ देणाऱ्या अधिकाऱ्यांची जबाबदारीही निश्चित केली जाणार आहे. अंबड आणि सातपूर औद्योगिक क्षेत्रासाठी सुमारे २५० कोटींचे प्रक्रिया केंद्र MIDC आणि महापालिका मिळून उभारणार आहेत. इतिवृत्त आम्ही स्वतः पाहिलेले नाही.",
  },
  content: {
    en: `**REPORTED.** Everything below is from the Times of India, which on 8 November 2026 quoted the minutes of a meeting chaired by Chief Secretary Rajesh Aggarwal at Mantralaya, Mumbai, on 4 November. We have not seen the minutes, and no government press note on them was found on 9 November.

The meeting reviewed pollution and chromium contamination in the Godavari and its tributaries. It was held because of a contempt petition in the Bombay High Court on Godavari pollution. TOI says the court, in its 27 October order, voiced serious concern over chromium found in water samples and the continued discharge of hazardous industrial effluent. Our earlier posts on the [court hearing](${HC}) and the [chromium found in the Nandini near Ambad MIDC](${CHROMIUM}) have the background.

## What the minutes reportedly direct

- **MPCB** must sample the Godavari and its tributaries at many points, including the Nandini, local nullahs and suspected discharge points, and analyse the samples quickly to find the sources.
- MPCB must **inspect and raid** suspected units and order penalties or closure where the law allows. It must also list the most polluting industries, with their owners.
- **Officials** who allowed or helped violations despite the zero liquid discharge (ZLD) condition in factory consents are to be held responsible. Disciplinary action, including suspension where warranted, is to follow.
- **MIDC** must examine how polluting units came to be set up and run in Nashik's industrial areas, and fix accountability.
- **NMC** and the water resources department must check illegal constructions shown in photographs filed in the High Court. NMC must inspect illegal construction inside the river's blue and red flood lines.

## Money and people

- A sewage treatment plant and sewer network for the **Ambad and Satpur** industrial areas is estimated by NMC at about **Rs 250 crore**. MIDC is to pay two-thirds and NMC one-third. Maharashtra Jeevan Pradhikaran is to give technical sanction to the project report. Interim steps are to stop pollution until it is ready.
- For the proposed **Godavari Protection Police Squad**, MPCB is to fund, for now, the pay of 30 Maharashtra State Security Corporation personnel proposed by the Nashik police commissioner. The divisional commissioner will put together a final funding proposal.

## What the city says

NMC commissioner Manisha Khatri told the meeting the chromium was found in the Nandini tributary, not the Godavari's main channel. The chief secretary asked MPCB to verify this by sampling. Khatri told TOI that four new sewage treatment plants and one upgrade are designed to keep treated water below 5 mg/l BOD, and are due by **March 2027**.

TOI's 4 November report on the same meeting said the High Court had recorded chromium of 50.3 mg/L in water entering the Godavari through a nullah near a Kumbh Mela ghat, and that the chief secretary also questioned why police had not been posted along the banks as the court directed in 2018.

## Why this matters for pilgrims

The Amrit Snans are in August and September 2027. These are orders and plans, not results. Until MPCB publishes test results, there is no official word that the water at the [ghats](${GHATS}) is fit for bathing. This is separate from the [political row over Godavari pollution](${PAWAR}) earlier this month.`,
    hi: `**रिपोर्ट।** नीचे का सब टाइम्स ऑफ इंडिया से है, जिसने 8 नवंबर 2026 को मुख्य सचिव राजेश अग्रवाल की अध्यक्षता में 4 नवंबर को मंत्रालय, मुंबई में हुई बैठक के कार्यवृत्त का हवाला दिया। कार्यवृत्त हमने नहीं देखा, और 9 नवंबर तक इस पर कोई सरकारी प्रेस नोट नहीं मिला।

बैठक में गोदावरी और उसकी सहायक नदियों के प्रदूषण और क्रोमियम की समीक्षा हुई। यह बॉम्बे हाई कोर्ट में गोदावरी प्रदूषण पर अवमानना याचिका के कारण हुई। TOI के अनुसार कोर्ट ने 27 अक्टूबर के आदेश में पानी के नमूनों में क्रोमियम और खतरनाक औद्योगिक अपशिष्ट के लगातार बहाव पर गंभीर चिंता जताई थी। पृष्ठभूमि हमारी पहले की पोस्टों में है: [कोर्ट की सुनवाई](${HC}) और [अंबड MIDC के पास नंदिनी में क्रोमियम](${CHROMIUM})।

## कार्यवृत्त में कथित निर्देश

- **MPCB** गोदावरी और सहायक नदियों में कई जगह नमूने ले, जिनमें नंदिनी, स्थानीय नाले और संदिग्ध निकास बिंदु शामिल हैं, और जल्दी जाँच कर स्रोत पता करे।
- MPCB संदिग्ध इकाइयों की **जाँच करे और छापे मारे**, और कानून के मुताबिक जुर्माना या बंदी का आदेश दे। सबसे ज़्यादा प्रदूषण करने वाले उद्योगों की सूची उनके मालिकों के ब्योरे के साथ बनाए।
- कारखानों की अनुमति में शून्य तरल निर्वहन (ZLD) की शर्त के बावजूद उल्लंघन होने देने वाले **अधिकारियों** की ज़िम्मेदारी तय हो। ज़रूरत हो तो निलंबन समेत अनुशासनात्मक कार्रवाई हो।
- **MIDC** जाँचे कि नाशिक के औद्योगिक क्षेत्रों में प्रदूषण करने वाली इकाइयाँ कैसे लगीं और चलीं, और जवाबदेही तय करे।
- **मनपा** और जलसंपदा विभाग हाई कोर्ट में दी गई तस्वीरों में दिखे अवैध निर्माण की जाँच करें। मनपा नदी की नीली और लाल बाढ़ रेखा के भीतर अवैध निर्माण की जाँच करे।

## पैसा और लोग

- **अंबड और सातपुर** औद्योगिक क्षेत्र के लिए सीवेज शोधन संयंत्र और सीवर नेटवर्क का मनपा अनुमान करीब **250 करोड़ रुपये** है। दो-तिहाई MIDC और एक-तिहाई मनपा देगी। महाराष्ट्र जीवन प्राधिकरण परियोजना रिपोर्ट को तकनीकी मंज़ूरी देगा। तब तक प्रदूषण रोकने के अंतरिम उपाय होंगे।
- प्रस्तावित **गोदावरी संरक्षण पुलिस दस्ते** के लिए नाशिक पुलिस आयुक्त के प्रस्तावित महाराष्ट्र राज्य सुरक्षा महामंडल के 30 कर्मियों का वेतन फ़िलहाल MPCB देगा। अंतिम प्रस्ताव संभागीय आयुक्त तैयार करेंगे।

## शहर का पक्ष

मनपा आयुक्त मनीषा खत्री ने बैठक में कहा कि क्रोमियम सहायक नदी नंदिनी में मिला, गोदावरी की मुख्य धारा में नहीं। मुख्य सचिव ने MPCB से नमूनों से इसकी पुष्टि करने को कहा। खत्री ने TOI से कहा कि चार नए सीवेज शोधन संयंत्र और एक उन्नयन शोधित पानी में BOD 5 mg/l से कम रखने के लिए बने हैं, और **मार्च 2027** तक पूरे होंगे।

उसी बैठक पर TOI की 4 नवंबर की रिपोर्ट के अनुसार हाई कोर्ट ने कुंभ मेला घाट के पास एक नाले से गोदावरी में आने वाले पानी में 50.3 mg/L क्रोमियम दर्ज किया था। मुख्य सचिव ने यह भी पूछा कि 2018 के कोर्ट निर्देश के बावजूद किनारों पर पुलिस क्यों नहीं तैनात हुई।

## श्रद्धालुओं के लिए इसका मतलब

अमृत स्नान अगस्त और सितंबर 2027 में हैं। ये आदेश और योजनाएँ हैं, नतीजे नहीं। जब तक MPCB जाँच के नतीजे प्रकाशित न करे, [घाटों](${GHATS}) का पानी स्नान योग्य होने की कोई आधिकारिक बात नहीं है। यह इस महीने के [गोदावरी प्रदूषण पर राजनीतिक विवाद](${PAWAR}) से अलग है।`,
    mr: `**वृत्त.** खालील सर्व टाइम्स ऑफ इंडियाचे आहे. त्यांनी ८ नोव्हेंबर २०२६ रोजी मुख्य सचिव राजेश अग्रवाल यांच्या अध्यक्षतेखाली ४ नोव्हेंबरला मंत्रालय, मुंबई येथे झालेल्या बैठकीच्या इतिवृत्ताचा हवाला दिला. इतिवृत्त आम्ही पाहिलेले नाही, आणि ९ नोव्हेंबरपर्यंत त्यावर सरकारी प्रसिद्धीपत्रक आढळले नाही.

बैठकीत गोदावरी आणि उपनद्यांतील प्रदूषण आणि क्रोमियमचा आढावा झाला. मुंबई उच्च न्यायालयातील गोदावरी प्रदूषणावरील अवमान याचिकेमुळे ही बैठक झाली. TOI नुसार न्यायालयाने २७ ऑक्टोबरच्या आदेशात पाण्याच्या नमुन्यांतील क्रोमियम आणि घातक औद्योगिक सांडपाण्याच्या सततच्या विसर्गावर गंभीर चिंता व्यक्त केली होती. पार्श्वभूमी आमच्या आधीच्या बातम्यांत आहे: [न्यायालयातील सुनावणी](${HC}) आणि [अंबड MIDC जवळ नंदिनीत क्रोमियम](${CHROMIUM}).

## इतिवृत्तातील कथित निर्देश

- **MPCB** ने गोदावरी आणि उपनद्यांतून अनेक ठिकाणी नमुने घ्यावेत, त्यात नंदिनी, स्थानिक नाले आणि संशयित विसर्ग बिंदू यांचा समावेश आहे, आणि लवकर तपासणी करून स्रोत शोधावेत.
- MPCB ने संशयित उद्योगांची **तपासणी करून छापे टाकावेत**, आणि कायद्यानुसार दंड किंवा बंदीचे आदेश द्यावेत. सर्वाधिक प्रदूषण करणाऱ्या उद्योगांची यादी मालकांच्या तपशीलासह तयार करावी.
- कारखान्यांच्या परवानगीत शून्य द्रव विसर्ग (ZLD) अट असूनही उल्लंघन होऊ देणाऱ्या **अधिकाऱ्यांची** जबाबदारी निश्चित करावी. गरज असल्यास निलंबनासह शिस्तभंगाची कारवाई करावी.
- **MIDC** ने नाशिकच्या औद्योगिक वसाहतींत प्रदूषण करणारे उद्योग कसे उभे राहिले आणि चालले याची तपासणी करून जबाबदारी निश्चित करावी.
- **महापालिका** आणि जलसंपदा विभागाने उच्च न्यायालयात सादर छायाचित्रांतील अनधिकृत बांधकामांची पडताळणी करावी. महापालिकेने नदीच्या निळ्या आणि लाल पूररेषेतील अनधिकृत बांधकामांची तपासणी करावी.

## निधी आणि मनुष्यबळ

- **अंबड आणि सातपूर** औद्योगिक क्षेत्रासाठी मलनिस्सारण प्रक्रिया केंद्र आणि मलवाहिनी जाळ्याचा महापालिकेचा अंदाज सुमारे **२५० कोटी रुपये** आहे. दोन-तृतीयांश MIDC आणि एक-तृतीयांश महापालिका देणार. महाराष्ट्र जीवन प्राधिकरण प्रकल्प अहवालाला तांत्रिक मान्यता देईल. तोपर्यंत प्रदूषण रोखण्यासाठी तात्पुरते उपाय होतील.
- प्रस्तावित **गोदावरी संरक्षण पोलीस पथकासाठी** नाशिक पोलीस आयुक्तांनी प्रस्तावित केलेल्या महाराष्ट्र राज्य सुरक्षा महामंडळाच्या ३० जवानांचे वेतन सध्या MPCB देईल. अंतिम प्रस्ताव विभागीय आयुक्त तयार करतील.

## शहराची बाजू

महापालिका आयुक्त मनीषा खत्री यांनी बैठकीत सांगितले की क्रोमियम नंदिनी या उपनदीत आढळले, गोदावरीच्या मुख्य पात्रात नाही. मुख्य सचिवांनी MPCB ला नमुन्यांद्वारे याची खात्री करण्यास सांगितले. खत्री यांनी TOI ला सांगितले की चार नवी मलनिस्सारण प्रक्रिया केंद्रे आणि एका केंद्राचे उन्नयन प्रक्रिया केलेल्या पाण्यात BOD ५ mg/l पेक्षा कमी ठेवण्यासाठी आहेत, आणि ती **मार्च २०२७** पर्यंत पूर्ण होतील.

त्याच बैठकीवरील TOI च्या ४ नोव्हेंबरच्या वृत्तानुसार उच्च न्यायालयाने कुंभमेळा घाटाजवळील एका नाल्यातून गोदावरीत येणाऱ्या पाण्यात ५०.३ mg/L क्रोमियम नोंदवले होते. २०१८ च्या न्यायालयीन निर्देशानंतरही काठावर पोलीस का तैनात झाले नाहीत, असा प्रश्नही मुख्य सचिवांनी विचारला.

## भाविकांसाठी याचा अर्थ

अमृत स्नान ऑगस्ट आणि सप्टेंबर २०२७ मध्ये आहेत. हे आदेश आणि नियोजन आहे, निकाल नाहीत. MPCB तपासणीचे निकाल प्रसिद्ध करेपर्यंत [घाटांवरील](${GHATS}) पाणी स्नानयोग्य असल्याचे कोणतेही अधिकृत विधान नाही. हे या महिन्यातील [गोदावरी प्रदूषणावरील राजकीय वादापेक्षा](${PAWAR}) वेगळे आहे.`,
  },
};

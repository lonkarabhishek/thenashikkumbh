import { Locale } from "@/i18n/translations";

/**
 * Yatra — the walking story trails.
 *
 * Each stop carries its narration as plain text in all three languages. The
 * player speaks it with the device voice today; when recorded narration is
 * commissioned, drop the file paths into `audio` and the player prefers them
 * automatically. Nothing else has to change.
 *
 * Coordinates are indicative centre points for the monument, accurate enough
 * for a 60–120 m arrival radius on foot.
 */

export type L10n = Record<Locale, string>;

export interface StoryChapter {
  /** Short label shown in the chapter rail, e.g. "The stone that listens". */
  heading: L10n;
  body: L10n;
}

export interface StoryStop {
  id: string;
  name: L10n;
  subtitle: L10n;
  lat: number;
  lng: number;
  /** Arrival radius in metres — how close before Flow offers the story. */
  radiusM: number;
  /** Walking minutes from the previous stop on the trail. */
  walkMinutes: number;
  /** Approximate spoken length, in seconds, at a natural pace. */
  durationSec: number;
  /** A sensory instruction — what to look at or listen for while it plays. */
  lookFor: L10n;
  chapters: StoryChapter[];
  /** Reserved for recorded narration. Player prefers these when present. */
  audio?: Partial<Record<Locale, string>>;
}

export interface Trail {
  id: string;
  name: L10n;
  subtitle: L10n;
  description: L10n;
  distanceKm: number;
  totalMinutes: number;
  /** Accent colour token used for the trail's map line and badges. */
  accent: "saffron" | "river" | "indigo";
  stops: StoryStop[];
}

export const trails: Trail[] = [
  /* ─────────────────────────────────────────────────────────
     TRAIL 1 — Panchavati, the Ramayana ground
     ───────────────────────────────────────────────────────── */
  {
    id: "panchavati",
    accent: "saffron",
    name: {
      en: "The Panchavati Trail",
      hi: "पंचवटी पथ",
      mr: "पंचवटी वाट",
    },
    subtitle: {
      en: "Walking where the Ramayana happened",
      hi: "जहाँ रामायण घटी, वहाँ चलते हुए",
      mr: "जिथे रामायण घडले, तिथून चालताना",
    },
    description: {
      en: "Five stops along the old riverside town — the bathing kund where Rama offered water to his father, a Shiva temple with no bull at its door, a black stone Rama who watched a nation change, and the cave where Sita hid. About an hour on foot, all of it flat.",
      hi: "नदी किनारे बसे पुराने नगर में पाँच पड़ाव — वह कुंड जहाँ राम ने पिता को जल दिया, वह शिव मंदिर जिसके द्वार पर नंदी नहीं, वह काले पत्थर के राम जिन्होंने देश को बदलते देखा, और वह गुफा जहाँ सीता छिपी थीं। पैदल लगभग एक घंटा, पूरा रास्ता समतल।",
      mr: "नदीकाठच्या जुन्या शहरातील पाच थांबे — ज्या कुंडात रामाने पित्याला जल अर्पण केले ते, ज्याच्या दारात नंदी नाही ते शिवमंदिर, देश बदलताना पाहणारे काळ्या दगडातील राम, आणि सीता लपली ती गुहा. पायी सुमारे एक तास, संपूर्ण रस्ता सपाट.",
    },
    distanceKm: 1.9,
    totalMinutes: 62,
    stops: [
      {
        id: "ramkund",
        name: { en: "Ram Kund", hi: "रामकुंड", mr: "रामकुंड" },
        subtitle: {
          en: "The kund where bone dissolves",
          hi: "वह कुंड जहाँ अस्थि विलीन होती है",
          mr: "जिथे अस्थी विरघळते ते कुंड",
        },
        lat: 19.9975,
        lng: 73.7898,
        radiusM: 90,
        walkMinutes: 0,
        durationSec: 165,
        lookFor: {
          en: "Stand at the top step. Watch how families move — the ones arriving are quiet, the ones leaving are lighter.",
          hi: "सबसे ऊपरी सीढ़ी पर खड़े हों। देखिए परिवार कैसे चलते हैं — आने वाले चुप हैं, जाने वाले हल्के।",
          mr: "सर्वात वरच्या पायरीवर उभे राहा. कुटुंबे कशी वावरतात पाहा — येणारी शांत, जाणारी हलकी.",
        },
        chapters: [
          {
            heading: {
              en: "A son, a father, and a handful of water",
              hi: "एक पुत्र, एक पिता, और अंजुरी भर जल",
              mr: "एक पुत्र, एक पिता, आणि ओंजळभर पाणी",
            },
            body: {
              en: "You are standing at the oldest reason Nashik exists. The story goes that Rama, in the fourteenth year of exile, learned here that his father Dasharatha had died in Ayodhya grieving for him. There was no body to burn and no court to mourn in. So he came down these steps, took the Godavari in his cupped hands, and offered it — the shraddha rite a son owes his father. Every ritual performed at this kund since then repeats that gesture. Look at the water and understand what it is being asked to carry.",
              hi: "आप उस कारण पर खड़े हैं जिससे नाशिक बना। कथा है कि वनवास के चौदहवें वर्ष में राम को यहीं पता चला कि उनके पिता दशरथ अयोध्या में उन्हीं के वियोग में चल बसे। न जलाने को देह थी, न शोक करने को दरबार। सो वे इन्हीं सीढ़ियों से उतरे, गोदावरी को अंजुरी में भरा, और अर्पित किया — वही श्राद्ध जो पुत्र पिता को देता है। तब से इस कुंड पर होने वाला हर संस्कार उसी क्षण को दोहराता है। जल को देखिए और समझिए कि उससे क्या ढोने को कहा जा रहा है।",
              mr: "नाशिक का वसले, त्या मूळ कारणावर तुम्ही उभे आहात. कथा अशी की वनवासाच्या चौदाव्या वर्षी रामाला इथेच कळले की त्यांचे पिता दशरथ अयोध्येत त्यांच्याच विरहात गेले. जाळायला देह नव्हता, शोक करायला दरबार नव्हता. म्हणून ते याच पायऱ्या उतरले, गोदावरी ओंजळीत घेतली, आणि अर्पण केली — पुत्राने पित्याला द्यायचे तेच श्राद्ध. तेव्हापासून या कुंडावर होणारा प्रत्येक विधी तोच क्षण पुन्हा जगतो. पाण्याकडे पाहा आणि समजून घ्या की त्याला काय वाहायला सांगितले जात आहे.",
            },
          },
          {
            heading: {
              en: "Why the ashes come here",
              hi: "अस्थियाँ यहीं क्यों आती हैं",
              mr: "अस्थी इथेच का येतात",
            },
            body: {
              en: "There is a smaller pool beside the main one called Asthi Vilay Tirth — the tirth where bone dissolves. People have believed for centuries that ash and bone left in this water simply disappear into it, and that the soul is released from having to return. This is why families travel from across Maharashtra and further with a small cloth bundle, and why you will see more grief here than anywhere else in the city. During the Kumbh, the same steps take a hundred thousand people an hour. Move gently. Someone near you is doing the hardest thing they will do this year.",
              hi: "मुख्य कुंड के पास एक छोटा कुंड है — अस्थि विलय तीर्थ। सदियों से मान्यता है कि इस जल में छोड़ी गई राख और अस्थि उसी में विलीन हो जाती है, और आत्मा को लौटने से मुक्ति मिलती है। इसीलिए महाराष्ट्र भर से और उससे भी दूर से परिवार एक छोटी गठरी लेकर आते हैं, और इसीलिए इस शहर में सबसे अधिक शोक आपको यहीं दिखेगा। कुंभ के दिनों में यही सीढ़ियाँ हर घंटे एक लाख लोगों को संभालती हैं। धीरे चलिए। आपके पास खड़ा कोई इस वर्ष का सबसे कठिन काम कर रहा है।",
              mr: "मुख्य कुंडाशेजारी एक लहान कुंड आहे — अस्थी विलय तीर्थ. शतकानुशतके श्रद्धा आहे की या पाण्यात सोडलेली रक्षा आणि अस्थी त्यातच विरघळून जाते, आणि आत्म्याला परत यावे लागत नाही. म्हणूनच महाराष्ट्रभरातून आणि त्याहून दूरवरून कुटुंबे एक लहानशी गाठोडी घेऊन येतात, आणि म्हणूनच या शहरात सर्वात जास्त शोक तुम्हाला इथेच दिसेल. कुंभाच्या दिवसांत याच पायऱ्या तासाला एक लाख माणसे सांभाळतात. हळू चला. तुमच्या शेजारी उभा असलेला कोणीतरी या वर्षातले सर्वात कठीण काम करतो आहे.",
            },
          },
        ],
      },
      {
        id: "kapaleshwar",
        name: {
          en: "Kapaleshwar Mahadev",
          hi: "कपालेश्वर महादेव",
          mr: "कपालेश्वर महादेव",
        },
        subtitle: {
          en: "The Shiva temple with no Nandi",
          hi: "वह शिव मंदिर जहाँ नंदी नहीं",
          mr: "नंदी नसलेले शिवमंदिर",
        },
        lat: 19.9985,
        lng: 73.7889,
        radiusM: 70,
        walkMinutes: 4,
        durationSec: 150,
        lookFor: {
          en: "Before you step in, look straight down the axis to the sanctum. Every other Shiva temple in India has a stone bull sitting in that line. This one is empty.",
          hi: "भीतर जाने से पहले गर्भगृह की सीध में देखिए। भारत के हर दूसरे शिव मंदिर में उस रेखा पर पत्थर का नंदी बैठा होता है। यहाँ वह जगह खाली है।",
          mr: "आत जाण्यापूर्वी गाभाऱ्याच्या सरळ रेषेत पाहा. भारतातील इतर प्रत्येक शिवमंदिरात त्या रेषेत दगडी नंदी बसलेला असतो. इथे ती जागा रिकामी आहे.",
        },
        chapters: [
          {
            heading: {
              en: "The empty place in front of the god",
              hi: "देव के सामने की खाली जगह",
              mr: "देवासमोरची रिकामी जागा",
            },
            body: {
              en: "You have just noticed the strangest thing about this temple. There is no Nandi. In Hindu practice the bull always faces Shiva, and you are meant to look at the god over its shoulders. Here the line is clear all the way to the linga, and the reason is a story about guilt. Shiva, in one telling, severed the fifth head of Brahma and could not shake the sin of it. He wandered, carrying the skull — kapala — that would not leave his hand. That is the name of this temple.",
              hi: "आपने इस मंदिर की सबसे अनोखी बात देख ली। यहाँ नंदी नहीं है। हिंदू परंपरा में नंदी सदा शिव के सामने रहता है, और भक्त उसके कंधों के ऊपर से देव के दर्शन करता है। यहाँ दृष्टि सीधी लिंग तक जाती है, और इसका कारण एक अपराधबोध की कथा है। एक कथा के अनुसार शिव ने ब्रह्मा का पाँचवाँ शीश काटा और उस पाप से छूट न सके। वे भटकते रहे, वह कपाल हाथ से जाता ही नहीं था। इसी कपाल से इस मंदिर का नाम बना।",
              mr: "या मंदिराची सर्वात वेगळी गोष्ट तुम्ही आत्ताच पाहिली. इथे नंदी नाही. हिंदू परंपरेत नंदी नेहमी शिवासमोर असतो, आणि भक्ताने त्याच्या खांद्यावरून देवाचे दर्शन घ्यायचे असते. इथे नजर थेट लिंगापर्यंत जाते, आणि याचे कारण एक अपराधाची कथा आहे. एका कथेनुसार शिवाने ब्रह्मदेवाचे पाचवे शीर छाटले आणि त्या पापातून त्यांची सुटका होईना. ते भटकत राहिले, ते कपाल हातातून सुटतच नव्हते. त्याच कपालावरून या मंदिराचे नाव आले.",
            },
          },
          {
            heading: {
              en: "A cow gave the advice",
              hi: "सलाह एक गाय ने दी",
              mr: "सल्ला एका गायीने दिला",
            },
            body: {
              en: "Wandering in that state, Shiva met a cow. The cow told him to bathe in the water at Ram Kund, just below where you were standing. He did, and the skull fell from his hand. Then he learned who the cow was — Nandi himself, in another form. Shiva said: you have become my guru, and a guru cannot sit at my feet. So in this one temple in all of India, out of gratitude, the bull was never installed. Remember that the next time someone tells you Hinduism has no room for the teacher outranking the god.",
              hi: "उसी दशा में भटकते हुए शिव को एक गाय मिली। गाय ने कहा — रामकुंड के जल में स्नान कीजिए, वही जो अभी आपके नीचे था। उन्होंने वैसा ही किया, और कपाल हाथ से गिर पड़ा। तब जाना कि वह गाय कौन थी — स्वयं नंदी, दूसरे रूप में। शिव बोले: तुम मेरे गुरु हो गए, और गुरु मेरे चरणों में नहीं बैठ सकता। इसीलिए पूरे भारत में केवल इसी मंदिर में, कृतज्ञता के कारण, नंदी कभी स्थापित नहीं हुआ। अगली बार कोई कहे कि हिंदू परंपरा में गुरु देव से बड़ा नहीं होता, तो यह याद रखिएगा।",
              mr: "त्याच अवस्थेत भटकताना शिवाला एक गाय भेटली. गायीने सांगितले — रामकुंडाच्या पाण्यात स्नान करा, तेच जे आत्ताच तुमच्या खाली होते. त्यांनी तसे केले, आणि कपाल हातातून गळून पडले. तेव्हा कळले की ती गाय कोण होती — स्वतः नंदी, दुसऱ्या रूपात. शिव म्हणाले: तू माझा गुरू झालास, आणि गुरू माझ्या पायाशी बसू शकत नाही. म्हणून संपूर्ण भारतात फक्त याच मंदिरात, कृतज्ञतेपोटी, नंदी कधीच बसवला गेला नाही. पुढच्या वेळी कोणी म्हणेल की हिंदू परंपरेत गुरू देवापेक्षा मोठा नसतो, तेव्हा हे आठवा.",
            },
          },
        ],
      },
      {
        id: "kalaram",
        name: {
          en: "Kalaram Mandir",
          hi: "काळाराम मंदिर",
          mr: "काळाराम मंदिर",
        },
        subtitle: {
          en: "Black stone Rama, and the door that stayed shut",
          hi: "काले पत्थर के राम, और वह द्वार जो बंद रहा",
          mr: "काळ्या दगडातील राम, आणि बंद राहिलेले दार",
        },
        lat: 20.0018,
        lng: 73.7901,
        radiusM: 90,
        walkMinutes: 9,
        durationSec: 175,
        lookFor: {
          en: "Look at the east gate from outside before you enter. That is where the crowd stood in 1930.",
          hi: "भीतर जाने से पहले बाहर से पूर्व द्वार देखिए। 1930 में भीड़ वहीं खड़ी थी।",
          mr: "आत जाण्यापूर्वी बाहेरून पूर्व दरवाजा पाहा. १९३० मध्ये गर्दी तिथेच उभी होती.",
        },
        chapters: [
          {
            heading: {
              en: "Seventy tonnes of black basalt",
              hi: "सत्तर टन काला पत्थर",
              mr: "सत्तर टन काळा पाषाण",
            },
            body: {
              en: "This temple was finished in 1792, paid for by Sardar Rangarao Odhekar, and it took two thousand workers twelve years. The stone came from Ramshej hill, a few kilometres north. Inside stands a Rama carved in black basalt — kala Rama, which is what the temple is named for. A Rama in black is unusual and deliberate; devotees here will tell you that the darkness is not absence but depth. Notice the eighty-four pillars in the courtyard. Eighty-four lakh is the number of births Hindu tradition counts before a soul earns a human one.",
              hi: "यह मंदिर 1792 में पूर्ण हुआ, सरदार रंगराव ओढेकर के व्यय से, और दो हज़ार श्रमिकों को बारह वर्ष लगे। पत्थर कुछ किलोमीटर उत्तर की रामशेज पहाड़ी से आया। भीतर काले बेसाल्ट में तराशे राम खड़े हैं — काळाराम, इसी से मंदिर का नाम। काले राम असामान्य हैं और जानबूझकर हैं; यहाँ के भक्त कहेंगे कि यह कालापन अभाव नहीं, गहराई है। आँगन के चौरासी स्तंभ देखिए। चौरासी लाख — हिंदू परंपरा में उतने ही जन्म गिने जाते हैं जिनके बाद आत्मा को मनुष्य जन्म मिलता है।",
              mr: "हे मंदिर १७९२ मध्ये पूर्ण झाले, सरदार रंगराव ओढेकर यांच्या खर्चाने, आणि दोन हजार कामगारांना बारा वर्षे लागली. दगड काही किलोमीटर उत्तरेच्या रामशेज डोंगरातून आला. आत काळ्या पाषाणात कोरलेले राम उभे आहेत — काळाराम, त्यावरूनच मंदिराचे नाव. काळे राम दुर्मिळ आहेत आणि मुद्दाम आहेत; इथले भक्त सांगतील की हा काळेपणा अभाव नाही, खोली आहे. अंगणातले चौऱ्याऐंशी खांब पाहा. चौऱ्याऐंशी लाख — हिंदू परंपरेत तितकेच जन्म मोजले जातात, ज्यानंतर आत्म्याला मनुष्यजन्म मिळतो.",
            },
          },
          {
            heading: {
              en: "2 March 1930",
              hi: "2 मार्च 1930",
              mr: "२ मार्च १९३०",
            },
            body: {
              en: "This temple holds a second history that matters as much. On the second of March 1930, Dr Babasaheb Ambedkar led around fifteen thousand people to this gate, asking that Dalits be allowed to enter and see Rama like anyone else. The doors were shut against them. The satyagraha went on for over five years. It did not win entry at the time, but it made the exclusion visible to the whole country, and the argument it started ended up written into the Constitution that Ambedkar drafted. Today anyone may walk in. Walk in knowing what that cost, and who paid it.",
              hi: "इस मंदिर का एक दूसरा इतिहास भी है, उतना ही महत्वपूर्ण। 2 मार्च 1930 को डॉ. बाबासाहेब आंबेडकर लगभग पंद्रह हज़ार लोगों के साथ इसी द्वार पर आए, यह माँग लेकर कि दलितों को भी भीतर जाकर राम के दर्शन का अधिकार मिले। द्वार उनके सामने बंद कर दिए गए। सत्याग्रह पाँच वर्ष से अधिक चला। उस समय प्रवेश नहीं मिला, पर उसने इस बहिष्कार को पूरे देश के सामने रख दिया, और जो बहस वहाँ शुरू हुई वह अंततः उसी संविधान में लिखी गई जिसे आंबेडकर ने रचा। आज कोई भी भीतर जा सकता है। जाइए, पर यह जानकर कि इसकी क़ीमत क्या थी और किसने चुकाई।",
              mr: "या मंदिराला दुसरा इतिहासही आहे, तितकाच महत्त्वाचा. २ मार्च १९३० रोजी डॉ. बाबासाहेब आंबेडकर सुमारे पंधरा हजार लोकांसह याच दरवाजावर आले, ही मागणी घेऊन की दलितांनाही आत जाऊन रामाचे दर्शन घेता यावे. दरवाजे त्यांच्यासमोर बंद करण्यात आले. सत्याग्रह पाच वर्षांहून अधिक चालला. त्यावेळी प्रवेश मिळाला नाही, पण त्याने हा बहिष्कार संपूर्ण देशासमोर उघड केला, आणि तिथे सुरू झालेला युक्तिवाद अखेर त्याच संविधानात लिहिला गेला जे आंबेडकरांनी घडवले. आज कोणीही आत जाऊ शकते. जा, पण याची किंमत काय होती आणि ती कोणी मोजली हे जाणून.",
            },
          },
        ],
      },
      {
        id: "sita-gufa",
        name: { en: "Sita Gufa", hi: "सीता गुफा", mr: "सीता गुंफा" },
        subtitle: {
          en: "Five banyans and a very small door",
          hi: "पाँच वटवृक्ष और एक बहुत छोटा द्वार",
          mr: "पाच वटवृक्ष आणि एक अगदी लहान दार",
        },
        lat: 20.0021,
        lng: 73.7896,
        radiusM: 60,
        walkMinutes: 3,
        durationSec: 135,
        lookFor: {
          en: "Count the banyan trees around you. The name of this whole neighbourhood is hiding in that number.",
          hi: "अपने आसपास के वटवृक्ष गिनिए। पूरे मोहल्ले का नाम उसी संख्या में छिपा है।",
          mr: "आजूबाजूचे वटवृक्ष मोजा. संपूर्ण भागाचे नाव त्याच संख्येत दडले आहे.",
        },
        chapters: [
          {
            heading: {
              en: "Panch. Vati. Five banyans.",
              hi: "पंच। वटी। पाँच वटवृक्ष।",
              mr: "पंच. वटी. पाच वटवृक्ष.",
            },
            body: {
              en: "Panchavati is not a poetic name, it is a description. Panch is five, vat is the banyan, and the five trees are said to have marked the clearing where Rama, Sita and Lakshmana built their hut for the forest years. Everything you have walked through this hour sits inside that clearing. The trees you can see are not the original five, obviously — but the town has kept replanting them in the same place for as long as anyone has kept records, which is its own kind of faithfulness.",
              hi: "पंचवटी काव्यात्मक नाम नहीं, वर्णन है। पंच अर्थात पाँच, वट अर्थात बरगद, और कहा जाता है कि उन्हीं पाँच वृक्षों ने वह स्थान चिह्नित किया जहाँ राम, सीता और लक्ष्मण ने वनवास की कुटी बनाई। इस एक घंटे में आप जितना चले, वह सब उसी परिसर के भीतर है। जो वृक्ष दिख रहे हैं वे मूल पाँच नहीं, स्पष्ट है — पर जब से लेखा रखा जा रहा है तब से यह नगर उन्हें उसी स्थान पर फिर-फिर लगाता आया है, और यह अपने आप में एक निष्ठा है।",
              mr: "पंचवटी हे काव्यात्मक नाव नाही, वर्णन आहे. पंच म्हणजे पाच, वट म्हणजे वडाचे झाड, आणि त्याच पाच झाडांनी ती जागा दाखवली असे म्हणतात, जिथे राम, सीता आणि लक्ष्मण यांनी वनवासाची कुटी बांधली. या तासाभरात तुम्ही जे चाललात ते सर्व त्याच परिसरात आहे. दिसणारी झाडे मूळची पाच नाहीत, हे उघड आहे — पण नोंदी ठेवल्या जाऊ लागल्यापासून हे शहर ती त्याच जागी पुन्हा पुन्हा लावत आले आहे, आणि तीही एक निष्ठाच आहे.",
            },
          },
          {
            heading: {
              en: "Go in sideways",
              hi: "बग़ल से भीतर जाइए",
              mr: "कलत आत जा",
            },
            body: {
              en: "The cave entrance is deliberately tight — narrow stone steps, low roof, most adults have to turn their shoulders. Inside there is a small shrine to Sita, and beyond it a linga said to have been worshipped by her. The discomfort of getting in is part of the point: you cannot arrive here casually or in a hurry, and you certainly cannot arrive here proud. If you are claustrophobic, it is perfectly fine to look from the top of the steps. The story does not require you to be uncomfortable, only attentive.",
              hi: "गुफा का द्वार जानबूझकर तंग है — सँकरी पत्थर की सीढ़ियाँ, नीची छत, अधिकांश वयस्कों को कंधे तिरछे करने पड़ते हैं। भीतर सीता का छोटा मंदिर है, और उससे आगे एक लिंग जिसकी पूजा उन्होंने की थी ऐसा कहा जाता है। भीतर पहुँचने की यह असुविधा भी अर्थ रखती है: यहाँ आप लापरवाही से या जल्दबाज़ी में नहीं पहुँच सकते, और अभिमान में तो बिल्कुल नहीं। यदि बंद जगहों से घबराहट होती है तो सीढ़ियों के ऊपर से देख लेना पूरी तरह ठीक है। कथा आपसे असुविधा नहीं, केवल ध्यान माँगती है।",
              mr: "गुहेचे दार मुद्दाम अरुंद आहे — निमुळत्या दगडी पायऱ्या, खाली छत, बहुतेक प्रौढांना खांदे तिरके करावे लागतात. आत सीतेचे लहानसे मंदिर आहे, आणि त्यापुढे एक लिंग, ज्याची पूजा तिने केली असे सांगितले जाते. आत पोहोचण्यातली ही अडचणही अर्थपूर्ण आहे: इथे तुम्ही बेफिकीरपणे किंवा घाईत पोहोचू शकत नाही, आणि गर्वाने तर मुळीच नाही. बंद जागांची भीती वाटत असेल तर पायऱ्यांवरून पाहणे पूर्णपणे ठीक आहे. कथा तुमच्याकडून अस्वस्थता मागत नाही, फक्त लक्ष मागते.",
            },
          },
        ],
      },
      {
        id: "godavari-ghats",
        name: {
          en: "The Godavari Ghats",
          hi: "गोदावरी घाट",
          mr: "गोदावरी घाट",
        },
        subtitle: {
          en: "Where twelve years arrive at once",
          hi: "जहाँ बारह वर्ष एक साथ आते हैं",
          mr: "जिथे बारा वर्षे एकदम येतात",
        },
        lat: 19.9962,
        lng: 73.7912,
        radiusM: 120,
        walkMinutes: 6,
        durationSec: 160,
        lookFor: {
          en: "Sit on a step facing the water. Notice the iron rings set into the stone — those are what the crowd holds during Shahi Snan.",
          hi: "जल की ओर मुँह करके किसी सीढ़ी पर बैठिए। पत्थर में जड़े लोहे के कड़े देखिए — शाही स्नान में भीड़ उन्हीं को थामती है।",
          mr: "पाण्याकडे तोंड करून एका पायरीवर बसा. दगडात बसवलेल्या लोखंडी कड्या पाहा — शाही स्नानात गर्दी त्यांनाच धरते.",
        },
        chapters: [
          {
            heading: {
              en: "The Ganga of the south",
              hi: "दक्षिण की गंगा",
              mr: "दक्षिणेची गंगा",
            },
            body: {
              en: "This river is called Dakshin Ganga, the Ganga of the south, and Nashik treats it exactly as Varanasi treats the Ganga. It rises about thirty kilometres west of here at Brahmagiri, near Trimbakeshwar, from a spring small enough to cover with both hands, and it crosses the whole subcontinent to the Bay of Bengal. What makes this particular bend sacred is Simhastha — the twelve-year cycle when Jupiter enters Leo, Simha. When that happens, this water is held to become amrit, and everything you see being built around you exists for those few weeks.",
              hi: "इस नदी को दक्षिण गंगा कहते हैं, और नाशिक इससे ठीक वैसा ही बर्ताव करता है जैसा वाराणसी गंगा से। यह यहाँ से लगभग तीस किलोमीटर पश्चिम, त्र्यंबकेश्वर के पास ब्रह्मगिरि पर एक ऐसे स्रोत से निकलती है जिसे दोनों हथेलियों से ढका जा सके, और पूरे उपमहाद्वीप को पार कर बंगाल की खाड़ी तक जाती है। इस विशेष मोड़ को पवित्र बनाता है सिंहस्थ — वह बारह वर्ष का चक्र जब बृहस्पति सिंह राशि में प्रवेश करते हैं। तब यह जल अमृत हो जाता है ऐसी मान्यता है, और आपके चारों ओर जो कुछ बन रहा है वह उन्हीं कुछ सप्ताहों के लिए है।",
              mr: "या नदीला दक्षिण गंगा म्हणतात, आणि नाशिक तिच्याशी अगदी तसेच वागते जसे वाराणसी गंगेशी. ती इथून सुमारे तीस किलोमीटर पश्चिमेला, त्र्यंबकेश्वरजवळ ब्रह्मगिरीवर अशा झऱ्यातून उगम पावते जो दोन्ही तळहातांनी झाकता येईल, आणि संपूर्ण उपखंड ओलांडून बंगालच्या उपसागरापर्यंत जाते. या विशिष्ट वळणाला पवित्र करते ते सिंहस्थ — बृहस्पती सिंह राशीत प्रवेश करतो तो बारा वर्षांचा फेरा. तेव्हा हे पाणी अमृत होते अशी श्रद्धा आहे, आणि तुमच्याभोवती जे काही उभे राहते आहे ते त्याच काही आठवड्यांसाठी आहे.",
            },
          },
          {
            heading: {
              en: "What a Shahi Snan actually looks like",
              hi: "शाही स्नान वास्तव में कैसा दिखता है",
              mr: "शाही स्नान प्रत्यक्षात कसे दिसते",
            },
            body: {
              en: "On a Shahi Snan morning the akhadas come down to the water first, in a fixed order agreed centuries ago, and the public follows. It begins before dawn. There will be more people on these steps in one hour than live in most Indian towns. If you are here on such a day, three things matter more than the darshan: know your exit before you go down, agree a meeting point with your family that is not a person but a place, and do not carry anything you would grieve losing. The river will still be here at four in the afternoon, and so will the merit.",
              hi: "शाही स्नान की सुबह पहले अखाड़े जल तक आते हैं, सदियों पहले तय क्रम में, फिर जनता। यह भोर से पहले शुरू होता है। एक घंटे में इन सीढ़ियों पर उतने लोग होंगे जितने भारत के अधिकांश क़स्बों में रहते हैं। यदि आप उस दिन यहाँ हैं तो दर्शन से अधिक तीन बातें मायने रखती हैं: नीचे उतरने से पहले अपना निकास जान लीजिए, परिवार से मिलने की जगह तय कीजिए — कोई व्यक्ति नहीं, कोई स्थान, और ऐसा कुछ साथ मत रखिए जिसके खोने का दुःख हो। नदी दोपहर चार बजे भी यहीं होगी, और पुण्य भी।",
              mr: "शाही स्नानाच्या सकाळी आधी आखाडे पाण्यापर्यंत येतात, शतकांपूर्वी ठरलेल्या क्रमाने, मग सामान्य लोक. हे पहाटेच्या आधी सुरू होते. एका तासात या पायऱ्यांवर भारतातील बहुतेक गावांच्या लोकसंख्येइतकी माणसे असतील. त्या दिवशी तुम्ही इथे असाल तर दर्शनापेक्षा तीन गोष्टी जास्त महत्त्वाच्या: खाली उतरण्यापूर्वी आपला बाहेर पडण्याचा मार्ग माहीत करून घ्या, कुटुंबाशी भेटण्याची जागा ठरवा — कोणी माणूस नव्हे, एखादे ठिकाण, आणि हरवल्यास दुःख होईल असे काही सोबत ठेवू नका. नदी दुपारी चार वाजताही इथेच असेल, आणि पुण्यही.",
            },
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     TRAIL 2 — Trimbakeshwar, where the river begins
     ───────────────────────────────────────────────────────── */
  {
    id: "trimbak",
    accent: "river",
    name: {
      en: "The Source Trail",
      hi: "उद्गम पथ",
      mr: "उगम वाट",
    },
    subtitle: {
      en: "Trimbakeshwar, and the spring the Godavari comes from",
      hi: "त्र्यंबकेश्वर, और वह स्रोत जहाँ से गोदावरी आती है",
      mr: "त्र्यंबकेश्वर, आणि गोदावरी जिथून येते तो झरा",
    },
    description: {
      en: "Thirty kilometres west of the city, a Jyotirlinga with three faces and a tank the size of a courtyard that is officially the beginning of a 1,400-kilometre river. Four stops. Some steps involved.",
      hi: "शहर से तीस किलोमीटर पश्चिम, तीन मुखों वाला एक ज्योतिर्लिंग और आँगन जितना एक कुंड जो आधिकारिक रूप से 1,400 किलोमीटर लंबी नदी का आरंभ है। चार पड़ाव। कुछ सीढ़ियाँ चढ़नी होंगी।",
      mr: "शहरापासून तीस किलोमीटर पश्चिमेला, तीन मुखांचे एक ज्योतिर्लिंग आणि अंगणाएवढा एक कुंड, जो अधिकृतपणे १,४०० किलोमीटर लांब नदीचा आरंभ आहे. चार थांबे. काही पायऱ्या चढाव्या लागतील.",
    },
    distanceKm: 2.6,
    totalMinutes: 55,
    stops: [
      {
        id: "kushavarta",
        name: { en: "Kushavarta Kund", hi: "कुशावर्त कुंड", mr: "कुशावर्त कुंड" },
        subtitle: {
          en: "The river's official first step",
          hi: "नदी का आधिकारिक पहला क़दम",
          mr: "नदीचे अधिकृत पहिले पाऊल",
        },
        lat: 19.9318,
        lng: 73.5312,
        radiusM: 70,
        walkMinutes: 0,
        durationSec: 145,
        lookFor: {
          en: "Look for the small stone spout on the north side. That trickle is the whole Godavari, at the start.",
          hi: "उत्तर की ओर छोटी पत्थर की धार देखिए। वही टपकती धारा आरंभ में पूरी गोदावरी है।",
          mr: "उत्तरेकडची लहान दगडी धार पाहा. तोच थेंबथेंब प्रवाह म्हणजे सुरुवातीची संपूर्ण गोदावरी.",
        },
        chapters: [
          {
            heading: {
              en: "A sage tied a river down with grass",
              hi: "एक ऋषि ने कुश से नदी बाँध ली",
              mr: "एका ऋषींनी दर्भाने नदी बांधली",
            },
            body: {
              en: "The story of this tank is oddly practical. The sage Gautama had brought the Ganga down to this hill through his penance, but the river kept slipping away and vanishing underground before anyone could use her. So he took kusha grass, the sharp blade used in ritual, and encircled the spot — kusha avarta, the enclosure of kusha, which is the name you are standing in. Held in place at last, the water settled into this tank, and from this tank the Godavari begins its recorded course.",
              hi: "इस कुंड की कथा विचित्र रूप से व्यावहारिक है। ऋषि गौतम अपनी तपस्या से गंगा को इस पर्वत तक ले आए थे, पर नदी बार-बार खिसक कर भूमि में लुप्त हो जाती, किसी के काम आने से पहले। तब उन्होंने कुश लिया — वही तीखा तृण जो कर्मकांड में प्रयुक्त होता है — और स्थान को घेर लिया। कुश आवर्त, कुश का घेरा, यही नाम है उस जगह का जहाँ आप खड़े हैं। अंततः बँधकर जल इसी कुंड में ठहरा, और इसी कुंड से गोदावरी की अभिलिखित यात्रा शुरू होती है।",
              mr: "या कुंडाची कथा विचित्रपणे व्यवहारी आहे. गौतम ऋषींनी आपल्या तपाने गंगेला या डोंगरापर्यंत आणले होते, पण नदी सारखी निसटून जमिनीत लुप्त होई, कोणाच्या उपयोगी पडण्याआधीच. मग त्यांनी दर्भ घेतला — विधींमध्ये वापरले जाणारे तेच धारदार गवत — आणि ती जागा वेढून टाकली. कुश आवर्त, दर्भाचा वेढा, हेच नाव आहे तुम्ही उभे असलेल्या जागेचे. अखेर बांधले गेल्यावर पाणी याच कुंडात स्थिरावले, आणि याच कुंडातून गोदावरीचा नोंदलेला प्रवास सुरू होतो.",
            },
          },
          {
            heading: {
              en: "The bath that comes before the darshan",
              hi: "दर्शन से पहले का स्नान",
              mr: "दर्शनाआधीचे स्नान",
            },
            body: {
              en: "Custom here is strict and simple: you bathe at Kushavarta first, then you go to the temple. Pilgrims performing Narayan Nagbali or Kaalsarp rites — Trimbakeshwar is one of the very few places in India authorised to perform them — begin at this tank too. During Simhastha, the Shaivite akhadas take their Shahi Snan here at Trimbak, not at Ram Kund in Nashik. The Vaishnav akhadas bathe at Ram Kund. Two royal baths, thirty kilometres apart, on the same sacred calendar. It has been divided that way for centuries to keep the peace, and it works.",
              hi: "यहाँ की परंपरा कठोर और सरल है: पहले कुशावर्त में स्नान, फिर मंदिर। नारायण नागबली या कालसर्प विधि करने आए यात्री — त्र्यंबकेश्वर भारत के उन गिने-चुने स्थानों में है जहाँ ये विधियाँ मान्य हैं — वे भी इसी कुंड से आरंभ करते हैं। सिंहस्थ में शैव अखाड़े अपना शाही स्नान यहीं त्र्यंबक में करते हैं, नाशिक के रामकुंड में नहीं। वैष्णव अखाड़े रामकुंड में स्नान करते हैं। एक ही पंचांग पर दो शाही स्नान, तीस किलोमीटर की दूरी पर। शांति बनाए रखने के लिए यह विभाजन सदियों से चला आ रहा है, और चलता है।",
              mr: "इथली प्रथा कडक आणि सोपी आहे: आधी कुशावर्तात स्नान, मग मंदिर. नारायण नागबली किंवा कालसर्प विधी करायला आलेले भाविक — त्र्यंबकेश्वर हे भारतातील अगदी मोजक्या अधिकृत ठिकाणांपैकी एक आहे — तेही याच कुंडापासून सुरुवात करतात. सिंहस्थात शैव आखाडे आपले शाही स्नान इथेच त्र्यंबकला करतात, नाशिकच्या रामकुंडावर नाही. वैष्णव आखाडे रामकुंडावर स्नान करतात. एकाच पंचांगावर दोन शाही स्नाने, तीस किलोमीटर अंतरावर. शांतता टिकावी म्हणून हे विभाजन शतकानुशतके चालत आले आहे, आणि ते चालते.",
            },
          },
        ],
      },
      {
        id: "trimbakeshwar",
        name: {
          en: "Trimbakeshwar Jyotirlinga",
          hi: "त्र्यंबकेश्वर ज्योतिर्लिंग",
          mr: "त्र्यंबकेश्वर ज्योतिर्लिंग",
        },
        subtitle: {
          en: "Three faces in one stone",
          hi: "एक ही पत्थर में तीन मुख",
          mr: "एकाच दगडात तीन मुखे",
        },
        lat: 19.9327,
        lng: 73.5306,
        radiusM: 80,
        walkMinutes: 5,
        durationSec: 155,
        lookFor: {
          en: "The linga sits in a hollow, below your eye level. You look down into it, not up at it — which is the opposite of almost every temple you have visited.",
          hi: "लिंग एक गड्ढे में है, आपकी दृष्टि से नीचे। आप उसे नीचे देखते हैं, ऊपर नहीं — जो आपके देखे लगभग हर मंदिर के उलट है।",
          mr: "लिंग एका खोलगट जागेत आहे, तुमच्या नजरेच्या खाली. तुम्ही त्याकडे खाली पाहता, वर नाही — जे तुम्ही पाहिलेल्या जवळपास प्रत्येक मंदिराच्या उलट आहे.",
        },
        chapters: [
          {
            heading: {
              en: "Not a pillar — three thumbs of stone",
              hi: "स्तंभ नहीं — तीन अंगूठे भर पत्थर",
              mr: "स्तंभ नाही — तीन अंगठ्यांएवढा दगड",
            },
            body: {
              en: "This is one of the twelve Jyotirlingas, the self-manifested lingas of Shiva, and it does not look like the others. Instead of a tall stone pillar there are three small faces in a depression, no bigger than thumbs, standing for Brahma, Vishnu and Shiva together — trimbak, three-eyed. They are worn down now by centuries of water and milk. Over them sits a silver mask, and on festival days a jewelled crown said to date to the Pandavas. The current temple was built by Peshwa Balaji Bajirao around 1755, in black basalt, and it took thirty-one years.",
              hi: "यह बारह ज्योतिर्लिंगों में से एक है, शिव के स्वयंभू लिंग, और यह औरों जैसा नहीं दिखता। ऊँचे पत्थर के स्तंभ के बजाय यहाँ एक गड्ढे में तीन छोटे मुख हैं, अंगूठों से बड़े नहीं, जो ब्रह्मा, विष्णु और महेश तीनों के प्रतीक हैं — त्र्यंबक, तीन नेत्रों वाला। सदियों के जल और दूध ने उन्हें घिस दिया है। उन पर एक चाँदी का मुखौटा रहता है, और पर्व के दिनों में एक रत्नजड़ित मुकुट जिसे पांडवकालीन कहा जाता है। वर्तमान मंदिर पेशवा बालाजी बाजीराव ने लगभग 1755 में काले पत्थर से बनवाया, और उसमें इकतीस वर्ष लगे।",
              mr: "हे बारा ज्योतिर्लिंगांपैकी एक आहे, शिवाची स्वयंभू लिंगे, आणि ते इतरांसारखे दिसत नाही. उंच दगडी स्तंभाऐवजी इथे एका खोलगट जागेत तीन लहान मुखे आहेत, अंगठ्यांहून मोठी नाहीत, जी ब्रह्मा, विष्णू आणि महेश या तिघांची प्रतीके आहेत — त्र्यंबक, तीन डोळ्यांचा. शतकानुशतकांच्या पाण्याने आणि दुधाने ती झिजली आहेत. त्यांच्यावर चांदीचा मुखवटा असतो, आणि सणाच्या दिवशी रत्नजडित मुकुट, जो पांडवकालीन मानला जातो. सध्याचे मंदिर पेशवा बाळाजी बाजीराव यांनी सुमारे १७५५ मध्ये काळ्या पाषाणात बांधले, आणि त्याला एकतीस वर्षे लागली.",
            },
          },
          {
            heading: {
              en: "What to do when you get inside",
              hi: "भीतर पहुँचकर क्या करें",
              mr: "आत पोहोचल्यावर काय करावे",
            },
            body: {
              en: "The queue can be long, and on Shahi Snan days it can be very long. There is no need to hurry the moment when it comes. Look down at the three faces, take the count of three breaths, and step aside for the person behind you. If you want the abhishek performed at the linga itself, that requires a separate arrangement at the temple office and traditionally a dhoti. And a small practical thing that will save you an argument: electronics and leather are not allowed inside, so leave your bag with someone or at the counter before you join the line.",
              hi: "पंक्ति लंबी हो सकती है, और शाही स्नान के दिनों में बहुत लंबी। जब क्षण आए तो उसे जल्दबाज़ी में मत बिताइए। तीन मुखों को नीचे देखिए, तीन साँस गिनिए, और पीछे वाले के लिए हट जाइए। यदि आप लिंग पर स्वयं अभिषेक चाहते हैं तो उसके लिए मंदिर कार्यालय में अलग व्यवस्था करनी होती है और परंपरा से धोती चाहिए। और एक छोटी व्यावहारिक बात जो बहस बचाएगी: भीतर इलेक्ट्रॉनिक वस्तुएँ और चमड़ा वर्जित है, इसलिए पंक्ति में लगने से पहले थैला किसी के पास या काउंटर पर रख दीजिए।",
              mr: "रांग लांब असू शकते, आणि शाही स्नानाच्या दिवशी खूपच लांब. क्षण आल्यावर तो घाईत घालवू नका. तीन मुखांकडे खाली पाहा, तीन श्वास मोजा, आणि मागच्या माणसासाठी बाजूला व्हा. लिंगावर स्वतः अभिषेक हवा असेल तर त्यासाठी मंदिर कार्यालयात वेगळी व्यवस्था करावी लागते आणि परंपरेने धोतर लागते. आणि एक लहानशी व्यवहारी गोष्ट जी वाद वाचवेल: आत इलेक्ट्रॉनिक वस्तू आणि कातडे चालत नाही, त्यामुळे रांगेत लागण्यापूर्वी पिशवी कोणाकडे तरी किंवा काउंटरवर ठेवा.",
            },
          },
        ],
      },
      {
        id: "gangadwar",
        name: { en: "Gangadwar", hi: "गंगाद्वार", mr: "गंगाद्वार" },
        subtitle: {
          en: "Five hundred steps to the doorway",
          hi: "द्वार तक पाँच सौ सीढ़ियाँ",
          mr: "दारापर्यंत पाचशे पायऱ्या",
        },
        lat: 19.926,
        lng: 73.524,
        radiusM: 90,
        walkMinutes: 22,
        durationSec: 130,
        lookFor: {
          en: "Turn around halfway up. The whole Trimbak valley opens behind you, and you can see how small the temple is against the hill.",
          hi: "आधे रास्ते पर मुड़कर देखिए। पूरी त्र्यंबक घाटी पीछे खुल जाती है, और पर्वत के सामने मंदिर कितना छोटा है, यह दिखता है।",
          mr: "अर्ध्या वाटेवर मागे वळून पाहा. संपूर्ण त्र्यंबक खोरे मागे उघडते, आणि डोंगरापुढे मंदिर किती लहान आहे ते दिसते.",
        },
        chapters: [
          {
            heading: {
              en: "Where the water actually comes out",
              hi: "जल वास्तव में कहाँ से निकलता है",
              mr: "पाणी प्रत्यक्षात कुठून बाहेर पडते",
            },
            body: {
              en: "Kushavarta is where the river is officially received. Gangadwar, about five hundred steps up Brahmagiri, is where it is actually born — a spring emerging from rock into a small kund, drop by drop, into the mouth of a stone cow. That is the beginning of a river that irrigates four states. The climb is stone, uneven, and unshaded in parts. Take water. If your knees say no, that is a completely reasonable answer, and the story does not change from the bottom.",
              hi: "कुशावर्त वह स्थान है जहाँ नदी का औपचारिक स्वागत होता है। गंगाद्वार, ब्रह्मगिरि पर लगभग पाँच सौ सीढ़ियाँ ऊपर, वह स्थान है जहाँ वह वास्तव में जन्मती है — चट्टान से निकलता एक स्रोत, बूँद-बूँद, पत्थर की गाय के मुख में गिरता एक छोटा कुंड। यही आरंभ है उस नदी का जो चार राज्यों को सींचती है। चढ़ाई पत्थर की है, असमान, और कहीं-कहीं छाया रहित। पानी साथ लीजिए। यदि आपके घुटने मना करें तो यह पूरी तरह उचित उत्तर है, और कथा नीचे से भी वही रहती है।",
              mr: "कुशावर्त ही नदीचे औपचारिक स्वागत होणारी जागा. गंगाद्वार, ब्रह्मगिरीवर सुमारे पाचशे पायऱ्या वर, ही ती प्रत्यक्ष जन्माची जागा — खडकातून बाहेर पडणारा एक झरा, थेंबाथेंबाने, दगडी गायीच्या मुखात पडणारा एक लहान कुंड. चार राज्यांना पाणी देणाऱ्या नदीची हीच सुरुवात. चढण दगडी आहे, खडबडीत, आणि काही ठिकाणी सावली नाही. पाणी सोबत घ्या. गुडघे नाही म्हणत असतील तर ते पूर्णपणे रास्त उत्तर आहे, आणि कथा खालूनही तीच राहते.",
            },
          },
        ],
      },
      {
        id: "brahmagiri",
        name: { en: "Brahmagiri Hill", hi: "ब्रह्मगिरि", mr: "ब्रह्मगिरी" },
        subtitle: {
          en: "The hill treated as the god",
          hi: "वह पर्वत जिसे देव माना जाता है",
          mr: "देव मानला जाणारा डोंगर",
        },
        lat: 19.9236,
        lng: 73.5217,
        radiusM: 150,
        walkMinutes: 28,
        durationSec: 120,
        lookFor: {
          en: "From the top, three streams leave in three directions. Only one of them is the Godavari.",
          hi: "शिखर से तीन धाराएँ तीन दिशाओं में जाती हैं। उनमें केवल एक गोदावरी है।",
          mr: "शिखरावरून तीन प्रवाह तीन दिशांना जातात. त्यातला फक्त एक गोदावरी आहे.",
        },
        chapters: [
          {
            heading: {
              en: "A mountain nobody is allowed to own",
              hi: "वह पर्वत जिस पर किसी का अधिकार नहीं",
              mr: "ज्यावर कोणाची मालकी नाही असा डोंगर",
            },
            body: {
              en: "Brahmagiri is not a hill with a temple on it. The hill itself is treated as a form of Shiva, which is why for a long time it was considered improper to climb it at all, and why the steps you see were built relatively recently after long argument. From the summit the water divides — the Godavari going east, the Vaitarna and Ahilya going their own ways. Stand up there for a minute and the whole logic of this trail closes: one spring, three rivers, and a city thirty kilometres downstream that has organised twelve centuries of its life around what happens to one of them.",
              hi: "ब्रह्मगिरि कोई पर्वत नहीं जिस पर मंदिर हो। पर्वत स्वयं शिव का रूप माना जाता है, इसीलिए लंबे समय तक उस पर चढ़ना ही अनुचित समझा गया, और इसीलिए जो सीढ़ियाँ आप देख रहे हैं वे लंबे विवाद के बाद अपेक्षाकृत हाल में बनीं। शिखर से जल बँट जाता है — गोदावरी पूर्व की ओर, वैतरणा और अहिल्या अपनी-अपनी दिशा में। वहाँ एक मिनट खड़े होइए और इस पूरी यात्रा का तर्क पूरा हो जाता है: एक स्रोत, तीन नदियाँ, और तीस किलोमीटर नीचे बसा एक नगर जिसने बारह शताब्दियों का जीवन उनमें से एक के गिर्द बाँधा है।",
              mr: "ब्रह्मगिरी हा मंदिर असलेला डोंगर नाही. डोंगर स्वतःच शिवाचे रूप मानला जातो, म्हणूनच बराच काळ त्यावर चढणेच अनुचित समजले जाई, आणि म्हणूनच तुम्हाला दिसणाऱ्या पायऱ्या दीर्घ वादानंतर तुलनेने अलीकडे बांधल्या गेल्या. शिखरावरून पाणी विभागते — गोदावरी पूर्वेकडे, वैतरणा आणि अहिल्या आपापल्या दिशेने. तिथे एक मिनिट उभे राहा आणि या संपूर्ण वाटेचा तर्क पूर्ण होतो: एक झरा, तीन नद्या, आणि तीस किलोमीटर खाली वसलेले एक शहर, ज्याने बारा शतकांचे आयुष्य त्यातल्या एकाभोवती बांधले आहे.",
            },
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     TRAIL 3 — The akhadas
     ───────────────────────────────────────────────────────── */
  {
    id: "akhada",
    accent: "indigo",
    name: {
      en: "The Akhada Trail",
      hi: "अखाड़ा पथ",
      mr: "आखाडा वाट",
    },
    subtitle: {
      en: "The tent city, the orders, and the men with ash on their skin",
      hi: "तंबुओं का नगर, अखाड़े, और भस्म लपेटे साधु",
      mr: "तंबूंचे शहर, आखाडे, आणि भस्म लावलेले साधू",
    },
    description: {
      en: "Three stops through Sadhugram, the temporary city that appears for the Kumbh and disappears after it. Best walked in the late afternoon. Ask before you photograph anyone.",
      hi: "साधुग्राम से होकर तीन पड़ाव — वह अस्थायी नगर जो कुंभ के लिए बनता है और उसके बाद मिट जाता है। देर दोपहर में चलना सबसे अच्छा। किसी की तस्वीर लेने से पहले पूछिए।",
      mr: "साधुग्राममधून तीन थांबे — कुंभासाठी उभे राहणारे आणि नंतर नाहीसे होणारे तात्पुरते शहर. उशिराच्या दुपारी चालणे उत्तम. कोणाचाही फोटो घेण्यापूर्वी विचारा.",
    },
    distanceKm: 2.2,
    totalMinutes: 45,
    stops: [
      {
        id: "sadhugram",
        name: { en: "Sadhugram", hi: "साधुग्राम", mr: "साधुग्राम" },
        subtitle: {
          en: "A city built to be taken down",
          hi: "उखाड़ने के लिए बसाया गया नगर",
          mr: "उखडण्यासाठी वसवलेले शहर",
        },
        lat: 20.0175,
        lng: 73.801,
        radiusM: 200,
        walkMinutes: 0,
        durationSec: 140,
        lookFor: {
          en: "Look at the ground, not the tents. Water lines, power poles, drains — all of it laid in a few weeks, for a population the size of a district.",
          hi: "तंबुओं को नहीं, ज़मीन को देखिए। पानी की लाइनें, बिजली के खंभे, नालियाँ — सब कुछ कुछ ही सप्ताहों में बिछाया गया, एक ज़िले जितनी आबादी के लिए।",
          mr: "तंबूंकडे नाही, जमिनीकडे पाहा. पाण्याच्या वाहिन्या, वीजखांब, नाले — हे सर्व काही आठवड्यांत टाकले, एका जिल्ह्याएवढ्या लोकसंख्येसाठी.",
        },
        chapters: [
          {
            heading: {
              en: "Infrastructure as devotion",
              hi: "अवसंरचना ही भक्ति",
              mr: "पायाभूत सुविधा हीच भक्ती",
            },
            body: {
              en: "What you are walking through is one of the largest temporary settlements human beings build anywhere. Roads are cut, water is piped, power is run, sanitation is laid, hospitals and fire posts are staffed — and then, weeks after the last bath, it is all lifted and the ground goes back to being a floodplain. Nashik does this every twelve years. Whatever you believe, notice the engineering. The faith is visible in the tents, but it is equally visible in the drains.",
              hi: "आप जिससे होकर चल रहे हैं वह मनुष्य द्वारा कहीं भी बनाई जाने वाली सबसे बड़ी अस्थायी बस्तियों में से एक है। सड़कें काटी जाती हैं, पानी की पाइप बिछती है, बिजली दौड़ती है, स्वच्छता की व्यवस्था होती है, अस्पताल और अग्निशमन चौकियाँ तैनात होती हैं — और फिर, अंतिम स्नान के कुछ सप्ताह बाद, सब उठा लिया जाता है और भूमि फिर नदी का पाट बन जाती है। नाशिक यह हर बारह वर्ष में करता है। आप जो भी मानते हों, इस अभियांत्रिकी को देखिए। श्रद्धा तंबुओं में दिखती है, पर उतनी ही नालियों में भी।",
              mr: "तुम्ही ज्यातून चालत आहात ती माणसाने कुठेही उभारलेल्या सर्वात मोठ्या तात्पुरत्या वस्त्यांपैकी एक आहे. रस्ते कापले जातात, पाण्याच्या वाहिन्या टाकल्या जातात, वीज पोहोचवली जाते, स्वच्छतेची व्यवस्था होते, रुग्णालये आणि अग्निशमन चौक्या उभ्या राहतात — आणि मग, शेवटच्या स्नानानंतर काही आठवड्यांत, सर्व उचलले जाते आणि जमीन पुन्हा नदीचे पात्र होते. नाशिक हे दर बारा वर्षांनी करते. तुमची श्रद्धा काहीही असो, ही अभियांत्रिकी पाहा. श्रद्धा तंबूंत दिसते, पण तितकीच नाल्यांतही.",
            },
          },
        ],
      },
      {
        id: "akhada-camps",
        name: {
          en: "The Akhada Camps",
          hi: "अखाड़ों के शिविर",
          mr: "आखाड्यांचे तळ",
        },
        subtitle: {
          en: "Thirteen orders, one order of precedence",
          hi: "तेरह अखाड़े, एक क्रम",
          mr: "तेरा आखाडे, एक क्रम",
        },
        lat: 20.02,
        lng: 73.797,
        radiusM: 150,
        walkMinutes: 12,
        durationSec: 160,
        lookFor: {
          en: "Each camp flies its own flag and keeps a fire that is never allowed to go out. Look for the dhuni — the ash pit at the centre.",
          hi: "हर शिविर अपना ध्वज फहराता है और एक अग्नि रखता है जो कभी बुझने नहीं दी जाती। धूनी खोजिए — बीच में राख का कुंड।",
          mr: "प्रत्येक तळ आपला ध्वज फडकवतो आणि एक अग्नी राखतो जो कधीच विझू दिला जात नाही. धुनी शोधा — मध्यभागी असलेला राखेचा खड्डा.",
        },
        chapters: [
          {
            heading: {
              en: "Monasteries that were once armies",
              hi: "वे मठ जो कभी सेनाएँ थे",
              mr: "एकेकाळी सैन्य असलेले मठ",
            },
            body: {
              en: "An akhada is a monastic order, and the word itself means a wrestling arena. That is not a metaphor. These orders were organised centuries ago partly as fighting bodies to defend temples and pilgrim routes, and the martial structure never fully left — the ranks, the discipline, the weapons carried in procession. There are thirteen recognised akhadas, divided between Shaiva, Vaishnava and Udasin traditions. The Juna Akhada is the largest. Precedence at the Shahi Snan is settled by an agreement between them, and it is taken extremely seriously.",
              hi: "अखाड़ा एक मठीय संप्रदाय है, और शब्द का अर्थ है कुश्ती का अखाड़ा। यह रूपक नहीं है। ये संप्रदाय सदियों पहले आंशिक रूप से लड़ाकू संगठनों के रूप में बने थे, मंदिरों और तीर्थमार्गों की रक्षा के लिए, और वह सैन्य ढाँचा कभी पूरी तरह गया नहीं — पद, अनुशासन, शोभायात्रा में उठाए जाने वाले शस्त्र। मान्यता प्राप्त तेरह अखाड़े हैं, शैव, वैष्णव और उदासीन परंपराओं में विभाजित। जूना अखाड़ा सबसे बड़ा है। शाही स्नान का क्रम उनके आपसी समझौते से तय होता है, और उसे अत्यंत गंभीरता से लिया जाता है।",
              mr: "आखाडा हा एक मठीय संप्रदाय आहे, आणि शब्दाचा अर्थ कुस्तीचा आखाडा असा आहे. हे रूपक नाही. हे संप्रदाय शतकांपूर्वी अंशतः लढाऊ संघटना म्हणून उभे राहिले, मंदिरे आणि तीर्थमार्गांच्या रक्षणासाठी, आणि ती लष्करी रचना कधीच पूर्णपणे गेली नाही — पदे, शिस्त, मिरवणुकीत उचलली जाणारी शस्त्रे. मान्यताप्राप्त तेरा आखाडे आहेत, शैव, वैष्णव आणि उदासीन परंपरांत विभागलेले. जुना आखाडा सर्वात मोठा. शाही स्नानाचा क्रम त्यांच्यातील परस्पर करारानुसार ठरतो, आणि तो अत्यंत गांभीर्याने घेतला जातो.",
            },
          },
        ],
      },
      {
        id: "naga-sadhus",
        name: { en: "The Naga Sadhus", hi: "नागा साधु", mr: "नागा साधू" },
        subtitle: {
          en: "Ash, silence, and a funeral you perform for yourself",
          hi: "भस्म, मौन, और अपना ही किया हुआ अंतिम संस्कार",
          mr: "भस्म, मौन, आणि स्वतःच केलेला स्वतःचा अंत्यविधी",
        },
        lat: 20.0142,
        lng: 73.8095,
        radiusM: 150,
        walkMinutes: 14,
        durationSec: 175,
        lookFor: {
          en: "The ash is vibhuti, from the dhuni fire. It is applied, not accumulated — and it is a garment, which is the point.",
          hi: "यह भस्म विभूति है, धूनी की अग्नि से। इसे लगाया जाता है, यह जमती नहीं — और यही उनका वस्त्र है, यही अर्थ है।",
          mr: "ही भस्म विभूती आहे, धुनीच्या अग्नीतून. ती लावली जाते, साचत नाही — आणि तेच त्यांचे वस्त्र आहे, हाच अर्थ.",
        },
        chapters: [
          {
            heading: {
              en: "They have already died once",
              hi: "वे एक बार मर चुके हैं",
              mr: "ते एकदा मरून चुकले आहेत",
            },
            body: {
              en: "Before a man is initiated as a Naga, he performs his own shraddha — his own funeral rites — and offers pind for himself. Legally and ritually, the person he was is finished: no family name, no property, no caste claim, no return. What stands in front of you afterwards is someone who has been declared dead by his own hand and lives on the far side of that. The ash he wears is from the dhuni fire, and it means the same thing the ash on a cremation ground means. This is not costume. It is the most literal statement of renunciation Hinduism has.",
              hi: "नागा दीक्षा से पहले साधक अपना ही श्राद्ध करता है — अपने ही अंतिम संस्कार की विधि — और स्वयं के लिए पिंडदान करता है। विधि और परंपरा दोनों से, जो व्यक्ति वह था वह समाप्त हो जाता है: न कुलनाम, न संपत्ति, न जाति का दावा, न वापसी। उसके बाद आपके सामने जो खड़ा है वह ऐसा व्यक्ति है जिसे उसके अपने ही हाथों मृत घोषित किया जा चुका है और जो उसके पार जीता है। जो भस्म वह लगाता है वह धूनी की है, और उसका अर्थ वही है जो श्मशान की राख का। यह वेशभूषा नहीं है। यह हिंदू परंपरा का सबसे शाब्दिक वैराग्य है।",
              mr: "नागा दीक्षेपूर्वी साधक स्वतःचेच श्राद्ध करतो — स्वतःचेच अंत्यविधी — आणि स्वतःसाठी पिंडदान करतो. विधीने आणि परंपरेने, जो माणूस तो होता तो संपतो: कुलनाव नाही, मालमत्ता नाही, जातीचा दावा नाही, परतीचा मार्ग नाही. त्यानंतर तुमच्यासमोर उभा असतो तो असा माणूस, ज्याला त्याच्याच हातांनी मृत घोषित केले गेले आहे आणि जो त्यापलीकडे जगतो. तो लावतो ती भस्म धुनीची आहे, आणि तिचा अर्थ स्मशानातील राखेचाच आहे. हा पेहराव नाही. हिंदू परंपरेतले सर्वात शब्दशः वैराग्य आहे.",
            },
          },
          {
            heading: {
              en: "How to be a decent guest",
              hi: "एक भला अतिथि कैसे बनें",
              mr: "चांगला पाहुणा कसे व्हावे",
            },
            body: {
              en: "Four things. Ask before photographing — many will say yes, and being asked is the whole difference. Do not offer money for a photograph; it turns a sadhu into an exhibit. Do not touch anyone's dhuni, tongs or trident, they are consecrated. And if you are offered prasad or tea, taking it is the polite answer. Most of the men here will talk to you kindly if you approach as a person rather than a camera. That is true of nearly everyone at this mela, and it is the best advice this whole walk can give you.",
              hi: "चार बातें। तस्वीर से पहले पूछिए — बहुत से हाँ कहेंगे, और पूछा जाना ही पूरा अंतर है। तस्वीर के बदले पैसे मत दीजिए; इससे साधु प्रदर्शन की वस्तु बन जाता है। किसी की धूनी, चिमटा या त्रिशूल मत छुइए, वे प्रतिष्ठित हैं। और यदि प्रसाद या चाय मिले तो ले लेना ही शिष्ट उत्तर है। यहाँ के अधिकांश साधु आपसे सहज बात करेंगे यदि आप कैमरे की तरह नहीं, व्यक्ति की तरह पास जाएँ। यह इस मेले में लगभग हर किसी के लिए सच है, और यही सबसे अच्छी सलाह है जो यह पूरी यात्रा आपको दे सकती है।",
              mr: "चार गोष्टी. फोटोआधी विचारा — बरेच जण हो म्हणतील, आणि विचारले जाणे हाच सगळा फरक आहे. फोटोसाठी पैसे देऊ नका; त्याने साधूचे प्रदर्शन होते. कोणाची धुनी, चिमटा किंवा त्रिशूळ स्पर्श करू नका, ती प्रतिष्ठित आहेत. आणि प्रसाद किंवा चहा दिला तर घेणे हेच सभ्य उत्तर. इथले बहुतेक साधू तुमच्याशी प्रेमाने बोलतील, जर तुम्ही कॅमेऱ्यासारखे नव्हे तर माणसासारखे जवळ गेलात. हे या मेळ्यातील जवळपास प्रत्येकाबाबत खरे आहे, आणि हाच सर्वोत्तम सल्ला ही संपूर्ण वाट तुम्हाला देऊ शकते.",
            },
          },
        ],
      },
    ],
  },
];

export const allStops: StoryStop[] = trails.flatMap((t) => t.stops);

export function findTrail(id: string): Trail | undefined {
  return trails.find((t) => t.id === id);
}

/** Full narration for one stop, joined into a single spoken block. */
export function stopNarration(stop: StoryStop, locale: Locale): string {
  return stop.chapters.map((c) => c.body[locale]).join("\n\n");
}

/**
 * URL of the recorded narration for a stop.
 *
 * Paths follow the convention produced by scripts/generate_voiceover.py, so new
 * stops get audio simply by re-running that script. An explicit `audio` entry on
 * the stop overrides the convention. The player falls back to device speech if
 * the file turns out to be missing, so a broken path degrades rather than fails.
 */
export function stopAudioUrl(trailId: string, stop: StoryStop, locale: Locale): string {
  return stop.audio?.[locale] ?? `/audio/yatra/${trailId}/${stop.id}.${locale}.mp3`;
}

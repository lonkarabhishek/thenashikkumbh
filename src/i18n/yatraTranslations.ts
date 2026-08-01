import { Locale } from "@/i18n/translations";

type L = Record<Locale, string>;

export const yatraUI: Record<string, L> = {
  eyebrow: { en: "Yatra", hi: "यात्रा", mr: "यात्रा" },

  title: {
    en: "Stories that walk with you",
    hi: "कहानियाँ जो आपके साथ चलती हैं",
    mr: "तुमच्यासोबत चालणाऱ्या गोष्टी",
  },
  lede: {
    en: "Put in your earphones and start walking. As you reach each place, its story begins — who stood here, what happened, and what to look at while you listen. No booking, no guide, no charge.",
    hi: "इयरफ़ोन लगाइए और चलना शुरू कीजिए। जैसे ही आप किसी स्थान पर पहुँचते हैं, उसकी कहानी शुरू हो जाती है — यहाँ कौन खड़ा था, क्या हुआ था, और सुनते हुए किस ओर देखना है। न बुकिंग, न गाइड, न शुल्क।",
    mr: "इअरफोन लावा आणि चालायला सुरुवात करा. तुम्ही एखाद्या ठिकाणी पोहोचताच त्याची गोष्ट सुरू होते — इथे कोण उभे होते, काय घडले, आणि ऐकताना कुठे पाहायचे. बुकिंग नाही, गाईड नाही, शुल्क नाही.",
  },

  /* How it works */
  how1Title: { en: "Pick a trail", hi: "एक पथ चुनिए", mr: "एक वाट निवडा" },
  how1Body: {
    en: "Three walks through Nashik and Trimbak. Each one is an hour or less, on foot, at your own pace.",
    hi: "नाशिक और त्र्यंबक में तीन यात्राएँ। हर एक एक घंटे या उससे कम, पैदल, अपनी गति से।",
    mr: "नाशिक आणि त्र्यंबकमधून तीन वाटा. प्रत्येक एक तास किंवा कमी, पायी, तुमच्या गतीने.",
  },
  how2Title: { en: "Turn on Flow", hi: "फ़्लो चालू कीजिए", mr: "फ्लो चालू करा" },
  how2Body: {
    en: "With location on, the story for a place starts by itself as you arrive. Keep the phone in your pocket.",
    hi: "स्थान चालू रखने पर, आप जैसे ही पहुँचते हैं उस स्थान की कहानी स्वयं शुरू हो जाती है। फ़ोन जेब में रहने दीजिए।",
    mr: "लोकेशन चालू असल्यास, तुम्ही पोहोचताच त्या ठिकाणाची गोष्ट आपोआप सुरू होते. फोन खिशातच राहू द्या.",
  },
  how3Title: { en: "Look up", hi: "ऊपर देखिए", mr: "वर पाहा" },
  how3Body: {
    en: "Every story tells you one thing to look for. That is the part you will remember in twelve years.",
    hi: "हर कहानी आपको एक चीज़ बताती है जिसे देखना है। बारह वर्ष बाद वही याद रहेगा।",
    mr: "प्रत्येक गोष्ट तुम्हाला एक गोष्ट सांगते जी पाहायची आहे. बारा वर्षांनी तेच लक्षात राहील.",
  },

  chooseTrail: { en: "Choose your walk", hi: "अपनी यात्रा चुनिए", mr: "तुमची वाट निवडा" },
  startWalk: { en: "Start this walk", hi: "यह यात्रा शुरू करें", mr: "ही वाट सुरू करा" },
  backToTrails: { en: "All walks", hi: "सभी यात्राएँ", mr: "सर्व वाटा" },

  /* Trail stats */
  stops: { en: "stops", hi: "पड़ाव", mr: "थांबे" },
  minutes: { en: "min", hi: "मिनट", mr: "मिनिटे" },
  km: { en: "km", hi: "किमी", mr: "किमी" },
  walkFromPrev: { en: "walk from previous stop", hi: "पिछले पड़ाव से पैदल", mr: "मागील थांब्यापासून पायी" },
  stopNumber: { en: "Stop", hi: "पड़ाव", mr: "थांबा" },

  /* Player */
  listen: { en: "Listen", hi: "सुनिए", mr: "ऐका" },
  play: { en: "Play story", hi: "कहानी सुनें", mr: "गोष्ट ऐका" },
  pause: { en: "Pause", hi: "रोकें", mr: "थांबवा" },
  resume: { en: "Resume", hi: "जारी रखें", mr: "पुढे चालू ठेवा" },
  stopPlayback: { en: "Stop", hi: "बंद करें", mr: "बंद करा" },
  replay: { en: "Play again", hi: "फिर सुनें", mr: "पुन्हा ऐका" },
  nowPlaying: { en: "Now playing", hi: "अभी चल रहा है", mr: "आता सुरू आहे" },
  speed: { en: "Speed", hi: "गति", mr: "गती" },
  readAlong: { en: "Read along", hi: "साथ पढ़ें", mr: "सोबत वाचा" },
  hideText: { en: "Hide text", hi: "पाठ छिपाएँ", mr: "मजकूर लपवा" },

  lookFor: { en: "While you listen", hi: "सुनते समय", mr: "ऐकताना" },

  /* Map */
  mapTitle: { en: "The route", hi: "मार्ग", mr: "मार्ग" },
  mapCaption: {
    en: "Distances and directions between stops are to scale. Streets are not shown — tap any stop below for turn-by-turn directions.",
    hi: "पड़ावों के बीच दूरी और दिशा वास्तविक अनुपात में हैं। सड़कें नहीं दिखाई गई हैं — रास्ते के लिए नीचे किसी भी पड़ाव पर टैप करें।",
    mr: "थांब्यांमधील अंतर आणि दिशा प्रमाणात आहेत. रस्ते दाखवलेले नाहीत — मार्गासाठी खालील कोणत्याही थांब्यावर टॅप करा.",
  },
  youAreHere: { en: "You", hi: "आप", mr: "तुम्ही" },

  /* Flow mode */
  flow: { en: "Flow", hi: "फ़्लो", mr: "फ्लो" },
  flowOn: { en: "Flow is on", hi: "फ़्लो चालू है", mr: "फ्लो चालू आहे" },
  flowOff: { en: "Turn on Flow", hi: "फ़्लो चालू करें", mr: "फ्लो चालू करा" },
  flowHelp: {
    en: "Stories start on their own when you reach a stop.",
    hi: "पड़ाव पर पहुँचते ही कहानी स्वयं शुरू हो जाएगी।",
    mr: "थांब्यावर पोहोचताच गोष्ट आपोआप सुरू होईल.",
  },
  flowLocating: { en: "Finding you…", hi: "आपको खोज रहे हैं…", mr: "तुम्हाला शोधत आहोत…" },
  flowDenied: {
    en: "Location is off, so Flow cannot start stories for you. You can still play any stop by hand.",
    hi: "स्थान बंद है, इसलिए फ़्लो अपने आप कहानी शुरू नहीं कर सकता। आप कोई भी पड़ाव स्वयं चला सकते हैं।",
    mr: "लोकेशन बंद आहे, त्यामुळे फ्लो आपोआप गोष्ट सुरू करू शकत नाही. तुम्ही कोणताही थांबा स्वतः लावू शकता.",
  },
  flowArrived: { en: "You have arrived at", hi: "आप पहुँच गए हैं", mr: "तुम्ही पोहोचला आहात" },
  flowAway: { en: "away", hi: "दूर", mr: "अंतरावर" },
  flowNearest: { en: "Nearest stop", hi: "निकटतम पड़ाव", mr: "जवळचा थांबा" },
  directions: { en: "Directions", hi: "रास्ता", mr: "रस्ता" },

  /* Voice */
  voiceNote: {
    en: "Recorded narration in Marathi, Hindi and English — about half a megabyte per story. If a recording will not play, your phone reads the text aloud instead.",
    hi: "मराठी, हिंदी और अंग्रेज़ी में रिकॉर्ड की गई आवाज़ — हर कहानी लगभग आधा एमबी। यदि रिकॉर्डिंग न चले तो आपका फ़ोन स्वयं पाठ पढ़कर सुनाएगा।",
    mr: "मराठी, हिंदी आणि इंग्रजीत रेकॉर्ड केलेले निवेदन — प्रत्येक गोष्ट सुमारे अर्धा एमबी. रेकॉर्डिंग चालले नाही, तर तुमचा फोन मजकूर वाचून दाखवेल.",
  },
  voiceMissing: {
    en: "Your device has no voice installed for this language yet, so narration may sound off. The full text is below.",
    hi: "आपके फ़ोन में इस भाषा की आवाज़ अभी नहीं है, इसलिए उच्चारण ठीक न लगे। पूरा पाठ नीचे है।",
    mr: "तुमच्या फोनमध्ये या भाषेचा आवाज अजून नाही, त्यामुळे उच्चार वेगळा वाटू शकतो. संपूर्ण मजकूर खाली आहे.",
  },
  unsupported: {
    en: "This browser cannot read stories aloud. You can read every word below instead.",
    hi: "यह ब्राउज़र कहानियाँ पढ़कर नहीं सुना सकता। आप नीचे सब कुछ पढ़ सकते हैं।",
    mr: "हा ब्राउझर गोष्टी वाचून दाखवू शकत नाही. तुम्ही खाली सर्व वाचू शकता.",
  },

  /* Home teaser */
  homeTeaser: {
    en: "Hear the story where it happened",
    hi: "कहानी वहीं सुनिए जहाँ वह घटी",
    mr: "गोष्ट तिथेच ऐका जिथे ती घडली",
  },
  homeTeaserBody: {
    en: "A free walking audio guide to Nashik's sacred quarter, in Marathi, Hindi and English. Twelve places, twelve stories, no guide needed.",
    hi: "नाशिक के पवित्र क्षेत्र की नि:शुल्क पैदल ऑडियो गाइड — मराठी, हिंदी और अंग्रेज़ी में। बारह स्थान, बारह कहानियाँ, किसी गाइड की ज़रूरत नहीं।",
    mr: "नाशिकच्या पवित्र भागाची मोफत पायी ऑडिओ गाईड — मराठी, हिंदी आणि इंग्रजीत. बारा ठिकाणे, बारा गोष्टी, गाईडची गरज नाही.",
  },
};

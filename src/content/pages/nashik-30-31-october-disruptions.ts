import type { InfoPageContent } from "@/content/pages/types";

/**
 * Locals' guide to the 30 and 31 October 2026 disruptions in Nashik and
 * Trimbakeshwar (Gram Pradakshina, Dhwajarohan, Maha Goda Aarti).
 *
 * Every figure, time and route below is taken from our own sourced news
 * posts, linked inline. Nothing here is from an order we have seen
 * ourselves, so almost everything is REPORTED. Remove or archive after
 * 1 November 2026.
 */

const ROAD = "/blog/nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route";
const TRAFFIC = "/blog/nashik-traffic-notice-30-31-october-godaghat-no-vehicle-zone-ramtirth-roads-shut-diversions-parking-iim-nagpur-crowd-plan";
const RAMKUND = "/blog/ramkund-no-general-entry-31-october-1-lakh-crowd-cctv-control-rooms-rehearsal-president-day-plan";
const DRONE = "/blog/no-drone-zone-nashik-city-and-rural-district-30-31-october-paragliders-hot-air-balloons-banned-flag-hoisting";
const PARKING = "/blog/dhwajarohan-30-31-october-parking-grounds-liquor-shops-shut-2-km-ramkund-city-buses";
const TEMPLE = "/blog/trimbakeshwar-temple-open-on-31-october-3000-passes-kushavarta-works-by-october-25";
const PRESIDENT = "/blog/president-12-minute-godavari-puja-kushavarta-2-pm-trimbakeshwar-plan-31-october-shankaracharya-flag";
const AARTI = "/blog/two-world-record-attempts-501-conch-shankhnaad-6500-maha-goda-aarti";
const KUSHAVARTA = "/blog/kushavarta-tirth-closed-for-renovation-october-2026";
const GRAM = "/blog/gram-pradakshina-30-october-route-tapovan-to-ramkund-nmc-encroachment-drive-october-24-29";
const TEMPLE_CLOSED = "/blog/trimbakeshwar-temple-kushavarta-closed-to-outside-devotees-noon-30-october-to-6-pm-31-october-collector-order-town-traffic";
const PRESIDENT_ROAD = "/blog/president-murmu-to-travel-by-road-not-helicopter-rain-forecast-71-schools-shut-31-october-godaghat-shops-closed-1317-vips";
const LIVE = "/dhwajarohan-2026/live";
const HUB = "/dhwajarohan-2026";

export const page: InfoPageContent = {
  path: "/nashik-30-31-october-disruptions",
  seoTitle: {
    en: "Nashik 30-31 Oct: Road Closures, Ramkund Entry, Drone Ban",
    hi: "नाशिक 30-31 अक्टूबर: रास्ते बंद, रामकुंड प्रवेश, ड्रोन रोक",
    mr: "नाशिक ३०-३१ ऑक्टो.: रस्ते बंद, रामकुंड प्रवेश, ड्रोन बंदी",
  },
  description: {
    en: "What is closed in Nashik and Trimbak on 30 and 31 Oct 2026: Trimbak road shut 8 AM to 8 PM, Godaghat no-vehicle zone, no public entry to Ramkund, drone ban, aarti time conflict.",
    hi: "30-31 अक्टूबर 2026 को नाशिक और त्र्यंबक में क्या बंद है: त्र्यंबक रोड सुबह 8 से रात 8 बंद, गोदाघाट नो-व्हीकल ज़ोन, रामकुंड में आम प्रवेश नहीं, ड्रोन पर रोक, आरती के समय पर मतभेद।",
    mr: "३०-३१ ऑक्टोबर २०२६ ला नाशिक व त्र्यंबकमध्ये काय बंद: त्र्यंबक रस्ता सकाळी ८ ते रात्री ८ बंद, गोदाघाट नो-व्हेईकल झोन, रामकुंडात सामान्यांना प्रवेश नाही, ड्रोन बंदी, आरतीच्या वेळेबाबत मतभेद.",
  },
  h1: {
    en: "Nashik and Trimbak on 30 and 31 October: what is closed, when, and what is still unclear",
    hi: "30 और 31 अक्टूबर को नाशिक और त्र्यंबक: क्या बंद है, कब, और क्या अभी साफ़ नहीं",
    mr: "३० आणि ३१ ऑक्टोबरला नाशिक व त्र्यंबक: काय बंद, कधी, आणि काय अजून अस्पष्ट",
  },
  intro: {
    en: `The usual Nashik to Trimbakeshwar road is closed from 8 AM on Friday 30 October to 8 PM on Saturday 31 October 2026, and in Nashik city the roads around Ramtirth and the Godaghat are shut to vehicles on both days, until midnight on 31 October. On 31 October the general public cannot enter Ramkund, Trimbakeshwar temple and Kushavarta are closed to outside devotees from noon on 30 October to 6 PM on 31 October, drones are banned over the city and the rural district, and newspapers still give different times for the evening Goda Aarti.

This page is for people who live and work in Nashik and Trimbak, not only for pilgrims: what is closed, when, and what is still unclear. Everything here comes from newspaper reports of the orders, not from the orders themselves, so it is marked REPORTED unless we say CONFIRMED. The Nashik Kumbh is posting [live updates for 30 and 31 October](${LIVE}) as news comes in.`,
    hi: `नाशिक से त्र्यंबकेश्वर जाने वाला सामान्य रास्ता शुक्रवार 30 अक्टूबर सुबह 8 बजे से शनिवार 31 अक्टूबर 2026 रात 8 बजे तक बंद है, और नाशिक शहर में रामतीर्थ और गोदाघाट के आसपास की सड़कें दोनों दिन वाहनों के लिए बंद हैं, 31 अक्टूबर को आधी रात तक। 31 अक्टूबर को आम लोग रामकुंड में नहीं जा सकेंगे, त्र्यंबकेश्वर मंदिर और कुशावर्त 30 अक्टूबर दोपहर 12 बजे से 31 अक्टूबर शाम 6 बजे तक बाहर के श्रद्धालुओं के लिए बंद हैं, शहर और ग्रामीण ज़िले में ड्रोन पर रोक है, और शाम की गोदा आरती का समय अख़बार अब भी अलग-अलग बता रहे हैं।

यह पेज नाशिक और त्र्यंबक में रहने और काम करने वालों के लिए है, सिर्फ़ श्रद्धालुओं के लिए नहीं: क्या बंद है, कब, और क्या अभी साफ़ नहीं है। यहाँ की हर बात आदेशों की अख़बारी रिपोर्टों से है, आदेशों से नहीं, इसलिए जहाँ "पुष्ट" न लिखा हो वहाँ इसे "रिपोर्ट" मानें। द नाशिक कुंभ 30 और 31 अक्टूबर के [लाइव अपडेट](${LIVE}) लगातार दे रहा है।`,
    mr: `नाशिकहून त्र्यंबकेश्वरला जाणारा नेहमीचा रस्ता शुक्रवार ३० ऑक्टोबर सकाळी ८ ते शनिवार ३१ ऑक्टोबर २०२६ रात्री ८ पर्यंत बंद आहे, आणि नाशिक शहरात रामतीर्थ व गोदाघाटाभोवतीचे रस्ते दोन्ही दिवस वाहनांसाठी बंद आहेत, ३१ ऑक्टोबरला मध्यरात्रीपर्यंत. ३१ ऑक्टोबरला सामान्य नागरिकांना रामकुंडात प्रवेश नाही, त्र्यंबकेश्वर मंदिर आणि कुशावर्त ३० ऑक्टोबर दुपारी १२ ते ३१ ऑक्टोबर सायंकाळी ६ पर्यंत बाहेरच्या भाविकांसाठी बंद आहेत, शहर व ग्रामीण जिल्ह्यात ड्रोनला बंदी आहे, आणि सायंकाळच्या गोदा आरतीची वेळ वृत्तपत्रे अजूनही वेगवेगळी सांगत आहेत.

हे पान नाशिक व त्र्यंबकमध्ये राहणाऱ्या आणि काम करणाऱ्यांसाठी आहे, फक्त भाविकांसाठी नाही: काय बंद आहे, कधी, आणि काय अजून अस्पष्ट आहे. इथली प्रत्येक माहिती आदेशांच्या वृत्तपत्रीय बातम्यांमधून घेतली आहे, प्रत्यक्ष आदेशांमधून नाही. त्यामुळे जिथे "अधिकृत" लिहिलेले नाही तिथे ती "वृत्त" समजा. द नाशिक कुंभ ३० व ३१ ऑक्टोबरचे [थेट अपडेट](${LIVE}) देत आहे.`,
  },
  sections: [
    {
      heading: {
        en: "Roads and detours",
        hi: "रास्ते और वैकल्पिक मार्ग",
        mr: "रस्ते आणि पर्यायी मार्ग",
      },
      body: {
        en: `**Nashik to Trimbakeshwar (REPORTED, Prahaar, Sakal, Times of India, 26 October):** Additional District Magistrate Rohitkumar Rajput's notification closes the usual road (Pimpalgaon Bahula, Sandip Foundation, Khambale, Pegalwadi Phata) from **8 AM on Friday 30 October to 8 PM on Saturday 31 October**, because the President and the Chief Minister are to visit Kushavarta.

- **Detour from Nashik:** Amrut Chowk, Bardan Phata, Govardhan, Girnare, Dhondegaon, Devargaon, Waghera Phata, Amboli Phata, Sapgaon, Trimbakeshwar. The Times of India puts this at about **61 km instead of the usual 30 km**, roughly twice as long. The notification summaries in Prahaar and Sakal give no distance.
- **Ghoti to Trimbakeshwar is also shut** (Times of India): vehicles go via Nashik, Govardhan and Girnare, about 104 km each way.
- **From the Mumbai side** (Vaitarna Phata, Pahine): come via Nashik, Amrut Garden, Bardan Phata, Govardhan, Girnare, Dhondegaon. Pahine to Trimbak goes via Bhilmal, Nirgudpada, Jambhulpada and Sapgaon.
- **Trimbak to Nashik, and Jawhar-Mokhada traffic:** Amboli T-point, Waghera Phata, Kone, Sapte, Devargaon, Girnare, Govardhan.
- Full route list, including the Pahine roads: [our 27 October report](${ROAD}).

**Trimbakeshwar town (REPORTED, Prahaar, 29 October):** a separate order dated 28 October by the same ADM keeps outside vehicles out of the town from **6 AM on 30 October to 8 PM on 31 October**. No entry from New Jawhar Phata or the Ring Road; vehicles without special permission go Old Jawhar Phata, Three Leaves Hotel, Kumbhartale parking, Nivruttinath temple, Ring Road. Residents going to Nashik should go via Sapgaon. Note the two start times: 6 AM for the town order, 8 AM for the Nashik to Trimbak road closure. [Details](${TEMPLE_CLOSED})

**The President may travel by road (REPORTED, not final):** Sakal and Sarkarnama (28 and 29 October) say security agencies have barred helicopter use because rain is forecast for 29 to 31 October, so she would go by car from the airport to Ramkund and on to Trimbakeshwar; Pudhari calls the road route a backup still being prepared. If it happens, expect longer convoy holds on the Ozar to Nashik route and on the Nashik to Trimbak road on 31 October. [Details](${PRESIDENT_ROAD})

**Nashik city (REPORTED, Sakal, 25 October; Times of India, 26 October):** Deputy Commissioner of Police (Traffic) Chandrakant Gawali's notice makes **Ramtirth and the whole Godaghat a no-vehicle zone on both days**.

- **Friday 30 October, from 6 AM until the Gram Pradakshina ends:** closed to all but the procession: Ashok Stambh to Ravivar Karanja, Red Cross signal to Dhumal Point, Malegaon Stand to Makhmalabad Naka, Dindori Naka to Malegaon Stand. The 6 AM start is for the restrictions, not the procession, which earlier reports put between 1 PM and 3 PM.
- **Saturday 31 October, 6 AM to midnight:** the main roads to Ramtirth are closed: Ashok Stambh, Ravivar Karanja, Malegaon Stand and Dindori Naka; Makhmalabad Naka to Malegaon Stand to Ramtirth; Kapaleshwar temple, Sardar Chowk, Gauri Patangan; Khandve hall, Malviya Chowk, Panchavati Karanja; Shani Chowk to Ramtirth; Ram Setu bridge; and, per the Times of India, Gadge Maharaj bridge and Gondhal Gate.
- **Diversions** run via Peth Naka, Makhmalabad Naka, Goda Park, Gangapur Naka, Meher signal, old Gangapur Naka, Phadol Chowk, Tarwala signal, Amrutdham Chowk and Mirchi Chowk. From Dwarka towards the Bali temple, use the flyover.
- **No parking:** Dindori Naka to Panchavati Karanja, Ravivar Karanja to Red Cross signal, Meher signal to Red Cross signal, Katya Maruti Chowk to Indai Lawns, Khadkali signal to Shalimar, Tractor House to Amardham Road, and every walking route for devotees.
- **Exempt:** police, ambulances, hearses and fire engines.
- **Parking, with walking routes to the ghat:** Chhatrapati Sambhaji Maharaj Garden, a spot in the Ashok Stambh to Ravivar Karanja area, Shivaji Maharaj Stadium, Rungtha School, B.D. Bhalekar ground, Shinde Mala (two approaches) and Gauri Patangan. Each spot's way in and walking route: [traffic notice story](${TRAFFIC}).

**Special city buses** to Ramkund on 31 October were reported by the Times of India on 23 October; routes and timings have not been published ([details](${PARKING})).`,
        hi: `**नाशिक से त्र्यंबकेश्वर (रिपोर्ट, प्रहार, सकाळ, टाइम्स ऑफ़ इंडिया, 26 अक्टूबर):** अपर ज़िला दंडाधिकारी रोहितकुमार राजपूत की अधिसूचना से सामान्य रास्ता (पिंपळगाव बहुला, संदीप फ़ाउंडेशन, खंबाळे, पेगलवाडी फाटा) **शुक्रवार 30 अक्टूबर सुबह 8 बजे से शनिवार 31 अक्टूबर रात 8 बजे तक** बंद है, क्योंकि राष्ट्रपति और मुख्यमंत्री कुशावर्त आने वाले हैं।

- **नाशिक से वैकल्पिक मार्ग:** अमृत चौक, बारदान फाटा, गोवर्धन, गिरणारे, धोंडेगाव, देवरगाव, वाघेरा फाटा, अंबोली फाटा, सापगाँव, त्र्यंबकेश्वर। टाइम्स ऑफ़ इंडिया के अनुसार यह सामान्य 30 किमी की जगह **करीब 61 किमी** है, यानी लगभग दोगुना। प्रहार और सकाळ के अधिसूचना-सारांश में दूरी नहीं दी गई है।
- **घोटी से त्र्यंबकेश्वर भी बंद** (टाइम्स ऑफ़ इंडिया): वाहन नाशिक, गोवर्धन और गिरणारे होकर जाएँ, एक तरफ़ करीब 104 किमी।
- **मुंबई की ओर से** (वैतरणा फाटा, पहिने): नाशिक, अमृत गार्डन, बारदान फाटा, गोवर्धन, गिरणारे, धोंडेगाव होकर आएँ। पहिने से त्र्यंबक भिलमाळ, निरगुडपाडा, जांभुळपाडा और सापगाँव होकर।
- **त्र्यंबक से नाशिक, और जव्हार-मोखाडा का ट्रैफ़िक:** अंबोली टी-पॉइंट, वाघेरा फाटा, कोणे, सापते, देवरगाव, गिरणारे, गोवर्धन।
- पहिने के रास्तों सहित पूरी सूची: [हमारी 27 अक्टूबर की रिपोर्ट](${ROAD})।

**त्र्यंबकेश्वर शहर (रिपोर्ट, प्रहार, 29 अक्टूबर):** उसी अपर ज़िला दंडाधिकारी के 28 अक्टूबर के एक अलग आदेश से बाहर के वाहन **30 अक्टूबर सुबह 6 बजे से 31 अक्टूबर रात 8 बजे तक** शहर में नहीं आ सकते। न्यू जव्हार फाटा या रिंग रोड से प्रवेश नहीं; विशेष अनुमति के बिना वाहन ओल्ड जव्हार फाटा, थ्री लीव्स होटल, कुंभारतळे पार्किंग, निवृत्तिनाथ मंदिर, रिंग रोड होकर। नाशिक जाने वाले निवासी सापगाँव होकर जाएँ। दो शुरुआती समय ध्यान रखें: शहर के आदेश के लिए सुबह 6 बजे, नाशिक-त्र्यंबक रोड बंदी के लिए सुबह 8 बजे। [विवरण](${TEMPLE_CLOSED})

**राष्ट्रपति सड़क मार्ग से जा सकती हैं (रिपोर्ट, अंतिम नहीं):** सकाळ और सरकारनामा (28 और 29 अक्टूबर) के अनुसार 29 से 31 अक्टूबर तक बारिश के पूर्वानुमान के कारण सुरक्षा एजेंसियों ने हेलीकॉप्टर पर रोक लगाई है, इसलिए वे एयरपोर्ट से रामकुंड और फिर त्र्यंबकेश्वर कार से जाएँगी; पुढारी इसे अभी तैयार हो रहा बैकअप रूट बताता है। ऐसा हुआ तो 31 अक्टूबर को ओझर-नाशिक रूट और नाशिक-त्र्यंबक रोड पर काफ़िले के लिए लंबी रुकावटें होंगी। [विवरण](${PRESIDENT_ROAD})

**नाशिक शहर (रिपोर्ट, सकाळ, 25 अक्टूबर; टाइम्स ऑफ़ इंडिया, 26 अक्टूबर):** पुलिस उपायुक्त (यातायात) चंद्रकांत गवळी की अधिसूचना से **रामतीर्थ और पूरा गोदाघाट दोनों दिन नो-व्हीकल ज़ोन** है।

- **शुक्रवार 30 अक्टूबर, सुबह 6 बजे से ग्राम प्रदक्षिणा ख़त्म होने तक:** शोभायात्रा के अलावा सबके लिए बंद: अशोक स्तंभ से रविवार कारंजा, रेड क्रॉस सिग्नल से धुमाळ पॉइंट, मालेगाव स्टैंड से मखमलाबाद नाका, दिंडोरी नाका से मालेगाव स्टैंड। सुबह 6 बजे का समय पाबंदियों का है, शोभायात्रा का नहीं; पहले की रिपोर्टों में शोभायात्रा दोपहर 1 से 3 बजे के बीच बताई गई थी।
- **शनिवार 31 अक्टूबर, सुबह 6 से आधी रात तक:** रामतीर्थ की मुख्य सड़कें बंद: अशोक स्तंभ, रविवार कारंजा, मालेगाव स्टैंड और दिंडोरी नाका; मखमलाबाद नाका से मालेगाव स्टैंड से रामतीर्थ; कपालेश्वर मंदिर, सरदार चौक, गौरी पटांगण; खांडवे हॉल, मालवीय चौक, पंचवटी कारंजा; शनि चौक से रामतीर्थ; राम सेतु पुल; और टाइम्स ऑफ़ इंडिया के अनुसार गाडगे महाराज पुल व गोंधळ गेट।
- **डायवर्शन** पेठ नाका, मखमलाबाद नाका, गोदा पार्क, गंगापुर नाका, मेहेर सिग्नल, पुराना गंगापुर नाका, फडोळ चौक, तरवाला सिग्नल, अमृतधाम चौक और मिर्ची चौक होकर। द्वारका से बळी मंदिर की ओर फ़्लाईओवर से जाएँ।
- **नो पार्किंग:** दिंडोरी नाका से पंचवटी कारंजा, रविवार कारंजा से रेड क्रॉस सिग्नल, मेहेर सिग्नल से रेड क्रॉस सिग्नल, काट्या मारुती चौक से इंदाई लॉन्स, खडकाळी सिग्नल से शालिमार, ट्रैक्टर हाउस से अमरधाम रोड, और श्रद्धालुओं का हर पैदल मार्ग।
- **छूट:** पुलिस, एम्बुलेंस, शव वाहन और दमकल।
- **पार्किंग, घाट तक पैदल रास्तों के साथ:** छत्रपति संभाजी महाराज उद्यान, अशोक स्तंभ-रविवार कारंजा इलाक़े में एक जगह, शिवाजी महाराज स्टेडियम, रुंगठा स्कूल, बी.डी. भालेकर मैदान, शिंदे मळा (दो रास्ते) और गौरी पटांगण। हर जगह का प्रवेश और पैदल मार्ग: [यातायात अधिसूचना की ख़बर](${TRAFFIC})।

**31 अक्टूबर को रामकुंड तक विशेष सिटी बसें** चलने की ख़बर टाइम्स ऑफ़ इंडिया ने 23 अक्टूबर को दी थी; रूट और समय प्रकाशित नहीं हुए हैं ([विवरण](${PARKING}))।`,
        mr: `**नाशिक ते त्र्यंबकेश्वर (वृत्त, प्रहार, सकाळ, टाइम्स ऑफ इंडिया, २६ ऑक्टोबर):** अपर जिल्हादंडाधिकारी रोहितकुमार राजपूत यांच्या अधिसूचनेने नेहमीचा रस्ता (पिंपळगाव बहुला, संदीप फाउंडेशन, खंबाळे, पेगलवाडी फाटा) **शुक्रवार ३० ऑक्टोबर सकाळी ८ ते शनिवार ३१ ऑक्टोबर रात्री ८ पर्यंत** बंद आहे, कारण राष्ट्रपती आणि मुख्यमंत्री कुशावर्ताला येणार आहेत.

- **नाशिकहून पर्यायी मार्ग:** अमृत चौक, बारदान फाटा, गोवर्धन, गिरणारे, धोंडेगाव, देवरगाव, वाघेरा फाटा, अंबोली फाटा, सापगाव, त्र्यंबकेश्वर. टाइम्स ऑफ इंडियानुसार हा मार्ग नेहमीच्या ३० किमीऐवजी **सुमारे ६१ किमी** आहे, म्हणजे जवळपास दुप्पट. प्रहार आणि सकाळच्या अधिसूचना-सारांशात अंतर दिलेले नाही.
- **घोटी ते त्र्यंबकेश्वर रस्ताही बंद** (टाइम्स ऑफ इंडिया): वाहने नाशिक, गोवर्धन, गिरणारेमार्गे, एका बाजूला सुमारे १०४ किमी.
- **मुंबईकडून** (वैतरणा फाटा, पहिने): नाशिक, अमृत गार्डन, बारदान फाटा, गोवर्धन, गिरणारे, धोंडेगावमार्गे या. पहिने ते त्र्यंबक भिलमाळ, निरगुडपाडा, जांभुळपाडा, सापगावमार्गे.
- **त्र्यंबक ते नाशिक, आणि जव्हार-मोखाड्याची वाहतूक:** अंबोली टी-पॉइंट, वाघेरा फाटा, कोणे, सापते, देवरगाव, गिरणारे, गोवर्धन.
- पहिनेच्या रस्त्यांसह संपूर्ण यादी: [आमची २७ ऑक्टोबरची बातमी](${ROAD}).

**त्र्यंबकेश्वर शहर (वृत्त, प्रहार, २९ ऑक्टोबर):** त्याच अपर जिल्हादंडाधिकाऱ्यांच्या २८ ऑक्टोबरच्या स्वतंत्र आदेशाने बाहेरची वाहने **३० ऑक्टोबर सकाळी ६ ते ३१ ऑक्टोबर रात्री ८ पर्यंत** शहरात येऊ शकत नाहीत. नवीन जव्हार फाटा किंवा रिंग रोडवरून प्रवेश नाही; विशेष परवानगी नसलेली वाहने जुना जव्हार फाटा, थ्री लीव्हज हॉटेल, कुंभारतळे पार्किंग, निवृत्तिनाथ मंदिर, रिंग रोडमार्गे. नाशिकला जाणाऱ्या रहिवाशांनी सापगावमार्गे जावे. दोन सुरुवातीच्या वेळा लक्षात ठेवा: शहराच्या आदेशासाठी सकाळी ६, नाशिक-त्र्यंबक रस्ता बंदीसाठी सकाळी ८. [तपशील](${TEMPLE_CLOSED})

**राष्ट्रपती रस्त्याने जाऊ शकतात (वृत्त, अंतिम नाही):** सकाळ आणि सरकारनामा (२८ व २९ ऑक्टोबर) यांच्यानुसार २९ ते ३१ ऑक्टोबर पावसाच्या अंदाजामुळे सुरक्षा यंत्रणांनी हेलिकॉप्टर वापरास मनाई केली आहे, त्यामुळे त्या विमानतळाहून रामकुंड आणि पुढे त्र्यंबकेश्वरला कारने जातील; पुढारी याला अजून तयार होत असलेला पर्यायी मार्ग म्हणतो. तसे झाले तर ३१ ऑक्टोबरला ओझर-नाशिक मार्गावर आणि नाशिक-त्र्यंबक रस्त्यावर ताफ्यासाठी जास्त वेळ रस्ते अडवले जातील. [तपशील](${PRESIDENT_ROAD})

**नाशिक शहर (वृत्त, सकाळ, २५ ऑक्टोबर; टाइम्स ऑफ इंडिया, २६ ऑक्टोबर):** पोलीस उपायुक्त (वाहतूक) चंद्रकांत गवळी यांच्या अधिसूचनेने **रामतीर्थ आणि संपूर्ण गोदाघाट दोन्ही दिवस नो-व्हेईकल झोन** आहे.

- **शुक्रवार ३० ऑक्टोबर, सकाळी ६ पासून ग्रामप्रदक्षिणा संपेपर्यंत:** मिरवणुकीशिवाय सर्वांना बंद: अशोक स्तंभ ते रविवार कारंजा, रेड क्रॉस सिग्नल ते धुमाळ पॉइंट, मालेगाव स्टँड ते मखमलाबाद नाका, दिंडोरी नाका ते मालेगाव स्टँड. सकाळी ६ ही वेळ निर्बंधांची आहे, मिरवणुकीची नाही; आधीच्या बातम्यांत मिरवणूक दुपारी १ ते ३ च्या दरम्यान सांगितली होती.
- **शनिवार ३१ ऑक्टोबर, सकाळी ६ ते मध्यरात्री:** रामतीर्थाकडे जाणारे मुख्य रस्ते बंद: अशोक स्तंभ, रविवार कारंजा, मालेगाव स्टँड आणि दिंडोरी नाका; मखमलाबाद नाका ते मालेगाव स्टँड ते रामतीर्थ; कपालेश्वर मंदिर, सरदार चौक, गौरी पटांगण; खांडवे हॉल, मालवीय चौक, पंचवटी कारंजा; शनी चौक ते रामतीर्थ; रामसेतू पूल; आणि टाइम्स ऑफ इंडियानुसार गाडगे महाराज पूल व गोंधळ गेट.
- **वळण मार्ग** पेठ नाका, मखमलाबाद नाका, गोदा पार्क, गंगापूर नाका, मेहेर सिग्नल, जुना गंगापूर नाका, फडोळ चौक, तरवाला सिग्नल, अमृतधाम चौक आणि मिरची चौकमार्गे. द्वारकाहून बळी मंदिराकडे उड्डाणपुलावरून जा.
- **नो पार्किंग:** दिंडोरी नाका ते पंचवटी कारंजा, रविवार कारंजा ते रेड क्रॉस सिग्नल, मेहेर सिग्नल ते रेड क्रॉस सिग्नल, काट्या मारुती चौक ते इंदाई लॉन्स, खडकाळी सिग्नल ते शालिमार, ट्रॅक्टर हाऊस ते अमरधाम रोड, आणि भाविकांचा प्रत्येक पायी मार्ग.
- **सूट:** पोलीस, रुग्णवाहिका, शववाहिका आणि अग्निशमन वाहने.
- **पार्किंग, घाटापर्यंतच्या पायी मार्गांसह:** छत्रपती संभाजी महाराज उद्यान, अशोक स्तंभ ते रविवार कारंजा परिसरातील एक जागा, शिवाजी महाराज स्टेडियम, रुंगठा शाळा, बी.डी. भालेकर मैदान, शिंदे मळा (दोन मार्ग) आणि गौरी पटांगण. प्रत्येक जागेचा प्रवेश व पायी मार्ग: [वाहतूक अधिसूचनेची बातमी](${TRAFFIC}).

**३१ ऑक्टोबरला रामकुंडापर्यंत विशेष शहर बस** सुरू होण्याचे वृत्त टाइम्स ऑफ इंडियाने २३ ऑक्टोबरला दिले होते; मार्ग आणि वेळा प्रसिद्ध झालेल्या नाहीत ([तपशील](${PARKING})).`,
      },
    },
    {
      heading: {
        en: "Ramkund, the ghats and Kushavarta: who can go where",
        hi: "रामकुंड, घाट और कुशावर्त: कौन कहाँ जा सकता है",
        mr: "रामकुंड, घाट आणि कुशावर्त: कोण कुठे जाऊ शकते",
      },
      body: {
        en: `**No direct public entry to Ramkund on 31 October (REPORTED, Navbharat, 28 October):** only VVIPs and special guests will enter the Ramkund area during the flag hoisting at 12:02 PM and the evening Goda Aarti. Navbharat counts about 6,500 aarti participants and their families and about 30,000 special invitees.

- **Crowd expected:** police expect **80,000 to 1 lakh** people at the Godavari, against a Godaghat capacity of about **30,000 to 35,000** (Navbharat).
- **Where the public sits:** citizen seating runs from **Devmamledar ground to Rokdoba ground**; VIP seating is on both sides of Ramtirth (Sakal, 27 October).
- **Watching the ghat:** **100 to 150 CCTV cameras** on the Godaghat and **two temporary control rooms**, at Leva Patidar Bhavan and the Sardar Chowk police post. About 700 traffic police from outside join about 190 from the city, close to 1,000 in all (Sakal, 26 and 27 October).
- **Barricades from Friday 30 October** on the roads leading to the Godaghat, DCP (Zone 1) Monika Raut told Sakal.
- **Rehearsal held on 27 October**, from the airport to Ramtirth and the aarti site. The draft order at Ramkund: about 10 minutes of yajna, about 5 minutes of Gautami Godavari puja, then the flag at 12:02 PM. **The programme still needs the President's office's approval**, and Rashtrapati Bhavan has not published her itinerary (Navbharat, 28 October). [Full story](${RAMKUND})

**Ramkund before the day (CONFIRMED, NMC Commissioner Manisha Khatri, Times of India, 13 October):** the stretch between Ahilyabai Holkar bridge and Talukteshwar temple is restricted while works finish. Dashkriya rituals continue at the designated spot.

**Schools and shops in Nashik (REPORTED, Times of India, ETV Bharat, 29 and 30 October):** the NMC has told **71 schools** in the Ramkund-Panchavati belt to stay shut on 31 October (Sakal's 28 October report of the first order listed 35), and all shops on the **Godaghat** are to stay closed on 30 and 31 October. ETV Bharat puts the invited VIPs at 1,317. [Details](${PRESIDENT_ROAD})

**Trimbakeshwar temple and Kushavarta: closed to outside devotees (REPORTED, citing a Collector's press release; PTI and Hindusthan Samachar, 29 October):** from **12 noon on Friday 30 October to 6 PM on Saturday 31 October**, or until the programme ends, only residents of Trimbakeshwar town and holders of an official darshan pass from the district administration or the temple trust are let in. This replaces the 21 October report that the temple would stay open on 31 October with 3,000 passes ([that earlier story](${TEMPLE})). How outside devotees can get a pass, and when normal darshan resumes, have not been announced. [Details](${TEMPLE_CLOSED})

**Kushavarta's renovation:** the kund has been closed to pilgrims since 30 September for renovation, and the renovated kund is to be inaugurated on 31 October. Collector Ayush Prasad said on record that the renovation closure runs from 30 September to 30 October (CONFIRMED, Times of India, 29 September), while Lokmat Times reported on 4 October that it "will reopen on October 31" (REPORTED). With the new order above, no bath by outside devotees is possible before 6 PM on 31 October, and nothing about a public bath after that has been announced. [Kushavarta closure story](${KUSHAVARTA})`,
        hi: `**31 अक्टूबर को रामकुंड में आम लोगों का सीधा प्रवेश नहीं (रिपोर्ट, नवभारत, 28 अक्टूबर):** दोपहर 12:02 बजे के ध्वजारोहण और शाम की गोदा आरती के दौरान रामकुंड परिसर में सिर्फ़ VVIP और विशेष अतिथि जाएँगे। नवभारत के अनुसार करीब 6,500 आरती प्रतिभागी और उनके परिवार तथा करीब 30,000 विशेष आमंत्रित होंगे।

- **अनुमानित भीड़:** पुलिस को गोदावरी तट पर **80,000 से 1 लाख** लोगों की उम्मीद है, जबकि गोदाघाट की क्षमता करीब **30,000 से 35,000** है (नवभारत)।
- **आम लोग कहाँ बैठेंगे:** नागरिकों की बैठक **देवमामलेदार मैदान से रोकडोबा मैदान तक**; VIP बैठक रामतीर्थ के दोनों ओर (सकाळ, 27 अक्टूबर)।
- **घाट पर नज़र:** गोदाघाट पर **100 से 150 CCTV कैमरे** और **दो अस्थायी कंट्रोल रूम**, लेवा पाटीदार भवन और सरदार चौक पुलिस चौकी पर। बाहर से करीब 700 ट्रैफ़िक पुलिस शहर के करीब 190 के साथ, कुल करीब 1,000 (सकाळ, 26 और 27 अक्टूबर)।
- **शुक्रवार 30 अक्टूबर से बैरिकेड** गोदाघाट की ओर जाने वाली सड़कों पर, DCP (ज़ोन 1) मोनिका राऊत ने सकाळ को बताया।
- **27 अक्टूबर को रिहर्सल हुई**, एयरपोर्ट से रामतीर्थ और आरती स्थल तक। रामकुंड पर प्रस्तावित क्रम: करीब 10 मिनट यज्ञ, करीब 5 मिनट गौतमी गोदावरी पूजा, फिर 12:02 बजे ध्वजारोहण। **कार्यक्रम को अभी राष्ट्रपति कार्यालय की मंज़ूरी बाकी है**, और राष्ट्रपति भवन ने उनका कार्यक्रम प्रकाशित नहीं किया है (नवभारत, 28 अक्टूबर)। [पूरी ख़बर](${RAMKUND})

**उस दिन से पहले रामकुंड (पुष्ट, मनपा आयुक्त मनीषा खत्री, टाइम्स ऑफ़ इंडिया, 13 अक्टूबर):** अहिल्याबाई होळकर पुल से तळुकटेश्वर मंदिर के बीच का हिस्सा काम पूरा होने तक प्रतिबंधित है। दशक्रिया विधि तय जगह पर जारी है।

**नाशिक में स्कूल और दुकानें (रिपोर्ट, टाइम्स ऑफ़ इंडिया, ETV भारत, 29 और 30 अक्टूबर):** मनपा ने रामकुंड-पंचवटी क्षेत्र के **71 स्कूलों** को 31 अक्टूबर को बंद रखने को कहा है (पहले आदेश पर सकाळ की 28 अक्टूबर की रिपोर्ट में 35 थे), और **गोदाघाट** की सभी दुकानें 30 और 31 अक्टूबर को बंद रहेंगी। ETV भारत के अनुसार 1,317 VIP आमंत्रित हैं। [विवरण](${PRESIDENT_ROAD})

**त्र्यंबकेश्वर मंदिर और कुशावर्त: बाहर के श्रद्धालुओं के लिए बंद (रिपोर्ट, कलेक्टर की प्रेस विज्ञप्ति के हवाले से; PTI और हिंदुस्थान समाचार, 29 अक्टूबर):** **शुक्रवार 30 अक्टूबर दोपहर 12 बजे से शनिवार 31 अक्टूबर शाम 6 बजे तक**, या कार्यक्रम ख़त्म होने तक, सिर्फ़ त्र्यंबकेश्वर शहर के निवासी और ज़िला प्रशासन या मंदिर ट्रस्ट के आधिकारिक दर्शन पासधारक ही अंदर जा सकेंगे। इससे 21 अक्टूबर की वह ख़बर बदल गई है कि मंदिर 31 अक्टूबर को 3,000 पासों के साथ खुला रहेगा ([वह पुरानी ख़बर](${TEMPLE}))। बाहर के श्रद्धालु पास कैसे लें और सामान्य दर्शन कब शुरू होंगे, यह घोषित नहीं हुआ। [विवरण](${TEMPLE_CLOSED})

**कुशावर्त का नवीनीकरण:** कुंड 30 सितंबर से नवीनीकरण के लिए श्रद्धालुओं के लिए बंद है, और नए रूप में कुंड का उद्घाटन 31 अक्टूबर को होना है। कलेक्टर आयुष प्रसाद ने आधिकारिक तौर पर कहा कि नवीनीकरण की बंदी 30 सितंबर से 30 अक्टूबर तक है (पुष्ट, टाइम्स ऑफ़ इंडिया, 29 सितंबर), जबकि लोकमत टाइम्स ने 4 अक्टूबर को लिखा कि यह "31 अक्टूबर को खुलेगा" (रिपोर्ट)। ऊपर के नए आदेश के साथ, 31 अक्टूबर शाम 6 बजे से पहले बाहर के श्रद्धालुओं का स्नान संभव नहीं है, और उसके बाद आम स्नान की कोई घोषणा नहीं हुई। [कुशावर्त बंदी की ख़बर](${KUSHAVARTA})`,
        mr: `**३१ ऑक्टोबरला रामकुंडात सामान्यांना थेट प्रवेश नाही (वृत्त, नवभारत, २८ ऑक्टोबर):** दुपारी १२.०२ च्या ध्वजारोहणाच्या आणि सायंकाळच्या गोदा आरतीच्या वेळी रामकुंड परिसरात फक्त अतिमहत्त्वाच्या व्यक्ती आणि विशेष निमंत्रित असतील. नवभारतनुसार सुमारे ६,५०० आरती सहभागी व त्यांचे कुटुंबीय आणि सुमारे ३०,००० विशेष निमंत्रित.

- **अपेक्षित गर्दी:** पोलिसांना गोदाकाठी **८०,००० ते १ लाख** लोकांचा अंदाज आहे, तर गोदाघाटाची क्षमता सुमारे **३०,००० ते ३५,०००** आहे (नवभारत).
- **नागरिक कुठे बसणार:** नागरिकांची आसनव्यवस्था **देवमामलेदार मैदान ते रोकडोबा मैदान**; व्हीआयपी आसने रामतीर्थाच्या दोन्ही बाजूंना (सकाळ, २७ ऑक्टोबर).
- **घाटावर नजर:** गोदाघाटावर **१०० ते १५० सीसीटीव्ही कॅमेरे** आणि **दोन तात्पुरते कंट्रोल रूम**, लेवा पाटीदार भवन व सरदार चौक पोलीस चौकी येथे. बाहेरून सुमारे ७०० वाहतूक पोलीस, शहराचे सुमारे १९०, मिळून जवळपास १,००० (सकाळ, २६ व २७ ऑक्टोबर).
- **शुक्रवार ३० ऑक्टोबरपासून बॅरिकेड्स** गोदाघाटाकडे जाणाऱ्या रस्त्यांवर, असे पोलीस उपायुक्त (परिमंडळ १) मोनिका राऊत यांनी सकाळला सांगितले.
- **२७ ऑक्टोबरला रंगीत तालीम झाली**, विमानतळापासून रामतीर्थ आणि आरती स्थळापर्यंत. रामकुंडावरील प्रस्तावित क्रम: सुमारे १० मिनिटे यज्ञ, सुमारे ५ मिनिटे गौतमी गोदावरी पूजन, मग १२.०२ ला ध्वजारोहण. **कार्यक्रमाला अजून राष्ट्रपती कार्यालयाची मंजुरी बाकी आहे**, आणि राष्ट्रपती भवनाने त्यांचा दौरा प्रसिद्ध केलेला नाही (नवभारत, २८ ऑक्टोबर). [संपूर्ण बातमी](${RAMKUND})

**त्या दिवसापूर्वीचे रामकुंड (अधिकृत, मनपा आयुक्त मनीषा खत्री, टाइम्स ऑफ इंडिया, १३ ऑक्टोबर):** अहिल्याबाई होळकर पूल ते तळुकटेश्वर मंदिर हा भाग कामे पूर्ण होईपर्यंत प्रतिबंधित आहे. दशक्रिया विधी ठरलेल्या जागी सुरू आहेत.

**नाशिकमधील शाळा आणि दुकाने (वृत्त, टाइम्स ऑफ इंडिया, ETV भारत, २९ व ३० ऑक्टोबर):** मनपाने रामकुंड-पंचवटी पट्ट्यातील **७१ शाळा** ३१ ऑक्टोबरला बंद ठेवण्यास सांगितले आहे (पहिल्या आदेशावरील सकाळच्या २८ ऑक्टोबरच्या वृत्तात ३५ होत्या), आणि **गोदाघाटावरील** सर्व दुकाने ३० व ३१ ऑक्टोबरला बंद राहतील. ETV भारतनुसार १,३१७ व्हीआयपींना निमंत्रण आहे. [तपशील](${PRESIDENT_ROAD})

**त्र्यंबकेश्वर मंदिर आणि कुशावर्त: बाहेरच्या भाविकांसाठी बंद (वृत्त, जिल्हाधिकाऱ्यांच्या प्रसिद्धिपत्रकाचा हवाला; PTI आणि हिंदुस्थान समाचार, २९ ऑक्टोबर):** **शुक्रवार ३० ऑक्टोबर दुपारी १२ ते शनिवार ३१ ऑक्टोबर सायंकाळी ६ पर्यंत**, किंवा कार्यक्रम संपेपर्यंत, फक्त त्र्यंबकेश्वर शहरातील रहिवासी आणि जिल्हा प्रशासन किंवा देवस्थान ट्रस्टच्या अधिकृत दर्शन पासधारकांनाच आत सोडले जाईल. यामुळे मंदिर ३१ ऑक्टोबरला ३,००० पासांसह खुले राहील हे २१ ऑक्टोबरचे वृत्त बदलले आहे ([ती आधीची बातमी](${TEMPLE})). बाहेरच्या भाविकांनी पास कसा घ्यावा आणि नेहमीचे दर्शन कधी सुरू होईल, हे जाहीर झालेले नाही. [तपशील](${TEMPLE_CLOSED})

**कुशावर्ताचे नूतनीकरण:** कुंड ३० सप्टेंबरपासून नूतनीकरणासाठी भाविकांना बंद आहे, आणि नव्या रूपातील कुंडाचे लोकार्पण ३१ ऑक्टोबरला होणार आहे. जिल्हाधिकारी आयुष प्रसाद यांनी नूतनीकरणाची बंदी ३० सप्टेंबर ते ३० ऑक्टोबर असल्याचे जाहीरपणे सांगितले (अधिकृत, टाइम्स ऑफ इंडिया, २९ सप्टेंबर), तर लोकमत टाइम्सने ४ ऑक्टोबरला ते "३१ ऑक्टोबरला खुले होईल" असे लिहिले (वृत्त). वरील नव्या आदेशामुळे ३१ ऑक्टोबर सायंकाळी ६ पूर्वी बाहेरच्या भाविकांचे स्नान शक्य नाही, आणि त्यानंतरच्या सार्वजनिक स्नानाबाबत काहीही जाहीर झालेले नाही. [कुशावर्त बंदीची बातमी](${KUSHAVARTA})`,
      },
    },
    {
      heading: {
        en: "Drones and airspace",
        hi: "ड्रोन और हवाई क्षेत्र",
        mr: "ड्रोन आणि हवाई क्षेत्र",
      },
      body: {
        en: `Two separate orders issued on 28 October ban drones (REPORTED, Prahaar and Vegvan Maharashtra, 28 October). We have not seen the order documents.

- **Nashik city:** Police Commissioner Sandeep Karnik has declared the whole Nashik Police Commissionerate area a no-drone-fly zone. Prahaar quotes the order as running from **12:01 AM on 29 October to midnight on 31 October**. It covers drones, drone photography and video, paragliders, paramotors, hot-air balloons, microlights and similar devices, unless the Police Commissioner has given prior permission. The order cites a possible drone threat at Ramkund, the Godaghat area and the Devmamledar temple.
- **Nashik rural district, which takes in Trimbakeshwar:** Additional District Magistrate Rohitkumar Rajput has made the rural police area a no-drone and no-paragliding zone on **30 and 31 October**, without prior permission from the competent authority.
- **Penalty:** action under the Bharatiya Nyaya Sanhita, 2023, the Aircraft Act, 1934 and other laws (city order, as quoted by Prahaar).

Photographers, YouTubers and wedding videographers: do not fly anywhere in the city or the district on these dates without written permission. [Drone ban story](${DRONE})`,
        hi: `28 अक्टूबर को जारी दो अलग-अलग आदेश ड्रोन पर रोक लगाते हैं (रिपोर्ट, प्रहार और वेगवान महाराष्ट्र, 28 अक्टूबर)। हमने आदेश की प्रति नहीं देखी है।

- **नाशिक शहर:** पुलिस आयुक्त संदीप कर्णिक ने पूरे नाशिक पुलिस आयुक्तालय क्षेत्र को नो-ड्रोन-फ्लाय ज़ोन घोषित किया है। प्रहार के अनुसार आदेश **29 अक्टूबर रात 12:01 बजे से 31 अक्टूबर आधी रात तक** लागू है। इसमें ड्रोन, ड्रोन से फ़ोटो-वीडियो, पैराग्लाइडर, पैरामोटर, हॉट-एयर बलून, माइक्रोलाइट और ऐसे उपकरण शामिल हैं, जब तक पुलिस आयुक्त की पूर्व अनुमति न हो। आदेश में रामकुंड, गोदाघाट परिसर और देवमामलेदार मंदिर पर ड्रोन ख़तरे का हवाला है।
- **नाशिक ग्रामीण ज़िला, जिसमें त्र्यंबकेश्वर आता है:** अपर ज़िला दंडाधिकारी रोहितकुमार राजपूत ने ग्रामीण पुलिस क्षेत्र को **30 और 31 अक्टूबर** को नो-ड्रोन और नो-पैराग्लाइडिंग ज़ोन बनाया है, सक्षम अधिकारी की पूर्व अनुमति के बिना उड़ान नहीं।
- **दंड:** भारतीय न्याय संहिता 2023, एयरक्राफ़्ट एक्ट 1934 और अन्य क़ानूनों के तहत कार्रवाई (शहर का आदेश, प्रहार के अनुसार)।

फ़ोटोग्राफ़र, यूट्यूबर और शादी के वीडियोग्राफ़र: इन तारीख़ों पर शहर या ज़िले में कहीं भी लिखित अनुमति के बिना उड़ान न भरें। [ड्रोन रोक की ख़बर](${DRONE})`,
        mr: `२८ ऑक्टोबरला काढलेले दोन स्वतंत्र आदेश ड्रोनला बंदी घालतात (वृत्त, प्रहार आणि वेगवान महाराष्ट्र, २८ ऑक्टोबर). आम्ही आदेशाची प्रत पाहिलेली नाही.

- **नाशिक शहर:** पोलीस आयुक्त संदीप कर्णिक यांनी संपूर्ण नाशिक पोलीस आयुक्तालय क्षेत्र नो-ड्रोन-फ्लाय झोन घोषित केले आहे. प्रहारनुसार आदेश **२९ ऑक्टोबर रात्री १२.०१ ते ३१ ऑक्टोबर मध्यरात्रीपर्यंत** लागू आहे. यात ड्रोन, ड्रोनने फोटो-व्हिडिओ, पॅराग्लायडर, पॅरामोटर, हॉट-एअर बलून, मायक्रोलाइट आणि तत्सम साधने येतात, पोलीस आयुक्तांची पूर्वपरवानगी असल्याशिवाय. आदेशात रामकुंड, गोदाघाट परिसर आणि देवमामलेदार मंदिर येथील संभाव्य ड्रोन धोक्याचा उल्लेख आहे.
- **नाशिक ग्रामीण जिल्हा, ज्यात त्र्यंबकेश्वर येते:** अपर जिल्हादंडाधिकारी रोहितकुमार राजपूत यांनी ग्रामीण पोलीस हद्द **३० आणि ३१ ऑक्टोबरला** नो-ड्रोन व नो-पॅराग्लायडिंग झोन केली आहे, सक्षम अधिकाऱ्याच्या पूर्वपरवानगीशिवाय उड्डाण नाही.
- **शिक्षा:** भारतीय न्याय संहिता २०२३, एअरक्राफ्ट अॅक्ट १९३४ आणि इतर कायद्यांनुसार कारवाई (शहराचा आदेश, प्रहारनुसार).

छायाचित्रकार, यूट्यूबर आणि लग्नाचे व्हिडिओग्राफर: या तारखांना शहरात किंवा जिल्ह्यात कुठेही लेखी परवानगीशिवाय उड्डाण करू नका. [ड्रोन बंदीची बातमी](${DRONE})`,
      },
    },
    {
      heading: {
        en: "Traffic and crowds near Godaghat, Ramkund and Trimbak",
        hi: "गोदाघाट, रामकुंड और त्र्यंबक के पास ट्रैफ़िक और भीड़",
        mr: "गोदाघाट, रामकुंड आणि त्र्यंबकजवळ वाहतूक आणि गर्दी",
      },
      body: {
        en: `**Friday 30 October: Gram Pradakshina.** About 1 lakh devotees were reported to be expected for the procession from Tapovan to Ramkund (REPORTED, Lokmat Times, 27 September). The route in the police notice, as the Times of India prints it, runs Tapovan ground, Aathvan Lawns, Tapovan crossing, Panchmukhi Hanuman temple, Katya Maruti Chowk, Devi Chowk, Ganeshwadi, Phul Bazaar, Gadge Maharaj bridge, Delhi Gate, Nehru Chowk, Dhumal Point, Main Road, Ravivar Karanja, Ahilyabai Holkar bridge, Malegaon Stand, Ramkund. Sakal's shorter summary stayed in Panchavati; treat the longer route as the working one and avoid Main Road and Panchavati that afternoon and evening. [Gram Pradakshina story](${GRAM})

**Saturday 31 October: the President's convoy.** The Times of India says it goes from **Ozar airport to Ramkund, then to Trimbakeshwar, back to Ramkund**, and then she flies to New Delhi (REPORTED, 26 October). Sakal's reported itinerary has her at Ozar about 9 AM, by road from the Maharashtra Police Academy to the Godaghat about 11 AM, by helicopter to Trimbakeshwar for darshan, and back to the Godaghat about 5 PM for the aarti. Convoys of the Governor, the Chief Minister, both Deputy Chief Ministers and ministers also move through the city, so expect short road holds beyond the published closures.

**Goda Aarti entry bans on 31 October (REPORTED, Times of India, 26 October):** Ekmukhi Datta Mandir, Gandhi Talav, Yashwant Patangan, Kapurthala Maidan, Rokdoba Maidan ghat, Gurancha Davakhana, Gharpure Ghat, Siddheshwar Mandir, Dhumal Point, Nehru Chowk and Main Road.

**The aarti time is not settled.** The police notice, as the Times of India reports it, gives **7 PM**. Prahaar's report of the 18 October press conference and Lokmat Times gave **6 PM**, eSakal gave **6:45 PM**, and Sakal's itinerary has the President reaching the ghat at about **5 PM**. We are not picking one. The entry bans start in the morning in any case. About 6,500 tribal participants are to perform the aarti (CONFIRMED as a plan, District Information Office, 18 October). [Aarti story](${AARTI})

**Trimbakeshwar:** Sarkarnama reported a 12-minute Godavari puja by the President at Kushavarta at about 2 PM, with the Shankaracharya hoisting the flag; Sakal (27 October) and Hindusthan Samachar (29 October) name the Chief Minister for the flag. The official programme should settle this. [Trimbak plan story](${PRESIDENT})

**Liquor shops** within 2 km of Ramtirth and across Trimbakeshwar municipal limits stay shut on both days, under a revised Collector's order of 22 October (REPORTED, Sakal). [Details](${PARKING})`,
        hi: `**शुक्रवार 30 अक्टूबर: ग्राम प्रदक्षिणा।** तपोवन से रामकुंड तक की शोभायात्रा में करीब 1 लाख श्रद्धालुओं के आने की ख़बर थी (रिपोर्ट, लोकमत टाइम्स, 27 सितंबर)। पुलिस अधिसूचना का रूट, जैसा टाइम्स ऑफ़ इंडिया छापता है: तपोवन मैदान, आठवण लॉन्स, तपोवन चौराहा, पंचमुखी हनुमान मंदिर, काट्या मारुती चौक, देवी चौक, गणेशवाडी, फूल बाज़ार, गाडगे महाराज पुल, दिल्ली गेट, नेहरू चौक, धुमाळ पॉइंट, मेन रोड, रविवार कारंजा, अहिल्याबाई होळकर पुल, मालेगाव स्टैंड, रामकुंड। सकाळ का छोटा सारांश पंचवटी तक ही था; लंबे रूट को ही मानें और उस दोपहर-शाम मेन रोड और पंचवटी से बचें। [ग्राम प्रदक्षिणा की ख़बर](${GRAM})

**शनिवार 31 अक्टूबर: राष्ट्रपति का काफ़िला।** टाइम्स ऑफ़ इंडिया के अनुसार यह **ओझर एयरपोर्ट से रामकुंड, फिर त्र्यंबकेश्वर, फिर वापस रामकुंड** जाएगा, और फिर वे नई दिल्ली लौटेंगी (रिपोर्ट, 26 अक्टूबर)। सकाळ के अनुसार वे करीब 9 बजे ओझर पहुँचेंगी, करीब 11 बजे महाराष्ट्र पुलिस अकादमी से सड़क मार्ग से गोदाघाट, हेलीकॉप्टर से त्र्यंबकेश्वर दर्शन, और करीब 5 बजे आरती के लिए फिर गोदाघाट। राज्यपाल, मुख्यमंत्री, दोनों उपमुख्यमंत्रियों और मंत्रियों के काफ़िले भी शहर से गुज़रेंगे, इसलिए घोषित बंदी के अलावा भी थोड़ी देर के लिए रास्ते रोके जा सकते हैं।

**31 अक्टूबर को गोदा आरती की प्रवेशबंदी (रिपोर्ट, टाइम्स ऑफ़ इंडिया, 26 अक्टूबर):** एकमुखी दत्त मंदिर, गांधी तालाब, यशवंत पटांगण, कपूरथळा मैदान, रोकडोबा मैदान घाट, गुरांचा दवाखाना, घारपुरे घाट, सिद्धेश्वर मंदिर, धुमाळ पॉइंट, नेहरू चौक और मेन रोड।

**आरती का समय तय नहीं।** पुलिस अधिसूचना में, टाइम्स ऑफ़ इंडिया के अनुसार, **शाम 7 बजे**। 18 अक्टूबर की प्रेस वार्ता पर प्रहार की रिपोर्ट और लोकमत टाइम्स ने **6 बजे**, ईसकाळ ने **6:45** और सकाळ के कार्यक्रम में राष्ट्रपति करीब **5 बजे** घाट पर। हम कोई एक समय नहीं चुन रहे। प्रवेशबंदी वैसे भी सुबह से शुरू हो जाती है। करीब 6,500 आदिवासी प्रतिभागी आरती करेंगे (योजना के रूप में पुष्ट, ज़िला सूचना कार्यालय, 18 अक्टूबर)। [आरती की ख़बर](${AARTI})

**त्र्यंबकेश्वर:** सरकारनामा ने करीब 2 बजे कुशावर्त पर राष्ट्रपति की 12 मिनट की गोदावरी पूजा और शंकराचार्य के हाथों ध्वजारोहण की ख़बर दी थी; सकाळ (27 अक्टूबर) और हिंदुस्थान समाचार (29 अक्टूबर) ध्वज के लिए मुख्यमंत्री का नाम लेते हैं। आधिकारिक कार्यक्रम से यह तय होगा। [त्र्यंबक योजना की ख़बर](${PRESIDENT})

**शराब की दुकानें** रामतीर्थ के 2 किमी दायरे में और पूरी त्र्यंबकेश्वर नगरपालिका सीमा में दोनों दिन बंद, कलेक्टर के 22 अक्टूबर के संशोधित आदेश से (रिपोर्ट, सकाळ)। [विवरण](${PARKING})`,
        mr: `**शुक्रवार ३० ऑक्टोबर: ग्रामप्रदक्षिणा.** तपोवन ते रामकुंड या मिरवणुकीला सुमारे १ लाख भाविक अपेक्षित असल्याचे वृत्त होते (वृत्त, लोकमत टाइम्स, २७ सप्टेंबर). पोलीस अधिसूचनेतील मार्ग, टाइम्स ऑफ इंडियाने छापल्याप्रमाणे: तपोवन मैदान, आठवण लॉन्स, तपोवन चौक, पंचमुखी हनुमान मंदिर, काट्या मारुती चौक, देवी चौक, गणेशवाडी, फुलबाजार, गाडगे महाराज पूल, दिल्ली दरवाजा, नेहरू चौक, धुमाळ पॉइंट, मेनरोड, रविवार कारंजा, अहिल्याबाई होळकर पूल, मालेगाव स्टँड, रामकुंड. सकाळचा छोटा सारांश पंचवटीपुरताच होता; लांबचा मार्गच गृहीत धरा आणि त्या दुपारी-सायंकाळी मेनरोड व पंचवटी टाळा. [ग्रामप्रदक्षिणेची बातमी](${GRAM})

**शनिवार ३१ ऑक्टोबर: राष्ट्रपतींचा ताफा.** टाइम्स ऑफ इंडियानुसार तो **ओझर विमानतळ ते रामकुंड, मग त्र्यंबकेश्वर, पुन्हा रामकुंड** असा जाईल, आणि मग त्या नवी दिल्लीला परततील (वृत्त, २६ ऑक्टोबर). सकाळच्या वृत्तातील कार्यक्रमानुसार त्या सुमारे ९ वाजता ओझरला, सुमारे ११ वाजता महाराष्ट्र पोलीस अकादमीहून रस्त्याने गोदाघाटावर, हेलिकॉप्टरने त्र्यंबकेश्वर दर्शनाला, आणि सुमारे ५ वाजता आरतीसाठी पुन्हा गोदाघाटावर. राज्यपाल, मुख्यमंत्री, दोन्ही उपमुख्यमंत्री आणि मंत्र्यांचे ताफेही शहरातून जातील, त्यामुळे जाहीर बंदीशिवायही थोड्या वेळासाठी रस्ते अडवले जाऊ शकतात.

**३१ ऑक्टोबरला गोदा आरतीसाठी प्रवेशबंदी (वृत्त, टाइम्स ऑफ इंडिया, २६ ऑक्टोबर):** एकमुखी दत्त मंदिर, गांधी तलाव, यशवंत पटांगण, कपूरथळा मैदान, रोकडोबा मैदान घाट, गुरांचा दवाखाना, घारपुरे घाट, सिद्धेश्वर मंदिर, धुमाळ पॉइंट, नेहरू चौक आणि मेनरोड.

**आरतीची वेळ ठरलेली नाही.** पोलीस अधिसूचनेत, टाइम्स ऑफ इंडियानुसार, **सायंकाळी ७**. १८ ऑक्टोबरच्या पत्रकार परिषदेवरील प्रहारचे वृत्त आणि लोकमत टाइम्सने **६ वाजता**, ईसकाळने **पावणेसात**, आणि सकाळच्या कार्यक्रमात राष्ट्रपती सुमारे **५ वाजता** घाटावर. आम्ही यातली एक वेळ निवडत नाही. प्रवेशबंदी कशीही सकाळपासूनच सुरू होते. सुमारे ६,५०० आदिवासी सहभागी आरती करणार (योजना म्हणून अधिकृत, जिल्हा माहिती कार्यालय, १८ ऑक्टोबर). [आरतीची बातमी](${AARTI})

**त्र्यंबकेश्वर:** सरकारनामाने सुमारे २ वाजता कुशावर्तावर राष्ट्रपतींची १२ मिनिटांची गोदावरी पूजा आणि शंकराचार्यांच्या हस्ते ध्वजारोहण असे वृत्त दिले होते; सकाळ (२७ ऑक्टोबर) आणि हिंदुस्थान समाचार (२९ ऑक्टोबर) ध्वजासाठी मुख्यमंत्र्यांचे नाव घेतात. अधिकृत कार्यक्रमातून हे ठरेल. [त्र्यंबक योजनेची बातमी](${PRESIDENT})

**मद्यविक्री** रामतीर्थाच्या २ किमी परिसरात आणि संपूर्ण त्र्यंबकेश्वर नगरपालिका हद्दीत दोन्ही दिवस बंद, जिल्हाधिकाऱ्यांच्या २२ ऑक्टोबरच्या सुधारित आदेशाने (वृत्त, सकाळ). [तपशील](${PARKING})`,
      },
    },
    {
      heading: {
        en: "What is still uncertain",
        hi: "क्या अभी साफ़ नहीं है",
        mr: "काय अजून अस्पष्ट आहे",
      },
      body: {
        en: `- **The aarti time:** 5 PM, 6 PM, 6:45 PM and 7 PM have all been reported. No official printed programme has been published.
- **The final programme:** it still needs the President's office's approval, and Rashtrapati Bhavan has not published her itinerary (Navbharat, 28 October). Timings at Ramkund and Kushavarta can still change.
- **The detour distance:** only the Times of India gives 61 km; Prahaar and Sakal give none.
- **The drone order's exact window:** Prahaar quotes 12:01 AM on 29 October to midnight on 31 October for the city; we have not seen the order.
- **Kushavarta's reopening:** 30 October per the Collector's statement, 31 October per Lokmat Times, and no word on a public bath; the new order keeps outside devotees out until 6 PM on 31 October in any case.
- **Road or helicopter for the President:** Sakal and Sarkarnama report the helicopter ban as decided; Pudhari and Maharashtra Mirror call the road route a likely change.
- **How many schools shut:** 35 in Sakal's report of the first order, 71 in later reports.
- **How many people at Ramkund:** Lokshahi (29 October) expects 15,000 to 20,000; the police estimate reported on 28 October was 80,000 to 1 lakh.
- **Darshan passes for Trimbak:** no process for outside devotees has been announced.
- **The 30 October procession route:** two versions were printed; we treat the longer Times of India list as the working route.
- **Special city buses:** reported, but no routes or timings.
- **Who hoists the flag at Trimbakeshwar:** Shankaracharya (Sarkarnama) or the Chief Minister (Sakal).

When any of these is settled we will post it on the [live page](${LIVE}) first and update this guide.`,
        hi: `- **आरती का समय:** 5, 6, 6:45 और 7 बजे, चारों की ख़बरें हैं। कोई आधिकारिक छपा कार्यक्रम प्रकाशित नहीं हुआ।
- **अंतिम कार्यक्रम:** राष्ट्रपति कार्यालय की मंज़ूरी बाकी है, और राष्ट्रपति भवन ने उनका कार्यक्रम प्रकाशित नहीं किया (नवभारत, 28 अक्टूबर)। रामकुंड और कुशावर्त के समय अभी बदल सकते हैं।
- **वैकल्पिक मार्ग की दूरी:** सिर्फ़ टाइम्स ऑफ़ इंडिया 61 किमी बताता है; प्रहार और सकाळ कोई दूरी नहीं देते।
- **ड्रोन आदेश की सही अवधि:** शहर के लिए प्रहार 29 अक्टूबर रात 12:01 से 31 अक्टूबर आधी रात बताता है; हमने आदेश नहीं देखा।
- **कुशावर्त का दोबारा खुलना:** कलेक्टर के बयान के अनुसार 30 अक्टूबर, लोकमत टाइम्स के अनुसार 31 अक्टूबर, और आम स्नान पर कोई बात नहीं; नया आदेश वैसे भी बाहर के श्रद्धालुओं को 31 अक्टूबर शाम 6 बजे तक बाहर रखता है।
- **राष्ट्रपति सड़क से या हेलीकॉप्टर से:** सकाळ और सरकारनामा हेलीकॉप्टर पर रोक को तय बताते हैं; पुढारी और महाराष्ट्र मिरर सड़क मार्ग को संभावित बदलाव कहते हैं।
- **कितने स्कूल बंद:** पहले आदेश पर सकाळ की रिपोर्ट में 35, बाद की रिपोर्टों में 71।
- **रामकुंड पर कितने लोग:** लोकशाही (29 अक्टूबर) 15,000 से 20,000 की उम्मीद करता है; 28 अक्टूबर को रिपोर्ट किया गया पुलिस अनुमान 80,000 से 1 लाख था।
- **त्र्यंबक के दर्शन पास:** बाहर के श्रद्धालुओं के लिए कोई प्रक्रिया घोषित नहीं हुई।
- **30 अक्टूबर की शोभायात्रा का रूट:** दो संस्करण छपे; हम टाइम्स ऑफ़ इंडिया की लंबी सूची को मानते हैं।
- **विशेष सिटी बसें:** ख़बर है, पर रूट या समय नहीं।
- **त्र्यंबकेश्वर में ध्वज कौन फहराएगा:** शंकराचार्य (सरकारनामा) या मुख्यमंत्री (सकाळ)।

इनमें से कुछ भी तय होते ही हम उसे पहले [लाइव पेज](${LIVE}) पर देंगे और इस गाइड को अपडेट करेंगे।`,
        mr: `- **आरतीची वेळ:** ५, ६, पावणेसात आणि ७, चारही वेळा वृत्तांत आल्या आहेत. अधिकृत छापील कार्यक्रम प्रसिद्ध झालेला नाही.
- **अंतिम कार्यक्रम:** राष्ट्रपती कार्यालयाची मंजुरी बाकी आहे, आणि राष्ट्रपती भवनाने दौरा प्रसिद्ध केलेला नाही (नवभारत, २८ ऑक्टोबर). रामकुंड आणि कुशावर्ताच्या वेळा अजून बदलू शकतात.
- **पर्यायी मार्गाचे अंतर:** फक्त टाइम्स ऑफ इंडिया ६१ किमी सांगतो; प्रहार आणि सकाळ अंतर देत नाहीत.
- **ड्रोन आदेशाचा नेमका कालावधी:** शहरासाठी प्रहार २९ ऑक्टोबर रात्री १२.०१ ते ३१ ऑक्टोबर मध्यरात्र सांगतो; आम्ही आदेश पाहिलेला नाही.
- **कुशावर्त पुन्हा खुले होणे:** जिल्हाधिकाऱ्यांच्या विधानानुसार ३० ऑक्टोबर, लोकमत टाइम्सनुसार ३१ ऑक्टोबर, आणि सार्वजनिक स्नानाबाबत काहीच नाही; नवा आदेश कसाही बाहेरच्या भाविकांना ३१ ऑक्टोबर सायंकाळी ६ पर्यंत बाहेर ठेवतो.
- **राष्ट्रपती रस्त्याने की हेलिकॉप्टरने:** सकाळ आणि सरकारनामा हेलिकॉप्टर बंदी ठरल्याचे सांगतात; पुढारी आणि महाराष्ट्र मिरर रस्ता मार्गाला संभाव्य बदल म्हणतात.
- **किती शाळा बंद:** पहिल्या आदेशावरील सकाळच्या वृत्तात ३५, नंतरच्या वृत्तांत ७१.
- **रामकुंडावर किती लोक:** लोकशाही (२९ ऑक्टोबर) १५,००० ते २०,००० अपेक्षित म्हणतो; २८ ऑक्टोबरला आलेला पोलिसांचा अंदाज ८०,००० ते १ लाख होता.
- **त्र्यंबकचे दर्शन पास:** बाहेरच्या भाविकांसाठी कोणतीही प्रक्रिया जाहीर झालेली नाही.
- **३० ऑक्टोबरच्या मिरवणुकीचा मार्ग:** दोन आवृत्त्या छापल्या गेल्या; आम्ही टाइम्स ऑफ इंडियाची लांब यादी गृहीत धरतो.
- **विशेष शहर बस:** वृत्त आहे, पण मार्ग किंवा वेळा नाहीत.
- **त्र्यंबकेश्वरला ध्वज कोण फडकवणार:** शंकराचार्य (सरकारनामा) की मुख्यमंत्री (सकाळ).

यातले काहीही ठरले की आम्ही ते आधी [थेट अपडेट पानावर](${LIVE}) देऊ आणि हा मार्गदर्शक अद्ययावत करू.`,
      },
    },
    {
      heading: {
        en: "Related news and live updates",
        hi: "संबंधित ख़बरें और लाइव अपडेट",
        mr: "संबंधित बातम्या आणि थेट अपडेट",
      },
      body: {
        en: `- [Live updates for 30 and 31 October](${LIVE}): newest first, each marked confirmed or reported.
- [Dhwajarohan 2026 hub](${HUB}): the full programme, who is expected, how to watch.
- [Nashik to Trimbakeshwar road closed, Girnare detour, entry bans, President's route](${ROAD}) (27 October)
- [Police traffic notice: Godaghat no-vehicle zone, closures, diversions, parking](${TRAFFIC}) (26 October)
- [No public entry to Ramkund, crowd estimate, CCTV, control rooms, rehearsal](${RAMKUND}) (28 October)
- [Drone, paraglider and balloon ban over the city and the district](${DRONE}) (29 October)
- [Parking grounds, liquor shops shut, city buses](${PARKING}) (24 October)
- [Gram Pradakshina route on 30 October](${GRAM}) (23 October)
- [Trimbakeshwar temple and Kushavarta closed to outside devotees, town traffic order](${TEMPLE_CLOSED}) (30 October)
- [President to travel by road, 71 schools shut, Godaghat shops closed](${PRESIDENT_ROAD}) (30 October)
- [Kushavarta closed for renovation](${KUSHAVARTA})
- [Trimbakeshwar Kumbh 2027 guide](/trimbakeshwar-kumbh-2027) and [how to reach Nashik](/how-to-reach)
- Emergency numbers: 112 for any emergency, 108 for an ambulance. See the [emergency page](/emergency).`,
        hi: `- [30 और 31 अक्टूबर के लाइव अपडेट](${LIVE}): सबसे नया पहले, हर अपडेट पर पुष्ट या रिपोर्ट का निशान।
- [ध्वजारोहण 2026 हब](${HUB}): पूरा कार्यक्रम, कौन आ रहा है, कैसे देखें।
- [नाशिक-त्र्यंबकेश्वर रोड बंद, गिरणारे वाला रास्ता, प्रवेशबंदी, राष्ट्रपति का मार्ग](${ROAD}) (27 अक्टूबर)
- [पुलिस यातायात अधिसूचना: गोदाघाट नो-व्हीकल ज़ोन, बंदी, डायवर्शन, पार्किंग](${TRAFFIC}) (26 अक्टूबर)
- [रामकुंड में आम प्रवेश नहीं, भीड़ का अनुमान, CCTV, कंट्रोल रूम, रिहर्सल](${RAMKUND}) (28 अक्टूबर)
- [शहर और ज़िले में ड्रोन, पैराग्लाइडर और बलून पर रोक](${DRONE}) (29 अक्टूबर)
- [पार्किंग मैदान, शराब दुकानें बंद, सिटी बसें](${PARKING}) (24 अक्टूबर)
- [30 अक्टूबर की ग्राम प्रदक्षिणा का रूट](${GRAM}) (23 अक्टूबर)
- [त्र्यंबकेश्वर मंदिर और कुशावर्त बाहर के श्रद्धालुओं के लिए बंद, शहर का यातायात आदेश](${TEMPLE_CLOSED}) (30 अक्टूबर)
- [राष्ट्रपति सड़क मार्ग से, 71 स्कूल बंद, गोदाघाट की दुकानें बंद](${PRESIDENT_ROAD}) (30 अक्टूबर)
- [कुशावर्त नवीनीकरण के लिए बंद](${KUSHAVARTA})
- [त्र्यंबकेश्वर कुंभ 2027 गाइड](/trimbakeshwar-kumbh-2027) और [नाशिक कैसे पहुँचें](/how-to-reach)
- आपातकालीन नंबर: किसी भी आपात स्थिति में 112, एम्बुलेंस के लिए 108। देखें [आपातकाल पेज](/emergency)।`,
        mr: `- [३० आणि ३१ ऑक्टोबरचे थेट अपडेट](${LIVE}): नवीन आधी, प्रत्येक अपडेटवर अधिकृत की वृत्त याची खूण.
- [ध्वजारोहण २०२६ हब](${HUB}): संपूर्ण कार्यक्रम, कोण येणार, कसे पाहाल.
- [नाशिक-त्र्यंबकेश्वर रस्ता बंद, गिरणारेमार्गे पर्याय, प्रवेशबंदी, राष्ट्रपतींचा मार्ग](${ROAD}) (२७ ऑक्टोबर)
- [पोलीस वाहतूक अधिसूचना: गोदाघाट नो-व्हेईकल झोन, बंदी, वळण मार्ग, पार्किंग](${TRAFFIC}) (२६ ऑक्टोबर)
- [रामकुंडात सामान्यांना प्रवेश नाही, गर्दीचा अंदाज, सीसीटीव्ही, कंट्रोल रूम, रंगीत तालीम](${RAMKUND}) (२८ ऑक्टोबर)
- [शहर आणि जिल्ह्यात ड्रोन, पॅराग्लायडर आणि बलूनला बंदी](${DRONE}) (२९ ऑक्टोबर)
- [पार्किंग मैदाने, मद्यविक्री बंद, शहर बस](${PARKING}) (२४ ऑक्टोबर)
- [३० ऑक्टोबरच्या ग्रामप्रदक्षिणेचा मार्ग](${GRAM}) (२३ ऑक्टोबर)
- [त्र्यंबकेश्वर मंदिर आणि कुशावर्त बाहेरच्या भाविकांसाठी बंद, शहराचा वाहतूक आदेश](${TEMPLE_CLOSED}) (३० ऑक्टोबर)
- [राष्ट्रपती रस्त्याने, ७१ शाळा बंद, गोदाघाटावरील दुकाने बंद](${PRESIDENT_ROAD}) (३० ऑक्टोबर)
- [कुशावर्त नूतनीकरणासाठी बंद](${KUSHAVARTA})
- [त्र्यंबकेश्वर कुंभमेळा २०२७ मार्गदर्शक](/trimbakeshwar-kumbh-2027) आणि [नाशिकला कसे पोहोचाल](/how-to-reach)
- आपत्कालीन क्रमांक: कोणत्याही आपत्कालीन स्थितीत ११२, रुग्णवाहिकेसाठी १०८. पाहा [आपत्कालीन पान](/emergency).`,
      },
    },
  ],
  faq: [
    {
      q: {
        en: "Is the Nashik to Trimbakeshwar road closed on 30 and 31 October 2026?",
        hi: "क्या 30 और 31 अक्टूबर 2026 को नाशिक-त्र्यंबकेश्वर रोड बंद है?",
        mr: "३० आणि ३१ ऑक्टोबर २०२६ ला नाशिक-त्र्यंबकेश्वर रस्ता बंद आहे का?",
      },
      a: {
        en: "Yes, as reported. The usual road via Pimpalgaon Bahula, Khambale and Pegalwadi Phata is closed from 8 AM on Friday 30 October to 8 PM on Saturday 31 October under a notification by Additional District Magistrate Rohitkumar Rajput (Prahaar, Sakal, Times of India, 26 October). Go via Govardhan, Girnare, Dhondegaon, Devargaon, Waghera Phata, Amboli Phata and Sapgaon; the Times of India puts that at about 61 km instead of 30. The Ghoti to Trimbak road is also shut.",
        hi: "हाँ, रिपोर्टों के अनुसार। पिंपळगाव बहुला, खंबाळे और पेगलवाडी फाटा वाला सामान्य रास्ता शुक्रवार 30 अक्टूबर सुबह 8 बजे से शनिवार 31 अक्टूबर रात 8 बजे तक अपर ज़िला दंडाधिकारी रोहितकुमार राजपूत की अधिसूचना से बंद है (प्रहार, सकाळ, टाइम्स ऑफ़ इंडिया, 26 अक्टूबर)। गोवर्धन, गिरणारे, धोंडेगाव, देवरगाव, वाघेरा फाटा, अंबोली फाटा और सापगाँव होकर जाएँ; टाइम्स ऑफ़ इंडिया के अनुसार यह 30 की जगह करीब 61 किमी है। घोटी-त्र्यंबक रोड भी बंद है।",
        mr: "होय, वृत्तांनुसार. पिंपळगाव बहुला, खंबाळे, पेगलवाडी फाट्यामार्गे जाणारा नेहमीचा रस्ता शुक्रवार ३० ऑक्टोबर सकाळी ८ ते शनिवार ३१ ऑक्टोबर रात्री ८ पर्यंत अपर जिल्हादंडाधिकारी रोहितकुमार राजपूत यांच्या अधिसूचनेने बंद आहे (प्रहार, सकाळ, टाइम्स ऑफ इंडिया, २६ ऑक्टोबर). गोवर्धन, गिरणारे, धोंडेगाव, देवरगाव, वाघेरा फाटा, अंबोली फाटा, सापगावमार्गे जा; टाइम्स ऑफ इंडियानुसार ते ३० ऐवजी सुमारे ६१ किमी आहे. घोटी-त्र्यंबक रस्ताही बंद आहे.",
      },
    },
    {
      q: {
        en: "Which roads in Nashik city are closed, and when?",
        hi: "नाशिक शहर में कौन-सी सड़कें बंद हैं, और कब?",
        mr: "नाशिक शहरात कोणते रस्ते बंद आहेत, आणि कधी?",
      },
      a: {
        en: "Per the police notice as reported by Sakal (25 October): Ramtirth and the whole Godaghat are a no-vehicle zone on both days. On 30 October, from 6 AM until the Gram Pradakshina ends, Ashok Stambh to Ravivar Karanja, Red Cross signal to Dhumal Point, Malegaon Stand to Makhmalabad Naka and Dindori Naka to Malegaon Stand are closed. On 31 October, from 6 AM to midnight, the main roads to Ramtirth are closed, including Ram Setu bridge and, per the Times of India, Gadge Maharaj bridge and Gondhal Gate.",
        hi: "सकाळ (25 अक्टूबर) में छपी पुलिस अधिसूचना के अनुसार: रामतीर्थ और पूरा गोदाघाट दोनों दिन नो-व्हीकल ज़ोन है। 30 अक्टूबर को सुबह 6 बजे से ग्राम प्रदक्षिणा ख़त्म होने तक अशोक स्तंभ से रविवार कारंजा, रेड क्रॉस सिग्नल से धुमाळ पॉइंट, मालेगाव स्टैंड से मखमलाबाद नाका और दिंडोरी नाका से मालेगाव स्टैंड बंद हैं। 31 अक्टूबर को सुबह 6 बजे से आधी रात तक रामतीर्थ की मुख्य सड़कें बंद हैं, जिनमें राम सेतु पुल और टाइम्स ऑफ़ इंडिया के अनुसार गाडगे महाराज पुल व गोंधळ गेट शामिल हैं।",
        mr: "सकाळमध्ये (२५ ऑक्टोबर) आलेल्या पोलीस अधिसूचनेनुसार: रामतीर्थ आणि संपूर्ण गोदाघाट दोन्ही दिवस नो-व्हेईकल झोन आहे. ३० ऑक्टोबरला सकाळी ६ पासून ग्रामप्रदक्षिणा संपेपर्यंत अशोक स्तंभ ते रविवार कारंजा, रेड क्रॉस सिग्नल ते धुमाळ पॉइंट, मालेगाव स्टँड ते मखमलाबाद नाका आणि दिंडोरी नाका ते मालेगाव स्टँड बंद आहेत. ३१ ऑक्टोबरला सकाळी ६ ते मध्यरात्रीपर्यंत रामतीर्थाकडे जाणारे मुख्य रस्ते बंद आहेत, त्यात रामसेतू पूल आणि टाइम्स ऑफ इंडियानुसार गाडगे महाराज पूल व गोंधळ गेट येतात.",
      },
    },
    {
      q: {
        en: "Can I go to Ramkund on 31 October to see the flag hoisting?",
        hi: "क्या मैं 31 अक्टूबर को ध्वजारोहण देखने रामकुंड जा सकता हूँ?",
        mr: "३१ ऑक्टोबरला ध्वजारोहण पाहायला मी रामकुंडावर जाऊ शकतो का?",
      },
      a: {
        en: "Not into the Ramkund area itself, as reported: Navbharat (28 October) says only VVIPs and special guests will enter during the flag hoisting and the aarti. Public seating is reported from Devmamledar ground to Rokdoba ground (Sakal). Police expect 80,000 to 1 lakh people against a ghat capacity of about 30,000 to 35,000, so arrive early, park at a listed ground and walk in.",
        hi: "रामकुंड परिसर में नहीं, रिपोर्टों के अनुसार: नवभारत (28 अक्टूबर) के अनुसार ध्वजारोहण और आरती के दौरान सिर्फ़ VVIP और विशेष अतिथि अंदर जाएँगे। आम लोगों की बैठक देवमामलेदार मैदान से रोकडोबा मैदान तक बताई गई है (सकाळ)। पुलिस को करीब 30 से 35 हज़ार क्षमता वाले घाट पर 80 हज़ार से 1 लाख लोगों की उम्मीद है, इसलिए जल्दी पहुँचें, तय मैदान में गाड़ी खड़ी करें और पैदल जाएँ।",
        mr: "रामकुंड परिसरात नाही, वृत्तांनुसार: नवभारत (२८ ऑक्टोबर) सांगतो की ध्वजारोहण आणि आरतीच्या वेळी फक्त अतिमहत्त्वाच्या व्यक्ती व विशेष निमंत्रितच आत जातील. नागरिकांची आसनव्यवस्था देवमामलेदार मैदान ते रोकडोबा मैदान असल्याचे वृत्त आहे (सकाळ). सुमारे ३० ते ३५ हजार क्षमतेच्या घाटावर पोलिसांना ८० हजार ते १ लाख लोकांचा अंदाज आहे, त्यामुळे लवकर पोहोचा, ठरलेल्या मैदानात गाडी लावा आणि पायी जा.",
      },
    },
    {
      q: {
        en: "What time is the Goda Aarti on 31 October?",
        hi: "31 अक्टूबर को गोदा आरती किस समय है?",
        mr: "३१ ऑक्टोबरला गोदा आरती किती वाजता आहे?",
      },
      a: {
        en: "Reports disagree and we are not choosing one. The police notice, as the Times of India reports it, says 7 PM. Prahaar and Lokmat Times gave 6 PM, eSakal 6:45 PM, and Sakal's reported itinerary has the President reaching the ghat at about 5 PM. No official printed programme has been published. The entry bans around the ghat start in the morning in any case.",
        hi: "रिपोर्टें अलग-अलग हैं और हम कोई एक समय नहीं चुन रहे। पुलिस अधिसूचना में, टाइम्स ऑफ़ इंडिया के अनुसार, शाम 7 बजे। प्रहार और लोकमत टाइम्स ने 6 बजे, ईसकाळ ने 6:45 और सकाळ के कार्यक्रम में राष्ट्रपति करीब 5 बजे घाट पर। कोई आधिकारिक छपा कार्यक्रम प्रकाशित नहीं हुआ। घाट के आसपास की प्रवेशबंदी वैसे भी सुबह से शुरू हो जाती है।",
        mr: "वृत्ते वेगवेगळी आहेत आणि आम्ही एक वेळ निवडत नाही. पोलीस अधिसूचनेत, टाइम्स ऑफ इंडियानुसार, सायंकाळी ७. प्रहार आणि लोकमत टाइम्सने ६, ईसकाळने पावणेसात, आणि सकाळच्या कार्यक्रमात राष्ट्रपती सुमारे ५ वाजता घाटावर. अधिकृत छापील कार्यक्रम प्रसिद्ध झालेला नाही. घाटाभोवतीची प्रवेशबंदी कशीही सकाळपासूनच सुरू होते.",
      },
    },
    {
      q: {
        en: "Can I fly a drone in Nashik or Trimbak on 30 or 31 October?",
        hi: "क्या मैं 30 या 31 अक्टूबर को नाशिक या त्र्यंबक में ड्रोन उड़ा सकता हूँ?",
        mr: "३० किंवा ३१ ऑक्टोबरला नाशिक किंवा त्र्यंबकमध्ये ड्रोन उडवता येईल का?",
      },
      a: {
        en: "No, not without prior permission, as reported by Prahaar and Vegvan Maharashtra (28 October). Police Commissioner Sandeep Karnik has made the whole commissionerate area a no-drone-fly zone, quoted as running from 12:01 AM on 29 October to midnight on 31 October, and it also covers paragliders, paramotors, hot-air balloons and microlights. Additional District Magistrate Rohitkumar Rajput has made the rural police area, which includes Trimbakeshwar, a no-drone and no-paragliding zone on 30 and 31 October.",
        hi: "नहीं, पूर्व अनुमति के बिना नहीं, प्रहार और वेगवान महाराष्ट्र (28 अक्टूबर) के अनुसार। पुलिस आयुक्त संदीप कर्णिक ने पूरे आयुक्तालय क्षेत्र को नो-ड्रोन-फ्लाय ज़ोन बनाया है, जो 29 अक्टूबर रात 12:01 से 31 अक्टूबर आधी रात तक बताया गया है, और इसमें पैराग्लाइडर, पैरामोटर, हॉट-एयर बलून और माइक्रोलाइट भी शामिल हैं। अपर ज़िला दंडाधिकारी रोहितकुमार राजपूत ने ग्रामीण पुलिस क्षेत्र को, जिसमें त्र्यंबकेश्वर आता है, 30 और 31 अक्टूबर को नो-ड्रोन और नो-पैराग्लाइडिंग ज़ोन बनाया है।",
        mr: "नाही, पूर्वपरवानगीशिवाय नाही, प्रहार आणि वेगवान महाराष्ट्र (२८ ऑक्टोबर) यांच्या वृत्तानुसार. पोलीस आयुक्त संदीप कर्णिक यांनी संपूर्ण आयुक्तालय क्षेत्र नो-ड्रोन-फ्लाय झोन केले आहे, जो २९ ऑक्टोबर रात्री १२.०१ ते ३१ ऑक्टोबर मध्यरात्रीपर्यंत असल्याचे सांगितले जाते, आणि त्यात पॅराग्लायडर, पॅरामोटर, हॉट-एअर बलून व मायक्रोलाइटही येतात. अपर जिल्हादंडाधिकारी रोहितकुमार राजपूत यांनी त्र्यंबकेश्वरसह ग्रामीण पोलीस हद्द ३० आणि ३१ ऑक्टोबरला नो-ड्रोन व नो-पॅराग्लायडिंग झोन केली आहे.",
      },
    },
    {
      q: {
        en: "Is Kushavarta in Trimbakeshwar open for a bath on 31 October?",
        hi: "क्या 31 अक्टूबर को त्र्यंबकेश्वर का कुशावर्त स्नान के लिए खुला है?",
        mr: "३१ ऑक्टोबरला त्र्यंबकेश्वरचे कुशावर्त स्नानासाठी खुले आहे का?",
      },
      a: {
        en: "No, not for outside devotees. A Collector's order reported by PTI and Hindusthan Samachar (29 October) closes Trimbakeshwar temple and Kushavarta to devotees from outside the town from 12 noon on 30 October to 6 PM on 31 October, or until the programme ends; only Trimbak residents and official darshan-pass holders get in. Kushavarta has also been closed since 30 September for renovation, with the renovated kund to be inaugurated on 31 October. No public bath after 6 PM on 31 October has been announced, and the Nashik to Trimbak road is closed until 8 PM that day.",
        hi: "नहीं, बाहर के श्रद्धालुओं के लिए नहीं। PTI और हिंदुस्थान समाचार (29 अक्टूबर) में छपे कलेक्टर के आदेश से त्र्यंबकेश्वर मंदिर और कुशावर्त 30 अक्टूबर दोपहर 12 बजे से 31 अक्टूबर शाम 6 बजे तक, या कार्यक्रम ख़त्म होने तक, बाहर के श्रद्धालुओं के लिए बंद हैं; सिर्फ़ त्र्यंबक के निवासी और आधिकारिक दर्शन पासधारक अंदर जा सकेंगे। कुशावर्त 30 सितंबर से नवीनीकरण के लिए भी बंद है, और नए रूप में कुंड का उद्घाटन 31 अक्टूबर को होना है। 31 अक्टूबर शाम 6 बजे के बाद आम स्नान की कोई घोषणा नहीं हुई, और नाशिक-त्र्यंबक रोड उस दिन रात 8 बजे तक बंद है।",
        mr: "नाही, बाहेरच्या भाविकांसाठी नाही. PTI आणि हिंदुस्थान समाचार (२९ ऑक्टोबर) यांनी दिलेल्या जिल्हाधिकाऱ्यांच्या आदेशाने त्र्यंबकेश्वर मंदिर आणि कुशावर्त ३० ऑक्टोबर दुपारी १२ ते ३१ ऑक्टोबर सायंकाळी ६ पर्यंत, किंवा कार्यक्रम संपेपर्यंत, बाहेरच्या भाविकांसाठी बंद आहेत; फक्त त्र्यंबकचे रहिवासी आणि अधिकृत दर्शन पासधारकच आत जाऊ शकतील. कुशावर्त ३० सप्टेंबरपासून नूतनीकरणासाठीही बंद आहे, आणि नव्या रूपातील कुंडाचे लोकार्पण ३१ ऑक्टोबरला होणार आहे. ३१ ऑक्टोबर सायंकाळी ६ नंतर सार्वजनिक स्नानाची घोषणा झालेली नाही, आणि नाशिक-त्र्यंबक रस्ता त्या दिवशी रात्री ८ पर्यंत बंद आहे.",
      },
    },
  ],
  sources: [
    {
      title: "Nashik's Trimbakeshwar temple to remain closed on Oct 30, 31 for Kumbh Mela flag hoisting",
      publisher: "PTI (via Moneycontrol)",
      date: "2026-10-29",
      status: "reported",
      url: "https://www.moneycontrol.com/city/nashik-s-trimbakeshwar-temple-to-remain-closed-on-oct-30-31-for-kumbh-mela-flag-hoisting-article-14063676.html",
    },
    {
      title: "Order to close Trimbakeshwar temple and Kushavarta to outside devotees",
      publisher: "Hindusthan Samachar Marathi",
      date: "2026-10-29",
      status: "reported",
      url: "https://marathi.hindusthansamachar.in/Encyc/2026/10/29/Order-to-close-Trimbakeshwar.php",
    },
    {
      title: "Traffic restrictions for the Simhastha flag hoisting: no entry for vehicles in Trimbakeshwar on 30 and 31 October",
      publisher: "Prahaar",
      date: "2026-10-29",
      status: "reported",
      url: "https://www.prahaar.in/2026/10/29/nashik-kumbhmela-traffic-restrictions-for-the-simhastha-flag-hoisting-ceremony-no-entry-for-vehicles-in-trimbakeshwar-on-october-30-and-31/",
    },
    {
      title: "President Murmu's Nashik visit and the rain forecast",
      publisher: "eSakal",
      date: "2026-10-28",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/president-murmu-nashik-visit-rain",
    },
    {
      title: "President's visit: helicopter travel restrictions, road route to Trimbakeshwar amid rain forecast",
      publisher: "Sarkarnama (eSakal)",
      date: "2026-10-29",
      status: "reported",
      url: "https://sarkarnama.esakal.com/maharashtra/uttar-maharashtra/nashik-kumbh-mela-president-droupadi-murmu-visit-helicopter-travel-restrictions-rain-forecast-trimbakeshwar-road-route-security-gs97",
    },
    {
      title: "President's Trimbakeshwar visit under a cloud of rain; administration prepares road route as backup",
      publisher: "Pudhari",
      date: "2026-10-29",
      status: "reported",
      url: "https://pudhari.news/maharashtra/north-maharashtra/nashik/presidents-trimbakeshwar-visit-under-cloud-of-rain-administration-prepares-road-route-as-backup-sd22",
    },
    {
      title: "71 Nashik schools to remain shut on Oct 31 for Kumbh Dhwajarohan",
      publisher: "Times of India",
      date: "2026-10-30",
      status: "reported",
      url: "https://timesofindia.indiatimes.com/city/nashik/71-nashik-schools-to-remain-shut-on-oct-31-for-kumbh-dhwajarohan/articleshow/135327408.cms",
    },
    {
      title: "All preparations being put in place for Nashik Simhastha Kumbh Mela flag hoisting ceremony",
      publisher: "ETV Bharat",
      date: "2026-10-29",
      status: "reported",
      url: "https://www.etvbharat.com/en/bharat/all-preparations-being-put-in-place-for-nashik-simhastha-kumbh-mela-flag-hoisting-ceremony-enn26102904297",
    },
    {
      title: "Police announce traffic restrictions for Dhwajarohan ceremony on Oct 30 and 31",
      publisher: "Times of India",
      date: "2026-10-26",
      status: "reported",
      url: "https://timesofindia.indiatimes.com/city/nashik/police-announce-traffic-restrictions-for-dhwajarohan-ceremony-on-oct-30-and-31/articleshow/135216705.cms",
    },
    {
      title: "सिंहस्थ ध्वजारोहण सोहळ्यासाठी त्र्यंबकेश्वरकडे जाणाऱ्या मार्गांत बदल, 30 व 31 ऑक्टोबरला वाहतूक निर्बंध लागू",
      publisher: "Prahaar",
      date: "2026-10-26",
      status: "reported",
      url: "https://www.prahaar.in/2026/10/26/changes-to-routes-leading-to-trimbakeshwar-for-the-simhastha-flag-hoisting-ceremony-traffic-restrictions-to-be-in-effect-on-october-30-and-31/",
    },
    {
      title: "नाशिक - त्र्यंबकेश्वर मार्गात दोन दिवस बदल",
      publisher: "eSakal",
      date: "2026-10-26",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/nashik-trimbak-traffic-changes",
    },
    {
      title: "संपूर्ण गोदाघाट दोन दिवस ‘नो व्हेईकल झोन’",
      publisher: "eSakal",
      date: "2026-10-25",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/nashik-singhast-kumbh-mela-traffic-changes",
    },
    {
      title: "नासिक रामकुंड में आम श्रद्धालुओं की नो-एंट्री, ध्वजारोहण-गोदाआरती में 1 लाख भीड़ का अनुमान; केवल VVIP को इजाजत",
      publisher: "Navbharat",
      date: "2026-10-28",
      status: "reported",
      url: "https://navbharatlive.com/maharashtra/nashik/nashik-simhastha-kumbh-dhwajarohan-godavari-aarti-traffic-restrictions-mgb06",
    },
    {
      title: "सिंहस्थ 'ध्वजारोहणा'वर सीसीटीव्हीचा 'वॉच'",
      publisher: "Sakal",
      date: "2026-10-27",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/singhast-kumbh-mela-cctv-safety",
    },
    {
      title: "राष्ट्रपती दौऱ्याची ७०० वाहतूक पोलिसांवर जबाबदारी",
      publisher: "Sakal",
      date: "2026-10-26",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/president-visit-nashik-traffic-management",
    },
    {
      title: "सिंहस्थ ध्वजारोहण सोहळ्याची रंगीत तालीम",
      publisher: "Sakal",
      date: "2026-10-26",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/dhwajarohan-sohala-nashik",
    },
    {
      title: "Nashik : नाशिक पोलीस आयुक्तालय कार्यक्षेत्रात 31 ऑक्टोबरपर्यंत 'नो ड्रोन फ्लाय झोन' घोषित",
      publisher: "Prahaar",
      date: "2026-10-28",
      status: "reported",
      url: "https://www.prahaar.in/2026/10/28/nashik-no-drone-fly-zone-declared-within-the-jurisdiction-of-the-nashik-police-commissionerate-until-october-31/",
    },
    {
      title: "नाशिक ग्रामीण भागात 30 आणि 31 ऑक्टोबरला 'नो ड्रोन' अन् 'पॅराग्लायडिंग झोन'; सुरक्षेच्या पार्श्वभूमीवर अपर जिल्हादंडाधिकाऱ्यांचे आदेश",
      publisher: "Prahaar",
      date: "2026-10-28",
      status: "reported",
      url: "https://www.prahaar.in/2026/10/28/nashik-rural-declared-no-drone-and-no-paragliding-zone-on-october-30-and-31-district-magistrate-order/",
    },
    {
      title: "नाशिक ग्रामीण जिल्ह्यात ३० व ३१ ऑक्टोबर रोजी 'नो ड्रोन व पॅराग्लायडिंग झोन'",
      publisher: "Vegvan Maharashtra",
      date: "2026-10-28",
      status: "reported",
      url: "https://vegvanmaharashtra.in/2026/10/28/nashik-rural-no-drone-paragliding-zone-oct-30-31-kumbh-flag-hoisting/",
    },
    {
      title: "Nashik Maha Goda Aarti: रामकुंडावर 31 ऑक्टोबरला केली जाणार 'महा गोदा आरती', नाशिक जिल्ह्यातील गावकरी घेणार सहभाग",
      publisher: "Prahaar",
      date: "2026-10-18",
      status: "confirmed",
      url: "https://www.prahaar.in/2026/10/18/maha-goda-aarti-to-be-held-at-ramkund-on-31st-october-2026-villagers-from-across-nashik-district-to-participate/",
    },
    {
      title: "सिंहस्थ कुंभमेळा ध्वजारोहणाच्या पार्श्वभूमीवर नाशिक मध्ये दोन विश्वविक्रमांचे नियोजन",
      publisher: "District Information Office, Nashik (on X)",
      date: "2026-10-18",
      status: "confirmed",
      url: "https://x.com/InfoNashik/status/2111862546781347954",
    },
    {
      title: "राष्ट्रपतींच्या हस्ते कुशावर्त व त्र्यंबकेश्वर मंदिरात किती मिनिटे पूजा? वेळापत्रक ठरलं.. प्रशासनाचं अचूक नियोजन!",
      publisher: "Sarkarnama (eSakal)",
      date: "2026-10-24",
      status: "reported",
      url: "https://sarkarnama.esakal.com/maharashtra/uttar-maharashtra/nashik-trimbakeshwar-simhastha-kumbh-mela-flag-hoisting-ceremony-president-droupadi-murmu-kushavart-tirth-12-minute-godavari-puja-trimbakeshwar-temple-15-minute-worship-administration-planning-gs97",
    },
    {
      title: "दोनदिवस मद्यविक्री बंदी आदेशात बदल: जिल्हाधिकारी कार्यालयाकडून सुधारित आदेश",
      publisher: "eSakal",
      date: "2026-10-22",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/nashik-kumbh-mela-liquor-sales-ban-changes",
    },
    {
      title: "त्र्यंबकेश्‍वर मंदिर ३१ ऑक्टेबरला खुले",
      publisher: "eSakal",
      date: "2026-10-21",
      status: "reported",
      url: "https://www.esakal.com/uttar-maharashtra/nashik/todays-latest-marathi-news-nsk26h40329-txt-nskmain3-20261021160415",
    },
    {
      title: "Kushavarta teerth to remain closed for month-long renovation",
      publisher: "Times of India",
      date: "2026-09-29",
      status: "confirmed",
      url: "https://timesofindia.indiatimes.com/city/nashik/kushavarta-teerth-to-remain-closed-for-month-long-renovation/articleshow/134572629.cms",
    },
    {
      title: "Kushavart Tirth to reopen on Oct 31",
      publisher: "Lokmat Times",
      date: "2026-10-04",
      status: "reported",
      url: "https://www.lokmattimes.com/nashik/kushavart-tirth-to-reopen-on-oct-31/",
    },
    {
      title: "Gram Pradakshina on October 30, 1 lakh devotees expected",
      publisher: "Lokmat Times",
      date: "2026-09-27",
      status: "reported",
      url: "https://www.lokmattimes.com/nashik/gram-pradakshina-on-october-30-1-lakh-devotees-expected/",
    },
  ],
  updated: "2026-10-30",
  crumb: {
    en: "Nashik 30-31 October disruptions",
    hi: "नाशिक 30-31 अक्टूबर: बंदी",
    mr: "नाशिक ३०-३१ ऑक्टोबर: बंदी",
  },
  photoIds: [38, 41],
};

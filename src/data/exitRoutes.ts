import type { Locale } from "@/i18n/translations";

type I18nText = Record<Locale, string>;

export interface ExitPoint {
  id: string;
  name: I18nText;
  direction: I18nText;
  landmark: I18nText;
  lat: number;
  lng: number;
  walkMinutes: number;
}

export interface KumbhZone {
  id: string;
  name: I18nText;
  centerLat: number;
  centerLng: number;
  exits: ExitPoint[];
}

// Placeholder data - to be updated once Nashik government approves final routes
export const kumbhZones: KumbhZone[] = [
  {
    id: "ramkund",
    name: {
      en: "Ramkund Ghat",
      hi: "रामकुंड घाट",
      mr: "रामकुंड घाट",
    },
    centerLat: 20.0063,
    centerLng: 73.791,
    exits: [
      {
        id: "ramkund-exit-1",
        name: {
          en: "Godavari Bridge Exit",
          hi: "गोदावरी पुल निकास",
          mr: "गोदावरी पूल निर्गम",
        },
        direction: {
          en: "Walk north towards Godavari Bridge",
          hi: "उत्तर दिशा में गोदावरी पुल की ओर चलें",
          mr: "उत्तर दिशेने गोदावरी पुलाकडे चाला",
        },
        landmark: {
          en: "Near Victoria Bridge",
          hi: "विक्टोरिया ब्रिज के पास",
          mr: "व्हिक्टोरिया ब्रिजजवळ",
        },
        lat: 20.008,
        lng: 73.7905,
        walkMinutes: 4,
      },
      {
        id: "ramkund-exit-2",
        name: {
          en: "Panchavati Road Exit",
          hi: "पंचवटी रोड निकास",
          mr: "पंचवटी रोड निर्गम",
        },
        direction: {
          en: "Walk south towards Panchavati Road",
          hi: "दक्षिण दिशा में पंचवटी रोड की ओर चलें",
          mr: "दक्षिण दिशेने पंचवटी रोडकडे चाला",
        },
        landmark: {
          en: "Near Kalaram Temple gate",
          hi: "कालाराम मंदिर गेट के पास",
          mr: "काळाराम मंदिर गेटजवळ",
        },
        lat: 20.0045,
        lng: 73.792,
        walkMinutes: 5,
      },
      {
        id: "ramkund-exit-3",
        name: {
          en: "Holkar Bridge Exit",
          hi: "होलकर पुल निकास",
          mr: "होळकर पूल निर्गम",
        },
        direction: {
          en: "Walk west towards Holkar Bridge",
          hi: "पश्चिम दिशा में होलकर पुल की ओर चलें",
          mr: "पश्चिम दिशेने होळकर पुलाकडे चाला",
        },
        landmark: {
          en: "Near Dutondya Maruti Temple",
          hi: "दुतोंड्या मारुति मंदिर के पास",
          mr: "दुतोंड्या मारुती मंदिराजवळ",
        },
        lat: 20.006,
        lng: 73.7885,
        walkMinutes: 3,
      },
    ],
  },
  {
    id: "tapovan",
    name: {
      en: "Tapovan Ghat",
      hi: "तपोवन घाट",
      mr: "तपोवन घाट",
    },
    centerLat: 20.012,
    centerLng: 73.785,
    exits: [
      {
        id: "tapovan-exit-1",
        name: {
          en: "Tapovan Road Exit",
          hi: "तपोवन रोड निकास",
          mr: "तपोवन रोड निर्गम",
        },
        direction: {
          en: "Walk east towards Tapovan Road",
          hi: "पूर्व दिशा में तपोवन रोड की ओर चलें",
          mr: "पूर्व दिशेने तपोवन रोडकडे चाला",
        },
        landmark: {
          en: "Near Kapila Godavari Sangam",
          hi: "कपिला गोदावरी संगम के पास",
          mr: "कपिला गोदावरी संगमजवळ",
        },
        lat: 20.0125,
        lng: 73.787,
        walkMinutes: 3,
      },
      {
        id: "tapovan-exit-2",
        name: {
          en: "Gangapur Road Exit",
          hi: "गंगापुर रोड निकास",
          mr: "गंगापूर रोड निर्गम",
        },
        direction: {
          en: "Walk north towards Gangapur Road",
          hi: "उत्तर दिशा में गंगापुर रोड की ओर चलें",
          mr: "उत्तर दिशेने गंगापूर रोडकडे चाला",
        },
        landmark: {
          en: "Near Someshwar Temple turn",
          hi: "सोमेश्वर मंदिर मोड़ के पास",
          mr: "सोमेश्वर मंदिर वळणाजवळ",
        },
        lat: 20.014,
        lng: 73.7845,
        walkMinutes: 5,
      },
    ],
  },
  {
    id: "panchavati",
    name: {
      en: "Panchavati - Kalaram Temple",
      hi: "पंचवटी - कालाराम मंदिर",
      mr: "पंचवटी - काळाराम मंदिर",
    },
    centerLat: 20.004,
    centerLng: 73.7935,
    exits: [
      {
        id: "panchavati-exit-1",
        name: {
          en: "Main Road Exit",
          hi: "मुख्य सड़क निकास",
          mr: "मुख्य रस्ता निर्गम",
        },
        direction: {
          en: "Walk south towards Nashik Main Road",
          hi: "दक्षिण दिशा में नाशिक मुख्य सड़क की ओर चलें",
          mr: "दक्षिण दिशेने नाशिक मुख्य रस्त्याकडे चाला",
        },
        landmark: {
          en: "Near Sita Gufa entrance",
          hi: "सीता गुफा प्रवेश के पास",
          mr: "सीता गुफा प्रवेशद्वाराजवळ",
        },
        lat: 20.0025,
        lng: 73.794,
        walkMinutes: 4,
      },
      {
        id: "panchavati-exit-2",
        name: {
          en: "Saraf Bazaar Exit",
          hi: "सराफ बाजार निकास",
          mr: "सराफ बाजार निर्गम",
        },
        direction: {
          en: "Walk west towards Saraf Bazaar",
          hi: "पश्चिम दिशा में सराफ बाजार की ओर चलें",
          mr: "पश्चिम दिशेने सराफ बाजाराकडे चाला",
        },
        landmark: {
          en: "Near Naroshankar Temple",
          hi: "नारोशंकर मंदिर के पास",
          mr: "नारोशंकर मंदिराजवळ",
        },
        lat: 20.0042,
        lng: 73.7915,
        walkMinutes: 6,
      },
    ],
  },
  {
    id: "someshwar",
    name: {
      en: "Someshwar",
      hi: "सोमेश्वर",
      mr: "सोमेश्वर",
    },
    centerLat: 20.02,
    centerLng: 73.776,
    exits: [
      {
        id: "someshwar-exit-1",
        name: {
          en: "Gangapur Naka Exit",
          hi: "गंगापुर नाका निकास",
          mr: "गंगापूर नाका निर्गम",
        },
        direction: {
          en: "Walk east towards Gangapur Naka",
          hi: "पूर्व दिशा में गंगापुर नाका की ओर चलें",
          mr: "पूर्व दिशेने गंगापूर नाक्याकडे चाला",
        },
        landmark: {
          en: "Near Someshwar Waterfall parking",
          hi: "सोमेश्वर झरना पार्किंग के पास",
          mr: "सोमेश्वर धबधबा पार्किंगजवळ",
        },
        lat: 20.0195,
        lng: 73.779,
        walkMinutes: 5,
      },
      {
        id: "someshwar-exit-2",
        name: {
          en: "Anandvalli Road Exit",
          hi: "आनंदवल्ली रोड निकास",
          mr: "आनंदवल्ली रोड निर्गम",
        },
        direction: {
          en: "Walk north towards Anandvalli",
          hi: "उत्तर दिशा में आनंदवल्ली की ओर चलें",
          mr: "उत्तर दिशेने आनंदवल्लीकडे चाला",
        },
        landmark: {
          en: "Near Dugarwadi junction",
          hi: "दुगरवाड़ी जंक्शन के पास",
          mr: "दुगरवाडी जंक्शनजवळ",
        },
        lat: 20.022,
        lng: 73.7755,
        walkMinutes: 7,
      },
    ],
  },
  {
    id: "trimbakeshwar",
    name: {
      en: "Trimbakeshwar",
      hi: "त्र्यंबकेश्वर",
      mr: "त्र्यंबकेश्वर",
    },
    centerLat: 19.9322,
    centerLng: 73.5311,
    exits: [
      {
        id: "trimbak-exit-1",
        name: {
          en: "Bus Stand Exit",
          hi: "बस स्टैंड निकास",
          mr: "बस स्टँड निर्गम",
        },
        direction: {
          en: "Walk south towards Trimbak Bus Stand",
          hi: "दक्षिण दिशा में त्र्यंबक बस स्टैंड की ओर चलें",
          mr: "दक्षिण दिशेने त्र्यंबक बस स्टँडकडे चाला",
        },
        landmark: {
          en: "Near main market gate",
          hi: "मुख्य बाजार गेट के पास",
          mr: "मुख्य बाजार गेटजवळ",
        },
        lat: 19.931,
        lng: 73.532,
        walkMinutes: 4,
      },
      {
        id: "trimbak-exit-2",
        name: {
          en: "Kushavart Tirth Exit",
          hi: "कुशावर्त तीर्थ निकास",
          mr: "कुशावर्त तीर्थ निर्गम",
        },
        direction: {
          en: "Walk east towards Kushavart Kund",
          hi: "पूर्व दिशा में कुशावर्त कुंड की ओर चलें",
          mr: "पूर्व दिशेने कुशावर्त कुंडाकडे चाला",
        },
        landmark: {
          en: "Near Kushavart parking lot",
          hi: "कुशावर्त पार्किंग के पास",
          mr: "कुशावर्त पार्किंगजवळ",
        },
        lat: 19.9325,
        lng: 73.5335,
        walkMinutes: 3,
      },
      {
        id: "trimbak-exit-3",
        name: {
          en: "Brahmagiri Trail Exit",
          hi: "ब्रह्मगिरि ट्रेल निकास",
          mr: "ब्रह्मगिरी ट्रेल निर्गम",
        },
        direction: {
          en: "Walk north towards Brahmagiri foothills",
          hi: "उत्तर दिशा में ब्रह्मगिरि तलहटी की ओर चलें",
          mr: "उत्तर दिशेने ब्रह्मगिरी पायथ्याकडे चाला",
        },
        landmark: {
          en: "Near Godavari origin point",
          hi: "गोदावरी उद्गम स्थल के पास",
          mr: "गोदावरी उगमस्थानाजवळ",
        },
        lat: 19.934,
        lng: 73.5305,
        walkMinutes: 8,
      },
    ],
  },
];

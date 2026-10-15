import type { L10n } from "@/data/verified";

/**
 * Places on /map. A place is listed ONLY if its coordinates can be checked
 * against a public source (OpenStreetMap object or Wikipedia/Wikidata
 * coordinates). Never type coordinates from memory. To add a place, add the
 * source link and the object id you read the coordinates from.
 *
 * Deliberately NOT listed (no verifiable coordinates found on 15 Oct 2026):
 * Kushavarta Tirth, Sadhugram, Godaghat, the 12 new ghats, and every parking
 * area. Add them when an official notice or an OSM/Wikidata object gives them.
 */
export interface MapPlace {
  id: string;
  name: L10n;
  note: L10n;
  lat: number;
  lon: number;
  sourceLabel: string;
  sourceUrl: string;
  /** Internal page that explains the place. */
  page: string;
}

export const mapPlaces: MapPlace[] = [
  {
    id: "ramkund",
    name: { en: "Ramkund, Panchavati", hi: "रामकुंड, पंचवटी", mr: "रामकुंड, पंचवटी" },
    note: {
      en: "The main bathing kund on the Godavari in Nashik, where the Nashik Amrit Snans are held. Public access is currently restricted in phases; check the status board.",
      hi: "नाशिक में गोदावरी पर मुख्य स्नान कुंड, जहाँ नाशिक के अमृत स्नान होते हैं। अभी आम प्रवेश चरणों में सीमित है; स्टेटस बोर्ड देखें।",
      mr: "नाशिकमध्ये गोदावरीवरील मुख्य स्नानकुंड, जिथे नाशिकचे अमृत स्नान होतात. सध्या सर्वसामान्यांचा प्रवेश टप्प्याटप्प्याने मर्यादित आहे; स्टेटस बोर्ड पाहा.",
    },
    lat: 20.0072639,
    lon: 73.7924901,
    sourceLabel: "OpenStreetMap node 4115262090",
    sourceUrl: "https://www.openstreetmap.org/node/4115262090",
    page: "/kumbh-status",
  },
  {
    id: "kalaram",
    name: { en: "Kalaram Temple, Panchavati", hi: "कालाराम मंदिर, पंचवटी", mr: "काळाराम मंदिर, पंचवटी" },
    note: {
      en: "A temple in Panchavati, a short distance from Ramkund. Listed on Wikipedia and Wikidata with these coordinates.",
      hi: "पंचवटी में रामकुंड के पास का एक मंदिर। इन निर्देशांकों के साथ विकिपीडिया और विकिडेटा में दर्ज।",
      mr: "पंचवटीतील रामकुंडाजवळचे मंदिर. या निर्देशांकांसह विकिपीडिया आणि विकिडेटामध्ये नोंद.",
    },
    lat: 20.0069387,
    lon: 73.795501,
    sourceLabel: "Wikipedia: Kalaram Temple (Wikidata Q6350697)",
    sourceUrl: "https://en.wikipedia.org/wiki/Kalaram_Temple",
    page: "/ghats",
  },
  {
    id: "kapaleshwar",
    name: { en: "Kapaleshwar Mahadev Mandir, Panchavati", hi: "कपालेश्वर महादेव मंदिर, पंचवटी", mr: "कपालेश्वर महादेव मंदिर, पंचवटी" },
    note: {
      en: "A Shiva temple near the Godavari ghats in Panchavati, as mapped on OpenStreetMap.",
      hi: "पंचवटी में गोदावरी घाटों के पास का शिव मंदिर, जैसा OpenStreetMap पर दर्ज है।",
      mr: "पंचवटीतील गोदावरी घाटांजवळचे शिवमंदिर, OpenStreetMap वर नोंदवल्याप्रमाणे.",
    },
    lat: 20.0082828,
    lon: 73.7931596,
    sourceLabel: "OpenStreetMap way 1461787680",
    sourceUrl: "https://www.openstreetmap.org/way/1461787680",
    page: "/ghats",
  },
  {
    id: "trimbakeshwar",
    name: { en: "Trimbakeshwar Temple", hi: "त्र्यंबकेश्वर मंदिर", mr: "त्र्यंबकेश्वर मंदिर" },
    note: {
      en: "The Trimbakeshwar Shiva temple. Kushavarta Tirth, where the Trimbakeshwar Amrit Snans are held, is in the same town, but we have no verified coordinates for it yet, so it is not pinned.",
      hi: "त्र्यंबकेश्वर शिव मंदिर। कुशावर्त तीर्थ, जहाँ त्र्यंबकेश्वर के अमृत स्नान होते हैं, इसी नगर में है, पर उसके सत्यापित निर्देशांक अभी हमारे पास नहीं हैं, इसलिए पिन नहीं किया गया।",
      mr: "त्र्यंबकेश्वर शिवमंदिर. कुशावर्त तीर्थ, जिथे त्र्यंबकेश्वरचे अमृत स्नान होतात, याच गावात आहे; पण त्याचे पडताळलेले निर्देशांक अजून आमच्याकडे नाहीत, म्हणून पिन केलेले नाही.",
    },
    lat: 19.93222222,
    lon: 73.53083333,
    sourceLabel: "Wikipedia: Trimbakeshwar Temple (Wikidata Q2426825)",
    sourceUrl: "https://en.wikipedia.org/wiki/Trimbakeshwar_Temple",
    page: "/trimbakeshwar-kumbh-2027",
  },
];

export const mapDataUpdated = "2026-10-15";

export function osmEmbed(p: MapPlace): string {
  const d = 0.006;
  const bbox = [p.lon - d, p.lat - d / 1.5, p.lon + d, p.lat + d / 1.5].map((n) => n.toFixed(6)).join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${p.lat}%2C${p.lon}`;
}
export const osmLink = (p: MapPlace) => `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=17/${p.lat}/${p.lon}`;

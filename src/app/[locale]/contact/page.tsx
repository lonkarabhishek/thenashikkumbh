import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import JsonLd from "@/components/JsonLd";
import { SITE_OWNER } from "@/data/siteOwner";
import { offices } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { SITE_URL, localeUrl, pageMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };
const ntkma = offices.find((o) => o.id === "ntkma")!;

const C = {
  title: { en: "Contact and legal notice", hi: "संपर्क और क़ानूनी सूचना", mr: "संपर्क आणि कायदेशीर सूचना" },
  desc: {
    en: "Who publishes The Nashik Kumbh, how to report a correction, and how to reach the official Kumbh Mela Authority.",
    hi: "द नाशिक कुंभ कौन प्रकाशित करता है, सुधार कैसे बताएँ, और आधिकारिक कुंभ मेला प्राधिकरण से कैसे संपर्क करें।",
    mr: "द नाशिक कुंभ कोण प्रकाशित करते, दुरुस्ती कशी कळवावी आणि अधिकृत कुंभमेळा प्राधिकरणाशी संपर्क कसा साधावा.",
  },
  publisherH: { en: "Publisher", hi: "प्रकाशक", mr: "प्रकाशक" },
  publisher: {
    en: "The Nashik Kumbh (thenashikkumbh.com) is an independent information site owned and run by Abhishek Lonkar. It is not an official government website.",
    hi: "द नाशिक कुंभ (thenashikkumbh.com) एक स्वतंत्र सूचना साइट है, जिसके स्वामी और संचालक अभिषेक लोणकर हैं। यह सरकारी वेबसाइट नहीं है।",
    mr: "द नाशिक कुंभ (thenashikkumbh.com) ही अभिषेक लोणकर यांच्या मालकीची आणि त्यांनी चालवलेली स्वतंत्र माहिती साइट आहे. ही सरकारी वेबसाइट नाही.",
  },
  reachH: { en: "Reach the site owner", hi: "साइट संचालक से संपर्क", mr: "साइट चालकाशी संपर्क" },
  corrH: { en: "Report an error", hi: "गलती बताएँ", mr: "चूक कळवा" },
  corr: {
    en: "Send the page link, what is wrong and a source if you have one through any of the links above. Corrections are made under our corrections policy and recorded in the changelog.",
    hi: "ऊपर दिए किसी भी लिंक से पेज का लिंक, क्या गलत है और हो सके तो स्रोत भेजें। सुधार हमारी सुधार नीति के तहत किए जाते हैं और परिवर्तन-लॉग में दर्ज होते हैं।",
    mr: "वरील कोणत्याही लिंकद्वारे पानाची लिंक, काय चुकले आहे आणि शक्य असल्यास स्रोत पाठवा. दुरुस्त्या आमच्या दुरुस्ती धोरणानुसार केल्या जातात आणि बदल-नोंदीत नोंदवल्या जातात.",
  },
  officialH: { en: "Official Kumbh matters", hi: "आधिकारिक कुंभ विषय", mr: "अधिकृत कुंभ विषय" },
  official: {
    en: "This site cannot act on official requests. Contact the authority directly:",
    hi: "यह साइट आधिकारिक अनुरोधों पर कार्रवाई नहीं कर सकती। सीधे प्राधिकरण से संपर्क करें:",
    mr: "ही साइट अधिकृत विनंत्यांवर कार्यवाही करू शकत नाही. थेट प्राधिकरणाशी संपर्क साधा:",
  },
  links: { en: "Policies", hi: "नीतियाँ", mr: "धोरणे" },
};

export function generateMetadata({ params }: Params): Metadata {
  return pageMetadata({ locale: params.locale, title: C.title[params.locale], description: C.desc[params.locale], path: "/contact" });
}

export default function ContactPage({ params }: Params) {
  const l = params.locale;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: C.title[l],
    url: localeUrl(l, "/contact"),
    inLanguage: l,
    about: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <div className="bg-cream-50 pt-24">
      <JsonLd data={schema} />
      <div className="section-container max-w-3xl py-16 sm:py-24">
        <h1 className="text-title text-temple-900">{C.title[l]}</h1>
        <h2 className="mt-10 font-heading text-xl font-bold text-temple-900">{C.publisherH[l]}</h2>
        <p className="mt-3 leading-relaxed text-temple-700">{C.publisher[l]}</p>
        <h2 className="mt-10 font-heading text-xl font-bold text-temple-900">{C.reachH[l]}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-temple-700">
          <li><a className="underline" href={SITE_OWNER.github} target="_blank" rel="noopener noreferrer">GitHub: lonkarabhishek</a></li>
          <li><a className="underline" href={SITE_OWNER.website} target="_blank" rel="noopener noreferrer">workwithabhi.online</a></li>
          <li><a className="underline" href={SITE_OWNER.studio} target="_blank" rel="noopener noreferrer">studio.workwithabhi.online</a></li>
        </ul>
        <h2 className="mt-10 font-heading text-xl font-bold text-temple-900">{C.corrH[l]}</h2>
        <p className="mt-3 leading-relaxed text-temple-700">{C.corr[l]}</p>
        <h2 className="mt-10 font-heading text-xl font-bold text-temple-900">{C.officialH[l]}</h2>
        <p className="mt-3 leading-relaxed text-temple-700">
          {C.official[l]} {ntkma.name[l]}
          {ntkma.phone && <> · <a className="underline" href={`tel:${ntkma.phone.replace(/[^0-9+]/g, "")}`}>{ntkma.phone}</a></>}
          {ntkma.email && <> · <a className="underline" href={`mailto:${ntkma.email}`}>{ntkma.email}</a></>}
        </p>
        <p className="mt-10 flex flex-wrap gap-x-5 text-sm">
          <Link href="/about#who-runs-this-site" className="font-semibold text-saffron-700 underline">{{ en: "About the site", hi: "साइट के बारे में", mr: "साइटविषयी" }[l]}</Link>
          <Link href="/policies" className="font-semibold text-saffron-700 underline">{C.links[l]}</Link>
          <Link href="/changelog" className="font-semibold text-saffron-700 underline">{{ en: "Changelog", hi: "परिवर्तन-लॉग", mr: "बदल-नोंद" }[l]}</Link>
        </p>
      </div>
    </div>
  );
}

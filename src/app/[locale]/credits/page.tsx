import type { Metadata } from "next";
import PhotoCredit from "@/components/photos/PhotoCredit";
import { PHOTO_TOPICS, TOPIC_LABEL, photos } from "@/data/photos";
import type { Locale } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

const COPY = {
  title: { en: "Photo credits", hi: "फोटो श्रेय", mr: "फोटो श्रेय" },
  description: {
    en: "Credits and licences for the Wikimedia Commons photos used on The Nashik Kumbh.",
    hi: "द नाशिक कुंभ पर इस्तेमाल हुई विकिमीडिया कॉमन्स तस्वीरों के श्रेय और लाइसेंस।",
    mr: "द नाशिक कुंभवर वापरलेल्या विकिमीडिया कॉमन्स छायाचित्रांचे श्रेय आणि परवाने.",
  },
  intro: {
    en: "These photos come from Wikimedia Commons under the licences shown. They are used unedited (resized only). Thank you to every photographer.",
    hi: "ये तस्वीरें विकिमीडिया कॉमन्स से, बताए गए लाइसेंस के तहत ली गई हैं। इन्हें बिना बदलाव (केवल आकार छोटा कर) इस्तेमाल किया गया है। हर फोटोग्राफर का धन्यवाद।",
    mr: "ही छायाचित्रे विकिमीडिया कॉमन्सवरून, दाखवलेल्या परवान्यांनुसार घेतली आहेत. ती कोणताही बदल न करता (फक्त आकार लहान करून) वापरली आहेत. प्रत्येक छायाचित्रकाराचे आभार.",
  },
};

export function generateMetadata({ params }: Params): Metadata {
  return pageMetadata({
    locale: params.locale,
    title: COPY.title[params.locale],
    description: COPY.description[params.locale],
    path: "/credits",
  });
}

export default function CreditsPage({ params }: Params) {
  const { locale } = params;
  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pt-36">
      <div className="section-container mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-temple-900">{COPY.title[locale]}</h1>
        <p className="mt-4 text-temple-600">{COPY.intro[locale]}</p>
        {PHOTO_TOPICS.map((topic) => (
          <section key={topic} className="mt-10">
            <h2 className="font-heading text-xl font-bold text-temple-900">{TOPIC_LABEL[topic]?.[locale] ?? topic}</h2>
            <ol className="mt-4 space-y-4">
              {photos
                .filter((p) => p.topic === topic)
                .map((p) => (
                  <li key={p.id} className="text-sm text-temple-700">
                    <span className="font-semibold">{p.caption}</span>
                    <PhotoCredit photo={p} className="mt-1 text-temple-600 opacity-100" />
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

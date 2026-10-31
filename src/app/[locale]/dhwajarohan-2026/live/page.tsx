import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Link from "@/components/LocaleLink";
import LiveFeed, { type LiveItem, type RelatedStory } from "@/components/live/LiveFeed";
import { page as hub } from "@/content/pages/dhwajarohan-2026";
import type { YouTubeMedia } from "@/content/pages/types";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { blogArticles } from "@/data/blogData";
import { newsStatus } from "@/components/blog/newsMeta";
import type { Locale } from "@/i18n/translations";
import { SITE_NAME, SITE_URL, breadcrumbSchema, localeUrl, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/dates";

/**
 * /dhwajarohan-2026/live: the hub's dated updates as a page of their own,
 * newest first, with the pulse, the last-updated stamp and a soft refresh.
 * The updates live in the hub content file (one source of truth); this page
 * only presents them, plus our own 30 and 31 October stories. No ads here.
 */

const PATH = "/dhwajarohan-2026/live";
const HUB_PATH = "/dhwajarohan-2026";
const GUIDE_PATH = "/nashik-30-31-october-disruptions";

/** Our posts about the two days, newest first in blogArticles order. */
const RELATED_SLUGS = [
  "trimbakeshwar-temple-kushavarta-closed-to-outside-devotees-noon-30-october-to-6-pm-31-october-collector-order-town-traffic",
  "president-murmu-to-travel-by-road-not-helicopter-rain-forecast-71-schools-shut-31-october-godaghat-shops-closed-1317-vips",
  "no-drone-zone-nashik-city-and-rural-district-30-31-october-paragliders-hot-air-balloons-banned-flag-hoisting",
  "ramkund-no-general-entry-31-october-1-lakh-crowd-cctv-control-rooms-rehearsal-president-day-plan",
  "nashik-trimbakeshwar-road-closed-30-31-october-girnare-detour-ghoti-route-shut-goda-aarti-entry-bans-president-route",
  "nashik-traffic-notice-30-31-october-godaghat-no-vehicle-zone-ramtirth-roads-shut-diversions-parking-iim-nagpur-crowd-plan",
  "shankhnaad-guinness-world-record-set-nashik-517-or-501-conches-certificate-on-31-october",
  "president-12-minute-godavari-puja-kushavarta-2-pm-trimbakeshwar-plan-31-october-shankaracharya-flag",
  "dhwajarohan-30-31-october-parking-grounds-liquor-shops-shut-2-km-ramkund-city-buses",
  "governor-invited-to-31-october-flag-hoisting-president-helicopters-6559-tribal-aarti-trimbakeshwar-road-repairs",
  "gram-pradakshina-30-october-route-tapovan-to-ramkund-nmc-encroachment-drive-october-24-29",
  "trimbakeshwar-temple-open-on-31-october-3000-passes-kushavarta-works-by-october-25",
];

const COPY = {
  title: {
    en: "Live: Dhwajarohan 30-31 October, Nashik and Trimbakeshwar",
    hi: "लाइव: ध्वजारोहण 30-31 अक्टूबर, नाशिक और त्र्यंबकेश्वर",
    mr: "थेट: ध्वजारोहण ३०-३१ ऑक्टोबर, नाशिक आणि त्र्यंबकेश्वर",
  },
  description: {
    en: "Live updates on the Simhastha flag hoisting, 30 and 31 October 2026: closures, Ramkund access, the President's visit, Goda Aarti. Newest first, each marked confirmed or reported.",
    hi: "सिंहस्थ ध्वजारोहण, 30-31 अक्टूबर 2026 के लाइव अपडेट: बंदी, रामकुंड प्रवेश, राष्ट्रपति का दौरा, गोदा आरती। सबसे नया पहले, हर अपडेट पुष्ट या रिपोर्ट के निशान के साथ।",
    mr: "सिंहस्थ ध्वजारोहण, ३०-३१ ऑक्टोबर २०२६ चे थेट अपडेट: बंदी, रामकुंड प्रवेश, राष्ट्रपतींचा दौरा, गोदा आरती. नवीन आधी, प्रत्येक अपडेट अधिकृत की वृत्त या खुणेसह.",
  },
  h1: {
    en: "Live: Dhwajarohan, 30 and 31 October 2026",
    hi: "लाइव: ध्वजारोहण, 30 और 31 अक्टूबर 2026",
    mr: "थेट: ध्वजारोहण, ३० आणि ३१ ऑक्टोबर २०२६",
  },
  lead: {
    en: "Flags go up at 12:02 PM on Saturday 31 October at Ramkund in Nashik and Kushavarta in Trimbakeshwar. This page lists every dated update from our desk, newest first. Confirmed means an official said it on record or an order has been published; reported means a newspaper report we have not been able to verify against the order itself.",
    hi: "शनिवार 31 अक्टूबर को दोपहर 12:02 बजे नाशिक के रामकुंड और त्र्यंबकेश्वर के कुशावर्त पर ध्वज फहराया जाएगा। इस पेज पर हमारे डेस्क का हर तारीख़ वाला अपडेट है, सबसे नया पहले। \"पुष्ट\" का मतलब किसी अधिकारी ने आधिकारिक तौर पर कहा या आदेश प्रकाशित हुआ; \"रिपोर्ट\" का मतलब अख़बार की ख़बर, जिसे हम आदेश से नहीं मिला पाए।",
    mr: "शनिवार ३१ ऑक्टोबरला दुपारी १२.०२ वाजता नाशिकच्या रामकुंडावर आणि त्र्यंबकेश्वरच्या कुशावर्तावर ध्वज फडकणार आहेत. या पानावर आमच्या डेस्कचे प्रत्येक दिनांकित अपडेट आहे, नवीन आधी. \"अधिकृत\" म्हणजे अधिकाऱ्याने जाहीरपणे सांगितले किंवा आदेश प्रसिद्ध झाला; \"वृत्त\" म्हणजे वृत्तपत्रातील बातमी, जी आम्ही आदेशाशी पडताळू शकलेलो नाही.",
  },
  guide: {
    en: "Living in Nashik or Trimbak? Read the plain guide to what is closed and when: ",
    hi: "नाशिक या त्र्यंबक में रहते हैं? क्या बंद है और कब, इसकी सीधी गाइड पढ़ें: ",
    mr: "नाशिक किंवा त्र्यंबकमध्ये राहता? काय बंद आहे आणि कधी, याचा सोपा मार्गदर्शक वाचा: ",
  },
  guideLink: {
    en: "Nashik and Trimbak on 30 and 31 October",
    hi: "30 और 31 अक्टूबर को नाशिक और त्र्यंबक",
    mr: "३० आणि ३१ ऑक्टोबरला नाशिक व त्र्यंबक",
  },
  hub: { en: "Full programme and how to watch: ", hi: "पूरा कार्यक्रम और कैसे देखें: ", mr: "संपूर्ण कार्यक्रम आणि कसे पाहाल: " },
  hubLink: { en: "Dhwajarohan 2026 hub", hi: "ध्वजारोहण 2026 हब", mr: "ध्वजारोहण २०२६ हब" },
  crumb: { en: "Live", hi: "लाइव", mr: "थेट" },
};

type Params = { params: { locale: Locale } };

export function generateMetadata({ params }: Params): Metadata {
  return pageMetadata({
    locale: params.locale,
    title: COPY.title[params.locale],
    description: COPY.description[params.locale],
    path: PATH,
    ...(hub.shareImage ? { image: hub.shareImage[params.locale] } : {}),
  });
}

/** "31 Oct, 12:05 PM IST", always in IST, rendered on the server only. */
function stamp(iso: string, locale: Locale): string {
  const tag = locale === "en" ? "en-IN" : locale === "hi" ? "hi-IN" : "mr-IN";
  const d = new Date(iso);
  const day = d.toLocaleDateString(tag, { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  const time = d.toLocaleTimeString(tag, { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  return `${day}, ${time} IST`;
}

const idFor = (time: string) => `update-${time.slice(0, 16).replace(/[^0-9]/g, "")}`;

function mediaFor(media: YouTubeMedia | undefined, locale: Locale): LiveItem["media"] {
  if (!media || !youtubeEmbedUrl(media.id)) return undefined;
  return {
    type: "youtube",
    id: media.id,
    caption: typeof media.caption === "string" ? media.caption : media.caption[locale],
    credit: media.credit,
  };
}

function videoSchema(media: YouTubeMedia | undefined, locale: Locale) {
  const embedUrl = media ? youtubeEmbedUrl(media.id) : null;
  if (!media || !embedUrl) return {};
  return {
    video: {
      "@type": "VideoObject",
      name: typeof media.caption === "string" ? media.caption : media.caption[locale],
      embedUrl,
      creditText: media.credit,
    },
  };
}

export default function Page({ params }: Params) {
  const l = params.locale;
  const url = localeUrl(l, PATH);
  const updates = hub.liveUpdates ?? [];

  const items: LiveItem[] = updates.map((u) => ({
    id: idFor(u.time),
    time: u.time,
    stamp: stamp(u.time, l),
    headline: u.headline[l],
    body: u.body[l],
    status: u.status,
    source: u.source,
    media: mediaFor(u.media, l),
  }));

  const related: RelatedStory[] = RELATED_SLUGS.map((slug) => blogArticles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ href: `/blog/${a.slug}`, title: a.title[l], date: formatDate(a.date, l, { short: true }), status: newsStatus(a) }));

  const lastUpdated = updates[0] ? stamp(updates[0].time, l) : "";

  const liveSchema =
    hub.liveEvent && updates.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "LiveBlogPosting",
          "@id": `${url}#live`,
          url,
          headline: COPY.h1[l],
          description: COPY.description[l],
          inLanguage: l,
          datePublished: updates[updates.length - 1].time,
          dateModified: updates[0].time,
          coverageStartTime: hub.liveEvent.start,
          coverageEndTime: hub.liveEvent.end,
          image: [`${SITE_URL}${hub.shareImage?.[l] ?? "/images/og-image.jpg"}`],
          author: { "@type": "Organization", name: "The Nashik Kumbh Desk", url: localeUrl(l, "/about") },
          publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
          about: { "@id": `${localeUrl(l, HUB_PATH)}#event` },
          liveBlogUpdate: updates.map((u) => ({
            "@type": "BlogPosting",
            headline: u.headline[l],
            articleBody: u.body[l],
            datePublished: u.time,
            url: `${url}#${idFor(u.time)}`,
            ...videoSchema(u.media, l),
          })),
        }
      : null;

  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pt-36">
      {liveSchema && <JsonLd data={liveSchema} />}
      <JsonLd
        data={breadcrumbSchema(l, [
          { name: hub.crumb[l], path: HUB_PATH },
          { name: COPY.crumb[l], path: PATH },
        ])}
      />
      <article className="section-container mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-saffron-700">
          <Link href={HUB_PATH} className="hover:underline">
            {hub.crumb[l]}
          </Link>
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-temple-900 md:text-5xl">{COPY.h1[l]}</h1>
        <p className="mt-5 text-lg leading-relaxed text-temple-700">{COPY.lead[l]}</p>
        <p className="mt-3 text-sm text-temple-600">
          {COPY.guide[l]}
          <Link href={GUIDE_PATH} className="font-semibold text-saffron-700 underline underline-offset-2">
            {COPY.guideLink[l]}
          </Link>
          {". "}
          {COPY.hub[l]}
          <Link href={HUB_PATH} className="font-semibold text-saffron-700 underline underline-offset-2">
            {COPY.hubLink[l]}
          </Link>
          .
        </p>

        <LiveFeed locale={l} items={items} related={related} lastUpdated={lastUpdated} />
      </article>
    </div>
  );
}

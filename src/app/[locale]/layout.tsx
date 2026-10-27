import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Noto_Serif_Devanagari } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/ChatContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KumbhSahayakLazy from "@/components/KumbhSahayakLazy";
import NewsTicker from "@/components/NewsTicker";
import { blogArticles } from "@/data/blogData";
import SOSButton from "@/components/SOSButton";

import ThirdPartyScripts from "@/components/consent/ThirdPartyScripts";
import ConsentBanner from "@/components/consent/ConsentBanner";
import SchemaMarkup from "@/components/SchemaMarkup";
import PWARegistrar from "@/components/PWARegistrar";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n/locales";
import { SEO_COPY, TITLE_TEMPLATE } from "@/i18n/seoCopy";
import type { Locale } from "@/i18n/translations";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Optical sizing keeps the display cuts tight and the small sizes readable.
// Only the opsz axis is used; SOFT and WONK were never set and doubled the
// file size.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

// Not preloaded: it is ~150 KB and was holding back first paint on every
// page, including English ones. It still loads with display: swap wherever
// Devanagari text appears.
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#C1272D",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Only /mr, /hi and /en exist; any other first segment is a 404.
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { locale } = params;
  const home = SEO_COPY.home[locale];

  // Deliberately no `alternates` here: a canonical set in a layout is
  // inherited by every page below it that forgets its own, which tells search
  // engines those pages are duplicates of the home page. The home page sets
  // its canonical in (home)/layout.tsx; inner pages use src/lib/seo.ts.
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: home.title,
      template: TITLE_TEMPLATE[locale],
    },
    description: home.description,
    keywords: [
    "Nashik Kumbh Mela",
    "Kumbh Mela 2027",
    "Simhastha Kumbh",
    "नाशिक कुंभमेळा",
    "नाशिक कुंभ मेला",
    "कुंभमेळा २०२७",
    "Nashik pilgrimage",
    "Godavari River",
    "Shahi Snan",
    "शाही स्नान",
    "sacred bathing dates",
    "Ram Kund Nashik",
    "Trimbakeshwar",
    "Panchavati",
    "Hindu pilgrimage",
    "spiritual gathering India",
    "Kumbh Mela guide",
    "Nashik ghats",
    "Naga Sadhu procession",
    "Kumbh events",
    "Nashik travel guide",
    "holy dip Godavari",
    "Dakshin Ganga",
    "Akhada Kumbh",
    "सिंहस्थ कुंभ",
    "गोदावरी नदी",
    "पंचवटी नाशिक",
    ],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      title: "Nashik Kumbh",
      statusBarStyle: "default",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();

  // Three newest posts; blogArticles is already sorted by date.
  // Pinned first: the 25 Oct / 31 Oct share cards on the live hub (remove after 1 Nov 2026).
  const hubItem = {
    slug: "dhwajarohan-2026-cards",
    href: "/dhwajarohan-2026#cards",
    title: {
      mr: "शंखनाद २५ ऑक्टो. व ध्वजारोहण ३१ ऑक्टो.: वेळ, ठिकाण, कसे पोहोचाल, व्हॉट्सॲप कार्ड",
      hi: "शंखनाद 25 अक्टू. और ध्वजारोहण 31 अक्टू.: समय, जगह, कैसे पहुँचें, व्हॉट्सऐप कार्ड",
      en: "Shankhnaad 25 Oct and flag hoisting 31 Oct: time, venue, getting there, WhatsApp cards",
    },
  };
  const tickerItems = [hubItem, ...blogArticles.slice(0, 2).map((a) => ({ slug: a.slug, title: a.title }))];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        {/* AdSense site verification without loading any script. The loader
            itself is in ThirdPartyScripts and waits for cookie consent. */}
        <meta name="google-adsense-account" content="ca-pub-4556049898419830" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("news-ticker-dismissed"))document.documentElement.dataset.tickerHidden="1"}catch(e){}',
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${notoSerifDevanagari.variable} antialiased`}
      >
        {/* Skip link renders first in tab order and stays visually hidden
            until it receives focus. The main content is anchored below. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LanguageProvider locale={locale}>
          <ChatProvider>
            <Navbar ticker={<NewsTicker items={tickerItems} />} />
            {/* Reserves the ticker's 28px, since the navbar is fixed. */}
            <div className="ticker-spacer h-7" aria-hidden="true" />
            <main id="main-content">{children}</main>
            <Footer />
            <KumbhSahayakLazy />
            <SOSButton />
            {/* Analytics, Google tag and AdSense load only after "Accept all". */}
            <ThirdPartyScripts />
            <ConsentBanner />
            <PWARegistrar />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

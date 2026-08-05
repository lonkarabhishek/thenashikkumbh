import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Noto_Serif_Devanagari } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/ChatContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KumbhSahayak from "@/components/KumbhSahayak";
import SOSButton from "@/components/SOSButton";

import { Analytics } from "@vercel/analytics/next";
import SchemaMarkup from "@/components/SchemaMarkup";
import PWARegistrar from "@/components/PWARegistrar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Optical sizing keeps the display cuts tight and the small sizes readable.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#C1272D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thenashikkumbh.com"),
  title: {
    default:
      "Nashik Kumbh Mela 2027 | Sacred Pilgrimage at Godavari River | नाशिक कुंभमेळा",
    template: "%s | Nashik Kumbh Mela 2027",
  },
  description:
    "Independent public-information initiative for the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027. Verified Amrit Snan schedule, emergency numbers, and pilgrim guidance. Every operational claim is sourced and dated.",
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
  openGraph: {
    title: "Nashik Kumbh Mela 2027 | Sacred Pilgrimage at Godavari | नाशिक कुंभमेळा",
    description:
      "Join millions at Nashik Kumbh Mela 2027. Sacred dates, holy ghats, pilgrim guide & spiritual events at the Godavari - the Ganga of the South. नाशिक कुंभमेळा २०२७.",
    url: "https://thenashikkumbh.com",
    siteName: "The Nashik Kumbh",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Nashik Kumbh Mela 2027 - नाशिक कुंभमेळा २०२७",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nashik Kumbh Mela 2027 | नाशिक कुंभमेळा",
    description:
      "Complete guide to Nashik Kumbh Mela 2027 - sacred dates, holy ghats, pilgrim tips & spiritual events at the Godavari River.",
  },
  alternates: {
    canonical: "https://thenashikkumbh.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${notoSerifDevanagari.variable} antialiased`}
      >
        {/* Skip link renders first in tab order and stays visually hidden
            until it receives focus. The main content is anchored below. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LanguageProvider>
          <ChatProvider>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <KumbhSahayak />
            <SOSButton />
            <Analytics />
            <PWARegistrar />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

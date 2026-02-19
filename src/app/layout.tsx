import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Serif_Devanagari } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Analytics } from "@vercel/analytics/next";
import LoadingScreen from "@/components/LoadingScreen";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thenashikkumbh.com"),
  title: {
    default:
      "Nashik Kumbh Mela 2027 | Sacred Pilgrimage at Godavari River | नाशिक कुंभमेळा",
    template: "%s | Nashik Kumbh Mela 2027",
  },
  description:
    "Your complete guide to Nashik Kumbh Mela 2027 (Simhastha Kumbh) - sacred bathing dates, Shahi Snan schedule, holy ghats of the Godavari River, pilgrim travel guide, spiritual events, Akhada processions, and the ancient heritage of one of Hinduism's most revered gatherings. नाशिक कुंभमेळा २०२७ मार्गदर्शिका.",
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
  openGraph: {
    title: "Nashik Kumbh Mela 2027 | Sacred Pilgrimage at Godavari | नाशिक कुंभमेळा",
    description:
      "Join millions at Nashik Kumbh Mela 2027. Sacred dates, holy ghats, pilgrim guide & spiritual events at the Godavari - the Ganga of the South. नाशिक कुंभमेळा २०२७.",
    url: "https://thenashikkumbh.com",
    siteName: "The Nashik Kumbh",
    locale: "en_IN",
    type: "website",
    alternateLocale: ["hi_IN", "mr_IN"],
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
        className={`${inter.variable} ${playfairDisplay.variable} ${notoSerifDevanagari.variable} antialiased`}
      >
        <LanguageProvider>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}

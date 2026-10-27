"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "@/lib/consent";
import { AD_CLIENT } from "@/data/ads";

const GA_ID = "G-G2LMJP7X4F";

/**
 * Every third-party script on the site, in one place, and none of them
 * renders until the visitor has chosen "Accept all" in the cookie notice:
 * Vercel Analytics, Google Analytics (gtag) and the AdSense loader.
 */
export default function ThirdPartyScripts() {
  const consent = useConsent();
  if (consent !== "all") return null;

  return (
    <>
      <Analytics />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
      </Script>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}

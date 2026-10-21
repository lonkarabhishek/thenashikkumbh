"use client";

import { useState } from "react";
import { MessageCircle, Share2 } from "lucide-react";
import { buildShareMessage, whatsappHref } from "@/lib/share";
import type { Locale } from "@/i18n/translations";

const UI = {
  heading: { en: "Forward this on WhatsApp", hi: "इसे व्हॉट्सऐप पर आगे भेजें", mr: "हे व्हॉट्सॲपवर पुढे पाठवा" },
  withImage: { en: "Share with image", hi: "तस्वीर के साथ भेजें", mr: "चित्रासह पाठवा" },
  whatsapp: { en: "Send on WhatsApp", hi: "व्हॉट्सऐप पर भेजें", mr: "व्हॉट्सॲपवर पाठवा" },
  copied: { en: "Copied", hi: "कॉपी हो गया", mr: "कॉपी झाले" },
};

/**
 * A short forwardable info block. "Share with image" uses the Web Share API
 * with the 1200x630 card attached where the phone allows it (same pattern as
 * the blog share button); the WhatsApp button is the plain-text fallback.
 */
export default function ForwardCard({
  text,
  url,
  imagePath,
  locale,
}: {
  text: string;
  url: string;
  imagePath?: string;
  locale: Locale;
}) {
  const [copied, setCopied] = useState(false);
  const msg = buildShareMessage(text, undefined, url);

  const shareWithImage = async () => {
    try {
      if (navigator.share) {
        if (imagePath && typeof File !== "undefined" && navigator.canShare) {
          try {
            const res = await fetch(imagePath);
            if (res.ok) {
              const blob = await res.blob();
              const file = new File([blob], imagePath.split("/").pop() || "share.jpg", { type: blob.type || "image/jpeg" });
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({ text: msg.full, files: [file] });
                return;
              }
            }
          } catch (err) {
            if ((err as DOMException)?.name === "AbortError") return;
          }
        }
        await navigator.share({ text: msg.textOnly, url });
        return;
      }
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(msg.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <aside className="mt-10 rounded-2xl border border-[#25D366]/40 bg-[#f0fbf4] p-5 sm:p-6" aria-label={UI.heading[locale]}>
      <h2 className="font-heading text-lg font-bold text-temple-900">{UI.heading[locale]}</h2>
      {imagePath && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagePath} alt="" width={1200} height={630} loading="lazy" className="mt-4 w-full rounded-xl border border-temple-100" />
      )}
      <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-temple-900">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={shareWithImage}
          data-share="forward-image"
          className="inline-flex items-center gap-2 rounded-full border border-temple-200 bg-white px-4 py-2 text-sm font-semibold text-temple-800 hover:border-saffron-400"
        >
          <Share2 className="h-4 w-4" />
          {copied ? UI.copied[locale] : UI.withImage[locale]}
        </button>
        <a
          href={whatsappHref(msg)}
          target="_blank"
          rel="noopener noreferrer"
          data-share="forward-whatsapp"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          {UI.whatsapp[locale]}
        </a>
      </div>
    </aside>
  );
}

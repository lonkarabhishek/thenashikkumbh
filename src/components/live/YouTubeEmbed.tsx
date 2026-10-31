"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/translations";
import { useConsent } from "@/lib/consent";
import { youtubeEmbedUrl } from "@/lib/youtube";

const UI = {
  play: { en: "Play video", hi: "वीडियो चलाएँ", mr: "व्हिडिओ प्ले करा" },
  video: { en: "Video", hi: "वीडियो", mr: "व्हिडिओ" },
};

/**
 * Privacy-enhanced YouTube player for a live update.
 * The iframe stays off until Accept all, or until the reader taps Play,
 * matching the cookie policy used for the Google Maps embed.
 */
export default function YouTubeEmbed({
  id,
  caption,
  credit,
  locale,
}: {
  id: string;
  caption: string;
  credit: string;
  locale: Locale;
}) {
  const consent = useConsent();
  const [play, setPlay] = useState(false);
  const src = youtubeEmbedUrl(id, play);
  if (!src) return null;
  const show = consent === "all" || play;

  return (
    <figure className="mt-3">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-temple-900">
        {show ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={caption}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={`${UI.play[locale]}: ${caption}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-cream-50"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600" aria-hidden>
              <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold">{UI.play[locale]}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-sm leading-snug text-temple-700">
        {caption}
        <span className="mt-0.5 block text-xs text-temple-500">
          {UI.video[locale]}: {credit}
        </span>
      </figcaption>
    </figure>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";

export interface TickerItem {
  slug: string;
  title: { en: string; hi: string; mr: string };
}

const COPY = {
  label: { en: "Latest", hi: "ताज़ा", mr: "ताजे" },
  region: { en: "Latest news", hi: "ताज़ा समाचार", mr: "ताज्या बातम्या" },
  close: { en: "Close news ticker", hi: "समाचार पट्टी बंद करें", mr: "बातम्यांची पट्टी बंद करा" },
};

const STORAGE_KEY = "news-ticker-dismissed";
const ROTATE_MS = 5000;
const FADE_MS = 250;

/**
 * Slim "Latest" bar for the top of every page. The first headline is in the
 * server HTML (so it is crawlable and has no layout shift); rotation, pausing
 * and dismissal only start in the browser. Fixed height: 28px (h-7), matched
 * by the spacer in the layout. Dismissal lasts for the browser session and is
 * applied before first paint by a tiny script in the layout (data-ticker-hidden).
 */
export default function NewsTicker({ items }: { items: TickerItem[] }) {
  const { t, locale } = useLanguage();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // static until we know otherwise
  const [hidden, setHidden] = useState(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const rotating = !reduced && !paused && items.length > 1;

  useEffect(() => {
    if (!rotating) return;
    let swap: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      clearInterval(id);
      clearTimeout(swap);
      setVisible(true);
    };
  }, [rotating, items.length]);

  useEffect(() => () => clearTimeout(touchTimer.current), []);

  const dismiss = useCallback(() => {
    setHidden(true);
    document.documentElement.dataset.tickerHidden = "1";
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Not remembered; it shows again on the next page load.
    }
  }, []);

  if (hidden || items.length === 0) return null;
  const item = items[reduced ? 0 : index] ?? items[0];

  return (
    <div
      role="region"
      aria-label={t(COPY.region)}
      className="ticker-bar h-7 border-b border-temple-100/70 bg-cream-100 text-temple-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => {
        clearTimeout(touchTimer.current);
        setPaused(true);
      }}
      onTouchEnd={() => {
        touchTimer.current = setTimeout(() => setPaused(false), 4000);
      }}
    >
      <div className="section-container flex h-full items-center gap-2 text-xs">
        <span className="shrink-0 font-semibold uppercase tracking-wide text-saffron-800">
          {t(COPY.label)}
        </span>
        <span className="h-3 w-px shrink-0 bg-temple-200" aria-hidden="true" />
        <p
          className="min-w-0 flex-1 truncate transition-opacity duration-200 ease-in-out"
          style={{ opacity: visible ? 1 : 0 }}
          aria-live={rotating ? "polite" : "off"}
        >
          <Link
            href={`/blog/${item.slug}`}
            className="hover:text-saffron-800 hover:underline focus-visible:underline"
          >
            {item.title[locale]}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t(COPY.close)}
          title={t(COPY.close)}
          className="-mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-temple-600 transition-colors hover:bg-cream-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-saffron-700"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

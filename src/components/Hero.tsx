"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

/* -- Slide data ------------------------------------------------- */

interface Slide {
  image: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaHref: string;
  devanagari?: string;
  showSacred?: boolean;
  showYear?: boolean;
}

const slides: Slide[] = [
  {
    image: "/images/gallery/kumbh-1.jpg",
    titleKey: "title",
    subtitleKey: "tagline",
    ctaKey: "exploreDates",
    ctaHref: "/dates",
    devanagari: "\u0950",
    showSacred: true,
    showYear: true,
  },
  {
    image: "/images/ramkund.jpg",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    ctaKey: "slide2Cta",
    ctaHref: "/ghats",
    devanagari: "\u0918\u093E\u091F",
  },
  {
    image: "/images/gallery/kumbh-3.jpg",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
    ctaKey: "slide3Cta",
    ctaHref: "/dates",
    devanagari: "\u0938\u094D\u0928\u093E\u0928",
  },
  {
    image: "/images/gallery/kumbh-8.jpg",
    titleKey: "slide4Title",
    subtitleKey: "slide4Subtitle",
    ctaKey: "slide4Cta",
    ctaHref: "/events",
    devanagari: "\u0909\u0924\u094D\u0938\u0935",
  },
  {
    image: "/images/gallery/kumbh-7.jpg",
    titleKey: "slide5Title",
    subtitleKey: "slide5Subtitle",
    ctaKey: "slide5Cta",
    ctaHref: "/guide",
    devanagari: "\u092F\u093E\u0924\u094D\u0930\u093E",
  },
];

const SLIDE_DURATION = 6000;

/* -- Component -------------------------------------------------- */

export default function Hero() {
  const { t, translations } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(true);

  /* Preload all slide images */
  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, []);

  /* Auto-advance timer */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  /* Restart progress bar animation when slide changes */
  useEffect(() => {
    if (progressRef.current) {
      const el = progressRef.current;
      el.style.transition = "none";
      el.style.width = "0%";
      void el.offsetWidth;
      el.style.transition = `width ${SLIDE_DURATION}ms linear`;
      el.style.width = "100%";
    }
  }, [currentSlide, isPaused]);

  /* Brief text fade when slide changes */
  useEffect(() => {
    setTextVisible(false);
    const timeout = setTimeout(() => setTextVisible(true), 60);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const slide = slides[currentSlide];
  const heroTranslations = translations.hero as Record<string, { en: string; hi: string; mr: string }>;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* -- Background Images Layer (CSS fade) ------------------- */}
      {slides.map((s, index) => (
        <div
          key={index}
          className="absolute inset-0 z-0"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,9,6,0.7) 0%, rgba(13,9,6,0.5) 40%, rgba(13,9,6,0.75) 100%)",
            }}
          />
        </div>
      ))}

      {/* -- Radial golden glow (static) -------------------------- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,215,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* -- Devanagari watermark (CSS opacity) ------------------- */}
      {slide.devanagari && (
        <div
          className="absolute z-[3] pointer-events-none select-none font-devanagari"
          style={{
            fontSize: "clamp(8rem, 20vw, 20rem)",
            color: "rgba(212,168,67,0.04)",
            right: "5%",
            top: "15%",
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          aria-hidden="true"
        >
          {slide.devanagari}
        </div>
      )}

      {/* -- Slide Content ---------------------------------------- */}
      <div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 lg:pt-24"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* Decorative top line */}
        <div
          className="mx-auto mb-8 h-[1px] w-40 md:w-64"
          style={{
            background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
          }}
        />

        {/* Sacred text - only on slide 1 */}
        {slide.showSacred && (
          <p className="font-devanagari text-gold-400 text-sm md:text-base tracking-[0.35em] mb-6 drop-shadow-[0_0_12px_rgba(255,215,0,0.25)]">
            {t(translations.hero.sacred)}
          </p>
        )}

        {/* Title */}
        <h1 className="mb-4">
          <span
            className="block text-4xl md:text-6xl lg:text-8xl font-heading font-bold text-white leading-[1.1]"
            style={{
              textShadow:
                "0 2px 30px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.08)",
            }}
          >
            {t(heroTranslations[slide.titleKey])}
          </span>
        </h1>

        {/* Year - only on slide 1 */}
        {slide.showYear && (
          <p className="mb-6">
            <span
              className="block text-5xl md:text-7xl lg:text-[9rem] font-heading font-bold leading-none bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
              }}
            >
              {t(translations.hero.year)}
            </span>
          </p>
        )}

        {/* Decorative divider with Om */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            className="block h-[1px] w-12 md:w-24"
            style={{
              background: "linear-gradient(90deg, transparent, #FFD700)",
            }}
          />
          <span className="text-gold-400 text-xl md:text-2xl font-devanagari drop-shadow-[0_0_16px_rgba(255,215,0,0.35)]">
            {"\u0950"}
          </span>
          <span
            className="block h-[1px] w-12 md:w-24"
            style={{
              background: "linear-gradient(90deg, #FFD700, transparent)",
            }}
          />
        </div>

        {/* Subtitle / Tagline */}
        <p className="text-base md:text-xl lg:text-2xl text-cream-200/80 font-heading italic tracking-wide mb-10 max-w-3xl mx-auto leading-relaxed">
          {t(heroTranslations[slide.subtitleKey])}
        </p>

        {/* CTA Buttons */}
        <div>
          <Link href={slide.ctaHref}>
            <span
              className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-base
                         text-temple-900 cursor-pointer select-none
                         shadow-[0_0_20px_rgba(255,215,0,0.25)]
                         hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,215,0,0.5)]
                         active:scale-[0.97] transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
              }}
            >
              {t(heroTranslations[slide.ctaKey])}
            </span>
          </Link>

          {/* Secondary CTA only on slide 1 */}
          {currentSlide === 0 && (
            <Link href="/ghats" className="ml-4">
              <span
                className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-base
                           text-gold-400 border-2 border-gold-500/60 cursor-pointer select-none
                           backdrop-blur-sm
                           hover:-translate-y-1 hover:bg-[rgba(255,215,0,0.12)] hover:border-[rgba(255,215,0,0.9)] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]
                           active:scale-[0.97] transition-all duration-200"
              >
                {t(translations.hero.exploreGhats)}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* -- Navigation Chevrons ---------------------------------- */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300
                   text-[rgba(212,168,67,0.5)] bg-[rgba(13,9,6,0.3)] border border-[rgba(212,168,67,0.15)]
                   backdrop-blur-sm
                   hover:text-[#FFD700] hover:bg-[rgba(212,168,67,0.15)] hover:border-[rgba(212,168,67,0.4)]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300
                   text-[rgba(212,168,67,0.5)] bg-[rgba(13,9,6,0.3)] border border-[rgba(212,168,67,0.15)]
                   backdrop-blur-sm
                   hover:text-[#FFD700] hover:bg-[rgba(212,168,67,0.15)] hover:border-[rgba(212,168,67,0.4)]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* -- Bottom Controls: Dots + Progress + Scroll ------------ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        {/* Slide indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative p-1"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: currentSlide === index ? 28 : 8,
                  height: 8,
                  background:
                    currentSlide === index
                      ? "linear-gradient(90deg, #FFD700, #FF8C00)"
                      : "rgba(255,255,255,0.25)",
                  boxShadow:
                    currentSlide === index
                      ? "0 0 12px rgba(255,215,0,0.5)"
                      : "none",
                }}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="w-32 h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #FFD700, #FF8C00)",
              width: "0%",
              transition: `width ${SLIDE_DURATION}ms linear`,
            }}
          />
        </div>

        {/* Scroll indicator - simple CSS animation */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer animate-[fadeInUp_2s_ease-out_forwards] opacity-0"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-cream-200/40 text-[10px] uppercase tracking-[0.3em]">
            {t(translations.hero.scrollDown)}
          </span>
          <ChevronDown
            className="w-4 h-4 text-cream-200/40 animate-[gentleBounce_2s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style jsx>{`
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useEffect, useState, useCallback, useRef } from "react";

/* ── Slide data ─────────────────────────────────────────────── */

interface Slide {
  image: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaHref: string;
  devanagari?: string; // optional large watermark character
  showSacred?: boolean; // show ॥ श्री गणेशाय नमः ॥ on this slide
  showYear?: boolean; // show the big year number
}

const slides: Slide[] = [
  {
    image: "/images/gallery/kumbh-1.jpg",
    titleKey: "title",
    subtitleKey: "tagline",
    ctaKey: "exploreDates",
    ctaHref: "/dates",
    devanagari: "ॐ",
    showSacred: true,
    showYear: true,
  },
  {
    image: "/images/ramkund.jpg",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    ctaKey: "slide2Cta",
    ctaHref: "/ghats",
    devanagari: "घाट",
  },
  {
    image: "/images/gallery/kumbh-3.jpg",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
    ctaKey: "slide3Cta",
    ctaHref: "/dates",
    devanagari: "स्नान",
  },
  {
    image: "/images/gallery/kumbh-8.jpg",
    titleKey: "slide4Title",
    subtitleKey: "slide4Subtitle",
    ctaKey: "slide4Cta",
    ctaHref: "/events",
    devanagari: "उत्सव",
  },
  {
    image: "/images/gallery/kumbh-7.jpg",
    titleKey: "slide5Title",
    subtitleKey: "slide5Subtitle",
    ctaKey: "slide5Cta",
    ctaHref: "/guide",
    devanagari: "यात्रा",
  },
];

const SLIDE_DURATION = 6000; // ms

/* ── Animation variants ─────────────────────────────────────── */

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const bounceVariants = {
  animate: {
    y: [0, 8, 0],
    transition: { duration: 2, ease: "easeInOut" as const, repeat: Infinity },
  },
};

/* ── Component ──────────────────────────────────────────────── */

export default function Hero() {
  const { t, translations } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  /* Golden particles — stable across re-renders */
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 3,
      })),
    []
  );

  /* Preload all slide images */
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
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
      // Force reflow
      void el.offsetWidth;
      el.style.transition = `width ${SLIDE_DURATION}ms linear`;
      el.style.width = "100%";
    }
  }, [currentSlide, isPaused]);

  /* Scroll listener for scroll indicator fade */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 200);
  const slide = slides[currentSlide];
  const heroTranslations = translations.hero as Record<string, { en: string; hi: string; mr: string }>;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Images Layer ────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentSlide}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <img
            src={slide.image}
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
        </motion.div>
      </AnimatePresence>

      {/* ── Radial golden glow ──────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,215,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Floating golden particles ───────────────────────────── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background:
                "radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,180,0,0.3))",
              boxShadow: `0 0 ${p.size * 3}px rgba(255,215,0,0.4)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(p.id) * 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Floating Devanagari watermark ───────────────────────── */}
      <AnimatePresence mode="sync">
        {slide.devanagari && (
          <motion.div
            key={`deva-${currentSlide}`}
            className="absolute z-[3] pointer-events-none select-none font-devanagari"
            style={{
              fontSize: "clamp(8rem, 20vw, 20rem)",
              color: "rgba(212,168,67,0.04)",
              right: "5%",
              top: "15%",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
          >
            {slide.devanagari}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide Content ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentSlide}`}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 lg:pt-24"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Decorative top line */}
          <motion.div
            variants={textItemVariants}
            className="mx-auto mb-8 h-[1px] w-40 md:w-64 origin-center"
            style={{
              background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
            }}
          />

          {/* Sacred text — only on slide 1 */}
          {slide.showSacred && (
            <motion.p
              variants={textItemVariants}
              className="font-devanagari text-gold-400 text-sm md:text-base tracking-[0.35em] mb-6 drop-shadow-[0_0_12px_rgba(255,215,0,0.25)]"
            >
              {t(translations.hero.sacred)}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1 variants={textItemVariants} className="mb-4">
            <span
              className="block text-4xl md:text-6xl lg:text-8xl font-heading font-bold text-white leading-[1.1]"
              style={{
                textShadow:
                  "0 2px 30px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.08)",
              }}
            >
              {t(heroTranslations[slide.titleKey])}
            </span>
          </motion.h1>

          {/* Year — only on slide 1 */}
          {slide.showYear && (
            <motion.p variants={textItemVariants} className="mb-6">
              <span
                className="block text-5xl md:text-7xl lg:text-[9rem] font-heading font-bold leading-none bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
                }}
              >
                {t(translations.hero.year)}
              </span>
            </motion.p>
          )}

          {/* Decorative divider with Om */}
          <motion.div
            variants={textItemVariants}
            className="flex items-center justify-center gap-4 mb-6 origin-center"
          >
            <span
              className="block h-[1px] w-12 md:w-24"
              style={{
                background: "linear-gradient(90deg, transparent, #FFD700)",
              }}
            />
            <span className="text-gold-400 text-xl md:text-2xl font-devanagari drop-shadow-[0_0_16px_rgba(255,215,0,0.35)]">
              ॐ
            </span>
            <span
              className="block h-[1px] w-12 md:w-24"
              style={{
                background: "linear-gradient(90deg, #FFD700, transparent)",
              }}
            />
          </motion.div>

          {/* Subtitle / Tagline */}
          <motion.p
            variants={textItemVariants}
            className="text-base md:text-xl lg:text-2xl text-cream-200/80 font-heading italic tracking-wide mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t(heroTranslations[slide.subtitleKey])}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={textItemVariants}>
            <Link href={slide.ctaHref}>
              <motion.span
                className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-base
                           text-temple-900 cursor-pointer select-none
                           shadow-[0_0_20px_rgba(255,215,0,0.25)]"
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 0 35px rgba(255,215,0,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {t(heroTranslations[slide.ctaKey])}
              </motion.span>
            </Link>

            {/* Secondary CTA only on slide 1 */}
            {currentSlide === 0 && (
              <Link href="/ghats" className="ml-4">
                <motion.span
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-base
                             text-gold-400 border-2 border-gold-500/60 cursor-pointer select-none
                             backdrop-blur-sm"
                  whileHover={{
                    y: -3,
                    backgroundColor: "rgba(255,215,0,0.12)",
                    borderColor: "rgba(255,215,0,0.9)",
                    boxShadow: "0 0 30px rgba(255,215,0,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {t(translations.hero.exploreGhats)}
                </motion.span>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation Chevrons ────────────────────────────────── */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300"
        style={{
          color: "rgba(212,168,67,0.5)",
          background: "rgba(13,9,6,0.3)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(212,168,67,0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#FFD700";
          e.currentTarget.style.background = "rgba(212,168,67,0.15)";
          e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(212,168,67,0.5)";
          e.currentTarget.style.background = "rgba(13,9,6,0.3)";
          e.currentTarget.style.borderColor = "rgba(212,168,67,0.15)";
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300"
        style={{
          color: "rgba(212,168,67,0.5)",
          background: "rgba(13,9,6,0.3)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(212,168,67,0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#FFD700";
          e.currentTarget.style.background = "rgba(212,168,67,0.15)";
          e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(212,168,67,0.5)";
          e.currentTarget.style.background = "rgba(13,9,6,0.3)";
          e.currentTarget.style.borderColor = "rgba(212,168,67,0.15)";
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* ── Bottom Controls: Dots + Progress + Scroll ──────────── */}
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

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollIndicatorOpacity }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-cream-200/40 text-[10px] uppercase tracking-[0.3em]">
            {t(translations.hero.scrollDown)}
          </span>
          <motion.div variants={bounceVariants} animate="animate">
            <ChevronDown className="w-4 h-4 text-cream-200/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

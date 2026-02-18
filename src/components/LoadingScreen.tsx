"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Devanagari title characters for the staggered letter-by-letter reveal
// ---------------------------------------------------------------------------
const devanagariTitle = "नाशिक कुंभमेळा २०२७";
const devanagariChars = (() => {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("mr", { granularity: "grapheme" });
    return Array.from(segmenter.segment(devanagariTitle), (s) => s.segment);
  }
  return Array.from(devanagariTitle);
})();

// ---------------------------------------------------------------------------
// Concentric ripple ring configuration
// ---------------------------------------------------------------------------
const rings = [0, 1, 2];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0D0906" }}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* -------------------------------------------------------------- */}
          {/* Ambient background glow – very subtle warm radial              */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,165,0,0.06) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          {/* -------------------------------------------------------------- */}
          {/* Floating particle field – tiny golden dots drifting upward      */}
          {/* -------------------------------------------------------------- */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  bottom: `-5%`,
                  background: `rgba(255, ${180 + Math.floor(Math.random() * 55)}, 0, ${0.15 + Math.random() * 0.25})`,
                }}
                animate={{
                  y: [0, -1000],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Centre content container                                       */}
          {/* -------------------------------------------------------------- */}
          <div className="relative flex flex-col items-center">
            {/* ============================================================ */}
            {/* OM SYMBOL – breathing / pulsing with golden glow aura        */}
            {/* ============================================================ */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer glow halo behind the Om */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.18) 0%, rgba(255,140,0,0.06) 50%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Second glow layer – slightly smaller, more opaque */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 110,
                  height: 110,
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,165,0,0.08) 60%, transparent 80%)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              {/* The OM character itself */}
              <motion.span
                className="relative select-none"
                style={{
                  fontSize: "5.5rem",
                  lineHeight: 1,
                  fontWeight: 400,
                  color: "#FFD700",
                  textShadow:
                    "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,165,0,0.35), 0 0 80px rgba(255,140,0,0.15)",
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  textShadow: [
                    "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,165,0,0.35), 0 0 80px rgba(255,140,0,0.15)",
                    "0 0 30px rgba(255,215,0,0.9), 0 0 60px rgba(255,165,0,0.5), 0 0 100px rgba(255,140,0,0.25)",
                    "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,165,0,0.35), 0 0 80px rgba(255,140,0,0.15)",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ॐ
              </motion.span>
            </motion.div>

            {/* ============================================================ */}
            {/* CONCENTRIC RIPPLE RINGS                                      */}
            {/* ============================================================ */}
            <div className="relative mt-6 flex items-center justify-center" style={{ height: 80 }}>
              {rings.map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full border"
                  style={{
                    borderColor: "rgba(255,215,0,0.4)",
                    width: 30,
                    height: 30,
                  }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{
                    scale: [0, 3.5 + i * 0.8],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeOut",
                  }}
                />
              ))}
              {/* Static small golden dot at the centre of the ripples */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: "#FFD700",
                  boxShadow: "0 0 8px rgba(255,215,0,0.6)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* ============================================================ */}
            {/* DEVANAGARI TITLE – letter-by-letter staggered reveal         */}
            {/* ============================================================ */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.055,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {devanagariChars.map((char, i) => (
                <motion.span
                  key={`char-${i}`}
                  className="inline-block"
                  style={{
                    fontFamily: "var(--font-devanagari), serif",
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    fontWeight: 400,
                    color: "#FFD700",
                    textShadow: "0 0 12px rgba(255,215,0,0.3)",
                    whiteSpace: "pre",
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* ============================================================ */}
            {/* ENGLISH TAGLINE – elegant fade-in                            */}
            {/* ============================================================ */}
            <motion.p
              className="mt-3 text-center tracking-[0.35em] uppercase"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)",
                color: "rgba(255,248,230,0.7)",
                letterSpacing: "0.35em",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            >
              Where Faith Meets Eternity
            </motion.p>

            {/* Decorative line divider */}
            <motion.div
              className="mt-5 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              <span
                className="block h-px"
                style={{
                  width: 40,
                  background:
                    "linear-gradient(to right, transparent, rgba(255,215,0,0.4))",
                }}
              />
              <span
                className="block h-1.5 w-1.5 rotate-45 rounded-sm"
                style={{ backgroundColor: "rgba(255,215,0,0.5)" }}
              />
              <span
                className="block h-px"
                style={{
                  width: 40,
                  background:
                    "linear-gradient(to left, transparent, rgba(255,215,0,0.4))",
                }}
              />
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* PROGRESS BAR – fills from left to right over 2.5 seconds       */}
          {/* ============================================================== */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64">
            {/* Track */}
            <div
              className="relative h-[2px] w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(255,215,0,0.1)" }}
            >
              {/* Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #FF8C00, #FFD700, #FFFACD)",
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(255,215,0,0.4)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: [0.22, 0.68, 0.35, 1] }}
              />
            </div>

            {/* Glow dot that travels with the progress bar tip */}
            <motion.div
              className="absolute -top-[3px] h-2 w-2 rounded-full"
              style={{
                background: "#FFD700",
                boxShadow: "0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.4)",
              }}
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2.5, ease: [0.22, 0.68, 0.35, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

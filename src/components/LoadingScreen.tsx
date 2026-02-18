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
          {/* Ambient background glow */}
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

          {/* Centre content */}
          <div className="relative flex flex-col items-center">
            {/* OM SYMBOL with breathing glow */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 140,
                  height: 140,
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,140,0,0.05) 50%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

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
                  scale: [1, 1.06, 1],
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

            {/* DEVANAGARI TITLE — letter-by-letter staggered reveal */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center"
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

            {/* Tagline */}
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

            {/* Simple gradient line divider */}
            <motion.div
              className="mt-5 mx-auto h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            />
          </div>

          {/* Bottom progress — simple thin line, no dot */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64">
            <div
              className="relative h-px w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(255,215,0,0.08)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full rounded-full"
                style={{
                  background: "rgba(255,215,0,0.35)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: [0.22, 0.68, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

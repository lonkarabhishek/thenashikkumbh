"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#0D0906" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Om symbol */}
            <motion.span
              className="select-none"
              style={{
                fontSize: "4rem",
                lineHeight: 1,
                color: "#FFD700",
                textShadow: "0 0 20px rgba(255,215,0,0.5)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              ॐ
            </motion.span>

            {/* Title */}
            <motion.p
              className="text-center"
              style={{
                fontFamily: "var(--font-devanagari), serif",
                fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
                color: "#FFD700",
                textShadow: "0 0 10px rgba(255,215,0,0.25)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              नाशिक कुंभमेळा २०२७
            </motion.p>

            {/* Progress line */}
            <div className="w-32 sm:w-48">
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
                  transition={{ duration: 1.0, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

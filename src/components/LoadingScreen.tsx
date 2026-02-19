"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressFill {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .loading-overlay {
          opacity: 1;
          transition: opacity 0.3s ease-out;
        }

        .loading-overlay.fade-out {
          opacity: 0;
        }

        .om-symbol {
          animation: fadeScale 0.4s ease-out forwards;
        }

        .loading-title {
          animation: fadeSlideUp 0.4s ease-out 0.2s forwards;
          opacity: 0;
        }

        .progress-bar {
          transform-origin: left;
          animation: progressFill 1.0s ease-out forwards;
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center loading-overlay ${fadeOut ? "fade-out" : ""}`}
        style={{ backgroundColor: "#0D0906" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Om symbol */}
          <span
            className="select-none om-symbol"
            style={{
              fontSize: "4rem",
              lineHeight: 1,
              color: "#FFD700",
              textShadow: "0 0 20px rgba(255,215,0,0.5)",
            }}
          >
            ॐ
          </span>

          {/* Title */}
          <p
            className="text-center loading-title"
            style={{
              fontFamily: "var(--font-devanagari), serif",
              fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
              color: "#FFD700",
              textShadow: "0 0 10px rgba(255,215,0,0.25)",
            }}
          >
            नाशिक कुंभमेळा २०२७
          </p>

          {/* Progress line */}
          <div className="w-32 sm:w-48">
            <div
              className="relative h-px w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(255,215,0,0.08)" }}
            >
              <div
                className="absolute inset-y-0 left-0 h-full rounded-full progress-bar"
                style={{
                  background: "rgba(255,215,0,0.35)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

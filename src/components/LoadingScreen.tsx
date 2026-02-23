"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Remove after 600ms - fast enough to not hurt LCP
    const t = setTimeout(() => setShow(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200"
      style={{
        backgroundColor: "#0D0906",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <span
        className="select-none"
        style={{
          fontSize: "3rem",
          color: "#FFD700",
          textShadow: "0 0 20px rgba(255,215,0,0.5)",
        }}
      >
        ॐ
      </span>
    </div>
  );
}

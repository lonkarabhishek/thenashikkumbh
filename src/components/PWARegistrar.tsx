"use client";

import { useEffect } from "react";

/**
 * Register the service worker.
 *
 * Kept tiny and defensive: we only register once, we never block render on
 * it, and we do nothing if the browser doesn't support service workers or
 * the page is served over HTTP (SW requires HTTPS or localhost).
 */
export default function PWARegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          // A registration failure should never surface to a pilgrim.
          if (typeof console !== "undefined") {
            console.warn("[pwa] service worker registration failed", err);
          }
        });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}

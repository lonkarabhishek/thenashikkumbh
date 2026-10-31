"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent, kept in the visitor's browser.
 *
 *   null         no choice yet: the banner shows, nothing third-party loads
 *   "essential"  only what the site needs to work; no analytics, no ads
 *   "all"        Google Analytics, Vercel Analytics, AdSense, the Google
 *                Maps embed and live-page YouTube players may load
 *
 * Every third-party loader reads this through useConsent(), so a script
 * cannot slip in before the visitor has chosen.
 */
export type Consent = "all" | "essential" | null;

const KEY = "consent-v1";
const EVENT = "consentchange";
const OPEN_EVENT = "consentopen";

export function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

export function setConsent(value: Exclude<Consent, null>) {
  const before = readConsent();
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  emit();
  if (before === "all" && value === "essential") {
    // Scripts already on the page cannot be unloaded. Drop the first-party
    // Google cookies we can reach and reload so nothing third-party remains.
    forgetTrackingCookies();
    window.location.reload();
  }
}

/** Best effort: Google Analytics cookies set on this domain. */
function forgetTrackingCookies() {
  try {
    const hosts = [window.location.hostname, "." + window.location.hostname.replace(/^www\./, "")];
    for (const raw of document.cookie.split(";")) {
      const name = raw.split("=")[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl|__gads|__gpi)/.test(name)) continue;
      for (const host of hosts) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${host}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  } catch {
    // Nothing to do.
  }
}

/** Reopen the banner (the "Cookie settings" link in the footer). */
export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The current choice; null on the server and until a choice is made. */
export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}

export function onConsentOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

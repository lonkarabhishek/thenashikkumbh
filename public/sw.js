/*
 * Nashik Kumbh — deliberately small service worker.
 *
 * The point is one honest offline capability: the emergency card (/emergency)
 * and the assets it needs must open when the network is down. We do NOT cache
 * live pages, alerts, or the schedule — those need to stay fresh, and a stale
 * "official notice" from three weeks ago is worse than nothing.
 *
 * Strategy:
 *   /{mr,hi,en}/emergency → cache-first, versioned. The only pages cached.
 *   everything else   → network, no cache-fallback beyond the offline card.
 *
 * Bump CACHE_VERSION whenever /emergency, its icons, or verified numbers
 * change so that phones with an old copy update on next visit.
 */

const CACHE_VERSION = "kumbh-emergency-v2";
// Pages live under a language prefix; offline, a navigation gets the card in
// the language of the URL it asked for, falling back to Marathi.
const OFFLINE_URLS = { mr: "/mr/emergency", hi: "/hi/emergency", en: "/en/emergency" };
const OFFLINE_URL = OFFLINE_URLS.mr;
const offlineUrlFor = (pathname) =>
  OFFLINE_URLS[pathname.split("/")[1]] || OFFLINE_URL;
const PRECACHE = [
  ...Object.values(OFFLINE_URLS),
  "/manifest.json",
  "/icon.png",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle same-origin GET navigations and same-origin static assets.
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // For navigations, try the network first; if offline, serve the card.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match(offlineUrlFor(url.pathname)).then(
          (res) =>
            res ||
            new Response("Offline", { status: 503, statusText: "Offline" }),
        ),
      ),
    );
    return;
  }

  // For the small precached set, cache-first.
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(
      caches
        .match(req)
        .then((cached) => cached || fetch(req).catch(() => new Response(""))),
    );
  }
});

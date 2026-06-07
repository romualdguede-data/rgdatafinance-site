/* ============================================================
   RG DATA & FINANCE INC. — Service Worker (Option B: Advanced)
   ============================================================ */

const CACHE_NAME = "rgdf-cache-v2";
const OFFLINE_URL = "/offline.html";

/* ------------------------------------------------------------
   FILES TO PRECACHE
------------------------------------------------------------ */
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/index-en.html",
  "/offers.html",
  "/offers-en.html",
  "/about.html",
  "/about-en.html",
  "/insights.html",
  "/insights-en.html",
  "/contact.html",
  "/contact-en.html",
  "/mentions-legales.html",
  "/legal-notice-en.html",

  "/style.css",
  "/manifest.json",

  "/assets/logo.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/icon-maskable-512.png",

  OFFLINE_URL
];

/* ============================================================
   INSTALL — Precache static assets
============================================================ */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ============================================================
   ACTIVATE — Clean old caches
============================================================ */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ============================================================
   FETCH — Advanced caching strategies
============================================================ */
self.addEventListener("fetch", event => {
  const request = event.request;

  // 1. HTML pages → Network First (fallback offline)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // 2. Images → Cache First + fallback placeholder
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then(cached => {
        return (
          cached ||
          fetch(request)
            .then(response => {
              const copy = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
              return response;
            })
            .catch(() => new Response("", { status: 404 }))
        );
      })
    );
    return;
  }

  // 3. CSS / JS / static → Stale While Revalidate
  if (["style", "script"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 4. Default → Cache First
  event.respondWith(
    caches.match(request).then(cached => {
      return (
        cached ||
        fetch(request)
          .then(response => {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
            return response;
          })
          .catch(() => cached)
      );
    })
  );
});

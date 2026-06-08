/**
 * RG DATA & FINANCE INC. - Service Worker Worker Core
 * Gestion du cache global et de la navigation résiliente hors ligne
 * Année de référence : 2026
 */

const CACHE_NAME = 'rg-data-finance-v1';

// Liste des fichiers essentiels à mettre en cache pour le fonctionnement hors ligne
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index-en.html',
  '/offers.html',
  '/offers-en.html',
  '/insights.html',
  '/insights-en.html',
  '/about.html',
  '/about-en.html',
  '/contact.html',
  '/contact-en.html',
  '/mentions-legales.html',
  '/legal-notice-en.html',
  '/offline.html',
  '/offline-en.html',
  '/style.css',
  '/style.min.css',
  '/manifest.json',
  '/app.js',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/icon-maskable.png',
  '/assets/logo.png'
];

// ============================================================
// 1. INSTALLATION : Mise en cache initiale des ressources
// ============================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources essentielles');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // Force le service worker actuel à devenir actif immédiatement
        return self.skipWaiting();
      })
  );
});

// ============================================================
// 2. ACTIVATION : Nettoyage des anciens caches obsolètes
// ============================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('[Service Worker] Suppression de l\'ancien cache :', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        // Permet au service worker de contrôler immédiatement toutes les pages ouvertes
        return self.clients.claim();
      })
  );
});

// ============================================================
// 3. INTERCEPTION DES REQUÊTES (FETCH STRATEGY)
// ============================================================
self.addEventListener('fetch', (event) => {
  // On ne traite que les requêtes de consultation standard (GET)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si le réseau répond positivement, on met à jour le cache de manière dynamique
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // En cas de coupure réseau, recherche prioritaire dans le cache existant
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Gestion fine du repli (Fallback) pour les documents HTML non consultés
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            // Détection de la langue cible d'après l'URL demandée
            if (event.request.url.includes('-en') || event.request.url.includes('/en/')) {
              return caches.match('/offline-en.html');
            }
            return caches.match('/offline.html');
          }
        });
      })
  );
});
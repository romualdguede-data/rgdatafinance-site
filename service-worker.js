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
  '/style.css',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/logo.png'
];

// 1. Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[:root] Mise en cache des ressources essentielles');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      // Force le service worker actuel à devenir actif sans attendre
      return self.skipWaiting();
    })
  );
});

// 2. Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[:root] Nettoyage de l\'ancien cache :', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      // Permet au service worker de contrôler immédiatement toutes les pages ouvertes
      return self.clients.claim();
    })
  );
});

// 3. Stratégie de Fetch : Réseau en priorité, repli sur le cache si hors ligne
self.addEventListener('fetch', (event) => {
  // On ne traite que les requêtes GET (évite de bloquer les formulaires POST ou extensions)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la réponse est valide, on clone et met à jour le cache dynamiquement
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // En cas de panne réseau (hors connexion), on cherche dans le cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Si une page HTML demandée n'est ni sur le réseau ni dans le cache,
          // on peut rediriger vers la page d'accueil par défaut
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
      })
  );
});
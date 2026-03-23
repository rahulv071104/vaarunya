/**
 * Service Worker for Image Caching Strategy
 * Implements cache-first strategy for images
 * Keeps images fresh while supporting offline access
 */

const CACHE_NAME = 'vaarunya-images-v1';
const IMAGE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

self.addEventListener('install', (event) => {
  console.log('Image Cache Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Image Cache Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only intercept image requests
  if (!event.request.url.includes('.public.blob.vercel-storage.com') && 
      !event.request.url.match(/\.(jpg|png|gif|webp|svg)$/i) &&
      !event.request.url.includes('_next/image')) {
    return;
  }

  // Cache-first strategy for images
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          // Check if cache is stale
          const cachedDate = response.headers.get('sw-fetched-on');
          if (cachedDate) {
            const cachedTime = parseInt(cachedDate);
            if (Date.now() - cachedTime < IMAGE_CACHE_DURATION) {
              return response;
            }
          }
        }

        // If not in cache or stale, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone and cache the response
            const responseToCache = networkResponse.clone();
            const responseWithDate = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: new Headers(responseToCache.headers),
            });
            responseWithDate.headers.set('sw-fetched-on', Date.now().toString());

            cache.put(event.request, responseWithDate.clone());
            return responseWithDate;
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(event.request);
          });
      });
    })
  );
});

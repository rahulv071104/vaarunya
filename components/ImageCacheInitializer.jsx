'use client';

import { useEffect } from 'react';

/**
 * ImageCacheInitializer
 * Registers service worker for image caching on app load
 */
export default function ImageCacheInitializer() {
  useEffect(() => {
    // Register service worker for image caching
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/image-cache-sw.js').catch((error) => {
        console.debug('Service Worker registration available but not required:', error);
      });
    }

    // Enable compression and caching headers via HTTP
    if (typeof document !== 'undefined') {
      // Optimize network requests
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = 'https://bltu2rsuakafo8tc.public.blob.vercel-storage.com';
      document.head.appendChild(link);

      // Preconnect to blob storage
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://bltu2rsuakafo8tc.public.blob.vercel-storage.com';
      document.head.appendChild(preconnect);
    }
  }, []);

  return null;
}

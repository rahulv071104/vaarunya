/**
 * Image Caching and Prefetching Strategy
 * - Implements service worker registration for offline support
 * - Prefetches images on viewport visibility
 * - Manages browser caching headers
 */

export const registerImageServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('/image-cache-sw.js', {
        scope: '/',
      });
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
};

/**
 * Prefetch images for better performance
 * Use for images that will be shown soon (e.g., next carousel slide)
 */
export const prefetchImage = (src) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
};

/**
 * Lazy load image when it enters viewport
 * Implementation for images using IntersectionObserver
 */
export const useIntersectionObserver = (ref, callback, options = {}) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, callback, options]);
};

/**
 * Generate blur placeholder using blurhash or simple base64
 * For instant visual feedback while image loads
 */
export const generateBlurPlaceholder = (color = '#e5e7eb') => {
  // Simple 1x1 pixel PNG as placeholder base64
  // This provides immediate visual feedback
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (canvas) {
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return canvas.toDataURL();
  }
  return null;
};

/**
 * Cache images in browser using IndexedDB
 * Useful for offline support
 */
export const cacheImageInDB = async (src, blob) => {
  if (typeof window !== 'undefined' && 'indexedDB' in window) {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('ImageCache', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
          e.target.result.createObjectStore('images', { keyPath: 'src' });
        };
      });

      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      store.put({ src, blob, timestamp: Date.now() });
    } catch (error) {
      console.warn('Failed to cache image in IndexedDB:', error);
    }
  }
};

/**
 * Retrieve cached image from IndexedDB
 */
export const getCachedImage = async (src) => {
  if (typeof window !== 'undefined' && 'indexedDB' in window) {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('ImageCache', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });

      return new Promise((resolve) => {
        const transaction = db.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');
        const request = store.get(src);
        request.onsuccess = () => resolve(request.result?.blob);
      });
    } catch (error) {
      console.warn('Failed to retrieve cached image:', error);
      return null;
    }
  }
};

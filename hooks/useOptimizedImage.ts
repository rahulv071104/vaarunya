'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * useOptimizedImage Hook
 * Handles image loading states, prefetching, and caching
 */
export const useOptimizedImage = (src: string, options: Record<string, any> = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if image is already cached
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.onload = () => {
        setIsCached(true);
        setIsLoading(false);
      };
      img.onerror = () => setHasError(true);
      img.src = src;
    }
  }, [src]);

  return {
    ref,
    isLoading,
    hasError,
    isCached,
  };
};

/**
 * usePrefetchImages Hook
 * Prefetches images for better perceived performance
 */
export const usePrefetchImages = (imageSources: string[] = []) => {
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;
    
    imageSources.forEach((src) => {
      if (!src) return;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [imageSources]);
};

/**
 * useIntersectionObserver Hook
 * Triggers callback when element enters viewport
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  options: { once?: boolean; threshold?: number; rootMargin?: string } = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        // Optionally stop observing
        if (options.once) {
          observer.unobserve(entry.target);
        }
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '50px',
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, callback, options]);
};

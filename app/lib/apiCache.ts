/**
 * Simple In-Memory Cache for API Responses
 * Caches static data to avoid unnecessary network requests
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

type CacheKey = string;

const cache = new Map<CacheKey, CacheEntry<any>>();

/**
 * Get cached data if it exists and is still valid
 */
export const getFromCache = <T>(key: CacheKey): T | null => {
  const entry = cache.get(key);
  
  if (!entry) return null;
  
  // If TTL is set and expired, remove from cache
  if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  
  return entry.data as T;
};

/**
 * Store data in cache
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds (optional, defaults to never expire)
 */
export const setInCache = <T>(key: CacheKey, data: T, ttl?: number): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

/**
 * Invalidate cache by key
 */
export const invalidateCache = (key: CacheKey): void => {
  cache.delete(key);
};

/**
 * Clear entire cache
 */
export const clearCache = (): void => {
  cache.clear();
};

/**
 * Get cache size (for debugging)
 */
export const getCacheSize = (): number => {
  return cache.size;
};

/**
 * Generate cache key for API endpoints
 */
export const generateCacheKey = (endpoint: string, params?: Record<string, any>): string => {
  if (!params) return endpoint;
  const queryString = new URLSearchParams(params).toString();
  return `${endpoint}?${queryString}`;
};

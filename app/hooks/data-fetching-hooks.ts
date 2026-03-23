import { getFromCache, setInCache, generateCacheKey } from '@/app/lib/apiCache';

interface Category {
  id: string;
  category_name: string;
  image: string | null;
  description: string | null;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
  image: string | null;
  category_id: string;
}

interface Product {
  uuid: string;
  hs_code: string;
  product_name: string;
  product_description: string | null;
  sub_category_id: string;
  subcategory_name: string;
  category_name: string;
}

/**
 * Get all categories with caching
 * Cache is persistent throughout the session since categories are static
 */
export const getCategories = async (): Promise<Category[]> => {
  const cacheKey = generateCacheKey("/api/categories");
  
  // Check cache first
  const cachedData = getFromCache<Category[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Fetch from API if not cached
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  
  // Cache indefinitely (static data)
  setInCache(cacheKey, data);
  
  return data;
};

/**
 * Get subcategories by category with caching
 * Cache is persistent throughout the session since subcategories are static
 */
export const getSubcategories = async (categoryId: string): Promise<Subcategory[]> => {
  const cacheKey = generateCacheKey("/api/subcategories", { category_id: categoryId });
  
  // Check cache first
  const cachedData = getFromCache<Subcategory[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Fetch from API if not cached
  const res = await fetch(`/api/subcategories?category_id=${encodeURIComponent(categoryId)}`);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  const data = await res.json();
  
  // Cache indefinitely (static data)
  setInCache(cacheKey, data);
  
  return data;
};

/**
 * Get products by subcategory with caching
 * Cache is persistent throughout the session since products are static
 */
export const getProducts = async (subcategoryId: string): Promise<Product[]> => {
  const cacheKey = generateCacheKey("/api/products", { sub_category_id: subcategoryId });
  
  // Check cache first
  const cachedData = getFromCache<Product[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Fetch from API if not cached
  const res = await fetch(`/api/products?sub_category_id=${encodeURIComponent(subcategoryId)}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  
  // Cache indefinitely (static data)
  setInCache(cacheKey, data);
  
  return data;
};
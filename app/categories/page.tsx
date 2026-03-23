'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/AppIcon';
import CategoryCard from '@/components/products/CategoryCard';
import SearchBar from '@/components/products/SearchBar';
import { getCategories, searchProducts } from '@/app/hooks/data-fetching-hooks';

// Types
interface Category {
  id: string;
  category_name: string;
  image: string | null;
  description: string | null;
}

interface ProductSuggestion {
  product_name: string;
  category_name: string | null;
  subcategory_name: string | null;
}

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Live product suggestions state
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized filtered categories
  const filteredCategories = useMemo(
    () =>
      categories.filter(category =>
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [categories, searchQuery]
  );

  // Suggestion names for SearchBar dropdown
  const suggestionNames = useMemo(
    () => productSuggestions.map(p => p.product_name).filter(Boolean),
    [productSuggestions]
  );

  // Toggle view mode
  const toggleViewMode = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  // Fetch categories
  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then(data => setCategories(data))
      .catch(err => setError('Failed to load categories. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  // Debounced live product search for suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (searchQuery.trim().length < 2) {
      setProductSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchProducts(searchQuery.trim());
        setProductSuggestions(results.slice(0, 8));
      } catch {
        // silently ignore suggestion errors
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  // Navigate to product's subcategory page
  const navigateToProduct = useCallback((product: ProductSuggestion) => {
    const categorySlug = (product.category_name ?? '').toLowerCase().trim();
    const subcategorySlug = (product.subcategory_name ?? '').toLowerCase().trim();
    if (!categorySlug || !subcategorySlug) return;
    router.push(
      `/categories/${encodeURIComponent(categorySlug)}/${encodeURIComponent(subcategorySlug)}?q=${encodeURIComponent(product.product_name)}`
    );
  }, [router]);

  // Handle suggestion selected from dropdown
  const handleSuggestionSelected = useCallback((name: string) => {
    const match = productSuggestions.find(p => p.product_name === name);
    if (match) navigateToProduct(match);
  }, [productSuggestions, navigateToProduct]);

  // Render breadcrumbs
  const renderBreadcrumbs = () => (
    <nav className="flex items-center justify-center text-sm text-secondary-light">
      <Link href="/categories" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Icon name="ChevronRight" size={16} className="mx-2" />
      <span className="text-secondary">Categories</span>
    </nav>
  );

  // Render content
  const renderContent = () => {
    if (isLoading) return <p className="text-center text-secondary">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-montserrat font-bold text-secondary-dark">Product Categories</h2>
          <div className="text-sm text-secondary-light">{filteredCategories.length} categories available</div>
        </div>
        {filteredCategories.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={{
                  id: category.id,
                  name: category.category_name,
                  image: category.image || 'https://via.placeholder.com/800',
                  description: category.description || `Explore products in ${category.category_name}`,
                }}
                onClick={() => window.location.href = `/categories/${encodeURIComponent(category.category_name.toLowerCase())}`}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary-light">No categories found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-gradient-to-br from-primary/10 to-accent pt-20 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-secondary-dark mb-6">
              Product Categories
            </h1>
            <p className="text-xl text-secondary-light max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of premium product categories.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search categories or products..."
                suggestions={suggestionNames}
                onSuggestionSelected={handleSuggestionSelected}
                onSearchSubmit={async (query: string) => {
                  if (!query) return;
                  const match = productSuggestions.find(
                    p => p.product_name?.toLowerCase() === query.toLowerCase()
                  ) ?? productSuggestions[0];
                  if (match) navigateToProduct(match);
                }}
              />
              <div className="flex items-center bg-white rounded-lg border border-border">
                <button
                  onClick={() => toggleViewMode('grid')}
                  className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-secondary hover:bg-accent'}`}
                >
                  <Icon name="Grid3X3" size={20} />
                </button>
                <button
                  onClick={() => toggleViewMode('list')}
                  className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'text-secondary hover:bg-accent'}`}
                >
                  <Icon name="List" size={20} />
                </button>
              </div>
            </div>
            {renderBreadcrumbs()}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default CategoriesPage;
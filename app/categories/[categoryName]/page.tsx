'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';
import Icon from '@/components/AppIcon';
import CategoryCard from '@/components/products/CategoryCard';
import SearchBar from '@/components/products/SearchBar';
import { getCategories, getSubcategories } from '@/app/hooks/data-fetching-hooks';

// Types
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

const SubcategoriesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const categoryName = decodeURIComponent(params.categoryName as string);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find selected category based on categoryName
  const selectedCategory = useMemo(
    () => categories.find(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase()),
    [categories, categoryName]
  );

  // Memoized filtered subcategories
  const filteredSubcategories = useMemo(
    () =>
      subcategories.filter(subcategory =>
        subcategory.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [subcategories, searchQuery]
  );

  // Toggle view mode
  const toggleViewMode = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  // Handle navigation to subcategory page
  const handleSubcategoryClick = useCallback(
    (subcategoryName: string) => {
      router.push(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName.toLowerCase())}`);
    },
    [router, categoryName]
  );

  // Fetch categories and subcategories
  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then(data => setCategories(data))
      .catch(err => setError('Failed to load categories. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory?.id) {
      setIsLoading(true);
      getSubcategories(selectedCategory.id)
        .then(data => setSubcategories(data))
        .catch(err => setError('Failed to load subcategories. Please try again.'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedCategory]);

  // Render breadcrumbs
  const renderBreadcrumbs = () => (
    <nav className="flex items-center justify-center text-sm text-secondary-light">
      <Link href="/homepage-premium-b2b-trade-platform" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Icon name="ChevronRight" size={16} className="mx-2" />
      <Link href="/categories" className="text-secondary">
        Categories
      </Link>
      <Icon name="ChevronRight" size={16} className="mx-2" />
      <span className="text-primary capitalize">{categoryName}</span>
    </nav>
  );

  // Render content
  const renderContent = () => {
    if (isLoading) return <p className="text-center text-secondary">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!selectedCategory) return <p className="text-center text-red-500">Category not found.</p>;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-montserrat font-bold text-secondary-dark mb-2">
              {selectedCategory.category_name}
            </h2>
            <p className="text-secondary-light">{filteredSubcategories.length} subcategories available</p>
          </div>
          <Link
            href="/categories"
            className="flex items-center px-4 py-2 text-primary hover:bg-accent rounded-lg transition-colors"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Back to Categories
          </Link>
        </div>
        {filteredSubcategories.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredSubcategories.map(subcategory => (
              <CategoryCard
                key={subcategory.id}
                category={{
                  id: subcategory.id,
                  name: subcategory.subcategory_name,
                  image: subcategory.image || 'https://via.placeholder.com/800',
                }}
                onClick={() => handleSubcategoryClick(subcategory.subcategory_name)} // Use handleSubcategoryClick
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary-light">No subcategories found.</p>
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
              Explore Subcategories
            </h1>
            <p className="text-xl text-secondary-light max-w-3xl mx-auto mb-8">
              Browse subcategories under {selectedCategory?.category_name || categoryName}.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search subcategories..." />
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

export default SubcategoriesPage;
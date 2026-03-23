'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '@/components/OptimizedImage';
import Icon from '@/components/AppIcon';
import { getCategories, getSubcategories } from '@/app/hooks/data-fetching-hooks';
import { usePrefetchImages } from '@/hooks/useOptimizedImage';

// Types
interface FetchedCategory {
  id: string;
  category_name: string;
  image: string | null;
  description: string | null;
}

interface Subcategory {
  id: string;
  subcategory_name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string | null;
  icon: string;
  subcategories: string[];
  seasonalAvailability: string;
  popularProducts: string[];
  certifications: string[];
}

const ProductCategories = () => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefetch images for better performance
  const imagesToPrefetch = useMemo(() => 
    categories.map(cat => cat.image).filter(Boolean),
    [categories]
  );
  usePrefetchImages(imagesToPrefetch);

  // Fetch categories
  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((data: FetchedCategory[]) => {
        const transformedCategories: Category[] = data.map(category => ({
          id: category.id,
          name: category.category_name,
          description: category.description || 'No description available',
          image: category.image || 'https://via.placeholder.com/800',
          icon: 'Box', // Default icon, update based on category if needed
          subcategories: [], // Will be populated by getSubcategories
          seasonalAvailability: 'Year-round',
          popularProducts: [],
          certifications: [],
        }));
        setCategories(transformedCategories);
      })
      .catch(err => setError('Failed to load categories. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch subcategories when a category is hovered
  useEffect(() => {
    if (hoveredCategory) {
      getSubcategories(hoveredCategory)
        .then((subs: Subcategory[]) => {
          setCategories(prev =>
            prev.map(cat =>
              cat.id === hoveredCategory
                ? { ...cat, subcategories: subs.map(s => s.subcategory_name) }
                : cat
            )
          );
        })
        .catch(err => console.error('Failed to load subcategories:', err));
    }
  }, [hoveredCategory]);

  // Handle category click
  const handleCategoryClick = (categoryName: string) => {
    router.push(`/categories/${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  // Handle subcategory click
  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    router.push(`/categories/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(subcategoryName.toLowerCase())}`);
  };

  // Render content
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-secondary">Loading categories...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    if (categories.length === 0) {
      return <p className="text-center text-secondary-light">No categories found.</p>;
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <OptimizedImage
                src={category.image || ''}
                alt={category.name}
                width={800}
                height={400}
                className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                priority={false}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                showLoader={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Category Icon */}
              <div className="absolute bottom-4 left-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon name={category.icon} size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-montserrat font-bold text-secondary-dark mb-3">
                {category.name}
              </h3>
             

              {/* Hover Content */}
              {hoveredCategory === category.id && (
                <div className="animation-fade-in">
                  <div className="border-t border-border-light pt-4">
                    <h4 className="font-montserrat font-semibold text-secondary-dark mb-2">
                      Subcategories
                    </h4>
                   <div className="grid grid-cols-2 gap-1 mb-4">
  {category.subcategories.length > 0 ? (
    category.subcategories.map((sub, index) => (
      <div
        key={index}
        className="flex items-center space-x-1 cursor-pointer group"
        onClick={() => handleSubcategoryClick(category.name, sub)}
      >
        <Icon
          name="ChevronRight"
          size={12}
          className="text-primary"
        />
        <span className="text-xs text-secondary-light group-hover:text-primary transition-colors duration-300">
          {sub}
        </span>
      </div>
    ))
  ) : (
    <p className="text-xs text-secondary-light">Loading subcategories...</p>
  )}
</div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div
                onClick={() => handleCategoryClick(category.name)}
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
              >
                Explore Category
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
          Explore Our Product Universe
        </h2>
        <p className="text-lg text-secondary-light max-w-3xl mx-auto">
          Discover our carefully curated collection of premium products, each
          representing the finest quality and authentic craftsmanship from
          India's diverse regions.
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default ProductCategories;
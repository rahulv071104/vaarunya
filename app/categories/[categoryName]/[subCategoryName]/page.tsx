'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/AppIcon';
import SearchBar from '@/components/products/SearchBar';
import { getCategories, getSubcategories, getProducts, Category, Subcategory, Product } from '@/app/hooks/data-fetching-hooks';

// Types
// specific types removed in favor of imported ones
// interface Category ...
// interface Subcategory ...
// interface Product ...

const ProductsPage: React.FC = () => {
  const params = useParams();
  const categoryName = decodeURIComponent(params.categoryName as string);
  const subcategoryName = decodeURIComponent(params.subCategoryName as string);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find selected category and subcategory based on URL parameters
  const selectedCategory = useMemo(
    () => categories.find(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase()),
    [categories, categoryName]
  );

  const selectedSubcategory = useMemo(
    () => subcategories.find(sub => sub.subcategory_name.toLowerCase() === subcategoryName.toLowerCase()),
    [subcategories, subcategoryName]
  );

  // Memoized filtered products
  const filteredProducts = useMemo(
    () =>
      products?.filter(product => {
        const matchesSearch =
          product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.product_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          false;
        return matchesSearch;
      }) || [],
    [products, searchQuery]
  );

  // Fetch data
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

  useEffect(() => {
    if (selectedSubcategory?.id) {
      setIsLoading(true);
      getProducts(selectedSubcategory.id)
        .then(data => setProducts(data))
        .catch(err => setError('Failed to load products. Please try again.'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedSubcategory]);

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
      <Link href={`/categories/${encodeURIComponent(categoryName)}`} className="text-secondary">
        {categoryName}
      </Link>
      <Icon name="ChevronRight" size={16} className="mx-2" />
      <span className="text-primary capitalize">{subcategoryName}</span>
    </nav>
  );

  // Render content
  const renderContent = () => {
    if (isLoading) return <p className="text-center text-secondary">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!selectedSubcategory) return <p className="text-center text-red-500">Subcategory not found.</p>;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-montserrat font-bold text-secondary-dark mb-2">
              {subcategoryName}
            </h2>
            <p className="text-secondary-light">{filteredProducts.length} products available</p>
          </div>
          <Link
            href={`/categories/${encodeURIComponent(categoryName)}`}
            className="flex items-center px-4 py-2 text-primary hover:bg-accent rounded-lg transition-colors"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Back to Subcategories
          </Link>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-border rounded-lg">
              <thead>
                <tr className="bg-primary/10 text-secondary-dark">
                  <th className="py-3 px-4 text-left font-montserrat font-semibold">HS Code</th>
                  <th className="py-3 px-4 text-left font-montserrat font-semibold">Product Name</th>
                  <th className="py-3 px-4 text-left font-montserrat font-semibold">Product Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.uuid || index} className="border-t border-border hover:bg-accent/10">
                    <td className="py-3 px-4 text-secondary">{product.hs_code}</td>
                    <td className="py-3 px-4 text-secondary">{product.product_name}</td>
                    <td className="py-3 px-4 text-secondary">{product.product_description || 'No description available'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-secondary-light text-center">No products found.</p>
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
              Explore Products
            </h1>
            <p className="text-xl text-secondary-light max-w-3xl mx-auto mb-8">
              Discover products under {subcategoryName}.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search products..." />
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

export default ProductsPage;
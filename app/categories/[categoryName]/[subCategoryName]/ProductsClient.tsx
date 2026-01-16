'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/AppIcon';
import SearchBar from '@/components/products/SearchBar';
import { Product } from '@/app/lib/db';

interface ProductsClientProps {
    categoryName: string;
    subcategoryName: string;
    initialProducts: Product[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({
    categoryName,
    subcategoryName,
    initialProducts
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Memoized filtered products
    const filteredProducts = useMemo(
        () =>
            initialProducts?.filter(product => {
                const matchesSearch =
                    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.product_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    false;
                return matchesSearch;
            }) || [],
        [initialProducts, searchQuery]
    );

    const renderBreadcrumbs = () => (
        <nav className="flex items-center justify-center text-sm text-secondary-light">
            <Link href="/homepage-premium-b2b-trade-platform" className="hover:text-primary transition-colors">
                Home
            </Link>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <Link href="/categories" className="text-secondary hover:text-primary transition-colors">
                Categories
            </Link>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <Link href={`/categories/${encodeURIComponent(categoryName)}`} className="text-secondary hover:text-primary transition-colors capitalize">
                {categoryName}
            </Link>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <span className="text-primary capitalize">{subcategoryName}</span>
        </nav>
    );

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
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-montserrat font-bold text-secondary-dark mb-2 capitalize">
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
            </div>
        </div>
    );
};

export default ProductsClient;

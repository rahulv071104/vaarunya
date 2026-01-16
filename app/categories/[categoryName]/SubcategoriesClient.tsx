'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/AppIcon';
import CategoryCard from '@/components/products/CategoryCard';
import SearchBar from '@/components/products/SearchBar';
import { Category, Subcategory } from '@/app/lib/db';

interface SubcategoriesClientProps {
    categoryName: string;
    selectedCategory: Category | undefined;
    initialSubcategories: Subcategory[];
}

const SubcategoriesClient: React.FC<SubcategoriesClientProps> = ({
    categoryName,
    selectedCategory,
    initialSubcategories
}) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Memoized filtered subcategories
    const filteredSubcategories = useMemo(
        () =>
            initialSubcategories.filter(subcategory =>
                subcategory.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [initialSubcategories, searchQuery]
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
            <span className="text-secondary capitalize">{categoryName}</span>
        </nav>
    );

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
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-montserrat font-bold text-secondary-dark mb-2">
                                {selectedCategory?.category_name || categoryName}
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
                                        description: `Explore ${subcategory.subcategory_name}`, // Simplified description if original was just category description
                                    }}
                                    onClick={() => handleSubcategoryClick(subcategory.subcategory_name)}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-secondary-light">No subcategories found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubcategoriesClient;

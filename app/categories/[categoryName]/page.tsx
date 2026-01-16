import React from 'react';
import { getCategoriesAction, getSubcategoriesAction } from '@/app/actions/data';
import SubcategoriesClient from './SubcategoriesClient';
import { Subcategory } from '@/app/lib/db';

export default async function SubcategoriesPage({ params }: { params: Promise<{ categoryName: string }> }) {
  const { categoryName: encodedCategoryName } = await params;
  const categoryName = decodeURIComponent(encodedCategoryName);

  // 1. Fetch all categories to find the ID of the current one (not ideal but matches previous logic without new DB index)
  const categories = await getCategoriesAction();
  const selectedCategory = categories.find(
    cat => cat.category_name.toLowerCase() === categoryName.toLowerCase()
  );

  let subcategories: Subcategory[] = [];
  if (selectedCategory) {
    // 2. Fetch subcategories for this ID
    subcategories = await getSubcategoriesAction({ category_id: selectedCategory.id });
  }

  return (
    <SubcategoriesClient
      categoryName={categoryName}
      selectedCategory={selectedCategory}
      initialSubcategories={subcategories}
    />
  );
}
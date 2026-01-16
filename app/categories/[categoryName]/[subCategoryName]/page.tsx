import React from 'react';
import { getCategoriesAction, getSubcategoriesAction, getProductsAction } from '@/app/actions/data';
import ProductsClient from './ProductsClient';
import { Product } from '@/app/lib/db';

export default async function ProductsPage({
  params
}: {
  params: Promise<{ categoryName: string; subCategoryName: string }>
}) {
  const { categoryName: encodedCategoryName, subCategoryName: encodedSubCategoryName } = await params;
  const categoryName = decodeURIComponent(encodedCategoryName);
  const subcategoryName = decodeURIComponent(encodedSubCategoryName);

  // 1. Fetch categories to find parent Category ID
  const categories = await getCategoriesAction();
  const selectedCategory = categories.find(
    cat => cat.category_name.toLowerCase() === categoryName.toLowerCase()
  );

  let products: Product[] = [];

  if (selectedCategory) {
    // 2. Fetch subcategories to find Subcategory ID
    const subcategories = await getSubcategoriesAction({ category_id: selectedCategory.id });
    const selectedSubcategory = subcategories.find(
      sub => sub.subcategory_name.toLowerCase() === subcategoryName.toLowerCase()
    );

    if (selectedSubcategory) {
      // 3. Fetch products for this Subcategory ID
      products = await getProductsAction({ sub_category_id: selectedSubcategory.id });
    }
  }

  return (
    <ProductsClient
      categoryName={categoryName}
      subcategoryName={subcategoryName}
      initialProducts={products}
    />
  );
}
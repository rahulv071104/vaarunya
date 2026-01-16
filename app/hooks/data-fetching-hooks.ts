import { getCategoriesAction, getSubcategoriesAction, getProductsAction } from '@/app/actions/data';

// Re-export types from db or keep local interfaces if they match?
// The local interfaces are slightly different (allowing nulls).
// Let's use the DB types to be safe and consistent.
import { Category, Subcategory, Product } from '@/app/lib/db';

export { type Category, type Subcategory, type Product };

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await getCategoriesAction();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export const getSubcategories = async (categoryId: string): Promise<Subcategory[]> => {
  try {
    return await getSubcategoriesAction({ category_id: categoryId });
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    throw new Error("Failed to fetch subcategories");
  }
};

export const getProducts = async (subcategoryId: string): Promise<Product[]> => {
  try {
    return await getProductsAction({ sub_category_id: subcategoryId });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
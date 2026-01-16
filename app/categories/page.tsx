import React from 'react';
import { getCategoriesAction } from '@/app/actions/data';
import CategoriesClient from './CategoriesClient';

export const metadata = {
  title: 'Global Product Categories | Vaarunya',
  description: 'Explore our wide range of export-quality product categories including Agro, Textiles, Spices, and more.',
};

export default async function CategoriesPage() {
  const categories = await getCategoriesAction();

  return <CategoriesClient initialCategories={categories} />;
}
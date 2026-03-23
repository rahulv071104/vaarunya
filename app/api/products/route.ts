import { NextResponse } from 'next/server';
import { api } from '@/app/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sub_category_id = searchParams.get('sub_category_id');
  const search = searchParams.get('search');

  try {
    const filters = {
      ...(sub_category_id ? { sub_category_id } : {}),
      ...(search ? { search } : {}),
    };
    const products = await api.getProducts(Object.keys(filters).length ? filters : undefined);

    // Flatten nested subcategory/category names so frontend gets them as top-level fields
    const flat = products.map((p: any) => ({
      uuid: p.uuid,
      hs_code: p.hs_code,
      product_name: p.product_name,
      product_description: p.product_description,
      sub_category_id: p.sub_category_id,
      subcategory_name: p.subcategory?.subcategory_name ?? null,
      category_name: p.subcategory?.category?.category_name ?? null,
    }));

    return NextResponse.json(flat, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
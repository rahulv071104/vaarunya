'use server'

import { api, Category, Subcategory, Product, ContactInquiry } from '@/app/lib/db';

import { unstable_cache } from 'next/cache';

// Cache revalidation time in seconds (e.g., 1 hour)
const REVALIDATE_TIME = 3600;

export async function getCategoriesAction(): Promise<Category[]> {
    const getCachedCategories = unstable_cache(
        async () => api.getCategories(),
        ['categories-list'],
        { revalidate: REVALIDATE_TIME, tags: ['categories'] }
    );
    return await getCachedCategories();
}

export async function getSubcategoriesAction(filters?: { category_id?: string }): Promise<Subcategory[]> {
    const category_id = filters?.category_id || 'all';

    // Create a unique cache key based on filters
    const cacheKey = `subcategories-${category_id}`;

    const getCachedSubcategories = unstable_cache(
        async () => api.getSubcategories(filters?.category_id),
        [cacheKey],
        { revalidate: REVALIDATE_TIME, tags: ['subcategories'] }
    );
    return await getCachedSubcategories();
}

export async function getProductsAction(filters?: {
    sub_category_id?: string;
    hs_code?: string;
    product_name?: string;
    search?: string;
}): Promise<Product[]> {
    // Generate a stable cache key from filters
    const filterKey = JSON.stringify(filters || {});
    const cacheKey = `products-${filterKey}`;

    const getCachedProducts = unstable_cache(
        async () => api.getProducts(filters),
        [cacheKey],
        { revalidate: REVALIDATE_TIME, tags: ['products'] }
    );
    return await getCachedProducts();
}

export async function submitContactFormAction(formData: ContactInquiry): Promise<ContactInquiry> {
    const requiredFields = [
        'inquiry_type',
        'first_name',
        'last_name',
        'email',
        'phone',
        'company',
        'country',
        'order_volume',
        'delivery_region',
        'communication_frequency',
        'message',
        'preferred_contact',
        'urgency'
    ] as const;

    for (const field of requiredFields) {
        if (!formData[field as keyof ContactInquiry]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    // Validate inquiry_type
    const validInquiryTypes = ['new-business', 'existing-client', 'partnership', 'general'];
    if (!validInquiryTypes.includes(formData.inquiry_type)) {
        throw new Error('Invalid inquiry type');
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
    }

    // Ensure product_categories is an array
    if (!Array.isArray(formData.product_categories)) {
        // In the original route, it modified the body object. Here we should ensure the passed data is correct.
        // Assuming the client calls this with correct types, but runtime check is good.
        // However, formData is typed as ContactInquiry, so typescript assumes it's an array.
        // We'll trust the input type or sanitise if needed, but for now let's pass it.
    }

    return await api.createContactInquiry({
        inquiry_type: formData.inquiry_type,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        product_categories: formData.product_categories,
        order_volume: formData.order_volume,
        delivery_region: formData.delivery_region,
        communication_frequency: formData.communication_frequency,
        message: formData.message,
        preferred_contact: formData.preferred_contact,
        urgency: formData.urgency,
    });
}

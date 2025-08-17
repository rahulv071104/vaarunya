import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Category {
  id: string
  category_name: string
  image: string
  description: string
}

export interface Subcategory {
  id: string
  subcategory_name: string
  image: string
  category_id: string
  category?: Category
}

export interface Product {
  uuid: string
  hs_code: string
  product_name: string
  product_description: string
  sub_category_id: string
  subcategory?: Subcategory & { category?: Category }
}

export interface ContactInquiry {
  id: string
  inquiry_type: 'new-business' | 'existing-client' | 'partnership' | 'general'
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  country: string
  product_categories: string[]
  order_volume: string
  delivery_region: string
  communication_frequency: string
  message: string
  preferred_contact: string
  urgency: string
  created_at: string
}

// API functions
export const api = {
  // Categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('category_name')
    
    if (error) throw error
    return data as Category[]
  },

  async createCategory(category_name: string, image: string, description: string) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ category_name, image, description }])
      .select()
      .single()
    
    if (error) throw error
    return data as Category
  },

  async updateCategory(id: string, category_name: string, image: string, description: string) {
    const { data, error } = await supabase
      .from('categories')
      .update({ category_name, image, description })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Category
  },

  async deleteCategory(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Subcategories
  async getSubcategories(category_id?: string) {
    let query = supabase
      .from('subcategories')
      .select(`
        *,
        category:categories(*)
      `)
    
    if (category_id) {
      query = query.eq('category_id', category_id)
    }
    
    const { data, error } = await query.order('subcategory_name')
    
    if (error) throw error
    return data as Subcategory[]
  },

  async createSubcategory(category_id: string, subcategory_name: string, image: string) {
    const { data, error } = await supabase
      .from('subcategories')
      .insert([{ category_id, subcategory_name, image }])
      .select(`
        *,
        category:categories(*)
      `)
      .single()
    
    if (error) throw error
    return data as Subcategory
  },

  async updateSubcategory(id: string, subcategory_name: string, image: string) {
    const { data, error } = await supabase
      .from('subcategories')
      .update({ subcategory_name, image })
      .eq('id', id)
      .select(`
        *,
        category:categories(*)
      `)
      .single()
    
    if (error) throw error
    return data as Subcategory
  },

  async deleteSubcategory(id: string) {
    const { error } = await supabase
      .from('subcategories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Products
  async getProducts(filters?: {
    sub_category_id?: string
    hs_code?: string
    product_name?: string
    search?: string
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        subcategory:subcategories(
          *,
          category:categories(*)
        )
      `)
    
    if (filters?.sub_category_id) {
      query = query.eq('sub_category_id', filters.sub_category_id)
    }
    
    if (filters?.hs_code) {
      query = query.eq('hs_code', filters.hs_code)
    }
    
    if (filters?.product_name) {
      query = query.eq('product_name', filters.product_name)
    }
    
    if (filters?.search) {
      query = query.or(`product_name.ilike.%${filters.search}%,hs_code.ilike.%${filters.search}%`)
    }
    
    const { data, error } = await query.order('product_name')
    
    if (error) throw error
    
    let products = data as Product[]
    
    return products
  },

  async createProduct(hs_code: string, product_name: string, product_description: string, sub_category_id: string) {
    const { data, error } = await supabase
      .from('products')
      .insert([{ hs_code, product_name, product_description, sub_category_id }])
      .select(`
        *,
        subcategory:subcategories(
          *,
          category:categories(*)
        )
      `)
      .single()
    
    if (error) throw error
    return data as Product
  },

  async updateProduct(uuid: string, updates: {
    hs_code?: string
    product_name?: string
    product_description?: string
  }) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('uuid', uuid)
      .select(`
        *,
        subcategory:subcategories(
          *,
          category:categories(*)
        )
      `)
      .single()
    
    if (error) throw error
    return data as Product
  },

  async deleteProduct(uuid: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('uuid', uuid)
    
    if (error) throw error
  },

  async getContactInquiries(filters?: { inquiry_type?: string; email?: string; company?: string }) {
    let query = supabase.from('contact_inquiries').select('*')

    if (filters?.inquiry_type) query = query.eq('inquiry_type', filters.inquiry_type)
    if (filters?.email) query = query.eq('email', filters.email)
    if (filters?.company) query = query.eq('company', filters.company)

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data as ContactInquiry[]
  },

  async createContactInquiry(payload: Omit<ContactInquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([payload])
      .select()
      .single()

    if (error) throw error
    return data as ContactInquiry
  },

  async updateContactInquiry(id: string, updates: Partial<Omit<ContactInquiry, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ContactInquiry
  },

  async deleteContactInquiry(id: string) {
    const { error } = await supabase.from('contact_inquiries').delete().eq('id', id)
    if (error) throw error
  }
}
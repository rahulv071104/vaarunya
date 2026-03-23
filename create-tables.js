require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.NEW_POSTGRES_URL_NON_POOLING;

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
    ca: null,
    cert: null,
    key: null
  }
});

async function createTables() {
  console.log('Creating tables in new Supabase instance...');

  try {
    await client.connect();

    // Create categories table
    console.log('Creating categories table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        category_name TEXT NOT NULL,
        image TEXT,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Created categories table');

    // Create subcategories table
    console.log('Creating subcategories table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.subcategories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        subcategory_name TEXT NOT NULL,
        image TEXT,
        category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Created subcategories table');

    // Create products table
    console.log('Creating products table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.products (
        uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        hs_code TEXT NOT NULL,
        product_name TEXT NOT NULL,
        product_description TEXT,
        sub_category_id UUID REFERENCES public.subcategories(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Created products table');

    // Create contact_inquiries table
    console.log('Creating contact_inquiries table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.contact_inquiries (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        phone TEXT,
        country TEXT,
        message TEXT NOT NULL,
        preferred_contact TEXT NOT NULL,
        urgency TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Created contact_inquiries table');

    console.log('🎉 Table creation completed!');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
  }
}

createTables();
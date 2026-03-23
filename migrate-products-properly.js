require('dotenv').config({ path: '.env_old' });
const { createClient } = require('@supabase/supabase-js');

// Old Supabase instance
const oldSupabase = createClient(
  'https://dxojeasnbzujaxjgkvzv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4b2plYXNuYnp1amF4amdrdnp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDU3MTcxNywiZXhwIjoyMDcwMTQ3NzE3fQ.WbTSJiPx7TfRz3e7hod4Nf_wvtCDFvNcUOLAsXbJKkg'
);

// New Supabase instance
const newSupabase = createClient(
  'https://kfzchfrmxcqfxcmbgikg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmemNoZnJteGNxZnhjbWJnaWtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDI3NTU2MiwiZXhwIjoyMDg5ODUxNTYyfQ.9nnYiNUeTibeDgfbtXuGLMUegU_Wh7-Btja9JZ5hN-w'
);

async function migrateProducts() {
  console.log('Starting products table migration from old to new Supabase...\n');

  try {
    // Get all products from old database
    console.log('Fetching products from old database...');
    const { data: oldProducts, error: fetchError } = await oldSupabase
      .from('products')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching products from old database:', fetchError.message);
      return;
    }

    if (!oldProducts || oldProducts.length === 0) {
      console.log('⚠️  No products found in old database');
      return;
    }

    console.log(`✅ Found ${oldProducts.length} products in old database`);
    console.log(`Sample product:`, JSON.stringify(oldProducts[0], null, 2));

    // Delete existing products in new database
    console.log('\nClearing existing products in new database...');
    const { error: deleteError } = await newSupabase
      .from('products')
      .delete()
      .neq('uuid', '00000000-0000-0000-0000-000000000000');

    if (deleteError && deleteError.code !== 'PGRST205') {
      console.log('⚠️  Error clearing products (non-critical):', deleteError.message);
    }

    // Insert products in batches
    const batchSize = 50;
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < oldProducts.length; i += batchSize) {
      const batch = oldProducts.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      console.log(`\nInserting batch ${batchNumber} (${batch.length} records)...`);

      const { data, error } = await newSupabase
        .from('products')
        .insert(batch)
        .select();

      if (error) {
        console.error(`❌ Error inserting batch ${batchNumber}:`, error.message);
        failureCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`✅ Successfully inserted ${batch.length} products`);
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`🎉 Migration completed!`);
    console.log(`   Total: ${oldProducts.length}`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`${'='.repeat(50)}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

migrateProducts();
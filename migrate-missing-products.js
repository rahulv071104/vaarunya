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

async function findAndMissingProducts() {
  console.log('Finding missing products...\n');

  try {
    // Get all products from old database
    const { data: oldProducts, error: fetchError } = await oldSupabase
      .from('products')
      .select('uuid');

    if (fetchError) {
      console.error('❌ Error fetching old products:', fetchError.message);
      return;
    }

    const oldUUIDs = new Set(oldProducts.map(p => p.uuid));
    console.log(`📊 Total products in old database: ${oldUUIDs.size}`);

    // Get all products from new database
    const { data: newProducts, error: newFetchError } = await newSupabase
      .from('products')
      .select('uuid');

    if (newFetchError) {
      console.error('❌ Error fetching new products:', newFetchError.message);
      return;
    }

    const newUUIDs = new Set(newProducts.map(p => p.uuid));
    console.log(`📊 Total products in new database: ${newUUIDs.size}`);

    // Find missing products
    const missingUUIDs = Array.from(oldUUIDs).filter(uuid => !newUUIDs.has(uuid));
    console.log(`\n❌ Missing ${missingUUIDs.length} products`);

    if (missingUUIDs.length === 0) {
      console.log('✅ All products migrated!');
      return;
    }

    // Fetch the missing products from old database
    console.log(`\nFetching ${missingUUIDs.length} missing products from old database...`);
    const { data: missingProducts, error: missingError } = await oldSupabase
      .from('products')
      .select('*')
      .in('uuid', missingUUIDs);

    if (missingError) {
      console.error('❌ Error fetching missing products:', missingError.message);
      return;
    }

    console.log(`✅ Found ${missingProducts.length} products to migrate`);

    // Process products: clean up null hs_code
    const processedProducts = missingProducts.map(p => ({
      ...p,
      hs_code: p.hs_code && p.hs_code.trim() ? p.hs_code : `UNCLASSIFIED_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }));

    console.log('\nSample products to migrate:');
    processedProducts.slice(0, 3).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.product_name} (hs_code: ${p.hs_code})`);
    });

    // Migrate in batches
    const batchSize = 25;
    let successCount = 0;
    let failureCount = 0;

    console.log(`\n\nMigrating ${processedProducts.length} products in batches of ${batchSize}...\n`);

    for (let i = 0; i < processedProducts.length; i += batchSize) {
      const batch = processedProducts.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      const { data, error } = await newSupabase
        .from('products')
        .insert(batch)
        .select();

      if (error) {
        console.log(`❌ Batch ${batchNumber} failed: ${error.message}`);
        failureCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`✅ Batch ${batchNumber} succeeded (${batch.length} products)`);
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`🎉 Missing products migration completed!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`${'='.repeat(50)}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

findAndMissingProducts();
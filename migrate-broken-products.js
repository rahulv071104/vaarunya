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

async function migrateBrokenProducts() {
  console.log('Migrating products with missing hs_code...\n');

  try {
    // Get all products from old database
    const { data: oldProducts, error: fetchError } = await oldSupabase
      .from('products')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching products:', fetchError.message);
      return;
    }

    // Filter products with null or missing hs_code
    const brokenProducts = oldProducts.filter(p => !p.hs_code || p.hs_code.trim() === '');
    console.log(`Found ${brokenProducts.length} products with missing hs_code`);
    
    if (brokenProducts.length === 0) {
      console.log('✅ No broken products to migrate');
      return;
    }

    // Fix by assigning a default hs_code
    const fixedProducts = brokenProducts.map(p => ({
      ...p,
      hs_code: p.hs_code || 'UNCLASSIFIED_' + Math.random().toString(36).substr(2, 9).toUpperCase()
    }));

    console.log(`\nFixing ${fixedProducts.length} products with default hs_code...\n`);

    // Insert fixed products in batches
    const batchSize = 25;
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < fixedProducts.length; i += batchSize) {
      const batch = fixedProducts.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      console.log(`Inserting batch ${batchNumber} (${batch.length} records)...`);

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
    console.log(`🎉 Fixed products migration completed!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`${'='.repeat(50)}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

migrateBrokenProducts();
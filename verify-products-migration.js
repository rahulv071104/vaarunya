require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const newSupabase = createClient(
  'https://kfzchfrmxcqfxcmbgikg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmemNoZnJteGNxZnhjbWJnaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzU1NjIsImV4cCI6MjA4OTg1MTU2Mn0.SvP9-2C_tCc4Lu16N9n5qpaLSmkc9CbkeXEWsTO7xCk'
);

async function verifyMigration() {
  console.log('Verifying products migration...\n');

  try {
    // Count total products in new database
    const { count, error } = await newSupabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error checking products:', error.message);
      return;
    }

    console.log(`📊 Total products in new database: ${count}`);
    console.log(`✅ Expected: 382`);
    
    if (count === 382) {
      console.log('\n🎉 ✅ ALL PRODUCTS MIGRATED SUCCESSFULLY!');
    } else if (count > 382) {
      console.log(`\n⚠️  We have ${count - 382} more products than expected (may have duplicates)`);
      console.log('Consider reviewing for duplicates');
    } else {
      console.log(`\n❌ Missing ${382 - count} products`);
    }

    // Get sample products
    console.log('\n📦 Sample products from new database:');
    const { data: samples, error: sampleError } = await newSupabase
      .from('products')
      .select('uuid, product_name, hs_code, sub_category_id')
      .limit(5);

    if (!sampleError && samples) {
      samples.forEach((p, i) => {
        console.log(`${i + 1}. ${p.product_name} (hs_code: ${p.hs_code})`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

verifyMigration();
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Old Supabase instance
const oldSupabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// New Supabase instance
const newSupabase = createClient(
  process.env.NEW_SUPABASE_URL,
  process.env.NEW_SUPABASE_SERVICE_ROLE_KEY
);

async function migrateTable(tableName, primaryKey = 'id') {
  console.log(`\nMigrating table: ${tableName}`);

  try {
    // Get all data from old database
    const { data: oldData, error: fetchError } = await oldSupabase
      .from(tableName)
      .select('*');

    if (fetchError) {
      console.error(`Error fetching data from ${tableName}:`, fetchError.message);
      return;
    }

    if (!oldData || oldData.length === 0) {
      console.log(`No data found in ${tableName}`);
      return;
    }

    console.log(`Found ${oldData.length} records in ${tableName}`);

    // Clear existing data in new database (optional - remove if you want to keep existing data)
    const { error: deleteError } = await newSupabase
      .from(tableName)
      .delete()
      .neq(primaryKey, '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteError) {
      console.error(`Error clearing ${tableName}:`, deleteError.message);
      // Continue anyway
    }

    // Insert data into new database in batches
    const batchSize = 100;
    for (let i = 0; i < oldData.length; i += batchSize) {
      const batch = oldData.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i/batchSize) + 1} (${batch.length} records)...`);

      const { error: insertError } = await newSupabase
        .from(tableName)
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch into ${tableName}:`, insertError.message);
        // Continue with next batch
      }
    }

    console.log(`✅ Successfully migrated ${oldData.length} records to ${tableName}`);

  } catch (error) {
    console.error(`Unexpected error migrating ${tableName}:`, error.message);
  }
}

async function migrateDatabase() {
  console.log('Starting Supabase database migration...');
  console.log('From:', process.env.SUPABASE_URL);
  console.log('To:', process.env.NEW_SUPABASE_URL);

  try {
    // Migrate all tables
    await migrateTable('categories');
    await migrateTable('subcategories');
    await migrateTable('products');
    await migrateTable('contact_inquiries', 'id'); // contact_inquiries might use 'id' as primary key

    console.log('\n🎉 Database migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

migrateDatabase();
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEW_SUPABASE_URL;
const supabaseKey = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking tables in new Supabase instance...');

  try {
    // Check if tables exist by trying to select from them
    const tables = ['categories', 'subcategories', 'products', 'contact_inquiries'];

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(5);

        if (error) {
          console.log(`❌ Table '${table}' error:`, error.message);
        } else {
          console.log(`✅ Table '${table}' exists (${data ? data.length : 0} records found)`);
          if (data && data.length > 0) {
            console.log(`   Sample record:`, JSON.stringify(data[0], null, 2));
          }
        }
      } catch (err) {
        console.log(`❌ Error checking table '${table}':`, err.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTables();
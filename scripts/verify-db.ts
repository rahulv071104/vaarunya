
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

console.log(`Connecting to ${supabaseUrl}...`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    try {
        const { data, error } = await supabase.from('categories').select('*').limit(1)
        if (error) {
            console.error('Supabase error:', error)
        } else {
            console.log('Connection successful!')
            console.log('Data sample:', data)
        }
    } catch (err) {
        console.error('Fetch error:', err)
    }
}

testConnection()


import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloaded_assets')

async function downloadImage(url: string, folder: string, filename: string) {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)

        // Determine extension from content-type or url
        let ext = path.extname(url).split('?')[0] // remove query params
        if (!ext) ext = '.png' // default fallback

        // Sanitize filename
        const safeFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ext
        const destPath = path.join(DOWNLOAD_DIR, folder, safeFilename)

        // Ensure directory exists
        await fs.promises.mkdir(path.dirname(destPath), { recursive: true })

        if (res.body) {
            // @ts-ignore
            await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(destPath));
            console.log(`Downloaded: ${folder}/${safeFilename}`)
        }
    } catch (error) {
        console.error(`Error downloading ${filename} from ${url}:`, error)
    }
}

async function main() {
    console.log('Starting download process...')

    // 1. Categories
    console.log('\nFetching Categories...')
    const { data: categories, error: catError } = await supabase.from('categories').select('*')
    if (catError) {
        console.error('Error fetching categories:', catError)
    } else {
        console.log(`Found ${categories.length} categories. Downloading images...`)
        for (const cat of categories) {
            if (cat.image) {
                await downloadImage(cat.image, 'categories', cat.category_name)
            } else {
                console.warn(`No image for category: ${cat.category_name}`)
            }
        }
    }

    // 2. Subcategories
    console.log('\nFetching Subcategories with Category info...')

    // Select * and the related category info.
    // Note: The related table alias depends on your DB schema setup. Usually 'categories' or 'category:categories'.
    // We try 'category:categories(category_name)' based on common Supabase patterns.
    const { data: subcategories, error: subError } = await supabase
        .from('subcategories')
        .select(`
            *,
            category:categories(category_name)
        `)

    if (subError) {
        console.error('Error fetching subcategories:', subError)
    } else {
        // @ts-ignore
        console.log(`Found ${subcategories.length} subcategories. Downloading images...`)
        // @ts-ignore
        for (const sub of subcategories) {
            if (sub.image) {
                // @ts-ignore
                const categoryName = sub.category?.category_name

                let folderPath = 'subcategories'
                if (categoryName) {
                    const safeCatName = categoryName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
                    folderPath = `subcategories/${safeCatName}`
                } else {
                    console.warn(`Subcategory ${sub.subcategory_name} has no linked category name.`)
                }

                await downloadImage(sub.image, folderPath, sub.subcategory_name)
            } else {
                console.warn(`No image for subcategory: ${sub.subcategory_name}`)
            }
        }
    }

    console.log('\nDownload complete! Check the "downloaded_assets" folder.')
}

main()

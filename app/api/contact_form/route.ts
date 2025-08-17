
import { NextResponse } from 'next/server'
import { api } from '@/app/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const inquiry_type = searchParams.get('inquiry_type') || undefined
    const email = searchParams.get('email') || undefined
    const company = searchParams.get('company') || undefined

    const inquiries = await api.getContactInquiries({
      inquiry_type,
      email,
      company,
    })

    return NextResponse.json(inquiries, { status: 200 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    const requiredFields = [
      'inquiry_type',
      'first_name',
      'last_name',
      'email',
      'phone',
      'company',
      'country',
      'order_volume',
      'delivery_region',
      'communication_frequency',
      'message',
      'preferred_contact',
      'urgency'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate inquiry_type
    const validInquiryTypes = ['new-business', 'existing-client', 'partnership', 'general']
    if (!validInquiryTypes.includes(body.inquiry_type)) {
      return NextResponse.json({ error: 'Invalid inquiry type' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Ensure product_categories is an array
    if (!Array.isArray(body.product_categories)) {
      body.product_categories = body.product_categories ? [body.product_categories] : []
    }

    const newInquiry = await api.createContactInquiry({
      inquiry_type: body.inquiry_type,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      country: body.country,
      product_categories: body.product_categories,
      order_volume: body.order_volume,
      delivery_region: body.delivery_region,
      communication_frequency: body.communication_frequency,
      message: body.message,
      preferred_contact: body.preferred_contact,
      urgency: body.urgency,
    })

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    console.error('Create inquiry error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

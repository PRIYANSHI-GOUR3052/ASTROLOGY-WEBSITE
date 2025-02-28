import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Attempting to create contact:', body)

    if (!prisma) {
      console.error('Prisma client is not initialized')
      return NextResponse.json(
        { success: false, error: 'Database connection error' },
        { status: 500 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date(body.timestamp),
      },
    })

    console.log('Contact created successfully:', contact)

    return NextResponse.json({ 
      success: true, 
      contact,
      message: 'Contact form submitted successfully' 
    })

  } catch (error) {
    console.error('Contact submission error details:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit contact form',
        details: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.message : 'Unknown error'
          : undefined
      },
      { status: 500 }
    )
  }
} 
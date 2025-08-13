import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const zodiacSigns = await prisma.zodiac_signs.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image_url: true
      }
    });

    return NextResponse.json(zodiacSigns);
  } catch (error) {
    console.error('Error fetching zodiac signs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch zodiac signs' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new zodiac sign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, image_data } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingSign = await prisma.zodiac_signs.findUnique({
      where: { slug }
    });

    if (existingSign) {
      return NextResponse.json(
        { error: 'Zodiac sign with this slug already exists' },
        { status: 400 }
      );
    }

    let image_url = null;
    if (image_data) {
      try {
        image_url = await uploadImage(image_data);
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const newZodiacSign = await prisma.zodiac_signs.create({
      data: {
        name,
        slug,
        image_url
      }
    });

    return NextResponse.json(newZodiacSign, { status: 201 });
  } catch (error) {
    console.error('Error creating zodiac sign:', error);
    return NextResponse.json(
      { error: 'Failed to create zodiac sign' },
      { status: 500 }
    );
  }
}

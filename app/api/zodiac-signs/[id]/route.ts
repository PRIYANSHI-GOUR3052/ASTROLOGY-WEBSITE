import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

// PUT update zodiac sign
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, slug, image_data } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists for other zodiac signs
    const existingSign = await prisma.zodiac_signs.findFirst({
      where: {
        slug,
        id: { not: id }
      }
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

    const updatedZodiacSign = await prisma.zodiac_signs.update({
      where: { id },
      data: {
        name,
        slug,
        image_url: image_url || null,
        updated_at: new Date()
      }
    });

    return NextResponse.json(updatedZodiacSign);
  } catch (error) {
    console.error('Error updating zodiac sign:', error);
    return NextResponse.json(
      { error: 'Failed to update zodiac sign' },
      { status: 500 }
    );
  }
}

// DELETE zodiac sign
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.zodiac_signs.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Zodiac sign deleted successfully' });
  } catch (error) {
    console.error('Error deleting zodiac sign:', error);
    return NextResponse.json(
      { error: 'Failed to delete zodiac sign' },
      { status: 500 }
    );
  }
}

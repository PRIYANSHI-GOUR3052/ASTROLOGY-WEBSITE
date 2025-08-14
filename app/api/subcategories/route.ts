import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

// POST create new subcategory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, category_id, image_data } = body;

    if (!name || !slug || !category_id) {
      return NextResponse.json(
        { error: 'Name, slug, and category_id are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.categories.findUnique({
      where: { id: category_id }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists in this category
    const existingSubcategory = await prisma.subcategories.findFirst({
      where: {
        slug,
        category_id
      }
    });

    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory with this slug already exists in this category' },
        { status: 400 }
      );
    }

    let image_url = null;
    if (image_data) {
      try {
        image_url = await uploadImage(image_data, 'subcategories');
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const newSubcategory = await prisma.subcategories.create({
      data: {
        name,
        slug,
        category_id,
        image_url
      }
    });

    return NextResponse.json(newSubcategory, { status: 201 });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}

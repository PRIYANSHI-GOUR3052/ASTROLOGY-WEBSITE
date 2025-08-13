import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      where: {
        // You can add any filters here if needed
      },
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image_url: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image_data, banner_data } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await prisma.categories.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    let image_url = null;
    let banner_url = null;

    // Upload category image
    if (image_data) {
      try {
        image_url = await uploadImage(image_data, 'categories');
      } catch (uploadError) {
        console.error('Category image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload category image' },
          { status: 500 }
        );
      }
    }

    // Upload category banner
    if (banner_data) {
      try {
        banner_url = await uploadImage(banner_data, 'categories/banners');
      } catch (uploadError) {
        console.error('Category banner upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload category banner' },
          { status: 500 }
        );
      }
    }

    const newCategory = await prisma.categories.create({
      data: {
        name,
        slug,
        description,
        image_url,
        banner_url
      },
      include: {
        subcategories: true
      }
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

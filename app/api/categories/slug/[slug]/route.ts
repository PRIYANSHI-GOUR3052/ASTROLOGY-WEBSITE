import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET category by slug for banner and description
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const category = await prisma.categories.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image_url: true,
        banner_url: true,
        created_at: true,
        updated_at: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true,
            image_url: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Return category data with banner and description
    return NextResponse.json({
      success: true,
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image_url: category.image_url,
        banner_url: category.banner_url,
        created_at: category.created_at,
        updated_at: category.updated_at,
        subcategories: category.subcategories
      }
    });

  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

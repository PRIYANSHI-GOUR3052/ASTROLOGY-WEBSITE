import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      sku,
      category_id,
      zodiac_id,
      images = []
    } = body;

    // Validate required fields
    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }

    // Create the product
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category_id: category_id ? parseInt(category_id) : null,
        zodiac_id: zodiac_id ? parseInt(zodiac_id) : null,
        image_url: images.length > 0 ? images[0] : null, // Use first image as main image
        is_active: true,
        available: 0
      }
    });

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const zodiac = searchParams.get('zodiac');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {
      is_active: true
    };

    if (category) {
      where.category_id = parseInt(category);
    }

    if (zodiac) {
      where.zodiac_id = parseInt(zodiac);
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        include: {
          category: true,
          zodiac: true
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.products.count({ where })
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

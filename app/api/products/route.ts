import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API received data:', body);
    
    const {
      name,
      description,
      sellingPrice,
      originalPrice,
      discountPrice,
      sku,
      categoryId,
      zodiacSign,
      images = [],
      // Auto-pricing fields
      productType,
      weight,
      carats,
      quantity,
      quality,
      clarity,
      color,
      mukhi,
      material,
      perCaratPrice,
      perGramPrice,
      perPiecePrice
    } = body;

    // Validate required fields
    if (!name || !description || !sellingPrice) {
      return NextResponse.json(
        { error: 'Name, description, and selling price are required' },
        { status: 400 }
      );
    }

    // Create the product (without images)
    const productData = {
      name,
      description,
      price: parseFloat(sellingPrice),
      original_price: originalPrice ? parseFloat(originalPrice) : null,
      discount_price: discountPrice ? parseFloat(discountPrice) : null,
      sku,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      category_id: categoryId ? parseInt(categoryId) : null,
      zodiac_id: zodiacSign ? parseInt(zodiacSign) : null,
      image_url: null, // Remove image_url from products table
      is_active: true,
      available: 0,
      
      // Auto-pricing fields
      product_type: productType || null,
      weight: weight ? parseFloat(weight) : null,
      carats: carats ? parseFloat(carats) : null,
      quantity: quantity ? parseInt(quantity) : null,
      quality: quality || null,
      clarity: clarity || null,
      color: color || null,
      mukhi: mukhi || null,
      material: material || null,
      per_carat_price: perCaratPrice ? parseFloat(perCaratPrice) : null,
      per_gram_price: perGramPrice ? parseFloat(perGramPrice) : null,
      per_piece_price: perPiecePrice ? parseFloat(perPiecePrice) : null
    };
    
    console.log('Creating product with data:', productData);
    
    const newProduct = await prisma.products.create({
      data: productData
    });

    console.log('Product created successfully:', newProduct);

    // Store images in product_media table if images are provided
    if (images && images.length > 0) {
      try {
        const mediaData = images.map((imageUrl: string, index: number) => ({
          type: 'image',
          url: imageUrl,
          alt_text: `${name} image ${index + 1}`,
          title: `${name} image ${index + 1}`
        }));

        const mediaResponse = await fetch(`${request.nextUrl.origin}/api/products/${newProduct.id}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ media: mediaData })
        });

        if (mediaResponse.ok) {
          const mediaResult = await mediaResponse.json();
          console.log('Media stored successfully:', mediaResult);
        } else {
          console.error('Failed to store media:', await mediaResponse.json());
        }
      } catch (mediaError) {
        console.error('Error storing media:', mediaError);
        // Don't fail the product creation if media storage fails
      }
    }
    
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

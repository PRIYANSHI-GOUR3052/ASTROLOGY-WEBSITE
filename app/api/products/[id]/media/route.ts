import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Add media to a product
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const { media } = body; // Array of media objects

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    if (!Array.isArray(media)) {
      return NextResponse.json(
        { error: 'Media must be an array' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create media entries
    const mediaEntries = await Promise.all(
      media.map(async (mediaItem, index) => {
        return prisma.product_media.create({
          data: {
            product_id: productId,
            media_type: mediaItem.type || 'image',
            media_url: mediaItem.url,
            alt_text: mediaItem.alt_text || `Product image ${index + 1}`,
            title: mediaItem.title || `Product image ${index + 1}`,
            sort_order: index,
            is_primary: index === 0, // First image is primary
            is_active: true
          }
        });
      })
    );

    return NextResponse.json({
      success: true,
      media: mediaEntries,
      message: 'Product media added successfully'
    });

  } catch (error) {
    console.error('Error adding product media:', error);
    return NextResponse.json(
      { error: 'Failed to add product media' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Get all media for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const media = await prisma.product_media.findMany({
      where: {
        product_id: productId,
        is_active: true
      },
      orderBy: {
        sort_order: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      media
    });

  } catch (error) {
    console.error('Error fetching product media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product media' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update media for a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const { media } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete existing media
    await prisma.product_media.deleteMany({
      where: { product_id: productId }
    });

    // Create new media entries
    const mediaEntries = await Promise.all(
      media.map(async (mediaItem: { type: string; url: string; alt_text: string; title: string }, index: number) => {
        return prisma.product_media.create({
          data: {
            product_id: productId,
            media_type: mediaItem.type || 'image',
            media_url: mediaItem.url,
            alt_text: mediaItem.alt_text || `Product image ${index + 1}`,
            title: mediaItem.title || `Product image ${index + 1}`,
            sort_order: index,
            is_primary: index === 0,
            is_active: true
          }
        });
      })
    );

    return NextResponse.json({
      success: true,
      media: mediaEntries,
      message: 'Product media updated successfully'
    });

  } catch (error) {
    console.error('Error updating product media:', error);
    return NextResponse.json(
      { error: 'Failed to update product media' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Remove all media for a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await prisma.product_media.deleteMany({
      where: { product_id: productId }
    });

    return NextResponse.json({
      success: true,
      message: 'Product media deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product media:', error);
    return NextResponse.json(
      { error: 'Failed to delete product media' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

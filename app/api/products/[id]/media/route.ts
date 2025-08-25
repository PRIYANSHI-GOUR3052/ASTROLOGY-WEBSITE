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
      console.log('Invalid media data received in POST:', { media, body });
      return NextResponse.json(
        { error: 'Media must be an array' },
        { status: 400 }
      );
    }

    if (media.length === 0) {
      return NextResponse.json(
        { error: 'Media array cannot be empty' },
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

    // Validate each media item has required structure
    for (let i = 0; i < media.length; i++) {
      const item = media[i];
      if (!item || typeof item !== 'object') {
        return NextResponse.json(
          { error: `Media item at index ${i} must be an object` },
          { status: 400 }
        );
      }
      if (!item.url) {
        return NextResponse.json(
          { error: `Media item at index ${i} is missing required 'url' field` },
          { status: 400 }
        );
      }
    }

    // Create media entries
    const mediaEntries = await Promise.all(
      media.map(async (mediaItem, index) => {
                 return prisma.product_media.create({
           data: {
             product_id: productId,
             media_type: mediaItem.type || 'image',
             media_url: mediaItem.url || mediaItem.media_url || '', // Handle both field names
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

    console.log('Fetching media for product ID:', productId);

    const media = await prisma.product_media.findMany({
      where: {
        product_id: productId,
        is_active: true
      },
      orderBy: {
        sort_order: 'asc'
      }
    });

    console.log('Found media items:', media.length, media);

    // Transform media to include both media_url and url for frontend compatibility
    const transformedMedia = media.map(item => ({
      ...item,
      url: item.media_url, // Add url field for frontend compatibility
      image_url: item.media_url // Alternative field name
    }));

    return NextResponse.json({
      success: true,
      media: transformedMedia
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

    // Validate media array
    if (!media || !Array.isArray(media)) {
      console.log('Invalid media data received:', { media, body });
      return NextResponse.json(
        { error: 'Media must be an array' },
        { status: 400 }
      );
    }

    console.log('Processing media update for product:', productId, 'with', media.length, 'items');

    // Delete existing media
    await prisma.product_media.deleteMany({
      where: { product_id: productId }
    });

    // If no media provided, just return success (all media deleted)
    if (media.length === 0) {
      return NextResponse.json({
        success: true,
        media: [],
        message: 'Product media updated successfully (all media removed)'
      });
    }

    // Validate each media item has required structure
    for (let i = 0; i < media.length; i++) {
      const item = media[i];
      if (!item || typeof item !== 'object') {
        return NextResponse.json(
          { error: `Media item at index ${i} must be an object` },
          { status: 400 }
        );
      }
      if (!item.url) {
        return NextResponse.json(
          { error: `Media item at index ${i} is missing required 'url' field` },
          { status: 400 }
        );
      }
    }

         // Create new media entries
     const mediaEntries = await Promise.all(
       media.map(async (mediaItem: { type: string; url: string; media_url?: string; alt_text: string; title: string }, index: number) => {
        // Validate required fields
        if (!mediaItem.url) {
          throw new Error(`Media item at index ${index} is missing required 'url' field`);
        }
        
                 return prisma.product_media.create({
           data: {
             product_id: productId,
             media_type: mediaItem.type || 'image',
             media_url: mediaItem.url || mediaItem.media_url || '', // Handle both field names
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

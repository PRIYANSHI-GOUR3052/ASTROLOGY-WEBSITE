import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await prisma.products.findUnique({
      where: { id },
      include: {
        category: true,
        zodiac: true,
        product_media: true,
        product_meta: true,
        product_shipping: true,
        product_stock: {
          take: 1
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }

    // Update the product (without images)
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        sku: sku || null,
        category_id: category_id ? parseInt(category_id) : null,
        zodiac_id: zodiac_id ? parseInt(zodiac_id) : null,
        image_url: null, // Remove image_url from products table
        updated_at: new Date()
      }
    });

    // Update media if images are provided
    if (images && images.length > 0) {
      try {
        const mediaData = images.map((imageUrl: string, index: number) => ({
          type: 'image',
          url: imageUrl,
          alt_text: `${name} image ${index + 1}`,
          title: `${name} image ${index + 1}`
        }));

        const mediaResponse = await fetch(`${request.nextUrl.origin}/api/products/${id}/media`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ media: mediaData })
        });

        if (mediaResponse.ok) {
          const mediaResult = await mediaResponse.json();
          console.log('Media updated successfully:', mediaResult);
        } else {
          console.error('Failed to update media:', await mediaResponse.json());
        }
      } catch (mediaError) {
        console.error('Error updating media:', mediaError);
        // Don't fail the product update if media update fails
      }
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Delete the product (related records will be deleted due to cascade)
    await prisma.products.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

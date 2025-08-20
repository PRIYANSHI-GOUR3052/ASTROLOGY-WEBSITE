import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Create or update product meta data
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();

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

    // Check if meta data already exists
    const existingMeta = await prisma.product_meta.findUnique({
      where: { product_id: productId }
    });

    if (existingMeta) {
      return NextResponse.json(
        { error: 'Meta data already exists for this product. Use PUT to update.' },
        { status: 400 }
      );
    }

    // Create new meta data
    const result = await prisma.product_meta.create({
      data: {
        product_id: productId,
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        meta_keywords: body.meta_keywords || null,
        og_title: body.og_title || null,
        og_description: body.og_description || null,
        og_image: body.og_image || null,
        twitter_title: body.twitter_title || null,
        twitter_description: body.twitter_description || null,
        twitter_image: body.twitter_image || null,
        canonical_url: body.canonical_url || null
      }
    });

    return NextResponse.json({
      success: true,
      meta: result,
      message: 'Product meta data saved successfully'
    });

  } catch (error) {
    console.error('Error saving product meta data:', error);
    return NextResponse.json(
      { error: 'Failed to save product meta data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Get product meta data
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

    const meta = await prisma.product_meta.findUnique({
      where: { product_id: productId }
    });

    return NextResponse.json({
      success: true,
      meta
    });

  } catch (error) {
    console.error('Error fetching product meta data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product meta data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update product meta data
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();

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

    const result = await prisma.product_meta.upsert({
      where: { product_id: productId },
      update: {
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        meta_keywords: body.meta_keywords || null,
        og_title: body.og_title || null,
        og_description: body.og_description || null,
        og_image: body.og_image || null,
        twitter_title: body.twitter_title || null,
        twitter_description: body.twitter_description || null,
        twitter_image: body.twitter_image || null,
        canonical_url: body.canonical_url || null,
        updated_at: new Date()
      },
      create: {
        product_id: productId,
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        meta_keywords: body.meta_keywords || null,
        og_title: body.og_title || null,
        og_description: body.og_description || null,
        og_image: body.og_image || null,
        twitter_title: body.twitter_title || null,
        twitter_description: body.twitter_description || null,
        twitter_image: body.twitter_image || null,
        canonical_url: body.canonical_url || null
      }
    });

    return NextResponse.json({
      success: true,
      meta: result,
      message: 'Product meta data updated successfully'
    });

  } catch (error) {
    console.error('Error updating product meta data:', error);
    return NextResponse.json(
      { error: 'Failed to update product meta data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Remove product meta data
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

    await prisma.product_meta.delete({
      where: { product_id: productId }
    });

    return NextResponse.json({
      success: true,
      message: 'Product meta data deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product meta data:', error);
    return NextResponse.json(
      { error: 'Failed to delete product meta data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

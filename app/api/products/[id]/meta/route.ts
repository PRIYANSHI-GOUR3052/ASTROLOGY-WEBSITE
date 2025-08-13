import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to generate SEO-friendly text
function generateSEOText(text: string, maxLength: number = 160): string {
  if (!text) return '';
  
  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) return cleanText;
  
  // Truncate at word boundary
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

// Helper function to generate keywords from text
function generateKeywords(text: string, productName: string = ''): string {
  if (!text && !productName) return '';
  
  const fullText = `${productName} ${text}`.toLowerCase();
  
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs'
  ]);
  
  // Extract words and filter
  const words = fullText
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
  
  // Return top 10 keywords
  return words.slice(0, 10).join(', ');
}

// GET meta data for a product
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

    // Use raw query since Prisma client doesn't recognize product_meta model
    const metaData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        meta_title,
        meta_description,
        meta_keywords,
        og_title,
        og_description,
        og_image,
        twitter_title,
        twitter_description,
        twitter_image,
        canonical_url,
        structured_data,
        created_at,
        updated_at
      FROM product_meta 
      WHERE product_id = ${productId}
    ` as any[];

    if (metaData.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(metaData[0]);
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

// POST create meta data for a product
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      meta_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      canonical_url,
      structured_data
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists and get product info for auto-generation
    const product = await prisma.$queryRaw`
      SELECT name, description, image_url FROM products WHERE id = ${productId}
    ` as any[];

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productInfo = product[0];

    // Auto-generate SEO data if not provided
    const autoMetaTitle = meta_title || generateSEOText(productInfo.name, 60);
    const autoMetaDescription = meta_description || generateSEOText(productInfo.description, 160);
    const autoMetaKeywords = meta_keywords || generateKeywords(productInfo.description, productInfo.name);
    const autoOgTitle = og_title || autoMetaTitle;
    const autoOgDescription = og_description || autoMetaDescription;
    const autoOgImage = og_image || productInfo.image_url;
    const autoTwitterTitle = twitter_title || autoMetaTitle;
    const autoTwitterDescription = twitter_description || autoMetaDescription;
    const autoTwitterImage = twitter_image || productInfo.image_url;

    // Check if meta data already exists
    const existingMeta = await prisma.$queryRaw`
      SELECT id FROM product_meta WHERE product_id = ${productId}
    ` as any[];

    if (existingMeta.length > 0) {
      return NextResponse.json(
        { error: 'Meta data already exists for this product. Use PUT to update.' },
        { status: 400 }
      );
    }

    // Create meta data
    await prisma.$queryRaw`
      INSERT INTO product_meta (
        product_id, meta_title, meta_description, meta_keywords,
        og_title, og_description, og_image,
        twitter_title, twitter_description, twitter_image,
        canonical_url, structured_data, created_at, updated_at
      ) VALUES (
        ${productId}, 
        ${autoMetaTitle}, 
        ${autoMetaDescription}, 
        ${autoMetaKeywords},
        ${autoOgTitle},
        ${autoOgDescription},
        ${autoOgImage},
        ${autoTwitterTitle},
        ${autoTwitterDescription},
        ${autoTwitterImage},
        ${canonical_url || null},
        ${structured_data ? JSON.stringify(structured_data) : null},
        NOW(), 
        NOW()
      )
    ` as any[];

    // Get the created meta data
    const newMetaData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        meta_title,
        meta_description,
        meta_keywords,
        og_title,
        og_description,
        og_image,
        twitter_title,
        twitter_description,
        twitter_image,
        canonical_url,
        structured_data,
        created_at,
        updated_at
      FROM product_meta 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(newMetaData[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product meta data:', error);
    return NextResponse.json(
      { error: 'Failed to create product meta data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT update meta data for a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      meta_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      canonical_url,
      structured_data
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if meta data exists
    const existingMeta = await prisma.$queryRaw`
      SELECT id FROM product_meta WHERE product_id = ${productId}
    ` as any[];

    if (existingMeta.length === 0) {
      return NextResponse.json(
        { error: 'Meta data not found. Use POST to create.' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (meta_title !== undefined) {
      updateFields.push('meta_title = ?');
      updateValues.push(meta_title);
    }
    if (meta_description !== undefined) {
      updateFields.push('meta_description = ?');
      updateValues.push(meta_description);
    }
    if (meta_keywords !== undefined) {
      updateFields.push('meta_keywords = ?');
      updateValues.push(meta_keywords);
    }
    if (og_title !== undefined) {
      updateFields.push('og_title = ?');
      updateValues.push(og_title);
    }
    if (og_description !== undefined) {
      updateFields.push('og_description = ?');
      updateValues.push(og_description);
    }
    if (og_image !== undefined) {
      updateFields.push('og_image = ?');
      updateValues.push(og_image);
    }
    if (twitter_title !== undefined) {
      updateFields.push('twitter_title = ?');
      updateValues.push(twitter_title);
    }
    if (twitter_description !== undefined) {
      updateFields.push('twitter_description = ?');
      updateValues.push(twitter_description);
    }
    if (twitter_image !== undefined) {
      updateFields.push('twitter_image = ?');
      updateValues.push(twitter_image);
    }
    if (canonical_url !== undefined) {
      updateFields.push('canonical_url = ?');
      updateValues.push(canonical_url);
    }
    if (structured_data !== undefined) {
      updateFields.push('structured_data = ?');
      updateValues.push(structured_data ? JSON.stringify(structured_data) : null);
    }

    updateFields.push('updated_at = NOW()');

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Update meta data
    const updateQuery = `
      UPDATE product_meta 
      SET ${updateFields.join(', ')} 
      WHERE product_id = ${productId}
    `;

    await prisma.$executeRawUnsafe(updateQuery, ...updateValues);

    // Get the updated meta data
    const updatedMetaData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        meta_title,
        meta_description,
        meta_keywords,
        og_title,
        og_description,
        og_image,
        twitter_title,
        twitter_description,
        twitter_image,
        canonical_url,
        structured_data,
        created_at,
        updated_at
      FROM product_meta 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(updatedMetaData[0]);
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

// DELETE meta data for a product
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

    // Delete meta data
    await prisma.$queryRaw`
      DELETE FROM product_meta WHERE product_id = ${productId}
    `;

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

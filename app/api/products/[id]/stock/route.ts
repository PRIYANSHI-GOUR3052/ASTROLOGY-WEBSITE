import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



// GET stock data for a product
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

    // Use raw query since Prisma client doesn't recognize product_stock model
    const stockData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        sku,
        quantity,
        reserved,
        min_stock,
        max_stock,
        location,
        batch_number,
        expiry_date,
        cost_price,
        created_at,
        updated_at
      FROM product_stock 
      WHERE product_id = ${productId}
    ` as any[];

    if (stockData.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(stockData[0]);
  } catch (error) {
    console.error('Error fetching product stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product stock data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create stock data for a product
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      quantity = 0,
      reserved = 0,
      min_stock = 0,
      max_stock,
      location,
      batch_number,
      expiry_date,
      cost_price
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists and get product info for SKU generation
    const product = await prisma.$queryRaw`
      SELECT p.name, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ${productId}
    ` as any[];

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productInfo = product[0];

    // Check if stock data already exists
    const existingStock = await prisma.$queryRaw`
      SELECT id FROM product_stock WHERE product_id = ${productId}
    ` as any[];

    if (existingStock.length > 0) {
      return NextResponse.json(
        { error: 'Stock data already exists for this product. Use PUT to update.' },
        { status: 400 }
      );
    }

    // Get SKU from the product table since it's managed there
    const productSKU = await prisma.$queryRaw`
      SELECT sku FROM products WHERE id = ${productId}
    ` as any[];
    
    const finalSKU = productSKU.length > 0 ? productSKU[0].sku : null;

    // Create stock data
    await prisma.$queryRaw`
      INSERT INTO product_stock (
        product_id, sku, quantity, reserved, min_stock, max_stock,
        location, batch_number, expiry_date, cost_price, created_at, updated_at
      ) VALUES (
        ${productId}, 
        ${finalSKU}, 
        ${quantity}, 
        ${reserved}, 
        ${min_stock}, 
        ${max_stock || null}, 
        ${location || null}, 
        ${batch_number || null}, 
        ${expiry_date ? new Date(expiry_date) : null}, 
        ${cost_price ? parseFloat(cost_price) : null}, 
        NOW(), 
        NOW()
      )
    ` as any[];

    // Get the created stock data
    const newStockData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        sku,
        quantity,
        reserved,
        min_stock,
        max_stock,
        location,
        batch_number,
        expiry_date,
        cost_price,
        created_at,
        updated_at
      FROM product_stock 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(newStockData[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product stock data:', error);
    return NextResponse.json(
      { error: 'Failed to create product stock data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT update stock data for a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      quantity,
      reserved,
      min_stock,
      max_stock,
      location,
      batch_number,
      expiry_date,
      cost_price
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if stock data exists
    const existingStock = await prisma.$queryRaw`
      SELECT id FROM product_stock WHERE product_id = ${productId}
    ` as any[];

    if (existingStock.length === 0) {
      return NextResponse.json(
        { error: 'Stock data not found. Use POST to create.' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    if (quantity !== undefined) {
      updateFields.push('quantity = ?');
      updateValues.push(quantity);
    }
    if (reserved !== undefined) {
      updateFields.push('reserved = ?');
      updateValues.push(reserved);
    }
    if (min_stock !== undefined) {
      updateFields.push('min_stock = ?');
      updateValues.push(min_stock);
    }
    if (max_stock !== undefined) {
      updateFields.push('max_stock = ?');
      updateValues.push(max_stock);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }
    if (batch_number !== undefined) {
      updateFields.push('batch_number = ?');
      updateValues.push(batch_number);
    }
    if (expiry_date !== undefined) {
      updateFields.push('expiry_date = ?');
      updateValues.push(expiry_date ? new Date(expiry_date) : null);
    }
    if (cost_price !== undefined) {
      updateFields.push('cost_price = ?');
      updateValues.push(cost_price ? parseFloat(cost_price) : null);
    }

    updateFields.push('updated_at = NOW()');

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Update stock data
    const updateQuery = `
      UPDATE product_stock 
      SET ${updateFields.join(', ')} 
      WHERE product_id = ${productId}
    `;

    await prisma.$executeRawUnsafe(updateQuery, ...updateValues);

    // Get the updated stock data
    const updatedStockData = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        sku,
        quantity,
        reserved,
        min_stock,
        max_stock,
        location,
        batch_number,
        expiry_date,
        cost_price,
        created_at,
        updated_at
      FROM product_stock 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(updatedStockData[0]);
  } catch (error) {
    console.error('Error updating product stock data:', error);
    return NextResponse.json(
      { error: 'Failed to update product stock data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE stock data for a product
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

    // Delete stock data
    await prisma.$queryRaw`
      DELETE FROM product_stock WHERE product_id = ${productId}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Product stock data deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product stock data:', error);
    return NextResponse.json(
      { error: 'Failed to delete product stock data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

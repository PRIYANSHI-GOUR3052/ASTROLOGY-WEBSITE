import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET shipping details for a product
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

    // Use raw query since Prisma client doesn't recognize product_shipping model
    const shippingDetails = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        weight,
        weight_unit,
        length,
        width,
        height,
        dimension_unit,
        shipping_class,
        is_free_shipping,
        shipping_cost,
        max_shipping_cost,
        shipping_zones,
        created_at,
        updated_at
      FROM product_shipping 
      WHERE product_id = ${productId}
    ` as any[];

    if (shippingDetails.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(shippingDetails[0]);
  } catch (error) {
    console.error('Error fetching product shipping details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product shipping details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create shipping details for a product
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      weight,
      weight_unit = 'kg',
      length,
      width,
      height,
      dimension_unit = 'cm',
      shipping_class,
      is_free_shipping = false,
      shipping_cost,
      max_shipping_cost,
      shipping_zones
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.$queryRaw`
      SELECT id FROM products WHERE id = ${productId}
    ` as any[];

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if shipping details already exist
    const existingShipping = await prisma.$queryRaw`
      SELECT id FROM product_shipping WHERE product_id = ${productId}
    ` as any[];

    if (existingShipping.length > 0) {
      return NextResponse.json(
        { error: 'Shipping details already exist for this product. Use PUT to update.' },
        { status: 400 }
      );
    }

    // Create shipping details
    await prisma.$queryRaw`
      INSERT INTO product_shipping (
        product_id, weight, weight_unit, length, width, height, 
        dimension_unit, shipping_class, is_free_shipping, 
        shipping_cost, max_shipping_cost, shipping_zones, 
        created_at, updated_at
      ) VALUES (
        ${productId}, 
        ${weight ? parseFloat(weight) : null}, 
        ${weight_unit}, 
        ${length ? parseFloat(length) : null}, 
        ${width ? parseFloat(width) : null}, 
        ${height ? parseFloat(height) : null}, 
        ${dimension_unit}, 
        ${shipping_class || null}, 
        ${is_free_shipping}, 
        ${shipping_cost ? parseFloat(shipping_cost) : null}, 
        ${max_shipping_cost ? parseFloat(max_shipping_cost) : null}, 
        ${shipping_zones ? JSON.stringify(shipping_zones) : null}, 
        NOW(), 
        NOW()
      )
    ` as any[];

    // Get the created shipping details
    const newShippingDetails = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        weight,
        weight_unit,
        length,
        width,
        height,
        dimension_unit,
        shipping_class,
        is_free_shipping,
        shipping_cost,
        max_shipping_cost,
        shipping_zones,
        created_at,
        updated_at
      FROM product_shipping 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(newShippingDetails[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product shipping details:', error);
    return NextResponse.json(
      { error: 'Failed to create product shipping details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT update shipping details for a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const {
      weight,
      weight_unit,
      length,
      width,
      height,
      dimension_unit,
      shipping_class,
      is_free_shipping,
      shipping_cost,
      max_shipping_cost,
      shipping_zones
    } = body;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if shipping details exist
    const existingShipping = await prisma.$queryRaw`
      SELECT id FROM product_shipping WHERE product_id = ${productId}
    ` as any[];

    if (existingShipping.length === 0) {
      return NextResponse.json(
        { error: 'Shipping details not found. Use POST to create.' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (weight !== undefined) {
      updateFields.push('weight = ?');
      updateValues.push(weight ? parseFloat(weight) : null);
    }
    if (weight_unit !== undefined) {
      updateFields.push('weight_unit = ?');
      updateValues.push(weight_unit);
    }
    if (length !== undefined) {
      updateFields.push('length = ?');
      updateValues.push(length ? parseFloat(length) : null);
    }
    if (width !== undefined) {
      updateFields.push('width = ?');
      updateValues.push(width ? parseFloat(width) : null);
    }
    if (height !== undefined) {
      updateFields.push('height = ?');
      updateValues.push(height ? parseFloat(height) : null);
    }
    if (dimension_unit !== undefined) {
      updateFields.push('dimension_unit = ?');
      updateValues.push(dimension_unit);
    }
    if (shipping_class !== undefined) {
      updateFields.push('shipping_class = ?');
      updateValues.push(shipping_class);
    }
    if (is_free_shipping !== undefined) {
      updateFields.push('is_free_shipping = ?');
      updateValues.push(is_free_shipping);
    }
    if (shipping_cost !== undefined) {
      updateFields.push('shipping_cost = ?');
      updateValues.push(shipping_cost ? parseFloat(shipping_cost) : null);
    }
    if (max_shipping_cost !== undefined) {
      updateFields.push('max_shipping_cost = ?');
      updateValues.push(max_shipping_cost ? parseFloat(max_shipping_cost) : null);
    }
    if (shipping_zones !== undefined) {
      updateFields.push('shipping_zones = ?');
      updateValues.push(shipping_zones ? JSON.stringify(shipping_zones) : null);
    }

    updateFields.push('updated_at = NOW()');

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Update shipping details
    const updateQuery = `
      UPDATE product_shipping 
      SET ${updateFields.join(', ')} 
      WHERE product_id = ${productId}
    `;

    await prisma.$executeRawUnsafe(updateQuery, ...updateValues);

    // Get the updated shipping details
    const updatedShippingDetails = await prisma.$queryRaw`
      SELECT 
        id,
        product_id,
        weight,
        weight_unit,
        length,
        width,
        height,
        dimension_unit,
        shipping_class,
        is_free_shipping,
        shipping_cost,
        max_shipping_cost,
        shipping_zones,
        created_at,
        updated_at
      FROM product_shipping 
      WHERE product_id = ${productId}
    ` as any[];

    return NextResponse.json(updatedShippingDetails[0]);
  } catch (error) {
    console.error('Error updating product shipping details:', error);
    return NextResponse.json(
      { error: 'Failed to update product shipping details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE shipping details for a product
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

    // Delete shipping details
    await prisma.$queryRaw`
      DELETE FROM product_shipping WHERE product_id = ${productId}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Product shipping details deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product shipping details:', error);
    return NextResponse.json(
      { error: 'Failed to delete product shipping details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

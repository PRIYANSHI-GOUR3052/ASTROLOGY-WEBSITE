import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Interface for product ID from database
interface ProductID {
  id: number;
}

// Interface for shipping ID from database
interface ShippingID {
  id: number;
}

// Interface for shipping zone data
interface ShippingZoneData {
  zone_name: string;
  countries: string[];
  states?: string[];
  cities?: string[];
  shipping_cost: number;
  delivery_time?: string;
}

// Interface for shipping request body
interface ShippingRequestBody {
  weight?: number;
  weight_unit?: string;
  length?: number;
  width?: number;
  height?: number;
  dimension_unit?: string;
  shipping_class?: string;
  is_free_shipping?: boolean;
  shipping_cost?: number;
  max_shipping_cost?: number;
  shipping_zones?: ShippingZoneData[] | null;
}

// Interface for shipping details from database
interface ProductShippingDetails {
  id: number;
  product_id: number;
  weight: number | null;
  weight_unit: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  dimension_unit: string | null;
  shipping_class: string | null;
  is_free_shipping: boolean;
  shipping_cost: number | null;
  max_shipping_cost: number | null;
  shipping_zones: string | null;
  created_at: Date;
  updated_at: Date;
}

const prisma = new PrismaClient();

// POST - Create or update product shipping details
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json() as ShippingRequestBody;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.$queryRaw`
      SELECT id FROM products WHERE id = ${productId}
    ` as ProductID[];

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if shipping details already exist
    const existingShipping = await prisma.$queryRaw`
      SELECT id FROM product_shipping WHERE product_id = ${productId}
    ` as ShippingID[];

    let result: ProductShippingDetails;
    if (existingShipping.length > 0) {
      // Update existing shipping details
      await prisma.$queryRaw`
        UPDATE product_shipping 
        SET 
          weight = ${body.weight},
          weight_unit = ${body.weight_unit || 'kg'},
          length = ${body.length},
          width = ${body.width},
          height = ${body.height},
          dimension_unit = ${body.dimension_unit || 'cm'},
          shipping_class = ${body.shipping_class},
          is_free_shipping = ${body.is_free_shipping || false},
          shipping_cost = ${body.shipping_cost},
          max_shipping_cost = ${body.max_shipping_cost},
          shipping_zones = ${body.shipping_zones ? JSON.stringify(body.shipping_zones) : null},
          updated_at = NOW()
        WHERE product_id = ${productId}
      ` as ProductShippingDetails[];

      // Get the updated record
      const updatedShipping = await prisma.$queryRaw`
        SELECT * FROM product_shipping WHERE product_id = ${productId}
      ` as ProductShippingDetails[];

      result = updatedShipping[0];
    } else {
      // Create new shipping details
      await prisma.$queryRaw`
        INSERT INTO product_shipping (
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
        ) VALUES (
          ${productId},
          ${body.weight},
          ${body.weight_unit || 'kg'},
          ${body.length},
          ${body.width},
          ${body.height},
          ${body.dimension_unit || 'cm'},
          ${body.shipping_class},
          ${body.is_free_shipping || false},
          ${body.shipping_cost},
          ${body.max_shipping_cost},
          ${body.shipping_zones ? JSON.stringify(body.shipping_zones) : null},
          NOW(),
          NOW()
        )
      ` as ProductShippingDetails[];

      // Get the created record
      const newShipping = await prisma.$queryRaw`
        SELECT * FROM product_shipping WHERE product_id = ${productId}
      ` as ProductShippingDetails[];

      result = newShipping[0];
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error saving product shipping details:', error);
    return NextResponse.json(
      { error: 'Failed to save product shipping details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update product shipping details
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json() as ShippingRequestBody;

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if shipping details exist
    const existingShipping = await prisma.$queryRaw`
      SELECT id FROM product_shipping WHERE product_id = ${productId}
    ` as ShippingID[];

    if (existingShipping.length === 0) {
      return NextResponse.json(
        { error: 'Shipping details not found. Use POST to create.' },
        { status: 404 }
      );
    }

    // Update shipping details
    await prisma.$queryRaw`
      UPDATE product_shipping 
      SET 
        weight = ${body.weight},
        weight_unit = ${body.weight_unit || 'kg'},
        length = ${body.length},
        width = ${body.width},
        height = ${body.height},
        dimension_unit = ${body.dimension_unit || 'cm'},
        shipping_class = ${body.shipping_class},
        is_free_shipping = ${body.is_free_shipping || false},
        shipping_cost = ${body.shipping_cost},
        max_shipping_cost = ${body.max_shipping_cost},
        shipping_zones = ${body.shipping_zones ? JSON.stringify(body.shipping_zones) : null},
        updated_at = NOW()
      WHERE product_id = ${productId}
    ` as ProductShippingDetails[];

    // Get the updated record
    const updatedShipping = await prisma.$queryRaw`
      SELECT * FROM product_shipping WHERE product_id = ${productId}
    ` as ProductShippingDetails[];

    return NextResponse.json(updatedShipping[0]);

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

// GET - Retrieve product shipping details
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
    ` as ProductShippingDetails[];

    if (shippingDetails.length === 0) {
      return NextResponse.json(null);
    }

    // Parse shipping_zones JSON if it exists
    const result = shippingDetails[0];
    if (result.shipping_zones) {
      try {
        result.shipping_zones = JSON.parse(result.shipping_zones);
      } catch (e) {
        result.shipping_zones = null;
      }
    }

    return NextResponse.json(result);

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

// DELETE - Remove product shipping details
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

    await prisma.$queryRaw`
      DELETE FROM product_shipping WHERE product_id = ${productId}
    ` as ProductShippingDetails[];

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

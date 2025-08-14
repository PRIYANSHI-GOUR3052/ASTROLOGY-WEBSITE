import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET attribute values by attribute ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attributeId = parseInt(params.id);
    
    if (isNaN(attributeId)) {
      return NextResponse.json(
        { error: 'Invalid attribute ID' },
        { status: 400 }
      );
    }

    // Use raw query since Prisma client doesn't recognize attribute_values model
    const attributeValues = await prisma.$queryRaw`
      SELECT 
        id,
        attribute_id,
        value,
        slug,
        sort_order,
        is_active,
        created_at,
        updated_at
      FROM attribute_values 
      WHERE attribute_id = ${attributeId}
      AND is_active = true
      ORDER BY sort_order ASC, value ASC
    ` as any[];

    return NextResponse.json(attributeValues);
  } catch (error) {
    console.error('Error fetching attribute values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attribute values' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new attribute value
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attributeId = parseInt(params.id);
    const body = await request.json();
    const { value, slug, sort_order = 0 } = body;

    if (isNaN(attributeId)) {
      return NextResponse.json(
        { error: 'Invalid attribute ID' },
        { status: 400 }
      );
    }

    if (!value || !slug) {
      return NextResponse.json(
        { error: 'Value and slug are required' },
        { status: 400 }
      );
    }

    // Check if value already exists for this attribute
    const existingValue = await prisma.$queryRaw`
      SELECT * FROM attribute_values 
      WHERE attribute_id = ${attributeId} 
      AND (value = ${value} OR slug = ${slug})
    ` as any[];

    if (existingValue.length > 0) {
      return NextResponse.json(
        { error: 'This value already exists for this attribute' },
        { status: 400 }
      );
    }

    // Create new attribute value
    await prisma.$queryRaw`
      INSERT INTO attribute_values (attribute_id, value, slug, sort_order, is_active, created_at, updated_at)
      VALUES (${attributeId}, ${value}, ${slug}, ${sort_order}, true, NOW(), NOW())
    ` as any[];

    return NextResponse.json({ 
      success: true,
      message: 'Attribute value created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating attribute value:', error);
    return NextResponse.json(
      { error: 'Failed to create attribute value' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

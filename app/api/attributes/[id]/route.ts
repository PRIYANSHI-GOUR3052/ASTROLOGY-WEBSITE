import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET attribute by ID
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

    const attributes = await prisma.$queryRaw`
      SELECT 
        id,
        name,
        slug,
        type,
        description,
        is_required,
        is_filterable,
        is_searchable,
        sort_order,
        created_at,
        updated_at
      FROM attributes 
      WHERE id = ${attributeId}
    ` as any[];

    if (attributes.length === 0) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(attributes[0]);
  } catch (error) {
    console.error('Error fetching attribute:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attribute' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT update attribute
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attributeId = parseInt(params.id);
    const body = await request.json();
    const { name, slug, type, description, is_required, is_filterable, is_searchable, sort_order } = body;

    if (isNaN(attributeId)) {
      return NextResponse.json(
        { error: 'Invalid attribute ID' },
        { status: 400 }
      );
    }

    if (!name || !slug || !type) {
      return NextResponse.json(
        { error: 'Name, slug, and type are required' },
        { status: 400 }
      );
    }

    // Check if attribute exists
    const existingAttribute = await prisma.$queryRaw`
      SELECT * FROM attributes WHERE id = ${attributeId}
    ` as any[];

    if (existingAttribute.length === 0) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    // Check if slug is already used by another attribute
    const slugConflict = await prisma.$queryRaw`
      SELECT * FROM attributes WHERE slug = ${slug} AND id != ${attributeId}
    ` as any[];

    if (slugConflict.length > 0) {
      return NextResponse.json(
        { error: 'Attribute with this slug already exists' },
        { status: 400 }
      );
    }

    // Update attribute
    await prisma.$queryRaw`
      UPDATE attributes 
      SET name = ${name},
          slug = ${slug},
          type = ${type},
          description = ${description || null},
          is_required = ${is_required || false},
          is_filterable = ${is_filterable || false},
          is_searchable = ${is_searchable || false},
          sort_order = ${sort_order || 0},
          updated_at = NOW()
      WHERE id = ${attributeId}
    ` as any[];

    // Get the updated attribute
    const updatedAttribute = await prisma.$queryRaw`
      SELECT 
        id,
        name,
        slug,
        type,
        description,
        is_required,
        is_filterable,
        is_searchable,
        sort_order,
        created_at,
        updated_at
      FROM attributes 
      WHERE id = ${attributeId}
    ` as any[];

    return NextResponse.json(updatedAttribute[0]);
  } catch (error) {
    console.error('Error updating attribute:', error);
    return NextResponse.json(
      { error: 'Failed to update attribute' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE attribute
export async function DELETE(
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

    // Check if attribute exists
    const existingAttribute = await prisma.$queryRaw`
      SELECT * FROM attributes WHERE id = ${attributeId}
    ` as any[];

    if (existingAttribute.length === 0) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    // Check if attribute is being used in any assignments
    const categoryAssignments = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM category_attributes WHERE attribute_id = ${attributeId}
    ` as any[];

    const zodiacAssignments = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM zodiac_attributes WHERE attribute_id = ${attributeId}
    ` as any[];

    const productAssignments = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM product_attributes WHERE attribute_id = ${attributeId}
    ` as any[];

    if (categoryAssignments[0].count > 0 || zodiacAssignments[0].count > 0 || productAssignments[0].count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete attribute that is assigned to categories, zodiac signs, or products' },
        { status: 400 }
      );
    }

    // Delete attribute values first
    await prisma.$queryRaw`
      DELETE FROM attribute_values WHERE attribute_id = ${attributeId}
    ` as any[];

    // Delete the attribute
    await prisma.$queryRaw`
      DELETE FROM attributes WHERE id = ${attributeId}
    ` as any[];

    return NextResponse.json({ 
      success: true,
      message: 'Attribute deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting attribute:', error);
    return NextResponse.json(
      { error: 'Failed to delete attribute' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

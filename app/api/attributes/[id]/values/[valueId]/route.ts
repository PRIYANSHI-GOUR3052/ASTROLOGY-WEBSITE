import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT update attribute value
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; valueId: string } }
) {
  try {
    const attributeId = parseInt(params.id);
    const valueId = parseInt(params.valueId);
    
    if (isNaN(attributeId) || isNaN(valueId)) {
      return NextResponse.json(
        { error: 'Invalid attribute ID or value ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { value, slug, sort_order, is_active } = body;

    // Check if attribute value exists
    const existingValue = await prisma.attribute_values.findFirst({
      where: {
        id: valueId,
        attribute_id: attributeId
      }
    });

    if (!existingValue) {
      return NextResponse.json(
        { error: 'Attribute value not found' },
        { status: 404 }
      );
    }

    // Validation
    if (!value || !slug) {
      return NextResponse.json(
        { error: 'Value and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists for this attribute (excluding current value)
    const slugExists = await prisma.attribute_values.findFirst({
      where: {
        attribute_id: attributeId,
        slug,
        id: { not: valueId }
      }
    });

    if (slugExists) {
      return NextResponse.json(
        { error: 'Attribute value with this slug already exists' },
        { status: 400 }
      );
    }

    const updatedValue = await prisma.attribute_values.update({
      where: { id: valueId },
      data: {
        value,
        slug,
        sort_order: sort_order !== undefined ? sort_order : existingValue.sort_order,
        is_active: is_active !== undefined ? is_active : existingValue.is_active,
        updated_at: new Date()
      }
    });

    return NextResponse.json(updatedValue);
  } catch (error) {
    console.error('Error updating attribute value:', error);
    return NextResponse.json(
      { error: 'Failed to update attribute value' },
      { status: 500 }
    );
  }
}

// DELETE attribute value
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; valueId: string } }
) {
  try {
    const attributeId = parseInt(params.id);
    const valueId = parseInt(params.valueId);
    
    if (isNaN(attributeId) || isNaN(valueId)) {
      return NextResponse.json(
        { error: 'Invalid attribute ID or value ID' },
        { status: 400 }
      );
    }

    // Check if attribute value exists
    const attributeValue = await prisma.attribute_values.findFirst({
      where: {
        id: valueId,
        attribute_id: attributeId
      },
      include: {
        _count: {
          select: {
            product_attribute_values: true
          }
        }
      }
    });

    if (!attributeValue) {
      return NextResponse.json(
        { error: 'Attribute value not found' },
        { status: 404 }
      );
    }

    // Check if value is being used by products
    if (attributeValue._count.product_attribute_values > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete attribute value that is being used by products',
          usage: {
            products: attributeValue._count.product_attribute_values
          }
        },
        { status: 400 }
      );
    }

    // Delete the attribute value
    await prisma.attribute_values.delete({
      where: { id: valueId }
    });

    return NextResponse.json({ 
      message: 'Attribute value deleted successfully',
      deletedValue: {
        id: attributeValue.id,
        value: attributeValue.value,
        slug: attributeValue.slug
      }
    });
  } catch (error) {
    console.error('Error deleting attribute value:', error);
    return NextResponse.json(
      { error: 'Failed to delete attribute value' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CategoryAttribute } from '@/app/admin/products/attributes/types';

// Interface for raw query result that includes joined fields
interface CategoryAttributeWithJoins extends CategoryAttribute {
  category_name: string;
  category_slug: string;
  attribute_name: string;
  attribute_type: string;
  attribute_description?: string;
  attribute_is_required: boolean;
  attribute_sort_order: number;
}

const prisma = new PrismaClient();

// GET category attributes by category ID or all if no category specified
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');

    let categoryAttributes;
    
    if (categoryId) {
      categoryAttributes = await prisma.$queryRaw`
        SELECT 
          ca.*,
          c.name as category_name,
          c.slug as category_slug,
          a.name as attribute_name,
          a.type as attribute_type,
          a.description as attribute_description,
          a.is_required as attribute_is_required,
          a.sort_order as attribute_sort_order
        FROM category_attributes ca
        JOIN categories c ON ca.category_id = c.id
        JOIN attributes a ON ca.attribute_id = a.id
        WHERE ca.category_id = ${parseInt(categoryId)}
        ORDER BY ca.sort_order ASC, a.sort_order ASC
      ` as unknown as CategoryAttributeWithJoins[];
    } else {
      categoryAttributes = await prisma.$queryRaw`
        SELECT 
          ca.*,
          c.name as category_name,
          c.slug as category_slug,
          a.name as attribute_name,
          a.type as attribute_type,
          a.description as attribute_description,
          a.is_required as attribute_is_required,
          a.sort_order as attribute_sort_order
        FROM category_attributes ca
        JOIN categories c ON ca.category_id = c.id
        JOIN attributes a ON ca.attribute_id = a.id
        ORDER BY ca.sort_order ASC, a.sort_order ASC
      ` as unknown as CategoryAttributeWithJoins[];
    }
    
    // Transform the data to match the expected interface
    const transformedAttributes = categoryAttributes.map((attr: CategoryAttributeWithJoins) => ({
      id: attr.id,
      category_id: attr.category_id,
      attribute_id: attr.attribute_id,
      is_required: attr.is_required,
      sort_order: attr.sort_order,
      attribute: {
        id: attr.attribute_id,
        name: attr.attribute_name,
        type: attr.attribute_type,
        description: attr.attribute_description,
        is_required: attr.attribute_is_required,
        sort_order: attr.attribute_sort_order
      }
    }));
    
    return NextResponse.json(transformedAttributes);
  } catch (error) {
    console.error('Error fetching category attributes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category attributes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new category attribute assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category_id, attribute_id, is_required, sort_order } = body;

    // Validation
    if (!category_id || !attribute_id) {
      return NextResponse.json(
        { error: 'Category ID and attribute ID are required' },
        { status: 400 }
      );
    }

    // Check if assignment already exists
    const existingAssignment = await prisma.$queryRaw`
      SELECT * FROM category_attributes 
      WHERE category_id = ${parseInt(category_id)} 
      AND attribute_id = ${parseInt(attribute_id)}
    ` as unknown as CategoryAttribute[];

    if (existingAssignment.length > 0) {
      return NextResponse.json(
        { error: 'This attribute is already assigned to this category' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.$queryRaw`
      SELECT * FROM categories WHERE id = ${parseInt(category_id)}
    ` as unknown as CategoryAttribute[];

    if (category.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if attribute exists
    const attribute = await prisma.$queryRaw`
      SELECT * FROM attributes WHERE id = ${parseInt(attribute_id)}
    ` as unknown as CategoryAttribute[];

    if (attribute.length === 0) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    // Create new assignment
    await prisma.$queryRaw`
      INSERT INTO category_attributes (category_id, attribute_id, is_required, sort_order, created_at, updated_at)
      VALUES (${parseInt(category_id)}, ${parseInt(attribute_id)}, ${is_required || false}, ${sort_order || 0}, NOW(), NOW())
    ` as unknown as CategoryAttribute[];

    // Get the created assignment
    const newCategoryAttribute = await prisma.$queryRaw`
      SELECT 
        ca.*,
        c.name as category_name,
        c.slug as category_slug,
        a.name as attribute_name,
        a.type as attribute_type
      FROM category_attributes ca
      JOIN categories c ON ca.category_id = c.id
      JOIN attributes a ON ca.attribute_id = a.id
      WHERE ca.category_id = ${parseInt(category_id)} 
      AND ca.attribute_id = ${parseInt(attribute_id)}
      ORDER BY ca.id DESC
      LIMIT 1
    ` as unknown as CategoryAttribute[];

    return NextResponse.json(newCategoryAttribute[0], { status: 201 });
  } catch (error) {
    console.error('Error creating category attribute assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create category attribute assignment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT bulk update category attribute assignments
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { assignments } = body; // Array of { id, is_required, sort_order }

    if (!Array.isArray(assignments)) {
      return NextResponse.json(
        { error: 'Assignments must be an array' },
        { status: 400 }
      );
    }

    const updatedAssignments = [];

    for (const assignment of assignments) {
      const { id, is_required, sort_order } = assignment;

      if (!id) {
        continue;
      }

      // Update the assignment
      await prisma.$queryRaw`
        UPDATE category_attributes 
        SET is_required = ${is_required !== undefined ? is_required : false},
            sort_order = ${sort_order !== undefined ? sort_order : 0},
            updated_at = NOW()
        WHERE id = ${parseInt(id)}
      ` as unknown as CategoryAttribute[];

      // Get the updated assignment
      const updatedAssignment = await prisma.$queryRaw`
        SELECT 
          ca.*,
          c.name as category_name,
          c.slug as category_slug,
          a.name as attribute_name,
          a.type as attribute_type
        FROM category_attributes ca
        JOIN categories c ON ca.category_id = c.id
        JOIN attributes a ON ca.attribute_id = a.id
        WHERE ca.id = ${parseInt(id)}
      ` as unknown as CategoryAttribute[];

      updatedAssignments.push(updatedAssignment[0]);
    }

    return NextResponse.json(updatedAssignments);
  } catch (error) {
    console.error('Error updating category attribute assignments:', error);
    return NextResponse.json(
      { error: 'Failed to update category attribute assignments' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

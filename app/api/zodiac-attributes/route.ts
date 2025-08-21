import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET zodiac attributes by zodiac ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zodiacId = searchParams.get('zodiac_id');

    let query;
    let params: any[] = [];

    if (zodiacId) {
      // Fetch attributes for a specific zodiac sign
      query = `
        SELECT 
          za.*,
          z.name as zodiac_name,
          z.slug as zodiac_slug,
          a.name as attribute_name,
          a.type as attribute_type,
          a.description as attribute_description,
          a.is_required as attribute_is_required,
          a.sort_order as attribute_sort_order
        FROM zodiac_attributes za
        JOIN zodiac_signs z ON za.zodiac_id = z.id
        JOIN attributes a ON za.attribute_id = a.id
        WHERE za.zodiac_id = ?
        ORDER BY za.sort_order ASC, a.sort_order ASC
      `;
      params = [parseInt(zodiacId)];
    } else {
      // Fetch all zodiac attributes
      query = `
        SELECT 
          za.*,
          z.name as zodiac_name,
          z.slug as zodiac_slug,
          a.name as attribute_name,
          a.type as attribute_type,
          a.description as attribute_description,
          a.is_required as attribute_is_required,
          a.sort_order as attribute_sort_order
        FROM zodiac_attributes za
        JOIN zodiac_signs z ON za.zodiac_id = z.id
        JOIN attributes a ON za.attribute_id = a.id
        ORDER BY za.zodiac_id ASC, za.sort_order ASC, a.sort_order ASC
      `;
    }

    // Use raw query since Prisma client doesn't recognize zodiac_attributes model
    const zodiacAttributes = await prisma.$queryRawUnsafe(query, ...params) as any[];

    // Transform the data to match the expected interface
    const transformedAttributes = zodiacAttributes.map(attr => ({
      id: attr.id,
      zodiac_id: attr.zodiac_id,
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
    console.error('Error fetching zodiac attributes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch zodiac attributes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new zodiac attribute assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { zodiac_id, attribute_id, is_required, sort_order } = body;

    // Validation
    if (!zodiac_id || !attribute_id) {
      return NextResponse.json(
        { error: 'Zodiac ID and attribute ID are required' },
        { status: 400 }
      );
    }

    // Check if assignment already exists
    const existingAssignment = await prisma.$queryRaw`
      SELECT * FROM zodiac_attributes 
      WHERE zodiac_id = ${parseInt(zodiac_id)} 
      AND attribute_id = ${parseInt(attribute_id)}
    ` as any[];

    if (existingAssignment.length > 0) {
      return NextResponse.json(
        { error: 'This attribute is already assigned to this zodiac sign' },
        { status: 400 }
      );
    }

    // Create new assignment
    await prisma.$queryRaw`
      INSERT INTO zodiac_attributes (zodiac_id, attribute_id, is_required, sort_order, created_at, updated_at)
      VALUES (${parseInt(zodiac_id)}, ${parseInt(attribute_id)}, ${is_required || false}, ${sort_order || 0}, NOW(), NOW())
    ` as any[];

    // Get the created assignment with full details
    const createdAssignment = await prisma.$queryRaw`
      SELECT 
        za.*,
        z.name as zodiac_name,
        z.slug as zodiac_slug,
        a.name as attribute_name,
        a.type as attribute_type,
        a.description as attribute_description,
        a.is_required as attribute_is_required,
        a.sort_order as attribute_sort_order
      FROM zodiac_attributes za
      JOIN zodiac_signs z ON za.zodiac_id = z.id
      JOIN attributes a ON za.attribute_id = a.id
      WHERE za.zodiac_id = ${parseInt(zodiac_id)} 
      AND za.attribute_id = ${parseInt(attribute_id)}
    ` as any[];

    if (createdAssignment.length === 0) {
      return NextResponse.json(
        { error: 'Failed to retrieve created assignment' },
        { status: 500 }
      );
    }

    // Transform the data to match the expected interface
    const assignment = createdAssignment[0];
    const transformedAssignment = {
      id: assignment.id,
      zodiac_id: assignment.zodiac_id,
      attribute_id: assignment.attribute_id,
      is_required: assignment.is_required,
      sort_order: assignment.sort_order,
      attribute: {
        id: assignment.attribute_id,
        name: assignment.attribute_name,
        type: assignment.attribute_type,
        description: assignment.attribute_description,
        is_required: assignment.attribute_is_required,
        sort_order: assignment.attribute_sort_order
      }
    };

    return NextResponse.json(transformedAssignment, { status: 201 });
  } catch (error) {
    console.error('Error creating zodiac attribute assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create zodiac attribute assignment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT bulk update zodiac attribute assignments
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
        UPDATE zodiac_attributes 
        SET is_required = ${is_required !== undefined ? is_required : false},
            sort_order = ${sort_order !== undefined ? sort_order : 0},
            updated_at = NOW()
        WHERE id = ${parseInt(id)}
      ` as any[];

      // Get the updated assignment
      const updatedAssignment = await prisma.$queryRaw`
        SELECT 
          za.*,
          z.name as zodiac_name,
          z.slug as zodiac_slug,
          a.name as attribute_name,
          a.type as attribute_type
        FROM zodiac_attributes za
        JOIN zodiac_signs z ON za.zodiac_id = z.id
        JOIN attributes a ON za.attribute_id = a.id
        WHERE za.id = ${parseInt(id)}
      ` as any[];

      updatedAssignments.push(updatedAssignment[0]);
    }

    return NextResponse.json(updatedAssignments);
  } catch (error) {
    console.error('Error updating zodiac attribute assignments:', error);
    return NextResponse.json(
      { error: 'Failed to update zodiac attribute assignments' },
      { status: 500 }
    );
  }
}

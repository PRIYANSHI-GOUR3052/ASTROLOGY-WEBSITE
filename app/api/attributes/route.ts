import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all attributes
export async function GET() {
  try {
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
      ORDER BY sort_order ASC, name ASC
    ` as any[];
    
    return NextResponse.json(attributes);
  } catch (error) {
    console.error('Error fetching attributes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attributes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST create new attribute
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, type, description, is_required, is_filterable, is_searchable, sort_order } = body;

    // Validation
    if (!name || !slug || !type) {
      return NextResponse.json(
        { error: 'Name, slug, and type are required' },
        { status: 400 }
      );
    }

    // Check if attribute with same slug already exists
    const existingAttribute = await prisma.$queryRaw`
      SELECT * FROM attributes WHERE slug = ${slug}
    ` as any[];

    if (existingAttribute.length > 0) {
      return NextResponse.json(
        { error: 'Attribute with this slug already exists' },
        { status: 400 }
      );
    }

    // Create new attribute
    await prisma.$queryRaw`
      INSERT INTO attributes (name, slug, type, description, is_required, is_filterable, is_searchable, sort_order, created_at, updated_at)
      VALUES (${name}, ${slug}, ${type}, ${description || null}, ${is_required || false}, ${is_filterable || false}, ${is_searchable || false}, ${sort_order || 0}, NOW(), NOW())
    ` as any[];

    // Get the created attribute
    const newAttribute = await prisma.$queryRaw`
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
      WHERE slug = ${slug}
      ORDER BY id DESC
      LIMIT 1
    ` as any[];

    return NextResponse.json(newAttribute[0], { status: 201 });
  } catch (error) {
    console.error('Error creating attribute:', error);
    return NextResponse.json(
      { error: 'Failed to create attribute' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

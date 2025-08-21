import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AttributeValue } from '@/app/admin/products/attributes/types';
  
const prisma = new PrismaClient();

// GET all attribute values
export async function GET() {
  try {
    // Use raw query since Prisma client doesn't recognize attribute_values model
    const attributeValues = await prisma.$queryRaw`
      SELECT av.*, a.name as attribute_name 
      FROM attribute_values av 
      JOIN attributes a ON av.attribute_id = a.id 
      ORDER BY a.name ASC, av.sort_order ASC
    ` as unknown as AttributeValue[];
    
    return NextResponse.json(attributeValues);
  } catch (error) {
    console.error('Error fetching attribute values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attribute values' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface for zodiac attribute assignment
interface ZodiacAttributeAssignment {
  id: number;
  zodiac_name: string;
  attribute_name: string;
}

// DELETE zodiac attribute assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid zodiac attribute ID' },
        { status: 400 }
      );
    }

    // Check if assignment exists
    const assignment = await prisma.$queryRaw`
      SELECT za.*, z.name as zodiac_name, a.name as attribute_name
      FROM zodiac_attributes za
      JOIN zodiac_signs z ON za.zodiac_id = z.id
      JOIN attributes a ON za.attribute_id = a.id
      WHERE za.id = ${id}
    ` as ZodiacAttributeAssignment[];

    if (assignment.length === 0) {
      return NextResponse.json(
        { error: 'Zodiac attribute assignment not found' },
        { status: 404 }
      );
    }

    // Delete the assignment
    await prisma.$queryRaw`
      DELETE FROM zodiac_attributes WHERE id = ${id}
    `;

    return NextResponse.json({ 
      message: 'Zodiac attribute assignment deleted successfully',
      deletedAssignment: {
        id: assignment[0].id,
        zodiac: assignment[0].zodiac_name,
        attribute: assignment[0].attribute_name
      }
    });
  } catch (error) {
    console.error('Error deleting zodiac attribute assignment:', error);
    return NextResponse.json(
      { error: 'Failed to delete zodiac attribute assignment' },
      { status: 500 }
    );
  }
}

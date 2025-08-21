import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface for category attribute assignment
interface CategoryAttributeAssignment {
  id: number;
  category_name: string;
  attribute_name: string;
}

// DELETE category attribute assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid category attribute ID' },
        { status: 400 }
      );
    }

    // Check if assignment exists
    const assignment = await prisma.$queryRaw`
      SELECT ca.*, c.name as category_name, a.name as attribute_name
      FROM category_attributes ca
      JOIN categories c ON ca.category_id = c.id
      JOIN attributes a ON ca.attribute_id = a.id
      WHERE ca.id = ${id}
    ` as CategoryAttributeAssignment[];

    if (assignment.length === 0) {
      return NextResponse.json(
        { error: 'Category attribute assignment not found' },
        { status: 404 }
      );
    }

    // Delete the assignment
    await prisma.$queryRaw`
      DELETE FROM category_attributes WHERE id = ${id}
    `;

    return NextResponse.json({ 
      message: 'Category attribute assignment deleted successfully',
      deletedAssignment: {
        id: assignment[0].id,
        category: assignment[0].category_name,
        attribute: assignment[0].attribute_name
      }
    });
  } catch (error) {
    console.error('Error deleting category attribute assignment:', error);
    return NextResponse.json(
      { error: 'Failed to delete category attribute assignment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

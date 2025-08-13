import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

// PUT update subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, slug, image_data } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Get current subcategory to check if we need to delete old image
    const currentSubcategory = await prisma.subcategories.findUnique({
      where: { id }
    });

    if (!currentSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists in this category (excluding current subcategory)
    const existingSubcategory = await prisma.subcategories.findFirst({
      where: {
        slug,
        category_id: currentSubcategory.category_id,
        id: { not: id }
      }
    });

    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory with this slug already exists in this category' },
        { status: 400 }
      );
    }

    let image_url = currentSubcategory.image_url;
    if (image_data) {
      try {
        // Delete old image if it exists
        if (currentSubcategory.image_url) {
          try {
            await deleteImage(currentSubcategory.image_url);
          } catch (deleteError) {
            console.warn('Failed to delete old image:', deleteError);
          }
        }
        
        // Upload new image
        image_url = await uploadImage(image_data, 'subcategories');
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const updatedSubcategory = await prisma.subcategories.update({
      where: { id },
      data: {
        name,
        slug,
        image_url,
        updated_at: new Date()
      }
    });

    return NextResponse.json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE subcategory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Get subcategory to delete image
    const subcategory = await prisma.subcategories.findUnique({
      where: { id }
    });

    if (subcategory?.image_url) {
      try {
        await deleteImage(subcategory.image_url);
      } catch (deleteError) {
        console.warn('Failed to delete image:', deleteError);
      }
    }

    // Delete subcategory
    await prisma.subcategories.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}

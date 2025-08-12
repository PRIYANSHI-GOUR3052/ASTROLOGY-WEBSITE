import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

// PUT update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, slug, description, image_data, banner_data } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current category)
    const existingCategory = await prisma.categories.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    // Get current category to check if we need to delete old images
    const currentCategory = await prisma.categories.findUnique({
      where: { id }
    });

    let image_url = currentCategory?.image_url;
    let banner_url = currentCategory?.banner_url;

    // Handle category image upload
    if (image_data) {
      try {
        // Delete old image if it exists
        if (currentCategory?.image_url) {
          try {
            await deleteImage(currentCategory.image_url);
          } catch (deleteError) {
            console.warn('Failed to delete old category image:', deleteError);
          }
        }
        
        // Upload new image
        image_url = await uploadImage(image_data, 'categories');
      } catch (uploadError) {
        console.error('Category image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload category image' },
          { status: 500 }
        );
      }
    }

    // Handle category banner upload
    if (banner_data) {
      try {
        // Delete old banner if it exists
        if (currentCategory?.banner_url) {
          try {
            await deleteImage(currentCategory.banner_url);
          } catch (deleteError) {
            console.warn('Failed to delete old category banner:', deleteError);
          }
        }
        
        // Upload new banner
        banner_url = await uploadImage(banner_data, 'categories/banners');
      } catch (uploadError) {
        console.error('Category banner upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload category banner' },
          { status: 500 }
        );
      }
    }

    const updatedCategory = await prisma.categories.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image_url,
        banner_url,
        updated_at: new Date()
      },
      include: {
        subcategories: true
      }
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Get category to delete images
    const category = await prisma.categories.findUnique({
      where: { id }
    });

    // Delete category image if it exists
    if (category?.image_url) {
      try {
        await deleteImage(category.image_url);
      } catch (deleteError) {
        console.warn('Failed to delete category image:', deleteError);
      }
    }

    // Delete category banner if it exists
    if (category?.banner_url) {
      try {
        await deleteImage(category.banner_url);
      } catch (deleteError) {
        console.warn('Failed to delete category banner:', deleteError);
      }
    }

    // Delete category (subcategories will be deleted automatically due to cascade)
    await prisma.categories.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}

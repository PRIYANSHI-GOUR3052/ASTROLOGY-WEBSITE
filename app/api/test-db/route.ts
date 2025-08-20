import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Test a simple query
    const productCount = await prisma.products.count();
    console.log('Total products in database:', productCount);
    
    // Test schema by trying to create a test product
    const testProduct = await prisma.products.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product to verify database connectivity',
        price: 100.00,
        slug: 'test-product-' + Date.now(),
        is_active: true,
        available: 0
      }
    });
    
    console.log('Test product created:', testProduct);
    
    // Clean up - delete the test product
    await prisma.products.delete({
      where: { id: testProduct.id }
    });
    
    console.log('Test product deleted');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection test successful',
      productCount,
      testProductId: testProduct.id
    });
    
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json(
      { 
        error: 'Database connection test failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

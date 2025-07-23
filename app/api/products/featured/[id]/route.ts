
// File: app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Define proper types for database results
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();
    
    if ((rows as Product[]).length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ product: (rows as Product[])[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { name, description, price, slug } = await request.json();
    
    // Validate input
    if (!name || !description || !price || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    // Check if slug already exists for other products
    const [existingProducts] = await connection.query(
      'SELECT * FROM products WHERE slug = ? AND id != ?', 
      [slug, id]
    );
    if ((existingProducts as Product[]).length > 0) {
      connection.release();
      return NextResponse.json({ error: 'Another product with this slug already exists' }, { status: 400 });
    }
    
    // Update product
    await connection.query(
      'UPDATE products SET name = ?, description = ?, price = ?, slug = ? WHERE id = ?',
      [name, description, price, slug, id]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      message: 'Product updated successfully',
      product: { id, name, description, price, slug }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    const connection = await pool.getConnection();
    
    // Delete product
    await connection.query('DELETE FROM products WHERE id = ?', [id]);
    
    connection.release();
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
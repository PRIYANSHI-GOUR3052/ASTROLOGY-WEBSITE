// File: app/api/products/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Type definitions
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
}

interface DatabaseInsertResult {
  insertId: number;
  affectedRows: number;
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products ORDER BY id DESC');
    connection.release();
    
    return NextResponse.json({ products: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, price, slug } = await request.json();
    
    // Validate input
    if (!name || !description || !price || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    // Check if slug already exists
    const [existingProducts] = await connection.query('SELECT * FROM products WHERE slug = ?', [slug]);
    if ((existingProducts as Product[]).length > 0) {
      connection.release();
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 });
    }
    
    // Insert new product
    const [result] = await connection.query(
      'INSERT INTO products (name, description, price, slug) VALUES (?, ?, ?, ?)',
      [name, description, price, slug]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      message: 'Product created successfully',
      product: { id: (result as DatabaseInsertResult).insertId, name, description, price, slug }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

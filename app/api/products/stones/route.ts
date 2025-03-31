import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET handler to fetch all stones
export async function GET(req: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    // Get search parameter if it exists
    const url = new URL(req.url);
    const search = url.searchParams.get('search') || '';
    
    let query = 'SELECT * FROM stones';
    let params = [];
    
    // Add search functionality if search parameter exists
    if (search) {
      query = `
        SELECT * FROM stones 
        WHERE name LIKE ? 
        OR name_en LIKE ? 
        OR zodiac LIKE ? 
        OR zodiac_en LIKE ?
      `;
      params = Array(4).fill(`%${search}%`);
    }
    
    // Execute the query
    const [rows] = await connection.query(query, params);
    connection.release();
    
    return NextResponse.json({ stones: rows });
  } catch (error) {
    console.error('Error fetching stones:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stones' },
      { status: 500 }
    );
  }
}

// POST handler to add a new stone
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stoneName, stoneNameEn, zodiac, zodiacEn, benefits, benefitsEn, pricePerCarat } = body;
    
    // Validate required fields
    if (!stoneName || !stoneNameEn || !zodiac || !zodiacEn || !benefits || !benefitsEn || !pricePerCarat) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    // Insert the new stone
    const [result] = await connection.query(
      `INSERT INTO stones (name, name_en, zodiac, zodiac_en, benefits, benefits_en, price_per_carat)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [stoneName, stoneNameEn, zodiac, zodiacEn, benefits, benefitsEn, pricePerCarat]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      message: 'Stone added successfully',
      stoneId: (result as any).insertId
    });
  } catch (error) {
    console.error('Error adding stone:', error);
    return NextResponse.json(
      { error: 'Failed to add stone' },
      { status: 500 }
    );
  }
}
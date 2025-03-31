import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET handler to fetch a specific stone by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM stones WHERE id = ?', [id]);
    connection.release();
    
    const stone = (rows as any)[0];
    
    if (!stone) {
      return NextResponse.json(
        { error: 'Stone not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ stone });
  } catch (error) {
    console.error('Error fetching stone:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stone' },
      { status: 500 }
    );
  }
}

// PUT handler to update a stone
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
    
    // Update the stone
    await connection.query(
      `UPDATE stones 
       SET name = ?, name_en = ?, zodiac = ?, zodiac_en = ?, 
           benefits = ?, benefits_en = ?, price_per_carat = ?
       WHERE id = ?`,
      [stoneName, stoneNameEn, zodiac, zodiacEn, benefits, benefitsEn, pricePerCarat, id]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      message: 'Stone updated successfully' 
    });
  } catch (error) {
    console.error('Error updating stone:', error);
    return NextResponse.json(
      { error: 'Failed to update stone' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove a stone
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM stones WHERE id = ?', [id]);
    connection.release();
    
    return NextResponse.json({ 
      message: 'Stone deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting stone:', error);
    return NextResponse.json(
      { error: 'Failed to delete stone' },
      { status: 500 }
    );
  }
}
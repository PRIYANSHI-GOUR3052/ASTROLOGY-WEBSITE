import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

// GET handler to fetch cart items
export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        authenticated: false,
        redirectUrl: '/signin?redirect=cart'
      }, { status: 401 });
    }
    
    const userGoogleId = session.user.id;
    const connection = await pool.getConnection();
    
    // First get the internal user ID by Google ID
    const [userResult] = await connection.query(
      'SELECT id FROM users WHERE google_id = ?',
      [userGoogleId]
    );
    
    if ((userResult as any[]).length === 0) {
      connection.release();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const userId = (userResult as any[])[0].id;
    
    // Get cart items for the user
    const [rows] = await connection.query(
      `SELECT c.*, 
        CASE 
          WHEN c.is_stone = 1 THEN s.name
          ELSE p.name
        END as product_name,
        CASE 
          WHEN c.is_stone = 1 THEN s.price_per_carat
          ELSE p.price
        END as unit_price
      FROM cart c
      LEFT JOIN products p ON c.product_id = p.id AND c.is_stone = 0
      LEFT JOIN stones s ON c.product_id = s.id AND c.is_stone = 1
      WHERE c.user_id = ?`,
      [userId]
    );
    
    connection.release();
    
    return NextResponse.json({ cartItems: rows });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

// POST handler to add item to cart
export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        authenticated: false,
        redirectUrl: '/signin?redirect=cart'
      }, { status: 401 });
    }
    
    const userGoogleId = session.user.id;
    const body = await req.json();
    const { productId, quantity = 1, isStone = false, carats } = body;
    
    // Validate required fields
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    // First get the internal user ID by Google ID
    const [userResult] = await connection.query(
      'SELECT id FROM users WHERE google_id = ?',
      [userGoogleId]
    );
    
    if ((userResult as any[]).length === 0) {
      connection.release();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const userId = (userResult as any[])[0].id;
    
    // Now proceed with cart operations using the internal user ID
    const [existingItems] = await connection.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND is_stone = ?',
      [userId, productId, isStone ? 1 : 0]
    );
    
    if ((existingItems as any[]).length > 0) {
      // Update quantity/carats if item already exists
      const existingItem = (existingItems as any[])[0];
      const newQuantity = isStone 
        ? parseFloat(existingItem.carats) + parseFloat(carats || 1)
        : parseInt(existingItem.quantity) + parseInt(quantity);
        
      await connection.query(
        'UPDATE cart SET quantity = ?, carats = ? WHERE id = ?',
        [isStone ? 1 : newQuantity, isStone ? newQuantity : null, existingItem.id]
      );
    } else {
      // Insert new cart item
      await connection.query(
        'INSERT INTO cart (user_id, product_id, quantity, is_stone, carats) VALUES (?, ?, ?, ?, ?)',
        [userId, productId, isStone ? 1 : quantity, isStone ? 1 : 0, isStone ? carats : null]
      );
    }
    
    connection.release();
    
    return NextResponse.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

// DELETE handler to remove item from cart
export async function DELETE(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        authenticated: false,
        redirectUrl: '/signin?redirect=cart'
      }, { status: 401 });
    }
    
    const userGoogleId = session.user.id;
    
    // Get cart item ID from query params
    const url = new URL(req.url);
    const cartItemId = url.searchParams.get('id');
    
    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    // First get the internal user ID by Google ID
    const [userResult] = await connection.query(
      'SELECT id FROM users WHERE google_id = ?',
      [userGoogleId]
    );
    
    if ((userResult as any[]).length === 0) {
      connection.release();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const userId = (userResult as any[])[0].id;
    
    // Delete the cart item (ensuring it belongs to the correct user)
    const [result] = await connection.query(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [cartItemId, userId]
    );
    
    connection.release();
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}

// PUT handler to update cart item quantity/carats
export async function PUT(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        authenticated: false,
        redirectUrl: '/signin?redirect=cart'
      }, { status: 401 });
    }
    
    const userGoogleId = session.user.id;
    const body = await req.json();
    const { cartItemId, quantity, carats } = body;
    
    // Validate required fields
    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 });
    }
    
    if (quantity === undefined && carats === undefined) {
      return NextResponse.json({ error: 'Quantity or carats must be provided' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    // First get the internal user ID by Google ID
    const [userResult] = await connection.query(
      'SELECT id FROM users WHERE google_id = ?',
      [userGoogleId]
    );
    
    if ((userResult as any[]).length === 0) {
      connection.release();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const userId = (userResult as any[])[0].id;
    
    // Get the cart item to check if it's a stone or regular product
    const [cartItems] = await connection.query(
      'SELECT * FROM cart WHERE id = ? AND user_id = ?',
      [cartItemId, userId]
    );
    
    if ((cartItems as any[]).length === 0) {
      connection.release();
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }
    
    const cartItem = (cartItems as any[])[0];
    const isStone = cartItem.is_stone === 1;
    
    // Update the cart item
    await connection.query(
      'UPDATE cart SET quantity = ?, carats = ? WHERE id = ? AND user_id = ?',
      [
        isStone ? 1 : (quantity || cartItem.quantity), 
        isStone ? (carats || cartItem.carats) : null, 
        cartItemId, 
        userId
      ]
    );
    
    connection.release();
    
    return NextResponse.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

// Define proper types for database results
type UserResult = { id: number }[];
type CartItem = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  is_stone: number;
  is_service: number;
  carats: number | null;
  unit_price: number;
};
type CartItems = CartItem[];
type OrderResult = { insertId: number };

// POST handler for creating a Cash-on-Delivery order
export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        authenticated: false,
        redirectUrl: '/signin?redirect=checkout'
      }, { status: 401 });
    }
    
    const userGoogleId = session.user.id;
    const body = await req.json();
    const { shippingAddress } = body;
    
    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode || 
        !shippingAddress.phone) {
      return NextResponse.json({ error: 'Complete shipping address is required' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Get the internal user ID by Google ID
      const [userResult] = await connection.query(
        'SELECT id FROM users WHERE google_id = ?',
        [userGoogleId]
      );
      
      if ((userResult as UserResult).length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      const userId = (userResult as UserResult)[0].id;
      
      // Fetch cart items with their prices
      const [cartItems] = await connection.query(
        `SELECT c.*, 
          CASE 
            WHEN c.is_stone = 1 THEN s.price_per_carat
            WHEN c.is_service = 1 THEN srv.price
            ELSE p.price
          END as unit_price
        FROM cart c
        LEFT JOIN products p ON c.product_id = p.id AND c.is_stone = 0 AND c.is_service = 0
        LEFT JOIN stones s ON c.product_id = s.id AND c.is_stone = 1 AND c.is_service = 0
        LEFT JOIN services srv ON c.product_id = srv.id AND c.is_service = 1
        WHERE c.user_id = ?`,
        [userId]
      );
      
      if ((cartItems as CartItems).length === 0) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
      }
      
      // Calculate total amount
      let totalAmount = 0;
      for (const item of cartItems as CartItems) {
        const itemPrice = item.is_stone === 1
          ? parseFloat(item.unit_price.toString()) * parseFloat((item.carats || 1).toString())
          : parseFloat(item.unit_price.toString()) * parseInt(item.quantity.toString());
        totalAmount += itemPrice;
      }
      
      // Generate an order ID for COD
      const codOrderId = `cod_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      
      // Create an order with 'processing' status for COD
      const [orderResult] = await connection.query(
        `INSERT INTO orders (
          user_id, 
          stripe_session_id,
          total_amount,
          status
        ) VALUES (?, ?, ?, ?)`,
        [
          userId,
          codOrderId,
          totalAmount,
          'processing' // For COD, we mark as processing right away
        ]
      );
      
      const orderId = (orderResult as OrderResult).insertId;
      
      // Save shipping address
      await connection.query(
        `INSERT INTO user_addresses (
          user_id,
          full_name,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          phone,
          is_default
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          full_name = VALUES(full_name),
          address_line1 = VALUES(address_line1),
          address_line2 = VALUES(address_line2),
          city = VALUES(city),
          state = VALUES(state),
          pincode = VALUES(pincode),
          phone = VALUES(phone)`,
        [
          userId,
          shippingAddress.fullName,
          shippingAddress.addressLine1,
          shippingAddress.addressLine2 || '',
          shippingAddress.city,
          shippingAddress.state,
          shippingAddress.pincode,
          shippingAddress.phone,
          1 // Mark as default
        ]
      );
      
      // Insert order items
      for (const item of cartItems as CartItems) {
        const itemPrice = item.is_stone === 1
          ? parseFloat(item.unit_price.toString()) * parseFloat((item.carats || 1).toString())
          : parseFloat(item.unit_price.toString()) * parseInt(item.quantity.toString());
        
        await connection.query(
          `INSERT INTO order_items (
            order_id,
            product_id,
            is_stone,
            is_service,
            quantity,
            carats,
            price
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.product_id,
            item.is_stone,
            item.is_service,
            item.quantity,
            item.carats,
            itemPrice
          ]
        );
      }
      
      // Clear cart after successful order creation
      await connection.query(
        'DELETE FROM cart WHERE user_id = ?',
        [userId]
      );
      
      await connection.commit();
      
      // Return success with order details
      return NextResponse.json({
        success: true,
        orderId,
        codOrderId,
        redirectUrl: `/order-confirmation/${orderId}`
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('COD order error:', error);
    return NextResponse.json({ 
      error: 'Failed to create COD order', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
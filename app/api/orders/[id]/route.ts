// File: app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

// Type definitions
interface User {
  id: number;
  google_id: string;
}

interface Order {
  id: number;
  order_number: string;
  total_amount: string;
  order_status: string;
  order_date: string;
  updated_at: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  carats: number | null;
  total_price: string;
  is_stone: number;
  is_service: number;
  product_name: string;
  unit_price: number;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to view order details' },
        { status: 401 }
      );
    }

    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const userGoogleId = session.user.id;
    const connection = await pool.getConnection();
    
    try {
      // Get the internal user ID by Google ID
      const [userResult] = await connection.query(
        'SELECT id FROM users WHERE google_id = ?',
        [userGoogleId]
      );
      
      if ((userResult as User[]).length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      const userId = (userResult as User[])[0].id;
      
      // Get the order and verify it belongs to this user
      const [orderResult] = await connection.query(
        `SELECT o.id, o.stripe_session_id as order_number, o.total_amount, o.status as order_status, 
                o.created_at as order_date, o.updated_at
         FROM orders o
         WHERE o.id = ? AND o.user_id = ?`,
        [orderId, userId]
      );
      
      if ((orderResult as Order[]).length === 0) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      
      const order = (orderResult as Order[])[0];
      
      // Get the order items with product details
      const [orderItems] = await connection.query(
        `SELECT 
          oi.id, oi.quantity, oi.carats, oi.price as total_price, oi.is_stone, oi.is_service,
          CASE 
            WHEN oi.is_stone = 1 THEN s.name
            WHEN oi.is_service = 1 THEN srv.title_en
            ELSE p.name
          END as product_name,
          CASE 
            WHEN oi.is_stone = 1 THEN s.price_per_carat
            WHEN oi.is_service = 1 THEN srv.price
            ELSE p.price
          END as unit_price
         FROM order_items oi
         LEFT JOIN products p ON oi.product_id = p.id AND oi.is_stone = 0 AND oi.is_service = 0
         LEFT JOIN stones s ON oi.product_id = s.id AND oi.is_stone = 1 AND oi.is_service = 0
         LEFT JOIN services srv ON oi.product_id = srv.id AND oi.is_service = 1
         WHERE oi.order_id = ?`,
        [orderId]
      );
      
      // Get shipping address for this order
      const [addressResult] = await connection.query(
        `SELECT 
          full_name as fullName, 
          address_line1 as addressLine1, 
          address_line2 as addressLine2, 
          city, 
          state, 
          pincode, 
          phone
         FROM user_addresses
         WHERE user_id = ? AND is_default = 1`,
        [userId]
      );
      
      const shippingAddress = (addressResult as ShippingAddress[]).length > 0 
        ? (addressResult as ShippingAddress[])[0]
        : null;
      
      // Calculate subtotal
      const subtotal = (orderItems as OrderItem[]).reduce((sum, item) => sum + parseFloat(item.total_price), 0);
      
      // Determine payment method and status
      const paymentMethod = order.order_number.startsWith('cod_') 
        ? 'Cash on Delivery (COD)' 
        : 'Online Payment';
      
      const paymentStatus = order.order_status === 'completed' 
        ? 'Paid'
        : (paymentMethod === 'Cash on Delivery (COD)' ? 'Pending' : 'Processing');
      
      // Calculate estimated delivery (7 days from order date)
      const orderDate = new Date(order.order_date);
      const estimatedDelivery = new Date(orderDate);
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
      
      // Construct the complete order object
      const completeOrder = {
        id: order.id,
        order_number: order.order_number,
        order_date: order.order_date,
        order_status: order.order_status,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        estimated_delivery: estimatedDelivery.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        items: orderItems,
        subtotal: subtotal,
        total: order.total_amount,
        shipping_address: shippingAddress
      };
      
      return NextResponse.json({ order: completeOrder });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
}
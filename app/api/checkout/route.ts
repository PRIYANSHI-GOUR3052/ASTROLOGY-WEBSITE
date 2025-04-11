import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      // Return a specific status code and message for unauthenticated users
      return NextResponse.json({
        authenticated: false,
        redirectUrl: '/signin?redirect=checkout'
      }, { status: 401 });
    }
    
    // Parse request body
    const body = await req.json();
    const { cartItems } = body;
    
    // Validate cart data
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ 
        error: 'Invalid cart data. Cart cannot be empty.' 
      }, { status: 400 });
    }
    
    // Calculate the total amount from all cart items
    const totalAmount = cartItems.reduce((sum, item) => {
      const itemPrice = item.price * (item.quantity || 1);
      return sum + itemPrice;
    }, 0);
    
    // Return success with cart details for checkout page
    return NextResponse.json({ 
      success: true,
      redirectUrl: '/checkout',
      orderDetails: {
        cartItems,
        totalAmount,
        userId: session.user.id
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ 
      error: 'Failed to process checkout request' 
    }, { status: 500 });
  }
}
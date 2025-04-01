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
    const { price, productName, quantity = 1, isStone = false, carats } = body;
    
    // Calculate the total price (for display purposes on checkout page)
    let totalAmount = price;
    if (isStone && carats) {
      totalAmount = price * carats;
    } else {
      totalAmount = price * quantity;
    }
    
    // Instead of creating a Stripe checkout session, return data for redirect
    return NextResponse.json({ 
      success: true,
      redirectUrl: '/checkout',
      orderDetails: {
        productName,
        isStone,
        carats: isStone ? carats : null,
        quantity,
        totalAmount
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process checkout request' }, { status: 500 });
  }
}
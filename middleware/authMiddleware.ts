/*import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // We'll use jose for JWT verification in middleware

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('adminToken')?.value;
    
    // If no token is present, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Verify the token
      // Convert JWT_SECRET to Uint8Array for jose
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key'
      );
      
      await jwtVerify(token, secret);
      
      // If we get here, the token is valid
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to login
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // For all other routes, continue as normal
  return NextResponse.next();
}

// Configure the middleware to run only on admin dashboard routes
export const config = {
  matcher: '/admin/dashboard/:path*',
};*/
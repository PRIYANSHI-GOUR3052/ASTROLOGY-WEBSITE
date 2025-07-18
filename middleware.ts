import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { verifyAstrologerJwt } from './lib/auth-edge';

// This array contains all the paths that should be protected
const protectedPaths = [
  '/admin/dashboard',
  '/admin/clients',
  '/admin/courses',
  '/admin/products',
  '/admin/services',
  '/admin/reviews',
  '/admin/settings'
];

// Astrologer protected paths
const astrologerProtectedPaths = [
  '/astrologer/dashboard',
  '/astrologer/profile',
  '/astrologer/availability',
  '/astrologer/bookings',
  '/astrologer/consultations',
  '/astrologer/reviews',
  '/astrologer/withdraw',
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for non-admin paths or login page
  if (!path.startsWith('/admin') || path === '/admin/login') {
    return NextResponse.next();
  }
  
  // Check if the path should be protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  
  if (isProtectedPath) {
    // Get the token from cookies
    const adminToken = request.cookies.get('adminToken')?.value;
    
    // If there's no token, redirect to login
    if (!adminToken) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    
    try {
      // Verify the token - make sure to use the same secret key as in your API handlers
      const secretKey = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key'
      );
      
      await jwtVerify(adminToken, secretKey);
      
      // Token is valid, continue to protected route
      return NextResponse.next();
    } catch {
      // Token verification failed, redirect to login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }
  
  // Astrologer protection
  const isAstrologerProtected = astrologerProtectedPaths.some(protectedPath =>
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  if (path.startsWith('/astrologer') && isAstrologerProtected) {
    // Try to get token from cookie or Authorization header
    const token = request.cookies.get('astrologerToken')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      const url = new URL('/astrologer/auth', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    try {
      await verifyAstrologerJwt(token);
      return NextResponse.next();
    } catch {
      const url = new URL('/astrologer/auth', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }
  
  // For non-protected admin paths, allow access
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin/:path*'],
};
import type { NextApiRequest } from 'next';

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  maxAge?: number;
  expires?: Date;
  sameSite: 'strict' | 'lax' | 'none';
  path: string;
  domain?: string;
}

export function getCookieConfig(req: NextApiRequest, options?: {
  maxAge?: number;
  expires?: Date;
}): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  const host = req.headers.host || '';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  const isHttps = req.headers['x-forwarded-proto'] === 'https' || (req.headers.referer ? req.headers.referer.startsWith('https://') : false);
  
  // Debug logging for production
  if (isProduction) {
    console.log('Cookie config debug:', {
      host,
      isLocalhost,
      NODE_ENV: process.env.NODE_ENV,
      isHttps,
      secure: isProduction && isHttps && !isLocalhost
    });
  }
  
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction && isHttps && !isLocalhost, // Only secure if HTTPS
    sameSite: 'lax', // Use 'lax' for better compatibility
    path: '/',
  };
  
  // Add maxAge or expires if provided
  if (options?.maxAge !== undefined) {
    cookieOptions.maxAge = options.maxAge;
  }
  if (options?.expires !== undefined) {
    cookieOptions.expires = options.expires;
  }
  
  // Set domain for production (remove for localhost)
  if (isProduction && !isLocalhost && host) {
    // Extract domain from host (remove port if present)
    const domain = host.split(':')[0];
    // Only set domain if it's not localhost and has at least one dot (indicating a real domain)
    if (domain && domain.includes('.') && !domain.startsWith('localhost')) {
      cookieOptions.domain = domain;
    }
  }
  
  // Debug logging for production
  if (isProduction) {
    console.log('Final cookie options:', cookieOptions);
  }
  
  return cookieOptions;
}

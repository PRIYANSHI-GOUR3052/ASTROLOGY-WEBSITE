import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Define the JWT payload interface
interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Debug logging
  console.log('Auth check request:', {
    method: req.method,
    url: req.url,
    headers: {
      host: req.headers.host,
      origin: req.headers.origin,
      referer: req.headers.referer,
      cookie: req.headers.cookie ? 'present' : 'missing'
    },
    cookies: req.cookies,
    NODE_ENV: process.env.NODE_ENV
  });

  // Get the adminToken cookie
  const { adminToken } = req.cookies;

  if (!adminToken) {
    console.log('No adminToken cookie found');
    return res.status(401).json({ message: 'Not authenticated' });
  }

  console.log('AdminToken found, length:', adminToken.length);

  try {
    // Verify the token
    const decoded = jwt.verify(adminToken, SECRET_KEY) as JwtPayload;
    console.log('Token verified successfully:', { userId: decoded.userId });
    
    // Token is valid
    return res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    console.log('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
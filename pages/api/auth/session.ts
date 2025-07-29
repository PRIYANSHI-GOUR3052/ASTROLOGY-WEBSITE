import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (session && session.user) {
      // Generate a JWT token for socket authentication
      const token = jwt.sign(
        { 
          id: session.user.id,
          email: session.user.email,
          role: 'client'
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '8h' }
      );
      
      return res.status(200).json({ 
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email
        },
        token // Include the JWT token for socket authentication
      });
    } else {
      return res.status(200).json({ user: null, token: null });
    }
  } catch (error) {
    console.error('Session check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 
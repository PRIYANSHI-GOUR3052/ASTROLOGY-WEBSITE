import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    console.log('Session data:', session);
    
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    console.log('User data from session:', session.user);

    // Generate a JWT token for the current user
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('JWT Secret available:', !!jwtSecret);
    
    console.log('Session user ID:', session.user.id, 'Type:', typeof session.user.id);
    
    const token = jwt.sign(
      { 
        id: session.user.id, 
        email: session.user.email,
        name: session.user.name,
        role: 'client'
      }, 
      jwtSecret, 
      { expiresIn: '1h' }
    );

    console.log('Generated token type:', typeof token);
    console.log('Generated token value:', token);

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Session token error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 
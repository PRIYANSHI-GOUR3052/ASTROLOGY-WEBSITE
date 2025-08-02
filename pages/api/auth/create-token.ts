import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, email, name } = req.body;

    if (!userId || !email || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Creating token for localStorage user:', { userId, email, name });
    
    const token = jwt.sign(
      { 
        id: userId, 
        email: email,
        name: name,
        role: 'client'
      }, 
      jwtSecret, 
      { expiresIn: '1h' }
    );

    console.log('Created token for user ID:', userId);

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Create token error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 
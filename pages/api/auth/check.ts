import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the adminToken cookie
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Verify the token
    jwt.verify(adminToken, SECRET_KEY);
    
    // Token is valid
    return res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Clear the adminToken cookie by setting it to expire immediately
  res.setHeader('Set-Cookie', serialize('adminToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set to epoch time to expire immediately
    sameSite: 'strict',
    path: '/',
  }));

  return res.status(200).json({ message: 'Logged out successfully' });
}
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookieConfig } from '@/utils/cookieConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get cookie configuration using utility function
  const cookieOptions = getCookieConfig(req, { expires: new Date(0) }); // Expire immediately

  // Clear the adminToken cookie by setting it to expire immediately
  res.setHeader('Set-Cookie', serialize('adminToken', '', cookieOptions));

  return res.status(200).json({ message: 'Logged out successfully' });
}
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { comparePassword, signAstrologerJwt } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const astrologer = await prisma.astrologer.findUnique({ where: { email } });
    if (!astrologer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = await comparePassword(password, astrologer.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await signAstrologerJwt({ id: astrologer.id, email: astrologer.email });
    return res.status(200).json({ token, astrologer: { id: astrologer.id, email: astrologer.email, firstName: astrologer.firstName } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Login failed' });
  }
} 
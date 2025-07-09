import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

// Admin authentication using JWT from cookies
async function getAdminFromRequest(req: NextApiRequest) {
  const token = req.cookies['adminToken'];
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const email = req.query.email as string;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const astrologer = await prisma.astrologer.findUnique({ where: { email } });
    if (!astrologer) return res.status(404).json({ error: 'Astrologer not found' });
    const verification = await prisma.astrologerVerification.findUnique({
      where: { astrologerId: astrologer.id },
      include: {
        astrologer: true,
        certifications: true,
        educations: true,
      },
    });
    if (!verification) return res.status(404).json({ error: 'Verification not found' });
    return res.status(200).json({ verification });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch verification', details: e });
  }
} 
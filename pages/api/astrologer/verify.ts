import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

// Real admin authentication using JWT from cookies
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
  if (req.method === 'POST') {
    const { astrologerId, status, adminRemarks } = req.body;
    if (!astrologerId || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    try {
      await prisma.astrologer.update({
        where: { id: Number(astrologerId) },
        data: { verificationStatus: status },
      });
      await prisma.astrologerVerification.update({
        where: { astrologerId: Number(astrologerId) },
        data: { status, adminRemarks },
      });
      return res.status(200).json({ message: 'Verification status updated' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update verification status', details: e });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
} 
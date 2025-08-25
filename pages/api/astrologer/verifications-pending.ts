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
  if (req.method === 'GET') {
    const { status } = req.query;
    try {
      const validStatuses = ['pending', 'approved', 'rejected'];
      const filter = validStatuses.includes(String(status))
        ? { status: String(status) }
        : {};

      const pending = await prisma.astrologerverification.findMany({
        where: filter,
        include: {
          astrologer: true,
          astrologercertification: true,
          astrologereducation: true,
        },
      });
      return res.status(200).json({ pending });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch pending verifications', details: e });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
} 
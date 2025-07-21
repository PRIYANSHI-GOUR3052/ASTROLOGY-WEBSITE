import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const astrologerId = Number(req.query.id);
  if (req.method === 'GET') {
    try {
      const slots = await prisma.astrologerAvailability.findMany({
        where: { astrologerId },
        orderBy: { date: 'asc' }
      });
      return res.status(200).json({ slots });
    } catch {
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
} 
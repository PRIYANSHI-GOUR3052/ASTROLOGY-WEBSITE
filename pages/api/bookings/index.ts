import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { astrologerId, clientId, date, type } = req.body;
    if (!astrologerId || !clientId || !date || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      // Optionally: Check if slot is available
      const booking = await prisma.booking.create({
        data: {
          astrologerId: Number(astrologerId),
          clientId: Number(clientId),
          date: new Date(date),
          type,
          status: 'upcoming'
        }
      });
      return res.status(201).json({ booking });
    } catch {
      return res.status(500).json({ error: 'Failed to create booking' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
} 
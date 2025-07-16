import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

// Type for JWT payload
interface AstrologerJWTPayload {
  id: number;
  email: string;
  role: string;
  [key: string]: any;
}

// Auth helper (from profile.ts)
async function getAstrologerFromRequest(req: NextApiRequest): Promise<AstrologerJWTPayload | null> {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const { payload } = await jwtVerify(token, secret);
    if (
      typeof payload === 'object' &&
      payload !== null &&
      typeof payload.id === 'number' &&
      typeof payload.email === 'string' &&
      payload.role === 'astrologer'
    ) {
      return payload as AstrologerJWTPayload;
    }
    return null;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getAstrologerFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const astrologerId = user.id;

  try {
    switch (req.method) {
      case 'GET': {
        // Get all slots for this astrologer
        const slots = await prisma.astrologerAvailability.findMany({
          where: { astrologerId },
          orderBy: { date: 'asc' },
        });
        return res.status(200).json(slots);
      }
      case 'POST': {
        // Create a new slot
        const { date, start, end, repeat } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        if (!date || !start || !end || !repeat) {
          return res.status(400).json({ error: 'Missing fields' });
        }
        const slot = await prisma.astrologerAvailability.create({
          data: {
            astrologerId,
            date: new Date(date),
            start,
            end,
            repeat,
          },
        });
        return res.status(201).json(slot);
      }
      case 'PUT': {
        // Update a slot
        const { id, date, start, end, repeat } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        if (!id || !date || !start || !end || !repeat) {
          return res.status(400).json({ error: 'Missing fields' });
        }
        const slot = await prisma.astrologerAvailability.update({
          where: { id: Number(id), astrologerId },
          data: { date: new Date(date), start, end, repeat },
        });
        return res.status(200).json(slot);
      }
      case 'DELETE': {
        // Delete a slot
        const { id } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        if (!id) {
          return res.status(400).json({ error: 'Missing id' });
        }
        await prisma.astrologerAvailability.delete({
          where: { id: Number(id), astrologerId },
        });
        return res.status(204).end();
      }
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (e: any) {
    return res.status(500).json({ error: 'Internal server error', details: e.message });
  }
} 
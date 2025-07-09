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

// Astrologer authentication using Authorization header only
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
  if (req.method === 'GET') {
    // Fetch astrologer basic details
    const user = await getAstrologerFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const astrologer = await prisma.astrologer.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          yearsOfExperience: true,
          areasOfExpertise: true,
          profileImage: true,
        },
      });
      if (!astrologer) return res.status(404).json({ error: 'Astrologer not found' });
      return res.status(200).json({ astrologer });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch astrologer details', details: e });
    }
  }
  if (req.method === 'PUT') {
    // Update astrologer basic details
    const user = await getAstrologerFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const body = req.body;
      const { firstName, lastName, phone, yearsOfExperience, areasOfExpertise, profileImage } =
        typeof body === 'string' ? JSON.parse(body) : body;
      const updated = await prisma.astrologer.update({
        where: { id: user.id },
        data: {
          firstName,
          lastName,
          phone,
          yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : undefined,
          areasOfExpertise,
          profileImage,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          yearsOfExperience: true,
          areasOfExpertise: true,
          profileImage: true,
        },
      });
      return res.status(200).json({ astrologer: updated });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update astrologer details', details: e });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
} 
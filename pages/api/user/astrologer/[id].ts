import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Missing or invalid astrologer id' });
  }
  try {
    const astrologer = await prisma.astrologer.findUnique({
      where: { id: Number(id) },
    });
    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer not found' });
    }
    // Only return public fields
    const publicAstrologer = {
      id: astrologer.id,
      firstName: astrologer.firstName,
      lastName: astrologer.lastName,
      email: astrologer.email,
      phone: astrologer.phone,
      areasOfExpertise: astrologer.areasOfExpertise,
      yearsOfExperience: astrologer.yearsOfExperience,
      profileImage: astrologer.profileImage,
      verificationStatus: astrologer.verificationStatus,
      createdAt: astrologer.createdAt,
    };
    return res.status(200).json({ astrologer: publicAstrologer });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch astrologer', details: e instanceof Error ? e.message : e });
  }
} 
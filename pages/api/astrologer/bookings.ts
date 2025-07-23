import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { jwtVerify } from 'jose';

// Helper: Extract astrologer from JWT
async function getAstrologerFromRequest(req: NextApiRequest) {
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
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getAstrologerFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const astrologerId = user.id;

  // GET: List bookings (with filters)
  if (req.method === 'GET') {
    try {
      const { status, date } = req.query;
      const where: Prisma.BookingWhereInput = { astrologerId: Number(astrologerId) };
      if (status) {
        if (status === 'upcoming') {
          where.date = { gte: new Date() };
          where.status = { in: ['upcoming', 'accepted', 'rescheduled'] };
        } else if (status === 'past') {
          where.date = { lt: new Date() };
          where.status = { in: ['past', 'rejected'] };
        }
      }
      if (date) {
        // Filter by date (YYYY-MM-DD)
        const start = new Date(date as string);
        const end = new Date(date as string);
        end.setHours(23, 59, 59, 999);
        where.date = { gte: start, lte: end };
      }
      const bookings = await prisma.booking.findMany({
        where,
        orderBy: { date: 'asc' },
        include: { client: true },
      });
      return res.status(200).json({ bookings });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch bookings', details: e instanceof Error ? e.message : e });
    }
  }

  // POST: Accept/Reject/Reschedule
  if (req.method === 'POST') {
    const { action, bookingId, remarks, newDate } = req.body;
    if (!bookingId || !action) {
      return res.status(400).json({ error: 'Missing bookingId or action' });
    }
    try {
      // Ensure booking belongs to astrologer
      const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (!booking || booking.astrologerId !== astrologerId) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      if (action === 'accept') {
        await prisma.booking.update({ where: { id: bookingId }, data: { status: 'accepted' } });
        return res.status(200).json({ message: 'Booking accepted' });
      }
      if (action === 'reject') {
        await prisma.booking.update({ where: { id: bookingId }, data: { status: 'rejected', remarks: remarks || null } });
        return res.status(200).json({ message: 'Booking rejected' });
      }
      if (action === 'reschedule') {
        if (!newDate) return res.status(400).json({ error: 'Missing newDate' });
        await prisma.booking.update({ where: { id: bookingId }, data: { date: new Date(newDate), status: 'rescheduled', remarks: remarks || null } });
        return res.status(200).json({ message: 'Booking rescheduled' });
      }
      return res.status(400).json({ error: 'Invalid action' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update booking', details: e instanceof Error ? e.message : e });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
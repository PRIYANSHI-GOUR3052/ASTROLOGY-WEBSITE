import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- Helper to get clientId from JWT or body/query ---
  function getClientId(req: NextApiRequest) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (typeof payload === 'object' && payload && 'id' in payload) {
          return (payload as any).id;
        }
      } catch {}
    }
    // fallback to body/query
    return req.body?.clientId || req.query?.clientId;
  }

  // --- Input validation helper ---
  function isValidBookingInput(astrologerId: any, clientId: any, date: any, type: any) {
    if (!astrologerId || !clientId || !date || !type) return false;
    if (isNaN(Number(astrologerId)) || isNaN(Number(clientId))) return false;
    if (typeof type !== 'string') return false;
    const d = new Date(date);
    if (isNaN(d.getTime()) || d < new Date()) return false;
    return true;
  }

  // --- POST: Create a booking ---
  if (req.method === 'POST') {
    const { astrologerId, date, type } = req.body;
    const clientId = getClientId(req);
    if (!isValidBookingInput(astrologerId, clientId, date, type)) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }
    try {
      // Slot availability check
      const slotTaken = await prisma.booking.findFirst({
        where: {
          astrologerId: Number(astrologerId),
          date: new Date(date),
          status: { notIn: ['cancelled', 'rejected'] },
        },
      });
      if (slotTaken) {
        return res.status(409).json({ error: 'Slot already booked' });
      }
      const booking = await prisma.booking.create({
        data: {
          astrologerId: Number(astrologerId),
          clientId: Number(clientId),
          date: new Date(date),
          type,
          status: 'upcoming',
        },
      });
      return res.status(201).json({ booking });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to create booking', details: e instanceof Error ? e.message : e });
    }
  }

  // --- GET: List all bookings for a client ---
  if (req.method === 'GET' && !req.query.availableSlots) {
    const clientId = getClientId(req);
    if (!clientId || isNaN(Number(clientId))) {
      return res.status(400).json({ error: 'Missing or invalid clientId' });
    }
    try {
      const bookings = await prisma.booking.findMany({
        where: { clientId: Number(clientId) },
        orderBy: { date: 'desc' },
        include: { astrologer: true },
      });
      return res.status(200).json({ bookings });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch bookings', details: e instanceof Error ? e.message : e });
    }
  }

  // --- GET: List available slots for an astrologer (user-side, no auth) ---
  if (req.method === 'GET' && req.query.availableSlots === '1') {
    const { astrologerId } = req.query;
    if (!astrologerId || isNaN(Number(astrologerId))) {
      return res.status(400).json({ error: 'Missing or invalid astrologerId' });
    }
    try {
      // Fetch all future slots for this astrologer
      const now = new Date();
      const slots = await prisma.astrologerAvailability.findMany({
        where: {
          astrologerId: Number(astrologerId),
          date: { gte: now },
        },
        orderBy: { date: 'asc' },
      });
      return res.status(200).json(slots);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch slots', details: e instanceof Error ? e.message : e });
    }
  }

  // --- PATCH: Update a booking (rate or cancel) ---
  if (req.method === 'PATCH') {
    const { bookingId, action, rating } = req.body;
    if (!bookingId || !action) {
      return res.status(400).json({ error: 'Missing bookingId or action' });
    }
    try {
      const booking = await prisma.booking.findUnique({ where: { id: Number(bookingId) } });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      if (action === 'cancel') {
        if (booking.status !== 'upcoming') {
          return res.status(400).json({ error: 'Only upcoming bookings can be cancelled' });
        }
        await prisma.booking.update({ where: { id: Number(bookingId) }, data: { status: 'cancelled' } });
        return res.status(200).json({ message: 'Booking cancelled' });
      }
      if (action === 'rate') {
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Invalid rating' });
        }
        if (booking.status !== 'completed') {
          return res.status(400).json({ error: 'Can only rate completed bookings' });
        }
        await prisma.booking.update({ where: { id: Number(bookingId) }, data: { rating } });
        return res.status(200).json({ message: 'Booking rated' });
      }
      return res.status(400).json({ error: 'Invalid action' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to update booking', details: e instanceof Error ? e.message : e });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
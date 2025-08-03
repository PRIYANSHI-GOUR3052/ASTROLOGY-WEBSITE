import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { RRule } from 'rrule';
import { z } from 'zod';

// Type for JWT payload
interface AstrologerJWTPayload {
  id: number;
  email: string;
  role: string;
  [key: string]: unknown;
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
        // Enhanced: Create recurring slots (no endDate)
        // Accepts: startDate, startTime, endTime, weekdays (array of 0=Sun...6=Sat)
        const schema = z.object({
          startDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Invalid startDate' }),
          startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
          endTime: z.string().regex(/^\d{2}:\d{2}$/),
          weekdays: z.array(z.number().int().min(0).max(6)).min(1),
          repeat: z.string().optional(), // legacy, not used here
        });
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const result = schema.safeParse(body);
        if (!result.success) {
          return res.status(400).json({ error: 'Validation failed', details: result.error.errors });
        }
        const { startDate, startTime, endTime, weekdays } = result.data;
        const start = new Date(startDate);
        // Default: generate for 30 days from startDate
        const end = new Date(start);
        end.setDate(end.getDate() + 9); // 30 days window
        // Map 0-6 to RRule weekdays [SU, MO, TU, WE, TH, FR, SA]
        const rruleWeekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
        const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // Generate all dates using rrule
        const rule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: new Date(startDate + 'T' + startTime + ':00Z'),
          until: new Date(end.toISOString().slice(0, 10) + 'T' + endTime + ':00Z'),
          byweekday: weekdays.map((d) => rruleWeekdays[d]),
        });
        const slotDates = rule.all();
        if (slotDates.length === 0) {
          return res.status(400).json({ error: 'No slots generated for given input' });
        }
        // Prepare a readable repeat string for all slots in this batch
        const repeatString = weekdays.sort().map((d) => weekdayLabels[d]).join(',');
        // Prepare slot objects
        const slotsToCreate = slotDates.map((date) => {
          // Set start and end times for each date
          const slotStart = new Date(date);
          const [sh, sm] = startTime.split(':').map(Number);
          slotStart.setUTCHours(sh, sm, 0, 0);
          const slotEnd = new Date(date);
          const [eh, em] = endTime.split(':').map(Number);
          slotEnd.setUTCHours(eh, em, 0, 0);
          return { date: slotStart, start: startTime, end: endTime, repeat: repeatString };
        });
        // Check for overlaps for each slot
        for (const slot of slotsToCreate) {
          const overlap = await prisma.astrologerAvailability.findFirst({
            where: {
              astrologerId,
              date: slot.date,
              OR: [
                {
                  start: { lte: slot.end },
                  end: { gte: slot.start },
                },
              ],
            },
          });
          if (overlap) {
            return res.status(409).json({ error: 'Overlapping slot exists', date: slot.date });
          }
        }
        // Create all slots in a transaction
        const created = await prisma.$transaction(
          slotsToCreate.map((slot) =>
            prisma.astrologerAvailability.create({
          data: {
            astrologerId,
                date: slot.date,
                start: slot.start,
                end: slot.end,
                repeat: slot.repeat,
              },
            })
          )
        );
        return res.status(201).json(created);
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
  } catch (e: unknown) {
    return res.status(500).json({ error: 'Internal server error', details: (e as Error).message });
  }
} 
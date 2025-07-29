import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Helper to get clientId from JWT or body/query
function getClientId(req: NextApiRequest): number | null {
  // First try to get from request body (for POST requests)
  if (req.body?.clientId) {
    const id = Number(req.body.clientId);
    if (!isNaN(id)) return id;
  }

  // Try to get from query params (for GET requests)
  if (req.query?.clientId) {
    const id = Number(req.query.clientId);
    if (!isNaN(id)) return id;
  }

  // Try JWT token from Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      if (typeof payload === 'object' && payload !== null && 'id' in payload) {
        const id = (payload as { id: unknown }).id;
        if (typeof id === 'number') return id;
        if (typeof id === 'string' && !isNaN(Number(id))) return Number(id);
      }
    } catch {
      // ignore JWT error
    }
  }

  // Try to get from localStorage token (if passed in body)
  if (req.body?.token) {
    try {
      const payload = jwt.verify(req.body.token, process.env.JWT_SECRET || 'your-secret-key');
      if (typeof payload === 'object' && payload !== null && 'id' in payload) {
        const id = (payload as { id: unknown }).id;
        if (typeof id === 'number') return id;
        if (typeof id === 'string' && !isNaN(Number(id))) return Number(id);
      }
    } catch {
      // ignore JWT error
    }
  }

  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { bookingId } = req.query;
      const clientId = getClientId(req);
      
      if (!clientId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID required' });
      }

      // Verify the booking belongs to this client
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          clientId: clientId,
          isPaid: true,
          chatEnabled: true
        }
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found or chat not enabled' });
      }

      // Get messages for this booking
      const messages = await prisma.chatMessage.findMany({
        where: { bookingId: Number(bookingId) },
        orderBy: { createdAt: 'asc' },
        include: {
          booking: {
            include: {
              client: { select: { id: true, name: true } },
              astrologer: { select: { id: true, firstName: true, lastName: true } }
            }
          }
        }
      });

      return res.status(200).json({ messages });

    } catch (error) {
      console.error('Get chat messages error:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { bookingId, message, messageType = 'text' } = req.body;
      const clientId = getClientId(req);
      
      if (!clientId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!bookingId || !message) {
        return res.status(400).json({ error: 'Booking ID and message required' });
      }

      // Verify the booking belongs to this client and is paid
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          clientId: clientId,
          isPaid: true,
          chatEnabled: true
        }
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found or chat not enabled' });
      }

      // Create new message
      const newMessage = await prisma.chatMessage.create({
        data: {
          bookingId: Number(bookingId),
          senderId: clientId,
          senderType: 'client',
          message,
          messageType,
          isRead: false
        },
        include: {
          booking: {
            include: {
              client: { select: { id: true, name: true } },
              astrologer: { select: { id: true, firstName: true, lastName: true } }
            }
          }
        }
      });

      console.log(`Client message created with senderType: client, senderId: ${clientId}`);

      return res.status(201).json({ message: newMessage });

    } catch (error) {
      console.error('Send chat message error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
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

      // Get booking details
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          clientId: clientId
        },
        include: {
          astrologer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              pricePerChat: true
            }
          }
        }
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json({ 
        booking,
        astrologer: booking.astrologer
      });

    } catch (error) {
      console.error('Get payment info error:', error);
      return res.status(500).json({ error: 'Failed to get payment info' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { bookingId, amount, paymentMethod } = req.body;
      const clientId = getClientId(req);
      
      console.log('Payment API received:', { bookingId, amount, paymentMethod, clientId });
      
      if (!clientId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!bookingId || !amount) {
        return res.status(400).json({ error: 'Booking ID and amount required' });
      }

      // Verify the booking belongs to this client
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          clientId: clientId
        },
        include: {
          astrologer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              pricePerChat: true
            }
          }
        }
      });

      console.log('Found booking:', booking);

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          bookingId: Number(bookingId),
          amount: parseFloat(amount),
          currency: 'INR',
          status: 'completed',
          paymentMethod: paymentMethod || 'mock',
          transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
      });

      console.log('Created payment:', payment);

      // Update booking to mark as paid and enable chat/video
      const updatedBooking = await prisma.booking.update({
        where: { id: Number(bookingId) },
        data: {
          isPaid: true,
          paymentId: payment.id.toString(), // Convert to string to match schema
          chatEnabled: true,
          videoEnabled: true,
          sessionStart: new Date(),
          sessionEnd: new Date(Date.now() + 60 * 60 * 1000) // 1 hour session
        }
      });

      console.log('Updated booking:', updatedBooking);

      return res.status(200).json({ 
        success: true,
        payment,
        booking: updatedBooking
      });

    } catch (error) {
      console.error('Process payment error:', error);
      return res.status(500).json({ error: 'Failed to process payment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
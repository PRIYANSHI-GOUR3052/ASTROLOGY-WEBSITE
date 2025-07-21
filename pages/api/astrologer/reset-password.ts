import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  try {
    // Find astrologer by reset token
    const astrologer = await prisma.astrologer.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() }, // not expired
      },
    });

    if (!astrologer) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update astrologer: set new password, clear token and expiry
    await prisma.astrologer.update({
      where: { id: astrologer.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message || 'Failed to reset password.' });
  }
} 
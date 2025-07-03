import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { generateResetToken } from '@/lib/utils';
import { sendResetPasswordEmail } from '@/lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const astrologer = await prisma.astrologer.findUnique({ where: { email } });
    if (!astrologer) {
      return res.status(404).json({ message: 'No astrologer found with this email' });
    }

    // Generate a secure reset token and expiry (1 hour)
    const resetToken = generateResetToken(32);
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    // Save token and expiry to astrologer
    await prisma.astrologer.update({
      where: { email },
      data: {  resetToken, resetTokenExpiry },
    });

    // Build reset URL (adjust domain as needed)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/astrologer/reset-password?token=${resetToken}`;

    // Send the reset email
    await sendResetPasswordEmail({
      to: email,
      resetUrl,
      astrologerName: astrologer.firstName,
    });

    return res.status(200).json({ message: 'Reset instructions sent to your email.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to process request' });
  }
} 
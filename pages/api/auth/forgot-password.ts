import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Note: To fully implement this feature, add these fields to the users model in schema.prisma:
// resetToken      String?   @db.VarChar(255)
// resetTokenExpiry DateTime?

// Configure your email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { email },
    });

    // For now, just return success regardless of whether user exists
    // This is a security best practice to not reveal if an email is registered
    
    if (user) {
      // Generate reset token (for future use when schema is updated)
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // TODO: When schema is updated with resetToken and resetTokenExpiry fields, uncomment:
      // await prisma.users.update({
      //   where: { email },
      //   data: {
      //     resetToken,
      //     resetTokenExpiry,
      //   },
      // });

      // Create reset URL
      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

      // TODO: Send email when SMTP is configured
      // const mailOptions = {
      //   from: process.env.SMTP_FROM || 'noreply@nakshatragyaan.com',
      //   to: email,
      //   subject: 'Password Reset Request - Nakshatra Gyaan',
      //   html: `[Email HTML template here]`
      // };
      // await transporter.sendMail(mailOptions);

      console.log(`Password reset requested for: ${email}`);
      console.log(`Reset token: ${resetToken}`);
      console.log(`Reset URL: ${resetUrl}`);
    }

    res.status(200).json({ 
      message: 'If an account with this email exists, you will receive a password reset link shortly.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

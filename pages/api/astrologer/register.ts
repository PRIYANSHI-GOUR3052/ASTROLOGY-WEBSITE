import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { uploadAstrologerProfileImageBuffer } from '@/lib/cloudinary';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await runMiddleware(req, res, upload.single('profileImage'));

  const body = req.body;
  const file = (req as any).file;

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    areasOfExpertise,
    yearsOfExperience,
    bankName,
    accountNumber,
    ifscCode,
  } = body;

  if (!firstName || !lastName || !email || !phone || !password || !areasOfExpertise) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existing = await prisma.astrologer.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await hashPassword(password);
    let profileImageUrl = '';
    if (file && file.buffer) {
      profileImageUrl = await uploadAstrologerProfileImageBuffer(file.buffer, email);
    }
    const astrologer = await prisma.astrologer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        areasOfExpertise: Array.isArray(areasOfExpertise) ? areasOfExpertise.join(',') : areasOfExpertise,
        yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : null,
        bankName,
        accountNumber,
        ifscCode,
        profileImage: profileImageUrl,
      },
    });
    return res.status(201).json({ message: 'Registration successful', astrologer: { id: astrologer.id, email: astrologer.email, profileImage: astrologer.profileImage } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Registration failed' });
  }
} 
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import multer from 'multer';
import { uploadAstrologerProfileImageBuffer } from '@/lib/cloudinary';
import { jwtVerify } from 'jose';

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to run multer in API route
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

// Type for JWT payload
interface AstrologerJWTPayload {
  id: number;
  email: string;
  role: string;
  [key: string]: any;
}

// Astrologer authentication using Authorization header only
async function getAstrologerFromRequest(req: NextApiRequest): Promise<AstrologerJWTPayload | null> {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);
  const token = authHeader?.replace('Bearer ', '');
  console.log('Extracted token:', token);
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const { payload } = await jwtVerify(token, secret);
    console.log('Decoded payload:', payload);
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getAstrologerFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const astrologerId = user.id;
  const astrologerEmail = user.email;

  if (typeof astrologerId !== 'number' || !astrologerEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Set up multer fields for single and array uploads
    await runMiddleware(
      req,
      res,
      upload.fields([
        { name: 'aadharCard', maxCount: 1 },
        { name: 'panCard', maxCount: 1 },
        { name: 'selfie', maxCount: 1 },
        { name: 'workProof', maxCount: 1 },
        { name: 'declarationForm', maxCount: 1 },
        { name: 'addressProof', maxCount: 1 },
        // For multiple certifications and educations
        { name: 'certificationFiles', maxCount: 10 },
        { name: 'degreeFiles', maxCount: 10 },
      ])
    );
    try {
      const files = (req as any).files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const body = req.body;
      // Upload single files to Cloudinary
      async function uploadFile(field: string) {
        if (files[field] && files[field][0]) {
          return await uploadAstrologerProfileImageBuffer(files[field][0].buffer, astrologerEmail + '-' + field);
        }
        return '';
      }
      const aadharCard = await uploadFile('aadharCard');
      const panCard = await uploadFile('panCard');
      const selfie = await uploadFile('selfie');
      const workProof = await uploadFile('workProof');
      const declarationForm = await uploadFile('declarationForm');
      const addressProof = await uploadFile('addressProof');

      // Upsert main verification record
      const verification = await prisma.astrologerVerification.upsert({
        where: { astrologerId },
        update: {
          aadharCard,
          panCard,
          selfie,
          workProof,
          declarationForm,
          addressProof,
          status: 'pending',
          adminRemarks: null,
        },
        create: {
          astrologerId,
          aadharCard,
          panCard,
          selfie,
          workProof,
          declarationForm,
          addressProof,
          status: 'pending',
        },
      });

      // Certifications (array of objects)
      const certs = body.certifications ? JSON.parse(body.certifications) : [];
      await prisma.astrologerCertification.deleteMany({ where: { verificationId: verification.id } });
      for (let i = 0; i < certs.length; i++) {
        let certFileUrl = '';
        if (files['certificationFiles'] && files['certificationFiles'][i]) {
          certFileUrl = await uploadAstrologerProfileImageBuffer(files['certificationFiles'][i].buffer, astrologerEmail + '-cert-' + i);
        }
        await prisma.astrologerCertification.create({
          data: {
            verificationId: verification.id,
            courseName: certs[i].courseName,
            instituteName: certs[i].instituteName,
            yearOfCompletion: certs[i].yearOfCompletion,
            certificateFile: certFileUrl || '',
          },
        });
      }

      // Educations (array of objects)
      const edus = body.educations ? JSON.parse(body.educations) : [];
      await prisma.astrologerEducation.deleteMany({ where: { verificationId: verification.id } });
      for (let i = 0; i < edus.length; i++) {
        let degreeFileUrl = '';
        if (files['degreeFiles'] && files['degreeFiles'][i]) {
          degreeFileUrl = await uploadAstrologerProfileImageBuffer(files['degreeFiles'][i].buffer, astrologerEmail + '-degree-' + i);
        }
        await prisma.astrologerEducation.create({
          data: {
            verificationId: verification.id,
            qualification: edus[i].qualification,
            fieldOfStudy: edus[i].fieldOfStudy,
            universityName: edus[i].universityName,
            degreeFile: degreeFileUrl || '',
          },
        });
      }

      return res.status(200).json({ message: 'Verification submitted successfully' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save verification data', details: e });
    }
  }

  if (req.method === 'GET') {
    // Only astrologer can fetch their own verification
    try {
      const verification = await prisma.astrologerVerification.findUnique({
        where: { astrologerId },
        include: {
          certifications: true,
          educations: true,
        },
      });
      return res.status(200).json({ verification });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch verification data', details: e });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 
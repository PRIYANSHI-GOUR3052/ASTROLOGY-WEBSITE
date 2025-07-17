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
        { name: 'certificationFiles', maxCount: 10 },
        { name: 'degreeFiles', maxCount: 10 },
      ])
    );
    try {
      const files = (req as any).files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const body = req.body;
      // Add logging for received data
      console.log('Received certifications:', body.certifications);
      console.log('Received certificationFiles:', files['certificationFiles']?.map(f => f.originalname));
      console.log('Received educations:', body.educations);
      console.log('Received degreeFiles:', files['degreeFiles']?.map(f => f.originalname));
      // Fetch current verification
      let verification = await prisma.astrologerVerification.findUnique({
        where: { astrologerId },
        include: { certifications: true, educations: true, astrologer: true },
      });
      if (!verification) {
        console.log('No verification found, creating new verification and related records...');
        // If not exists, create as before
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
        const newFiles = (req as any).files as {
          [fieldname: string]: Express.Multer.File[];
        };
        const newBody = req.body;
        // Upload single files to Cloudinary
        async function uploadFile(field: string) {
          if (newFiles[field] && newFiles[field][0]) {
            return await uploadAstrologerProfileImageBuffer(newFiles[field][0].buffer, astrologerEmail + '-' + field);
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
        await prisma.astrologerVerification.upsert({
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

        // Sync status to astrologer table
        await prisma.astrologer.update({
          where: { id: astrologerId },
          data: { verificationStatus: 'pending' },
        });

        // RE-FETCH verification with relations
        verification = await prisma.astrologerVerification.findUnique({
          where: { astrologerId },
          include: { certifications: true, educations: true, astrologer: true },
        });

        // Certifications (array of objects)
        const certs = newBody.certifications ? JSON.parse(newBody.certifications) : [];
        console.log('Certifications to process:', certs);
        for (let i = 0; i < certs.length; i++) {
          let certFileUrl = '';
          if (newFiles['certificationFiles'] && newFiles['certificationFiles'][i]) {
            certFileUrl = await uploadAstrologerProfileImageBuffer(newFiles['certificationFiles'][i].buffer, astrologerEmail + '-cert-' + i);
          }
          if (certs[i].id) {
            // Update existing
            const existingCert = await prisma.astrologerCertification.findUnique({ where: { id: certs[i].id } });
            console.log('Updating existing certification:', certs[i]);
            await prisma.astrologerCertification.update({
              where: { id: certs[i].id },
              data: {
                courseName: certs[i].courseName,
                instituteName: certs[i].instituteName,
                yearOfCompletion: certs[i].yearOfCompletion,
                certificateFile: certFileUrl || certs[i].certificateFile || existingCert?.certificateFile || '',
              },
            });
          } else {
            // Create new
            console.log('Creating new certification:', {
              verificationId: verification!.id,
              courseName: certs[i].courseName,
              instituteName: certs[i].instituteName,
              yearOfCompletion: certs[i].yearOfCompletion,
              certificateFile: certFileUrl || '',
            });
            const createdCert = await prisma.astrologerCertification.create({
              data: {
                verificationId: verification!.id,
                courseName: certs[i].courseName,
                instituteName: certs[i].instituteName,
                yearOfCompletion: certs[i].yearOfCompletion,
                certificateFile: certFileUrl || '',
              },
            });
            console.log('Created certification:', createdCert);
          }
        }

        // Educations (array of objects)
        const edus = newBody.educations ? JSON.parse(newBody.educations) : [];
        console.log('Educations to process:', edus);
        for (let i = 0; i < edus.length; i++) {
          let degreeFileUrl = '';
          if (newFiles['degreeFiles'] && newFiles['degreeFiles'][i]) {
            degreeFileUrl = await uploadAstrologerProfileImageBuffer(newFiles['degreeFiles'][i].buffer, astrologerEmail + '-degree-' + i);
          }
          if (edus[i].id) {
            // Update existing
            const existingEdu = await prisma.astrologerEducation.findUnique({ where: { id: edus[i].id } });
            console.log('Updating existing education:', edus[i]);
            await prisma.astrologerEducation.update({
              where: { id: edus[i].id },
              data: {
                qualification: edus[i].qualification,
                fieldOfStudy: edus[i].fieldOfStudy,
                universityName: edus[i].universityName,
                degreeFile: degreeFileUrl || edus[i].degreeFile || existingEdu?.degreeFile || '',
              },
            });
          } else {
            // Create new
            console.log('Creating new education:', {
              verificationId: verification!.id,
              qualification: edus[i].qualification,
              fieldOfStudy: edus[i].fieldOfStudy,
              universityName: edus[i].universityName,
              degreeFile: degreeFileUrl || '',
            });
            const createdEdu = await prisma.astrologerEducation.create({
              data: {
                verificationId: verification!.id,
                qualification: edus[i].qualification,
                fieldOfStudy: edus[i].fieldOfStudy,
                universityName: edus[i].universityName,
                degreeFile: degreeFileUrl || '',
              },
            });
            console.log('Created education:', createdEdu);
          }
        }
        // RE-FETCH again to return the latest state
        const fullVerification = await prisma.astrologerVerification.findUnique({
          where: { astrologerId },
          include: { certifications: true, educations: true, astrologer: true },
        });
        return res.status(200).json({ message: 'Verification submitted successfully!', verification: fullVerification });
      } else {
        console.log('Verification already exists, only updating re-uploaded fields and adding new certifications/educations if present...');
        // Only update fields that are re-uploaded
        const updateData: any = {};
        // Document fields
        const docFields = [
          { name: 'aadharCard', status: 'aadharStatus', remarks: 'aadharRemarks' },
          { name: 'panCard', status: 'panStatus', remarks: 'panRemarks' },
          { name: 'selfie', status: 'selfieStatus', remarks: 'selfieRemarks' },
          { name: 'workProof', status: 'workProofStatus', remarks: 'workProofRemarks' },
          { name: 'declarationForm', status: 'declarationStatus', remarks: 'declarationRemarks' },
          { name: 'addressProof', status: 'addressStatus', remarks: 'addressRemarks' },
        ];
        for (const field of docFields) {
          if (files[field.name] && files[field.name][0]) {
            const url = await uploadAstrologerProfileImageBuffer(files[field.name][0].buffer, astrologerEmail + '-' + field.name);
            updateData[field.name] = url;
            updateData[field.status] = 'pending';
            updateData[field.remarks] = null;
          }
        }
        // Reset overall status to pending if any doc/cert/edu is re-uploaded
        let anyDocUpdated = Object.keys(updateData).length > 0;
        // Certifications: update existing and create new if no id
        const certs = body.certifications ? JSON.parse(body.certifications) : [];
        let certFiles = files['certificationFiles'] || [];
        for (let i = 0; i < certs.length; i++) {
          const cert = certs[i];
          const existing = verification.certifications.find((c: any) => c.id === cert.id);
          if (existing && (existing.status === 'rejected' || existing.status === 'unverified')) {
            // If file is re-uploaded
            let certFileUrl = existing.certificateFile;
            if (certFiles[i]) {
              certFileUrl = await uploadAstrologerProfileImageBuffer(certFiles[i].buffer, astrologerEmail + '-cert-' + i);
              anyDocUpdated = true;
            }
            console.log('Updating existing certification:', cert);
            await prisma.astrologerCertification.update({
              where: { id: existing.id },
              data: {
                courseName: cert.courseName,
                instituteName: cert.instituteName,
                yearOfCompletion: cert.yearOfCompletion,
                certificateFile: certFileUrl,
                status: 'pending',
                remarks: null,
              },
            });
          } else if (!cert.id) {
            // Create new certification if no id
            let certFileUrl = '';
            if (certFiles[i]) {
              certFileUrl = await uploadAstrologerProfileImageBuffer(certFiles[i].buffer, astrologerEmail + '-cert-' + i);
              anyDocUpdated = true;
            }
            console.log('Creating new certification (update branch):', {
              verificationId: verification.id,
              courseName: cert.courseName,
              instituteName: cert.instituteName,
              yearOfCompletion: cert.yearOfCompletion,
              certificateFile: certFileUrl || '',
            });
            const createdCert = await prisma.astrologerCertification.create({
              data: {
                verificationId: verification.id,
                courseName: cert.courseName,
                instituteName: cert.instituteName,
                yearOfCompletion: cert.yearOfCompletion,
                certificateFile: certFileUrl || '',
              },
            });
            console.log('Created certification (update branch):', createdCert);
          }
        }
        // Educations: update existing and create new if no id
        const edus = body.educations ? JSON.parse(body.educations) : [];
        let eduFiles = files['degreeFiles'] || [];
        for (let i = 0; i < edus.length; i++) {
          const edu = edus[i];
          const existing = verification.educations.find((e: any) => e.id === edu.id);
          if (existing && (existing.status === 'rejected' || existing.status === 'unverified')) {
            let degreeFileUrl = existing.degreeFile;
            if (eduFiles[i]) {
              degreeFileUrl = await uploadAstrologerProfileImageBuffer(eduFiles[i].buffer, astrologerEmail + '-degree-' + i);
              anyDocUpdated = true;
            }
            console.log('Updating existing education:', edu);
            await prisma.astrologerEducation.update({
              where: { id: existing.id },
              data: {
                qualification: edu.qualification,
                fieldOfStudy: edu.fieldOfStudy,
                universityName: edu.universityName,
                degreeFile: degreeFileUrl,
                status: 'pending',
                remarks: null,
              },
            });
          } else if (!edu.id) {
            // Create new education if no id
            let degreeFileUrl = '';
            if (eduFiles[i]) {
              degreeFileUrl = await uploadAstrologerProfileImageBuffer(eduFiles[i].buffer, astrologerEmail + '-degree-' + i);
              anyDocUpdated = true;
            }
            console.log('Creating new education (update branch):', {
              verificationId: verification.id,
              qualification: edu.qualification,
              fieldOfStudy: edu.fieldOfStudy,
              universityName: edu.universityName,
              degreeFile: degreeFileUrl || '',
            });
            const createdEdu = await prisma.astrologerEducation.create({
              data: {
                verificationId: verification.id,
                qualification: edu.qualification,
                fieldOfStudy: edu.fieldOfStudy,
                universityName: edu.universityName,
                degreeFile: degreeFileUrl || '',
              },
            });
            console.log('Created education (update branch):', createdEdu);
          }
        }
        if (anyDocUpdated) {
          updateData.status = 'pending';
          updateData.adminRemarks = null;
          // Sync status to astrologer table
          await prisma.astrologer.update({
            where: { id: astrologerId },
            data: { verificationStatus: 'pending' },
          });
        }
        if (Object.keys(updateData).length > 0) {
          await prisma.astrologerVerification.update({
            where: { astrologerId },
            data: updateData,
          });
        }
        // Return updated verification
        const updatedVerification = await prisma.astrologerVerification.findUnique({
          where: { astrologerId },
          include: { certifications: true, educations: true, astrologer: true },
        });
        return res.status(200).json({ message: 'Updated only re-uploaded documents/certifications/educations.', verification: updatedVerification });
      }
    } catch (e) {
      console.error('Error in verification POST:', e);
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
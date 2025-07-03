import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAstrologerProfileImage(imageBase64: string, astrologerEmail: string): Promise<string> {
  // imageBase64: data URL or base64 string
  const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
    folder: 'nakshatra/astrologers',
    public_id: astrologerEmail.replace(/[^a-zA-Z0-9]/g, '_'),
    overwrite: true,
  });
  return uploadResponse.secure_url;
}

export async function uploadAstrologerProfileImageBuffer(buffer: Buffer, astrologerEmail: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'nakshatra/astrologers',
        public_id: astrologerEmail.replace(/[^a-zA-Z0-9]/g, '_'),
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result || !result.secure_url) return reject(new Error('No secure_url returned from Cloudinary'));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
} 
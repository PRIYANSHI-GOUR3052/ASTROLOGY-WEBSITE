import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImage = async (file: string, folder: string = 'zodiac-signs'): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'image',
      transformation: [
        { width: 400, height: 400, crop: 'fill' },
        { quality: 'auto' }
      ]
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const uploadAstrologerProfileImageBuffer = async (buffer: Buffer, email: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'astrologer-profiles',
        public_id: `profile_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
        transformation: [
          { width: 300, height: 300, crop: 'fill' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    ).end(buffer);
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary buffer upload error:', error);
    throw new Error('Failed to upload profile image');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
}; 
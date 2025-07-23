/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // SKIP ALL TYPESCRIPT CHECKS!
  },
  images: {
    domains: [
      'images.unsplash.com',
      'randomuser.me',
      'res.cloudinary.com',
    ],
  },
}

module.exports = nextConfig 
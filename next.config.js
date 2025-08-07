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
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Enable optimized route pre-loading
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*', 'framer-motion'],
    turbo: {
      rules: {
        '*.tsx': {
          loaders: ['@next/swc-loader'],
          as: '*.js',
        },
      },
    },
  },
  // Optimize chunk splitting for admin panel
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          admin: {
            name: 'admin',
            test: /[\\/]app[\\/]admin[\\/]/,
            chunks: 'all',
            priority: 10,
            enforce: true,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
          lucide: {
            name: 'lucide',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            chunks: 'all',
            priority: 15,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig 
let userConfig;
try {
  userConfig = await import('./v0-user-next.config.mjs'); // Ensure correct file extension
} catch {
  userConfig = {}; // Provide a default empty object to avoid errors
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

// Merge userConfig into nextConfig
mergeConfig(nextConfig, userConfig);

/** Function to merge user config */
function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) return;

  for (const key in userConfig) {
    if (
      typeof baseConfig[key] === 'object' &&
      !Array.isArray(baseConfig[key])
    ) {
      baseConfig[key] = {
        ...baseConfig[key],
        ...userConfig[key],
      };
    } else {
      baseConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;

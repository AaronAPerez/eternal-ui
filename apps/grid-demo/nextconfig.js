/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable transpiling packages from the monorepo
  transpilePackages: ['@eternal-ui/grid-system'],
  
  // Experimental features for better monorepo support
  experimental: {
    // Enable external directory support
    externalDir: true,
  },

  // Webpack configuration for monorepo packages
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle ESM packages properly
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    }
    
    return config
  },

  // TypeScript configuration
  typescript: {
    // Allow builds to succeed even with TypeScript errors during development
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Ignore ESLint errors during builds in development
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
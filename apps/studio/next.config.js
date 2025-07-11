/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@eternal-ui/core'],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
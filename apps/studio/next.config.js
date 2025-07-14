/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@eternal-ui/core']['@eternal-ui/grid-system'],
    turbopack: {
    // ...
  },
  
}

module.exports = nextConfig
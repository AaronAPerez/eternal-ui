import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true, // Temporary only!
  // "extends": ["next/core-web-vitals"],
  // "rules": {
  //   "@typescript-eslint/no-explicit-any": "error", // Keep this to enforce better typing
  //   "@typescript-eslint/no-unused-vars": "warn",   // Change from error to warning
  //   "react-hooks/exhaustive-deps": "error"         // avoid bugs
  }
};

export default nextConfig;

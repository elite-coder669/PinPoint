import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Matches all paths under this domain
      },
    ],
  },
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  }
};

export default nextConfig;

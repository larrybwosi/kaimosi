/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@kaimosi/ui',
    '@kaimosi/utils',
    '@kaimosi/types',
    '@kaimosi/database',
    '@kaimosi/auth',
    '@kaimosi/cms',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
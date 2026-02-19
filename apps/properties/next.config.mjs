/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@kaimosi/ui',
    '@kaimosi/utils',
    '@kaimosi/types',
    '@kaimosi/database',
    '@kaimosi/auth',
  ],
};

export default nextConfig;

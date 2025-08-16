/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zoyq22mhnbenndb7.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

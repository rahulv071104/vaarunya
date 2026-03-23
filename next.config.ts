/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zcx3j6iooi0zdpfw.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'bltu2rsuakafo8tc.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

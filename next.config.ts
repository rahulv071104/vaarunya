/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zcx3j6iooi0zdpfw.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

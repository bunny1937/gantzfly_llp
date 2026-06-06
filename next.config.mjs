/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 2,
  },
  turbopack: {
    root: "C:/Users/bhava/Ecommerce-git/giantzfly_llp",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.fontshare.com",
      },
    ],
  },
};

export default nextConfig;

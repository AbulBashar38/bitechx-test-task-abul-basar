import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from all domains including localhost
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

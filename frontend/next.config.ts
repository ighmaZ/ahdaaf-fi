import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  webpack: (config) => {
    // ignore thread-stream's test files so Vercel doesn't try to bundle them
    config.module.noParse = [/thread-stream[\\/]test/];
    return config;
  },
};

export default nextConfig;

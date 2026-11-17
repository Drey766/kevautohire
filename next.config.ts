import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    // The sample-photo host is slow under load; the default 7s produces 504s. Remove with the samples.
    imgOptTimeoutInSeconds: 25,
  },
  images: {
    // Sample-fleet photos only. Remove when the real fleet goes in.
    remotePatterns: [{ protocol: "https", hostname: "luxurycarhire.co.ke" }],
  },
};

export default nextConfig;

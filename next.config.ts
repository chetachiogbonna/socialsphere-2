import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "determined-panda-913.convex.cloud",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;

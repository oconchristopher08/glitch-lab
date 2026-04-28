import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["3000-b4c8cb83-b043-4e22-b8c3-2a429a80f6ab.proxy.daytona.works"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

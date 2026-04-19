import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/images/favicon.jpeg" }];
  },
};

export default nextConfig;

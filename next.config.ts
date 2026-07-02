import type { NextConfig } from "next";
import { PRODUCTION_DIST_DIR } from "./lib/next-dirs";

const nextConfig: NextConfig = {
  // Dev uses `.next-dev` via NEXT_DIST_DIR so production builds never corrupt the dev cache.
  distDir: process.env.NEXT_DIST_DIR || PRODUCTION_DIST_DIR,
  output: "export",
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML in out/ — works on GitHub Pages or any static host
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "", // e.g. "/portfolio" when served from a project page
  images: { unoptimized: true },
};

export default nextConfig;

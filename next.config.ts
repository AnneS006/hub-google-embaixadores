import type { NextConfig } from "next";

// No GitHub Pages o site fica em /hub-google-embaixadores; o workflow de deploy
// passa esse caminho. Localmente fica vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;

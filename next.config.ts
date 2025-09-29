import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Meli' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Meli' : '',
};

export default nextConfig;

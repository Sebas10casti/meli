import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo usar output: export para builds de producción
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
  }),
};

export default nextConfig;

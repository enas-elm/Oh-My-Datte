import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/nos-dattes',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

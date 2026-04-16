import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "..",
  },
  headers: async () => [
    {
      source: "/frames/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/frames/manifest.json",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, stale-while-revalidate=86400",
        },
      ],
    },
  ],
};

export default nextConfig;
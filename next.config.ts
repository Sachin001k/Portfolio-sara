import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the full-size zoom view (ZoomImage); 75 everywhere else.
    qualities: [75, 90],
    // Photos uploaded through the admin panel are served from Supabase
    // Storage's public bucket.
    remotePatterns: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? [
          new URL(
            "/storage/v1/object/public/**",
            process.env.NEXT_PUBLIC_SUPABASE_URL,
          ),
        ]
      : [],
  },
};

export default nextConfig;

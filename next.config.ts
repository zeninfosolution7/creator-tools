import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. THE VERCEL BINARY INJECTION: 
  // Forces Vercel to package the qpdf Linux binary with our specific API route.
  outputFileTracingIncludes: {
    "/api/unlock-pdf": ["./bin/**/*"],
  },

  // 2. YOUR EXISTING HEADERS:
  async headers() {
    return [
      {
        // Apply these headers to both ads.txt and robots.txt
        source: "/(ads.txt|robots.txt)",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
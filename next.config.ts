import type { NextConfig } from "next";

/**
 * @type {NextConfig}
 * @description Advanced Next.js configuration engineered for security, performance, and scalability.
 * Implements strict CSP headers, HSTS, and image optimization.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chandraprakashnyaupane.com.np',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Optimized modern formats
    minimumCacheTTL: 60,
  },

  // Hardened Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com;"
          }
        ]
      }
    ];
  },

  // Performance: Minification and clean output
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable cache during testing
  generateEtags: false,
  // Add build timestamp for cache busting
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  // Force full page reload on changes
  experimental: {
    strictNextHead: true,
  },
  // Disable static optimization during testing
  unstable_runtimeJS: true,
  // Headers to prevent caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 
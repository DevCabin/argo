/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable cache during testing
  generateEtags: false,
  // Add build timestamp for cache busting
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
};

module.exports = nextConfig; 
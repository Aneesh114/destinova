/** @type {import('next').NextConfig} */
const nextConfig = {
  // no need for 'experimental.serverActions' unless you use them
  serverExternalPackages: ['next-auth'], // ✅ Correct key for Next.js 15
};

module.exports = nextConfig;

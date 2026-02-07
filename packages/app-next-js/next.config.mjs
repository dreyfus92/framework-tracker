/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@framework-tracker/testdata'],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

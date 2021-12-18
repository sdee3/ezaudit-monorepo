// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    styledComponents: true,
  },
}

module.exports = nextConfig

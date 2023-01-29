/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['i0.hdslb.com','i1.hdslb.com','i2.hdslb.com','localhost']
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/manifesto',
        destination: '/blog/manifesto',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

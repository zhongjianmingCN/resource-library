/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'movie-posters-ming-1301508019.cos.ap-guangzhou.myqcloud.com'
        }
      ]
    }
  }
  
  module.exports = nextConfig
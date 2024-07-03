/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'illustoon.com',
            port: '',
            pathname: '/**', // update this line

          },
          // 
          {
            protocol: 'https',
            hostname: 'cdn.dollsofindia.com',
            port: '',
            pathname: '/**', // update this line

          },
        ],
      },
}

module.exports = nextConfig

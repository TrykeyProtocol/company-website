/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/library/api/:path*',
      },
    ];
  },
};

export default nextConfig;
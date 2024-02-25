/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://3.36.251.109:8080/api/:path*",
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

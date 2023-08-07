/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "nftstorage.link",
      "ipfs.filebase.io",
      "oaidalleapiprodscus.blob.core.windows.net"
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      encoding: false,
    };
    return config;
  },
};

module.exports = nextConfig;

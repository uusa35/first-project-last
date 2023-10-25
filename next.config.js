/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{loader:'@svgr/webpack',options:{icon:true}}],
    })

    return config
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
  async redirects() {
    return [];
  },
  env: {
    SECRET_APP_KEY: "",
    NEXT_PUBLIC_URL: "/",
    PUBLIC_URL: "/",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    domains: [
      "loremflickr.com",
      "*.ar-expo.ru",
      "ar-expo-backend.test",
      "cp.ar-expo.ru",
      "hammerhead-app-fhpzt.ondigitalocean.app",
      "hub-apps.ams3.cdn.digitaloceanspaces.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random",
      },
    ],
  },
};

module.exports = nextConfig;

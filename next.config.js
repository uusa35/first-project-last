/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "dev.ar-expo.ru",
        "ar-expo.ru",
        "cp.ar-expo.ru",
        "ar-expo-backend.test",
      ],
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:lang/home",
        destination: "/:lang",
      },
    ];
  },
  async redirects() {
    return [];
  },
  async headers() {
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ar-expo.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "ar-expo-backend.test",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cp.ar-expo.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hammerhead-app-fhpzt.ondigitalocean.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hub-apps.ams3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

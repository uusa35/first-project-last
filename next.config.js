/** @type {import('next').NextConfig} */
const withSvgr = require("next-plugin-svgr");

const nextConfig = withSvgr({
  reactStrictMode: false,
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
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "loremflickr.com",
      "*.ar-expo.ru",
      "ar-expo-backend.test",
      "cp.ar-expo.ru",
      "hammerhead-app-fhpzt.ondigitalocean.app",
      "hub-apps.ams3.cdn.digitaloceanspaces.com",
    ],
  },
});

module.exports = nextConfig;

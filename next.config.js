/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   serverActions : true
  // },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:lang/home",
        destination: "/:lang",
      },
      // {
      //   source: "/:lang/order/result/:reference_id",
      //   destination: "/:lang/order/:reference_id",
      // },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:lang/order/result/:reference_id",
        destination: "/:lang/order/:reference_id",
        permanent: true,
      },
    ];
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

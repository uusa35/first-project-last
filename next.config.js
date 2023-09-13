/** @type {import('next').NextConfig} */
const withSvgr = require("next-plugin-svgr");

const nextConfig = withSvgr({
  reactStrictMode: false,
  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "en",
  //   localeDetection: true,
  // },
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
    domains: ["loremflickr.com", "visit-kwt.com", "dar-altchel.com","ar-expo.ru"],
    minimumCacheTTL: 0,
    dangerouslyAllowSVG: true,
    staticPageGenerationTimeout: 60,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
      config.resolve.fallback = { fs: false };
      return config;
    },
  },
});

module.exports = nextConfig;

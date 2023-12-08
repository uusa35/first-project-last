import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        spin: "spin 1s linear infinite",
      },
      colors: {
        "picks-dark": "#02C9C0",
        "picks-light": "#E6F0EB",
        "picks-medium": "#80B49C",
        "picks-green": "#E6F0EB",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "8xl": "2500px",
      },
      fontFamily: {
        "Picks-Medium": ["Picks-Medium", "sans-serif"],
      },
      lineHeight: {
        "extra-loose": "2.5",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      lg: "1024px",
      xl: "1380px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
    require("tailwindcss-dir")(),
  ],
};
export default config;

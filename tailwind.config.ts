import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#10B981",
          "green-dark": "#059669",
          "green-light": "#D1FAE5",
          blue: "#3B82F6",
          "blue-dark": "#1D4ED8",
          "blue-light": "#DBEAFE",
          navy: "#0F2027",
          "navy-mid": "#1A3A4A",
          "navy-light": "#2D5A6E",
          accent: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;

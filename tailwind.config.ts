import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zealthyNeutralPrimary: "#fffcf7",
        zealthyNeutralSecondary: "#f2f4e9",
        zealthyPrimary: "#027c2a",
        zealthySecondary: "#00531b",
      },
    },
  },
  plugins: [],
};
export default config;

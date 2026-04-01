import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Ensures next-themes dark mode works perfectly
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1d4ed8',         // Existing: For your btn-brand
          cyan: '#22d3ee',         // Existing: For your btn-brand hover/accents
          primary: '#41A5F5',      // NEW (Logo Match): Use as border-brand-primary
          primaryHover: '#2892E6', // NEW: Use as border-brand-primaryHover
        }
      },
    },
  },
  plugins: [],
};
export default config;
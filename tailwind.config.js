/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',   // 🔥 MUST

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      colors: {
        brand: {
          blue: '#1d4ed8', // blue-700
          cyan: '#22d3ee', // cyan-400
        },
      },
    },
  },

  plugins: [],
}
const { colors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ...colors, green: "#10955d", bg: "#f2f2f2", black: "#08090a" },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
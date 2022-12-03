/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   green: "#10955d",
    //   bg: "#f2f2f2",
    //   black: "#08090a",
    // },
    extend: {},
  },
  plugins: [require("tailwindcss-debug-screens")],
};

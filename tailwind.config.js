/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        128: "36rem",
      },
      height: {
        128: "36rem",
      },
    },
  },
  plugins: [],
};

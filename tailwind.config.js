/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        144: "36rem",
        160: "40rem",
      },
      height: {
        144: "36rem",
        160: "40rem",
      },
      margin: {
        0.8: ".2rem",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        112: "28rem",
        120: "32rem",
        136: "36rem",
        160: "40rem",
      },
      height: {
        112: "28rem",
        120: "32rem",
        136: "36rem",
        160: "40rem",
      },
      margin: {
        0.8: ".2rem",
        0.7: ".175rem",
        0.6: ".15rem",
      },
      minWidth: {
        16: "4rem",
      },
      maxWidth: {
        16: "4rem",
        20: "5rem",
      },
      backgroundColor: {
        "green-450": "#2fd45d",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
    },
  },
  plugins: [],
};

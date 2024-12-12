/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        moveText: "moveText 3s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 100,
          },
        },
        moveText: {
          "0%": {
            width: 0,
            inset: "auto auto -0.20em auto",
          },
          "50%": {
            inset: "auto auto 0.20em auto",
          },
          "100%": {
            inset: "auto auto 0 auto",
          },
        },
      },
    },
  },
  plugins: [],
};

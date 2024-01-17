/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },

      screens: {
        sm: "450px",
      },

      backgroundImage: {
        me: "url('/assets/images/me.jpg')",
      },

      screens: {
        sm: "400px",
      },

      colors: {
        "guide-purple": "hsl(259, 100%, 65%)",
        "guide-light-red": "hsl(0, 100%, 67%)",

        "guide-off-white": "hsl(0, 0%, 94%)",
        "guide-light-grey": "hsl(0, 0%, 86%)",
        "guide-smokey-grey": "hsl(0, 1%, 44%)",
        "guide-off-black": "hsl(0, 0%, 08%)",
      },
    },
  },
  plugins: [],
};

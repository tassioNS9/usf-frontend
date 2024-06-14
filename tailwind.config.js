/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color
      },
      backgroundImage:{
        'background-main':"url('@/assets/background-main.jpg')",
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
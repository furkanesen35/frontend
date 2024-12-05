/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/**/*.{html,js,jsx}"],
 theme: {
  extend: {},
  screens: {
   '3xs': '320px',
   '2xs': '400px',
   'xs': '500px',
   'sm': '640px',
   'md': '768px',
   'lg': '1100px',
   'xl': '1280px',
   '2xl': '1536px',
   '3xl': '1700px',
  }
 },
 plugins: [],
}


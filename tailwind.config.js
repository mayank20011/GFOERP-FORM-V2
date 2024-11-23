/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        '3xs':'1090',
        'xs':'760'
      },
      backgroundImage:{
        'custom-image':"url('./src/img/grass.jpg')"
      }
    },
  },
  plugins: [],
}


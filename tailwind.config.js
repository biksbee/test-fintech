/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xl: "1140px",
      md: "890px",
      xx: "500px"
    },
    fontFamily: {
      mont: ['Montserrat Alternates'],
      exo: ['Exo\\ 2'],
      roboto: ['Roboto', 'sans-serif'],
      inter: ['Inter']
    },
    extend: {
      fontFamily: {
        mont: 'var(--font-mont)',
      },
      boxShadow: {
        '3xl': 'inset 0px 2px 4px 0px rgba(0,0,0,1)',
      },
      backgroundImage: {

      },
      colors: {
        c_grey: {
          white: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(132, 132, 132, 1)',
          dark: 'rgba(22, 22, 22, 1)',
          base: 'rgba(51, 53, 53, 1)',
          base900: 'rgba(65, 67, 78, 1)',
          border: 'rgba(42, 43, 49, 1)',
          section: 'rgba(36, 37, 41, 1)',
          accent: 'rgba(45, 45, 45, 1)'
        },
        c_orange: {
          error: 'rgba(231, 97, 67, 1)'
        },
        c_yellow: 'rgba(251, 229, 77, 1)'
      }
    },
  },
  plugins: [],
}
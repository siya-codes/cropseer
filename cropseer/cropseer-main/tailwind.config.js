/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: false,
  content: ["./src/*.{html,js,jsx}"],
  // content: ["./src/**/*.{js,jsx,ts,tsx"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '100%': { transform: 'translateX(-100%)' }
        },
        scroll2: {
          '100%': { transform: 'translateX(100%)' },
          '0%': { transform: 'translateX(0%)' },
        },
      },
      fontFamily: {
        
        'pop': ['Poppins'],
        'play': ['Playfair Display']
      
      },
    },
    screens: {
      'xsm': { 'min': '320px', 'max': '480px' },
      'sm': { 'min': '481px', 'max': '720px'},
      'md': { 'min': '721px', 'max': '1024px' },
      'lg': { 'min': '1025px', 'max': '1599px' },
      'xl': { 'min': '1600px', 'max': '1999px' },
      '2xl': { 'min': '2000px'},
    },
  },
  plugins: [],
}


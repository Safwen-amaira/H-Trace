/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f9e076',
          400: '#e6b422',
          500: '#c99c1a',
          600: '#a67c14',
          700: '#7e5d10',
        },
        dark: {
          800: '#1a1a1a',
          850: '#141414',
          900: '#0d0d0d',
          950: '#050505',
        },
      },
    },
  },
  plugins: [],
}

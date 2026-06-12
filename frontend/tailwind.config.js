/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fef9e7',
          100: '#fdf2c3',
          200: '#fbe49b',
          300: '#f9d76e',
          400: '#f5c542',
          500: '#e6b422',
          600: '#c99c1a',
          700: '#a67c14',
          800: '#7e5d10',
          900: '#644d0e',
          950: '#3b2c06',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(230, 180, 34, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(230, 180, 34, 0)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/grid.svg')",
      },
    },
  },
  plugins: [],
}

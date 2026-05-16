/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage': {
          50: '#f4f7f1',
          100: '#e7ede0',
          200: '#d1dfc5',
          300: '#b6cc9f',
          400: '#9caf88', // Primary Sage
          500: '#7d8f68',
          600: '#61714f',
          700: '#4c583e',
          800: '#3f4834',
          900: '#363d2d',
        },
        'pastel-green': '#d1dfc5',
        'soft-cream': '#fefae0',
        'muted-olive': '#6b705c',
        'cozy-tan': '#e9edc9',
        'dark-slate': '#363d2d', // Muted dark for text
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        handwritten: ['Dancing Script', 'cursive'], // For cute accents
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'soft-pulse': 'soft-pulse 4s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

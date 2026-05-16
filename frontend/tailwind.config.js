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
          50: '#f8fdf8',
          100: '#edf7ed',
          200: '#daeeda',
          300: '#c2e2c2',
          400: '#a3d1a3', // Brighter Primary Sage
          500: '#86b886',
          600: '#6a9c6a',
          700: '#547d54',
          800: '#446444',
          900: '#364d36',
        },
        'pastel-green': '#daeeda',
        'soft-cream': '#fffef0',
        'muted-olive': '#868e7d',
        'cozy-tan': '#f0f3db',
        'dark-slate': '#2d3b2d', // Fresher dark green
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

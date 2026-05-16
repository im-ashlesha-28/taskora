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
          50: '#fdfcf5', // Creamy Off-White
          100: '#f1f7ef', // Airy light sage
          100: '#f1f7ef',
          200: '#e4f0e2',
          300: '#cce4cc',
          400: '#a8d1a8', // Fresh Sage
          500: '#8ab38a', // Medium Sage
          600: '#729972',
          700: '#5c7d5c',
          800: '#4a664a',
          900: '#3d523d', // Depth accent, not muddy
        },
        'pastel-green': '#e4f0e2',
        'soft-cream': '#fdfbf0',
        'warm-beige': '#f5f5dc',
        'accent-sage': '#a8d1a8',
        'dark-slate': '#2d3b2d', 
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

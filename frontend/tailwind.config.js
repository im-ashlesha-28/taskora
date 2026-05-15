/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush-pink': '#F8D7DA',
        'soft-lavender': '#DCCEF9',
        'cream-white': '#FFF9F5',
        'warm-beige': '#F6EBDD',
        'sage-green': '#DCE8D5',
        'dusty-rose': '#E8B4B8',
        'muted-lilac': '#C8B6E2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'pill': '50px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

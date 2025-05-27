/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#FAF9F3',
        bleu: '#101F44',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        tanpearl: ['"Tan Pearl"', 'serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2D6A4F',
        sage: '#52B788',
        soft: '#EEF4EC',
        cream: '#F8FAF7',
        warm: '#95D5B2',
        deep: '#1B4332',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

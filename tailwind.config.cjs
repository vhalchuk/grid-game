/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans-serif': ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}

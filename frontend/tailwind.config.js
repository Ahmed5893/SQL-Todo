/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal': '#e8fffe',
        'teal-lightest':'#dae4e9'
      },
      minHeight: {
        'tab': '90vh',
      }
    },
  },
  plugins: [],
}
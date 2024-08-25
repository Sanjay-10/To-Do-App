/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        bg1:"#AFAFDA",
        bg2:"#E9DFD8"
      },
      fontFamily: {
        'google': ["Poppins", "sans-seri"]
      }
    }
  },
  plugins: [],
}
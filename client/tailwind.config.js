/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font1: ["Inter", "sans-serif"],
        font2: ["Roboto", "sans-serif"],
      },
      backgroundImage:  ({
        'bg-login': "url('https://vietnam.atalink.com/images/sign-in/bg.jpg')",
      })
    },
  },
  plugins: [],
}


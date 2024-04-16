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
      },
      backgroundImage:  ({
        'bg-login': "url('https://chonongsandaklak.vn/upload/2006294/20231103/image_2023_11_03T06_58_33_513Z_b5e2e.png')",
      })
    },
  },
  plugins: [],
}


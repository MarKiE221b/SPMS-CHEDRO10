/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        OpenSan: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


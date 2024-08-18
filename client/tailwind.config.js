export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#FF3951',
        secondary: '#0F1425'
      },
      fontFamily: {
        roboto: ["Poppins", 'sans-serif']
      }
    },
  },
  plugins: [],
}
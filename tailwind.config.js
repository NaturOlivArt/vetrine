/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wood-light': '#f5f0e1',  // beige clair
        'wood-medium': '#d2b48c', // beige/tan
        'wood-dark': '#8b4513',   // marron bois
        'olive': '#556b2f',       // vert olive
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Activer le mode sombre basé sur la classe
  theme: {
    extend: {
      colors: {
        'wood-light': '#f5f0e1',  // beige clair
        'wood-medium': '#d2b48c', // beige/tan
        'wood-dark': '#8b4513',   // marron bois
        'olive': '#556b2f',       // vert olive
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#d2b48c',
        }
      },
      backgroundColor: {
        dark: {
          primary: '#1a202c',
          secondary: '#2d3748',
          accent: '#4a5568',
        }
      },
      borderColor: {
        dark: {
          primary: '#4a5568',
          secondary: '#718096',
        }
      }
    },
  },
  plugins: [],
}


const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors, //Usamos los colores extras
      },
    },
  },
  plugins: [],
};
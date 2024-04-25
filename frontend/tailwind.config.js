/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        navy: '#111827'
      }
    },
    fontFamily: {
      sans: ['"Source Sans 3"', 'sans-serif'],
      serif: ['serif'],
    },
    screens: {
      sm: '540px',
      md: '830px',
      lg: '1024px',
    },
  },
};

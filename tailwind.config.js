/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#f9f9f9',
        'dark': '#1c1917',
        'component': '#FFF',
        'component-dark': '#3f3f46',
        'primary': '#74DEFB',
        'danger': '#ef4444',
      },
      transitionProperty: {
        'width': 'width'
      }
    },
  },
  plugins: [],
}


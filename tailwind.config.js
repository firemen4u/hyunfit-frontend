/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d23361',
        disable: "#c5c5c5"
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
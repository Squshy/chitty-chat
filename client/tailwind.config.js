module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      "backgroundColor": {
        "back": "#1e1e1e",
        "mid": "#2b2b2b"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

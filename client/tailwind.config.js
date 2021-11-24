module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        viat: {
          dark: "#1e1e1e",
          medium: "#2b2b2b",
          666: "#666666",
        },
      },
      backgroundColor: {
        back: "#1e1e1e",
        mid: "#2b2b2b",
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};

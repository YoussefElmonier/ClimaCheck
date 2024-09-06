module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-bg': 'rgba(17, 25, 40, 0.75)',
      },
      backdropBlur: {
        'lg': '16px',
      },
      backdropSaturate: {
        '180': '180%',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Add other plugins if necessary
  ],
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    // screens: {
    //   // 'sm': '576px',
    //   // 'md': '960px',
    //   // 'lg': '1440px',
    //   // defaults:
    //   // 'sm': '640px',
    //   // 'md': '768px',
    //   // 'lg': '1024px',
    //   // 'xl': '1280px',
    //   // '2xl': '1536px'
    // },
    // container: {
    //   center: true,
    // },
    extend: {
      screens: {
        'xs': '440px'
      },
      height: {
        '128': '32rem'
      },
      maxWidth: {
        'container': '1440px'
      },
      transitionDuration: {
        '2000': '2000ms'
      },
      zIndex: {
        'menu': '2000',
        'modal': '2100',
      }
    }
  },
  plugins: []
}

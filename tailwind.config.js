export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': {
        100: '#FFF2F1',
        200: '#ffc6bb',
        300: '#ff8199',
        400: '#ff7d80',
        500: '#ff1d4e',
      },
      'secondary': {
        100: '#4E5A6B',
        200:'#071741',
        300:'#E4E8EE',
        400:'#F2F4F7',
        500:"#98A0AC"
      },
      'contract': {
        100: "#fff"
      },
      'container': {
        center: true,
      },
    },
    fontFamily: {
      bold: ["bold", "sans-serif"],
      regular: ["regular", "sans"],
      italicBold: ['italic-bold', 'sans'],
      italic: ['italic', 'sans']

    },
    backgroundImage: {
      'male': "url('/male.jpeg')",
      'female': "url('/female.jpeg')",
      'transgender': "url('/transgender.jpeg')"
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: []
}


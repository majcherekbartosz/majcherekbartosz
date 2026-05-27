/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFF0F3',
          100: '#FFE0E6',
          200: '#FFD0DA',
          300: '#FFC0CE',
        },
        sage: {
          400: '#FF85A1',
          500: '#FF6B8A',
          600: '#E5547A',
          700: '#CC3D6A',
        },
        terracotta: {
          100: '#FFE0E6',
          300: '#FFB3C6',
          400: '#FF99B4',
          500: '#FF85A1',
          600: '#FF6B8A',
        },
        charcoal: {
          700: '#5C1A33',
          800: '#4A1028',
          900: '#380A1E',
        },
      },
    },
  },
  plugins: [],
}

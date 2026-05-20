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
          50: '#fdfaf5',
          100: '#faf4e8',
          200: '#f5e8d0',
          300: '#edd9b5',
        },
        sage: {
          400: '#8da67a',
          500: '#6b8f5a',
          600: '#547045',
          700: '#3d5232',
        },
        terracotta: {
          300: '#e8a98a',
          400: '#d4845a',
          500: '#c06840',
          600: '#a05030',
        },
        charcoal: {
          700: '#2d2d2d',
          800: '#1e1e1e',
          900: '#111111',
        },
      },
    },
  },
  plugins: [],
}

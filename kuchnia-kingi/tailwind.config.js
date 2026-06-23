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
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#FFF5F8',
          100: '#FFDDE8',
          200: '#FFB8CE',
          400: '#FF85A1',
          600: '#E8567E',
          800: '#A03B56',
          900: '#4B1528',
        },
        surface: {
          DEFAULT: '#FFF0F4',
          card: '#FFFFFF',
          dim: '#F7EBED',
          container: '#FCF1F3',
        },
        cream: {
          50: '#FFF0F4',
          100: '#FFE0E6',
          200: '#FFCCD6',
          300: '#FFC0CE',
        },
        sage: {
          400: '#57BF77',
          500: '#4AA868',
          600: '#3D8F59',
        },
        terracotta: {
          100: '#FFDDE8',
          300: '#FFB8CE',
          400: '#FF99B4',
          500: '#FF85A1',
          600: '#E8567E',
        },
        charcoal: {
          600: '#554245',
          700: '#1F1A1C',
          800: '#1F1A1C',
          900: '#0F0A0C',
        },
        outline: {
          DEFAULT: '#887175',
          variant: '#DBC0C4',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(255, 133, 161, 0.05)',
        'card-hover': '0 8px 30px rgba(255, 133, 161, 0.12)',
      },
    },
  },
  plugins: [],
}

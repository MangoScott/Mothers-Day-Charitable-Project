export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F8E1E7',
        secondary: '#FFF8E7',
        accent: '#D4A5A5',
        warm: '#5D4037',
        highlight: '#FFB6B9',
        rose: {
          50: '#FFF5F7',
          100: '#FFEEF2',
          200: '#FDDCE5',
          300: '#F8C4D4',
          400: '#F2A7BF',
          500: '#E8879F',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF8E7',
          200: '#FFF3D6',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

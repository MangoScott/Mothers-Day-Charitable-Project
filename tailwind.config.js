export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — refined warm rose system
        brand: {
          50: '#FFF5F7',
          100: '#FFE4EC',
          200: '#FECDD8',
          300: '#FDA4BC',
          400: '#FB7299',
          500: '#F43F76',
          600: '#E11D55',
          700: '#BE1142',
          800: '#9D0F39',
          900: '#811033',
        },
        // Soft warm neutrals (Apple-style)
        ink: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        // Legacy aliases (kept so any direct references still resolve)
        primary: '#F8E1E7',
        secondary: '#FFF8E7',
        accent: '#D4A5A5',
        warm: '#5D4037',
        highlight: '#FFB6B9',
        rose: {
          50:  '#FFF5F7',
          100: '#FFEEF2',
          200: '#FDDCE5',
          300: '#F8C4D4',
          400: '#F2A7BF',
          500: '#E8879F',
        },
        cream: {
          50:  '#FFFDF9',
          100: '#FFF8E7',
          200: '#FFF3D6',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'display': '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-brand': '0 20px 60px -20px rgba(225, 29, 85, 0.45)',
        'glow-soft':  '0 10px 30px -10px rgba(244, 63, 118, 0.25)',
        'card':       '0 1px 2px rgba(24, 24, 27, 0.04), 0 8px 24px -8px rgba(24, 24, 27, 0.08)',
        'card-hover': '0 1px 2px rgba(24, 24, 27, 0.04), 0 24px 48px -16px rgba(225, 29, 85, 0.18)',
        'inner-hl':   'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      backgroundImage: {
        'aurora':     'radial-gradient(ellipse at 20% 0%, rgba(244,63,118,0.18), transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(251,191,36,0.14), transparent 55%), radial-gradient(ellipse at 60% 100%, rgba(168,85,247,0.14), transparent 50%)',
          'brand-gradient': 'linear-gradient(135deg, #F43F76 0%, #E11D55 50%, #F97316 100%)',
        'brand-soft':     'linear-gradient(135deg, #FFF5F7 0%, #FFE4EC 50%, #FFF1F2 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-in':    'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in':   'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'shimmer':    'shimmer 2.6s linear infinite',
        'float':      'float 9s ease-in-out infinite',
        'aurora':     'auroraShift 22s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.7' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        auroraShift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%':      { transform: 'translate3d(2%, -2%, 0) scale(1.05)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

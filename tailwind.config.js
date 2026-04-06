/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        urj: {
          black:    '#0B0C0E',
          soft:     '#121212',
          card:     '#161718',
          border:   '#1E1F21',
          silver:   '#C0C0C0',
          'silver-dim': '#A1A1A1',
          'silver-dark': '#6C6C6C',
          gold:     '#D4AF37',
          'gold-light': '#FBF5A9',
          'gold-dark':  '#B59410',
          'gold-glow':  'rgba(212,175,55,0.18)',
        },
      },
      fontFamily: {
        inter:  ['"Inter Tight"', 'Inter', 'sans-serif'],
        mono:   ['"JetBrains Mono"', '"Roboto Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FBF5A9 0%, #D4AF37 50%, #B59410 100%)',
        'gold-subtle':   'linear-gradient(135deg, #D4AF37 0%, #B59410 100%)',
      },
      keyframes: {
        'load-bar': {
          '0%':   { width: '0%', opacity: '1' },
          '80%':  { width: '100%', opacity: '1' },
          '100%': { width: '100%', opacity: '0' },
        },
        'blink-cursor': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        'pulse-gold': {
          '0%,100%': { boxShadow: '0 0 8px rgba(212,175,55,0.4)' },
          '50%':     { boxShadow: '0 0 24px rgba(212,175,55,0.9)' },
        },
        'float-up': {
          '0%':   { transform: 'translateY(0)',   opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
      },
      animation: {
        'load-bar':     'load-bar 1.8s cubic-bezier(0.4,0,0.2,1) forwards',
        'blink-cursor': 'blink-cursor 1s step-end infinite',
        'pulse-gold':   'pulse-gold 2s ease-in-out infinite',
        'float-up':     'float-up 3s ease-out infinite',
      },
    },
  },
  plugins: [],
}

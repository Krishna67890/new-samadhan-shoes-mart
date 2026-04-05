/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
        },
        blue: {
          600: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        black: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

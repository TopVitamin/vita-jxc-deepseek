/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#b8d4fe',
          300: '#85b8fd',
          400: '#4a94fa',
          500: '#1a6ff5',
          600: '#0b54d6',
          700: '#0c41ae',
          800: '#10378e',
          900: '#133175',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#8B0000',
            dark: '#5a0000',
          },
          gold: {
            DEFAULT: '#FFD700',
            dark: '#DAA520',
          },
          bg: {
            light: '#fef8f0',
            dark: '#1a1a1a',
          }
        },
        fontFamily: {
          cairo: ['Cairo', 'Tajawal', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
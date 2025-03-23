/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'argo': {
          'dark': '#0a0f0d',
          'darker': '#050807',
          'light': '#1a2f24',
          'accent': '#00ff9d',
          'accent-dark': '#00cc7d',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 
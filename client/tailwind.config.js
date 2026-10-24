/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Amazon Prime Video Theme Palette
        prime: {
          darkest: '#00050d', // Prime midnight black-navy background
          dark: '#0a0e17',    // Prime dark surface
          surface: '#0f172a', // Prime panel background
          card: '#1a2436',    // Prime card surface
          cardHover: '#223048',
          border: '#1f2e46',  // Prime subtle border
          blue: '#00a8e1',    // Iconic Prime Cyan Blue
          blueHover: '#1a98ff',
          blueDark: '#0073a8',
          gold: '#f59e0b',    // Amazon Smile gold/amber
          muted: '#8197a4',   // Prime muted slate
        },
        // Backwards compatibility mappings for cinema classes to Prime Theme
        cinema: {
          darkest: '#00050d',
          dark: '#0a0e17',
          surface: '#0f172a',
          card: '#1a2436',
          border: '#1f2e46',
          red: '#00a8e1',      // Mapped to Prime Cyan
          redHover: '#1a98ff', // Mapped to Prime Cyan hover
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-prime': '0 0 25px -4px rgba(0, 168, 225, 0.45)',
        'glow-cyan': '0 0 20px -3px rgba(0, 168, 225, 0.4)',
        'glow-gold': '0 0 20px -3px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}

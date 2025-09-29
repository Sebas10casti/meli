/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        'meli': {
          'blue': '#3483fa',
          'green': '#00a650',
          'yellow': '#fff159',
          'gray': {
            100: '#f5f5f5',
            200: '#e6e6e6',
            300: '#cccccc',
            400: '#999999',
            500: '#666666',
            600: '#333333',
            700: '#1a1a1a',
          }
        }
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      }
    },
  },
  plugins: [],
}

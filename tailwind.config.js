/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          500: '#4285f4',
          600: '#3367d6',
          700: '#1a73e8',
          900: '#1557b7'
        },
        secondary: {
          50: '#e6f4ea',
          500: '#34a853',
          600: '#2d7a48',
          700: '#1e7e34'
        },
        accent: {
          yellow: '#fbbc04',
          red: '#ea4335',
          purple: '#a142f4'
        },
        background: '#f8f9fa',
        surface: '#ffffff',
        border: '#e0e0e0',
        divider: '#eeeeee',
        textPrimary: '#333333',
        textSecondary: '#666666',
        textHint: '#999999'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      maxWidth: {
        'mobile': '480px'
      },
      animation: {
        'wave': 'wave 2.5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
};

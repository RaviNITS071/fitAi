/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          border: '#E2E8F0',
          bg: '#F8FAFC',
          green: '#22C55E',
          greenHover: '#16A34A',
          amber: '#F59E0B',
          red: '#EF4444'
        }
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px rgba(0, 0, 0, 0.07)',
        dropdown: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        xl: '12px',
        lg: '8px',
      }
    },
  },
  plugins: [],
}

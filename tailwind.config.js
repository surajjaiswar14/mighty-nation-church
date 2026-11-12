/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        church: {
          navy: '#0f172a',
          primary: '#1e40af',       // Serene Royal Blue
          primaryLight: '#3b82f6',
          secondary: '#0284c7',     // Peaceful Sky Blue
          skyLight: '#e0f2fe',
          skyIce: '#f0f9ff',
          serene: '#f8fafc',
          gold: '#d97706',          // Warm Elegant Gold
          goldLight: '#f59e0b',
          goldWarm: '#fbbf24',
          goldPale: '#fef3c7',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'peaceful': '0 10px 30px -5px rgba(2, 132, 199, 0.08)',
        'divine': '0 20px 40px -15px rgba(30, 64, 175, 0.1)',
        'gold-glow': '0 10px 25px -5px rgba(217, 119, 6, 0.25)',
      }
    },
  },
  plugins: [],
}

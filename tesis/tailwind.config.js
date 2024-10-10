/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'brand-green': '#00ff00', 
        'brand-orange': '#ff9900',
      },
    },
  },
  plugins: [],
}

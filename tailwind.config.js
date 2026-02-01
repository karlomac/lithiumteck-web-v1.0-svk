/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#13ec13',
        'background-light': '#f6f8f6',
        'background-dark': '#102210',
        'terminal-bg': '#0a140a',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      },
    },
  },
  plugins: [],
}

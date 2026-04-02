/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#FFD700',
        'primary-dark': '#FFC000',
        black:     '#000000',
        bg:        '#0D0D0D',
        surface:   '#1A1A1A',
        muted:     '#888888',
        body:      '#E8E8E8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tactical: '0.25em',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1F5FBF',   // azul del brochure
          navy: '#14284B',   // azul oscuro
          green: '#139A6C',  // verde del logo
          mint: '#3DD6A0',   // verde claro para fondos oscuros
          ink: '#1E2228',    // gris carbón (footer / textos)
          mist: '#F3F6FB',   // fondo suave
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // logos de clientes moviéndose hacia la derecha
        marquee: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "logo-text-flip": {
          "0%": { transform: "rotateY(0deg)" },
          "85%": { transform: "rotateY(360deg)" }, // smooth forward flip
          "100%": { transform: "rotateY(360deg)" }, // pause at original
        },
      },
      animation: {
        "logo-text-flip": "logo-text-flip 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

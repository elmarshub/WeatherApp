import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        dark: {
          dark: "rgb(23,31,49)",
          darkInput: "rgb(12,16,28)",
        },
        light: {
          light: "rgb(236,243,246)",
          lightInput: "hsl(0, 0%, 100%)",
        },
      },
    },
  },
  plugins: [],
};

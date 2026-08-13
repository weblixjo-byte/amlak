/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#1E3A8A",
          brand: "#1E3A8A",
          dark: "#1E3A8A",
          hover: "#1E3A8A",
          light: "#1E3A8A",
          border: "#1E3A8A",
        },
        brand: "#1E3A8A",
        accent: "#1E3A8A",
        surface: "#FAFAFA",
        "surface-card": "#FFFFFF",
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "sans-serif"],
        ibm: ["IBM Plex Sans Arabic", "sans-serif"],
        headline: ["IBM Plex Sans Arabic", "sans-serif"],
        serif: ["IBM Plex Sans Arabic", "sans-serif"],
        mono: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
}

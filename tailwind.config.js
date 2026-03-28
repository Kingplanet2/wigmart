/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf8f0",
          100: "#faefd9",
          200: "#f4daa8",
          300: "#ecc06e",
          400: "#e3a03c",
          500: "#d4831e",
          600: "#bc6515",
          700: "#9a4c13",
          800: "#7c3d16",
          900: "#663315",
          950: "#3a1a08",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "glow": "0 0 40px rgba(212, 131, 30, 0.15)",
        "glow-lg": "0 0 80px rgba(212, 131, 30, 0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.16)",
      },
    },
  },
  plugins: [],
};
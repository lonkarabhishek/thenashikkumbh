import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FFF8F0",
          100: "#FFF0DB",
          200: "#FFE0B8",
          300: "#FFCC8A",
          400: "#FFB347",
          500: "#FF8C00",
          600: "#E67A00",
          700: "#CC6900",
          800: "#A35500",
          900: "#7A4000",
        },
        gold: {
          50: "#FFFEF5",
          100: "#FFFCE6",
          200: "#FFF8C4",
          300: "#FFF19E",
          400: "#FFE566",
          500: "#FFD700",
          600: "#E6C200",
          700: "#B89800",
          800: "#8A7200",
          900: "#5C4D00",
        },
        cream: {
          50: "#FFFDF7",
          100: "#FFF9EB",
          200: "#FFF5DC",
          300: "#FFEFC8",
          400: "#FFE8B0",
          500: "#FFF8F0",
        },
        temple: {
          50: "#F5F0EB",
          100: "#E8DDD3",
          200: "#D4C4B0",
          300: "#B8A088",
          400: "#8B7355",
          500: "#6B5B3E",
          600: "#4A3F2B",
          700: "#3A3020",
          800: "#2A2218",
          900: "#1A1510",
        },
        sacred: {
          red: "#C41E3A",
          maroon: "#800020",
          vermillion: "#E34234",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Tiro Devanagari Hindi", "serif"],
      },
      backgroundImage: {
        "mandala-pattern": "url('/images/mandala-pattern.svg')",
        "hero-gradient":
          "linear-gradient(135deg, rgba(255,140,0,0.9) 0%, rgba(200,80,0,0.8) 50%, rgba(128,0,32,0.9) 100%)",
        "sacred-gradient":
          "linear-gradient(180deg, #FFF8F0 0%, #FFE0B8 50%, #FFF8F0 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,215,0,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,215,0,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

/**
 * Nashik Kumbh — folk-art design system.
 *
 * Palette rules: one saffron accent, one indigo depth, ink on warm paper.
 * Gold is a rule-line and detail colour, never a fill for large areas.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper — page and card backgrounds
        cream: {
          50: "#FEFCF8",
          100: "#FBF6EC",
          200: "#F5ECDC",
          300: "#EDDFC7",
          400: "#E2CEAC",
          500: "#FBF6EC",
        },
        // Ink — all text, from headings down to muted captions
        temple: {
          50: "#F7F3ED",
          100: "#EBE3D8",
          200: "#D6C9B8",
          300: "#B3A28C",
          400: "#8C7860",
          500: "#6B5847",
          600: "#4A3B2E",
          700: "#33271E",
          800: "#241B14",
          900: "#16110D",
        },
        // Saffron — the single accent. Deep and earthen, not neon.
        saffron: {
          50: "#FEF6EC",
          100: "#FCE9D2",
          200: "#F8D0A3",
          300: "#F4B36C",
          400: "#EE9739",
          500: "#E07B14",
          600: "#C4650B",
          700: "#9E4F09",
          800: "#763A08",
          900: "#4E2606",
        },
        // Muted gold — rule lines, borders, small marks
        gold: {
          50: "#FBF8EC",
          100: "#F5EED2",
          200: "#EBDFA8",
          300: "#DFCC78",
          400: "#D2B94F",
          500: "#C9A227",
          600: "#A8851C",
          700: "#836717",
          800: "#5E4A12",
          900: "#3B2E0C",
        },
        // Indigo — night sky, river depth, dark sections
        indigo: {
          50: "#EEF2F9",
          100: "#D8E1F0",
          200: "#AFC0DD",
          300: "#7E97C3",
          400: "#4E6DA3",
          500: "#2F4A7D",
          600: "#23395F",
          700: "#1A2B48",
          800: "#121D31",
          900: "#0B1220",
        },
        // Godavari — water, calm states, "safe" cues
        river: {
          50: "#EDF7F6",
          100: "#D3ECEA",
          200: "#A6D8D4",
          300: "#6FBDB8",
          400: "#41A19C",
          500: "#2E8B87",
          600: "#1F6E6B",
          700: "#175452",
          800: "#0F3B39",
          900: "#082322",
        },
        sacred: {
          red: "#C1272D",
          maroon: "#7C1D1A",
          vermillion: "#D9432F",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Noto Serif Devanagari", "serif"],
      },
      fontSize: {
        // Fluid display sizes so headlines hold shape from 360px to 1440px
        display: [
          "clamp(2.5rem, 1.4rem + 4.6vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-sm": [
          "clamp(2rem, 1.3rem + 3vw, 3.75rem)",
          { lineHeight: "1.06", letterSpacing: "-0.025em" },
        ],
        title: [
          "clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)",
          { lineHeight: "1.14", letterSpacing: "-0.02em" },
        ],
        subtitle: [
          "clamp(1.25rem, 1.1rem + 0.7vw, 1.6rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
        lede: [
          "clamp(1.0625rem, 1rem + 0.4vw, 1.3125rem)",
          { lineHeight: "1.65" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        // Warm-tinted, low-contrast. No black shadows on cream.
        soft: "0 1px 2px rgba(52, 39, 30, 0.04), 0 6px 20px -8px rgba(52, 39, 30, 0.10)",
        lift: "0 2px 4px rgba(52, 39, 30, 0.05), 0 14px 36px -12px rgba(52, 39, 30, 0.16)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        "mandala-pattern": "url('/images/mandala-pattern.svg')",
        "hero-gradient":
          "linear-gradient(160deg, rgba(18,29,49,0.92) 0%, rgba(26,43,72,0.86) 45%, rgba(120,58,8,0.82) 100%)",
        "sacred-gradient":
          "linear-gradient(180deg, #FEFCF8 0%, #F5ECDC 50%, #FEFCF8 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 7s ease-in-out infinite",
        "rotate-slow": "rotateSlow 60s linear infinite",
        ripple: "ripple 2.4s ease-out infinite",
        "draw-in": "drawIn 1.6s ease-out forwards",
        "ken-burns": "kenBurns 24s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        ripple: {
          "0%": { transform: "scale(0.85)", opacity: "0.5" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        drawIn: {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.1) translate(-1%, -1%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

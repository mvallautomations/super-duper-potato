import type { Config } from "tailwindcss";

// mid·voyage design system — locked tokens
// Primary accent: #C85A3C (terracotta) — labels/eyebrows ONLY, never fills
// Background: #EDEAE3 (parchment canvas) — NEVER pure white
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // === COLORS ===
      colors: {
        // Backgrounds
        "mv-base": "#EDEAE3",        // parchment canvas
        "mv-surface": "#F5F2EB",     // warm white — cards, panels
        "mv-elevated": "#FAF8F4",    // near-white — nested cards
        "mv-invert": "#18171A",      // near-black

        // Ink / Text
        "ink-primary": "#18171A",
        "ink-secondary": "#5A5855",
        "ink-muted": "#9B978F",
        "ink-ghost": "#C4BFB7",      // ghost italic word signature

        // Accent
        "terra": "#C85A3C",          // terracotta — labels ONLY
        "terra-light": "#E89880",    // hover
        "terra-dark": "#9E3F28",     // pressed
        "sage": "#6B8A72",           // secondary accent
        "sand": "#B8A88A",           // warm decorative

        // Dark mode overrides via CSS vars (handled in globals.css)
      },

      // === TYPOGRAPHY ===
      fontFamily: {
        // Display: Plus Jakarta Sans 800 (FK Grotesk proxy)
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        // Body: DM Sans (FK Grotesk Neue proxy)
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // Serif ghost word: DM Serif Display italic (editorial accent)
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        // Utility / Code
        mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
      },

      // === TYPE SCALE ===
      fontSize: {
        "2xs": "0.75rem",     // 12px
        xs: "0.875rem",       // 14px
        sm: "0.875rem",       // 14px
        base: "1rem",         // 16px
        md: "1.125rem",       // 18px
        lg: "1.375rem",       // 22px
        xl: "1.75rem",        // 28px
        "2xl": "2.25rem",     // 36px
        // Hero uses clamp via CSS
      },

      // === SPACING (4px base) ===
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
      },

      // === BORDER RADIUS (near-square, editorial) ===
      borderRadius: {
        sm: "3px",     // buttons, inputs
        md: "6px",     // small cards
        lg: "10px",    // cards
        xl: "16px",    // panels
        full: "9999px",
      },

      // === MOTION ===
      transitionTimingFunction: {
        "mv-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "220ms",
        slow: "400ms",
      },

      // === CONTAINER ===
      maxWidth: {
        prose: "68ch",
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;

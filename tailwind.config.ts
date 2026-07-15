import type { Config } from "tailwindcss";

/**
 * Semantic tokens → CSS variables. Every color/radius/shadow reads from a
 * `--var` defined per theme in app/globals.css, so switching `data-theme` on
 * <html> reskins the whole site with zero component changes. This is the
 * runtime version of the Pryxus `variables.css` reskin contract.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          deep: "var(--accent-deep)",
        },
        "accent-2": "var(--accent-2)",
        gold: "var(--gold)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        token: "var(--radius)",
        "token-lg": "var(--radius-lg)",
      },
      boxShadow: {
        luxe: "0 24px 60px -28px var(--shadow)",
        card: "0 14px 44px -24px var(--shadow)",
        glow: "0 0 70px -12px var(--glow)",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

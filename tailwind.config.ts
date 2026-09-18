import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vellum: "#EDEDE7",
        ink: "#16181D",
        "codex-navy": "#1B2440",
        "seal-red": "#9A2B1E",
        "gazette-gold": "#A9832B",
        slate: "#5B5E66",
      },
      fontFamily: {
        caslon: ["var(--font-caslon)", "Georgia", "serif"],
        plex: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        "plex-mono": ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F2",
        ink: "#14181F",
        graphite: "#5A5E66",
        stone: "#8A8D93",
        line: "#E6E3DC",
        sidebar: "#F1F0EC",
        brass: "#A88A55",
        "brass-deep": "#957746",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;

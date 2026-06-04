import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        surface2: "hsl(var(--surface-2))",
        line: "hsl(var(--line))",
        muted: "hsl(var(--muted))",
        subtle: "hsl(var(--subtle))",
        accent: "hsl(var(--accent))",
        accentText: "hsl(var(--accent-text))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
      boxShadow: {
        soft: "0 18px 80px rgba(0,0,0,.28)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      animation: {
        "pulse-line": "pulseLine 3s ease-in-out infinite",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: ".22", transform: "scaleX(.78)" },
          "50%": { opacity: ".72", transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

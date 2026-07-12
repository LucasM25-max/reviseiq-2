import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#171B1F",
          soft: "#2A3037",
        },
        paper: {
          DEFAULT: "#F3F4F6",
          dim: "#E8E9E4",
          surface: "#FFFFFF",
        },
        slate: {
          DEFAULT: "rgb(var(--slate) / <alpha-value>)",
          light: "rgb(var(--slate-light) / <alpha-value>)",
        },
        cobalt: {
          DEFAULT: "#2954A5",
          dark: "#1E3F80",
          light: "#EAF0FB",
        },
        amber: {
          DEFAULT: "#D98E2B",
          light: "#FBF0DE",
        },
        signal: {
          DEFAULT: "#2E9B6F",
          light: "#E4F5EC",
        },
        danger: {
          DEFAULT: "#C24E4E",
          light: "#FBEAEA",
        },
        topic: {
          1: "#7C5CBF",
          2: "#C14E77",
          3: "#D9713D",
          4: "#7C8C3E",
          5: "#23897E",
          6: "#6B4C93",
          7: "#3E8259",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(23,27,31,0.04), 0 8px 24px -12px rgba(23,27,31,0.12)",
        raised: "0 2px 4px rgba(23,27,31,0.06), 0 16px 32px -16px rgba(23,27,31,0.18)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(23,27,31,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;

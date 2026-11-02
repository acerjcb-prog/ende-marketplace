import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#13294B", 700: "#1B3A6B", 50: "#EEF2F8" },
        marun: { DEFAULT: "#7A1F2B", 700: "#5E1721", 50: "#F8ECEE" },
        tanah: { DEFAULT: "#A8743F", 100: "#EFE3D3", 50: "#F8F3EC" },
        ink: "#1A1F2B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

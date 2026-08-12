import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "#8f2830",
        graphite: "#17202a",
        steel: "#536271",
        mist: "#eef4f7",
        ice: "#f7fbfd"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 32, 42, 0.12)"
      }
    }
  },
  plugins: []
}

export default config

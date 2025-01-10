import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#9793FDFF",
          DEFAULT: "#573BF6FF",
          dark: "#451DD8FF",
        },
        secondary: {
          light: "#FDA4DBFF",
          DEFAULT: "#F43F96FF",
          dark: "#be123c",
        },
        accent: {
          light: "#d9f99d",
          DEFAULT: "#84cc16",
          dark: "#4d7c0f",
        },
        neutral: {
          light: "#e5e7eb",
          DEFAULT: "#6b7280",
          dark: "#374151",
        },
        background: "var(--background)", // Uses CSS variable
        foreground: "var(--foreground)", // Uses CSS variable
        error: "#ef4444",
        warning: "#f59e0b",
        success: "#10b981",
        info: "#3b82f6",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config

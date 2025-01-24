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
          light: "#7A2344FF",
          DEFAULT: "#491529",
          dark: "#2B0D18FF",
        },
        secondary: {
          light: "#FF63AFFF",
          DEFAULT: "#B70E60FF",
          dark: "#820D46FF",
        },
        accent: {
          light: "#038D51FF",
          DEFAULT: "#014527",
          dark: "#014527",
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

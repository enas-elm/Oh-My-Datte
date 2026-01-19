import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
theme: {
    extend: {
      fontFamily: {
        allura: ["var(--font-allura)"],
        times: ["var(--font-times)"],
      },
    },
  },  plugins: [],
} satisfies Config

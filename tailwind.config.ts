import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateZ(0) scale(1)' },
          '50%': { transform: 'translateZ(50px) scale(1.2)' },
        }
      },
      animation: {
        'float': 'float 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config

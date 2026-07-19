/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7C5CFF",
          50: "#F4F1FF",
          100: "#EAE4FF",
          200: "#D2C6FF",
          300: "#B4A0FF",
          400: "#9678FF",
          500: "#7C5CFF",
          600: "#6440F0",
          700: "#5230C9",
          800: "#3F2599",
          900: "#2C1A6E",
        },
        ink: {
          950: "#08070C",
          900: "#0C0B12",
          850: "#111019",
          800: "#161522",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Plus Jakarta Sans"', '"Noto Sans TC"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(20, 15, 45, 0.06), 0 1px 2px -1px rgba(20,15,45,0.04)",
        soft: "0 8px 30px -8px rgba(28, 20, 60, 0.12), 0 2px 8px -2px rgba(28,20,60,0.06)",
        "soft-lg": "0 20px 60px -12px rgba(28, 20, 60, 0.18), 0 4px 16px -4px rgba(28,20,60,0.08)",
        "glow-brand": "0 0 0 1px rgba(124,92,255,0.12), 0 8px 24px -6px rgba(124,92,255,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

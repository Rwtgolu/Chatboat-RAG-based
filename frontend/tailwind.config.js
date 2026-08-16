/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#E85D04",
          light:   "#FF7B29",
          dark:    "#C44A00",
        },
        dark: {
          base:    "#0d0d0d",
          sidebar: "#111111",
          card:    "#1a1a1a",
          hover:   "#222222",
          input:   "#1e1e1e",
        },
      },
      keyframes: {
        sparkle: {
          "0%":   { opacity: "0.3", transform: "scale(0.8)" },
          "100%": { opacity: "1",   transform: "scale(1.2)" },
        },
        bounce3: {
          "0%, 80%, 100%": { transform: "translateY(0)",    opacity: "0.5" },
          "40%":           { transform: "translateY(-8px)", opacity: "1"   },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        sparkle: "sparkle 2s ease-in-out infinite alternate",
        dot:     "bounce3 1.2s ease-in-out infinite",
        fadeIn:  "fadeIn 0.15s ease",
      },
    },
  },
  plugins: [],
};

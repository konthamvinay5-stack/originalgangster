// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#312528ff",   // Bold Myntra pink/red
        secondary: "#1e293b", // Dark slate
        accent: "#9333ea",    // Purple accent
        muted: "#f1f5f9",     // Light background
      },
    },
  },
  plugins: [],
}
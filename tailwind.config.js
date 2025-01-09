/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      small: { max: "767px" },
      medium: { min: "768px", max: "1279px" },
      large: { min: "1280px" },
    },
    container: {
      center: true,
      // For the container plugin, we define min-width breakpoints:
      screens: {
        // At >=768px (medium), container's max-width is 1128px
        medium: "1128px",
        // At >=1280px (large), container's max-width is also 1128px
        // so plus 76px padding on each side = total 1280px
        large: "1128px",
      },
      padding: {
        DEFAULT: "1rem", // 16px for small screens
        medium: "76px",   // 76px each side at medium
        large: "76px",    // 76px each side at large
      },
    },
    extend: {},
  },
  plugins: [],
};

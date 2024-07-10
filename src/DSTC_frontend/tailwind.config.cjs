/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#5dd5ff",
        app_bg: "#121212",
        app_gray: "#a6a6a6",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      nominee: ["Nominee", "sans- serif"],
      redzone: ["Redzone", "sans- serif"],
    },
  },
  plugins: [
    {
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  ],
};

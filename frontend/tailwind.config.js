// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All your React component files
  ],
  theme: {
    extend: {
      backdropFilter: {
        // This might be needed if you haven't configured it
        none: "none",
        blur: "blur(20px)",
        "blur-sm": "blur(12px)",
        "blur-md": "blur(16px)",
        "blur-lg": "blur(24px)",
        "blur-xl": "blur(40px)",
      },
    },
  },
  plugins: [
    // ... other plugins
    require("@tailwindcss/forms"), // if you have it
    require("@tailwindcss/typography"), // if you have it
    // require('tailwindcss-filters'), // If you need older filter support
  ],
};

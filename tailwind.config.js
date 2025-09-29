/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable optimizations that cause issues in CI
  future: {
    hoverOnlyWhenSupported: false,
  },
  experimental: {
    optimizeUniversalDefaults: false,
  },
}

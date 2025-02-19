import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
      },
      screens: {
        sm: '640px',  // для мобильных устройств
        md: '768px',  // для планшетов
        lg: '1024px', // для ПК
        xl: '1280px', // для больших экранов
      },
    },
  },
  plugins: [],
} satisfies Config;

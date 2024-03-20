import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'modal-black': 'rgba(0,0,0,0.4)',
        "call-meta": "linear-gradient(183.61deg, rgba(48, 48, 48, 0.6) 50.7%, rgba(0, 0, 0, 0.18) 254.99%)",
      },
    },
  },
  plugins: [],
};
export default config;

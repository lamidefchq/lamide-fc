import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#090909", gold: "#C9A44C", paper: "#F5F1E8", charcoal: "#252525" }, boxShadow: { gold: "0 0 0 1px rgba(201,164,76,.25), 0 18px 50px rgba(0,0,0,.35)" } } },
  plugins: []
};
export default config;

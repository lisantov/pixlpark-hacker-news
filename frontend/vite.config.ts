import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/pixlpark-hacker-news/" : "/",
  plugins: [tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
}));

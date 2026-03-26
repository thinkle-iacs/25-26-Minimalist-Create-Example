import { defineConfig } from "vite";

// Set base path for GitHub Pages deployment
// Replace '25-26-Minimalist-Create-Example' with your repo name if different
const isProd = process.env.NODE_ENV === "production";
const repoName = "25-26-Minimalist-Create-Example";

export default defineConfig({
  base: isProd ? `/${repoName}/` : '/',
  server: {
    host: '0.0.0.0',
  },
  build: {
    target: "esnext"
  }
});
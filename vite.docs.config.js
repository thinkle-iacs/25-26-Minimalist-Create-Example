import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "docs-source/",
  // Set base path for GitHub Pages deployment
  // Replace '25-26-Minimalist-Create-Example' with your repo name if different
  base: process.env.NODE_ENV === "production" ? "/25-26-Minimalist-Create-Example/" : "./",
  build: {
    outDir: "../docs/",
    emptyOutDir: true,
    minify: false,
  },
  resolve: {
    alias: {
      // Adjust this if you need more complex path resolution
      "@": path.resolve(__dirname, "./"),
    },
  },
});

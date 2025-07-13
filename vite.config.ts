import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "public/popup.html"),
        background: path.resolve(__dirname, "src/background.ts"),
        contentScript: path.resolve(__dirname, "src/contentScript.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
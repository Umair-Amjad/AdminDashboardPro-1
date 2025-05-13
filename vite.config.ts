import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './client/src'),
      "@components": path.resolve(__dirname, './client/src/components'),
      "@lib": path.resolve(__dirname, './client/src/lib'),
      "@styles": path.resolve(__dirname, './client/src/styles'),
    },
  },
  server: {
    port: 3001,
    host: true,
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
  },
});


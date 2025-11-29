import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/ttt/",
  build: {
    outDir: "./dist/ttt",
  },
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    proxy: {
      "/ttt/api": {
        target: "http://localhost:8085",
      },
    },
  },
});

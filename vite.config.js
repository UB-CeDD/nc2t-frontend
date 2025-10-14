import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    target: "es2022",
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  define: {
    "process.env": {},
  },
  base: "./",
  resolve: {
    alias: [
      { find: "@store", replacement: "/src/store" },
      { find: "@components", replacement: "/src/components" },
      { find: "@features", replacement: "/src/features" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@interfaces", replacement: "/src/interfaces" },
      { find: "@services", replacement: "/src/services" },
    ],
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "leaflet/dist/leaflet.css";', // Ensure Leaflet CSS is included
      },
    },
  },
});

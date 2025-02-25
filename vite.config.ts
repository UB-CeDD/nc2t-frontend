import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    target: "es2022",
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  plugins: [react()],
  base: "./",
  resolve: {
    alias: [
      {
        find: "@store",
        replacement: "/ncct_backend/store",
      },
      {
        find: "@components",
        replacement: "/ncct_backend/components",
      },
      {
        find: "@features",
        replacement: "/ncct_backend/features",
      },
      {
        find: "@pages",
        replacement: "/ncct_backend/pages",
      },
      {
        find: "@interfaces",
        replacement: "/ncct_backend/interfaces",
      },
      {
        find: "@services",
        replacement: "/ncct_backend/services",
      },
    ],
  },
});
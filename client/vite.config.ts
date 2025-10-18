import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'TaskFlow - Modern Task Management & Project Planning Tool',
          description: 'Organize your projects with TaskFlow - A powerful, intuitive task management tool.',
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['tunnel-recovered-thy-watched.trycloudflare.com', 'localhost'],
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
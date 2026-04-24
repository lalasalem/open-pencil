import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This tells Vite to use our new file whenever the app asks for Node modules
      'node:fs/promises': resolve(__dirname, 'empty-module.js'),
      'node:url': resolve(__dirname, 'empty-module.js'),
      'fs': resolve(__dirname, 'empty-module.js'),
      'url': resolve(__dirname, 'empty-module.js'),
      'path': 'path-browserify',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // This prevents the "Could not resolve entry module" error for the .ts worker
      external: [
        /.*export-worker\.ts/ 
      ],
    },
  },
  // Set the base to './' to ensure paths work correctly on Render's static hosting
  base: './',
  worker: {
    format: 'es',
  }
});

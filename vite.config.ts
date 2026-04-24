import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This fixes the "@/engine/fonts" error
      '@': resolve(__dirname, './src'),
      
      // These fix the Node.js browser compatibility errors
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
      // This prevents the worker resolution error
      external: [
        /.*export-worker\.ts/ 
      ],
    },
  },
  base: './',
  worker: {
    format: 'es',
  }
});

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
      '@': resolve(__dirname, './src'),
      'node:fs/promises': resolve(__dirname, 'empty-module.js'),
      'node:url': resolve(__dirname, 'empty-module.js'),
      'fs': resolve(__dirname, 'empty-module.js'),
      'url': resolve(__dirname, 'empty-module.js'),
      'path': 'path-browserify',
    },
  },
  optimizeDeps: {
    include: ['@unhead/vue', 'vue', 'vue-router']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // THIS IS THE CRITICAL FIX: 
      // It tells the builder to stop looking for that missing .ts worker file
      external: [
        /.*export-worker.*/,
        /@open-pencil\/core\/dist\/io\/formats\/fig\/export-worker\.ts/
      ],
    },
  },
  base: './',
  worker: {
    format: 'es',
    plugins: () => [vue()]
  }
});

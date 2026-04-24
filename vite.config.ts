import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Assuming it's a Vue app based on the repo name
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This fixes the "node:fs/promises" error by telling Vite 
      // to ignore Node-only modules in the browser
      'node:fs/promises': 'empty-module',
      'node:url': 'empty-module',
      'fs': 'empty-module',
      'path': 'path-browserify',
    },
  },
  build: {
    rollupOptions: {
      // This helps Rollup ignore the missing .ts worker file 
      // if it's being incorrectly referenced by a dependency
      external: [
        /.*export-worker\.ts/ 
      ],
      output: {
        manualChunks: {
          vendor: ['vue', '@open-pencil/core'],
        },
      },
    },
  },
  // This ensures that workers are bundled correctly as pointers
  worker: {
    format: 'es',
  }
});

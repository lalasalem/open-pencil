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
      // Fixes the "@/..." import issues
      '@': resolve(__dirname, './src'),
      
      // Mocks Node.js modules that don't exist in the browser
      'node:fs/promises': resolve(__dirname, 'empty-module.js'),
      'node:url': resolve(__dirname, 'empty-module.js'),
      'fs': resolve(__dirname, 'empty-module.js'),
      'url': resolve(__dirname, 'empty-module.js'),
      'path': 'path-browserify',
    },
  },
  optimizeDeps: {
    // Forces Vite to pre-bundle these so they don't cause reload loops
    include: ['@unhead/vue', 'vue', 'vue-router']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Prevents the build from crashing if it sees these specific file paths
      external: [
        /.*export-worker.*/,
        /.*fig-parse-worker.*/
      ],
    },
  },
  // Ensures relative paths work correctly on Render's static hosting
  base: './',
  worker: {
    format: 'es'
  }
});

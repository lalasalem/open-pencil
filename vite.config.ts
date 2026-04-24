import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'fix-broken-worker-path',
      resolveId(id) {
        // If the builder looks for that missing .ts worker, 
        // redirect it to our empty file so it doesn't crash.
        if (id.includes('export-worker.ts')) {
          return resolve(__dirname, 'empty-module.js');
        }
        return null;
      }
    }
  ],
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
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        /.*export-worker.*/
      ],
    },
  },
  base: './',
  worker: {
    format: 'es'
  }
});

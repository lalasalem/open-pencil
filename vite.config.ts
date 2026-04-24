import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  ],
  // FIX: Prevents "process is not defined" errors in browser
  define: {
    'process.env': {},
    'global': 'window'
  },
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
    target: 'esnext',
    rollupOptions: {
      external: [
        'trystero/mqtt',
        /.*export-worker.*/,
        /.*fig-parse-worker.*/,
        /^@tauri-apps\/.*/
      ],
      output: {
        globals: {
          'trystero/mqtt': 'trystero'
        }
      }
    },
  },
  base: './',
  worker: {
    format: 'es'
  }
});

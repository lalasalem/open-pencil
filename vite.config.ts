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
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Point to the local file we created in the build command
      'trystero/mqtt': resolve(__dirname, './trystero-fix.js'),
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
        /.*export-worker.*/,
        /.*fig-parse-worker.*/,
        /^@tauri-apps\/.*/
      ],
    },
  },
  base: './',
  worker: {
    format: 'es'
  }
});

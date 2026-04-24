import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3', autoInstall: true })
  ],
  // FIX: Force define these so they are never "undefined" in the browser
  define: {
    'process.env': {},
    'global': 'window',
    'process.browser': true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'path': 'path-browserify',
    },
  },
  build: {
    outDir: 'dist',
    target: 'es2020', // Most stable for ChromeOS
    minify: 'terser',
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        globals: { 'trystero/mqtt': 'trystero' },
        // Simple chunking to prevent memory overload
        manualChunks: {
          'vendor': ['vue', 'vue-router', '@vueuse/core'],
        }
      }
    }
  },
  base: './'
});

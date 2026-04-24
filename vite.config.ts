import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3', autoInstall: true })
  ],
  define: {
    'process.env': {},
    'global': 'window',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'path': 'path-browserify',
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    // FIX: This ensures the build doesn't use "modern" script types 
    // that school/work filters often block
    assetsInlineLimit: 100000000, 
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        format: 'iife', // "Immediately Invoked Function Expression" - very compatible
        globals: { 'trystero/mqtt': 'trystero' }
      }
    }
  },
  base: './'
});

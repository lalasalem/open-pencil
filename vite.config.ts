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
    target: 'esnext', // Required for Yoga/Canvas engine
    minify: 'esbuild', // Faster and sometimes safer for Chromebooks than Terser
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        globals: { 'trystero/mqtt': 'trystero' }
      }
    }
  },
  base: './'
});

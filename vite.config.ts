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
    'global': 'window'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'path': 'path-browserify',
    },
  },
  build: {
    outDir: 'dist',
    target: 'es2020', 
    cssCodeSplit: true,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        globals: { 'trystero/mqtt': 'trystero' },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'v-framework';
            if (id.includes('open-pencil')) return 'v-core';
            if (id.includes('ai')) return 'v-ai';
            return 'v-libs';
          }
        }
      }
    }
  },
  base: './'
});

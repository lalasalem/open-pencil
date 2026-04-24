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
    // FIX: esnext allows the "await" keyword that was crashing the build
    target: 'esnext', 
    cssCodeSplit: true,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        globals: { 'trystero/mqtt': 'trystero' },
        // FIX: Simplified chunking to avoid the "Circular chunk" errors
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@open-pencil') || id.includes('canvaskit')) {
              return 'editor-core';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  base: './'
});

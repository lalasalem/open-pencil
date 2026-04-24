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
    // ES2015 is the most compatible setting for restricted browsers
    target: 'es2015', 
    minify: 'terser', // Terser is slower to build but easier for old browsers to run
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['trystero/mqtt', /^@tauri-apps\/.*/],
      output: {
        globals: { 'trystero/mqtt': 'trystero' },
        // BREAKING EVERYTHING INTO TINY PIECES
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  base: './'
});

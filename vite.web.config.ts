import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
    target: 'esnext',
    minify: 'terser',
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['@tauri-apps/api'],
  },
})

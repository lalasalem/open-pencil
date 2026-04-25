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
      '@tauri-apps/plugin-dialog': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-fs': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-shell': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-os': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-updater': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-clipboard-manager': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/plugin-notification': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/api/core': resolve(__dirname, 'src/shims/empty.ts'),
      '@tauri-apps/api': resolve(__dirname, 'src/shims/empty.ts'),
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

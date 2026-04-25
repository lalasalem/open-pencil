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
    alias: [
      { find: 'path', replacement: 'path-browserify' },
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: /^@tauri-apps\/plugin-dialog(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-fs(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-shell(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-os(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-updater(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-clipboard-manager(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/plugin-notification(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
      { find: /^@tauri-apps\/api(\/.*)?$/, replacement: resolve(__dirname, 'src/shims/empty.ts') },
    ],
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

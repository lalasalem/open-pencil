import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': '/src',

      // existing fixes
      '@tauri-apps/api/core': '/src/shims/tauri.ts',
      'reka-ui': '/src/shims/reka-ui.ts',
      'canvaskit-wasm': '/src/shims/canvaskit.ts',

      // 🚨 CRITICAL FIX
      '@open-pencil/core/dist/io/formats/fig/export-worker.ts':
        '/src/shims/export-worker.ts'
    }
  },

  build: {
    rollupOptions: {
      external: [
        '@tauri-apps/api/core',
        'virtual:pwa-register'
      ]
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@tauri-apps/api/core': '/src/shims/tauri.ts',
      'reka-ui': '/src/shims/reka-ui.ts',
      'canvaskit-wasm': '/src/shims/canvaskit.ts'
    }
  },

  build: {
    rollupOptions: {
      external: [
        '@tauri-apps/api/core'
      ]
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      '@tauri-apps/api/core': '/src/shims/tauri.ts',
      'reka-ui': '/src/shims/reka-ui.ts',
      'canvaskit-wasm': '/src/shims/canvaskit.ts'
    }
  },

  build: {
    rollupOptions: {
      external: ['@tauri-apps/api/core']
    }
  }
})

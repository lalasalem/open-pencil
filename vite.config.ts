import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // keep existing shims (safe)
      '@tauri-apps/api/core': path.resolve(__dirname, './src/shims/tauri.ts'),
      'reka-ui': path.resolve(__dirname, './src/shims/reka-ui.ts'),
      'canvaskit-wasm': path.resolve(__dirname, './src/shims/canvaskit.ts')
    }
  },

  build: {
    rollupOptions: {
      external: [
        '@tauri-apps/api/core',
        'canvaskit-wasm'
      ]
    }
  },

  define: {
    __TAURI__: false
  }
})

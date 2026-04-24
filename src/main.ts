import { createHead } from '@unhead/vue/client'
import { createApp } from 'vue'

import './app.css'
import { IS_TAURI } from '@/constants'
import { preloadFonts } from '@/engine/fonts'

import App from './App.vue'
import router from './router'

preloadFonts()

const app = createApp(App)
const head = createHead()

app.use(router).use(head).mount('#app')

// SAFE PWA (disabled if missing)
if (!IS_TAURI) {
  ;(async () => {
    try {
      const mod = await import('virtual:pwa-register')
      mod.registerSW?.({ immediate: true })
    } catch {
      console.log('[PWA disabled]')
    }
  })()
}

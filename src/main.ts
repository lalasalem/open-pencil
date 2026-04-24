import { createHead } from '@unhead/vue'
import { createApp } from 'vue'

import './app.css'
import { IS_TAURI } from './constants' 
import { preloadFonts } from '@/engine/fonts'

import App from './App.vue'
import router from './router'

preloadFonts()

const app = createApp(App)
const head = createHead()

app.use(router).use(head).mount('#app')

// SAFE PWA (WILL NOT BREAK BUILD)
if (!IS_TAURI && import.meta.env.PROD) {
  // only try in production AND only if plugin exists
  try {
    const registerSW = (window as any).__PWA_REGISTER_SW__
    if (registerSW) {
      registerSW({ immediate: true })
    }
  } catch {
    console.warn('PWA disabled')
  }
}

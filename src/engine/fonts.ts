import {
  IS_TAURI,
  loadFont as loadFontCore,
  markFontLoaded,
  styleToWeight
} from '@open-pencil/core'

interface TauriFontFamily {
  family: string
  styles: string[]
}

let tauriFontsCache: TauriFontFamily[] | null = null
let tauriFontsPromise: Promise<TauriFontFamily[]> | null = null

async function getTauriFonts(): Promise<TauriFontFamily[]> {
  // 🚨 DISABLED FOR WEB DEPLOY (Render has no Tauri runtime)
  if (!IS_TAURI) return []

  if (tauriFontsCache) return tauriFontsCache

  if (!tauriFontsPromise) {
    tauriFontsPromise = (async () => {
      try {
        const { invoke } = await import('@tauri-apps/api/core')
        const fonts = await invoke<TauriFontFamily[]>('list_system_fonts')
        tauriFontsCache = fonts
        return fonts
      } catch {
        return []
      }
    })()
  }

  return tauriFontsPromise
}

export function preloadFonts(): void {
  // Web build: do nothing
  if (!IS_TAURI) return

  void getTauriFonts().then(registerFontFaces)
}

function registerFontFaces(fonts: TauriFontFamily[]): void {
  if (typeof document === 'undefined') return

  for (const { family } of fonts) {
    try {
      const face = new FontFace(family, `local("${family}")`)
      document.fonts.add(face)
    } catch {
      // ignore
    }
  }
}

export async function listFamilies(): Promise<string[]> {
  if (IS_TAURI) {
    const fonts = await getTauriFonts()
    return fonts.map((f) => f.family)
  }

  const { listFamilies: coreList } = await import('@open-pencil/core')
  return coreList()
}

export async function listFonts(): Promise<TauriFontFamily[]> {
  if (IS_TAURI) {
    return getTauriFonts()
  }
  return []
}

export async function loadFont(
  family: string,
  style = 'Regular'
): Promise<ArrayBuffer | null> {
  // 🚨 WEB SAFE FALLBACK
  if (!IS_TAURI) {
    return loadFontCore(family, style)
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')

    const data = await invoke<number[]>('load_system_font', {
      family,
      style
    })

    const buffer = new Uint8Array(data).buffer

    markFontLoaded(family, style, buffer)

    const weight = styleToWeight(style)
    const italic = style.toLowerCase().includes('italic') ? 'italic' : 'normal'

    const face = new FontFace(family, buffer, {
      weight: String(weight),
      style: italic
    })

    await face.load()
    document.fonts.add(face)

    return buffer
  } catch {
    return loadFontCore(family, style)
  }
}

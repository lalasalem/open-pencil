import {
  IS_TAURI,
  loadFont as loadFontCore,
  markFontLoaded,
  styleToWeight
} from '@open-pencil/core'

interface FontFamily {
  family: string
  styles: string[]
}

// cache for Tauri fonts
let cachedFonts: FontFamily[] = []

// -------------------------
// SAFE DYNAMIC LOADER
// -------------------------
async function safeTauriInvoke(): Promise<any | null> {
  if (!IS_TAURI) return null

  try {
    // IMPORTANT: string-based import so Vite cannot statically analyze it
    const mod = await new Function(
      "return import('@tauri-apps/api/core')"
    )()

    return mod.invoke
  } catch {
    return null
  }
}

async function getTauriFonts(): Promise<FontFamily[]> {
  if (!IS_TAURI) return []

  const invoke = await safeTauriInvoke()
  if (!invoke) return []

  try {
    const fonts = await invoke<FontFamily[]>('list_system_fonts')
    cachedFonts = fonts
    return fonts
  } catch {
    return []
  }
}

export function preloadFonts(): void {
  if (!IS_TAURI) return

  void getTauriFonts().then((fonts) => {
    cachedFonts = fonts
    registerFonts(fonts)
  })
}

function registerFonts(fonts: FontFamily[]): void {
  if (typeof document === 'undefined') return

  for (const font of fonts) {
    try {
      const face = new FontFace(font.family, `local("${font.family}")`)
      document.fonts.add(face)
    } catch {
      // ignore
    }
  }
}

export async function listFamilies(): Promise<string[]> {
  if (!IS_TAURI) {
    const { listFamilies } = await import('@open-pencil/core')
    return listFamilies()
  }

  const fonts = await getTauriFonts()
  return fonts.map((f) => f.family)
}

export async function listFonts(): Promise<FontFamily[]> {
  if (!IS_TAURI) return []
  return getTauriFonts()
}

export async function loadFont(
  family: string,
  style = 'Regular'
): Promise<ArrayBuffer | null> {
  // -------------------------
  // WEB MODE (Render SAFE)
  // -------------------------
  if (!IS_TAURI) {
    return loadFontCore(family, style)
  }

  // -------------------------
  // TAURI MODE ONLY
  // -------------------------
  const invoke = await safeTauriInvoke()
  if (!invoke) return loadFontCore(family, style)

  try {
    const data = await invoke<number[]>('load_system_font', {
      family,
      style
    })

    const buffer = new Uint8Array(data).buffer

    markFontLoaded(family, style, buffer)

    const weight = styleToWeight(style)
    const italic = style.toLowerCase().includes('italic')
      ? 'italic'
      : 'normal'

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

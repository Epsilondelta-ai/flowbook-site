import { cpSync, copyFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const dist = new URL('../dist', import.meta.url).pathname
const localesDir = new URL('../src/i18n/locales', import.meta.url).pathname
const indexHtml = join(dist, 'index.html')

// 404.html fallback
copyFileSync(indexHtml, join(dist, '404.html'))

// Generate lang/index.html for each locale so GitHub Pages serves 200 OK
const locales = readdirSync(localesDir)
  .filter(f => f.endsWith('.json'))
  .map(f => basename(f, '.json'))

for (const lang of locales) {
  cpSync(indexHtml, join(dist, lang, 'index.html'), { recursive: true })
}

console.log(`Generated SPA fallbacks for: ${locales.join(', ')}`)

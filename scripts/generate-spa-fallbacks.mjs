import { copyFileSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const SITE_URL = 'https://flowbook.epsilondelta.ai'

const dist = new URL('../dist', import.meta.url).pathname
const localesDir = new URL('../src/i18n/locales', import.meta.url).pathname
const indexHtml = join(dist, 'index.html')
const indexContent = readFileSync(indexHtml, 'utf-8')

// 404.html fallback (identical to index.html)
copyFileSync(indexHtml, join(dist, '404.html'))

// Collect locale codes from src/i18n/locales/*.json
const locales = readdirSync(localesDir)
  .filter(f => f.endsWith('.json'))
  .map(f => basename(f, '.json'))

// OG locale format: ko → ko_KR, en → en_US, zh-CN → zh_CN, etc.
const ogLocaleMap = {
  'en': 'en_US',
  'ko': 'ko_KR',
  'ja': 'ja_JP',
  'zh-CN': 'zh_CN',
  'es': 'es_ES',
  'pt-BR': 'pt_BR',
  'fr': 'fr_FR',
  'ru': 'ru_RU',
  'de': 'de_DE',
}

for (const lang of locales) {
  let html = indexContent

  // Inject og:url for this locale
  html = html.replace(
    `<meta property="og:url" content="${SITE_URL}" />`,
    `<meta property="og:url" content="${SITE_URL}/${lang}" />`
  )

  // Inject og:locale
  const ogLocale = ogLocaleMap[lang] || lang
  html = html.replace(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:type" content="website" />\n    <meta property="og:locale" content="${ogLocale}" />`
  )

  // Set html lang attribute
  html = html.replace('<html lang="en">', `<html lang="${lang}">`)

  const dir = join(dist, lang)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf-8')
}

console.log(`Generated SPA fallbacks for: ${locales.join(', ')}`)

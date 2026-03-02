import { copyFileSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const SITE_URL = 'https://flowbook.epsilondelta.ai'

const dist = new URL('../dist', import.meta.url).pathname
const localesDir = new URL('../src/i18n/locales', import.meta.url).pathname
const indexHtml = join(dist, 'index.html')
const indexContent = readFileSync(indexHtml, 'utf-8')

// Read English defaults from index.html for replacement targets
const enLocale = JSON.parse(readFileSync(join(localesDir, 'en.json'), 'utf-8'))
const enTitle = enLocale.meta.title
const enDesc = enLocale.meta.description

// 404.html fallback (identical to index.html)
copyFileSync(indexHtml, join(dist, '404.html'))

// Collect locale codes
const locales = readdirSync(localesDir)
  .filter(f => f.endsWith('.json'))
  .map(f => basename(f, '.json'))

// OG locale format
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
  // Read this locale's translations
  const locale = JSON.parse(readFileSync(join(localesDir, `${lang}.json`), 'utf-8'))
  const title = locale.meta.title
  const desc = locale.meta.description

  let html = indexContent

  // Replace og:url
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

  // Set html lang
  html = html.replace('<html lang="en">', `<html lang="${lang}">`)

  // Replace title tag
  html = html.replace(
    `<title>Flowbook — Storybook for Flowcharts</title>`,
    `<title>${title}</title>`
  )

  // Replace meta description
  html = html.replace(
    `<meta name="description" content="Storybook for flowcharts. Auto-discovers Mermaid diagram files from your codebase." />`,
    `<meta name="description" content="${desc}" />`
  )

  // Replace og:title and og:description
  html = html.replace(
    `<meta property="og:title" content="Flowbook — Storybook for Flowcharts" />`,
    `<meta property="og:title" content="${title}" />`
  )
  html = html.replace(
    `<meta property="og:description" content="Auto-discovers Mermaid diagram files from your codebase, organizes them by category, and renders them in a browsable viewer." />`,
    `<meta property="og:description" content="${desc}" />`
  )

  // Replace twitter:title and twitter:description
  html = html.replace(
    `<meta name="twitter:title" content="Flowbook — Storybook for Flowcharts" />`,
    `<meta name="twitter:title" content="${title}" />`
  )
  html = html.replace(
    `<meta name="twitter:description" content="Auto-discovers Mermaid diagram files from your codebase, organizes them by category, and renders them in a browsable viewer." />`,
    `<meta name="twitter:description" content="${desc}" />`
  )

  const dir = join(dist, lang)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf-8')
}

console.log(`Generated SPA fallbacks for: ${locales.join(', ')}`)

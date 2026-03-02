import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

const SITE_URL = 'https://flowbook.dev'

function getHtmlLang(code: string): string {
  // Convert i18n codes to proper HTML lang attributes
  const map: Record<string, string> = {
    'zh-CN': 'zh-Hans',
  }
  return map[code] ?? code
}

export default function SEO() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  useEffect(() => {
    // Set <html lang>
    document.documentElement.lang = getHtmlLang(currentLang)

    // Set <title>
    document.title = t('meta.title')

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Meta description & keywords
    setMeta('name', 'description', t('meta.description'))
    setMeta('name', 'keywords', t('meta.keywords'))

    // Open Graph
    setMeta('property', 'og:title', t('meta.title'))
    setMeta('property', 'og:description', t('meta.description'))
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE_URL}/${currentLang}`)
    setMeta('property', 'og:locale', currentLang.replace('-', '_'))

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', t('meta.title'))
    setMeta('name', 'twitter:description', t('meta.description'))

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${SITE_URL}/${currentLang}`

    // hreflang alternate links
    // Remove old hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())

    // Add hreflang for each language
    for (const lang of languages) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = getHtmlLang(lang.code)
      link.href = `${SITE_URL}/${lang.code}`
      document.head.appendChild(link)
    }

    // x-default hreflang (points to English as default)
    const xDefault = document.createElement('link')
    xDefault.rel = 'alternate'
    xDefault.hreflang = 'x-default'
    xDefault.href = `${SITE_URL}/en`
    document.head.appendChild(xDefault)
  }, [currentLang, t])

  return null
}

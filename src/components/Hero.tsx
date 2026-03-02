import { useState } from 'react'
import { useTranslation } from 'react-i18next'
export default function Hero() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npx flowbook@latest init')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
          </svg>
          {t('hero.badge')}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          <span className="bg-gradient-to-r from-text-primary via-primary-light to-primary bg-clip-text text-transparent">
            {t('hero.title')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Install command */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-3 bg-surface-light border border-border rounded-xl px-5 py-3 cursor-pointer group hover:border-primary/40 transition-colors"
            onClick={handleCopy}
          >
            <span className="text-text-secondary select-none">$</span>
            <code className="text-primary-light text-sm sm:text-base bg-transparent p-0">{t('hero.installCommand')}</code>
            <button className="text-text-secondary hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer p-0">
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#quick-start"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all no-underline text-sm shadow-lg shadow-primary/25"
          >
            {t('hero.getStarted')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="https://github.com/Epsilondelta-ai/flowbook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-surface-light hover:bg-surface-lighter text-text-primary font-semibold rounded-xl border border-border transition-all no-underline text-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t('hero.viewOnGithub')}
          </a>
        </div>

        {/* Live Flowbook — actual flowbook build output */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
            <iframe
              src="/preview/"
              title="Flowbook Preview"
              className="w-full bg-surface"
              style={{ height: 520, border: 'none' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

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

        {/* Demo diagram preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-surface-light border border-border rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-text-secondary ml-2 font-mono">flowbook — localhost:6200</span>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border/50">
              <div className="flex gap-4">
                {/* Sidebar mock */}
                <div className="hidden sm:block w-48 shrink-0 space-y-3">
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Categories</div>
                  {['Authentication', 'API Routes', 'Data Pipeline', 'State Management'].map((cat, i) => (
                    <div key={cat} className={`text-xs px-3 py-2 rounded-lg ${i === 0 ? 'bg-primary/15 text-primary' : 'text-text-secondary'}`}>
                      {cat}
                    </div>
                  ))}
                </div>
                {/* Diagram mock */}
                <div className="flex-1 flex flex-col items-center justify-center py-4">
                  <svg width="280" height="200" viewBox="0 0 280 200" fill="none" className="w-full max-w-[280px]">
                    {/* User node */}
                    <rect x="100" y="5" width="80" height="32" rx="6" fill="#646CFF" opacity="0.8" />
                    <text x="140" y="25" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace">User</text>
                    {/* Arrow down */}
                    <path d="M140 37v18" stroke="#646CFF" strokeWidth="2" opacity="0.5" />
                    <path d="M136 51l4 6 4-6" fill="#646CFF" opacity="0.5" />
                    {/* Diamond */}
                    <polygon points="140,60 180,82 140,104 100,82" fill="#FF3670" opacity="0.2" stroke="#FF3670" strokeWidth="1.5" />
                    <text x="140" y="86" textAnchor="middle" fill="#FF6B94" fontSize="10" fontFamily="monospace">Auth?</text>
                    {/* Arrow left */}
                    <path d="M100 82H55" stroke="#4ade80" strokeWidth="2" opacity="0.5" />
                    <text x="78" y="76" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Yes</text>
                    {/* Arrow right */}
                    <path d="M180 82h45" stroke="#FF3670" strokeWidth="2" opacity="0.5" />
                    <text x="202" y="76" textAnchor="middle" fill="#FF6B94" fontSize="9" fontFamily="monospace">No</text>
                    {/* Dashboard node */}
                    <rect x="5" y="70" width="48" height="24" rx="4" fill="#4ade80" opacity="0.2" stroke="#4ade80" strokeWidth="1" />
                    <text x="29" y="86" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">Dashboard</text>
                    {/* Login node */}
                    <rect x="227" y="70" width="48" height="24" rx="4" fill="#FF3670" opacity="0.2" stroke="#FF3670" strokeWidth="1" />
                    <text x="251" y="86" textAnchor="middle" fill="#FF6B94" fontSize="9" fontFamily="monospace">Login</text>
                    {/* Flow arrows down from diamond */}
                    <path d="M140 104v20" stroke="#646CFF" strokeWidth="2" opacity="0.3" />
                    {/* Bottom boxes */}
                    <rect x="60" y="130" width="70" height="24" rx="4" fill="#646CFF" opacity="0.15" stroke="#646CFF" strokeWidth="1" />
                    <text x="95" y="146" textAnchor="middle" fill="#8B8FFF" fontSize="9" fontFamily="monospace">API Call</text>
                    <rect x="150" y="130" width="70" height="24" rx="4" fill="#646CFF" opacity="0.15" stroke="#646CFF" strokeWidth="1" />
                    <text x="185" y="146" textAnchor="middle" fill="#8B8FFF" fontSize="9" fontFamily="monospace">Cache</text>
                    <path d="M140 124l-45 6M140 124l45 6" stroke="#646CFF" strokeWidth="1.5" opacity="0.3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentLang = languages.find((l) => l.code === i18n.language) ?? languages[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 no-underline">
            <img src="/flowbook/android-chrome-192x192.png" alt="Flowbook" width="28" height="28" className="shrink-0 rounded" />
            <span className="text-lg font-bold text-text-primary">Flowbook</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline">
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline">
              {t('nav.howItWorks')}
            </a>
            <a href="#quick-start" className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline">
              {t('nav.quickStart')}
            </a>
            <a href="#ai-skills" className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline">
              {t('nav.aiSkills')}
            </a>
            <a
              href="https://github.com/Epsilondelta-ai/flowbook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline"
            >
              {t('nav.github')}
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors bg-transparent border border-border rounded-lg px-3 py-1.5 cursor-pointer"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-surface-light border border-border rounded-xl shadow-2xl py-2 min-w-[180px] max-h-[320px] overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-surface-lighter transition-colors cursor-pointer bg-transparent border-none ${
                        lang.code === i18n.language ? 'text-primary font-medium' : 'text-text-secondary'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-secondary bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <a href="#features" className="block text-sm text-text-secondary hover:text-text-primary no-underline" onClick={() => setMobileOpen(false)}>
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="block text-sm text-text-secondary hover:text-text-primary no-underline" onClick={() => setMobileOpen(false)}>
              {t('nav.howItWorks')}
            </a>
            <a href="#quick-start" className="block text-sm text-text-secondary hover:text-text-primary no-underline" onClick={() => setMobileOpen(false)}>
              {t('nav.quickStart')}
            </a>
            <a href="#ai-skills" className="block text-sm text-text-secondary hover:text-text-primary no-underline" onClick={() => setMobileOpen(false)}>
              {t('nav.aiSkills')}
            </a>
            <a
              href="https://github.com/Epsilondelta-ai/flowbook"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-secondary hover:text-text-primary no-underline"
            >
              {t('nav.github')}
            </a>
            <div className="pt-2 border-t border-border">
              <div className="grid grid-cols-3 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code)
                      setMobileOpen(false)
                    }}
                    className={`text-xs px-2 py-1.5 rounded-lg text-center cursor-pointer bg-transparent border-none ${
                      lang.code === i18n.language
                        ? 'bg-primary/20 text-primary'
                        : 'text-text-secondary hover:bg-surface-lighter'
                    }`}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

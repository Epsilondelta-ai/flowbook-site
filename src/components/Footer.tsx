import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/android-chrome-192x192.png" alt="Flowbook" width="20" height="20" className="rounded" />
            <span className="text-sm text-text-secondary">
              Flowbook — {t('footer.tagline')}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <a href="https://github.com/Epsilondelta-ai/flowbook" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors no-underline text-text-secondary">
              GitHub
            </a>
            <span>·</span>
            <span>{t('footer.license')}</span>
            <span>·</span>
            <span>
              {t('footer.builtWith')} ♥ {t('footer.by')}{' '}
              <a href="https://github.com/Epsilondelta-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light transition-colors no-underline">
                Epsilon Delta
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

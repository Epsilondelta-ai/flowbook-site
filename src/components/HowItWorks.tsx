import { useTranslation } from 'react-i18next'

const steps = [
  { key: 'step1', number: '01', color: 'text-primary' },
  { key: 'step2', number: '02', color: 'text-accent' },
  { key: 'step3', number: '03', color: 'text-green-400' },
] as const

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-surface-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('howItWorks.sectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            {t('howItWorks.sectionSubtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map(({ key, number, color }, i) => (
            <div key={key} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%_-_16px)] w-[calc(100%_-_48px)] h-px bg-border z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border rotate-45" />
                </div>
              )}
              <div className="relative z-10 text-center">
                <div className={`text-5xl font-black ${color} opacity-20 mb-2`}>{number}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {t(`howItWorks.${key}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                  {t(`howItWorks.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline diagram */}
        <div className="bg-surface border border-border rounded-2xl p-6 max-w-3xl mx-auto">
          <div className="text-xs text-text-secondary font-mono mb-3">{t('howItWorks.pipeline')}</div>
          <pre className="text-xs sm:text-sm text-text-secondary leading-relaxed overflow-x-auto border-none bg-transparent p-0 m-0">
{`.flow.md files ──→ Vite Plugin ──→ Virtual Module ──→ React Viewer
                    │                   │
                    ├─ fast-glob scan   ├─ export { flows: [...] }
                    ├─ gray-matter      │
                    │  parse            └─ HMR on file change
                    └─ mermaid block
                       extraction`}
          </pre>
        </div>
      </div>
    </section>
  )
}

import { useTranslation } from 'react-i18next'

export default function AISkills() {
  const { t } = useTranslation()

  return (
    <section id="ai-skills" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('aiSkills.sectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            {t('aiSkills.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Description */}
          <div>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('aiSkills.description')}
            </p>
            <ol className="space-y-3">
              {(['step1', 'step2', 'step3', 'step4'] as const).map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary text-sm">{t(`aiSkills.${step}`)}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Install commands */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-text-primary mb-3">
              {t('aiSkills.installTitle')}
            </div>

            <div className="bg-surface-light border border-border rounded-xl p-4 space-y-2">
              <div className="text-text-secondary/50 text-xs font-mono"># Install for a specific agent</div>
              <code className="text-primary-light text-sm block bg-transparent p-0">$ flowbook skill claude</code>
              <code className="text-primary-light text-sm block bg-transparent p-0">$ flowbook skill cursor</code>
              <code className="text-primary-light text-sm block bg-transparent p-0">$ flowbook skill opencode</code>
              <div className="h-2" />
              <div className="text-text-secondary/50 text-xs font-mono"># Install for all agents</div>
              <code className="text-primary-light text-sm block bg-transparent p-0">$ flowbook skill all</code>
            </div>

            <div className="text-xs text-text-secondary text-center">{t('aiSkills.or')}</div>

            <div className="bg-surface-light border border-border rounded-xl p-4">
              <code className="text-primary-light text-sm bg-transparent p-0">$ npx skills add Epsilondelta-ai/flowbook</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

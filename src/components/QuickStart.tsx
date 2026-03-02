import { useTranslation } from 'react-i18next'

const codeSteps = [
  {
    titleKey: 'quickStart.step1Title',
    descKey: 'quickStart.step1Desc',
    code: 'npx flowbook@latest init',
    comment: '# Initialize — adds scripts + example file',
  },
  {
    titleKey: 'quickStart.step2Title',
    descKey: 'quickStart.step2Desc',
    code: 'npm run flowbook',
    comment: '# → http://localhost:6200',
  },
  {
    titleKey: 'quickStart.step3Title',
    descKey: 'quickStart.step3Desc',
    code: 'npm run build-flowbook',
    comment: '# → flowbook-static/',
  },
]

export default function QuickStart() {
  const { t } = useTranslation()

  return (
    <section id="quick-start" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('quickStart.sectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            {t('quickStart.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {codeSteps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/15 border border-primary/30 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                {i < codeSteps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {t(step.titleKey)}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {t(step.descKey)}
                </p>
                <div className="bg-surface-light border border-border rounded-xl px-4 py-3">
                  <div className="text-text-secondary/50 text-xs font-mono mb-1">{step.comment}</div>
                  <code className="text-primary-light text-sm bg-transparent p-0">$ {step.code}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

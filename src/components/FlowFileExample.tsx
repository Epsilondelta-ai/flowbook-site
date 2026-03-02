import { useTranslation } from 'react-i18next'

export default function FlowFileExample() {
  const { t } = useTranslation()

  return (
    <section className="py-20 sm:py-32 bg-surface-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('flowFile.sectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            {t('flowFile.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-light border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-text-secondary ml-2 font-mono">login.flow.md</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="text-text-secondary/50">---</div>
              <div><span className="text-accent">title</span><span className="text-text-secondary">: </span><span className="text-green-400">Login Flow</span></div>
              <div><span className="text-accent">category</span><span className="text-text-secondary">: </span><span className="text-green-400">Authentication</span></div>
              <div><span className="text-accent">tags</span><span className="text-text-secondary">: </span><span className="text-green-400">[auth, login, oauth]</span></div>
              <div><span className="text-accent">order</span><span className="text-text-secondary">: </span><span className="text-primary-light">1</span></div>
              <div><span className="text-accent">description</span><span className="text-text-secondary">: </span><span className="text-green-400">User authentication flow with OAuth2</span></div>
              <div className="text-text-secondary/50">---</div>
              <div className="mt-4 text-text-secondary/50">```mermaid</div>
              <div className="text-primary-light">flowchart TD</div>
              <div className="text-text-secondary pl-4">
                A[User] --{'>'} B{'{'}Authenticated?{'}'}<br />
                B --{'>'}|Yes| C[Dashboard]<br />
                B --{'>'}|No| D[Login Page]<br />
                D --{'>'}|OAuth2| E[Provider]<br />
                E --{'>'}|Token| C
              </div>
              <div className="text-text-secondary/50">```</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

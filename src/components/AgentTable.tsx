import { useTranslation } from 'react-i18next'

const agents = [
  { name: 'Claude Code', skill: '.claude/skills/flowbook/SKILL.md', command: '.claude/commands/flowbook.md' },
  { name: 'OpenAI Codex', skill: '.agents/skills/flowbook/SKILL.md', command: null },
  { name: 'VS Code / GitHub Copilot', skill: '.github/skills/flowbook/SKILL.md', command: null },
  { name: 'Google Antigravity', skill: '.agent/skills/flowbook/SKILL.md', command: null },
  { name: 'Gemini CLI', skill: '.gemini/skills/flowbook/SKILL.md', command: null },
  { name: 'Cursor', skill: '.cursor/skills/flowbook/SKILL.md', command: '.cursor/commands/flowbook.md' },
  { name: 'Windsurf (Codeium)', skill: '.windsurf/skills/flowbook/SKILL.md', command: '.windsurf/workflows/flowbook.md' },
  { name: 'AmpCode', skill: '.amp/skills/flowbook/SKILL.md', command: null },
  { name: 'OpenCode', skill: '.opencode/skills/flowbook/SKILL.md', command: '.opencode/command/flowbook.md' },
]

export default function AgentTable() {
  const { t } = useTranslation()

  return (
    <section className="py-20 sm:py-32 bg-surface-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t('agents.sectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            {t('agents.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">{t('agents.agent')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">{t('agents.skill')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">{t('agents.slashCommand')}</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.name} className="border-b border-border/50 hover:bg-surface-lighter/30 transition-colors">
                  <td className="py-3 px-4 text-sm text-text-primary font-medium">{agent.name}</td>
                  <td className="py-3 px-4">
                    <code className="text-xs text-primary-light bg-primary/8 px-2 py-0.5 rounded">{agent.skill}</code>
                  </td>
                  <td className="py-3 px-4">
                    {agent.command ? (
                      <code className="text-xs text-green-400 bg-green-400/8 px-2 py-0.5 rounded">{agent.command}</code>
                    ) : (
                      <span className="text-text-secondary/40 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

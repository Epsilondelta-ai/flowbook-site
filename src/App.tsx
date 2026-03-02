import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import QuickStart from './components/QuickStart'
import FlowFileExample from './components/FlowFileExample'
import AISkills from './components/AISkills'
import AgentTable from './components/AgentTable'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title')
  }, [t])

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <QuickStart />
        <FlowFileExample />
        <AISkills />
        <AgentTable />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { languages } from './i18n'
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
import SEO from './components/SEO'

const supportedCodes: string[] = languages.map((l) => l.code)

function App() {
  const { i18n } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!lang || !supportedCodes.includes(lang)) {
      // Invalid language code → redirect to English
      navigate('/en', { replace: true })
      return
    }

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n, navigate])

  return (
    <div className="min-h-screen bg-surface">
      <SEO />
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

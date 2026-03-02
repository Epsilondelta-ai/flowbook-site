import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import i18n from '../i18n'
import { languages } from '../i18n'

const supportedCodes: string[] = languages.map((l) => l.code)

function detectLanguage(): string {
  // 1. Check localStorage
  const stored = localStorage.getItem('i18nextLng')
  if (stored && supportedCodes.includes(stored)) return stored

  // 2. Check browser language
  const browserLang = navigator.language
  if (supportedCodes.includes(browserLang)) return browserLang

  // Check prefix match (e.g. "ko-KR" → "ko")
  const prefix = browserLang.split('-')[0]
  const match = supportedCodes.find((code) => code.startsWith(prefix))
  if (match) return match

  // 3. Fallback
  return 'en'
}

export default function LangRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const lang = detectLanguage()
    i18n.changeLanguage(lang)
    navigate(`/${lang}`, { replace: true })
  }, [navigate])

  return null
}

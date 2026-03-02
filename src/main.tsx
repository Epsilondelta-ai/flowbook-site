import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.tsx'
import LangRedirect from './components/LangRedirect.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<App />} />
        <Route path="/" element={<LangRedirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

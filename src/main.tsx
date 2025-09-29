import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n' // Importar la configuración de i18n
import LanguageRouter from './components/LanguageRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageRouter />
    </BrowserRouter>
  </StrictMode>,
)

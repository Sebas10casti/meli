import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n' // Importar la configuración de i18n
import LanguageRouter from './components/LanguageRouter.tsx'

// Determinar el basename basado en el entorno
const basename = import.meta.env.PROD ? '/meli' : '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageRouter />
    </BrowserRouter>
  </StrictMode>,
)

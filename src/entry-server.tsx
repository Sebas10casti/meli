import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import LanguageRouter from './components/LanguageRouter'

export function render(url: string) {
  // Detectar idioma desde la URL
  const pathSegments = url.split('/').filter(Boolean)
  let detectedLang = 'es' // default
  
  if (pathSegments.length > 0 && ['es', 'en', 'pt'].includes(pathSegments[0])) {
    detectedLang = pathSegments[0]
  }

  // Manejar redirecciones en el servidor
  if (url === '/' || url === '') {
    // Redirigir a la ruta por defecto
    return {
      html: '',
      head: `<meta http-equiv="refresh" content="0; url=/${detectedLang}">`,
      redirect: `/${detectedLang}`
    }
  }

  // Verificar si la ruta es válida, si no, redirigir
  const validRoutes = ['es', 'en', 'pt']
  const firstSegment = pathSegments[0]
  if (pathSegments.length > 0 && !validRoutes.includes(firstSegment)) {
    return {
      html: '',
      head: `<meta http-equiv="refresh" content="0; url=/${detectedLang}">`,
      redirect: `/${detectedLang}`
    }
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <LanguageRouter />
    </StaticRouter>
  )

  // Generar meta tags para SEO
  const head = `
    <meta name="language" content="${detectedLang}">
    <link rel="canonical" href="https://sebas10casti.github.io${url}">
  `

  return { html, head }
}

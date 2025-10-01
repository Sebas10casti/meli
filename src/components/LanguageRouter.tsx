import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import App from '../App';
import StartTest from '../pages/StartTest';
import UpdateData from '../pages/UpdateData';
import Confirmation from '../pages/Confirmation';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages';

// Componente para manejar redirecciones en el servidor
const ServerRedirect = ({ to }: { to: string }) => {
  // En el servidor, no renderizamos nada, la redirección se maneja en entry-server
  if (typeof window === 'undefined') {
    return null;
  }
  // En el cliente, usamos Navigate normalmente
  return <Navigate to={to} replace />;
};


const APP_ROUTES = [
  { path: '', component: StartTest },
  { path: 'start-test', component: StartTest },
  { path: 'update-data', component: UpdateData },
  { path: 'confirmation', component: Confirmation },
];

const LanguageRouter = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    let detectedLang = null;
    
    // Detectar idioma desde la URL: /es, /en, /pt, etc.
    if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as any)) {
      detectedLang = segments[0];
    }
    
    if (detectedLang && i18n.language !== detectedLang) {
      i18n.changeLanguage(detectedLang);
      localStorage.setItem('i18nextLng', detectedLang);
    }
  }, [location.pathname, i18n]);

  // Función para generar rutas dinámicamente
  const generateLanguageRoutes = () => {
    return SUPPORTED_LANGUAGES.map(lang => (
      <Route key={lang} path={`/${lang}`} element={<App />}>
        {APP_ROUTES.map(route => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<route.component />} 
          />
        ))}
      </Route>
    ));
  };

  return (
    <div>
      <Header />
      <Routes>
        {/* Redirigir / a idioma por defecto */}
        <Route path="/" element={<ServerRedirect to={`/${DEFAULT_LANGUAGE}`} />} />
        
        {/* Generar rutas dinámicamente para todos los idiomas */}
        {generateLanguageRoutes()}
        
        {/* Redirigir cualquier otra ruta al idioma por defecto */}
        <Route path="*" element={<ServerRedirect to={`/${DEFAULT_LANGUAGE}`} />} />
      </Routes>
    </div>
  );
};

export default LanguageRouter;
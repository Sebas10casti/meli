import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import App from '../App';
import StartTest from '../pages/StartTest';
import UpdateData from '../pages/UpdateData';
import Confirmation from '../pages/Confirmation';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages';


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
    
    // Detectar idioma desde la URL (funciona tanto en desarrollo como producción)
    // En desarrollo: /es, /en, /pt, etc.
    // En producción con basename: /en, /pt, etc. (después del basename /meli)
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
    <Routes>
      {/* Redirigir / a idioma por defecto */}
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
      
      {/* Generar rutas dinámicamente para todos los idiomas */}
      {generateLanguageRoutes()}
      
      {/* Redirigir cualquier otra ruta al idioma por defecto */}
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
    </Routes>
  );
};

export default LanguageRouter;
